import {useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

export interface RailSection {
    id: string;
    label: string;
    icon: ComponentType<{className?: string}>;
    /** One line under the heading when the section is active. */
    summary?: string;
    /** Unread count shown in a badge on the icon. */
    count?: number;
    /** Panel body for the section. Placeholder rows are shown when it is left out. */
    content?: ReactNode;
}

interface RailItemProps {
    section: RailSection;
    pointerY: MotionValue<number>;
    active: boolean;
    reduceMotion: boolean;
    indicatorId: string;
    baseSize: number;
    maxSize: number;
    range: number;
    onSelect: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    buttonRef: (element: HTMLButtonElement | null) => void;
}

const RailItem = ({section, pointerY, active, reduceMotion, indicatorId, baseSize, maxSize, range, onSelect, onKeyDown, buttonRef}: RailItemProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [showLabel, setShowLabel] = useState(false);

    // Same idea as a horizontal dock, measured on the vertical axis.
    const distance = useTransform(pointerY, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.top + rect.height / 2) : range;
    });
    const target = useTransform(distance, [-range, 0, range], reduceMotion ? [baseSize, baseSize, baseSize] : [baseSize, maxSize, baseSize]);
    const size = useSpring(target, {stiffness: 380, damping: 28, mass: 0.2});
    const iconSize = useTransform(size, (value) => value * 0.44);
    const Icon = section.icon;

    return (
        <li className="relative flex items-center justify-center">
            {active && (
                <motion.span
                    layoutId={indicatorId}
                    transition={{type: "spring", stiffness: 500, damping: 36}}
                    className="absolute -left-2 h-6 w-1 rounded-full bg-indigo-500 dark:bg-indigo-400"
                />
            )}
            <motion.button
                ref={(element) => {
                    ref.current = element;
                    buttonRef(element);
                }}
                type="button"
                aria-label={section.count ? `${section.label}, ${section.count} new` : section.label}
                aria-current={active ? "page" : undefined}
                tabIndex={active ? 0 : -1}
                onClick={onSelect}
                onKeyDown={onKeyDown}
                onPointerEnter={() => setShowLabel(true)}
                onPointerLeave={() => setShowLabel(false)}
                onFocus={() => setShowLabel(true)}
                onBlur={() => setShowLabel(false)}
                style={{width: size, height: size}}
                className={`relative flex items-center justify-center rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    active
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 dark:bg-indigo-500"
                        : "bg-white text-gray-600 shadow-sm ring-1 ring-gray-200 hover:text-gray-900 dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700 dark:hover:text-white"
                }`}
            >
                <motion.span style={{width: iconSize, height: iconSize}} className="flex">
                    <Icon className="h-full w-full" aria-hidden="true"/>
                </motion.span>
                {section.count ? (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white ring-2 ring-gray-50 dark:ring-slate-900">
                        {section.count}
                    </span>
                ) : null}
            </motion.button>
            <AnimatePresence>
                {showLabel && (
                    <motion.span
                        role="tooltip"
                        initial={{opacity: 0, x: -6}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0, x: -4}}
                        transition={{duration: 0.15}}
                        className="pointer-events-none absolute left-full z-10 ml-5 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs font-medium text-white shadow-lg dark:bg-white dark:text-slate-900"
                    >
                        {section.label}
                    </motion.span>
                )}
            </AnimatePresence>
        </li>
    );
};

const PlaceholderRows = () => (
    <div className="mt-8 space-y-3">
        {[0.92, 0.7, 0.8].map((width, index) => (
            <div key={index} className="rounded-2xl border border-gray-100 p-4 dark:border-slate-800">
                <div className="h-2.5 rounded-full bg-gray-200 dark:bg-slate-800" style={{width: `${width * 60}%`}}/>
                <div className="mt-2.5 h-2 rounded-full bg-gray-100 dark:bg-slate-900" style={{width: `${width * 90}%`}}/>
            </div>
        ))}
    </div>
);

export interface VerticalDockProps {
    sections: RailSection[];
    /** Id of the active section. Pass it with `onActiveChange` to control it. */
    activeId?: string;
    defaultActiveId?: string;
    onActiveChange?: (id: string) => void;
    /** Mark at the top of the rail, such as a logo or an initial. */
    logo?: ReactNode;
    /** Small label above the section heading, such as the workspace name. */
    eyebrow?: string;
    /** Icon size in px at rest. */
    baseSize?: number;
    /** Icon size in px right under the pointer. */
    maxSize?: number;
    /** Distance in px from the pointer at which icons stop growing. */
    range?: number;
    /** Accessible name for the rail. */
    label?: string;
    className?: string;
}

// A side rail that magnifies along its length. Arrow keys move between items, and the active marker slides.
export const VerticalDock = ({
    sections,
    activeId,
    defaultActiveId,
    onActiveChange,
    logo,
    eyebrow,
    baseSize = 40,
    maxSize = 64,
    range = 110,
    label = "Workspace",
    className = "",
}: VerticalDockProps) => {
    const indicatorId = `${useId()}-rail-indicator`;
    const reduceMotion = useReducedMotion() ?? false;
    const pointerY = useMotionValue(Infinity);
    const [internalId, setInternalId] = useState(defaultActiveId ?? sections[0]?.id ?? "");
    const currentId = activeId ?? internalId;
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const active = sections.find((section) => section.id === currentId) ?? sections[0];

    const select = (id: string) => {
        if (activeId === undefined) setInternalId(id);
        onActiveChange?.(id);
    };

    const focusItem = (index: number) => {
        const next = (index + sections.length) % sections.length;
        const button = buttons.current[next];
        button?.focus();
        const rect = button?.getBoundingClientRect();
        if (rect) pointerY.set(rect.top + rect.height / 2);
    };

    const handleKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            focusItem(index + 1);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            focusItem(index - 1);
        } else if (event.key === "Home") {
            event.preventDefault();
            focusItem(0);
        } else if (event.key === "End") {
            event.preventDefault();
            focusItem(sections.length - 1);
        }
    };

    return (
        <div className={`flex w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 ${className}`}>
            <nav
                aria-label={label}
                onPointerMove={(event) => pointerY.set(event.clientY)}
                onPointerLeave={() => pointerY.set(Infinity)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) pointerY.set(Infinity);
                }}
                className="flex w-[5.5rem] shrink-0 flex-col items-center border-r border-gray-200 bg-gray-50 py-5 dark:border-slate-800 dark:bg-slate-900"
            >
                {logo !== undefined && (
                    <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">{logo}</span>
                )}
                <ul className="flex flex-col items-center gap-2.5">
                    {sections.map((section, index) => (
                        <RailItem
                            key={section.id}
                            section={section}
                            pointerY={pointerY}
                            active={section.id === currentId}
                            reduceMotion={reduceMotion}
                            indicatorId={indicatorId}
                            baseSize={baseSize}
                            maxSize={maxSize}
                            range={range}
                            onSelect={() => select(section.id)}
                            onKeyDown={handleKeyDown(index)}
                            buttonRef={(element) => {
                                buttons.current[index] = element;
                            }}
                        />
                    ))}
                </ul>
            </nav>

            <div className="relative min-h-[30rem] flex-1 overflow-hidden p-6 sm:p-8">
                <AnimatePresence mode="wait" initial={false}>
                    {active && (
                        <motion.div
                            key={active.id}
                            initial={{opacity: 0, y: 12}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -8}}
                            transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                        >
                            {eyebrow && <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">{eyebrow}</p>}
                            <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{active.label}</h3>
                            {active.summary && <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">{active.summary}</p>}
                            {active.content ?? <PlaceholderRows/>}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
