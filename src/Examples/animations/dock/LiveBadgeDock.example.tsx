import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCalendar, LuCamera, LuFolder, LuMail, LuMessageCircle, LuMusic, LuNewspaper} from "react-icons/lu";

interface App {
    id: string;
    name: string;
    icon: IconType;
    tint: string;
    notifies: boolean;
}

const apps: App[] = [
    {id: "files", name: "Files", icon: LuFolder, tint: "bg-sky-500", notifies: false},
    {id: "mail", name: "Mail", icon: LuMail, tint: "bg-blue-600", notifies: true},
    {id: "chat", name: "Chat", icon: LuMessageCircle, tint: "bg-emerald-500", notifies: true},
    {id: "calendar", name: "Calendar", icon: LuCalendar, tint: "bg-rose-500", notifies: true},
    {id: "news", name: "News", icon: LuNewspaper, tint: "bg-orange-500", notifies: false},
    {id: "camera", name: "Camera", icon: LuCamera, tint: "bg-zinc-700", notifies: false},
    {id: "music", name: "Music", icon: LuMusic, tint: "bg-pink-500", notifies: false},
];

// How far each icon rises, by its distance from the hovered one.
const lift = [-12, -6, -2];

// A labeled dock. Icons lift as a wave around the pointer, open apps get an indicator,
// and notification badges arrive live with a pop. Opening an app clears its badge.
const LiveBadgeDock = () => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion() ?? false;
    const [hovered, setHovered] = useState<number | null>(null);
    const [running, setRunning] = useState<string[]>(["files", "mail"]);
    const [focused, setFocused] = useState("files");
    const [badges, setBadges] = useState<Record<string, number>>({mail: 2, chat: 0, calendar: 1});
    const [latest, setLatest] = useState<{id: string; key: number} | null>(null);

    useEffect(() => {
        if (!inView) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            const candidates = apps.filter((app) => app.notifies && app.id !== focused);
            const app = candidates[Math.floor(Math.random() * candidates.length)];
            if (!app) return;
            setBadges((current) => ({...current, [app.id]: Math.min((current[app.id] ?? 0) + 1, 99)}));
            setLatest({id: app.id, key: Date.now()});
        }, 3200);
        return () => window.clearInterval(id);
    }, [inView, focused]);

    const open = (id: string) => {
        setRunning((current) => (current.includes(id) ? current : [...current, id]));
        setFocused(id);
        setBadges((current) => ({...current, [id]: 0}));
    };

    const latestApp = latest ? apps.find((app) => app.id === latest.id) : undefined;

    return (
        <nav ref={ref} aria-label="Dock" className="flex w-full flex-col items-center gap-6 overflow-x-auto px-2 py-4">
            <p className="sr-only" aria-live="polite">
                {latestApp ? `New notification in ${latestApp.name}` : ""}
            </p>
            <ul
                onPointerLeave={() => setHovered(null)}
                className="flex items-end gap-0.5 rounded-[26px] border border-gray-200 bg-white/80 px-2 pb-2 pt-3 shadow-xl shadow-gray-900/5 backdrop-blur-md sm:gap-2 dark:border-slate-700/70 dark:bg-slate-900/80 dark:shadow-black/30"
            >
                {apps.map((app, index) => {
                    const Icon = app.icon;
                    const distance = hovered === null ? -1 : Math.abs(hovered - index);
                    const y = reduceMotion || distance < 0 || distance >= lift.length ? 0 : lift[distance];
                    const badge = badges[app.id] ?? 0;
                    const isRunning = running.includes(app.id);
                    const isFocused = focused === app.id;
                    const justArrived = latest?.id === app.id && !reduceMotion;

                    return (
                        <li key={app.id} className="flex w-11 flex-col items-center sm:w-14">
                            <motion.button
                                type="button"
                                aria-label={[app.name, badge ? `${badge} new` : "", isRunning ? "open" : ""].filter(Boolean).join(", ")}
                                aria-current={isFocused ? "true" : undefined}
                                onClick={() => open(app.id)}
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
};

export default LiveBadgeDock;
