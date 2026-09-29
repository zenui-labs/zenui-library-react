import {useEffect, useRef, useState, type ReactNode} from "react";
import {motion, MotionConfig, useInView, useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

export interface TraceSpan {
    id: string;
    name: string;
    service: string;
    /** Nesting level in the call tree. The root span is 0. */
    depth: number;
    /** Index of the parent span in the list, or null for the root. */
    parent: number | null;
    /** Milliseconds from the start of the request. */
    start: number;
    /** Length of the span in milliseconds. */
    duration: number;
    /** Highlights the span in amber. */
    slow?: boolean;
}

export interface RequestTraceProps {
    /** Spans in display order. A parent must come before its children. */
    spans: TraceSpan[];
    traceId: string;
    /** Footer text, shown next to an amber dot. Use it to explain the slow span. */
    note?: ReactNode;
    /** How many times slower than real time the playback runs. */
    playbackScale?: number;
    replayLabel?: string;
    className?: string;
}

const ROW = 44;
const INDENT = 18;

const dotX = (depth: number) => 10 + depth * INDENT;
const rowY = (index: number) => index * ROW + ROW / 2;

// The elbow from a parent's dot down to a child's row.
const elbow = (spans: TraceSpan[], index: number) => {
    const span = spans[index];
    if (span.parent === null) return "";
    const parent = spans[span.parent];
    const x = dotX(parent.depth);
    return `M ${x} ${rowY(span.parent) + 5} V ${rowY(index)} H ${dotX(span.depth) - 5}`;
};

/**
 * A request trace. A beam runs down the call tree as each span starts, and the waterfall bars
 * grow for as long as the span takes. It replays while on screen, or on demand.
 */
export const RequestTrace = ({
    spans,
    traceId,
    note,
    playbackScale = 16,
    replayLabel = "Replay",
    className = "",
}: RequestTraceProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {amount: 0.5});
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);

    const total = Math.max(1, ...spans.map((span) => span.start + span.duration));
    const maxDepth = Math.max(0, ...spans.map((span) => span.depth));
    const gutter = 14 + maxDepth * INDENT + 10;

    // The first run starts when the trace scrolls into view, then it repeats after a pause.
    useEffect(() => {
        if (!inView) return;
        if (run === 0) {
            setRun(1);
            return;
        }
        if (reduceMotion) return;
        const timer = window.setTimeout(() => setRun((value) => value + 1), total * playbackScale + 2600);
        return () => window.clearTimeout(timer);
    }, [inView, reduceMotion, run, total, playbackScale]);

    const playing = run > 0;

    // Playback runs slower than real time so the order of work is easy to follow.
    const seconds = (ms: number) => (reduceMotion ? 0 : (ms * playbackScale) / 1000);

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className={`w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900 ${className}`}>
                <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 dark:border-slate-800">
                    <div className="min-w-0">
                        <p className="truncate font-mono text-xs text-gray-500 dark:text-slate-400">trace {traceId}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {spans.length} spans, <span className="tabular-nums">{total} ms</span>
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setRun((value) => value + 1)}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                        {replayLabel}
                    </button>
                </div>

                <div key={run} className="relative px-2 py-2 sm:px-4">
                    <svg
                        aria-hidden="true"
                        width={gutter}
                        height={spans.length * ROW}
                        className="pointer-events-none absolute left-2 top-2 sm:left-4"
                    >
                        {spans.map((span, index) => (
                            <g key={span.id}>
                                {span.parent !== null && (
                                    <>
                                        <path d={elbow(spans, index)} fill="none" strokeWidth={1.5} className="stroke-gray-200 dark:stroke-slate-700"/>
                                        <motion.path
                                            d={elbow(spans, index)}
                                            fill="none"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            className="stroke-indigo-500 dark:stroke-indigo-400"
                                            initial={{pathLength: 0}}
                                            animate={playing ? {pathLength: 1} : undefined}
                                            transition={{duration: reduceMotion ? 0 : 0.35, delay: Math.max(0, seconds(span.start) - 0.3), ease: "easeOut"}}
                                        />
                                    </>
                                )}
                                <motion.circle
                                    cx={dotX(span.depth)}
                                    cy={rowY(index)}
                                    r={4}
                                    initial={{scale: 0.4}}
                                    animate={playing ? {scale: 1} : undefined}
                                    transition={{delay: seconds(span.start), type: "spring", stiffness: 500, damping: 18}}
                                    className={span.slow ? "fill-amber-500" : "fill-indigo-500 dark:fill-indigo-400"}
                                />
                            </g>
                        ))}
                    </svg>

                    <ol aria-label="Spans">
                        {spans.map((span) => {
                            const left = (span.start / total) * 100;
                            const width = Math.max(1.2, (span.duration / total) * 100);
                            return (
                                <li key={span.id} className="flex items-center gap-3" style={{height: ROW, paddingLeft: gutter}}>
                                    <div className="w-32 min-w-0 shrink-0 sm:w-44" style={{paddingLeft: span.depth * 6}}>
                                        <p className="truncate text-xs font-medium text-gray-900 dark:text-white">{span.name}</p>
                                        <p className="truncate font-mono text-[10px] text-gray-400 dark:text-slate-500">{span.service}</p>
                                    </div>
                                    <div className="relative h-5 min-w-0 flex-1 rounded bg-gray-50 dark:bg-slate-800/50">
                                        <motion.div
                                            className={`absolute inset-y-0 origin-left rounded ${
                                                span.slow
                                                    ? "bg-gradient-to-r from-amber-400 to-orange-500"
                                                    : span.depth === 0
                                                        ? "bg-indigo-200 dark:bg-indigo-500/30"
                                                        : "bg-gradient-to-r from-indigo-500 to-violet-500"
                                            }`}
                                            style={{left: `${left}%`, width: `${width}%`}}
                                            initial={{scaleX: 0}}
                                            animate={playing ? {scaleX: 1} : undefined}
                                            transition={{delay: seconds(span.start), duration: seconds(span.duration), ease: "linear"}}
                                        />
                                    </div>
                                    <motion.span
                                        className={`w-12 shrink-0 text-right font-mono text-[11px] tabular-nums ${span.slow ? "font-semibold text-amber-600 dark:text-amber-400" : "text-gray-500 dark:text-slate-400"}`}
                                        initial={{opacity: 0}}
                                        animate={playing ? {opacity: 1} : undefined}
                                        transition={{delay: seconds(span.start + span.duration)}}
                                    >
                                        {span.duration} ms
                                    </motion.span>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {note && (
                    <p className="border-t border-gray-100 px-4 py-2.5 text-xs text-gray-500 dark:border-slate-800 dark:text-slate-400">
                        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle"/>
                        {note}
                    </p>
                )}
            </div>
        </MotionConfig>
    );
};
