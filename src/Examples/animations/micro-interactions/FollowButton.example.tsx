import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBell, LuBellRing, LuCheck, LuUserPlus} from "react-icons/lu";

type FollowState = "idle" | "loading" | "following";

interface Creator {
    name: string;
    handle: string;
    initials: string;
    followers: number;
    gradient: string;
}

const creators: Creator[] = [
    {name: "Mateo Alvarez", handle: "@mateo.builds", initials: "MA", followers: 18400, gradient: "from-sky-400 to-indigo-500"},
    {name: "Grace Kim", handle: "@gracekim", initials: "GK", followers: 3210, gradient: "from-amber-400 to-rose-500"},
];

const Spinner = () => (
    <motion.svg viewBox="0 0 24 24" className="h-4 w-4" animate={{rotate: 360}} transition={{repeat: Infinity, duration: 0.8, ease: "linear"}} aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3"/>
        <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    </motion.svg>
);

const CreatorRow = ({creator}: {creator: Creator}) => {
    const reduceMotion = useReducedMotion();
    const [state, setState] = useState<FollowState>("idle");
    const [hovered, setHovered] = useState(false);
    const [notify, setNotify] = useState(false);
    const timer = useRef<number | null>(null);

    useEffect(() => () => {
        if (timer.current !== null) window.clearTimeout(timer.current);
    }, []);

    const following = state === "following";
    const followers = creator.followers + (following ? 1 : 0);

    const handleClick = () => {
        if (state === "loading") return;
        if (following) {
            setState("idle");
            setNotify(false);
            return;
        }
        setState("loading");
        // Stands in for a network request.
        timer.current = window.setTimeout(() => setState("following"), 700);
    };

    const toggleNotify = () => setNotify((value) => !value);

    const label = state === "loading" ? "Following" : following ? (hovered ? "Unfollow" : "Following") : "Follow";

    return (
        <li className="flex items-center gap-3 py-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${creator.gradient} text-sm font-semibold text-white`}>
                {creator.initials}
            </span>
            <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">{creator.name}</span>
                <span className="block truncate text-xs text-gray-500 dark:text-slate-400">
                    {creator.handle} · <span className="tabular-nums">{followers.toLocaleString("en-US")}</span> followers
                </span>
            </span>

            <AnimatePresence initial={false}>
                {following && (
                    <motion.button
                        key="bell"
                        type="button"
                        aria-pressed={notify}
                        aria-label={`Notify me when ${creator.name} posts`}
                        onClick={toggleNotify}
                        initial={{opacity: 0, scale: 0.4, x: 12}}
                        animate={{opacity: 1, scale: 1, x: 0}}
                        exit={{opacity: 0, scale: 0.4, x: 12}}
                        transition={{type: "spring", stiffness: 420, damping: 26}}
                        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                            notify
                                ? "border-amber-300 bg-amber-50 text-amber-600 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300"
                                : "border-gray-200 text-gray-500 hover:text-gray-900 dark:border-slate-700 dark:text-slate-400 dark:hover:text-white"
                        }`}
                    >
                        {/* Rings once each time notifications are turned on. */}
                        <motion.span
                            initial={false}
                            animate={notify && !reduceMotion ? {rotate: [0, -18, 16, -12, 8, -4, 0]} : {rotate: 0}}
                            transition={{duration: 0.6}}
                            style={{transformOrigin: "50% 10%"}}
                        >
                            {notify ? <LuBellRing className="h-4 w-4" aria-hidden="true"/> : <LuBell className="h-4 w-4" aria-hidden="true"/>}
                        </motion.span>
                    </motion.button>
                )}
            </AnimatePresence>

            <motion.button
                layout
                type="button"
                aria-pressed={following}
                aria-busy={state === "loading"}
                onClick={handleClick}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                whileTap={{scale: 0.95}}
                transition={{type: "spring", stiffness: 500, damping: 34}}
                style={{borderRadius: 9999}}
                className={`flex h-9 items-center gap-1.5 border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                    following
                        ? hovered
                            ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-300"
                            : "border-gray-200 bg-white text-gray-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                        : "border-gray-900 bg-gray-900 text-white hover:bg-gray-700 dark:border-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                }`}
            >
                <motion.span layout="position" className="flex items-center">
                    {state === "loading" ? (
                        <Spinner/>
                    ) : following ? (
                        <LuCheck className="h-4 w-4" aria-hidden="true"/>
                    ) : (
                        <LuUserPlus className="h-4 w-4" aria-hidden="true"/>
                    )}
                </motion.span>
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={label}
                        initial={{opacity: 0, y: 8}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -8}}
                        transition={{duration: 0.15}}
                    >
                        {label}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </li>
    );
};

const FollowButton = () => (
    <section className="w-full max-w-md rounded-2xl border border-gray-200 bg-white px-5 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h3 className="pb-1 pt-3 text-xs font-medium uppercase tracking-[0.16em] text-gray-400 dark:text-slate-500">Suggested creators</h3>
        <ul className="divide-y divide-gray-100 dark:divide-slate-800">
            {creators.map((creator) => (
                <CreatorRow key={creator.handle} creator={creator}/>
            ))}
        </ul>
    </section>
);

export default FollowButton;
