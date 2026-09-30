import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useReducedMotion} from "framer-motion";

export interface Departure {
    /** Stable key for the row, e.g. the flight number. */
    id: string;
    /** Scheduled time, "HH:MM". */
    time: string;
    destination: string;
    flight: string;
    gate: string;
    /** Remarks column, e.g. "ON TIME", "BOARDING", "DELAYED". */
    status: string;
    /** The indicator lamp next to the remarks. "blink" draws the eye to boarding and final calls. */
    lamp?: "off" | "on" | "blink";
}

export interface SplitFlapBoardProps {
    departures: Departure[];
    /** Title painted on the header rail. */
    title?: string;
    /** Secondary title, e.g. the same word in a second language. */
    subtitle?: string;
    /** Number of rows on the board. Missing departures show as blank flaps. */
    rows?: number;
    /** Milliseconds one flap takes to fall. Real Solari boards run at roughly 50 to 70. */
    flipDuration?: number;
    /** Show a split-flap clock in the header. */
    showClock?: boolean;
    className?: string;
}

// Every flap drum carries these characters in this order, so a cell can only reach "D" by passing A, B and C.
const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/";

// Width of each column in character cells.
const COLUMNS = {time: 5, destination: 12, flight: 7, gate: 3, status: 10};

const toDrum = (char: string) => {
    const upper = char.toUpperCase();
    return DRUM.includes(upper) ? upper : " ";
};

const pad = (text: string, width: number) => text.toUpperCase().slice(0, width).padEnd(width, " ");

interface HalfProps {
    char: string;
    part: "top" | "bottom";
    className?: string;
    /** Animation length for the moving leaves. */
    duration?: number;
}

// Half of a flap. The glyph box is twice the half's height and anchored to the hinge side, so the overflow
// cuts the letter exactly at the split.
const Half = ({char, part, className = "", duration}: HalfProps) => (
    <span
        className={`absolute inset-x-0 h-1/2 overflow-hidden bg-gradient-to-b [backface-visibility:hidden] ${
            part === "top" ? "top-0 rounded-t-[0.14em] from-[#2b2b2d] to-[#232325]" : "bottom-0 rounded-b-[0.14em] from-[#1c1c1e] to-[#262628]"
        } ${className}`}
        style={duration ? {animationDuration: `${duration}ms`} : undefined}
    >
        <span className={`absolute inset-x-0 flex h-[200%] items-center justify-center ${part === "top" ? "top-0" : "bottom-0"}`}>{char}</span>
    </span>
);

interface FlapProps {
    target: string;
    /** Milliseconds before this cell starts turning. */
    delay: number;
    step: number;
    instant: boolean;
}

// One split-flap cell. The static top half already shows the next character, the static bottom half still shows
// the old one. A leaf carrying the old top half folds down to reveal the new top, then a leaf with the new bottom
// half lands over the old bottom. Each step remounts the leaves (key) so the CSS animation runs again.
const Flap = ({target, delay, step, instant}: FlapProps) => {
    const [current, setCurrent] = useState(" ");
    const [previous, setPrevious] = useState(" ");
    const [flips, setFlips] = useState(0);
    const currentRef = useRef(" ");

    useEffect(() => {
        const goal = toDrum(target);
        if (instant) {
            currentRef.current = goal;
            setCurrent(goal);
            setPrevious(goal);
            return;
        }
        let timer = 0;
        const advance = () => {
            const from = currentRef.current;
            if (from === goal) return;
            const next = DRUM[(DRUM.indexOf(from) + 1) % DRUM.length];
            currentRef.current = next;
            setPrevious(from);
            setCurrent(next);
            setFlips((count) => count + 1);
            timer = window.setTimeout(advance, step);
        };
        timer = window.setTimeout(advance, delay);
        return () => window.clearTimeout(timer);
    }, [target, delay, step, instant]);

    return (
        <span className="relative inline-block h-[1.7em] w-[1.18em] shrink-0 [perspective:6em]">
            <Half char={current} part="top"/>
            <Half char={previous} part="bottom"/>
            {flips > 0 && (
                <>
                    <Half key={`t${flips}`} char={previous} part="top" className="sfb-leaf-top origin-bottom" duration={step}/>
                    <Half key={`b${flips}`} char={current} part="bottom" className="sfb-leaf-bottom origin-top" duration={step}/>
                </>
            )}
            {/* The gap between the two flaps, and the hinge pins that hold them. */}
            <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/80"/>
            <span aria-hidden="true" className="absolute -left-[0.06em] top-1/2 h-[0.2em] w-[0.1em] -translate-y-1/2 rounded-full bg-[#0c0c0d]"/>
            <span aria-hidden="true" className="absolute -right-[0.06em] top-1/2 h-[0.2em] w-[0.1em] -translate-y-1/2 rounded-full bg-[#0c0c0d]"/>
        </span>
    );
};

