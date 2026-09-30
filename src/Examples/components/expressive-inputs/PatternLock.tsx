import {useEffect, useRef, useState} from "react";
import type {FocusEvent, KeyboardEvent, PointerEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring} from "framer-motion";
import {LuLock, LuUnlock} from "react-icons/lu";

export interface PatternLockProps {
    /** The correct pattern as dot indices in drawing order, counted row by row from the top-left dot (0). */
    pattern: number[];
    /** Dots per side. */
    size?: number;
    title?: string;
    hint?: string;
    /** Fewest dots an attempt has to connect before it is checked. */
    minLength?: number;
    onComplete?: (success: boolean, attempt: number[]) => void;
    className?: string;
}

type Status = "idle" | "drawing" | "short" | "error" | "success";

const VIEW = 300;
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

// Moving from one dot to another in a straight line passes over any dots exactly on that line, and a real
// lock counts them. For (0,0) to (2,2) the step is (1,1), so the centre dot is added on the way.
const withSkipped = (path: number[], next: number, size: number) => {
    const last = path[path.length - 1];
    if (last === undefined) return [next];
    const [r1, c1] = [Math.floor(last / size), last % size];
    const [r2, c2] = [Math.floor(next / size), next % size];
    const g = gcd(Math.abs(r2 - r1), Math.abs(c2 - c1));
    const added: number[] = [];
    for (let k = 1; k < g; k++) {
        const middle = (r1 + ((r2 - r1) / g) * k) * size + c1 + ((c2 - c1) / g) * k;
        if (!path.includes(middle) && !added.includes(middle)) added.push(middle);
    }
    return [...path, ...added, next];
};

/**
 * A gesture lock. Drag through the dots; the stroke stretches toward the pointer on a spring, dots jumped
 * over in a straight line are added automatically, and releasing checks the attempt against `pattern`.
 * Keyboard: arrow keys move between dots, Enter adds one, Enter on the last dot checks, Backspace undoes.
 */
