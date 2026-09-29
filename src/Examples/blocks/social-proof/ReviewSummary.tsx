import {useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuBadgeCheck, LuStar, LuThumbsUp, LuX} from "react-icons/lu";

export type ReviewSort = "recent" | "highest" | "lowest";

export type StarCount = 1 | 2 | 3 | 4 | 5;

/** Number of reviews for each star rating, across every review and not only the ones listed. */
export type RatingDistribution = Record<StarCount, number>;

export interface Review {
    id: string;
    name: string;
    /** Job title and company type shown after the name. */
    role: string;
    rating: number;
    title: string;
    body: string;
    /** Date as shown on the card, for example "Sep 18, 2026". */
    date: string;
    /** ISO date used for sorting and for the time element. */
    iso: string;
    /** Helpful votes before the viewer votes. */
    helpful: number;
    verified: boolean;
}

export interface AspectScore {
    label: string;
    /** Score out of 5. */
    score: number;
}

const STAR_ROWS: StarCount[] = [5, 4, 3, 2, 1];

const Stars = ({rating, size = "h-4 w-4"}: {rating: number; size?: string}) => (
    <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((n) => {
            const fill = Math.max(0, Math.min(1, rating - n + 1));
            return (
                <span key={n} className={`relative ${size}`}>
                    <LuStar className={`absolute inset-0 ${size} text-slate-200 dark:text-slate-700`} fill="currentColor"/>
                    <span className="absolute inset-0 overflow-hidden" style={{width: `${fill * 100}%`}}>
                        <LuStar className={`${size} text-amber-400`} fill="currentColor"/>
                    </span>
                </span>
            );
        })}
    </span>
);

export interface ReviewCardProps {
    review: Review;
    /** Whether the viewer marked this review as helpful. */
    voted?: boolean;
    onToggleVote?: (id: string) => void;
    helpfulLabel?: string;
    verifiedLabel?: string;
}

