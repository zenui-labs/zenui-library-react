import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, MotionConfig, useScroll, useSpring, useTransform} from "framer-motion";
import {LuBookmark, LuClock, LuX} from "react-icons/lu";

interface Article {
    id: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    initials: string;
    minutes: number;
    cover: string;
    body: string[];
}

const articles: Article[] = [
    {
        id: "edge-search",
        category: "Engineering",
        title: "Why we moved search to the edge",
        excerpt: "Median search latency went from 180 ms to 38 ms. Here is what it took and what we would do differently.",
        author: "Ines Duarte",
        initials: "ID",
        minutes: 6,
        cover: "from-cyan-400 via-sky-500 to-indigo-600",
        body: [
            "For three years our search ran in one region. Customers in Sydney and São Paulo waited on a round trip across an ocean for every keystroke, and it showed in the numbers: people outside North America searched 40% less.",
            "We started by measuring where the time went. Only a quarter of it was the query itself. The rest was network, TLS setup and a cold cache that rarely helped anyone outside our home region.",
            "The fix was not a faster database. We split the index into a small, hot shard with the most searched documents and a long tail that stays central. The hot shard is replicated to 14 edge locations and answers about 85% of queries on its own.",
            "Keeping replicas fresh was the hard part. We moved from nightly rebuilds to a change stream, so an edit reaches every edge location in under four seconds. Stale results are now rare enough that we alert on them.",
            "If we did it again, we would have measured per-region search volume from day one. The drop outside North America was visible for years; we simply were not looking at it.",
        ],
    },
    {
        id: "support-calls",
        category: "Research",
        title: "What 400 support calls taught us about onboarding",
        excerpt: "Most new teams got stuck on the same two screens. Fixing them cut first-week support tickets by a third.",
        author: "Theo Brandt",
        initials: "TB",
        minutes: 5,
        cover: "from-amber-300 via-orange-400 to-rose-500",
        body: [
            "Over six weeks, we listened to 400 recorded support calls from teams in their first week. We tagged every moment someone sounded unsure, and two screens came up again and again.",
            "The first was workspace setup. We asked for a URL slug before people knew what it was for. Moving that step to after the first project, with a sensible default, removed a whole category of calls.",
            "The second was inviting teammates. People expected an invite link; we only offered email invites. Adding a link that expires after seven days was a two-day change.",
            "First-week tickets dropped by 34%, and teams that invite someone in their first hour are twice as likely to still be active a month later.",
        ],
    },
];

const spring = {type: "spring", stiffness: 300, damping: 34} as const;

interface ReaderProps {
    article: Article;
    onClose: () => void;
}

