import {useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";

export type SegmentIcon = ComponentType<{className?: string}>;

export interface SegmentOption<T extends string> {
    value: T;
    label: string;
    /** When set, the label is hidden on small screens and only the icon shows. */
    icon?: SegmentIcon;
}

export interface SegmentedControlProps<T extends string> {
    /** Accessible name for the radio group. */
    label: string;
    options: SegmentOption<T>[];
    /** Selected value when controlled. */
    value?: T;
    /** Selected value on first render when uncontrolled. Defaults to the first option. */
    defaultValue?: T;
    onChange?: (value: T) => void;
    size?: "sm" | "md";
    className?: string;
}

// A radio group styled as a segmented control. Arrow keys move the selection, Home and End jump to the ends.
export const SegmentedControl = <T extends string>({
    label,
    options,
    value,
    defaultValue,
    onChange,
    size = "md",
    className = "",
}: SegmentedControlProps<T>) => {
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
    const current = value ?? internal;

    const change = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const select = (index: number) => {
        const next = (index + options.length) % options.length;
        change(options[next].value);
        buttons.current[next]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowDown: index + 1,
            ArrowLeft: index - 1,
            ArrowUp: index - 1,
            Home: 0,
            End: options.length - 1,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key]);
    };

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={`inline-flex rounded-xl bg-zinc-100 p-1 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06] ${className}`}
        >
            {options.map((option, index) => {
                const checked = option.value === current;
                const Icon = option.icon;
                return (
                    <button
                        key={option.value}
                        ref={(node) => {
                            buttons.current[index] = node;
                        }}
                        type="button"
                        role="radio"
                        aria-checked={checked}
                        tabIndex={checked ? 0 : -1}
                        onClick={() => change(option.value)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`relative flex items-center justify-center gap-2 rounded-lg font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                            size === "sm" ? "h-7 px-3 text-xs" : "h-9 px-3.5 text-sm"
                        } ${checked ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                    >
                        {checked && (
                            <motion.span
                                layoutId={`${id}-indicator`}
                                className="absolute inset-0 rounded-lg bg-white shadow-sm shadow-zinc-950/10 ring-1 ring-zinc-950/5 dark:bg-zinc-700/80 dark:shadow-black/40 dark:ring-white/10"
                                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 38}}
                            />
                        )}
                        {Icon && <Icon className={`relative ${size === "sm" ? "size-3.5" : "size-4"}`} aria-hidden/>}
                        <span className={Icon ? "sr-only sm:not-sr-only sm:relative" : "relative"}>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};
