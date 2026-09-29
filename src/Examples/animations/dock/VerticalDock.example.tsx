import {useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCalendar, LuInbox, LuLayers, LuMessageCircle, LuSettings, LuTrendingUp, LuUsers} from "react-icons/lu";

interface Section {
    id: string;
    label: string;
    icon: IconType;
    summary: string;
    count?: number;
}

const sections: Section[] = [
    {id: "inbox", label: "Inbox", icon: LuInbox, summary: "12 conversations need a reply, 3 are marked urgent.", count: 12},
    {id: "projects", label: "Projects", icon: LuLayers, summary: "Checkout redesign is 70% done and due next Friday."},
    {id: "calendar", label: "Calendar", icon: LuCalendar, summary: "Design review at 2:30 PM with the payments team."},
    {id: "chat", label: "Chat", icon: LuMessageCircle, summary: "Marcus shared new onboarding screens in #design.", count: 4},
    {id: "people", label: "People", icon: LuUsers, summary: "Two new teammates start on Monday."},
    {id: "reports", label: "Reports", icon: LuTrendingUp, summary: "Weekly active users are up 6% since last Monday."},
    {id: "settings", label: "Settings", icon: LuSettings, summary: "Workspace, billing, members and integrations."},
];

const BASE = 40;
const MAX = 64;
const RANGE = 110;

interface RailItemProps {
    section: Section;
    pointerY: MotionValue<number>;
    active: boolean;
    reduceMotion: boolean;
    onSelect: () => void;
    onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
    buttonRef: (element: HTMLButtonElement | null) => void;
}

const RailItem = ({section, pointerY, active, reduceMotion, onSelect, onKeyDown, buttonRef}: RailItemProps) => {
    const ref = useRef<HTMLButtonElement | null>(null);
    const [showLabel, setShowLabel] = useState(false);

    // Same idea as a horizontal dock, measured on the vertical axis.
    const distance = useTransform(pointerY, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        return rect ? value - (rect.top + rect.height / 2) : RANGE;
    });
    const target = useTransform(distance, [-RANGE, 0, RANGE], reduceMotion ? [BASE, BASE, BASE] : [BASE, MAX, BASE]);
    const size = useSpring(target, {stiffness: 380, damping: 28, mass: 0.2});
    const iconSize = useTransform(size, (value) => value * 0.44);
    const Icon = section.icon;

    return (
        <li className="relative flex items-center justify-center">
            {active && (
                <motion.span
                    layoutId="rail-indicator"
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

// A side rail that magnifies along its length. Arrow keys move between items, and the active marker slides.
const VerticalDock = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const pointerY = useMotionValue(Infinity);
    const [activeId, setActiveId] = useState("inbox");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const active = sections.find((section) => section.id === activeId) ?? sections[0];

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
        <div className="flex w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40">
            <nav
                aria-label="Workspace"
                onPointerMove={(event) => pointerY.set(event.clientY)}
                onPointerLeave={() => pointerY.set(Infinity)}
                onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) pointerY.set(Infinity);
                }}
                className="flex w-[5.5rem] shrink-0 flex-col items-center border-r border-gray-200 bg-gray-50 py-5 dark:border-slate-800 dark:bg-slate-900"
            >
                <span className="mb-5 flex h-9 w-9 items-center justify-center rounded-xl bg-gray-900 text-sm font-bold text-white dark:bg-white dark:text-slate-900">N</span>
                <ul className="flex flex-col items-center gap-2.5">
                    {sections.map((section, index) => (
                        <RailItem
                            key={section.id}
                            section={section}
                            pointerY={pointerY}
                            active={section.id === activeId}
                            reduceMotion={reduceMotion}
                            onSelect={() => setActiveId(section.id)}
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
                    <motion.div
                        key={active.id}
                        initial={{opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">Northwind</p>
                        <h3 className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">{active.label}</h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">{active.summary}</p>
                        <div className="mt-8 space-y-3">
                            {[0.92, 0.7, 0.8].map((width, index) => (
                                <div key={index} className="rounded-2xl border border-gray-100 p-4 dark:border-slate-800">
                                    <div className="h-2.5 rounded-full bg-gray-200 dark:bg-slate-800" style={{width: `${width * 60}%`}}/>
                                    <div className="mt-2.5 h-2 rounded-full bg-gray-100 dark:bg-slate-900" style={{width: `${width * 90}%`}}/>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VerticalDock;
