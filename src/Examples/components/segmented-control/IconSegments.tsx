import {useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

export type SegmentIcon = ComponentType<{className?: string}>;

export interface IconOption<T extends string> {
    value: T;
    /** Accessible name, also shown as the tooltip. */
    label: string;
    icon: SegmentIcon;
}

export interface IconSegmentsProps<T extends string> {
    /** Accessible name for the radio group. */
    label: string;
    options: IconOption<T>[];
    /** Selected value when controlled. */
    value?: T;
    /** Selected value on first render when uncontrolled. Defaults to the first option. */
    defaultValue?: T;
    onChange?: (value: T) => void;
    className?: string;
}

// Icon-only segments. Each button carries its own accessible name and shows it as a tooltip on hover and focus.
export const IconSegments = <T extends string>({label, options, value, defaultValue, onChange, className = ""}: IconSegmentsProps<T>) => {
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
    const current = value ?? internal;

    const change = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
        if (!step) return;
        event.preventDefault();
        const next = (index + step + options.length) % options.length;
        change(options[next].value);
        buttons.current[next]?.focus();
    };

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className={`inline-flex gap-0.5 rounded-lg border border-zinc-200 bg-zinc-50 p-0.5 dark:border-white/10 dark:bg-white/[0.03] ${className}`}
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
                        aria-label={option.label}
                        tabIndex={checked ? 0 : -1}
                        onClick={() => change(option.value)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`group relative flex size-8 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                            checked ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                        }`}
                    >
                        {checked && (
                            <motion.span
                                layoutId={`${id}-indicator`}
                                className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-zinc-950/[0.06] dark:bg-zinc-700 dark:ring-white/10"
                                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 550, damping: 40}}
                            />
                        )}
                        <Icon className="relative size-4" aria-hidden/>
                        <span
                            className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white dark:text-zinc-900"
                            aria-hidden
                        >
                            {option.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

export interface SettingRowProps {
    title: string;
    /** Smaller line under the title, such as the current value. */
    detail?: ReactNode;
    /** The control shown on the right. */
    children: ReactNode;
}

/** A settings row with a title on the left and a control on the right. */
export const SettingRow = ({title, detail, children}: SettingRowProps) => (
    <div className="flex items-center justify-between gap-4 px-5 py-4">
        <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-white">{title}</p>
            {detail && <p className="text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>}
        </div>
        {children}
    </div>
);

export interface SettingsCardProps {
    /** Setting rows, usually `SettingRow` elements. */
    children: ReactNode;
    /** Optional content shown in a shaded footer under the rows. */
    preview?: ReactNode;
    previewLabel?: string;
    className?: string;
}

/** A card that stacks setting rows with dividers and an optional preview footer. */
export const SettingsCard = ({children, preview, previewLabel = "Preview", className = ""}: SettingsCardProps) => (
    <div className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
        <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">{children}</div>
        {preview && (
            <div className="rounded-b-2xl border-t border-zinc-100 bg-zinc-50 p-5 dark:border-white/[0.06] dark:bg-black/20">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{previewLabel}</p>
                {preview}
            </div>
        )}
    </div>
);
