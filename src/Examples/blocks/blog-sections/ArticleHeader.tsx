import {Fragment, useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {motion, useReducedMotion, useScroll, useSpring} from "framer-motion";
import {LuBookmark, LuCheck, LuChevronRight, LuClock, LuLink, LuShare2} from "react-icons/lu";

export interface ArticleSection {
    /** Used as the heading id and the table of contents anchor, so it must be unique on the page. */
    id: string;
    title: string;
    paragraphs: string[];
}

export interface ArticleAuthor {
    name: string;
    href?: string;
    /** Text in the avatar. Defaults to the first letter of each word in the name. */
    initials?: string;
    /** Tailwind classes for the avatar background and text. Defaults to a color picked by position. */
    avatarClassName?: string;
}

export interface Breadcrumb {
    label: string;
    href?: string;
}

const avatarColors = [
    "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
];

const initialsOf = (name: string) => name.split(" ").map((p) => p[0]).join("");

/** Decorative cover: a gradient with bars and a dashed trend line. */
export const ArticleCoverArt = () => (
    <div aria-hidden="true" className="relative mx-auto aspect-[21/9] max-w-5xl overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-400">
        <svg viewBox="0 0 840 360" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-white">
            {Array.from({length: 24}).map((_, i) => (
                <rect key={i} x={30 + i * 33} y={320 - (40 + ((i * 53) % 220))} width="20" height={40 + ((i * 53) % 220)} rx="4"
                      fill="currentColor" fillOpacity={i % 5 === 0 ? 0.9 : 0.2}/>
            ))}
            <path d="M20 250 C 200 200, 360 290, 520 160 S 760 120, 830 60" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8"/>
        </svg>
    </div>
);

export interface ArticleHeaderProps {
    title: string;
    /** Standfirst under the title. */
    dek?: string;
    breadcrumbs?: Breadcrumb[];
    authors: ArticleAuthor[];
    /** Display date, for example "Sep 22, 2026". */
    date: string;
    /** Machine readable date for the time element, for example "2026-09-22". */
    dateTime?: string;
    readMinutes: number;
    sections: ArticleSection[];
    /** Wide image under the header. Defaults to generated art; pass null to hide it. */
    cover?: ReactNode;
    /** Link copied by the copy button. Defaults to the current page address. */
    shareUrl?: string;
    onShare?: () => void;
    /** Saved state when controlled. */
    saved?: boolean;
    /** Saved state on first render when uncontrolled. */
    defaultSaved?: boolean;
    onSavedChange?: (saved: boolean) => void;
    tocLabel?: string;
    className?: string;
}

/** The top of an article page with breadcrumbs, authors, actions, a reading progress bar and a table of contents that tracks the current section. */
export const ArticleHeader = ({
    title,
    dek,
    breadcrumbs = [],
    authors,
    date,
    dateTime,
    readMinutes,
    sections,
    cover,
    shareUrl,
    onShare,
    saved: savedProp,
    defaultSaved = false,
    onSavedChange,
    tocLabel = "On this page",
    className = "",
}: ArticleHeaderProps) => {
    const articleRef = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();
    const {scrollYProgress} = useScroll({target: articleRef, offset: ["start start", "end end"]});
    const smooth = useSpring(scrollYProgress, {stiffness: 200, damping: 30, restDelta: 0.001});
    const [active, setActive] = useState(sections[0]?.id ?? "");
    const [innerSaved, setInnerSaved] = useState(defaultSaved);
    const saved = savedProp ?? innerSaved;
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
    }, [sections]);

    useEffect(() => () => window.clearTimeout(copyTimer.current), []);

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl ?? window.location.href);
            setCopy("copied");
        } catch {
            setCopy("failed");
        }
        window.clearTimeout(copyTimer.current);
        copyTimer.current = window.setTimeout(() => setCopy("idle"), 2000);
    };

    const toggleSaved = () => {
        const next = !saved;
        if (savedProp === undefined) setInnerSaved(next);
        onSavedChange?.(next);
    };

    const iconButton = "inline-flex h-9 items-center gap-2 rounded-full border border-slate-200 px-3 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900";
    const coverNode = cover === undefined ? <ArticleCoverArt/> : cover;

    return (
        <article ref={articleRef} className={`relative w-full bg-white dark:bg-slate-950 ${className}`}>
            <div className="sticky top-0 z-10 h-1 w-full bg-slate-100 dark:bg-slate-900">
                <motion.div className="h-full origin-left bg-gradient-to-r from-violet-500 to-fuchsia-500"
                            style={{scaleX: reduce ? scrollYProgress : smooth}}/>
            </div>

            <header className="px-5 pb-10 pt-12 sm:px-8">
                <div className="mx-auto max-w-3xl">
                    {breadcrumbs.length > 0 && (
                        <nav aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500 dark:text-slate-400">
                                {breadcrumbs.map((crumb, i) => (
                                    <Fragment key={crumb.label}>
                                        {i > 0 && <li aria-hidden="true"><LuChevronRight className="h-3.5 w-3.5"/></li>}
                                        <li><a href={crumb.href ?? "#"} className="rounded outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:text-white">{crumb.label}</a></li>
                                    </Fragment>
                                ))}
                            </ol>
                        </nav>
                    )}

                    <h1 className="mt-5 text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-5xl sm:leading-[1.08] dark:text-white">
                        {title}
                    </h1>
                    {dek && (
                        <p className="mt-5 text-lg leading-relaxed text-slate-600 sm:text-xl dark:text-slate-400">
                            {dek}
                        </p>
                    )}

                    <div className="mt-8 flex flex-col gap-5 border-y border-slate-200 py-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {authors.map((author, i) => (
                                    <span key={author.name}
                                          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ring-2 ring-white dark:ring-slate-950 ${author.avatarClassName ?? avatarColors[i % avatarColors.length]}`}>
                                        {author.initials ?? initialsOf(author.name)}
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-slate-900 dark:text-white">
                                    {authors.map((author, i) => (
                                        <span key={author.name}>
                                            {i > 0 && (i === authors.length - 1 ? " and " : ", ")}
                                            <a href={author.href ?? "#"} className="rounded outline-none hover:underline focus-visible:ring-2 focus-visible:ring-violet-500">{author.name}</a>
                                        </span>
                                    ))}
                                </p>
                                <p className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                    <time dateTime={dateTime}>{date}</time>
                                    <span aria-hidden="true">·</span>
                                    <LuClock className="h-3.5 w-3.5" aria-hidden="true"/> {readMinutes} min read
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button type="button" onClick={copyLink} className={iconButton}>
                                {copy === "copied" ? <LuCheck className="h-4 w-4 text-emerald-600" aria-hidden="true"/> : <LuLink className="h-4 w-4" aria-hidden="true"/>}
                                <span aria-live="polite">{copy === "copied" ? "Copied" : copy === "failed" ? "Copy failed" : "Copy link"}</span>
                            </button>
                            <button type="button" onClick={onShare} className={iconButton} aria-label="Share article">
                                <LuShare2 className="h-4 w-4" aria-hidden="true"/>
                                <span className="hidden sm:inline">Share</span>
                            </button>
                            <button type="button" onClick={toggleSaved} aria-pressed={saved}
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

            {coverNode && <div className="px-5 sm:px-8">{coverNode}</div>}

            <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[200px_minmax(0,1fr)]">
                <nav aria-label={tocLabel} className="hidden lg:block">
                    <div className="sticky top-8">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{tocLabel}</p>
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
