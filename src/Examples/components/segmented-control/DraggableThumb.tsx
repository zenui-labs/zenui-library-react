import {useEffect, useId, useLayoutEffect, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, MouseEvent, PointerEvent} from "react";
import {AnimatePresence, animate, motion, useMotionValue, useReducedMotion} from "framer-motion";
import {LuCar, LuClock, LuUsers} from "react-icons/lu";

export interface RideOption<T extends string> {
    value: T;
    label: string;
    /** Formatted price, such as "$14.20". */
    price: string;
    /** Time until pickup, such as "4 min". */
    eta: string;
    seats: number;
    note: string;
    /** Icon in the detail card. Defaults to a car. */
    icon?: ComponentType<{className?: string}>;
}

const PADDING = 4;

interface DragState {
    pointerId: number;
    startX: number;
    startThumb: number;
    pressedIndex: number;
    dragging: boolean;
    moved: boolean;
}

export interface DraggableThumbProps<T extends string> {
    options: RideOption<T>[];
    /** Selected value when controlled. */
    value?: T;
    /** Selected value on first render when uncontrolled. Defaults to the first option. */
    defaultValue?: T;
    onChange?: (value: T) => void;
    /** Visible label that also names the radio group. */
    label?: string;
    /** Hint under the detail card. Pass an empty string to hide it. */
    hint?: string;
    /** Text after the pickup time in the detail card. */
    etaSuffix?: string;
    /** Text after the seat count in the detail card. */
    seatsSuffix?: string;
    className?: string;
}

