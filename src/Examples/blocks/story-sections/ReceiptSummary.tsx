import {useMemo, useRef, useState} from "react";
import type {CSSProperties} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuPrinter} from "react-icons/lu";

export interface ReceiptLine {
    label: string;
    value: string;
    /** Prints smaller and indented, as a note under the line above. Leave `value` empty for a note with no figure. */
    detail?: boolean;
}

export interface ReceiptSection {
    title?: string;
    lines: ReceiptLine[];
}

export interface ReceiptSummaryProps {
    /** Name printed large at the top of the receipt. */
    merchant: string;
    /** Centered lines under the name, like an address. */
    header?: string[];
    /** Pairs printed in two columns under the header, such as date and terminal. */
    meta?: {label: string; value: string}[];
    sections: ReceiptSection[];
    total: {label: string; value: string};
    /** Centered lines under the total. */
    footer?: string[];
    /** Text encoded into the barcode and printed under it. */
    barcode: string;
    eyebrow?: string;
    title?: string;
    description?: string;
    /** Small print under the button. */
    footnote?: string;
    className?: string;
}

// Paper grain: fractal noise, turned grey and faint. Thermal paper is never perfectly flat.
const GRAIN = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.3 0 0 0 0 0.28 0 0 0 0 0.25 0 0 0 0.09 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// The torn edge: each 14px tile shows a wedge that points up from its bottom middle, leaving a row of teeth.
const TORN_EDGE: CSSProperties = {
    WebkitMaskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg)",
    maskImage: "conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg)",
    WebkitMaskSize: "14px 100%",
    maskSize: "14px 100%",
    WebkitMaskPosition: "50%",
    maskPosition: "50%",
};

// A thermal printer feeds paper in short, uneven jerks: move, stop, move. Each step also shifts a fraction of a
// pixel sideways, which reads as the roll wobbling on its spindle.
const feed = (steps: number) => {
    const y: string[] = ["-100%"];
    const x: number[] = [0];
    const times: number[] = [0];
    let travelled = 0;
    let clock = 0;
    const weights = Array.from({length: steps}, (_, i) => 0.75 + ((i * 7919) % 13) / 26);
    const sum = weights.reduce((a, b) => a + b, 0);
    weights.forEach((weight, i) => {
        travelled += (weight / sum) * 100;
        const move = 0.55 + ((i * 31) % 5) / 10;
        clock += move;
        y.push(`${Math.min(0, travelled - 100)}%`);
        x.push(i === steps - 1 ? 0 : ((i * 17) % 7) / 10 - 0.3);
        times.push(clock);
        clock += 0.45;
        y.push(`${Math.min(0, travelled - 100)}%`);
        x.push(i === steps - 1 ? 0 : ((i * 17) % 7) / 10 - 0.3);
        times.push(clock);
    });
    return {y, x, times: times.map((t) => t / clock)};
};

const Barcode = ({value}: {value: string}) => {
    // Every character becomes three bars and three gaps whose widths come from its bits, framed by guard bars.
    const bars = useMemo(() => {
        const widths: number[] = [2, 1, 1, 1];
        [...value].forEach((char) => {
            const code = char.charCodeAt(0);
            for (let i = 0; i < 3; i++) widths.push(((code >> (i * 2)) & 3) + 1, ((code >> (i + 1)) & 1) + 1);
        });
        widths.push(1, 1, 2);
        let cursor = 0;
        const rects = widths.map((width, i) => {
            const rect = {x: cursor, width, dark: i % 2 === 0};
            cursor += width;
            return rect;
        });
        return {rects: rects.filter((rect) => rect.dark), total: cursor};
    }, [value]);

    return (
        <svg viewBox={`0 0 ${bars.total} 40`} preserveAspectRatio="none" className="h-12 w-full" aria-hidden="true">
            {bars.rects.map((rect) => <rect key={rect.x} x={rect.x} y={0} width={rect.width} height={40} fill="currentColor"/>)}
        </svg>
    );
};

const Leader = ({label, value, detail}: ReceiptLine) => (
    <div className={`flex items-baseline gap-1.5 ${detail ? "pl-3 text-[11px] opacity-70" : ""}`}>
        <span className="shrink-0">{label}</span>
        {value && (
            <>
                <span aria-hidden="true" className="min-w-4 flex-1 -translate-y-[3px] border-b-2 border-dotted border-current opacity-30"/>
                <span className="shrink-0 tabular-nums">{value}</span>
            </>
        )}
    </div>
);

/**
 * A year in review printed as a thermal receipt. The paper feeds out of a printer slot in short jerks when the
 * section scrolls into view, and Reprint tears it off and prints a fresh one. The paper stays light in dark mode.
 */
