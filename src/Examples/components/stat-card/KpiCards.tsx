import {useId} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowDownRight, LuArrowUpRight} from "react-icons/lu";

export interface Kpi {
    label: string;
    value: string;
    change: number;
    // Set when a drop is good news, for example churn or response time.
    lowerIsBetter?: boolean;
    series: number[];
}

const WIDTH = 120;
const HEIGHT = 40;

// Maps values to SVG points, leaving 2px of room so the stroke never clips.
const toPoints = (series: number[]) => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;
    return series.map((value, index) => ({
        x: (index / (series.length - 1)) * WIDTH,
        y: HEIGHT - 2 - ((value - min) / range) * (HEIGHT - 4),
    }));
};

interface SparklineProps {
    series: number[];
    positive: boolean;
}

const Sparkline = ({series, positive}: SparklineProps) => {
    const gradientId = `spark-${useId().replace(/:/g, "")}`;
    const reduceMotion = useReducedMotion();
    const points = toPoints(series);
    const line = points.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(" ");
    const area = `${line} L${WIDTH} ${HEIGHT} L0 ${HEIGHT} Z`;
    const last = points[points.length - 1];
    const color = positive ? "text-emerald-500 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400";

    return (
        // Reveals left to right with a clip, which keeps the non-scaling stroke crisp while it animates.
        <motion.div
            className={`relative h-10 w-full ${color}`}
            initial={reduceMotion ? false : {clipPath: "inset(-25% 100% -25% 0%)"}}
            whileInView={{clipPath: "inset(-25% -4% -25% 0%)"}}
            viewport={{once: true}}
            transition={{duration: 1.1, ease: [0.16, 1, 0.3, 1]}}
            aria-hidden
        >
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="size-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.22"/>
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                <path d={area} fill={`url(#${gradientId})`}/>
                <path
                    d={line}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
            {/* The end dot sits outside the SVG so the stretched viewBox does not squash it. */}
            <span
                className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current ring-2 ring-white dark:ring-zinc-900"
                style={{left: `${(last.x / WIDTH) * 100}%`, top: `${(last.y / HEIGHT) * 100}%`}}
            />
        </motion.div>
    );
};

export interface KpiCardProps {
    kpi: Kpi;
    /** Small print under the chart that says what the change compares. */
    caption?: string;
}

export const KpiCard = ({kpi, caption = "Last 12 weeks, compared with the previous 12"}: KpiCardProps) => {
    const up = kpi.change >= 0;
    const good = kpi.lowerIsBetter ? !up : up;
    const Arrow = up ? LuArrowUpRight : LuArrowDownRight;

    return (
        <div className="group rounded-2xl border border-zinc-200 bg-white p-5 transition-shadow hover:shadow-lg hover:shadow-zinc-950/5 dark:border-white/10 dark:bg-zinc-900 dark:hover:shadow-black/30">
            <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{kpi.label}</p>
                <span
                    className={`inline-flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums ${
                        good
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                            : "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300"
                    }`}
                >
                    <Arrow className="size-3.5" aria-hidden/>
                    <span className="sr-only">{up ? "Up" : "Down"}</span>
                    {Math.abs(kpi.change)}%
                </span>
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 tabular-nums dark:text-white">{kpi.value}</p>
            <div className="mt-4">
                <Sparkline series={kpi.series} positive={good}/>
            </div>
            {caption && <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{caption}</p>}
        </div>
    );
};

export interface KpiCardsProps {
    items: Kpi[];
    caption?: string;
    className?: string;
}

/** A responsive grid of KPI cards. Pass your metrics as `items`; each card draws its own sparkline. */
export const KpiCards = ({items, caption, className = ""}: KpiCardsProps) => (
    <div className={`grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
        {items.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} caption={caption}/>
        ))}
    </div>
);
