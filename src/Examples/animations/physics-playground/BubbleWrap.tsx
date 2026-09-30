import {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, MutableRefObject} from "react";
import {AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

export interface BubbleWrapProps {
    rows?: number;
    columns?: number;
    /** Bubbles popped before this visit. The counter starts from here. */
    initialPopped?: number;
    /** Accessible name of the sheet. */
    label?: string;
    className?: string;
}

interface Wave {
    x: number;
    y: number;
    id: number;
}

// Rows are offset by half a bubble and packed a little closer, like the real hexagonal sheet.
const ROW_PITCH = 0.87;
const PRESS_MS = 150;

// Small seeded generator so every popped bubble keeps the same crumple on every render.
const seeded = (seed: number) => () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
};

const wrinkles = (index: number) => {
    const random = seeded(index * 7919 + 17);
    return Array.from({length: 3}, () => {
        const points = Array.from({length: 4}, (_, i) => {
            const x = 22 + i * 18 + (random() - 0.5) * 10;
            const y = 30 + random() * 40;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        });
        return points.join(" ");
    });
};

const PUFFS = Array.from({length: 7}, (_, i) => {
    const angle = (i / 7) * Math.PI * 2 + 0.4;
    const distance = 70 + (i % 3) * 22;
    return {x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: 3 + (i % 3)};
});

interface BubbleProps {
    index: number;
    row: number;
    column: number;
    x: number;
    y: number;
    popped: boolean;
    tabbable: boolean;
    wave: Wave | null;
    still: boolean;
    width: string;
    onPop: (index: number) => void;
    onNavigate: (index: number, event: KeyboardEvent<HTMLButtonElement>) => void;
    onFocusBubble: (index: number) => void;
    buttons: MutableRefObject<(HTMLButtonElement | null)[]>;
}

