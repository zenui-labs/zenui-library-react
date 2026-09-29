import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, MotionConfig, useScroll, useSpring, useTransform} from "framer-motion";
import {LuBookmark, LuClock, LuX} from "react-icons/lu";

export interface Article {
    id: string;
    category: string;
    title: string;
    /** Short summary shown on the card only. */
    excerpt: string;
    author: string;
    /** One or two letters shown in the author avatar. */
    initials: string;
    /** Reading time, used for the card label and the time left in the reader. */
    minutes: number;
    /** Tailwind gradient stops for the cover, for example "from-cyan-400 via-sky-500 to-indigo-600". */
    cover: string;
    /** Paragraphs of the full article. */
    body: string[];
}

export interface ArticleReaderProps {
    articles: Article[];
    /** Ids of saved articles when controlled. */
    savedIds?: string[];
    /** Ids saved on first render when uncontrolled. */
    defaultSavedIds?: string[];
    onSavedChange?: (ids: string[]) => void;
    className?: string;
}

const spring = {type: "spring", stiffness: 300, damping: 34} as const;

interface ReaderProps {
    article: Article;
    idPrefix: string;
    onClose: () => void;
}

// Scroll progress drives the bar at the top and the time left in the header.
const Reader = ({article, idPrefix, onClose}: ReaderProps) => {
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
            layoutId={`${idPrefix}-article-${article.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${idPrefix}-reader-title-${article.id}`}
            onKeyDown={trapFocus}
            style={{borderRadius: 24}}
            className="pointer-events-auto relative flex h-full w-full max-w-2xl flex-col overflow-hidden border border-gray-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
        >
            <div className="relative z-10 flex items-center gap-3 border-b border-gray-100 bg-white/90 px-4 py-2.5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                <motion.span layoutId={`${idPrefix}-category-${article.id}`} className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
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
                <motion.div layoutId={`${idPrefix}-cover-${article.id}`} className={`h-40 bg-gradient-to-br sm:h-48 ${article.cover}`}/>
                <div className="px-5 pb-10 pt-6 sm:px-8">
                    <motion.h3 id={`${idPrefix}-reader-title-${article.id}`} layoutId={`${idPrefix}-title-${article.id}`} className="text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl dark:text-white">
                        {article.title}
                    </motion.h3>
                    <motion.div layoutId={`${idPrefix}-byline-${article.id}`} className="mt-4 flex items-center gap-2.5 text-sm text-gray-600 dark:text-slate-400">
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
export const ArticleReader = ({
    articles,
    savedIds,
    defaultSavedIds = [],
    onSavedChange,
    className = "",
}: ArticleReaderProps) => {
    const uid = useId();
    const [openId, setOpenId] = useState<string | null>(null);
    const [internalSaved, setInternalSaved] = useState<string[]>(defaultSavedIds);
    const saved = savedIds ?? internalSaved;

    const toggleSaved = (id: string) => {
        const next = saved.includes(id) ? saved.filter((savedId) => savedId !== id) : [...saved, id];
        if (savedIds === undefined) setInternalSaved(next);
        onSavedChange?.(next);
    };
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
            <div className={`relative flex min-h-[34rem] w-full max-w-3xl items-center ${className}`}>
                <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    {articles.map((article) => (
                        <li key={article.id} className="relative">
                            <motion.button
                                ref={(element) => {
                                    cardRefs.current[article.id] = element;
                                }}
                                type="button"
                                layoutId={`${uid}-article-${article.id}`}
                                onClick={() => {
                                    lastOpened.current = article.id;
                                    setOpenId(article.id);
                                }}
                                aria-haspopup="dialog"
                                style={{borderRadius: 24}}
                                className="block w-full overflow-hidden border border-gray-200 bg-white text-left transition-shadow hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40"
                            >
                                <motion.span layoutId={`${uid}-cover-${article.id}`} className={`block h-36 bg-gradient-to-br ${article.cover}`}/>
                                <span className="block p-5">
                                    <motion.span layoutId={`${uid}-category-${article.id}`} className="block text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {article.category}
                                    </motion.span>
                                    <motion.span layoutId={`${uid}-title-${article.id}`} className="mt-2 block text-lg font-semibold leading-snug text-gray-900 dark:text-white">
                                        {article.title}
                                    </motion.span>
                                    <span className="mt-2 block text-sm leading-6 text-gray-600 dark:text-slate-400">{article.excerpt}</span>
                                    <motion.span layoutId={`${uid}-byline-${article.id}`} className="mt-4 flex items-center gap-2.5 text-sm text-gray-600 dark:text-slate-400">
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white dark:bg-white dark:text-slate-900">{article.initials}</span>
                                        {article.author}, {article.minutes} min read
                                    </motion.span>
                                </span>
                            </motion.button>
                            <motion.button
                                type="button"
                                aria-pressed={saved.includes(article.id)}
                                aria-label={`Save ${article.title}`}
                                onClick={() => toggleSaved(article.id)}
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
                            <Reader article={open} idPrefix={uid} onClose={() => setOpenId(null)}/>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
};
