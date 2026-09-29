import {useRef} from "react";
import {motion, useScroll, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

const PANEL_HEIGHT = 440;
const years = [2021, 2022, 2023, 2024, 2025];
const stops = years.map((_, index) => index / (years.length - 1));

interface Metric {
    label: string;
    values: number[];
    format: (value: number) => string;
}

const metrics: Metric[] = [
    {label: "Revenue", values: [1.2, 3.4, 7.9, 14.6, 24.8], format: (value) => `$${value.toFixed(1)}M`},
    {label: "Customers", values: [180, 910, 2640, 6120, 12480], format: (value) => Math.round(value).toLocaleString("en-US")},
    {label: "Countries", values: [3, 9, 18, 31, 46], format: (value) => String(Math.round(value))},
];

const revenue = metrics[0].values;
const maxRevenue = Math.max(...revenue);

// A number that follows scroll. It interpolates between the yearly values, so it counts up
// when scrolling down and back down when scrolling up.
const Stat = ({metric, progress}: {metric: Metric; progress: MotionValue<number>}) => {
    const value = useTransform(progress, stops, metric.values);
    const text = useTransform(value, metric.format);
    return (
        <div className="min-w-0">
            <p className="text-xs font-medium text-gray-500 dark:text-slate-400">{metric.label}</p>
            <motion.p className="mt-1 truncate text-xl font-semibold tracking-tight text-gray-900 tabular-nums sm:text-4xl dark:text-white">{text}</motion.p>
        </div>
    );
};

// Each bar grows during its own quarter of the scroll.
const YearBar = ({index, progress}: {index: number; progress: MotionValue<number>}) => {
    const start = index === 0 ? -0.01 : stops[index - 1];
    const scaleY = useTransform(progress, [start, stops[index]], [0, 1]);
    const opacity = useTransform(progress, [start, stops[index]], [0.35, 1]);
    return (
        <div className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-20 w-full items-end sm:h-24">
                <motion.div
                    style={{scaleY, opacity, height: `${(revenue[index] / maxRevenue) * 100}%`}}
                    className="w-full origin-bottom rounded-t-md bg-gradient-to-t from-teal-600 to-emerald-400 dark:from-teal-500 dark:to-emerald-300"
                />
            </div>
            <span className="text-[11px] font-medium text-gray-500 tabular-nums dark:text-slate-400">{years[index]}</span>
        </div>
    );
};

const ScrollCountUp = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({container: containerRef, target: trackRef, offset: ["start start", "end end"]});
    const progress = useSpring(scrollYProgress, {stiffness: 200, damping: 34, restDelta: 0.0005});
    const year = useTransform(progress, (value) => String(years[Math.min(years.length - 1, Math.round(value * (years.length - 1)))]));

    const last = years.length - 1;

    return (
        <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
            {/* Screen readers get the final numbers directly instead of the moving ones. */}
            <ul className="sr-only">
                {metrics.map((metric) => (
                    <li key={metric.label}>{metric.label} in {years[last]}: {metric.format(metric.values[last])}</li>
                ))}
            </ul>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label="Company year in review, scroll to move through the years"
                style={{height: PANEL_HEIGHT}}
                className="relative overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
            >
                <section ref={trackRef} className="relative h-[1400px]">
                    <div aria-hidden="true" style={{height: PANEL_HEIGHT}} className="sticky top-0 flex flex-col justify-between p-6 sm:p-10">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">Five years of Harbor</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">Scroll to move through the years</p>
                            </div>
                            <motion.p className="text-5xl font-bold tracking-tighter text-gray-200 tabular-nums sm:text-7xl dark:text-slate-800">{year}</motion.p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-y border-gray-200 py-5 dark:border-slate-800">
                            {metrics.map((metric) => (
                                <Stat key={metric.label} metric={metric} progress={progress}/>
                            ))}
                        </div>

                        <div className="flex gap-2 sm:gap-4">
                            {years.map((item, index) => (
                                <YearBar key={item} index={index} progress={progress}/>
                            ))}
                        </div>
                    </div>
                </section>
                <div className="flex h-[160px] items-center justify-center px-6 text-center text-sm text-gray-600 dark:text-slate-400">
                    Thank you to the 12,480 teams who build with Harbor.
                </div>
            </div>
        </div>
    );
};

export default ScrollCountUp;
