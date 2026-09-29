import {forwardRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

export interface LiveBadgeApp {
    id: string;
    name: string;
    icon: ComponentType<{className?: string}>;
    /** Tailwind background class for the icon tile, for example "bg-sky-500". */
    tint: string;
}

export interface LiveBadgeDockProps {
    apps: LiveBadgeApp[];
    /** Ids of the apps that start open and show the indicator dot. */
    defaultOpenIds?: string[];
    /** Id of the app in front. Its dot stretches into a bar. Pass it with `onActiveChange` to control it. */
    activeId?: string;
    defaultActiveId?: string;
    onActiveChange?: (id: string) => void;
    /** Unread counts by app id. A count that goes up pops its badge. Pass it with `onBadgesChange` to control it. */
    badges?: Record<string, number>;
    defaultBadges?: Record<string, number>;
    /** Called when opening an app clears its badge. */
    onBadgesChange?: (badges: Record<string, number>) => void;
    onOpen?: (app: LiveBadgeApp) => void;
    /** How far in px each icon rises, by its distance from the hovered one. */
    lift?: number[];
    /** Accessible name for the dock. */
    label?: string;
    /** Text read by screen readers when a badge count goes up. */
    announcement?: (appName: string) => string;
    className?: string;
}

const defaultLift = [-12, -6, -2];
const defaultAnnouncement = (appName: string) => `New notification in ${appName}`;

// A labeled dock. Icons lift as a wave around the pointer, open apps get an indicator,
// and badges pop when their count goes up. Opening an app clears its badge.
// The ref points at the nav element, which is handy for pausing live updates while the dock is off screen.
export const LiveBadgeDock = forwardRef<HTMLElement, LiveBadgeDockProps>(function LiveBadgeDock(
    {
        apps,
        defaultOpenIds = [],
        activeId,
        defaultActiveId,
        onActiveChange,
        badges,
        defaultBadges = {},
        onBadgesChange,
        onOpen,
        lift = defaultLift,
        label = "Dock",
        announcement = defaultAnnouncement,
        className = "",
    },
    ref,
) {
    const reduceMotion = useReducedMotion() ?? false;
    const [hovered, setHovered] = useState<number | null>(null);
    const [running, setRunning] = useState<string[]>(defaultOpenIds);
    const [internalActive, setInternalActive] = useState(defaultActiveId ?? apps[0]?.id ?? "");
    const [internalBadges, setInternalBadges] = useState<Record<string, number>>(defaultBadges);
    const focused = activeId ?? internalActive;
    const counts = badges ?? internalBadges;

    // When a count goes up, remember which app it was so its badge replays the pop.
    const [previous, setPrevious] = useState(counts);
    const [latest, setLatest] = useState<{id: string; key: number} | null>(null);
    if (previous !== counts) {
        setPrevious(counts);
        const arrived = apps.find((app) => (counts[app.id] ?? 0) > (previous[app.id] ?? 0));
        if (arrived) setLatest({id: arrived.id, key: (latest?.key ?? 0) + 1});
    }

    const open = (app: LiveBadgeApp) => {
        setRunning((current) => (current.includes(app.id) ? current : [...current, app.id]));
        if (activeId === undefined) setInternalActive(app.id);
        onActiveChange?.(app.id);
        const cleared = {...counts, [app.id]: 0};
        if (badges === undefined) setInternalBadges(cleared);
        onBadgesChange?.(cleared);
        onOpen?.(app);
    };

    const latestApp = latest ? apps.find((app) => app.id === latest.id) : undefined;

    return (
        <nav ref={ref} aria-label={label} className={`flex w-full flex-col items-center gap-6 overflow-x-auto px-2 py-4 ${className}`}>
            <p className="sr-only" aria-live="polite">
                {latestApp ? announcement(latestApp.name) : ""}
            </p>
            <ul
                onPointerLeave={() => setHovered(null)}
                className="flex items-end gap-0.5 rounded-[26px] border border-gray-200 bg-white/80 px-2 pb-2 pt-3 shadow-xl shadow-gray-900/5 backdrop-blur-md sm:gap-2 dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-black/30"
            >
                {apps.map((app, index) => {
                    const Icon = app.icon;
                    const distance = hovered === null ? -1 : Math.abs(hovered - index);
                    const y = reduceMotion || distance < 0 || distance >= lift.length ? 0 : lift[distance];
                    const badge = counts[app.id] ?? 0;
                    const isRunning = running.includes(app.id);
                    const isFocused = focused === app.id;
                    const justArrived = latest?.id === app.id && !reduceMotion;

                    return (
                        <li key={app.id} className="flex w-11 flex-col items-center sm:w-14">
                            <motion.button
                                type="button"
                                aria-label={[app.name, badge ? `${badge} new` : "", isRunning ? "open" : ""].filter(Boolean).join(", ")}
                                aria-current={isFocused ? "true" : undefined}
                                onClick={() => open(app)}
                                onPointerEnter={() => setHovered(index)}
                                onFocus={() => setHovered(index)}
                                onBlur={() => setHovered(null)}
                                animate={{y}}
                                whileTap={{scale: 0.9}}
                                transition={{type: "spring", stiffness: 420, damping: 22}}
                                className={`relative flex h-10 w-10 items-center justify-center rounded-[13px] text-white shadow-md shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:h-12 sm:w-12 dark:focus-visible:ring-offset-slate-900 ${app.tint}`}
                            >
                                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true"/>
                                <AnimatePresence>
                                    {badge > 0 && (
                                        <motion.span
                                            key="badge"
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            exit={{scale: 0, opacity: 0}}
                                            transition={{type: "spring", stiffness: 600, damping: 20}}
                                            className="absolute -right-1.5 -top-1.5"
                                        >
                                            {/* A new key per notification replays the pop and the wiggle. */}
                                            <motion.span
                                                key={justArrived ? latest?.key : "steady"}
                                                initial={justArrived ? {scale: 1.5, rotate: -18} : false}
                                                animate={{scale: 1, rotate: 0}}
                                                transition={{type: "spring", stiffness: 500, damping: 9}}
                                                className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold tabular-nums text-white ring-2 ring-white dark:ring-slate-900"
                                            >
                                                {badge}
                                            </motion.span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                            <span className={`mt-1.5 max-w-full truncate text-[10px] font-medium sm:text-[11px] ${isFocused ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-slate-400"}`}>
                                {app.name}
                            </span>
                            {/* Open apps get a dot. The focused app's dot stretches into a bar. */}
                            <span className="mt-1 flex h-1 items-center" aria-hidden="true">
                                <AnimatePresence>
                                    {isRunning && (
                                        <motion.span
                                            initial={{opacity: 0, scaleX: 0}}
                                            animate={{opacity: 1, scaleX: 1, width: isFocused ? 14 : 4}}
                                            exit={{opacity: 0, scaleX: 0}}
                                            transition={{type: "spring", stiffness: 500, damping: 30}}
                                            className={`block h-1 rounded-full ${isFocused ? "bg-indigo-500 dark:bg-indigo-400" : "bg-gray-400 dark:bg-slate-500"}`}
                                        />
                                    )}
                                </AnimatePresence>
                            </span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
});