const Bubble = memo(({index, row, column, x, y, popped, tabbable, wave, still, width, onPop, onNavigate, onFocusBubble, buttons}: BubbleProps) => {
    const [pressing, setPressing] = useState(false);
    const [puff, setPuff] = useState(false);
    const timer = useRef(0);
    const kick = useMotionValue(0);
    const direction = useRef({x: 0, y: 0});
    const kickX = useTransform(kick, (value) => value * direction.current.x);
    const kickY = useTransform(kick, (value) => value * direction.current.y);
    const crumple = useMemo(() => wrinkles(index), [index]);

    // A pop nearby jolts this bubble away from it and lets it spring back, strongest next door.
    useEffect(() => {
        if (!wave || still) return;
        const dx = x - wave.x;
        const dy = y - wave.y;
        const distance = Math.hypot(dx, dy);
        if (distance === 0 || distance > 2.3) return;
        direction.current = {x: dx / distance, y: dy / distance};
        const controls = animate(kick, [3.2 / distance, 0], {type: "spring", stiffness: 520, damping: 9, delay: distance * 0.035});
        return () => controls.stop();
    }, [wave, still, x, y, kick]);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const pop = useCallback(() => {
        window.clearTimeout(timer.current);
        setPressing(false);
        if (popped) return;
        onPop(index);
        if (still) return;
        setPuff(true);
        timer.current = window.setTimeout(() => setPuff(false), 700);
    }, [popped, onPop, index, still]);

    // Pressure builds for a moment before the plastic gives, which is what makes it feel like a real pop.
    const press = () => {
        if (popped) return;
        setPressing(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(pop, still ? 0 : PRESS_MS);
    };

    const cancel = () => {
        window.clearTimeout(timer.current);
        setPressing(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
            if (!event.repeat) press();
            return;
        }
        onNavigate(index, event);
    };

    const dome = pressing ? {scaleX: 1.1, scaleY: 0.86} : popped ? {scaleX: 0.9, scaleY: 0.9} : {scaleX: 1, scaleY: 1};

    return (
        <div role="gridcell" style={{width}} className="relative aspect-square p-[7%]">
            <motion.button
                ref={(node) => { buttons.current[index] = node; }}
                type="button"
                tabIndex={tabbable ? 0 : -1}
                aria-label={`Row ${row + 1}, bubble ${column + 1}${popped ? ", popped" : ""}`}
                aria-disabled={popped}
                onPointerDown={(event) => {
                    if (event.button === 0) press();
                }}
                onPointerEnter={(event) => {
                    // Dragging with the button held pops a whole row.
                    if (event.pointerType === "mouse" && event.buttons === 1) press();
                }}
                onPointerCancel={cancel}
                onKeyDown={handleKeyDown}
                onFocus={() => onFocusBubble(index)}
                style={{x: kickX, y: kickY}}
                className={`relative block h-full w-full rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-100 dark:focus-visible:ring-offset-zinc-900 ${popped ? "cursor-default" : "cursor-pointer"}`}
            >
                {/* Cast shadow on the backing film, down and right of the light. */}
                <span className={`absolute inset-[4%] translate-x-[10%] translate-y-[13%] rounded-full bg-slate-900/20 blur-[3px] transition-opacity duration-200 dark:bg-black/70 ${popped ? "opacity-20" : "opacity-100"}`}/>
                <motion.span
                    animate={still ? undefined : dome}
                    transition={pressing ? {type: "spring", stiffness: 700, damping: 30} : {type: "spring", stiffness: 600, damping: 11}}
                    className={`absolute inset-0 overflow-hidden rounded-full ${popped
                        ? "bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.10)_0_55%,rgba(148,163,184,0.28)_100%)] shadow-[inset_0_0_0_1px_rgba(148,163,184,0.35)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(148,163,184,0.04)_0_55%,rgba(148,163,184,0.14)_100%)]"
                        : "bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.95)_0_6%,rgba(255,255,255,0.5)_13%,rgba(255,255,255,0.12)_34%,rgba(186,199,214,0.2)_62%,rgba(120,138,160,0.45)_100%)] shadow-[inset_-2px_-3px_5px_rgba(100,116,139,0.3),inset_2px_2px_3px_rgba(255,255,255,0.7)] dark:bg-[radial-gradient(circle_at_34%_30%,rgba(255,255,255,0.7)_0_5%,rgba(255,255,255,0.2)_12%,rgba(255,255,255,0.05)_34%,rgba(148,163,184,0.08)_62%,rgba(148,163,184,0.3)_100%)] dark:shadow-[inset_-2px_-3px_6px_rgba(0,0,0,0.5),inset_1px_1px_2px_rgba(255,255,255,0.25)]"}`}
                >
                    {/* Rim light on the far side of the dome. */}
                    {!popped && <span className="absolute bottom-[10%] right-[12%] h-[22%] w-[40%] rotate-[-35deg] rounded-full border-b-2 border-white/50 dark:border-white/20"/>}
                    {popped && (
                        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                            {crumple.map((points, i) => (
                                <polyline key={i} points={points} fill="none" strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" className="stroke-slate-400/50 dark:stroke-slate-500/40"/>
                            ))}
                        </svg>
                    )}
                </motion.span>

                <AnimatePresence>
                    {puff && (
                        <motion.span key="puff" className="pointer-events-none absolute inset-0" initial={{opacity: 1}} exit={{opacity: 0}}>
                            <motion.span
                                className="absolute inset-0 rounded-full border border-slate-400/60 dark:border-slate-300/40"
                                initial={{scale: 0.9, opacity: 0.8}}
                                animate={{scale: 1.7, opacity: 0}}
                                transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                            />
                            {PUFFS.map((p, i) => (
                                <motion.span
                                    key={i}
                                    className="absolute left-1/2 top-1/2 rounded-full bg-slate-400/70 dark:bg-slate-300/60"
                                    style={{width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2}}
                                    initial={{x: 0, y: 0, opacity: 0.9, scale: 1}}
                                    animate={{x: `${p.x}%`, y: `${p.y}%`, opacity: 0, scale: 0.3}}
                                    // Expo-out approximates a puff slowed by air drag.
                                    transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
                                />
                            ))}
                        </motion.span>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
});

Bubble.displayName = "Bubble";

/**
 * A sheet of bubble wrap. Press a bubble and it squashes, holds for a beat, then pops with a puff of air while its
 * neighbours jolt on springs. Arrow keys move between bubbles and Space pops. "New sheet" rolls in a fresh one.
 */
export const BubbleWrap = ({rows = 6, columns = 10, initialPopped = 0, label = "Bubble wrap", className = ""}: BubbleWrapProps) => {
    const still = useReducedMotion() ?? false;
    const total = rows * columns;
    const [sheet, setSheet] = useState(0);
    const [popped, setPopped] = useState<boolean[]>(() => Array(total).fill(false));
    const [count, setCount] = useState(initialPopped);
    const [wave, setWave] = useState<Wave | null>(null);
    const [focus, setFocus] = useState(0);
    const [startedAt, setStartedAt] = useState<number | null>(null);
    const [clearedIn, setClearedIn] = useState<number | null>(null);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const cell = `${100 / (columns + 0.5)}%`;
    const left = popped.filter((value) => !value).length;

    const position = useCallback((index: number) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        return {row, column, x: column + (row % 2 ? 0.5 : 0), y: row * ROW_PITCH};
    }, [columns]);

    const handlePop = useCallback((index: number) => {
        setPopped((current) => {
            if (current[index]) return current;
            const next = current.slice();
            next[index] = true;
            return next;
        });
        setCount((value) => value + 1);
        const {x, y} = position(index);
        setWave({x, y, id: Date.now() + index});
        setStartedAt((value) => value ?? Date.now());
    }, [position]);

    useEffect(() => {
        if (left === 0 && startedAt !== null && clearedIn === null) setClearedIn(Math.round((Date.now() - startedAt) / 1000));
    }, [left, startedAt, clearedIn]);

    const handleNavigate = useCallback((index: number, event: KeyboardEvent<HTMLButtonElement>) => {
        const row = Math.floor(index / columns);
        const column = index % columns;
        const moves: Record<string, number> = {
            ArrowRight: column < columns - 1 ? index + 1 : index,
            ArrowLeft: column > 0 ? index - 1 : index,
            ArrowDown: row < rows - 1 ? index + columns : index,
            ArrowUp: row > 0 ? index - columns : index,
            Home: row * columns,
            End: row * columns + columns - 1,
        };
        const next = moves[event.key];
        if (next === undefined) return;
        event.preventDefault();
        setFocus(next);
        buttons.current[next]?.focus();
    }, [columns, rows]);

    const newSheet = () => {
        setSheet((value) => value + 1);
        setPopped(Array(total).fill(false));
        setWave(null);
        setFocus(0);
        setStartedAt(null);
        setClearedIn(null);
    };

    return (
        <div className={`w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-100 p-4 dark:border-zinc-800 dark:bg-zinc-950 sm:p-5 ${className}`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <p className="flex items-baseline gap-2 text-slate-900 dark:text-zinc-100">
                    <span className="relative inline-flex h-8 items-center overflow-hidden text-2xl font-semibold tabular-nums tracking-tight">
                        <AnimatePresence initial={false} mode="popLayout">
                            <motion.span
                                key={count}
                                initial={still ? false : {y: "-70%", opacity: 0}}
                                animate={{y: 0, opacity: 1}}
                                exit={still ? undefined : {y: "70%", opacity: 0}}
                                transition={{type: "spring", stiffness: 500, damping: 32}}
                            >
                                {count.toLocaleString("en-US")}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                    <span className="text-sm text-slate-500 dark:text-zinc-400">popped</span>
                </p>
                <div className="flex items-center gap-3">
                    <p className="font-mono text-[11px] tabular-nums text-slate-500 dark:text-zinc-500" aria-live="polite">
                        {clearedIn !== null ? `Sheet cleared in ${clearedIn} s` : `${left} left on this sheet`}
                    </p>
                    <button
                        type="button"
                        onClick={newSheet}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    >
                        <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                        New sheet
                    </button>
                </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={sheet}
                        className="relative"
                        exit={still ? undefined : {x: "-60%", opacity: 0, transition: {duration: 0.3, ease: [0.5, 0, 0.75, 0]}}}
                    >
                        <motion.div
                            role="grid"
                            aria-label={`${label}, ${left} of ${total} bubbles left`}
                            initial={still || sheet === 0 ? false : {clipPath: "inset(0 100% 0 0)"}}
                            animate={{clipPath: "inset(0 0% 0 0)"}}
                            transition={{duration: 0.9, ease: [0.65, 0, 0.35, 1]}}
                            className="relative rounded-xl border border-white/70 bg-[linear-gradient(115deg,rgba(255,255,255,0.75),rgba(241,245,249,0.5)_40%,rgba(255,255,255,0.8)_55%,rgba(226,232,240,0.55))] px-[1.5%] py-[2%] shadow-[0_1px_2px_rgba(15,23,42,0.06)] dark:border-white/5 dark:bg-[linear-gradient(115deg,rgba(39,39,42,0.9),rgba(24,24,27,0.7)_40%,rgba(39,39,42,0.9)_55%,rgba(24,24,27,0.8))]"
                        >
                            {Array.from({length: rows}, (_, row) => (
                                <div
                                    key={row}
                                    role="row"
                                    className="flex"
                                    style={{paddingLeft: row % 2 ? `${50 / (columns + 0.5)}%` : 0, marginTop: row ? `-${(100 / (columns + 0.5)) * (1 - ROW_PITCH)}%` : 0}}
                                >
                                    {Array.from({length: columns}, (_, column) => {
                                        const index = row * columns + column;
                                        const {x, y} = position(index);
                                        return (
                                            <Bubble
                                                key={index}
                                                index={index}
                                                row={row}
                                                column={column}
                                                x={x}
                                                y={y}
                                                popped={popped[index]}
                                                tabbable={index === focus}
                                                wave={wave}
                                                still={still}
                                                width={cell}
                                                onPop={handlePop}
                                                onNavigate={handleNavigate}
                                                onFocusBubble={setFocus}
                                                buttons={buttons}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </motion.div>
                        {/* The roll the fresh sheet unwinds from, travelling with the reveal edge. */}
                        {!still && sheet > 0 && (
                            <motion.span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 w-3.5 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-300 via-white to-slate-400 shadow-[4px_0_10px_rgba(15,23,42,0.18)] dark:from-zinc-700 dark:via-zinc-400 dark:to-zinc-700"
                                initial={{left: "0%", opacity: 1}}
                                animate={{left: "100%", opacity: [1, 1, 0]}}
                                transition={{duration: 0.9, ease: [0.65, 0, 0.35, 1], opacity: {duration: 0.9, times: [0, 0.85, 1]}}}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
            <p className="mt-3 text-center font-mono text-[10px] text-slate-400 dark:text-zinc-600">Press and hold, or drag across a row · arrow keys and space</p>
        </div>
    );
};