/** A segmented control whose thumb you can drag between options or tap. It snaps to the nearest option on release. */
export const DraggableThumb = <T extends string>({
    options,
    value,
    defaultValue,
    onChange,
    label = "Choose a ride",
    hint = "Drag the thumb or tap a ride",
    etaSuffix = "away",
    seatsSuffix = "seats",
    className = "",
}: DraggableThumbProps<T>) => {
    const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
    const ride = value ?? internal;
    const [segment, setSegment] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState<number | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const drag = useRef<DragState | null>(null);
    const measured = useRef(false);
    const x = useMotionValue(0);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const index = options.findIndex((option) => option.value === ride);
    const current = options[index];
    const Icon = current.icon ?? LuCar;

    const setRide = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    // Segment width follows the track width, so the thumb stays aligned when the layout changes.
    useLayoutEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const observer = new ResizeObserver(([entry]) => {
            setSegment(entry.contentRect.width / options.length);
        });
        observer.observe(track);
        return () => observer.disconnect();
    }, [options.length]);

    // Moves the thumb to the selected segment. The first placement is instant.
    useEffect(() => {
        if (!segment || drag.current?.dragging) return;
        const target = index * segment;
        if (!measured.current || reduceMotion) {
            x.set(target);
            measured.current = true;
            return;
        }
        const controls = animate(x, target, {type: "spring", stiffness: 520, damping: 42});
        return () => controls.stop();
    }, [index, segment, reduceMotion, x]);

    const indexAt = (clientX: number) => {
        const rect = trackRef.current?.getBoundingClientRect();
        if (!rect || !segment) return index;
        return Math.min(options.length - 1, Math.max(0, Math.floor((clientX - rect.left - PADDING) / segment)));
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        const pressedIndex = indexAt(event.clientX);
        // Like iOS, only a press that starts on the thumb can drag it. Anywhere else is a tap.
        drag.current = {pointerId: event.pointerId, startX: event.clientX, startThumb: x.get(), pressedIndex, dragging: pressedIndex === index, moved: false};
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(pressedIndex === index);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const state = drag.current;
        if (!state || state.pointerId !== event.pointerId || !state.dragging) return;
        const delta = event.clientX - state.startX;
        if (Math.abs(delta) > 3) state.moved = true;
        const next = Math.min((options.length - 1) * segment, Math.max(0, state.startThumb + delta));
        x.set(next);
        setPreview(Math.round(next / segment));
    };

    const finish = (event: PointerEvent<HTMLDivElement>) => {
        const state = drag.current;
        if (!state || state.pointerId !== event.pointerId) return;
        const target = state.dragging && state.moved ? Math.round(x.get() / segment) : indexAt(event.clientX);
        drag.current = null;
        setDragging(false);
        setPreview(null);
        setRide(options[target].value);
        // Snap back even when the selection did not change.
        animate(x, target * segment, reduceMotion ? {duration: 0} : {type: "spring", stiffness: 520, damping: 42});
        buttons.current[target]?.focus({preventScroll: true});
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, from: number) => {
        const keys: Record<string, number> = {ArrowRight: from + 1, ArrowDown: from + 1, ArrowLeft: from - 1, ArrowUp: from - 1, Home: 0, End: options.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + options.length) % options.length;
        setRide(options[next].value);
        buttons.current[next]?.focus();
    };

    // Pointer input is handled on the track. This click only fires for keyboard activation (detail is 0).
    const onClick = (event: MouseEvent<HTMLButtonElement>, target: number) => {
        if (event.detail === 0) setRide(options[target].value);
    };

    const highlighted = preview ?? index;

    return (
        <div className={`w-full max-w-sm ${className}`}>
            <p id={`${id}-label`} className="mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {label}
            </p>
            <div
                ref={trackRef}
                role="radiogroup"
                aria-labelledby={`${id}-label`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={finish}
                onPointerCancel={finish}
                className="relative grid touch-pan-y select-none rounded-2xl bg-zinc-200/70 dark:bg-white/[0.06]"
                style={{padding: PADDING, gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`}}
            >
                {segment > 0 && (
                    <motion.span
                        className="absolute bottom-1 left-1 top-1 rounded-xl bg-white shadow-md shadow-zinc-950/10 ring-1 ring-zinc-950/5 dark:bg-zinc-600 dark:shadow-black/40 dark:ring-white/10"
                        style={{x, width: segment}}
                        animate={{scale: dragging && !reduceMotion ? 0.95 : 1}}
                        transition={{type: "spring", stiffness: 600, damping: 32}}
                        aria-hidden
                    />
                )}
                {options.map((option, optionIndex) => {
                    const checked = option.value === ride;
                    return (
                        <button
                            key={option.value}
                            ref={(node) => {
                                buttons.current[optionIndex] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            tabIndex={checked ? 0 : -1}
                            onClick={(event) => onClick(event, optionIndex)}
                            onKeyDown={(event) => onKeyDown(event, optionIndex)}
                            className={`relative z-10 flex h-14 flex-col items-center justify-center rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                                optionIndex === highlighted ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"
                            }`}
                        >
                            <span className="text-sm font-semibold">{option.label}</span>
                            <span className="text-xs tabular-nums opacity-80">{option.price}</span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.value}
                        className="flex items-center gap-4"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                        transition={{duration: 0.15}}
                    >
                        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-700 dark:bg-white/[0.06] dark:text-zinc-200" aria-hidden>
                            <Icon className="size-6"/>
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="flex items-baseline justify-between gap-3">
                                <span className="font-semibold text-zinc-900 dark:text-white">{current.label}</span>
                                <span className="font-semibold tabular-nums text-zinc-900 dark:text-white">{current.price}</span>
                            </p>
                            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{current.note}</p>
                            <p className="mt-1.5 flex gap-3 text-xs text-zinc-600 dark:text-zinc-300">
                                <span className="flex items-center gap-1">
                                    <LuClock className="size-3.5" aria-hidden/>
                                    {current.eta} {etaSuffix}
                                </span>
                                <span className="flex items-center gap-1">
                                    <LuUsers className="size-3.5" aria-hidden/>
                                    {current.seats} {seatsSuffix}
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            {hint && <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>}
        </div>
    );
};
