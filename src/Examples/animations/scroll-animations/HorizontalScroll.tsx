import {useEffect, useRef, useState} from "react";
import {motion, useMotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {LuArrowDown, LuArrowUpRight} from "react-icons/lu";

export interface CaseStudy {
    client: string;
    title: string;
    /** The headline number on the card, already formatted, for example "+41%". */
    metric: string;
    metricLabel: string;
    /** Tailwind gradient classes for the cover, used with bg-gradient-to-br. */
    cover: string;
    /** Link for the card. Defaults to "#case-study". */
    href?: string;
}

const PANEL_HEIGHT = 440;

export interface HorizontalScrollProps {
    items: CaseStudy[];
    eyebrow?: string;
    heading?: string;
    /** Hint under the heading that tells people to scroll. */
    hint?: string;
    /** Question shown after the row. */
    ctaTitle?: string;
    ctaLabel?: string;
    ctaHref?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

// Vertical scrolling inside the panel moves a row of cards sideways. The section is made exactly as tall
// as the sideways distance plus one panel, so the row finishes moving as the section ends.
export const HorizontalScroll = ({
    items,
    eyebrow = "Selected work",
    heading = "Five products we shipped this year",
    hint = "Scroll down to move sideways",
    ctaTitle = "Have something similar in mind?",
    ctaLabel = "Start a project",
    ctaHref = "#contact",
    ariaLabel = "Selected work, scroll to move through the projects",
    className = "",
}: HorizontalScrollProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const rowRef = useRef<HTMLDivElement>(null);
    // The distance is kept in state for the section height and in a motion value for the transform.
    const [distance, setDistance] = useState(0);
    const distanceValue = useMotionValue(0);

    useEffect(() => {
        const viewport = viewportRef.current;
        const row = rowRef.current;
        if (!viewport || !row) return;
        const measure = () => {
            const next = Math.max(0, row.scrollWidth - viewport.clientWidth);
            setDistance(next);
            distanceValue.set(next);
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        observer.observe(row);
        return () => observer.disconnect();
    }, [distanceValue]);

    const {scrollYProgress} = useScroll({container: containerRef, target: sectionRef, offset: ["start start", "end end"]});
    const x = useTransform([scrollYProgress, distanceValue], ([progress, total]: number[]) => -progress * total);
    const smoothX = useSpring(x, {stiffness: 300, damping: 40, mass: 0.4});
    const counter = useTransform(scrollYProgress, (value) => `${String(Math.min(items.length, Math.floor(value * items.length) + 1)).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`);

    return (
        <div className={`w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                style={{height: PANEL_HEIGHT}}
                className="relative overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
            >
                <div className="flex h-[220px] flex-col justify-end px-6 pb-8 sm:px-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
                    <h2 className="mt-2 max-w-md text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{heading}</h2>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                        <LuArrowDown className="h-4 w-4" aria-hidden="true"/>
                        {hint}
                    </p>
                </div>

                <section ref={sectionRef} style={{height: distance + PANEL_HEIGHT}} className="relative">
                    <div ref={viewportRef} style={{height: PANEL_HEIGHT}} className="sticky top-0 flex flex-col justify-center overflow-hidden">
                        <motion.div ref={rowRef} style={{x: smoothX}} className="flex w-max gap-4 px-6 sm:gap-6 sm:px-10">
                            {items.map((study) => (
                                <a
                                    key={study.client}
                                    href={study.href ?? "#case-study"}
                                    className="group w-[250px] shrink-0 rounded-2xl border border-gray-200 bg-white p-2 transition-shadow hover:shadow-xl hover:shadow-gray-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 sm:w-[300px] dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-black/40"
                                >
                                    <div className={`relative h-40 overflow-hidden rounded-xl bg-gradient-to-br sm:h-48 ${study.cover}`}>
                                        <div className="absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-white/30 blur-2xl transition-transform duration-700 group-hover:scale-150"/>
                                        <span className="absolute left-3 top-3 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-medium text-gray-900 backdrop-blur dark:bg-black/40 dark:text-white">
                                            {study.client}
                                        </span>
                                    </div>
                                    <div className="flex items-start justify-between gap-3 p-3">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{study.title}</h3>
                                            <p className="mt-2 text-xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">{study.metric}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">{study.metricLabel}</p>
                                        </div>
                                        <LuArrowUpRight className="h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 dark:text-slate-500" aria-hidden="true"/>
                                    </div>
                                </a>
                            ))}
                        </motion.div>

                        <div className="mt-6 flex items-center gap-4 px-6 sm:px-10" aria-hidden="true">
                            <motion.span className="w-14 text-xs font-medium text-gray-500 tabular-nums dark:text-slate-400">{counter}</motion.span>
                            <div className="h-px flex-1 overflow-hidden bg-gray-200 dark:bg-slate-800">
                                <motion.div style={{scaleX: scrollYProgress}} className="h-full origin-left bg-indigo-600 dark:bg-indigo-400"/>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex h-[200px] flex-col items-center justify-center px-6 text-center">
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">{ctaTitle}</p>
                    <a href={ctaHref} className="mt-2 text-sm font-medium text-indigo-600 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                        {ctaLabel}
                    </a>
                </div>
            </div>
        </div>
    );
};
