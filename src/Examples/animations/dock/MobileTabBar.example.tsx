import {useEffect, useRef, useState} from "react";
import type {MouseEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import type {IconType} from "react-icons";
import {LuBell, LuCalendarPlus, LuCamera, LuCompass, LuPenLine, LuPlus, LuSearch, LuUser} from "react-icons/lu";

interface Tab {
    id: string;
    label: string;
    icon: IconType;
}

const tabs: Tab[] = [
    {id: "explore", label: "Explore", icon: LuCompass},
    {id: "search", label: "Search", icon: LuSearch},
    {id: "inbox", label: "Inbox", icon: LuBell},
    {id: "profile", label: "Profile", icon: LuUser},
];

const actions = [
    {label: "Photo", icon: LuCamera, x: -76, y: -64},
    {label: "Note", icon: LuPenLine, x: 0, y: -96},
    {label: "Event", icon: LuCalendarPlus, x: 76, y: -64},
];

const RANGE = 70;

const Screen = ({id}: {id: string}) => {
    if (id === "explore") {
        return (
            <div className="space-y-3">
                {[
                    {title: "Coastal trails near Big Sur", meta: "12 routes, 4 to 9 miles", art: "from-sky-400 to-emerald-400"},
                    {title: "Weekend in Oaxaca", meta: "Food, markets and mezcal", art: "from-amber-300 to-rose-400"},
                ].map((card) => (
                    <div key={card.title} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                        <div className={`h-24 bg-gradient-to-br ${card.art}`}/>
                        <div className="p-3">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{card.title}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">{card.meta}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (id === "search") {
        return (
            <div>
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm text-gray-400 ring-1 ring-gray-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-slate-800">
                    <LuSearch className="h-4 w-4" aria-hidden="true"/>
                    Places, guides, people
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Recent</p>
                <ul className="mt-2 space-y-2.5 text-sm text-gray-700 dark:text-slate-300">
                    {["Lisbon in three days", "Night markets in Taipei", "Dolomites hut to hut"].map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        );
    }
    if (id === "inbox") {
        return (
            <ul className="space-y-2">
                {[
                    {who: "Leah", what: "saved your Oaxaca guide", when: "2m"},
                    {who: "Sam", what: "invited you to Tahoe trip", when: "1h"},
                    {who: "Noor", what: "commented on Big Sur trails", when: "3h"},
                ].map((item) => (
                    <li key={item.who} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{item.who[0]}</span>
                        <span className="flex-1 text-xs text-gray-700 dark:text-slate-300">
                            <span className="font-semibold text-gray-900 dark:text-white">{item.who}</span> {item.what}
                        </span>
                        <span className="text-[10px] text-gray-400">{item.when}</span>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <div className="flex flex-col items-center pt-4 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-lg font-semibold text-white">MR</span>
            <p className="mt-3 font-semibold text-gray-900 dark:text-white">Mara Reyes</p>
            <p className="text-xs text-gray-500 dark:text-slate-400">Oakland, 41 trips</p>
            <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
                {[["128", "Guides"], ["2.4k", "Followers"], ["19", "Countries"]].map(([value, label]) => (
                    <div key={label} className="rounded-xl bg-white py-2 ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                        <p className="text-[10px] text-gray-500 dark:text-slate-400">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface TabButtonProps {
    tab: Tab;
    active: boolean;
    pointerX: MotionValue<number>;
    reduceMotion: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

// While a finger slides along the bar, the icon under it grows and lifts.
const TabButton = ({tab, active, pointerX, reduceMotion, onClick}: TabButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.left + rect.width / 2) : RANGE;
    });
    const scale = useSpring(useTransform(distance, [-RANGE, 0, RANGE], reduceMotion ? [1, 1, 1] : [1, 1.4, 1]), {stiffness: 500, damping: 30});
    const y = useSpring(useTransform(distance, [-RANGE, 0, RANGE], reduceMotion ? [0, 0, 0] : [0, -8, 0]), {stiffness: 500, damping: 30});
    const Icon = tab.icon;

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
                    layoutId="tab-pill"
                    transition={{type: "spring", stiffness: 500, damping: 36}}
                    className="absolute inset-x-1 inset-y-0 rounded-2xl bg-indigo-50 dark:bg-indigo-500/15"
                />
            )}
            <motion.span style={{scale, y}} className="relative flex">
                <Icon className="h-5 w-5" aria-hidden="true"/>
            </motion.span>
            <span className="relative">{tab.label}</span>
        </button>
    );
};

// A phone tab bar. Tap a tab, or press and slide along the bar to magnify icons and release on the one you want.
// The center button fans out quick actions.
const MobileTabBar = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [activeId, setActiveId] = useState("explore");
    const [direction, setDirection] = useState(1);
    const [menuOpen, setMenuOpen] = useState(false);
    const scrubbing = useRef(false);
    const scrubMoved = useRef(false);
    const fabRef = useRef<HTMLButtonElement>(null);

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
        const from = tabs.findIndex((tab) => tab.id === activeId);
        const to = tabs.findIndex((tab) => tab.id === id);
        if (from === to) return;
        setDirection(to > from ? 1 : -1);
        setActiveId(id);
    };

    const tabAt = (clientX: number, clientY: number) => {
        const element = document.elementFromPoint(clientX, clientY)?.closest<HTMLElement>("[data-tab]");
        return element?.dataset.tab;
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType === "mouse" || (event.target as HTMLElement).closest("[data-fab]")) return;
        scrubbing.current = true;
        scrubMoved.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        pointerX.set(event.clientX);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        // Mice magnify on hover. Touch and pen magnify while pressed.
        if (event.pointerType !== "mouse" && !scrubbing.current) return;
        if (scrubbing.current) scrubMoved.current = true;
        pointerX.set(event.clientX);
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
        if (!scrubbing.current) return;
        scrubbing.current = false;
        pointerX.set(Infinity);
        const id = tabAt(event.clientX, event.clientY);
        if (id) select(id);
        window.setTimeout(() => {
            scrubMoved.current = false;
        }, 0);
    };

    return (
        <div className="flex w-full justify-center py-2">
            <div className="relative h-[36rem] w-full max-w-[20rem] overflow-hidden rounded-[44px] border-[10px] border-gray-900 bg-gray-50 shadow-2xl dark:border-black dark:bg-slate-950">
                <div aria-hidden="true" className="absolute left-1/2 top-2 z-30 h-5 w-24 -translate-x-1/2 rounded-full bg-gray-900 dark:bg-black"/>

                <div className="relative h-full overflow-hidden px-4 pb-28 pt-12">
                    <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">{tabs.find((tab) => tab.id === activeId)?.label}</h3>
                    <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                        <motion.div
                            key={activeId}
                            custom={direction}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: direction * 40}}
                            animate={{opacity: 1, x: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, x: direction * -40}}
                            transition={{type: "spring", stiffness: 360, damping: 34}}
                        >
                            <Screen id={activeId}/>
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
                    aria-label="Main"
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
                    {tabs.slice(0, 2).map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            active={tab.id === activeId}
                            pointerX={pointerX}
                            reduceMotion={reduceMotion}
                            onClick={(event) => {
                                // Keyboard clicks have no detail. Pointer clicks after a slide are already handled.
                                if (event.detail === 0 || !scrubMoved.current) select(tab.id);
                            }}
                        />
                    ))}

                    <div className="relative flex w-16 shrink-0 justify-center" data-fab>
                        <AnimatePresence>
                            {menuOpen &&
                                actions.map((action, index) => {
                                    const Icon = action.icon;
                                    return (
                                        <motion.button
                                            key={action.label}
                                            type="button"
                                            onClick={() => setMenuOpen(false)}
                                            initial={{opacity: 0, x: 0, y: 0, scale: 0.4}}
                                            animate={{opacity: 1, x: action.x, y: action.y, scale: 1}}
                                            exit={{opacity: 0, x: 0, y: 0, scale: 0.4, transition: {duration: 0.18, delay: (actions.length - 1 - index) * 0.03}}}
                                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 420, damping: 22, delay: index * 0.05}}
                                            className="group absolute bottom-1 flex flex-col items-center gap-1 focus-visible:outline-none"
                                        >
                                            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 transition-colors hover:bg-gray-50 dark:bg-slate-800 dark:text-white dark:ring-slate-700 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500">
                                                <Icon className="h-5 w-5" aria-hidden="true"/>
                                            </span>
                                            <span className="rounded-full bg-gray-900/80 px-2 py-0.5 text-[10px] font-medium text-white">{action.label}</span>
                                        </motion.button>
                                    );
                                })}
                        </AnimatePresence>
                        <motion.button
                            ref={fabRef}
                            type="button"
                            aria-label={menuOpen ? "Close quick actions" : "Create"}
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

                    {tabs.slice(2).map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            active={tab.id === activeId}
                            pointerX={pointerX}
                            reduceMotion={reduceMotion}
                            onClick={(event) => {
                                // Keyboard clicks have no detail. Pointer clicks after a slide are already handled.
                                if (event.detail === 0 || !scrubMoved.current) select(tab.id);
                            }}
                        />
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileTabBar;
