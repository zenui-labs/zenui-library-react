import {useRef, useState} from "react";
import {motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring} from "framer-motion";
import {LuBookOpen} from "react-icons/lu";

export interface ArticleSection {
    heading: string;
    paragraphs: string[];
}

export interface ReadingProgressProps {
    sections: ArticleSection[];
    /** Short title shown in the sticky header next to the book icon. */
    title: string;
    /** Large headline at the top of the article. */
    headline: string;
    /** Estimated reading time for the whole article, used for the minutes left label. */
    readingMinutes: number;
    /** Small label above the headline. */
    category?: string;
    /** Author line shown before the reading time, for example "Marcus Lee, Staff engineer". */
    byline?: string;
    /** Label shown once the reader reaches the end. */
    finishedLabel?: string;
    /** Accessible name of the scrollable article panel. */
    ariaLabel?: string;
    className?: string;
}

// A reading bar and a progress ring, both driven by the scroll position of the article panel.
export const ReadingProgress = ({
    sections,
    title,
    headline,
    readingMinutes,
    category,
    byline,
    finishedLabel = "Finished",
    ariaLabel = "Article, scroll to read",
    className = "",
}: ReadingProgressProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();
    const {scrollYProgress} = useScroll({container: containerRef});
    // A spring smooths out jumpy wheel scrolling. With reduced motion the bar tracks scroll exactly.
    const smooth = useSpring(scrollYProgress, {stiffness: 220, damping: 32, restDelta: 0.001});
    const progress = reduceMotion ? scrollYProgress : smooth;

    const [percent, setPercent] = useState(0);
    // Only re-render when the rounded number changes, not on every scroll event.
    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const next = Math.round(value * 100);
        setPercent((current) => (current === next ? current : next));
    });
    const minutesLeft = Math.max(0, Math.ceil(readingMinutes * (1 - percent / 100)));

    return (
        <div className={`w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                className="relative h-[440px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
            >
                <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/85 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85">
                    <div className="flex items-center justify-between gap-4 px-5 py-3">
                        <div className="flex min-w-0 items-center gap-2 text-sm">
                            <LuBookOpen className="h-4 w-4 shrink-0 text-gray-400 dark:text-slate-500" aria-hidden="true"/>
                            <span className="truncate font-medium text-gray-900 dark:text-white">{title}</span>
                        </div>
                        <div className="flex shrink-0 items-center gap-3">
                            <span className="hidden text-xs text-gray-500 tabular-nums sm:inline dark:text-slate-400">
                                {minutesLeft > 0 ? `${minutesLeft} min left` : finishedLabel}
                            </span>
                            <div className="relative h-9 w-9" role="progressbar" aria-label="Reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
                                <svg viewBox="0 0 36 36" className="h-9 w-9 -rotate-90" aria-hidden="true">
                                    <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="stroke-gray-200 dark:stroke-slate-800"/>
                                    <motion.circle
                                        cx="18"
                                        cy="18"
                                        r="15"
                                        fill="none"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        style={{pathLength: progress}}
                                        className="stroke-blue-600 dark:stroke-blue-400"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-gray-700 tabular-nums dark:text-slate-300" aria-hidden="true">
                                    {percent}
                                </span>
                            </div>
                        </div>
                    </div>
                    <motion.div aria-hidden="true" style={{scaleX: progress}} className="h-0.5 origin-left bg-gradient-to-r from-blue-600 via-violet-500 to-fuchsia-500 dark:from-blue-400 dark:via-violet-400 dark:to-fuchsia-400"/>
                </header>

                <article className="px-5 pb-16 pt-8 sm:px-10">
                    {category && <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">{category}</p>}
                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">{headline}</h2>
                    <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">
                        {byline ? `${byline}. ` : ""}
                        {readingMinutes} min read
                    </p>

                    {sections.map((section) => (
                        <section key={section.heading} className="mt-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{section.heading}</h3>
                            {section.paragraphs.map((paragraph) => (
                                <p key={paragraph.slice(0, 24)} className="mt-3 text-[15px] leading-7 text-gray-600 dark:text-slate-400">
                                    {paragraph}
                                </p>
                            ))}
                        </section>
                    ))}
                </article>
            </div>
        </div>
    );
};
