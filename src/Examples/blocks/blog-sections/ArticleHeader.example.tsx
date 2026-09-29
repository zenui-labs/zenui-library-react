import {useEffect, useRef, useState} from "react";
import {motion, useReducedMotion, useScroll, useSpring} from "framer-motion";
import {LuBookmark, LuCheck, LuChevronRight, LuClock, LuLink, LuShare2} from "react-icons/lu";

interface Section {
    id: string;
    title: string;
    paragraphs: string[];
}

const sections: Section[] = [
    {
        id: "article-why",
        title: "Why we stopped trusting our dashboards",
        paragraphs: [
            "For two years, our conversion dashboard said checkout was fine. Support tickets said otherwise. The gap came down to a single event that fired twice on Safari and zero times when the payment sheet opened in a new tab.",
            "We did not have a data problem so much as a definitions problem. Nobody could say, in one sentence, what a completed checkout was.",
        ],
    },
    {
        id: "article-contract",
        title: "Writing the event contract",
        paragraphs: [
            "We wrote every event down in a single YAML file with an owner, a trigger, a schema and an example payload. Any event not in the file is dropped at the edge and reported to the owning team.",
            "The first version listed 312 events. After a week of pruning, 94 were left, and 11 of those had no owner willing to claim them.",
        ],
    },
    {
        id: "article-rollout",
        title: "Rolling it out without a freeze",
        paragraphs: [
            "We ran the old and new pipelines side by side for six weeks and diffed the daily totals. Any metric that drifted by more than half a percent opened a ticket automatically.",
        ],
    },
];

const ArticleHeader = () => {
    const articleRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const {scrollYProgress} = useScroll({target: articleRef, offset: ["start start", "end end"]});
    const smooth = useSpring(scrollYProgress, {stiffness: 200, damping: 30, restDelta: 0.001});
    const [active, setActive] = useState(sections[0].id);
    const [saved, setSaved] = useState(false);
    const [copy, setCopy] = useState<"idle" | "copied" | "failed">("idle");
    const copyTimer = useRef<number | undefined>(undefined);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (items) => {
                const visible = items.filter((i) => i.isIntersecting);
                if (visible.length > 0) setActive(visible[0].target.id);
            },
            {rootMargin: "-15% 0px -70% 0px"},
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => () => window.clearTimeout(copyTimer.current), []);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopy("copied");
        } catch {
            setCopy("failed");
        }
        window.clearTimeout(copyTimer.current);
        copyTimer.current = window.setTimeout(() => setCopy("idle"), 2000);
    };

    const iconButton = "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900";

    return (
        <article ref={articleRef} className="relative w-full bg-white dark:bg-slate-950">
            <div className="sticky top-0 z-10 h-1 w-full bg-slate-100 dark:bg-slate-900">
                <motion.div className="h-full origin-left bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{scaleX: reduce ? scrollYProgress : smooth}}/>
            </div>

            <header className="px-5 pb-10 pt-12 sm:px-8">
                <div className="mx-auto max-w-3xl">
                    <nav aria-label="Breadcrumb">
                        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                            <li><a href="#" className="rounded outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-white">Blog</a></li>
                            <li aria-hidden="true"><LuChevronRight className="h-3.5 w-3.5"/></li>
                            <li><a href="#" className="rounded outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-white">Data</a></li>
                        </ol>
                    </nav>

                    <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08] dark:text-white">
                        We deleted 218 analytics events and our numbers got better
                    </h1>
                    <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
                        How one YAML file, six weeks of side by side pipelines and a lot of polite arguments gave us a checkout funnel we can finally trust.
                    </p>

                    <div className="mt-8 flex flex-col gap-5 border-y border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 ring-2 ring-white dark:bg-violet-500/20 dark:text-violet-300 dark:ring-slate-950">AS</span>
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-semibold text-amber-700 ring-2 ring-white dark:bg-amber-500/20 dark:text-amber-300 dark:ring-slate-950">TB</span>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-slate-900 dark:text-white">
                                    <a href="#" className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-violet-500">Aisha Siddiqui</a>
                                    {" and "}
                                    <a href="#" className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-violet-500">Tomas Berg</a>
                                </p>
                                <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                    <time dateTime="2026-09-22">Sep 22, 2026</time>
                                    <span aria-hidden="true">·</span>
                                    <LuClock className="h-3.5 w-3.5" aria-hidden="true"/> 11 min read
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={copyLink} className={iconButton}>
                                {copy === "copied" ? <LuCheck className="h-4 w-4 text-emerald-600" aria-hidden="true"/> : <LuLink className="h-4 w-4" aria-hidden="true"/>}
                                <span aria-live="polite">{copy === "copied" ? "Copied" : copy === "failed" ? "Copy failed" : "Copy link"}</span>
                            </button>
                            <button type="button" className={iconButton} aria-label="Share article">
                                <LuShare2 className="h-4 w-4" aria-hidden="true"/>
                                <span className="hidden sm:inline">Share</span>
                            </button>
                            <button type="button" onClick={() => setSaved((v) => !v)} aria-pressed={saved}
                                    aria-label={saved ? "Remove from reading list" : "Save to reading list"}
                                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500 ${saved
                                        ? "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-500/40 dark:bg-violet-500/15 dark:text-violet-300"
                                        : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"}`}>
                                <motion.span animate={saved && !reduce ? {scale: [1, 1.3, 1]} : {scale: 1}} transition={{duration: 0.3}}>
                                    <LuBookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`}/>
                                </motion.span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="px-5 sm:px-8">
                <div aria-hidden="true" className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-400">
                    <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-white">
                        {Array.from({length: 24}).map((_, i) => (
                            <rect key={i} x={30 + i * 33} y={320 - (40 + ((i * 53) % 220))} width="20" height={40 + ((i * 53) % 220)} rx="4"
                                  fill="currentColor" fillOpacity={i % 5 === 0 ? 0.9 : 0.2}/>
                        ))}
                        <path d="M20 250 C 200 200, 360 290, 520 160 S 760 120, 830 60" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8"/>
                    </svg>
                </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[200px_minmax(0,1fr)]">
                <nav aria-label="On this page" className="hidden lg:block">
                    <div className="sticky top-8">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">On this page</p>
                        <ul className="mt-3 space-y-1 border-l border-slate-200 dark:border-slate-800">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}
                                       className={`relative -ml-px block border-l py-1 pl-3 text-sm outline-none transition-colors focus-visible:text-violet-600 ${active === s.id
                                           ? "border-violet-500 font-medium text-slate-900 dark:text-white"
                                           : "border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="max-w-2xl">
                    {sections.map((s) => (
                        <section key={s.id} aria-labelledby={s.id} className="mb-10 last:mb-0">
                            <h2 id={s.id} className="scroll-mt-8 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{s.title}</h2>
                            {s.paragraphs.map((p) => (
                                <p key={p.slice(0, 24)} className="mt-4 text-[17px] leading-8 text-slate-700 dark:text-slate-300">{p}</p>
                            ))}
                        </section>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default ArticleHeader;
