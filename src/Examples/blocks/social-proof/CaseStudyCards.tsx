import {useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

export interface CaseStudy {
    id: string;
    company: string;
    /** Used for the badge on the card and for the filter buttons. */
    industry: string;
    headline: string;
    /** Large number at the top of the card body, for example "-48%". */
    metric: string;
    metricLabel: string;
    /** Supporting result in the card footer. */
    secondary: string;
    /** Tailwind gradient classes for the card header, for example "from-sky-500 to-indigo-600". */
    tone: string;
    /** One or two letters shown in the logo tile. */
    mark: string;
    /** Link to the full story. Defaults to "#". */
    href?: string;
}

export interface CaseStudyCardProps {
    study: CaseStudy;
    readLabel?: string;
}

/** One case study card with a gradient header, the headline metric and a link. */
export const CaseStudyCard = ({study, readLabel = "Read"}: CaseStudyCardProps) => (
    <a
        href={study.href ?? "#"}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none dark:focus-visible:ring-offset-slate-950"
    >
        <div className={`relative flex h-36 items-end justify-between overflow-hidden bg-gradient-to-br p-5 ${study.tone}`}>
            <div aria-hidden="true"
                 className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(255_255_255_/_0.5)_1px,transparent_1px)] [background-size:12px_12px] transition-transform duration-700 group-hover:scale-110"/>
            <span className="relative flex items-center gap-2 text-white">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold backdrop-blur">{study.mark}</span>
                <span className="font-semibold">{study.company}</span>
            </span>
            <span className="relative rounded-full bg-black/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {study.industry}
            </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
            <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">{study.metric}</p>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{study.metricLabel}</p>
            <h3 className="mt-5 flex-1 text-base font-medium leading-snug text-slate-800 dark:text-slate-200">{study.headline}</h3>
            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">{study.secondary}</span>
                <span className="flex items-center gap-1 font-medium text-slate-900 dark:text-white">
                    {readLabel}
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                </span>
            </div>
        </div>
    </a>
);

export interface CaseStudyCardsProps {
    studies: CaseStudy[];
    /** Industries for the filter buttons, in order. Defaults to the industries found in `studies`. */
    industries?: string[];
    /** Selected filter, either `allLabel` or an industry. Pass it with `onFilterChange` to control the filter. */
    filter?: string;
    defaultFilter?: string;
    onFilterChange?: (filter: string) => void;
    eyebrow?: string;
    title?: string;
    /** Label of the filter button that shows every study. */
    allLabel?: string;
    filterLabel?: string;
    readLabel?: string;
    className?: string;
}

/** A grid of case study cards with an industry filter that animates the grid as it changes. */
export const CaseStudyCards = ({
    studies,
    industries,
    filter: filterProp,
    defaultFilter,
    onFilterChange,
    eyebrow = "Case studies",
    title = "Results our customers measured themselves",
    allLabel = "All",
    filterLabel = "Filter by industry",
    readLabel,
    className = "",
}: CaseStudyCardsProps) => {
    const [internalFilter, setInternalFilter] = useState(defaultFilter ?? allLabel);
    const filter = filterProp ?? internalFilter;
    const indicatorId = useId();
    const filters = [allLabel, ...(industries ?? Array.from(new Set(studies.map((s) => s.industry))))];
    const visible = filter === allLabel ? studies : studies.filter((s) => s.industry === filter);

    const select = (next: string) => {
        if (filterProp === undefined) setInternalFilter(next);
        onFilterChange?.(next);
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-xl">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{eyebrow}</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            {title}
                        </h2>
                    </div>

                    <div role="group" aria-label={filterLabel} className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                        {filters.map((f) => {
                            const selected = f === filter;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => select(f)}
                                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${selected
                                        ? "text-white dark:text-slate-900"
                                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
                                >
                                    {selected && (
                                        <motion.span layoutId={indicatorId}
                                                     transition={{type: "spring", bounce: 0.2, duration: 0.45}}
                                                     className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"/>
                                    )}
                                    <span className="relative">{f}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p className="sr-only" aria-live="polite">{visible.length} case studies shown</p>

                <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((study) => (
                            <motion.li
                                key={study.id}
                                layout
                                initial={{opacity: 0, scale: 0.96}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.96}}
                                transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <CaseStudyCard study={study} readLabel={readLabel}/>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
};
