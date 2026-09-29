import {useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {motion} from "framer-motion";
import {LuCheck, LuClock, LuFileSpreadsheet, LuGripVertical, LuSparkles, LuTrendingUp, LuX} from "react-icons/lu";

export interface SheetRow {
    /** Invoice reference. An empty string shows as #N/A. */
    ref: string;
    payer: string;
    amount: string;
    status: string;
    /** Tints the row red. */
    problem?: boolean;
}

export interface SpreadsheetPanelProps {
    fileName: string;
    rows: SheetRow[];
    /** Four column headings. */
    columns?: [string, string, string, string];
    /** Red tag under the sheet, for example how many rows need attention. */
    flagLabel?: string;
    /** Gray tag under the sheet, for example when it was last edited. */
    metaLabel?: string;
}

/** A messy spreadsheet, meant as the "before" side of CompareSlider. */
export const SpreadsheetPanel = ({fileName, rows, columns = ["Ref", "Payer", "Amount", "Status"], flagLabel, metaLabel}: SpreadsheetPanelProps) => (
    <div className="h-full bg-[#f8f8f4] p-4 pt-12 sm:p-6 sm:pt-12 dark:bg-[#1b1d1a]">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <LuFileSpreadsheet className="h-4 w-4 text-green-700 dark:text-green-500"/>
            <span className="truncate font-medium">{fileName}</span>
        </div>
        <div className="mt-4 overflow-hidden border border-slate-300 font-mono text-[11px] sm:text-xs dark:border-slate-700">
            <div className="grid grid-cols-[4.5rem_1fr_5rem_5.5rem] bg-slate-200 text-slate-600 sm:grid-cols-[6rem_1fr_6rem_7rem] dark:bg-slate-800 dark:text-slate-400">
                {columns.map((h) => <span key={h} className="border-r border-slate-300 px-2 py-1.5 last:border-r-0 dark:border-slate-700">{h}</span>)}
            </div>
            {rows.map((row, i) => (
                <div key={i}
                     className={`grid grid-cols-[4.5rem_1fr_5rem_5.5rem] border-t border-slate-300 text-slate-700 sm:grid-cols-[6rem_1fr_6rem_7rem] dark:border-slate-700 dark:text-slate-300 ${row.problem ? "bg-rose-100/70 dark:bg-rose-500/10" : "bg-white dark:bg-slate-900"}`}>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 dark:border-slate-700">{row.ref || "#N/A"}</span>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 dark:border-slate-700">{row.payer}</span>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 text-right dark:border-slate-700">{row.amount}</span>
                    <span className="truncate px-2 py-1.5 text-rose-600 dark:text-rose-400">{row.status}</span>
                </div>
            ))}
        </div>
        {(flagLabel || metaLabel) && (
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs">
                {flagLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 font-medium text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                        <LuX className="h-3 w-3"/> {flagLabel}
                    </span>
                )}
                {metaLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        <LuClock className="h-3 w-3"/> {metaLabel}
                    </span>
                )}
            </div>
        )}
    </div>
);

export interface MatchRow {
    payer: string;
    invoice: string;
    amount: string;
    /** How the payment was matched. */
    note: string;
    /** Shows an amber check instead of a green one. */
    warn?: boolean;
}

export interface MatchListPanelProps {
    title: string;
    rows: MatchRow[];
    /** Badge next to the title. Defaults to "N of N matched". */
    summary?: string;
}

