import {useCallback, useEffect, useId, useLayoutEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {animate, useMotionValue, useMotionValueEvent, useReducedMotion} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

export interface DrumOption {
    value: string;
    label: string;
}

export interface DrumColumn {
    id: string;
    /** Accessible name of the wheel, also printed above it. */
    label: string;
    options: DrumOption[];
    /** Wrap from the last option back to the first, like the minutes on a clock. */
    loop?: boolean;
    /** Share of the width, like flex-grow. Defaults to 1. */
    grow?: number;
    align?: "start" | "center" | "end";
}

export interface DrumPickerProps {
    columns: DrumColumn[];
    /** Selected option value per column id. */
    value: Record<string, string>;
    onChange: (columnId: string, value: string) => void;
    /** Height of one row in px. */
    itemHeight?: number;
    /** Accessible name of the whole picker. */
    label?: string;
    className?: string;
}

// Degrees between neighbouring rows on the cylinder. Smaller angles show more rows.
const STEP = 18;
// Rows rendered on each side of the centre. 90 / STEP rows reach the top and bottom of the drum.
const WINDOW = 6;
const PERSPECTIVE = 720;

const mod = (n: number, m: number) => ((n % m) + m) % m;
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
// The wheel lingers a little as each row crosses the centre, which reads as a notched detent under the finger.
const detent = (raw: number) => raw - (0.3 / (2 * Math.PI)) * Math.sin(2 * Math.PI * raw);
const justify = {start: "justify-start", center: "justify-center", end: "justify-end"};

interface WheelProps {
    column: DrumColumn;
    value: string;
    onChange: (value: string) => void;
    itemHeight: number;
    radius: number;
    height: number;
    reduceMotion: boolean;
    id: string;
}

const Wheel = ({column, value, onChange, itemHeight, radius, height, reduceMotion, id}: WheelProps) => {
    const {options, loop = false, align = "center"} = column;
    const count = options.length;
    const valueIndex = Math.max(0, options.findIndex((option) => option.value === value));
    const pos = useMotionValue(valueIndex);
    const targetRef = useRef(valueIndex);
    const [center, setCenter] = useState(valueIndex);
    const centerRef = useRef(valueIndex);
    const baseRows = useRef(new Map<number, HTMLDivElement>());
    const topRows = useRef(new Map<number, HTMLDivElement>());
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const drag = useRef<{startY: number; startPos: number; samples: {t: number; y: number}[]; moved: boolean} | null>(null);
    const typed = useRef({text: "", at: 0});

    // Every row sits on the same cylinder: push it out by the radius, tilt it by its angle, pull it back.
    // Written straight to the DOM so a fling never re-renders React per frame.
    const apply = useCallback((p: number) => {
        const place = (rows: Map<number, HTMLDivElement>, fade: boolean) => rows.forEach((el, k) => {
            const theta = (k - p) * STEP;
            const visible = Math.abs(theta) < 90;
            el.style.visibility = visible ? "visible" : "hidden";
            if (!visible) return;
            el.style.transform = `translateZ(${-radius}px) rotateX(${-theta}deg) translateZ(${radius}px)`;
            if (fade) el.style.opacity = String(0.12 + 0.88 * Math.cos((theta * Math.PI) / 180) ** 2);
        });
        place(baseRows.current, true);
        place(topRows.current, false);
    }, [radius]);

    useLayoutEffect(() => {
        apply(pos.get());
    });

    useMotionValueEvent(pos, "change", (p) => {
        apply(p);
        const rounded = Math.round(p);
        if (rounded !== centerRef.current) {
            centerRef.current = rounded;
            setCenter(rounded);
        }
    });

    const spinTo = useCallback((target: number, velocity = 0) => {
        controls.current?.stop();
        targetRef.current = target;
        if (reduceMotion) pos.set(target);
        else controls.current = animate(pos, target, {type: "spring", stiffness: 280, damping: 32, mass: 0.9, velocity, restDelta: 0.0005});
    }, [pos, reduceMotion]);

    const settle = useCallback((target: number, velocity = 0) => {
        const next = loop ? target : clamp(target, 0, count - 1);
        spinTo(next, velocity);
        const option = options[mod(next, count)];
        if (option && option.value !== value) onChange(option.value);
    }, [count, loop, onChange, options, spinTo, value]);

    // Follow outside changes, such as the day being clamped when the month gets shorter. Looping wheels take the
    // short way round, so 55 to 00 turns one row forward instead of spinning back through the hour.
    useEffect(() => {
        if (drag.current || mod(targetRef.current, count) === valueIndex) return;
        let target = valueIndex;
        if (loop) {
            let delta = mod(valueIndex - targetRef.current, count);
            if (delta > count / 2) delta -= count;
            target = targetRef.current + delta;
        }
        spinTo(target);
    }, [valueIndex, count, loop, spinTo]);

    const latest = useRef({settle, count, loop, itemHeight});
    latest.current = {settle, count, loop, itemHeight};

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        let timer = 0;
        const onWheel = (event: WheelEvent) => {
            event.preventDefault();
            const {settle: snap, count: n, loop: wraps, itemHeight: rowHeight} = latest.current;
            const delta = event.deltaMode === 1 ? event.deltaY * rowHeight : event.deltaY;
            window.clearTimeout(timer);
            // A mouse wheel notch moves exactly one row. Trackpads scroll freely and snap once they stop.
            if (Math.abs(delta) >= 50) {
                snap(targetRef.current + Math.sign(delta));
                return;
            }
            controls.current?.stop();
            const next = pos.get() + delta / rowHeight;
            pos.set(wraps ? next : clamp(next, -0.3, n - 0.7));
            timer = window.setTimeout(() => snap(Math.round(pos.get())), 110);
        };
        el.addEventListener("wheel", onWheel, {passive: false});
        return () => {
            el.removeEventListener("wheel", onWheel);
            window.clearTimeout(timer);
        };
    }, [pos]);

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        controls.current?.stop();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {startY: event.clientY, startPos: pos.get(), samples: [{t: event.timeStamp, y: event.clientY}], moved: false};
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        if (!d) return;
        const dy = event.clientY - d.startY;
        if (Math.abs(dy) > 3) d.moved = true;
        let raw = d.startPos - dy / itemHeight;
        // Past either end the wheel follows at a third of the speed, then springs back on release.
        if (!loop && raw < 0) raw *= 0.3;
        if (!loop && raw > count - 1) raw = count - 1 + (raw - count + 1) * 0.3;
        pos.set(detent(raw));
        d.samples.push({t: event.timeStamp, y: event.clientY});
        if (d.samples.length > 8) d.samples.shift();
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
        const d = drag.current;
        drag.current = null;
        if (!d) return;
        if (!d.moved) {
            // A tap: find the row under the finger by undoing the cylinder projection.
            const rect = event.currentTarget.getBoundingClientRect();
            const dy = event.clientY - (rect.top + rect.height / 2);
            const theta = (Math.asin(clamp(dy / radius, -1, 1)) * 180) / Math.PI;
            settle(Math.round(pos.get() + theta / STEP));
            return;
        }
        const last = d.samples[d.samples.length - 1];
        const first = d.samples.find((s) => last.t - s.t < 100) ?? last;
        const seconds = (last.t - first.t) / 1000;
        const still = event.timeStamp - last.t > 80;
        const velocity = still || seconds <= 0 ? 0 : clamp(-(last.y - first.y) / itemHeight / seconds, -40, 40);
        // Project where the fling would coast to, then let a spring carry the real velocity into that row.
        settle(Math.round(pos.get() + velocity * 0.26), velocity);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const t = targetRef.current;
        const moves: Record<string, number> = {
            ArrowDown: t + 1,
            ArrowUp: t - 1,
            PageDown: t + 5,
            PageUp: t - 5,
            Home: t - mod(t, count),
            End: t - mod(t, count) + count - 1,
        };
        if (event.key in moves) {
            event.preventDefault();
            settle(moves[event.key]);
            return;
        }
        // Type-ahead: "m" jumps to the next option starting with m, "ma" narrows it down.
        if (event.key.length === 1 && /\S/.test(event.key)) {
            const now = event.timeStamp;
            typed.current = {text: now - typed.current.at < 700 ? typed.current.text + event.key.toLowerCase() : event.key.toLowerCase(), at: now};
            // A single letter moves on to the next match; a longer prefix may keep the current row.
            const from = typed.current.text.length > 1 ? 0 : 1;
            for (let i = 0; i < count; i++) {
                const k = mod(t + from + i, count);
                if (options[k].label.toLowerCase().startsWith(typed.current.text)) {
                    const delta = k - mod(t, count);
                    settle(t + (loop ? mod(delta, count) : delta));
                    return;
                }
            }
        }
    };

    const rows: number[] = [];
    for (let k = center - WINDOW; k <= center + WINDOW; k++) {
        if (loop || (k >= 0 && k < count)) rows.push(k);
    }
    const band = height / 2 - itemHeight / 2;
    const hole = `linear-gradient(to bottom, #000 ${band}px, transparent ${band}px, transparent ${band + itemHeight}px, #000 ${band + itemHeight}px)`;
    const rowClass = `absolute inset-x-0 flex items-center px-3 tabular-nums [backface-visibility:hidden] ${justify[align]}`;

    return (
        <div
            ref={rootRef}
            role="listbox"
            aria-label={column.label}
            aria-activedescendant={`${id}-${center}`}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="group relative min-w-0 cursor-grab touch-none select-none outline-none active:cursor-grabbing"
            style={{flex: column.grow ?? 1, height}}
        >
            <div className="absolute inset-0" style={{perspective: PERSPECTIVE, WebkitMaskImage: hole, maskImage: hole}}>
                {rows.map((k) => {
                    const option = options[mod(k, count)];
                    return (
                        <div
                            key={k}
                            id={`${id}-${k}`}
                            role="option"
                            aria-selected={k === center}
                            aria-setsize={count}
                            aria-posinset={mod(k, count) + 1}
                            ref={(el) => {
                                if (el) baseRows.current.set(k, el);
                                else baseRows.current.delete(k);
                            }}
                            className={`${rowClass} text-[17px] text-zinc-400 dark:text-zinc-500`}
                            style={{top: band, height: itemHeight}}
                        >
                            <span className="truncate">{option.label}</span>
                        </div>
                    );
                })}
            </div>

            {/* The same drum drawn again in ink and clipped to the band, so a row changes colour exactly as it
                crosses the edge of the selection instead of fading. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 overflow-hidden" style={{top: band, height: itemHeight}}>
                <div className="absolute inset-x-0" style={{top: -band, height, perspective: PERSPECTIVE}}>
                    {rows.filter((k) => Math.abs(k - center) <= 2).map((k) => (
                        <div
                            key={k}
                            ref={(el) => {
                                if (el) topRows.current.set(k, el);
                                else topRows.current.delete(k);
                            }}
                            className={`${rowClass} text-[17px] font-semibold text-zinc-900 dark:text-white`}
                            style={{top: band, height: itemHeight}}
                        >
                            <span className="truncate">{options[mod(k, count)].label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-1 rounded-lg ring-orange-500/70 group-focus-visible:ring-2" style={{top: band, height: itemHeight}}/>
        </div>
    );
};

/**
 * A wheel picker in the iOS style: each column is a real 3D drum with momentum, detents and snapping.
 * Drag, flick, scroll, tap a row, or use the arrow keys, Page Up/Down, Home/End and type-ahead.
 */
export const DrumPicker = ({columns, value, onChange, itemHeight = 36, label, className = ""}: DrumPickerProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const id = `drum-${useId().replace(/:/g, "")}`;
    // Radius of a cylinder whose facets are exactly one row tall at STEP degrees apart.
    const radius = itemHeight / (2 * Math.tan((STEP * Math.PI) / 360));
    const height = Math.round(radius * 2);

    return (
        <div role="group" aria-label={label} className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white px-2 pb-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-12px_rgba(0,0,0,0.12)] dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-none ${className}`}>
            <div aria-hidden="true" className="flex pb-1 pt-3">
                {columns.map((column) => (
                    <span
                        key={column.id}
                        style={{flex: column.grow ?? 1}}
                        className={`flex min-w-0 px-3 text-[10px] font-medium uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 ${justify[column.align ?? "center"]}`}
                    >
                        {column.label}
                    </span>
                ))}
            </div>
            <div className="relative flex">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 rounded-xl bg-zinc-100 shadow-[inset_0_1px_0_rgba(0,0,0,0.04),inset_0_-1px_0_rgba(0,0,0,0.04)] dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    style={{top: height / 2 - itemHeight / 2, height: itemHeight}}
                />
                {columns.map((column) => (
                    <Wheel
                        key={column.id}
                        column={column}
                        value={value[column.id]}
                        onChange={(next) => onChange(column.id, next)}
                        itemHeight={itemHeight}
                        radius={radius}
                        height={height}
                        reduceMotion={reduceMotion}
                        id={`${id}-${column.id}`}
                    />
                ))}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.9),rgba(255,255,255,0)_36%,rgba(255,255,255,0)_64%,rgba(255,255,255,0.9))] dark:bg-[linear-gradient(to_bottom,rgba(9,9,11,0.9),rgba(9,9,11,0)_36%,rgba(9,9,11,0)_64%,rgba(9,9,11,0.9))]"
                />
            </div>
        </div>
    );
};
