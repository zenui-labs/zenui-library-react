import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuLock} from "react-icons/lu";

export type SegmentedSize = "sm" | "md" | "lg";

export interface SegmentedOption<T extends string> {
    value: T;
    label: string;
    /** Locks the option. Arrow keys skip it. */
    disabled?: boolean;
    /** Shown under the control and read out when the option is focused. */
    reason?: string;
}

export interface SegmentedProps<T extends string> {
    /** Accessible name for the radio group. */
    label: string;
    options: SegmentedOption<T>[];
    /** Selected value when controlled. */
    value?: T;
    /** Selected value on first render when uncontrolled. Defaults to the first option. */
    defaultValue?: T;
    onChange?: (value: T) => void;
    size?: SegmentedSize;
    /** Makes the whole control read only and removes it from the tab order. */
    disabled?: boolean;
    className?: string;
}

const sizeClass: Record<SegmentedSize, {track: string; item: string; radius: string}> = {
    sm: {track: "p-0.5 rounded-lg", item: "h-7 px-2.5 text-xs", radius: "rounded-md"},
    md: {track: "p-1 rounded-xl", item: "h-8 px-3.5 text-sm", radius: "rounded-lg"},
    lg: {track: "p-1 rounded-2xl", item: "h-11 px-5 text-[15px]", radius: "rounded-xl"},
};

// Arrow keys skip disabled options. When the whole control is disabled, it leaves the tab order.
export const Segmented = <T extends string>({
    label,
    options,
    value,
    defaultValue,
    onChange,
    size = "md",
    disabled = false,
    className = "",
}: SegmentedProps<T>) => {
    const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
    const current = value ?? internal;
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const styles = sizeClass[size];

    const change = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const move = (from: number, step: number) => {
        for (let offset = 1; offset <= options.length; offset++) {
            const index = (from + step * offset + options.length) % options.length;
            if (!options[index].disabled) {
                change(options[index].value);
                buttons.current[index]?.focus();
                return;
            }
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            move(index, 1);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            move(index, -1);
        }
    };

    const reasons = options.filter((option) => option.disabled && option.reason);

    return (
        <div className={`flex flex-col items-start gap-1.5 ${className}`}>
            <div
                role="radiogroup"
                aria-label={label}
                aria-disabled={disabled || undefined}
                className={`inline-flex max-w-full bg-zinc-100 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06] ${styles.track} ${
                    disabled ? "opacity-60" : ""
                }`}
            >
                {options.map((option, index) => {
                    const checked = option.value === current;
                    const off = disabled || option.disabled;
                    return (
                        <button
                            key={option.value}
                            ref={(node) => {
                                buttons.current[index] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            aria-disabled={off || undefined}
                            aria-describedby={option.reason ? `${id}-${option.value}-reason` : undefined}
                            disabled={disabled}
                            tabIndex={checked && !disabled ? 0 : -1}
                            onClick={() => !off && change(option.value)}
                            onKeyDown={(event) => onKeyDown(event, index)}
                            className={`relative flex min-w-0 items-center justify-center gap-1.5 whitespace-nowrap font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${styles.item} ${styles.radius} ${
                                off
                                    ? "cursor-not-allowed text-zinc-400 dark:text-zinc-600"
                                    : checked
                                        ? "text-zinc-900 dark:text-white"
                                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                            }`}
                        >
                            {checked && (
                                <motion.span
                                    layoutId={`${id}-thumb`}
                                    className={`absolute inset-0 bg-white shadow-sm shadow-zinc-950/10 ring-1 ring-zinc-950/5 dark:bg-zinc-700/80 dark:ring-white/10 ${styles.radius}`}
                                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 38}}
                                />
                            )}
                            {option.disabled && <LuLock className="relative size-3 shrink-0" aria-hidden/>}
                            <span className="relative truncate">{option.label}</span>
                        </button>
                    );
                })}
            </div>
            {reasons.map((option) => (
                <p key={option.value} id={`${id}-${option.value}-reason`} className="text-xs text-zinc-500 dark:text-zinc-400">
                    {option.reason}
                </p>
            ))}
        </div>
    );
};
