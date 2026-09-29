import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";

export interface ChartDatum {
    /** Text under the bar on the x axis, for example a month. */
    label: string;
    value: number;
}

export interface AnimatedBarChartProps {
    data: ChartDatum[];
    /** Bar colors, used in order and repeated when there are more bars than colors. */
    colors?: string[];
    /** Text next to the color swatches under the chart. Also used as the chart's accessible name. */
    legend?: string;
    /** Chart width in px on screens 640px and wider. */
    width?: number;
    /** Chart width in px on narrower screens. */
    compactWidth?: number;
    height?: number;
    /** Roughly how many steps the y axis is split into. */
    tickCount?: number;
    /** Share of each slot the bar fills, from 0 to 1. */
    barRatio?: number;
    formatValue?: (value: number) => string;
    className?: string;
}

const PAD = {top: 20, right: 20, bottom: 35, left: 50};
const COMPACT_QUERY = "(max-width: 639px)";
const DEFAULT_COLORS = ["#4b77be", "#f5ab35", "#e74c3c", "#96c0ce", "#2ecc71", "#c39bd3"];

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

/** A bar chart whose bars grow from the axis one after another. */
export const AnimatedBarChart = ({
    data,
    colors = DEFAULT_COLORS,
    legend = "Monthly data",
    width = 500,
    compactWidth = 300,
    height = 300,
    tickCount = 4,
    barRatio = 0.6,
    formatValue = String,
    className = "",
}: AnimatedBarChartProps) => {
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

    const barSlotWidth = plotWidth / Math.max(1, data.length);
    const barWidth = barSlotWidth * barRatio;
    const colorAt = (index: number) => colors[index % colors.length];

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

                {data.map((item, index) => {
                    const barHeight = (item.value / yAxisMax) * plotHeight;
                    const x = PAD.left + barSlotWidth * index + (barSlotWidth - barWidth) / 2;

                    return (
                        <motion.rect
                            key={`bar-${index}`}
                            x={x}
                            y={baseline - barHeight}
                            width={barWidth}
                            height={barHeight}
                            fill={colorAt(index)}
                            initial={reduceMotion ? false : {scaleY: 0}}
                            animate={{scaleY: 1}}
                            style={{transformOrigin: "bottom", transformBox: "fill-box"}}
                            transition={{duration: 0.6, delay: index * 0.1, ease: "easeOut"}}
                            whileHover={{opacity: 0.8}}
                            className="cursor-pointer"
                        >
                            <title>{`${item.label}: ${formatValue(item.value)}`}</title>
                        </motion.rect>
                    );
                })}

                {data.map((item, index) => (
                    <text
                        key={`label-${index}`}
                        x={PAD.left + barSlotWidth * index + barSlotWidth / 2}
                        y={baseline + 20}
                        textAnchor="middle"
                        className="fill-gray-600 text-xs dark:fill-gray-400"
                    >
                        {item.label}
                    </text>
                ))}
            </svg>

            <div className="mt-2 flex items-center gap-3">
                <div className="flex gap-1" aria-hidden>
                    {colors.slice(0, 3).map((color, index) => (
                        <div key={`swatch-${index}`} className="h-4 w-4 rounded-sm" style={{backgroundColor: color}}/>
                    ))}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">{legend}</span>
            </div>
        </div>
    );
};