// Scroll progress drives the bar at the top and the time left in the header.
const Reader = ({article, onClose}: ReaderProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const {scrollYProgress} = useScroll({container: scrollRef});
    const progress = useSpring(scrollYProgress, {stiffness: 200, damping: 30});
    const minutesLeft = useTransform(scrollYProgress, (value) => {
        const left = Math.ceil(article.minutes * (1 - value));
        return left <= 0 ? "Finished" : `${left} min left`;
    });

    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    // Keep Tab inside the reader while it is open.
    const trapFocus = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key !== "Tab") return;
        const focusable = event.currentTarget.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    return (
        <motion.article
            layoutId={`article-${article.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`reader-title-${article.id}`}
            onKeyDown={trapFocus}
            style={{borderRadius: 24}}
            className="pointer-events-auto relative flex h-full w-full max-w-2xl flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
        >
            <div className="relative z-10 flex items-center gap-3 border-b border-gray-100 bg-white/90 px-4 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <motion.span layoutId={`category-${article.id}`} className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    {article.category}
                </motion.span>
                <motion.span
                    initial={{opacity: 0}}
                    animate={{opacity: 1, transition: {delay: 0.2}}}
                    className="inline-flex items-center gap-1 text-xs tabular-nums text-gray-500 dark:text-slate-400"
                >
                    <LuClock className="h-3.5 w-3.5" aria-hidden="true"/>
                    <motion.span>{minutesLeft}</motion.span>
                </motion.span>
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label="Close article"
                    className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                >
                    <LuX className="h-4 w-4" aria-hidden="true"/>
                </button>
                <motion.span
                    aria-hidden="true"
                    style={{scaleX: progress}}
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-500 dark:bg-indigo-400"
                />
            </div>

            <div
                ref={scrollRef}
                tabIndex={0}
                role="region"
                aria-label="Article text"
                className="flex-1 overflow-y-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            >
                <motion.div layoutId={`cover-${article.id}`} className={`h-40 bg-gradient-to-br sm:h-48 ${article.cover}`}/>
                <div className="px-5 pb-10 pt-6 sm:px-8">
                    <motion.h3 id={`reader-title-${article.id}`} layoutId={`title-${article.id}`} className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl dark:text-white">
                        {article.title}
                    </motion.h3>
                    <motion.div layoutId={`byline-${article.id}`} className="mt-4 flex items-center gap-2.5 text-sm text-gray-600 dark:text-slate-400">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{article.initials}</span>
                        {article.author}
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0, transition: {delay: 0.15, duration: 0.35}}}
                        exit={{opacity: 0, transition: {duration: 0.1}}}
                        className="mt-6 space-y-4 text-[15px] leading-7 text-gray-700 dark:text-slate-300"
                    >
                        {article.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.article>
    );
};

// Article cards open into a reader. Cover, category, title and byline are shared, so the card grows into the page.
const ArticleReader = () => {
    const [openId, setOpenId] = useState<string | null>(null);
    const [saved, setSaved] = useState<string[]>([]);
    const cardRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastOpened = useRef<string | null>(null);
    const open = articles.find((article) => article.id === openId) ?? null;

    useEffect(() => {
        if (!openId) return;
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setOpenId(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [openId]);

    return (
        <MotionConfig transition={spring} reducedMotion="user">
            <div className="relative flex min-h-[34rem] w-full max-w-3xl items-center">
                <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    {articles.map((article) => (
                        <li key={article.id} className="relative">
                            <motion.button
                                ref={(element) => {
                                    cardRefs.current[article.id] = element;
                                }}
                                type="button"
                                layoutId={`article-${article.id}`}
                                onClick={() => {
                                    lastOpened.current = article.id;
                                    setOpenId(article.id);
                                }}
                                aria-haspopup="dialog"
                                style={{borderRadius: 24}}
                                className="block w-full overflow-hidden border border-gray-200 bg-white text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40"
                            >
                                <motion.span layoutId={`cover-${article.id}`} className={`block h-36 bg-gradient-to-br ${article.cover}`}/>
                                <span className="block p-5">
                                    <motion.span layoutId={`category-${article.id}`} className="block text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {article.category}
                                    </motion.span>
                                    <motion.span layoutId={`title-${article.id}`} className="mt-2 block text-lg font-semibold leading-snug text-gray-900 dark:text-white">
                                        {article.title}
                                    </motion.span>
                                    <span className="mt-2 block text-sm leading-6 text-gray-600 dark:text-slate-400">{article.excerpt}</span>
                                    <motion.span layoutId={`byline-${article.id}`} className="mt-4 flex items-center gap-2.5 text-sm text-gray-600 dark:text-slate-400">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{article.initials}</span>
                                        {article.author}, {article.minutes} min read
                                    </motion.span>
                                </span>
                            </motion.button>
                            <motion.button
                                type="button"
                                aria-pressed={saved.includes(article.id)}
                                aria-label={`Save ${article.title}`}
                                onClick={() => setSaved((current) => (current.includes(article.id) ? current.filter((id) => id !== article.id) : [...current, article.id]))}
                                whileTap={{scale: 0.85}}
                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur transition-colors hover:bg-black/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                            >
                                <LuBookmark className={`h-4 w-4 ${saved.includes(article.id) ? "fill-white" : ""}`} aria-hidden="true"/>
                            </motion.button>
                        </li>
                    ))}
                </ul>

                <AnimatePresence
                    onExitComplete={() => {
                        if (lastOpened.current) cardRefs.current[lastOpened.current]?.focus();
                    }}
                >
                    {open && (
                        <motion.div
                            key="scrim"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setOpenId(null)}
                            className="absolute -inset-2 z-10 rounded-3xl bg-gray-900/30 backdrop-blur-[2px] dark:bg-black/50"
                        />
                    )}
                    {open && (
                        <div key="reader" className="pointer-events-none absolute inset-0 z-20 flex justify-center">
                            <Reader article={open} onClose={() => setOpenId(null)}/>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
};

export default ArticleReader;
