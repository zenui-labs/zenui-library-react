import {useId, useState} from "react";
import {motion} from "framer-motion";
import {LuChevronDown, LuStar} from "react-icons/lu";

export interface Testimonial {
    name: string;
    role: string;
    company: string;
    quote: string;
    /** Tailwind gradient classes for the initials avatar, for example "from-amber-400 to-orange-500". */
    avatar: string;
    /** Star rating from 1 to 5. Leave it out to show the quote without stars. */
    rating?: number;
    /** Draws the card in the inverted color scheme with a larger quote. */
    highlight?: boolean;
}

export interface RatingSummary {
    /** Average score shown in bold, for example 4.9. */
    score: number;
    /** Text after the score, for example "from 2,300 reviews". */
    caption: string;
}

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

const Stars = ({rating}: {rating: number}) => (
    <div className="flex gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {Array.from({length: 5}, (_, i) => (
            <LuStar key={i} aria-hidden="true"
                    className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`}/>
        ))}
    </div>
);

export interface TestimonialCardProps {
    testimonial: Testimonial;
    className?: string;
}

/** One quote card with optional stars, the quote and an initials avatar. */
export const TestimonialCard = ({testimonial: t, className = ""}: TestimonialCardProps) => (
    <figure
        className={`mb-4 break-inside-avoid rounded-2xl border p-6 ${t.highlight
            ? "border-transparent bg-slate-900 text-white shadow-xl shadow-slate-900/10 dark:bg-white dark:text-slate-900"
            : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"} ${className}`}>
        {t.rating !== undefined && <Stars rating={t.rating}/>}
        <blockquote className={`${t.rating ? "mt-3" : ""} ${t.highlight ? "text-lg leading-relaxed" : "text-sm leading-relaxed"}`}>
            <p>&ldquo;{t.quote}&rdquo;</p>
        </blockquote>
        <figcaption className="mt-5 flex items-center gap-3">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold text-white ${t.avatar}`}>
                {initials(t.name)}
            </span>
            <span>
                <span className={`block text-sm font-semibold ${t.highlight ? "" : "text-slate-900 dark:text-white"}`}>{t.name}</span>
                <span className={`block text-xs ${t.highlight ? "text-white/60 dark:text-slate-500" : "text-slate-500"}`}>
                    {t.role}, {t.company}
                </span>
            </span>
        </figcaption>
    </figure>
);

export interface TestimonialWallProps {
    testimonials: Testimonial[];
    /** Score line above the title. Leave it out to hide the line. */
    summary?: RatingSummary;
    title?: string;
    /** Height of the wall in pixels while it is collapsed. */
    collapsedHeight?: number;
    defaultExpanded?: boolean;
    expandLabel?: string;
    collapseLabel?: string;
    className?: string;
}

/** A masonry wall of quotes that starts collapsed behind a fade and expands to show every card. */
export const TestimonialWall = ({
    testimonials,
    summary,
    title = "Support teams that switched, in their own words",
    collapsedHeight = 560,
    defaultExpanded = false,
    expandLabel = "Show all reviews",
    collapseLabel = "Show fewer reviews",
    className = "",
}: TestimonialWallProps) => {
    const [expanded, setExpanded] = useState(defaultExpanded);
    const wallId = useId();

    return (
        <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    {summary && (
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <Stars rating={Math.round(summary.score)}/>
                            <span><strong className="font-semibold text-slate-900 dark:text-white">{summary.score.toFixed(1)}</strong> {summary.caption}</span>
                        </div>
                    )}
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        {title}
                    </h2>
                </div>

                <div className="relative mt-12">
                    <motion.div
                        id={wallId}
                        initial={false}
                        animate={{height: expanded ? "auto" : collapsedHeight}}
                        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                        className="overflow-hidden"
                    >
                        <div className="columns-1 gap-4 sm:columns-2 md:columns-3">
                            {testimonials.map((t) => (
                                <TestimonialCard key={t.name} testimonial={t}/>
                            ))}
                        </div>
                    </motion.div>

                    {!expanded && (
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50 to-transparent dark:from-slate-950"/>
                    )}
                </div>

                <div className="mt-6 flex justify-center">
                    <button
                        type="button"
                        onClick={() => setExpanded((v) => !v)}
                        aria-expanded={expanded}
                        aria-controls={wallId}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        {expanded ? collapseLabel : expandLabel}
                        <LuChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}/>
                    </button>
                </div>
            </div>
        </section>
    );
};
