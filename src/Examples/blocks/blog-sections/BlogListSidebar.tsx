import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuLoader, LuMail, LuSearch, LuX} from "react-icons/lu";

export interface ListPost {
    slug: string;
    /** Must match the `name` of one of the categories. */
    category: string;
    title: string;
    excerpt: string;
    author: string;
    /** Display date, for example "Sep 24, 2026". */
    date: string;
    minutes: number;
    /** Link to the post. Defaults to "#". */
    href?: string;
}

export interface PostCategory {
    name: string;
    /** Tailwind background class for the category dot, for example "bg-sky-500". */
    color: string;
}

export interface PopularTag {
    label: string;
    /** Text put in the search box when the tag is clicked. Defaults to the label in lowercase. */
    query?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface BlogListSidebarProps {
    posts: ListPost[];
    categories: PostCategory[];
    /** Tags under "Popular topics". Each one fills the search box. */
    tags?: PopularTag[];
    eyebrow?: string;
    heading?: string;
    description?: string;
    /** Label of the filter that shows every category. */
    allLabel?: string;
    /** Posts shown at first and added by each load more click. */
    pageSize?: number;
    /** Delay in milliseconds before the next page shows. Stands in for a paginated request. */
    loadMoreDelay?: number;
    searchPlaceholder?: string;
    newsletterTitle?: string;
    newsletterText?: string;
    /** Called with the trimmed address after it passes validation. */
    onSubscribe?: (email: string) => void;
    className?: string;
}

/** A dated post list with a sticky sidebar for search, categories with counts, topic tags and a newsletter signup. */
export const BlogListSidebar = ({
    posts,
    categories,
    tags = [],
    eyebrow = "Tally journal",
    heading = "Getting paid, explained",
    description = "Guides, product news and stories from small businesses that send invoices for a living.",
    allLabel = "All posts",
    pageSize = 4,
    loadMoreDelay = 700,
    searchPlaceholder = "Search posts",
    newsletterTitle = "One email a month",
    newsletterText = "The best new guides, sent the first Tuesday. 18,400 readers.",
    onSubscribe,
    className = "",
}: BlogListSidebarProps) => {
    const id = useId();
    const searchId = `${id}-search`;
    const emailId = `${id}-email`;
    const emailErrorId = `${id}-email-error`;
    const [category, setCategory] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(pageSize);
    const [loadingMore, setLoadingMore] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState<"idle" | "error" | "done">("idle");
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((post) =>
            (category === null || post.category === category) &&
            (q === "" || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)),
        );
    }, [posts, category, query]);

    const shown = filtered.slice(0, visible);
    const colorFor = (name: string) => categories.find((c) => c.name === name)?.color ?? "bg-zinc-400";
    const countFor = (name: string) => posts.filter((p) => p.category === name).length;
    const filters: (string | null)[] = [null, ...categories.map((c) => c.name)];

    const pickCategory = (next: string | null) => {
        setCategory(next);
        setVisible(pageSize);
    };

    const loadMore = () => {
        setLoadingMore(true);
        // Replace with a paginated request.
        timer.current = window.setTimeout(() => {
            setVisible((v) => v + pageSize);
            setLoadingMore(false);
        }, loadMoreDelay);
    };

    const subscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = email.trim();
        if (emailPattern.test(value)) {
            setSubscribed("done");
            onSubscribe?.(value);
        } else {
            setSubscribed("error");
        }
    };

    return (
        <section className={`w-full bg-white px-4 py-14 sm:px-8 dark:bg-zinc-950 ${className}`}>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-14">
                <div className="min-w-0">
                    {eyebrow && <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">{eyebrow}</p>}
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                        {heading}
                    </h2>
                    {description && (
                        <p className="mt-3 max-w-xl text-zinc-600 dark:text-zinc-400">
                            {description}
                        </p>
                    )}

                    {/* Category pills for small screens */}
                    <div className="-mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden" role="group" aria-label="Filter by category">
                        {filters.map((c) => (
                            <button key={c ?? "all"} type="button" aria-pressed={category === c} onClick={() => pickCategory(c)}
                                    className={`shrink-0 rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${category === c
                                        ? "border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900"
                                        : "border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600"}`}>
                                {c ?? allLabel}
                            </button>
                        ))}
                    </div>

                    <ul className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800" aria-live="polite">
                        <AnimatePresence initial={false}>
                            {shown.map((post) => (
                                <motion.li key={post.slug} layout="position"
                                           initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                           transition={{duration: 0.2}}
                                           className="group relative grid gap-3 py-6 sm:grid-cols-[120px_minmax(0,1fr)] sm:gap-6">
                                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                        <time>{post.date}</time>
                                        <p className="mt-1 hidden sm:block">{post.minutes} min read</p>
                                    </div>
                                    <div>
                                        <p className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                                            <span className={`h-1.5 w-1.5 rounded-full ${colorFor(post.category)}`} aria-hidden="true"/>
                                            {post.category}
                                        </p>
                                        <h3 className="mt-2 text-lg font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-sky-700 dark:text-white dark:group-hover:text-sky-400">
                                            <a href={post.href ?? "#"} className="outline-none after:absolute after:inset-0 focus-visible:after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-sky-500">
                                                {post.title}
                                            </a>
                                        </h3>
                                        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{post.excerpt}</p>
                                        <p className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-900 dark:text-white">
                                            Read post
                                            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true"/>
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>

                    {filtered.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-700">
                            <p className="font-medium text-zinc-900 dark:text-white">No posts match &ldquo;{query}&rdquo;</p>
                            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Try a shorter search or another category.</p>
                            <button type="button" onClick={() => { setQuery(""); pickCategory(null); }}
                                    className="mt-4 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 outline-none hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900">
                                Clear filters
                            </button>
                        </div>
                    )}

                    {visible < filtered.length && (
                        <button type="button" onClick={loadMore} disabled={loadingMore}
                                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 py-3 text-sm font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-sky-500 disabled:cursor-wait disabled:opacity-70 dark:border-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-900">
                            {loadingMore && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                            {loadingMore ? "Loading posts" : `Load more posts (${filtered.length - visible} left)`}
                        </button>
                    )}
                </div>

                <aside className="space-y-8 lg:sticky lg:top-6 lg:self-start">
                    <div className="relative">
                        <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true"/>
                        <input id={searchId} type="search" value={query} placeholder={searchPlaceholder}
                               onChange={(e) => { setQuery(e.target.value); setVisible(pageSize); }}
                               className="w-full rounded-xl border border-zinc-200 bg-zinc-50 py-2.5 pl-9 pr-9 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white dark:focus:bg-zinc-900 [&::-webkit-search-cancel-button]:hidden"/>
                        {query && (
                            <button type="button" onClick={() => setQuery("")} aria-label="Clear search"
                                    className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 outline-none hover:text-zinc-700 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-zinc-200">
                                <LuX className="h-3.5 w-3.5"/>
                            </button>
                        )}
                    </div>

                    <nav aria-label="Categories" className="hidden lg:block">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Categories</h3>
                        <ul className="mt-3 space-y-0.5">
                            {filters.map((c) => {
                                const current = category === c;
                                return (
                                    <li key={c ?? "all"}>
                                        <button type="button" aria-pressed={current} onClick={() => pickCategory(c)}
                                                className={`relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${current
                                                    ? "font-medium text-zinc-900 dark:text-white"
                                                    : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"}`}>
                                            {current && (
                                                <motion.span layoutId={`${id}-category`} transition={{type: "spring", bounce: 0.15, duration: 0.35}}
                                                             className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-zinc-800"/>
                                            )}
                                            <span className="relative flex items-center gap-2.5">
                                                <span className={`h-2 w-2 rounded-full ${c ? colorFor(c) : "bg-zinc-400"}`} aria-hidden="true"/>
                                                {c ?? allLabel}
                                            </span>
                                            <span className="relative text-xs tabular-nums text-zinc-400">{c ? countFor(c) : posts.length}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {tags.length > 0 && (
                        <div>
                            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Popular topics</h3>
                            <ul className="mt-3 flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <li key={tag.label}>
                                        <button type="button" onClick={() => setQuery(tag.query ?? tag.label.toLowerCase())}
                                                className="rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-sky-500 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800">
                                            #{tag.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-5 ring-1 ring-inset ring-sky-100 dark:from-sky-500/10 dark:to-indigo-500/10 dark:ring-sky-500/20">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sky-600 shadow-sm dark:bg-zinc-900 dark:text-sky-400">
                            <LuMail className="h-4 w-4" aria-hidden="true"/>
                        </span>
                        <h3 className="mt-3 font-semibold text-zinc-900 dark:text-white">{newsletterTitle}</h3>
                        {newsletterText && <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{newsletterText}</p>}
                        <AnimatePresence mode="wait" initial={false}>
                            {subscribed === "done" ? (
                                <motion.p key="done" initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} role="status"
                                          className="mt-4 flex items-center gap-2 rounded-lg bg-white px-3 py-2.5 text-sm font-medium text-emerald-700 dark:bg-zinc-900 dark:text-emerald-400">
                                    <LuCheck className="h-4 w-4" aria-hidden="true"/> You are on the list
                                </motion.p>
                            ) : (
                                <motion.form key="form" onSubmit={subscribe} noValidate exit={{opacity: 0}} className="mt-4 space-y-2">
                                    <label htmlFor={emailId} className="sr-only">Email address</label>
                                    <input id={emailId} type="email" autoComplete="email" value={email} placeholder="you@business.com"
                                           onChange={(e) => { setEmail(e.target.value); setSubscribed("idle"); }}
                                           aria-invalid={subscribed === "error" ? true : undefined}
                                           aria-describedby={subscribed === "error" ? emailErrorId : undefined}
                                           className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-4 dark:bg-zinc-900 dark:text-white ${subscribed === "error"
                                               ? "border-rose-400 focus:ring-rose-500/10"
                                               : "border-zinc-200 focus:border-sky-500 focus:ring-sky-500/10 dark:border-zinc-700"}`}/>
                                    {subscribed === "error" && (
                                        <p id={emailErrorId} className="text-xs text-rose-600 dark:text-rose-400">Enter a valid email address.</p>
                                    )}
                                    <button type="submit"
                                            className="w-full rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-950">
                                        Subscribe
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </aside>
            </div>
        </section>
    );
};