/** One review with stars, date, author and a helpful button. */
export const ReviewCard = ({
    review,
    voted = false,
    onToggleVote,
    helpfulLabel = "Helpful",
    verifiedLabel = "Verified customer",
}: ReviewCardProps) => (
    <article>
        <div className="flex items-center justify-between gap-3">
            <Stars rating={review.rating}/>
            <span className="sr-only">{review.rating} out of 5 stars</span>
            <time dateTime={review.iso} className="text-xs text-slate-400">{review.date}</time>
        </div>
        <h3 className="mt-3 font-semibold text-slate-900 dark:text-white">{review.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{review.body}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm">
                <span className="font-medium text-slate-900 dark:text-white">{review.name}</span>
                <span className="text-slate-500 dark:text-slate-400"> · {review.role}</span>
                {review.verified && (
                    <span className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <LuBadgeCheck className="h-3.5 w-3.5"/> {verifiedLabel}
                    </span>
                )}
            </p>
            <button
                type="button"
                aria-pressed={voted}
                onClick={() => onToggleVote?.(review.id)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${voted
                    ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            >
                <LuThumbsUp className="h-3.5 w-3.5"/>
                {helpfulLabel} · <span className="tabular-nums">{review.helpful + (voted ? 1 : 0)}</span>
            </button>
        </div>
    </article>
);

export interface ReviewSummaryProps {
    /** Reviews listed on the page. */
    reviews: Review[];
    /** Counts per star rating. The average, the total and the bars are worked out from it. */
    distribution: RatingDistribution;
    /** Scores for individual aspects, shown in a grid under the bars. */
    aspects?: AspectScore[];
    title?: string;
    defaultSort?: ReviewSort;
    /** Called when the viewer marks a review as helpful or takes the vote back. */
    onVote?: (reviewId: string, helpful: boolean) => void;
    className?: string;
}

/**
 * An average score with rating bars that filter the list, aspect scores, a sort menu and helpful votes.
 */
export const ReviewSummary = ({
    reviews,
    distribution,
    aspects = [],
    title = "What agencies say about Hourglass",
    defaultSort = "recent",
    onVote,
    className = "",
}: ReviewSummaryProps) => {
    const [starFilter, setStarFilter] = useState<number | null>(null);
    const [sort, setSort] = useState<ReviewSort>(defaultSort);
    const [voted, setVoted] = useState<Set<string>>(new Set());

    const total = STAR_ROWS.reduce((sum, stars) => sum + distribution[stars], 0);
    const average = total ? STAR_ROWS.reduce((sum, stars) => sum + stars * distribution[stars], 0) / total : 0;

    const visible = useMemo(() => {
        const list = starFilter ? reviews.filter((r) => r.rating === starFilter) : [...reviews];
        if (sort === "highest") list.sort((a, b) => b.rating - a.rating);
        else if (sort === "lowest") list.sort((a, b) => a.rating - b.rating);
        else list.sort((a, b) => b.iso.localeCompare(a.iso));
        return list;
    }, [reviews, starFilter, sort]);

    const toggleVote = (id: string) => {
        const helpful = !voted.has(id);
        setVoted((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
        onVote?.(id, helpful);
    };

    return (
        <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-14">
                <div className="lg:sticky lg:top-8 lg:self-start">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                    <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-end gap-4">
                            <p className="text-6xl font-semibold tracking-tight text-slate-900 dark:text-white">{average.toFixed(1)}</p>
                            <div className="pb-2">
                                <Stars rating={average} size="h-5 w-5"/>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    <span className="sr-only">Average rating {average.toFixed(1)} out of 5, </span>
                                    Based on {total.toLocaleString("en-US")} reviews
                                </p>
                            </div>
                        </div>

                        <ul className="mt-6 space-y-1" aria-label="Filter reviews by rating">
                            {STAR_ROWS.map((stars) => {
                                const count = distribution[stars];
                                const share = total ? count / total : 0;
                                const selected = starFilter === stars;
                                return (
                                    <li key={stars}>
                                        <button
                                            type="button"
                                            aria-pressed={selected}
                                            onClick={() => setStarFilter(selected ? null : stars)}
                                            className={`group flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${selected ? "bg-amber-50 dark:bg-amber-500/10" : "hover:bg-slate-50 dark:hover:bg-slate-800/60"}`}
                                        >
                                            <span className="w-12 shrink-0 text-left font-medium text-slate-700 dark:text-slate-300">{stars} star</span>
                                            <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                                <motion.span
                                                    className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-amber-400"
                                                    initial={{scaleX: 0}}
                                                    whileInView={{scaleX: share}}
                                                    viewport={{once: true}}
                                                    transition={{duration: 0.8, delay: (5 - stars) * 0.06, ease: [0.16, 1, 0.3, 1]}}
                                                />
                                            </span>
                                            <span className="w-12 shrink-0 text-right tabular-nums text-slate-500 dark:text-slate-400">{Math.round(share * 100)}%</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>

                        {aspects.length > 0 && (
                            <dl className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 dark:border-slate-800">
                                {aspects.map((aspect) => (
                                    <div key={aspect.label} className="flex flex-col rounded-xl bg-slate-50 p-3 dark:bg-slate-800/50">
                                        <dt className="order-2 text-xs text-slate-500 dark:text-slate-400">{aspect.label}</dt>
                                        <dd className="order-1 text-lg font-semibold text-slate-900 dark:text-white">{aspect.score.toFixed(1)}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2" aria-live="polite">
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                Showing {visible.length} {starFilter ? `${starFilter} star ` : ""}review{visible.length === 1 ? "" : "s"}
                            </p>
                            {starFilter && (
                                <button
                                    type="button"
                                    onClick={() => setStarFilter(null)}
                                    className="flex items-center gap-1 rounded-full bg-slate-200/70 px-2 py-0.5 text-xs font-medium text-slate-700 outline-none hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-slate-800 dark:text-slate-300"
                                >
                                    Clear <LuX className="h-3 w-3"/>
                                </button>
                            )}
                        </div>
                        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            Sort by
                            <select
                                value={sort}
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as ReviewSort)}
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                            >
                                <option value="recent">Most recent</option>
                                <option value="highest">Highest rated</option>
                                <option value="lowest">Lowest rated</option>
                            </select>
                        </label>
                    </div>

                    <ul className="mt-5 space-y-4">
                        <AnimatePresence mode="popLayout" initial={false}>
                            {visible.map((review) => (
                                <motion.li
                                    key={review.id}
                                    layout
                                    initial={{opacity: 0, y: 8}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.25}}
                                    className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                                >
                                    <ReviewCard review={review} voted={voted.has(review.id)} onToggleVote={toggleVote}/>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>

                    {visible.length === 0 && (
                        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
                            <p className="font-medium text-slate-900 dark:text-white">No {starFilter} star reviews on this page</p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try another rating or clear the filter to see every review.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
