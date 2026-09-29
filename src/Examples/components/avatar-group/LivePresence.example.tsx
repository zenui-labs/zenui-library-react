import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuPause, LuPlay} from "react-icons/lu";

interface Viewer {
    id: string;
    name: string;
    // Matches the color of this person's cursor in the document.
    color: string;
    ring: string;
}

const pool: Viewer[] = [
    {id: "maya", name: "Maya Chen", color: "bg-rose-500", ring: "ring-rose-500"},
    {id: "diego", name: "Diego Ramos", color: "bg-sky-500", ring: "ring-sky-500"},
    {id: "priya", name: "Priya Nair", color: "bg-amber-500", ring: "ring-amber-500"},
    {id: "tom", name: "Tom Becker", color: "bg-emerald-500", ring: "ring-emerald-500"},
    {id: "aisha", name: "Aisha Bello", color: "bg-violet-500", ring: "ring-violet-500"},
    {id: "lucas", name: "Lucas Moreau", color: "bg-cyan-500", ring: "ring-cyan-500"},
    {id: "hana", name: "Hana Sato", color: "bg-fuchsia-500", ring: "ring-fuchsia-500"},
];

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);
const MAX_VISIBLE = 4;

interface ActivityEvent {
    id: number;
    text: string;
}

const LivePresence = () => {
    const [viewers, setViewers] = useState<Viewer[]>(pool.slice(0, 3));
    const [events, setEvents] = useState<ActivityEvent[]>([]);
    const [paused, setPaused] = useState(false);
    const [pageVisible, setPageVisible] = useState(true);
    const rootRef = useRef<HTMLDivElement>(null);
    const eventId = useRef(0);
    const viewersRef = useRef(viewers);
    const inView = useInView(rootRef);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        viewersRef.current = viewers;
    }, [viewers]);

    useEffect(() => {
        const onVisibility = () => setPageVisible(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", onVisibility);
        return () => document.removeEventListener("visibilitychange", onVisibility);
    }, []);

    // Simulates people joining and leaving. It stops while paused, off screen or in a background tab.
    const running = !paused && inView && pageVisible;
    useEffect(() => {
        if (!running) return;
        const timer = window.setInterval(() => {
            const current = viewersRef.current;
            const away = pool.filter((person) => !current.some((viewer) => viewer.id === person.id));
            const join = current.length <= 2 || (away.length > 0 && Math.random() > 0.45);
            // The first viewer is you, so only the others can leave.
            const person = join && away.length ? away[Math.floor(Math.random() * away.length)] : current[1 + Math.floor(Math.random() * (current.length - 1))];
            const next = join && away.length ? [...current, person] : current.filter((viewer) => viewer.id !== person.id);
            viewersRef.current = next;
            setViewers(next);
            setEvents((list) => [{id: eventId.current++, text: `${person.name} ${join && away.length ? "joined" : "left"}`}, ...list].slice(0, 3));
        }, 2200);
        return () => window.clearInterval(timer);
    }, [running]);

    const visible = viewers.slice(0, MAX_VISIBLE);
    const hidden = viewers.length - visible.length;

    return (
        <div ref={rootRef} className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-3.5 dark:border-white/[0.06]">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Pricing page copy</p>
                    <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="relative flex size-2" aria-hidden>
                            {running && !reduceMotion && (
                                <motion.span
                                    className="absolute inset-0 rounded-full bg-emerald-500"
                                    animate={{scale: [1, 2.2], opacity: [0.6, 0]}}
                                    transition={{duration: 1.6, repeat: Infinity, ease: "easeOut"}}
                                />
                            )}
                            <span className={`relative size-2 rounded-full ${running ? "bg-emerald-500" : "bg-zinc-400"}`}/>
                        </span>
                        <span className="tabular-nums">{viewers.length} viewing now</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <ul className="flex items-center" aria-label={`${viewers.length} people viewing: ${viewers.map((viewer) => viewer.name).join(", ")}`}>
                        <AnimatePresence initial={false} mode="popLayout">
                            {visible.map((viewer, index) => (
                                <motion.li
                                    key={viewer.id}
                                    layout={!reduceMotion}
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.4, y: 6}}
                                    animate={{opacity: 1, scale: 1, y: 0}}
                                    exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.4}}
                                    transition={{type: "spring", stiffness: 480, damping: 30}}
                                    className={`group relative ${index ? "-ml-1.5" : ""}`}
                                    style={{zIndex: MAX_VISIBLE - index}}
                                    aria-hidden
                                >
                                    <span className={`flex size-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-zinc-900 ${viewer.color} ${viewer.ring}`}>
                                        {index === 0 ? "You" : initials(viewer.name)}
                                    </span>
                                    <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900">
                                        {index === 0 ? "You" : viewer.name}
                                    </span>
                                </motion.li>
                            ))}
                            {hidden > 0 && (
                                <motion.li
                                    key="more"
                                    layout={!reduceMotion}
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    className="-ml-1.5 flex size-8 items-center justify-center rounded-full bg-zinc-100 text-[11px] font-semibold tabular-nums text-zinc-600 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900"
                                    aria-hidden
                                >
                                    +{hidden}
                                </motion.li>
                            )}
                        </AnimatePresence>
                    </ul>
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        aria-pressed={paused}
                        aria-label={paused ? "Resume live updates" : "Pause live updates"}
                        className="flex size-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                        {paused ? <LuPlay className="size-3.5" aria-hidden/> : <LuPause className="size-3.5" aria-hidden/>}
                    </button>
                </div>
            </div>

            <div className="relative space-y-2.5 px-5 pb-5 pt-8" aria-hidden>
                <span className="block h-2.5 w-3/4 rounded-full bg-zinc-100 dark:bg-white/[0.06]"/>
                <span className="block h-2.5 w-full rounded-full bg-zinc-100 dark:bg-white/[0.06]"/>
                <span className="relative block h-2.5 w-5/6 rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                    {viewers[1] && (
                        <motion.span
                            key={viewers[1].id}
                            className="absolute -top-1 left-1/2"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                        >
                            <span className={`block h-[18px] w-0.5 ${viewers[1].color}`}/>
                            <span className={`absolute bottom-full left-0 mb-0.5 whitespace-nowrap rounded rounded-bl-none px-1.5 py-0.5 text-[10px] font-medium text-white ${viewers[1].color}`}>
                                {viewers[1].name.split(" ")[0]}
                            </span>
                        </motion.span>
                    )}
                </span>
                <span className="block h-2.5 w-2/3 rounded-full bg-zinc-100 dark:bg-white/[0.06]"/>
            </div>

            <ul className="min-h-[5.25rem] space-y-1 border-t border-zinc-100 px-5 py-3 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
                <AnimatePresence initial={false}>
                    {events.map((event, index) => (
                        <motion.li
                            key={event.id}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                            animate={{opacity: 1 - index * 0.3, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                        >
                            {event.text}
                        </motion.li>
                    ))}
                </AnimatePresence>
                {events.length === 0 && <li>Activity shows up here as people come and go.</li>}
            </ul>
        </div>
    );
};

export default LivePresence;
