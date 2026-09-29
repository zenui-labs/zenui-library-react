import {useCallback, useEffect, useId, useRef, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuBookmark, LuChevronLeft, LuChevronRight} from "react-icons/lu";

export type RelatedGlyph = "stack" | "arc" | "dots" | "zig";

export interface RelatedPost {
    slug: string;
    /** Topic label above the title. */
    tag: string;
    title: string;
    author: string;
    minutes: number;
    /** Tailwind gradient classes for the card art, for example "from-sky-500 to-cyan-400". */
    hue: string;
    /** Shape drawn on the card art. */
    glyph: RelatedGlyph;
    /** Link to the post. Defaults to "#". */
    href?: string;
}

const Glyph = ({kind}: {kind: RelatedGlyph}) => (
    <svg viewBox="0 0 120 80" className="h-full w-full text-white" aria-hidden="true">
        {kind === "stack" && [0, 1, 2].map((i) => (
            <rect key={i} x={30 + i * 8} y={18 + i * 12} width="52" height="28" rx="6" fill="currentColor" fillOpacity={0.3 + i * 0.25}/>
        ))}
        {kind === "arc" && [16, 28, 40].map((r, i) => (
            <path key={r} d={`M${60 - r} 70 A${r} ${r} 0 0 1 ${60 + r} 70`} fill="none" stroke="currentColor" strokeWidth="6" strokeOpacity={0.9 - i * 0.25} strokeLinecap="round"/>
        ))}
        {kind === "dots" && Array.from({length: 15}).map((_, i) => (
            <circle key={i} cx={28 + (i % 5) * 16} cy={22 + Math.floor(i / 5) * 18} r={i === 7 ? 7 : 4} fill="currentColor" fillOpacity={i === 7 ? 1 : 0.45}/>
        ))}
        {kind === "zig" && (
            <path d="M18 56 L36 30 L54 50 L72 22 L90 44 L104 28" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
        )}
    </svg>
);

export interface RelatedPostCardProps {
    post: RelatedPost;
    saved: boolean;
    onToggleSave: () => void;
}