/** A clean list of matched payments, meant as the "after" side of CompareSlider. */
export const MatchListPanel = ({title, rows, summary}: MatchListPanelProps) => (
    <div className="h-full bg-white p-4 pt-12 sm:p-6 sm:pt-12 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <LuSparkles className="h-4 w-4 text-violet-500"/> {title}
            </p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                {summary ?? `${rows.length} of ${rows.length} matched`}
            </span>
        </div>
        <ul className="mt-4 space-y-2">
            {rows.map((row) => (
                <li key={row.invoice}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${row.warn
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"}`}>
                        <LuCheck className="h-3.5 w-3.5"/>
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-slate-900 sm:text-sm dark:text-white">{row.payer}</span>
                        <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">{row.invoice} · {row.note}</span>
                    </span>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-slate-700 sm:text-sm dark:text-slate-200">{row.amount}</span>
                </li>
            ))}
        </ul>
    </div>
);

const clamp = (value: number) => Math.min(100, Math.max(0, value));

export interface CompareSliderProps {
    before: ReactNode;
    after: ReactNode;
    /** Divider position from 0 (all after) to 100 (all before), when you control it. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    beforeLabel?: string;
    afterLabel?: string;
    /** Accessible name for the slider handle. */
    sliderLabel?: string;
    className?: string;
}

/** Two layers with a draggable divider. Arrow keys move it, Shift moves it further, Home and End jump to the edges. */
export const CompareSlider = ({
    before,
    after,
    value,
    defaultValue = 50,
    onChange,
    beforeLabel = "Before",
    afterLabel = "After",
    sliderLabel = "Compare before and after",
    className = "",
}: CompareSliderProps) => {
    const [internal, setInternal] = useState(defaultValue);
    const [dragging, setDragging] = useState(false);
    const frameRef = useRef<HTMLDivElement>(null);
    const position = value ?? internal;

    const setPosition = (next: number) => {
        const clamped = clamp(next);
        if (value === undefined) setInternal(clamped);
        onChange?.(clamped);
    };

    const moveTo = (clientX: number) => {
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition(((clientX - rect.left) / rect.width) * 100);
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        moveTo(event.clientX);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging) moveTo(event.clientX);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 10 : 2;
        let next: number | null = null;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = position - step;
        else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = position + step;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = 100;
        if (next === null) return;
        event.preventDefault();
        setPosition(next);
    };

    return (
        <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => setDragging(false)}
            onPointerCancel={() => setDragging(false)}
            className={`relative h-[412px] touch-pan-y select-none overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 sm:h-[452px] dark:border-slate-800 ${dragging ? "cursor-grabbing" : "cursor-ew-resize"} ${className}`}
        >
            <div className="absolute inset-0">{before}</div>
            <div className="absolute inset-0" style={{clipPath: `inset(0 0 0 ${position}%)`}}>
                {after}
            </div>

            <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
                  style={{opacity: position > 12 ? 1 : 0}}>
                {beforeLabel}
            </span>
            <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white"
                  style={{opacity: position < 88 ? 1 : 0}}>
                {afterLabel}
            </span>

            <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(15_23_42_/_0.15)]"
                 style={{left: `${position}%`}}>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label={sliderLabel}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(position)}
                    aria-valuetext={`${Math.round(position)}% ${beforeLabel.toLowerCase()}, ${100 - Math.round(position)}% ${afterLabel.toLowerCase()}`}
                    onKeyDown={onKeyDown}
                    className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-violet-500/40"
                >
                    <motion.span animate={{scale: dragging ? 0.9 : 1}}>
                        <LuGripVertical className="h-5 w-5"/>
                    </motion.span>
                </div>
            </div>
        </div>
    );
};

export interface BeforeAfterMetric {
    label: string;
    /** Old value, shown struck through. */
    before: string;
    after: string;
}

export interface BeforeAfterSliderProps {
    before: ReactNode;
    after: ReactNode;
    metrics: BeforeAfterMetric[];
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    eyebrow?: string;
    title?: string;
    description?: string;
    beforeLabel?: string;
    afterLabel?: string;
    sliderLabel?: string;
    className?: string;
}

/** A section with a before and after comparison slider, followed by metrics that show the change. */
export const BeforeAfterSlider = ({
    before,
    after,
    metrics,
    value,
    defaultValue,
    onChange,
    eyebrow = "Automatic reconciliation",
    title = "From a spreadsheet at midnight to a list that is already done",
    description = "Drag the handle to compare month end before and after Tallyhouse. Payments are matched to invoices as they arrive.",
    beforeLabel,
    afterLabel,
    sliderLabel,
    className = "",
}: BeforeAfterSliderProps) => (
    <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
        <div className="mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl text-center">
                {eyebrow && <p className="text-sm font-medium text-violet-600 dark:text-violet-400">{eyebrow}</p>}
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                {description && <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
            </div>

            <CompareSlider
                className="mt-12"
                before={before}
                after={after}
                value={value}
                defaultValue={defaultValue}
                onChange={onChange}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
                sliderLabel={sliderLabel}
            />

            <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                        <dt className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</dt>
                        <dd className="mt-2 flex items-baseline gap-3">
                            <span className="text-lg text-slate-400 line-through decoration-rose-400/70">{metric.before}</span>
                            <span className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{metric.after}</span>
                            <LuTrendingUp className="h-4 w-4 text-violet-500" aria-hidden="true"/>
                        </dd>
                    </div>
                ))}
            </dl>
        </div>
    </section>
);
