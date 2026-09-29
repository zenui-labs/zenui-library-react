import {useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBadgeCheck, LuHeart, LuMessageCircle, LuRepeat2} from "react-icons/lu";

interface Post {
    id: string;
    name: string;
    handle: string;
    initials: string;
    avatar: string;
    verified?: boolean;
    text: string;
    date: string;
    replies: number;
    reposts: number;
    likes: number;
    // Optional attached image, drawn as a gradient card.
    attachment?: {title: string; caption: string};
}

const posts: Post[] = [
    {id: "p1", name: "Dana Whitfield", handle: "danawhit", initials: "DW", avatar: "from-pink-400 to-rose-500", verified: true, text: "Moved our docs site to @inkwell over the weekend. Search went from 'useless' to 'people actually use it'. Build time 4m to 38s. #docs", date: "Sep 21", replies: 14, reposts: 32, likes: 418},
    {id: "p2", name: "Oscar Pham", handle: "oscarbuilds", initials: "OP", avatar: "from-sky-400 to-blue-600", text: "The versioned docs feature in @inkwell is exactly what we needed. v2 and v3 side by side, one config line.", date: "Sep 19", replies: 3, reposts: 8, likes: 96},
    {id: "p3", name: "Priya Anand", handle: "priya_dx", initials: "PA", avatar: "from-emerald-400 to-teal-600", verified: true, text: "Hot take: your API reference should be generated from the OpenAPI spec, and your guides should be written by humans. @inkwell is the first tool I've used that treats those as different jobs.", date: "Sep 17", replies: 41, reposts: 77, likes: 1204, attachment: {title: "API reference", caption: "Generated from openapi.yaml · 214 endpoints"}},
    {id: "p4", name: "Marco Bellini", handle: "marcob", initials: "MB", avatar: "from-amber-400 to-orange-500", text: "Support tickets tagged 'how do I' dropped 30% in the month after we relaunched our docs. Not a coincidence. #devrel", date: "Sep 12", replies: 9, reposts: 21, likes: 233},
    {id: "p5", name: "Yuki Tanaka", handle: "yukit", initials: "YT", avatar: "from-violet-400 to-purple-600", text: "Tiny thing I love: every code block in @inkwell has a copy button that strips the shell prompt. Someone there has pasted a $ into a terminal before.", date: "Sep 9", replies: 6, reposts: 12, likes: 187},
    {id: "p6", name: "Ben Carter", handle: "bencodes", initials: "BC", avatar: "from-cyan-400 to-sky-600", verified: true, text: "We localized our docs into 6 languages with the translation workflow. Reviewers get a diff per page instead of a 400 page PDF. #i18n", date: "Sep 4", replies: 5, reposts: 18, likes: 142},
];

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

const LikeButton = ({count, name}: {count: number; name: string}) => {
    const [liked, setLiked] = useState(false);
    const reduceMotion = useReducedMotion();
    const value = count + (liked ? 1 : 0);

    return (
        <button
            type="button"
            aria-pressed={liked}
            aria-label={`Like post by ${name}, ${value} likes`}
            onClick={() => setLiked((l) => !l)}
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

const SocialPostGrid = () => (
    <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
                <p className="text-sm font-medium text-sky-600 dark:text-sky-400">From the timeline</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    Developers talk about their docs when they finally work
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
                                            <p className="font-mono text-[11px] text-emerald-300">GET /v2/invoices/{"{id}"}</p>
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
                                    <LikeButton count={post.likes} name={post.name}/>
                                </footer>
                            </article>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div className="mt-6 text-center">
                <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                >
                    Read more from the community
                </a>
            </div>
        </div>
    </section>
);

export default SocialPostGrid;
