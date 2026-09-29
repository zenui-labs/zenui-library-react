import {useMemo, useRef} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

const PANEL_HEIGHT = 440;

export interface CountMetric {
    label: string;
    /** One value per period, in the same order as `periods`. */
    values: number[];
    /** Turns the in-between number into display text, for example 24.8 into "$24.8M". */
    format: (value: number) => string;
}

interface StatProps {
    metric: CountMetric;
    progress: MotionValue<number>;
    stops: number[];
}

// A number that follows scroll. It interpolates between the period values, so it counts up
// when scrolling down and back down when scrolling up.
const Stat = ({metric, progress, stops}: StatProps) => {
    const value = useTransform(progress, stops, metric.values);
    const text = useTransform(value, metric.format);
    return (
        <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400">{metric.label}</p>
            <motion.p className="mt-1 truncate text-xl font-semibold tracking-tight text-gray-900 tabular-nums sm:text-4xl dark:text-white">{text}</motion.p>
        </div>
    );
};

interface PeriodBarProps {
    index: number;
    label: string;
    /** Bar height as a fraction of the tallest bar, from 0 to 1. */
    size: number;
    progress: MotionValue<number>;
    stops: number[];
}

// Each bar grows during its own slice of the scroll.
const PeriodBar = ({index, label, size, progress, stops}: PeriodBarProps) => {
    const start = index === 0 ? -0.01 : stops[index - 1];
    const scaleY = useTransform(progress, [start, stops[index]], [0, 1]);
    const opacity = useTransform(progress, [start, stops[index]], [0.35, 1]);
    return (
        <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-20 w-full items-end sm:h-24">
                <motion.div
                    style={{scaleY, opacity, height: `${size * 100}%`}}
                    className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-teal-600 to-emerald-400 dark:from-teal-500 dark:to-emerald-300"
                />
            </div>
            <span className="text-[11px] font-medium text-gray-500 tabular-nums dark:text-slate-400">{label}</span>
        </div>
    );
};

export interface ScrollCountUpProps {
    /** Labels for each step of the timeline, usually years. Needs at least two. */
    periods: (string | number)[];
    /** Stats shown in the middle row, laid out for three. Each needs one value per period. */
    metrics: CountMetric[];
    /** Index of the metric that drives the bar chart. */
    chartMetric?: number;
    /** Small label in the top left corner. */
    eyebrow?: string;
    /** Hint under the label. */
    hint?: string;
    /** Line shown after the panel scrolls past the timeline. */
    footer?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

export const ScrollCountUp = ({
    periods,
    metrics,
    chartMetric = 0,
    eyebrow = "Year in review",
    hint = "Scroll to move through the years",
    footer,
    ariaLabel = "Year in review, scroll to move through the years",
    className = "",
}: ScrollCountUpProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({container: containerRef, target: trackRef, offset: ["start start", "end end"]});
    const progress = useSpring(scrollYProgress, {stiffness: 200, damping: 34, restDelta: 0.0005});
    const period = useTransform(progress, (value) => String(periods[Math.min(periods.length - 1, Math.round(value * (periods.length - 1)))]));

    const stops = useMemo(() => periods.map((_, index) => index / (periods.length - 1)), [periods]);
    const chartValues = metrics[chartMetric]?.values ?? [];
    const maxChartValue = Math.max(...chartValues) || 1;
    const last = periods.length - 1;

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            {/* Screen readers get the final numbers directly instead of the moving ones. */}
            <ul className="sr-only">
                {metrics.map((metric) => (
                    <li key={metric.label}>{metric.label} in {periods[last]}: {metric.format(metric.values[last])}</li>
                ))}
            </ul>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                style={{height: PANEL_HEIGHT}}
                className="relative overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
            >
                <section ref={trackRef} className="relative h-[1400px]">
                    <div aria-hidden="true" style={{height: PANEL_HEIGHT}} className="sticky top-0 flex flex-col justify-between p-6 sm:p-10">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">{eyebrow}</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{hint}</p>
                            </div>
                            <motion.p className="text-5xl font-bold tracking-tighter text-gray-200 tabular-nums sm:text-7xl dark:text-slate-800">{period}</motion.p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-y border-gray-200 py-5 dark:border-slate-800">
                            {metrics.map((metric) => (
                                <Stat key={metric.label} metric={metric} progress={progress} stops={stops}/>
                            ))}
                        </div>

                        <div className="flex gap-2 sm:gap-4">
                            {periods.map((item, index) => (
                                <PeriodBar
                                    key={item}
                                    index={index}
                                    label={String(item)}
                                    size={(chartValues[index] ?? 0) / maxChartValue}
                                    progress={progress}
                                    stops={stops}
                                />
                            ))}
                        </div>
                    </div>
                </section>
                {footer && (
                    <div className="flex h-[160px] items-center justify-center px-6 text-center text-sm text-gray-600 dark:text-slate-400">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};
