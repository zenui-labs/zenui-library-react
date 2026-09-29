import {useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBookmark, LuHeart, LuMessageCircle, LuRepeat2} from "react-icons/lu";

const particleAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const particleColors = ["bg-rose-500", "bg-amber-400", "bg-pink-400", "bg-orange-400"];

// Rolls the old number out and the new one in, in the direction the count moved.
const RollingCount = ({value}: {value: number}) => {
    // Remember the last value and direction; updating state during render is how React derives state from props.
    const [last, setLast] = useState({value, direction: 1});
    const direction = value === last.value ? last.direction : value > last.value ? 1 : -1;
    if (value !== last.value) setLast({value, direction});

    return (
        <span className="relative inline-flex h-5 min-w-[2.5ch] overflow-hidden tabular-nums">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.span
                    key={value}
                    custom={direction}
                    initial={{y: `${direction * 100}%`, opacity: 0}}
                    animate={{y: "0%", opacity: 1}}
                    exit={{y: `${direction * -100}%`, opacity: 0}}
                    transition={{type: "spring", stiffness: 420, damping: 32}}
                >
                    {value.toLocaleString("en-US")}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const LikeButton = () => {
    const reduceMotion = useReducedMotion();
    const [liked, setLiked] = useState(false);
    const [bursts, setBursts] = useState(0);
    const count = 1283 + (liked ? 1 : 0);

    const toggle = () => {
        if (!liked) setBursts((value) => value + 1);
        setLiked((value) => !value);
    };

    return (
        <button
            type="button"
            aria-pressed={liked}
            onClick={toggle}
            className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                liked ? "text-rose-600 dark:text-rose-400" : "text-gray-500 hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
            }`}
        >
            <span className="relative flex h-5 w-5 items-center justify-center">
                {liked && bursts > 0 && !reduceMotion && (
                    <span key={bursts} aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <motion.span
                            className="absolute inset-0 rounded-full border-2 border-rose-400"
                            initial={{scale: 0.2, opacity: 1}}
                            animate={{scale: 2.2, opacity: 0, borderWidth: 0}}
                            transition={{duration: 0.5, ease: "easeOut"}}
                        />
                        {particleAngles.map((angle, index) => {
                            const radians = (angle * Math.PI) / 180;
                            return (
                                <motion.span
                                    key={angle}
                                    className={`absolute left-1/2 top-1/2 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full ${particleColors[index % particleColors.length]}`}
                                    initial={{x: 0, y: 0, scale: 1, opacity: 1}}
                                    animate={{x: Math.cos(radians) * 18, y: Math.sin(radians) * 18, scale: 0, opacity: 0}}
                                    transition={{duration: 0.6, ease: [0.2, 0.8, 0.3, 1], delay: 0.08}}
                                />
                            );
                        })}
                    </span>
                )}
                <motion.span
                    initial={false}
                    animate={liked && !reduceMotion ? {scale: [1, 0.6, 1.35, 1]} : {scale: 1}}
                    transition={{duration: 0.45, times: [0, 0.2, 0.6, 1]}}
                    className="relative"
                >
                    <LuHeart className="h-5 w-5" fill={liked ? "currentColor" : "none"} aria-hidden="true"/>
                </motion.span>
            </span>
            <span className="sr-only">Like, </span>
            <RollingCount value={count}/>
        </button>
    );
};

const BookmarkButton = () => {
    const reduceMotion = useReducedMotion();
    const [saved, setSaved] = useState(false);

    return (
        <button
            type="button"
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save post"}
            onClick={() => setSaved((value) => !value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                saved ? "text-indigo-600 dark:text-indigo-400" : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
            }`}
        >
            <motion.span
                className="relative flex h-5 w-5"
                initial={false}
                animate={saved && !reduceMotion ? {y: [0, -4, 0], scaleY: [1, 1.12, 1]} : {y: 0, scaleY: 1}}
                transition={{duration: 0.35}}
            >
                <LuBookmark className="h-5 w-5" aria-hidden="true"/>
                {/* A filled copy is revealed from the bottom up. */}
                <motion.span
                    className="absolute inset-0"
                    initial={false}
                    animate={{clipPath: saved ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)"}}
                    transition={reduceMotion ? {duration: 0} : {duration: 0.35, ease: [0.3, 0.7, 0.2, 1]}}
                >
                    <LuBookmark className="h-5 w-5" fill="currentColor" aria-hidden="true"/>
                </motion.span>
            </motion.span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={saved ? "saved" : "save"}
                    initial={{opacity: 0, y: 4}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -4}}
                    transition={{duration: 0.15}}
                >
                    {saved ? "Saved" : "Save"}
                </motion.span>
            </AnimatePresence>
        </button>
    );
};

const RepostButton = () => {
    const reduceMotion = useReducedMotion();
    const [reposted, setReposted] = useState(false);

    return (
        <button
            type="button"
            aria-pressed={reposted}
            onClick={() => setReposted((value) => !value)}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                reposted ? "text-emerald-600 dark:text-emerald-400" : "text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 dark:text-slate-400 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
            }`}
        >
            <motion.span
                initial={false}
                animate={{rotate: reposted && !reduceMotion ? 180 : 0}}
                transition={{type: "spring", stiffness: 260, damping: 18}}
            >
                <LuRepeat2 className="h-5 w-5" aria-hidden="true"/>
            </motion.span>
            <span className="sr-only">Repost, </span>
            <RollingCount value={87 + (reposted ? 1 : 0)}/>
        </button>
    );
};

const ReactionButtons = () => (
    <article className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <header className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-500 text-sm font-semibold text-white">
                DL
            </span>
            <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Dana Liu</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Design systems lead · 2 h</p>
            </div>
        </header>
        <p className="mt-4 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
            We cut our button variants from 23 to 6 this quarter. Fewer choices, faster reviews, and not a single complaint from product teams so far.
        </p>
        <footer className="-mx-3 mt-4 flex items-center justify-between">
            <div className="flex items-center">
                <LikeButton/>
                <span className="inline-flex items-center gap-1.5 px-3 py-2 text-sm text-gray-500 dark:text-slate-400">
                    <LuMessageCircle className="h-5 w-5" aria-hidden="true"/>
                    <span className="sr-only">Comments:</span>
                    42
                </span>
                <RepostButton/>
            </div>
            <BookmarkButton/>
        </footer>
    </article>
);

export default ReactionButtons;
