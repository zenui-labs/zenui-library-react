import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

export interface ChartDatum {
    /** Text under the point on the x axis, for example a month. */
    label: string;
    value: number;
}

export interface AnimatedLineChartProps {
    data: ChartDatum[];
    /** Line and point color. */
    color?: string;
    /** Text next to the color swatch under the chart. Also used as the chart's accessible name. */
    legend?: string;
    /** Chart width in px on screens 640px and wider. */
    width?: number;
    /** Chart width in px on narrower screens. */
    compactWidth?: number;
    height?: number;
    /** Roughly how many steps the y axis is split into. */
    tickCount?: number;
    /** Seconds the line takes to draw. */
    duration?: number;
    formatValue?: (value: number) => string;
    className?: string;
}

const PAD = {top: 20, right: 20, bottom: 35, left: 50};
const COMPACT_QUERY = "(max-width: 639px)";

// Rounds a raw step to 1, 2, 2.5 or 5 times a power of ten so the tick labels stay readable.
const niceStep = (raw: number) => {
    if (!(raw > 0)) return 1;
    const magnitude = 10 ** Math.floor(Math.log10(raw));
    const residual = raw / magnitude;
    const factor = residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 2.5 ? 2.5 : residual <= 5 ? 5 : 10;
    return factor * magnitude;
};

// Switches to the compact width on small screens and follows the viewport as it resizes.
const useCompact = () => {
    const [compact, setCompact] = useState(() => typeof window !== "undefined" && window.matchMedia(COMPACT_QUERY).matches);

    useEffect(() => {
        const query = window.matchMedia(COMPACT_QUERY);
        const update = () => setCompact(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);

    return compact;
};

/** A line chart that draws itself in, then pops in a point for each value. */
export const AnimatedLineChart = ({
    data,
    color = "#4b77be",
    legend = "Monthly trends",
    width = 500,
    compactWidth = 300,
    height = 300,
    tickCount = 4,
    duration = 1.5,
    formatValue = String,
    className = "",
}: AnimatedLineChartProps) => {
    const compact = useCompact();
    const reduceMotion = useReducedMotion();
    const chartWidth = compact ? compactWidth : width;

    const maxValue = Math.max(0, ...data.map((item) => item.value));
    const step = niceStep(maxValue / tickCount);
    const yAxisMax = Math.max(step, Math.ceil(maxValue / step) * step);
    const yTicks = Array.from({length: Math.round(yAxisMax / step) + 1}, (_, i) => Math.round(i * step * 1e6) / 1e6);

    const plotWidth = chartWidth - PAD.left - PAD.right;
    const plotHeight = height - PAD.top - PAD.bottom;
    const baseline = height - PAD.bottom;
    const yOf = (value: number) => baseline - (value / yAxisMax) * plotHeight;

    const points = data.map((item, index) => ({
        x: data.length > 1 ? PAD.left + (plotWidth / (data.length - 1)) * index : PAD.left + plotWidth / 2,
        y: yOf(item.value),
    }));
    const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");

    return (
        <div className={`flex flex-col items-center justify-center gap-5 ${className}`}>
            <svg width={chartWidth} height={height} className="mx-auto" role="img" aria-label={legend}>
                {yTicks.map((tick) => (
                    <line
                        key={`grid-${tick}`}
                        x1={PAD.left}
                        x2={chartWidth - PAD.right}
                        y1={yOf(tick)}
                        y2={yOf(tick)}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="stroke-gray-300 dark:stroke-gray-700"
                        opacity="0.5"
                    />
                ))}

                {yTicks.map((tick) => (
                    <text
                        key={`tick-${tick}`}
                        x={PAD.left - 8}
                        y={yOf(tick) + 4}
                        textAnchor="end"
                        className="fill-gray-600 text-[10px] dark:fill-gray-400"
                    >
                        {formatValue(tick)}
                    </text>
                ))}

                <line
                    x1={PAD.left}
                    x2={chartWidth - PAD.right}
                    y1={baseline}
                    y2={baseline}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="stroke-gray-400 dark:stroke-gray-600"
                />
                <line
                    x1={PAD.left}
                    x2={PAD.left}
                    y1={PAD.top}
                    y2={baseline}
                    stroke="currentColor"
                    strokeWidth="2"
                    className="stroke-gray-400 dark:stroke-gray-600"
                />

                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={reduceMotion ? false : {pathLength: 0}}
                    animate={{pathLength: 1}}
                    transition={{duration, ease: "easeInOut"}}
                />

                {points.map((point, index) => (
                    <motion.circle
                        key={`point-${index}`}
                        cx={point.x}
                        cy={point.y}
                        r="5"
                        fill={color}
                        initial={reduceMotion ? false : {opacity: 0, r: 0}}
                        animate={{opacity: 1, r: 5}}
                        transition={{duration: 0.4, delay: reduceMotion ? 0 : duration * (2 / 3) + index * 0.1, ease: "easeOut"}}
                        whileHover={{r: 7}}
                        className="cursor-pointer"
                    >
                        <title>{`${data[index].label}: ${formatValue(data[index].value)}`}</title>
                    </motion.circle>
                ))}

                {data.map((item, index) => (
                    <text
                        key={`label-${index}`}
                        x={points[index].x}
                        y={baseline + 20}
                        textAnchor="middle"
                        className="fill-gray-600 text-xs dark:fill-gray-400"
                    >
                        {item.label}
                    </text>
                ))}
            </svg>

            <div className="mt-2 flex items-center gap-3">
                <div className="h-4 w-4 rounded-sm" style={{backgroundColor: color}} aria-hidden/>
                <span className="text-sm text-gray-700 dark:text-gray-300">{legend}</span>
            </div>
        </div>
    );
};
