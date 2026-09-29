import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

export type CoverShape = "circles" | "bars" | "wave";

export interface PostCover {
    /** Tailwind gradient start class, for example "from-indigo-500". */
    from: string;
    /** Tailwind gradient end class, for example "to-sky-400". */
    to: string;
    /** Pattern drawn over the gradient. */
    shape: CoverShape;
}

export interface BlogPost {
    slug: string;
    topic: string;
    title: string;
    excerpt: string;
    author: string;
    /** Display date, for example "Sep 18, 2026". */
    date: string;
    readMinutes: number;
    cover: PostCover;
    /** Link to the post. Defaults to "#". */
    href?: string;
}

export interface PostCoverArtProps {
    cover: PostCover;
    /** Taller art for the featured post. */
    large?: boolean;
}

/** Generated cover art: a gradient with a simple SVG pattern that scales up on card hover. */
export const PostCoverArt = ({cover, large = false}: PostCoverArtProps) => (
    <div className={`relative overflow-hidden bg-gradient-to-br ${cover.from} ${cover.to} ${large ? "aspect-[16/10] md:aspect-auto md:h-full md:min-h-[280px]" : "aspect-[16/9]"}`}>
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice"
             className="absolute inset-0 h-full w-full text-white transition-transform duration-500 group-hover:scale-105" aria-hidden="true">
            {cover.shape === "circles" && (
                <g fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.5">
                    {[30, 55, 80, 105].map((r) => <circle key={r} cx="250" cy="40" r={r}/>)}
                    <circle cx="250" cy="40" r="14" fill="currentColor" fillOpacity="0.6"/>
                </g>
            )}
            {cover.shape === "bars" && (
                <g fill="currentColor">
                    {[70, 110, 90, 140, 120, 160, 130].map((h, i) => (
                        <rect key={i} x={40 + i * 36} y={180 - h} width="22" height={h} rx="4" fillOpacity={0.15 + i * 0.07}/>
                    ))}
                </g>
            )}
            {cover.shape === "wave" && (
                <g fill="none" stroke="currentColor" strokeWidth="2">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <path key={i} strokeOpacity={0.2 + i * 0.12}
                              d={`M-10 ${70 + i * 20} C 60 ${30 + i * 20}, 120 ${110 + i * 20}, 190 ${70 + i * 20} S 290 ${30 + i * 20}, 340 ${70 + i * 20}`}/>
                    ))}
                </g>
            )}
        </svg>
    </div>
);

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

const Meta = ({post}: {post: BlogPost}) => (
    <div className="flex items-center gap-3 text-xs">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            {initials(post.author)}
        </span>
        <div className="min-w-0">
            <p className="font-medium text-slate-900 dark:text-slate-200">{post.author}</p>
            <p className="text-slate-500 dark:text-slate-400">
                <time>{post.date}</time> <span aria-hidden="true">·</span> {post.readMinutes} min read
            </p>
        </div>
    </div>
);

export interface BlogPostCardProps {
    post: BlogPost;
}

/** A single post card with cover art, topic, title, excerpt and author. The whole card is clickable. */
export const BlogPostCard = ({post}: BlogPostCardProps) => (
    <article
        className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-shadow hover:shadow-lg hover:shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none">
        <PostCoverArt cover={post.cover}/>
        <div className="flex flex-1 flex-col p-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{post.topic}</p>
            <h3 className="mt-2 font-semibold leading-snug text-slate-900 dark:text-white">
                <a href={post.href ?? "#"} className="outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-500">
                    {post.title}
                </a>
            </h3>
            <p className="mt-2 line-clamp-2 flex-1 text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
            <div className="mt-5"><Meta post={post}/></div>
        </div>
    </article>
);

export interface BlogGridProps {
    posts: BlogPost[];
    /** Topics shown as filters. Defaults to the topics found in `posts`, in order of first use. */
    topics?: string[];
    /** Selected topic when controlled. `null` shows every post. */
    topic?: string | null;
    /** Selected topic on first render when uncontrolled. */
    defaultTopic?: string | null;
    onTopicChange?: (topic: string | null) => void;
    heading?: string;
    description?: string;
    /** Label of the filter that shows every post. */
    allLabel?: string;
    /** Text before the topic on the featured post. */
    featuredLabel?: string;
    viewAllLabel?: string;
    viewAllHref?: string;
    className?: string;
}

/** A featured post above a grid of post cards, with topic filters. The first post that matches the filter is featured. */
export const BlogGrid = ({
    posts,
    topics,
    topic,
    defaultTopic = null,
    onTopicChange,
    heading = "From the blog",
    description = "Notes from the people building Lattice.",
    allLabel = "All",
    featuredLabel = "Featured",
    viewAllLabel = "View all posts",
    viewAllHref = "#",
    className = "",
}: BlogGridProps) => {
    const [innerTopic, setInnerTopic] = useState<string | null>(defaultTopic);
    const current = topic !== undefined ? topic : innerTopic;
    const topicList = topics ?? Array.from(new Set(posts.map((post) => post.topic)));
    const filters: (string | null)[] = [null, ...topicList];
    const filtered = posts.filter((post) => current === null || post.topic === current);
    const [featured, ...rest] = filtered;

    const select = (next: string | null) => {
        if (topic === undefined) setInnerTopic(next);
        onTopicChange?.(next);
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-slate-800">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{heading}</h2>
                        {description && <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>}
                    </div>
                    <div className="flex gap-1 rounded-xl bg-slate-100 p-1 dark:bg-slate-900" role="group" aria-label="Filter posts by topic">
                        {filters.map((t) => (
                            <button key={t ?? "all"} type="button" aria-pressed={current === t} onClick={() => select(t)}
                                    className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${current === t
                                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                                        : "text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                {t ?? allLabel}
                            </button>
                        ))}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={current ?? "all"}
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -8}}
                                transition={{duration: 0.2}}>
                        {featured && (
                            <article className="group relative mt-8 grid overflow-hidden rounded-3xl border border-slate-200 bg-white md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900">
                                <PostCoverArt cover={featured.cover} large/>
                                <div className="flex flex-col p-6 sm:p-8">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {featuredLabel}, {featured.topic}
                                    </p>
                                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                        <a href={featured.href ?? "#"} className="outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:ring-2 focus-visible:after:ring-indigo-500">
                                            {featured.title}
                                        </a>
                                    </h3>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{featured.excerpt}</p>
                                    <div className="mt-6"><Meta post={featured}/></div>
                                </div>
                                <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-900 opacity-0 shadow transition-opacity group-hover:opacity-100 dark:bg-slate-900/90 dark:text-white">
                                    <LuArrowUpRight className="h-4 w-4"/>
                                </span>
                            </article>
                        )}

                        {rest.length > 0 && (
                            <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                                {rest.map((post) => <BlogPostCard key={post.slug} post={post}/>)}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {viewAllLabel && (
                    <div className="mt-10 text-center">
                        <a href={viewAllHref} className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-slate-900 outline-none hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white dark:hover:text-indigo-400">
                            {viewAllLabel} <LuArrowUpRight className="h-4 w-4"/>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};