/** One related post card with generated art and a save toggle. The whole card links to the post. */
export const RelatedPostCard = ({post, saved, onToggleSave}: RelatedPostCardProps) => {
    const reduce = useReducedMotion();
    return (
        <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-3 transition-shadow hover:shadow-xl hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
            <div className={`relative aspect-[3/2] overflow-hidden rounded-xl bg-gradient-to-br ${post.hue}`}>
                <div className="absolute inset-0 p-8 transition-transform duration-500 group-hover:scale-110">
                    <Glyph kind={post.glyph}/>
                </div>
            </div>
            <div className="flex flex-1 flex-col px-2 pb-2 pt-4">
                <p className="text-xs font-medium text-sky-700 dark:text-sky-400">{post.tag}</p>
                <h3 className="mt-1.5 font-semibold leading-snug text-slate-900 dark:text-white">
                    <a href={post.href ?? "#"} className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-sky-500">{post.title}</a>
                </h3>
                <p className="mt-auto pt-4 text-xs text-slate-500 dark:text-slate-400">{post.author}, {post.minutes} min read</p>
            </div>
            <button type="button" onClick={onToggleSave} aria-pressed={saved}
                    aria-label={saved ? `Remove ${post.title} from reading list` : `Save ${post.title} to reading list`}
                    className={`absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full outline-none backdrop-blur transition focus-visible:ring-2 focus-visible:ring-white ${saved
                        ? "bg-white text-slate-900"
                        : "bg-black/20 text-white hover:bg-black/35"}`}>
                <motion.span key={String(saved)} initial={reduce ? false : {scale: 0.6}} animate={{scale: 1}} transition={{type: "spring", stiffness: 500, damping: 18}}>
                    <LuBookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`}/>
                </motion.span>
            </button>
        </article>
    );
};

export interface RelatedPostsRowProps {
    posts: RelatedPost[];
    heading?: string;
    description?: string;
    /** Slugs of saved posts when controlled. */
    savedSlugs?: string[];
    /** Slugs of saved posts on first render when uncontrolled. */
    defaultSavedSlugs?: string[];
    onSavedChange?: (slugs: string[]) => void;
    className?: string;
}

/** A scroll-snapping row of related posts with previous and next buttons, a position bar and a save toggle on each card. */
export const RelatedPostsRow = ({
    posts,
    heading = "Keep reading",
    description = "More from the platform team, picked for this article.",
    savedSlugs,
    defaultSavedSlugs = [],
    onSavedChange,
    className = "",
}: RelatedPostsRowProps) => {
    const id = useId();
    const headingId = `${id}-heading`;
    const trackId = `${id}-track`;
    const track = useRef<HTMLUListElement>(null);
    const reduce = useReducedMotion();
    const [edges, setEdges] = useState({start: true, end: false});
    const [progress, setProgress] = useState(0);
    const [innerSaved, setInnerSaved] = useState<string[]>(defaultSavedSlugs);
    const saved = savedSlugs ?? innerSaved;

    const measure = useCallback(() => {
        const el = track.current;
        if (!el) return;
        const max = el.scrollWidth - el.clientWidth;
        setEdges({start: el.scrollLeft <= 4, end: el.scrollLeft >= max - 4});
        setProgress(max > 0 ? el.scrollLeft / max : 1);
    }, []);

    useEffect(() => {
        const el = track.current;
        if (!el) return;
        measure();
        el.addEventListener("scroll", measure, {passive: true});
        const observer = new ResizeObserver(measure);
        observer.observe(el);
        return () => {
            el.removeEventListener("scroll", measure);
            observer.disconnect();
        };
    }, [measure]);

    const scrollByCard = (direction: 1 | -1) => {
        const el = track.current;
        if (!el) return;
        const card = el.querySelector("li");
        const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
        el.scrollBy({left: direction * step, behavior: reduce ? "auto" : "smooth"});
    };

    const toggleSave = (slug: string) => {
        const next = saved.includes(slug) ? saved.filter((s) => s !== slug) : [...saved, slug];
        if (savedSlugs === undefined) setInnerSaved(next);
        onSavedChange?.(next);
    };

    const arrow = "flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 outline-none transition hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

    return (
        <section aria-labelledby={headingId} className={`w-full overflow-hidden bg-slate-50 py-14 dark:bg-slate-900/40 ${className}`}>
            <div className="mx-auto max-w-6xl px-4 sm:px-8">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h2 id={headingId} className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{heading}</h2>
                        {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
                    </div>
                    <div className="flex shrink-0 gap-2">
                        <button type="button" onClick={() => scrollByCard(-1)} disabled={edges.start} aria-label="Previous posts" aria-controls={trackId} className={arrow}>
                            <LuChevronLeft className="h-5 w-5"/>
                        </button>
                        <button type="button" onClick={() => scrollByCard(1)} disabled={edges.end} aria-label="Next posts" aria-controls={trackId} className={arrow}>
                            <LuChevronRight className="h-5 w-5"/>
                        </button>
                    </div>
                </div>
            </div>

            <ul id={trackId} ref={track}
                className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 xl:scroll-px-[max(2rem,calc((100%_-_72rem)/2_+_2rem))] xl:px-[max(2rem,calc((100%_-_72rem)/2_+_2rem))] [&::-webkit-scrollbar]:hidden">
                {posts.map((post) => (
                    <li key={post.slug} className="w-[78%] shrink-0 snap-start sm:w-[44%] lg:w-[calc((100%_-_2.5rem)/3.3)]">
                        <RelatedPostCard post={post} saved={saved.includes(post.slug)} onToggleSave={() => toggleSave(post.slug)}/>
                    </li>
                ))}
            </ul>

            <div className="mx-auto mt-4 max-w-6xl px-4 sm:px-8">
                <div className="h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800" aria-hidden="true">
                    <motion.div className="h-full w-1/3 rounded-full bg-slate-900 dark:bg-white"
                                animate={{x: `${progress * 200}%`}}
                                transition={reduce ? {duration: 0} : {type: "spring", stiffness: 300, damping: 40}}/>
                </div>
            </div>
        </section>
    );
};
