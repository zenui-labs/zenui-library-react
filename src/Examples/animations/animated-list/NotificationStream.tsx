import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, MotionConfig, useInView} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

export interface StreamNotification {
    title: string;
    detail: string;
    icon: ComponentType<{className?: string}>;
    /** Tailwind background class for the icon tile, for example "bg-emerald-500". */
    tone: string;
}

interface FeedItem extends StreamNotification {
    id: number;
    createdAt: number;
}

export interface NotificationStreamProps {
    /** Notifications the feed cycles through, in order. */
    notifications: StreamNotification[];
    /** How many notifications are already on screen when the feed mounts. */
    initialCount?: number;
    /** Most cards shown at once. Older ones drop off the bottom. */
    maxItems?: number;
    /** Milliseconds between new notifications. */
    interval?: number;
    title?: string;
    className?: string;
}

const timeAgo = (createdAt: number, now: number) => {
    const seconds = Math.max(0, Math.round((now - createdAt) / 1000));
    return seconds < 3 ? "now" : `${seconds}s ago`;
};

// New notifications drop in at the top and push older ones down.
// The feed pauses on hover, while off screen, or with the pause button.
export const NotificationStream = ({
    notifications,
    initialCount = 2,
    maxItems = 4,
    interval = 2600,
    title = "Activity",
    className = "",
}: NotificationStreamProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [now, setNow] = useState(() => Date.now());
    // The first notifications are already on screen, so new ones start after them.
    const startCount = Math.min(initialCount, notifications.length);
    const nextId = useRef(startCount);
    const [items, setItems] = useState<FeedItem[]>(() => {
        const start = Date.now();
        return notifications
            .slice(0, startCount)
            .reverse()
            .map((notification, index) => ({...notification, id: startCount - 1 - index, createdAt: start - (index + 1) * 9000}));
    });

    const running = inView && !paused && !hovered && notifications.length > 0;

    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            const time = Date.now();
            const id = nextId.current++;
            const next: FeedItem = {...notifications[id % notifications.length], id, createdAt: time};
            setNow(time);
            setItems((current) => [next, ...current].slice(0, maxItems));
        }, interval);
        return () => window.clearInterval(timer);
    }, [running, notifications, maxItems, interval]);

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className={`w-full max-w-sm ${className}`}>
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        aria-label={paused ? "Resume live updates" : "Pause live updates"}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {paused ? <LuPlay className="h-3 w-3" aria-hidden="true"/> : <LuPause className="h-3 w-3" aria-hidden="true"/>}
                        {paused ? "Paused" : "Live"}
                    </button>
                </div>

                <ul
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                    className="relative flex h-[304px] flex-col gap-2 overflow-hidden"
                >
                    <AnimatePresence initial={false} mode="popLayout">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <motion.li
                                    key={item.id}
                                    layout
                                    initial={{opacity: 0, y: -24, scale: 0.94}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    exit={{opacity: 0, scale: 0.94, transition: {duration: 0.2}}}
                                    transition={{type: "spring", stiffness: 380, damping: 32, mass: 0.8}}
                                    className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <span aria-hidden="true" className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white ${item.tone}`}>
                                        <Icon className="h-5 w-5"/>
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                                            <span className="shrink-0 text-xs text-gray-400 dark:text-slate-500">{timeAgo(item.createdAt, now)}</span>
                                        </div>
                                        <p className="truncate text-sm text-gray-500 dark:text-slate-400">{item.detail}</p>
                                    </div>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
            </div>
        </MotionConfig>
    );
};
