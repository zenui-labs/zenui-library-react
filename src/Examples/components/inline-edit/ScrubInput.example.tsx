import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";

interface ScrubFieldProps {
    label: string;
    name: string;
    value: number;
    min: number;
    max: number;
    unit?: string;
    /** Value change per pixel dragged. */
    step?: number;
    onChange: (value: number) => void;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

// Accepts a plain number or a simple sum such as "240/2" or "64+16".
const evaluate = (text: string): number | null => {
    const match = text.trim().match(/^(-?\d*\.?\d+)\s*(?:([+\-*/])\s*(-?\d*\.?\d+))?$/);
    if (!match) return null;
    const a = Number(match[1]);
    if (!match[2]) return a;
    const b = Number(match[3]);
    if (match[2] === "+") return a + b;
    if (match[2] === "-") return a - b;
    if (match[2] === "*") return a * b;
    return b === 0 ? null : a / b;
};

const ScrubField = ({label, name, value, min, max, unit = "", step = 1, onChange}: ScrubFieldProps) => {
    const [draft, setDraft] = useState(String(value));
    const [focused, setFocused] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const drag = useRef<{startX: number; startValue: number; moved: boolean} | null>(null);
    const id = useId();

    useEffect(() => {
        if (!focused) setDraft(String(value));
    }, [value, focused]);

    const commit = () => {
        const result = evaluate(draft);
        if (result === null) {
            setInvalid(true);
            setDraft(String(value));
            return;
        }
        setInvalid(false);
        const next = clamp(Math.round(result), min, max);
        onChange(next);
        setDraft(String(next));
    };

    const onPointerDown = (event: PointerEvent<HTMLLabelElement>) => {
        if (event.button !== 0) return;
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        drag.current = {startX: event.clientX, startValue: value, moved: false};
    };

    const onPointerMove = (event: PointerEvent<HTMLLabelElement>) => {
        const state = drag.current;
        if (!state) return;
        const delta = event.clientX - state.startX;
        if (!state.moved && Math.abs(delta) < 3) return;
        state.moved = true;
        setDragging(true);
        // Hold Shift for coarse steps, Alt for fine steps.
        const factor = event.shiftKey ? 10 : event.altKey ? 0.2 : 1;
        onChange(clamp(Math.round(state.startValue + delta * step * factor), min, max));
    };

    const onPointerUp = () => {
        const state = drag.current;
        drag.current = null;
        setDragging(false);
        // A click without a drag focuses the field instead.
        if (state && !state.moved) inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            commit();
            inputRef.current?.select();
        } else if (event.key === "Escape") {
            event.preventDefault();
            setDraft(String(value));
            setInvalid(false);
            inputRef.current?.blur();
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            const amount = (event.shiftKey ? 10 : 1) * (event.key === "ArrowUp" ? 1 : -1);
            const next = clamp(value + amount, min, max);
            onChange(next);
            setDraft(String(next));
        }
    };

    return (
        <div
            className={`flex h-9 items-center overflow-hidden rounded-lg border bg-zinc-50 transition dark:bg-white/[0.04] ${
                invalid
                    ? "border-rose-400 dark:border-rose-400/60"
                    : focused || dragging
                        ? "border-sky-500 bg-white ring-2 ring-sky-500/15 dark:border-sky-400 dark:bg-zinc-950"
                        : "border-transparent hover:border-zinc-200 dark:hover:border-white/10"
            }`}
        >
            <label
                htmlFor={id}
                title={`Drag to change ${name.toLowerCase()}`}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
                // Focus is handled in onPointerUp, so a drag does not also focus the field.
                onClick={(event) => event.preventDefault()}
                className={`flex h-full w-8 shrink-0 cursor-ew-resize touch-none select-none items-center justify-center text-[11px] font-medium transition-colors ${
                    dragging ? "text-sky-600 dark:text-sky-400" : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                }`}
            >
                <span aria-hidden>{label}</span>
                <span className="sr-only">{name}</span>
            </label>
            <input
                ref={inputRef}
                id={id}
                value={draft}
                inputMode="decimal"
                autoComplete="off"
                spellCheck={false}
                aria-invalid={invalid}
                aria-describedby={`${id}-range`}
                onChange={(event) => {
                    setDraft(event.target.value);
                    setInvalid(false);
                }}
                onFocus={(event) => {
                    setFocused(true);
                    event.currentTarget.select();
                }}
                onBlur={() => {
                    setFocused(false);
                    commit();
                }}
                onKeyDown={onKeyDown}
                className="h-full min-w-0 flex-1 bg-transparent pr-1 font-mono text-xs tabular-nums text-zinc-900 outline-none dark:text-zinc-100"
            />
            <span className="pr-2.5 text-[11px] text-zinc-400 dark:text-zinc-500" aria-hidden>{unit}</span>
            <span id={`${id}-range`} className="sr-only">
                From {min} to {max}{unit ? ` ${unit}` : ""}. Arrow keys change it by 1, Shift by 10.
            </span>
        </div>
    );
};

const ScrubInput = () => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(128);
    const [radius, setRadius] = useState(24);
    const [rotation, setRotation] = useState(-8);
    const [opacity, setOpacity] = useState(90);
    const reduceMotion = useReducedMotion();
    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 400, damping: 34};

    return (
        <div className="grid w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:grid-cols-[1fr_15rem] dark:border-white/10 dark:bg-zinc-900">
            <div
                className="relative flex h-64 items-center justify-center overflow-hidden bg-zinc-100 sm:h-auto sm:min-h-[20rem] dark:bg-zinc-950"
                style={{
                    backgroundImage: "radial-gradient(circle, rgba(113,113,122,0.25) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                }}
                aria-hidden
            >
                <motion.div
                    className="bg-gradient-to-br from-sky-400 via-indigo-500 to-fuchsia-500 shadow-xl shadow-indigo-500/20"
                    style={{width: width * 0.8, height: height * 0.8, borderRadius: radius * 0.8}}
                    animate={{rotate: rotation, opacity: opacity / 100}}
                    transition={spring}
                />
            </div>
            <div className="border-t border-zinc-100 p-4 sm:border-l sm:border-t-0 dark:border-white/[0.06]">
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">Hero card</p>
                <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400">Drag a label, or type a value or a sum like 240/2.</p>

                <p className="mb-1.5 mt-4 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Size</p>
                <div className="grid grid-cols-2 gap-1.5">
                    <ScrubField label="W" name="Width" value={width} min={40} max={320} unit="px" onChange={setWidth}/>
                    <ScrubField label="H" name="Height" value={height} min={40} max={240} unit="px" onChange={setHeight}/>
                </div>

                <p className="mb-1.5 mt-4 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Shape</p>
                <div className="grid grid-cols-2 gap-1.5">
                    <ScrubField label="R" name="Corner radius" value={radius} min={0} max={120} unit="px" step={0.5} onChange={setRadius}/>
                    <ScrubField label="°" name="Rotation" value={rotation} min={-180} max={180} unit="deg" onChange={setRotation}/>
                </div>

                <p className="mb-1.5 mt-4 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Layer</p>
                <ScrubField label="O" name="Opacity" value={opacity} min={0} max={100} unit="%" step={0.5} onChange={setOpacity}/>
            </div>
        </div>
    );
};

export default ScrubInput;
