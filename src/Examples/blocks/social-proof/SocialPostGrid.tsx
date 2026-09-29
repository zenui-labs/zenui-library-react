import {useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBadgeCheck, LuHeart, LuMessageCircle, LuRepeat2} from "react-icons/lu";

export interface PostAttachment {
    title: string;
    caption: string;
    /** Monospace line at the top of the preview, for example an API route. */
    code: string;
}

export interface SocialPost {
    id: string;
    name: string;
    /** Handle without the @. */
    handle: string;
    initials: string;
    /** Tailwind gradient classes for the initials avatar, for example "from-pink-400 to-rose-500". */
    avatar: string;
    verified?: boolean;
    /** Post text. Words that start with @ or # are highlighted. */
    text: string;
    date: string;
    replies: number;
    reposts: number;
    likes: number;
    /** Optional preview card drawn under the text. */
    attachment?: PostAttachment;
}

export interface PostLink {
    label: string;
    href: string;
}

// Highlights @mentions and #tags inside the post text.
const renderText = (text: string): ReactNode[] =>
    text.split(/(\s+)/).map((part, i) =>
        /^[@#]\w+/.test(part) ? (
            <span key={i} className="font-medium text-sky-600 dark:text-sky-400">{part}</span>
        ) : (
            part
        ),
    );

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

interface LikeButtonProps {
    count: number;
    name: string;
    onChange?: (liked: boolean) => void;
}

const LikeButton = ({count, name, onChange}: LikeButtonProps) => {
    const [liked, setLiked] = useState(false);
    const reduceMotion = useReducedMotion();
    const value = count + (liked ? 1 : 0);

    const toggle = () => {
        setLiked(!liked);
        onChange?.(!liked);
    };

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label={`Like post by ${name}, ${value} likes`}
            onClick={toggle}
            className={`group flex items-center gap-1.5 rounded-full px-2 py-1 text-xs outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-400 ${liked ? "text-rose-500" : "text-slate-500 hover:text-rose-500 dark:text-slate-400"}`}
        >
            <motion.span
                animate={liked && !reduceMotion ? {scale: [1, 1.35, 1]} : {scale: 1}}
                transition={{duration: 0.35}}
                className="flex h-7 w-7 items-center justify-center rounded-full transition-colors group-hover:bg-rose-50 dark:group-hover:bg-rose-500/10"
            >
                <LuHeart className="h-4 w-4" fill={liked ? "currentColor" : "none"}/>
            </motion.span>
            <span className="relative h-4 overflow-hidden tabular-nums">
                <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                        key={value}
                        initial={{y: liked ? 12 : -12, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: liked ? -12 : 12, opacity: 0}}
                        transition={{duration: 0.2}}
                        className="block leading-4"
                    >
                        {formatCount(value)}
                    </motion.span>
                </AnimatePresence>
            </span>
        </button>
    );
};

export interface SocialPostCardProps {
    post: SocialPost;
    /** Called when the viewer likes or unlikes the post. */
    onLikeChange?: (postId: string, liked: boolean) => void;
}

/** One post with author, highlighted text, an optional preview and a like button. */
export const SocialPostCard = ({post, onLikeChange}: SocialPostCardProps) => (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
        <header className="flex items-start gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${post.avatar}`}>
                {post.initials}
            </span>
            <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
                    {post.name}
                    {post.verified && (
                        <>
                            <LuBadgeCheck className="h-4 w-4 shrink-0 text-sky-500" aria-hidden="true"/>
                            <span className="sr-only">Verified</span>
                        </>
                    )}
                </p>
                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    @{post.handle} · <time>{post.date}</time>
                </p>
            </div>
        </header>
        <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-slate-800 dark:text-slate-200">{renderText(post.text)}</p>
        {post.attachment && (
            <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="space-y-2 bg-gradient-to-br from-slate-900 to-slate-800 p-4">
                    <p className="font-mono text-[11px] text-emerald-300">{post.attachment.code}</p>
                    <div className="h-2 w-3/4 rounded bg-white/15"/>
                    <div className="h-2 w-1/2 rounded bg-white/10"/>
                    <div className="h-2 w-2/3 rounded bg-white/10"/>
                </div>
                <div className="px-3 py-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{post.attachment.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{post.attachment.caption}</p>
                </div>
            </div>
        )}
        <footer className="-ml-2 mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-2 py-1">
                <LuMessageCircle className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Replies</span>{formatCount(post.replies)}
            </span>
            <span className="flex items-center gap-1.5 px-2 py-1">
                <LuRepeat2 className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Reposts</span>{formatCount(post.reposts)}
            </span>
            <LikeButton count={post.likes} name={post.name} onChange={(liked) => onLikeChange?.(post.id, liked)}/>
        </footer>
    </article>
);

export interface SocialPostGridProps {
    posts: SocialPost[];
    eyebrow?: string;
    title?: string;
    /** Button under the grid, for example a link to more posts. Leave it out to hide the button. */
    moreLink?: PostLink;
    onLikeChange?: (postId: string, liked: boolean) => void;
    className?: string;
}

/** Customer posts in a masonry grid that fades in as it scrolls into view. */
export const SocialPostGrid = ({
    posts,
    eyebrow = "From the timeline",
    title = "Developers talk about their docs when they finally work",
    moreLink,
    onLikeChange,
    className = "",
}: SocialPostGridProps) => (
    <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">{eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    {title}
                </h2>
            </div>

            <div className="mt-12">
                <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {posts.map((post, i) => (
                        <motion.li
                            key={post.id}
                            initial={{opacity: 0, y: 16}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true, amount: 0.2}}
                            transition={{delay: (i % 3) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                            className="mb-4 break-inside-avoid"
                        >
                            <SocialPostCard post={post} onLikeChange={onLikeChange}/>
                        </motion.li>
                    ))}
                </ul>
            </div>

            {moreLink && (
                <div className="mt-6 text-center">
                    <a
                        href={moreLink.href}
                        className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        {moreLink.label}
                    </a>
                </div>
            )}
        </div>
    </section>
);
