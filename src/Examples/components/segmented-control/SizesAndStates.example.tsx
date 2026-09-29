import {useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuLock} from "react-icons/lu";

type Size = "sm" | "md" | "lg";

interface Option<T extends string> {
    value: T;
    label: string;
    disabled?: boolean;
    // Shown under the control and read out when the option is focused.
    reason?: string;
}

interface SegmentedProps<T extends string> {
    label: string;
    options: Option<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: Size;
    disabled?: boolean;
}

const sizeClass: Record<Size, {track: string; item: string; radius: string}> = {
    sm: {track: "p-0.5 rounded-lg", item: "h-7 px-2.5 text-xs", radius: "rounded-md"},
    md: {track: "p-1 rounded-xl", item: "h-8 px-3.5 text-sm", radius: "rounded-lg"},
    lg: {track: "p-1 rounded-2xl", item: "h-11 px-5 text-[15px]", radius: "rounded-xl"},
};

// Arrow keys skip disabled options. When the whole control is disabled, it leaves the tab order.
const Segmented = <T extends string>({label, options, value, onChange, size = "md", disabled = false}: SegmentedProps<T>) => {
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const styles = sizeClass[size];

    const move = (from: number, step: number) => {
        for (let offset = 1; offset <= options.length; offset++) {
            const index = (from + step * offset + options.length) % options.length;
            if (!options[index].disabled) {
                onChange(options[index].value);
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
        <div className="flex flex-col items-start gap-1.5">
            <div
                role="radiogroup"
                aria-label={label}
                aria-disabled={disabled || undefined}
                className={`inline-flex max-w-full bg-zinc-100 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06] ${styles.track} ${
                    disabled ? "opacity-60" : ""
                }`}
            >
                {options.map((option, index) => {
                    const checked = option.value === value;
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
                            onClick={() => !off && onChange(option.value)}
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

type Interval = "1h" | "24h" | "7d" | "30d";
type Plan = "hobby" | "pro" | "enterprise";
type Branch = "main" | "staging";

const intervals: Option<Interval>[] = [
    {value: "1h", label: "1h"},
    {value: "24h", label: "24h"},
    {value: "7d", label: "7d"},
    {value: "30d", label: "30d"},
];

const plans: Option<Plan>[] = [
    {value: "hobby", label: "Hobby"},
    {value: "pro", label: "Pro"},
    {value: "enterprise", label: "Enterprise", disabled: true, reason: "Enterprise needs a sales contract. Contact sales to enable it."},
];

const branches: Option<Branch>[] = [
    {value: "main", label: "main"},
    {value: "staging", label: "staging"},
];

const Row = ({title, detail, children}: {title: string; detail: string; children: ReactNode}) => (
    <div className="grid gap-3 py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-start sm:gap-6">
        <div>
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>
        </div>
        <div className="flex flex-col items-start gap-3">{children}</div>
    </div>
);

const SizesAndStates = () => {
    const [small, setSmall] = useState<Interval>("24h");
    const [medium, setMedium] = useState<Interval>("7d");
    const [large, setLarge] = useState<Interval>("30d");
    const [plan, setPlan] = useState<Plan>("pro");
    const [branch, setBranch] = useState<Branch>("main");

    return (
        <div className="w-full max-w-xl divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white px-5 dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
            <Row title="Sizes" detail="Small, medium and large">
                <Segmented label="Interval, small" options={intervals} value={small} onChange={(next) => setSmall(next)} size="sm"/>
                <Segmented label="Interval, medium" options={intervals} value={medium} onChange={(next) => setMedium(next)}/>
                <Segmented label="Interval, large" options={intervals} value={large} onChange={(next) => setLarge(next)} size="lg"/>
            </Row>
            <Row title="Disabled option" detail="Skipped by the arrow keys">
                <Segmented label="Plan" options={plans} value={plan} onChange={(next) => setPlan(next)}/>
            </Row>
            <Row title="Disabled control" detail="Read only for your role">
                <Segmented label="Production branch" options={branches} value={branch} onChange={(next) => setBranch(next)} disabled/>
                <p className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                    <LuLock className="size-3" aria-hidden/>
                    Only workspace admins can change the production branch.
                </p>
            </Row>
        </div>
    );
};

export default SizesAndStates;