interface FlapTextProps {
    text: string;
    width: number;
    /** Column offset, so cells further right start a little later, like a board scanning across. */
    offset: number;
    step: number;
    instant: boolean;
    seed: string;
}

// Deterministic jitter per cell, so re-renders do not reshuffle the delays mid-flip.
const jitter = (seed: string, index: number) => {
    let hash = index * 374761393;
    for (let i = 0; i < seed.length; i += 1) hash = Math.imul(hash ^ seed.charCodeAt(i), 2654435761);
    return ((hash >>> 0) % 1000) / 1000;
};

const FlapText = ({text, width, offset, step, instant, seed}: FlapTextProps) => (
    <span className="flex gap-[0.08em]">
        {pad(text, width).split("").map((char, index) => (
            <Flap
                key={index}
                target={char}
                delay={(offset + index) * 22 + jitter(seed, index) * 180}
                step={step}
                instant={instant}
            />
        ))}
    </span>
);

const useClock = (enabled: boolean) => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        if (!enabled) return;
        let timer = 0;
        const tick = () => {
            setNow(new Date());
            timer = window.setTimeout(tick, 1000 - (Date.now() % 1000));
        };
        tick();
        return () => window.clearTimeout(timer);
    }, [enabled]);
    return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
};

const lampClass = {
    off: "bg-[#3a2a12]",
    on: "bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.7)]",
    blink: "sfb-lamp bg-amber-400 shadow-[0_0_6px_1px_rgba(251,191,36,0.7)]",
};

/**
 * A Solari-style departures board. Every character is a physical flap drum: when the text changes, each cell turns
 * through the alphabet in order until it reaches its new letter, with a staggered start across the board.
 */
