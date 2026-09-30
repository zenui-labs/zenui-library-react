import {useCallback, useId, useLayoutEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring} from "framer-motion";

export interface FisheyeEntry {
    id: string;
    label: string;
    /** Short text before the label, such as a chapter number. Set in monospace. */
    marker?: string;
}

export interface FisheyeIndexProps<T extends FisheyeEntry> {
    items: T[];
    /** Content of the panel beside the index, for the entry under the lens. */
    renderPreview: (item: T, index: number) => ReactNode;
    /** Called on click, tap or Enter. */
    onSelect?: (item: T, index: number) => void;
    /** Scale of the row at the centre of the lens. */
    magnification?: number;
    /** Width of the lens in rows. Larger values magnify more neighbours. */
    spread?: number;
    /** Height of one row at rest, in px. */
    rowHeight?: number;
    initialIndex?: number;
    /** Accessible name of the list. */
    label?: string;
    className?: string;
}

// Room above and below the list for the rows the lens pushes outward.
const PAD = 44;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * A dense vertical index that magnifies around the pointer like a dock turned on its side. Rows grow and push
 * their neighbours apart while the row under the lens stays pinned to it, and a preview follows along.
 */
export const FisheyeIndex = <T extends FisheyeEntry>({
    items,
    renderPreview,
    onSelect,
    magnification = 1.9,
    spread = 2.6,
    rowHeight = 12,
    initialIndex = 0,
    label = "Index",
    className = "",
}: FisheyeIndexProps<T>) => {
    const reduceMotion = useReducedMotion() ?? false;
    const id = `fisheye-${useId().replace(/:/g, "")}`;
    const listRef = useRef<HTMLUListElement>(null);
    const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
    const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [active, setActive] = useState(clamp(initialIndex, 0, items.length - 1));
    const activeRef = useRef(active);
    const pointerInside = useRef(false);

    // Lens position in rows and how strongly it magnifies (0 at rest, 1 in use). Both glide on springs.
    const lensTarget = useMotionValue(active);
    const strengthTarget = useMotionValue(0);
    const lens = useSpring(lensTarget, {stiffness: 520, damping: 46});
    const strength = useSpring(strengthTarget, {stiffness: 240, damping: 28});

    const layout = useCallback(() => {
        const c = lens.get();
        const s = strength.get();
        const n = items.length;
        const sigma2 = 2 * spread * spread;
        const falloff: number[] = [];
        const centres: number[] = [];
        let grown = 0;
        // Each row grows around its own centre. Summing the extra height of the rows above gives every row the
        // offset that keeps it clear of its neighbours; subtracting that sum at the lens pins the lens in place.
        for (let i = 0; i < n; i++) {
            const g = Math.exp(-((i - c) ** 2) / sigma2) * s;
            const extra = rowHeight * (magnification - 1) * g;
            falloff.push(g);
            centres.push(grown + extra / 2);
            grown += extra;
        }
        const i0 = clamp(Math.floor(c), 0, n - 1);
        const i1 = Math.min(n - 1, i0 + 1);
        const f = clamp(c - i0, 0, 1);
        const anchor = centres[i0] + (centres[i1] - centres[i0]) * f;
        for (let i = 0; i < n; i++) {
            const g = falloff[i];
            const shift = centres[i] - anchor;
            const row = rowRefs.current[i];
            if (row) {
                row.style.transform = `translate3d(${g * 18}px, ${shift}px, 0) scale(${1 + (magnification - 1) * g})`;
                row.style.opacity = String(0.5 + 0.5 * g + 0.25 * (1 - s));
                row.style.fontWeight = g > 0.62 ? "600" : g > 0.3 ? "500" : "400";
            }
            const tick = tickRefs.current[i];
            if (tick) tick.style.transform = `translate3d(0, ${shift}px, 0) scaleX(${0.3 + 0.7 * g})`;
        }
    }, [items.length, lens, magnification, rowHeight, spread, strength]);

    useMotionValueEvent(lens, "change", layout);
    useMotionValueEvent(strength, "change", layout);
    useLayoutEffect(layout);

    const setLens = (value: number, index: number) => {
        lensTarget.set(value);
        if (reduceMotion) lens.jump(value);
        if (index !== activeRef.current) {
            activeRef.current = index;
            setActive(index);
        }
    };

    const setStrength = (value: number) => {
        strengthTarget.set(value);
        if (reduceMotion) strength.jump(value);
    };

    const fromPointer = (event: PointerEvent<HTMLUListElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const c = clamp((event.clientY - rect.top - PAD) / rowHeight - 0.5, 0, items.length - 1);
        setLens(c, Math.round(c));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        const last = items.length - 1;
        const moves: Record<string, number> = {
            ArrowDown: activeRef.current + 1,
            ArrowUp: activeRef.current - 1,
            PageDown: activeRef.current + 8,
            PageUp: activeRef.current - 8,
            Home: 0,
            End: last,
        };
        if (event.key in moves) {
            event.preventDefault();
            const next = clamp(moves[event.key], 0, last);
            setStrength(1);
            setLens(next, next);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect?.(items[activeRef.current], activeRef.current);
        }
    };

    const item = items[active];

    return (
        <div className={`grid w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-[minmax(0,330px)_minmax(0,1fr)] ${className}`}>
            <div className="relative overflow-hidden border-t border-zinc-200 dark:border-zinc-800 sm:border-r sm:border-t-0">
                {/* Ruler: one tick per row that lengthens under the lens, like the scale on a slide rule. */}
                <div aria-hidden="true" className="pointer-events-none absolute left-4 top-0" style={{paddingTop: PAD}}>
                    {items.map((entry, index) => (
                        <span
                            key={entry.id}
                            ref={(el) => {
                                tickRefs.current[index] = el;
                            }}
                            className="flex origin-left items-center"
                            style={{height: rowHeight}}
                        >
                            <span className={`h-px w-4 ${index === active ? "bg-orange-500" : "bg-zinc-300 dark:bg-zinc-700"}`}/>
                        </span>
                    ))}
                </div>
                <ul
                    ref={listRef}
                    role="listbox"
                    aria-label={label}
                    aria-activedescendant={`${id}-${item.id}`}
                    tabIndex={0}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setStrength(1)}
                    onBlur={() => !pointerInside.current && setStrength(0)}
                    onPointerEnter={(event) => {
                        pointerInside.current = true;
                        setStrength(1);
                        fromPointer(event);
                    }}
                    onPointerMove={fromPointer}
                    onPointerDown={(event) => {
                        if (event.pointerType !== "mouse") event.currentTarget.setPointerCapture(event.pointerId);
                        fromPointer(event);
                    }}
                    onPointerLeave={() => {
                        pointerInside.current = false;
                        if (document.activeElement !== listRef.current) setStrength(0);
                    }}
                    onPointerUp={(event) => {
                        if (event.pointerType !== "mouse") {
                            pointerInside.current = false;
                            setStrength(0);
                        }
                    }}
                    onClick={() => onSelect?.(items[activeRef.current], activeRef.current)}
                    className="relative cursor-default touch-none select-none pl-12 pr-4 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-500/60"
                    style={{paddingTop: PAD, paddingBottom: PAD}}
                >
                    {items.map((entry, index) => (
                        <li
                            key={entry.id}
                            id={`${id}-${entry.id}`}
                            role="option"
                            aria-selected={index === active}
                            ref={(el) => {
                                rowRefs.current[index] = el;
                            }}
                            className="flex origin-left items-center gap-2 whitespace-nowrap text-[10px] text-zinc-800 will-change-transform dark:text-zinc-100"
                            style={{height: rowHeight, lineHeight: `${rowHeight}px`}}
                        >
                            {entry.marker && (
                                <span className={`w-6 shrink-0 font-mono tabular-nums ${index === active ? "text-orange-600 dark:text-orange-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                                    {entry.marker}
                                </span>
                            )}
                            <span>{entry.label}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="relative order-first min-h-[220px] p-6 sm:order-none sm:p-8">
                <div className="mb-6 flex items-center gap-3 font-mono text-[10px] tabular-nums text-zinc-400 dark:text-zinc-500">
                    <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
                    <span aria-hidden="true" className="relative h-px flex-1 bg-zinc-200 dark:bg-zinc-800">
                        <motion.span
                            className="absolute -top-[3px] h-[7px] w-px bg-orange-500"
                            animate={{left: `${(active / Math.max(1, items.length - 1)) * 100}%`}}
                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 400, damping: 36}}
                        />
                    </span>
                </div>
                <div>
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={item.id}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                            transition={{duration: 0.18, ease: [0.2, 0.7, 0.2, 1]}}
                        >
                            {renderPreview(item, active)}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