export const PatternLock = ({
    pattern,
    size = 3,
    title = "Draw your unlock pattern",
    hint,
    minLength = 4,
    onComplete,
    className = "",
}: PatternLockProps) => {
    const still = useReducedMotion() ?? false;
    const [path, setPath] = useState<number[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const [failures, setFailures] = useState(0);
    const [focusIndex, setFocusIndex] = useState(0);
    const [keyboard, setKeyboard] = useState(false);
    const [showKeys, setShowKeys] = useState(false);
    const padRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const pathRef = useRef(path);
    pathRef.current = path;
    const timer = useRef(0);
    useEffect(() => () => window.clearTimeout(timer.current), []);

    const px = useMotionValue(0);
    const py = useMotionValue(0);
    // The loose end of the stroke trails the pointer on a spring, so it stretches like an elastic band.
    const sx = useSpring(px, {stiffness: 700, damping: 38, mass: 0.6});
    const sy = useSpring(py, {stiffness: 700, damping: 38, mass: 0.6});

    const cell = VIEW / size;
    const centre = (i: number) => ({x: ((i % size) + 0.5) * cell, y: (Math.floor(i / size) + 0.5) * cell});

    const reset = () => {
        window.clearTimeout(timer.current);
        setPath([]);
        setStatus("idle");
    };

    const submit = (attempt: number[]) => {
        if (attempt.length === 0) return reset();
        if (attempt.length < minLength) {
            setStatus("short");
            timer.current = window.setTimeout(reset, 1100);
            return;
        }
        const success = attempt.length === pattern.length && attempt.every((dot, i) => dot === pattern[i]);
        setStatus(success ? "success" : "error");
        onComplete?.(success, attempt);
        if (!success) {
            setFailures((n) => n + 1);
            timer.current = window.setTimeout(reset, 1300);
        }
    };

    const add = (dot: number) => {
        if (pathRef.current.includes(dot)) return;
        const next = withSkipped(pathRef.current, dot, size);
        pathRef.current = next;
        setPath(next);
    };

    const toView = (clientX: number, clientY: number) => {
        const rect = padRef.current.getBoundingClientRect();
        return {x: ((clientX - rect.left) / rect.width) * VIEW, y: ((clientY - rect.top) / rect.height) * VIEW};
    };

    const hitTest = (x: number, y: number) => {
        const col = Math.floor(x / cell);
        const row = Math.floor(y / cell);
        if (col < 0 || row < 0 || col >= size || row >= size) return -1;
        const dot = row * size + col;
        const c = centre(dot);
        return Math.hypot(c.x - x, c.y - y) < cell * 0.3 ? dot : -1;
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        event.preventDefault();
        window.clearTimeout(timer.current);
        event.currentTarget.setPointerCapture(event.pointerId);
        const {x, y} = toView(event.clientX, event.clientY);
        px.set(x);
        py.set(y);
        sx.jump(x);
        sy.jump(y);
        pathRef.current = [];
        setPath([]);
        setKeyboard(false);
        setStatus("drawing");
        const dot = hitTest(x, y);
        if (dot >= 0) add(dot);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (status !== "drawing" || keyboard) return;
        const {x, y} = toView(event.clientX, event.clientY);
        px.set(x);
        py.set(y);
        const dot = hitTest(x, y);
        if (dot >= 0) add(dot);
    };

    const handlePointerUp = () => {
        if (status === "drawing" && !keyboard) submit(pathRef.current);
    };

    const handleDotKey = (dot: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
        const row = Math.floor(dot / size);
        const col = dot % size;
        const moves: Record<string, [number, number]> = {ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1]};
        if (event.key in moves) {
            event.preventDefault();
            const [dr, dc] = moves[event.key];
            const next = Math.min(size - 1, Math.max(0, row + dr)) * size + Math.min(size - 1, Math.max(0, col + dc));
            setFocusIndex(next);
            dotRefs.current[next]?.focus();
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (status === "success" || status === "error" || status === "short") reset();
            setKeyboard(true);
            const current = status === "drawing" ? pathRef.current : [];
            if (current[current.length - 1] === dot) {
                submit(current);
                return;
            }
            if (status !== "drawing") pathRef.current = [];
            setStatus("drawing");
            add(dot);
        } else if (event.key === "Backspace" && status === "drawing") {
            event.preventDefault();
            const next = pathRef.current.slice(0, -1);
            pathRef.current = next;
            setPath(next);
        } else if (event.key === "Escape") {
            reset();
        }
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget as Node)) return;
        setKeyboard(false);
        setShowKeys(false);
    };

    const tone =
        status === "success"
            ? "stroke-emerald-500 fill-emerald-500"
            : status === "error" || status === "short"
              ? "stroke-rose-500 fill-rose-500"
              : "stroke-stone-900 fill-stone-900 dark:stroke-stone-100 dark:fill-stone-100";
    const points = path.map(centre);
    const d = points.map((p, i) => `${i ? "L" : "M"} ${p.x} ${p.y}`).join(" ");
    const last = points[points.length - 1];
    const failed = status === "error" || status === "short";

    const message = {
        idle: `Connect at least ${minLength} dots`,
        drawing: `${path.length} ${path.length === 1 ? "dot" : "dots"}`,
        short: `Too short. Connect at least ${minLength} dots`,
        error: "Wrong pattern. Try again",
        success: "Unlocked",
    }[status];

    return (
        <div className={`w-full max-w-[340px] rounded-[32px] border border-stone-200 bg-white px-6 pb-6 pt-7 text-center shadow-[0_24px_48px_-28px_rgba(28,25,23,0.35)] dark:border-stone-800 dark:bg-stone-950 dark:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.9)] ${className}`}>
            <div className="relative mx-auto h-9 w-9">
                <AnimatePresence initial={false}>
                    <motion.span
                        key={status === "success" ? "open" : "closed"}
                        initial={{opacity: 0, y: still ? 0 : 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: still ? 0 : -6}}
                        className={`absolute inset-0 grid place-items-center rounded-full ${status === "success" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-stone-100 text-stone-600 dark:bg-stone-900 dark:text-stone-300"}`}
                    >
                        {status === "success" ? <LuUnlock className="h-4 w-4"/> : <LuLock className="h-4 w-4"/>}
                    </motion.span>
                </AnimatePresence>
            </div>
            <p className="mt-3 text-[15px] font-medium tracking-tight text-stone-900 dark:text-stone-100">{title}</p>
            {hint && <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">{hint}</p>}

            <motion.div
                ref={padRef}
                role="group"
                aria-label={`${title}. ${size} by ${size} dots.`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onBlur={handleBlur}
                animate={{x: status === "error" && !still ? [0, -12, 11, -8, 6, -3, 0] : 0}}
                transition={{duration: 0.42, ease: [0.36, 0.07, 0.19, 0.97]}}
                className="relative mx-auto mt-6 aspect-square w-full max-w-[260px] cursor-pointer touch-none select-none"
            >
                <svg viewBox={`0 0 ${VIEW} ${VIEW}`} aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible">
                    <motion.g
                        className={`transition-colors duration-200 ${tone}`}
                        animate={{opacity: failed ? 0 : 1}}
                        transition={{duration: failed ? 0.5 : 0.15, delay: failed ? 0.55 : 0}}
                    >
                        {/* A wide faint stroke under a thin one gives the line a soft ink bleed. */}
                        <path d={d} fill="none" strokeWidth="16" strokeOpacity="0.1" strokeLinecap="round" strokeLinejoin="round"/>
                        <motion.path
                            d={d}
                            fill="none"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{pathLength: failed ? 0 : 1}}
                            transition={failed ? {duration: 0.6, delay: 0.45, ease: [0.65, 0, 0.35, 1]} : {duration: 0}}
                        />
                        {status === "drawing" && !keyboard && last && (
                            <>
                                <motion.line x1={last.x} y1={last.y} x2={sx} y2={sy} strokeWidth="16" strokeOpacity="0.1" strokeLinecap="round"/>
                                <motion.line x1={last.x} y1={last.y} x2={sx} y2={sy} strokeWidth="3.5" strokeLinecap="round"/>
                            </>
                        )}
                    </motion.g>

                    {Array.from({length: size * size}, (_, i) => {
                        const c = centre(i);
                        const order = path.indexOf(i);
                        const on = order >= 0;
                        return (
                            <g key={i} className={on ? `transition-colors duration-200 ${tone}` : "fill-stone-300 dark:fill-stone-700"}>
                                {on && !still && (
                                    <motion.circle
                                        key={`${status === "success" ? "win" : "hit"}-${order}`}
                                        cx={c.x}
                                        cy={c.y}
                                        fill="none"
                                        strokeWidth="2"
                                        initial={{r: 8, opacity: 0.5}}
                                        animate={{r: status === "success" ? 34 : 26, opacity: 0}}
                                        transition={{duration: status === "success" ? 0.7 : 0.5, ease: "easeOut", delay: status === "success" ? order * 0.06 : 0}}
                                    />
                                )}
                                <circle cx={c.x} cy={c.y} r={cell * 0.17} fillOpacity={on ? 0.12 : 0}/>
                                <motion.circle
                                    cx={c.x}
                                    cy={c.y}
                                    initial={false}
                                    animate={{r: on ? 8 : 5}}
                                    transition={{type: "spring", stiffness: 600, damping: 18}}
                                />
                            </g>
                        );
                    })}
                </svg>

                {Array.from({length: size * size}, (_, i) => {
                    const c = centre(i);
                    return (
                        <button
                            key={i}
                            ref={(el) => {
                                dotRefs.current[i] = el;
                            }}
                            type="button"
                            tabIndex={i === focusIndex ? 0 : -1}
                            aria-label={`Row ${Math.floor(i / size) + 1}, column ${(i % size) + 1}`}
                            aria-pressed={path.includes(i)}
                            onKeyDown={handleDotKey(i)}
                            onFocus={(event) => {
                                setFocusIndex(i);
                                setShowKeys(event.currentTarget.matches(":focus-visible"));
                            }}
                            className="pointer-events-none absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-stone-900/30 dark:focus-visible:ring-white/40"
                            style={{left: `${(c.x / VIEW) * 100}%`, top: `${(c.y / VIEW) * 100}%`}}
                        />
                    );
                })}
            </motion.div>

            <div className="mt-5 h-5" aria-live="polite">
                <p
                    className={`text-xs font-medium ${status === "success" ? "text-emerald-600 dark:text-emerald-400" : failed ? "text-rose-600 dark:text-rose-400" : "text-stone-500 dark:text-stone-400"}`}
                >
                    {message}
                    {failures > 0 && status !== "success" && (
                        <span className="ml-2 font-mono tabular-nums text-stone-400 dark:text-stone-500">{failures} failed</span>
                    )}
                </p>
            </div>
            <p className={`mt-1 text-[11px] text-stone-400 transition-opacity dark:text-stone-500 ${showKeys ? "opacity-100" : "opacity-0"}`}>
                Arrows move · Enter adds · Enter on last dot checks
            </p>
        </div>
    );
};