export const ReceiptSummary = ({
    merchant,
    header = [],
    meta = [],
    sections,
    total,
    footer = [],
    barcode,
    eyebrow = "Year in review",
    title = "Your year, itemised",
    description = "Everything your team got done, printed on one receipt. No fine print, no hidden fees.",
    footnote,
    className = "",
}: ReceiptSummaryProps) => {
    const stageRef = useRef<HTMLDivElement>(null);
    const inView = useInView(stageRef, {once: true, amount: 0.35});
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);
    const [printing, setPrinting] = useState(false);
    const path = useMemo(() => feed(24), []);
    const duration = 2.6;

    const reprint = () => {
        setPrinting(true);
        setRun((value) => value + 1);
    };

    return (
        <section className={`relative w-full overflow-hidden bg-stone-100 px-4 py-16 text-stone-900 sm:px-8 sm:py-24 dark:bg-[#141518] dark:text-white ${className}`}>
            <div className="relative mx-auto grid max-w-5xl items-start gap-12 md:grid-cols-[1fr_340px] md:gap-16">
                <div className="md:pt-10">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-zinc-400">{eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-stone-600 dark:text-zinc-400">{description}</p>
                    <button
                        type="button"
                        onClick={reprint}
                        disabled={printing}
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white outline-none transition-[background-color,opacity] hover:bg-stone-700 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-100 disabled:opacity-60 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#141518]"
                    >
                        <LuPrinter className="h-4 w-4" aria-hidden="true"/>
                        {printing ? "Printing…" : "Reprint"}
                    </button>
                    {footnote && <p className="mt-4 max-w-sm text-xs leading-relaxed text-stone-500 dark:text-zinc-500">{footnote}</p>}
                </div>

                <div ref={stageRef} className="relative mx-auto w-full max-w-[340px]">
                    {/* The printer. The paper hangs from the slit along its bottom edge. */}
                    <div className="relative z-10 h-20 rounded-t-[22px] rounded-b-xl bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_24px_-12px_rgba(0,0,0,0.5)] dark:from-zinc-800 dark:to-black">
                        <div className="absolute left-5 top-4 flex items-center gap-2">
                            <motion.span
                                aria-hidden="true"
                                className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
                                animate={printing && !reduceMotion ? {opacity: [1, 0.25, 1]} : {opacity: 1}}
                                transition={printing ? {duration: 0.5, repeat: Infinity} : {duration: 0.2}}
                            />
                            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">{printing ? "Printing" : "Ready"}</span>
                        </div>
                        <span aria-hidden="true" className="absolute right-5 top-3.5 font-mono text-[9px] tracking-[0.2em] text-zinc-500">TM-88</span>
                        <span aria-hidden="true" className="absolute inset-x-4 bottom-2.5 h-[5px] rounded-full bg-black shadow-[inset_0_1px_2px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.12)]"/>
                    </div>

                    {/* Clip only above the slit, so paper can fall away below without being cut off. */}
                    <div className="relative -mt-[11px] px-[26px] pb-10" style={{clipPath: "inset(0 -80px -600px -80px)"}}>
                        <div aria-hidden="true" className="pointer-events-none absolute inset-x-[26px] top-0 z-10 h-5 bg-gradient-to-b from-black/25 to-transparent"/>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={run}
                                className="drop-shadow-[0_14px_14px_rgba(41,37,36,0.18)] dark:drop-shadow-[0_18px_18px_rgba(0,0,0,0.55)]"
                                initial={reduceMotion ? {opacity: 0} : {y: "-100%", x: 0}}
                                animate={reduceMotion ? {opacity: 1} : inView || run > 0 ? {y: path.y, x: path.x} : {y: "-100%", x: 0}}
                                exit={reduceMotion ? {opacity: 0} : {y: "14%", rotate: -4, opacity: 0, transition: {duration: 0.45, ease: [0.4, 0, 1, 1]}}}
                                transition={reduceMotion ? {duration: 0.2} : {duration, times: path.times, ease: "linear"}}
                                onAnimationStart={() => {
                                    if (!reduceMotion && (inView || run > 0)) setPrinting(true);
                                }}
                                onAnimationComplete={() => setPrinting(false)}
                            >
                                <div
                                    className="bg-[#fbfaf6] px-5 pb-8 pt-6 font-mono text-[12px] leading-[1.7] text-[#2a2825]"
                                    style={{...TORN_EDGE, backgroundImage: `${GRAIN}, linear-gradient(90deg, rgba(0,0,0,0.04), transparent 8%, transparent 92%, rgba(0,0,0,0.04))`}}
                                >
                                    <p className="text-center text-[15px] font-bold uppercase tracking-[0.22em]">{merchant}</p>
                                    {header.map((line) => <p key={line} className="text-center text-[11px] uppercase tracking-wider opacity-70">{line}</p>)}

                                    {meta.length > 0 && (
                                        <div className="mt-4 grid grid-cols-2 gap-x-4 border-y border-dashed py-2 text-[11px] uppercase" style={{borderColor: "rgba(42,40,37,0.3)"}}>
                                            {meta.map((item) => (
                                                <div key={item.label} className="flex justify-between gap-2">
                                                    <span className="opacity-60">{item.label}</span>
                                                    <span className="tabular-nums">{item.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {sections.map((section, index) => (
                                        <div key={section.title ?? index} className="mt-4">
                                            {section.title && <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em]">{section.title}</p>}
                                            {section.lines.map((line) => <Leader key={line.label} {...line}/>)}
                                        </div>
                                    ))}

                                    <div className="mt-4 border-t-2 border-dashed pt-3" style={{borderColor: "rgba(42,40,37,0.45)"}}>
                                        <div className="flex items-baseline justify-between gap-3 text-[15px] font-bold uppercase">
                                            <span>{total.label}</span>
                                            <span className="tabular-nums">{total.value}</span>
                                        </div>
                                    </div>

                                    {footer.length > 0 && (
                                        <div className="mt-5 text-center text-[11px] uppercase tracking-wider">
                                            {footer.map((line) => <p key={line}>{line}</p>)}
                                        </div>
                                    )}

                                    <div className="mt-5">
                                        <Barcode value={barcode}/>
                                        <p className="mt-1 text-center text-[10px] tracking-[0.35em]">{barcode}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