export const SplitFlapBoard = ({
    departures,
    title = "Departures",
    subtitle = "Partidas",
    rows = 6,
    flipDuration = 60,
    showClock = true,
    className = "",
}: SplitFlapBoardProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const frameRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState(14);
    const [compact, setCompact] = useState(false);
    const clock = useClock(showClock);

    // The board is sized in em, so one font size scales every flap to fit the frame. Narrow frames drop the
    // flight and gate columns rather than shrinking the letters to nothing.
    useLayoutEffect(() => {
        const node = frameRef.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => {
            const width = entry.contentRect.width;
            const narrow = width < 560;
            const cells = narrow
                ? COLUMNS.time + COLUMNS.destination + COLUMNS.status + 1
                : COLUMNS.time + COLUMNS.destination + COLUMNS.flight + COLUMNS.gate + COLUMNS.status + 1;
            // Each cell is 1.26em wide including its gap, plus 1.1em between columns.
            const ems = cells * 1.26 + (narrow ? 3 : 5) * 1.1;
            setCompact(narrow);
            setFontSize(Math.max(8, Math.min(22, width / ems)));
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const slots = Array.from({length: rows}, (_, index) => departures[index]);
    const step = flipDuration;

    const headings: [string, number, boolean][] = [
        ["Time", COLUMNS.time, true],
        ["Destination", COLUMNS.destination, true],
        ["Flight", COLUMNS.flight, !compact],
        ["Gate", COLUMNS.gate, !compact],
        ["Remarks", COLUMNS.status + 1, true],
    ];

    return (
        <div
            className={`w-full max-w-4xl rounded-[18px] bg-gradient-to-b from-zinc-200 to-zinc-300 p-2 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_20px_40px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/10 dark:from-zinc-800 dark:to-zinc-900 dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_24px_48px_-24px_rgba(0,0,0,0.9)] dark:ring-white/5 ${className}`}
        >
            <style>{`
                @keyframes sfb-fall { 0% { transform: rotateX(0deg); filter: brightness(1); } 50%, 100% { transform: rotateX(-90deg); filter: brightness(0.4); } }
                @keyframes sfb-land { 0%, 50% { transform: rotateX(90deg); filter: brightness(1.6); } 100% { transform: rotateX(0deg); filter: brightness(1); } }
                @keyframes sfb-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.18; } }
                .sfb-leaf-top { animation-name: sfb-fall; animation-timing-function: cubic-bezier(0.55, 0, 0.9, 0.6); animation-fill-mode: forwards; }
                .sfb-leaf-bottom { animation-name: sfb-land; animation-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1.25); animation-fill-mode: both; }
                .sfb-lamp { animation: sfb-blink 1.1s steps(1, end) infinite; }
                @media (prefers-reduced-motion: reduce) { .sfb-lamp { animation: none; } }
            `}</style>

            <div
                ref={frameRef}
                className="overflow-hidden rounded-xl bg-[#111112] px-3 pb-4 pt-3 shadow-[0_0_0_1px_rgba(0,0,0,0.6),inset_0_2px_12px_rgba(0,0,0,0.8)] sm:px-5"
            >
                <div style={{fontSize}} aria-hidden="true" className="font-mono font-semibold leading-none text-[#f1efe6]">
                    <div className="mb-[0.6em] flex items-end justify-between gap-4 border-b border-white/10 pb-[0.55em]">
                        <div className="flex items-baseline gap-[0.6em] font-sans">
                            <span className="text-[1.25em] font-bold uppercase tracking-[0.18em] text-amber-400">{title}</span>
                            <span className="text-[0.8em] font-medium uppercase tracking-[0.2em] text-white/40">{subtitle}</span>
                        </div>
                        {showClock && <FlapText text={clock} width={5} offset={0} step={step} instant={reduceMotion} seed="clock"/>}
                    </div>

                    <div className="mb-[0.45em] flex gap-[1.1em] font-sans text-[0.62em] font-semibold uppercase tracking-[0.2em] text-white/45">
                        {headings.filter(([, , shown]) => shown).map(([label, cells]) => (
                            <span key={label} style={{width: `${(cells * 1.26 * 1) / 0.62}em`}} className="shrink-0">{label}</span>
                        ))}
                    </div>

                    <div className="flex flex-col gap-[0.35em]">
                        {slots.map((departure, row) => {
                            const seed = departure?.id ?? `row-${row}`;
                            const lamp = departure?.lamp ?? "off";
                            let offset = row * 2;
                            const column = (text: string, width: number) => {
                                const node = <FlapText text={text} width={width} offset={offset} step={step} instant={reduceMotion} seed={`${seed}-${offset}`}/>;
                                offset += width;
                                return node;
                            };
                            return (
                                <div key={row} className="flex items-center gap-[1.1em]">
                                    {column(departure?.time ?? "", COLUMNS.time)}
                                    {column(departure?.destination ?? "", COLUMNS.destination)}
                                    {!compact && column(departure?.flight ?? "", COLUMNS.flight)}
                                    {!compact && column(departure?.gate ?? "", COLUMNS.gate)}
                                    <span className="flex items-center gap-[0.4em]">
                                        {column(departure?.status ?? "", COLUMNS.status)}
                                        <span className={`h-[0.55em] w-[0.55em] shrink-0 rounded-full ${lampClass[lamp]}`}/>
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* The flaps are decoration; this is what assistive tech reads, once the new text is final. */}
                <table className="sr-only" aria-live="polite">
                    <caption>{title}</caption>
                    <thead>
                        <tr><th>Time</th><th>Destination</th><th>Flight</th><th>Gate</th><th>Remarks</th></tr>
                    </thead>
                    <tbody>
                        {departures.slice(0, rows).map((departure) => (
                            <tr key={departure.id}>
                                <td>{departure.time}</td>
                                <td>{departure.destination}</td>
                                <td>{departure.flight}</td>
                                <td>{departure.gate}</td>
                                <td>{departure.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
