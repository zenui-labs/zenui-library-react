import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, MouseEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuPlus} from "react-icons/lu";

type Icon = ComponentType<{className?: string}>;

export interface MobileTab {
    id: string;
    label: string;
    icon: Icon;
    /** Screen shown under the tab's title while it is active. */
    content: ReactNode;
}

export interface QuickAction {
    label: string;
    icon: Icon;
    /** Horizontal offset in px from the center button where the action settles. */
    x: number;
    /** Vertical offset in px from the center button. Negative values sit above it. */
    y: number;
}

interface TabButtonProps {
    tab: MobileTab;
    active: boolean;
    pointerX: MotionValue<number>;
    reduceMotion: boolean;
    pillId: string;
    range: number;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// While a finger slides along the bar, the icon under it grows and lifts.
const TabButton = ({tab, active, pointerX, reduceMotion, pillId, range, onClick}: TabButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.left + rect.width / 2) : range;
    });
    const scale = useSpring(useTransform(distance, [-range, 0, range], reduceMotion ? [1, 1, 1] : [1, 1.4, 1]), {stiffness: 500, damping: 30});
    const y = useSpring(useTransform(distance, [-range, 0, range], reduceMotion ? [0, 0, 0] : [0, -8, 0]), {stiffness: 500, damping: 30});
    const TabIcon = tab.icon;

    return (
        <button
            ref={ref}
            type="button"
            data-tab={tab.id}
            aria-current={active ? "page" : undefined}
            onClick={onClick}
            className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-1.5 text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                active ? "text-indigo-600 dark:text-indigo-300" : "text-gray-500 dark:text-slate-400"
            }`}
        >
            {active && (
                <motion.span
                    layoutId={pillId}
                    transition={{type: "spring", stiffness: 500, damping: 36}}
                    className="absolute inset-x-1 inset-y-0 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15"
                />
            )}
            <motion.span style={{scale, y}} className="relative flex">
                <TabIcon className="h-5 w-5" aria-hidden="true"/>
            </motion.span>
            <span className="relative">{tab.label}</span>
        </button>
    );
};

export interface MobileTabBarProps {
    /** Tabs around the center button. The first half sits to its left, the rest to its right. */
    tabs: MobileTab[];
    /** Actions that fan out of the center button. */
    actions: QuickAction[];
    /** Id of the active tab. Pass it with `onActiveChange` to control it. */
    activeId?: string;
    defaultActiveId?: string;
    onActiveChange?: (id: string) => void;
    onAction?: (action: QuickAction) => void;
    /** Distance in px from the finger at which icons stop growing. */
    range?: number;
    /** Accessible name for the center button while the actions are closed. */
    createLabel?: string;
    /** Accessible name for the center button while the actions are open. */
    closeLabel?: string;
    /** Accessible name for the tab bar. */
    label?: string;
    className?: string;
}

// A phone tab bar. Tap a tab, or press and slide along the bar to magnify icons and release on the one you want.
// The center button fans out quick actions.
export const MobileTabBar = ({
    tabs,
    actions,
    activeId,
    defaultActiveId,
    onActiveChange,
    onAction,
    range = 70,
    createLabel = "Create",
    closeLabel = "Close quick actions",
    label = "Main",
    className = "",
}: MobileTabBarProps) => {
    const pillId = `${useId()}-tab-pill`;
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [internalId, setInternalId] = useState(defaultActiveId ?? tabs[0]?.id ?? "");
    const currentId = activeId ?? internalId;
    const [direction, setDirection] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const scrubbing = useRef(false);
    const scrubMoved = useRef(false);
    const fabRef = useRef<HTMLButtonElement>(null);
    const activeTab = tabs.find((tab) => tab.id === currentId);
    const split = Math.ceil(tabs.length / 2);

    useEffect(() => {
        if (!menuOpen) return;
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                fabRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [menuOpen]);

    const select = (id: string) => {
        const from = tabs.findIndex((tab) => tab.id === currentId);
        const to = tabs.findIndex((tab) => tab.id === id);
        if (from === to) return;
        setDirection(to > from ? 1 : -1);
        if (activeId === undefined) setInternalId(id);
        onActiveChange?.(id);
    };

    const tabAt = (clientX: number, clientY: number) => {
        const element = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>("[data-tab]");
        return element?.dataset.tab;
    };

    const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "mouse" || (event.target as HTMLElement).closest("[data-fab]")) return;
        scrubbing.current = true;
        scrubMoved.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        pointerX.set(event.clientX);
    };

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        // Mice magnify on hover. Touch and pen magnify while pressed.
        if (event.pointerType !== "mouse" && !scrubbing.current) return;
        if (scrubbing.current) scrubMoved.current = true;
        pointerX.set(event.clientX);
    };

    const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
        if (!scrubbing.current) return;
        scrubbing.current = false;
        pointerX.set(Infinity);
        const id = tabAt(event.clientX, event.clientY);
        if (id) select(id);
        window.setTimeout(() => {
            scrubMoved.current = false;
        }, 0);
    };

    const renderTab = (tab: MobileTab) => (
        <TabButton
            key={tab.id}
            tab={tab}
            active={tab.id === currentId}
            pointerX={pointerX}
            reduceMotion={reduceMotion}
            pillId={pillId}
            range={range}
            onClick={(event) => {
                // Keyboard clicks have no detail. Pointer clicks after a slide are already handled.
                if (event.detail === 0 || !scrubMoved.current) select(tab.id);
            }}
        />
    );

    return (
        <div className={`flex w-full justify-center py-2 ${className}`}>
            <div className="relative h-[36rem] w-full max-w-[20rem] overflow-hidden rounded-[44px] border-[10px] border-gray-900 bg-gray-50 shadow-2xl dark:border-black dark:bg-slate-950">
                <div aria-hidden="true" className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-black"/>

                <div className="relative h-full overflow-hidden px-4 pb-28 pt-12">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{activeTab?.label}</h3>
                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                        <motion.div
                            key={currentId}
                            custom={direction}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: direction * 40}}
                            animate={{opacity: 1, x: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, x: direction * -40}}
                            transition={{type: "spring", stiffness: 360, damping: 34}}
                        >
                            {activeTab?.content}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dim the screen while quick actions are open. */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setMenuOpen(false)}
                            className="absolute inset-0 z-10 bg-gray-900/30 backdrop-blur-[2px] dark:bg-black/50"
                        />
                    )}
                </AnimatePresence>

                <nav
                    aria-label={label}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={() => {
                        scrubbing.current = false;
                        pointerX.set(Infinity);
                    }}
                    onPointerLeave={(event) => {
                        if (event.pointerType === "mouse") pointerX.set(Infinity);
                    }}
                    className="absolute inset-x-3 bottom-4 z-20 flex touch-none items-center rounded-3xl border border-gray-200 bg-white/90 px-1.5 py-1.5 shadow-xl shadow-gray-900/10 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90"
                >
                    {tabs.slice(0, split).map(renderTab)}

                    <div className="relative flex w-16 shrink-0 justify-center" data-fab>
                        <AnimatePresence>
                            {menuOpen &&
                                actions.map((action, index) => {
                                    const ActionIcon = action.icon;
                                    return (
                                        <motion.button
                                            key={action.label}
                                            type="button"
                                            onClick={() => {
                                                setMenuOpen(false);
                                                onAction?.(action);
                                            }}
                                            initial={{opacity: 0, x: 0, y: 0, scale: 0.4}}
                                            animate={{opacity: 1, x: action.x, y: action.y, scale: 1}}
                                            exit={{opacity: 0, x: 0, y: 0, scale: 0.4, transition: {duration: 0.18, delay: (actions.length - 1 - index) * 0.03}}}
                                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 420, damping: 22, delay: index * 0.05}}
                                            className="group absolute bottom-1 flex flex-col items-center gap-1 focus-visible:outline-none"
                                        >
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 transition-colors hover:bg-gray-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500">
                                                <ActionIcon className="h-5 w-5" aria-hidden="true"/>
                                            </span>
                                            <span className="rounded-full bg-gray-900/80 px-2 py-0.5 text-[10px] font-medium text-white">{action.label}</span>
                                        </motion.button>
                                    );
                                })}
                        </AnimatePresence>
                        <motion.button
                            ref={fabRef}
                            type="button"
                            aria-label={menuOpen ? closeLabel : createLabel}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen((value) => !value)}
                            animate={{rotate: menuOpen ? 45 : 0}}
                            whileTap={{scale: 0.9}}
                            transition={{type: "spring", stiffness: 500, damping: 26}}
                            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:focus-visible:ring-offset-slate-900"
                        >
                            <LuPlus className="h-5 w-5" aria-hidden="true"/>
                        </motion.button>
                    </div>

                    {tabs.slice(split).map(renderTab)}
                </nav>
            </div>
        </div>
    );
};
