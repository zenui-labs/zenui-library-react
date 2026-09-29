import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuInfo} from "react-icons/lu";

export interface StorageSegment {
    label: string;
    /** Space used, in the card's storage unit. */
    size: number;
    /** Tailwind background class for the bar and the legend dot. */
    color: string;
}

export interface UsageMeter {
    label: string;
    used: number;
    limit: number;
    /** Unit name for screen readers and the over-limit message, for example "calls". */
    unit: string;
    /** Shown under the bar while under the limit, for example "Resets Oct 1". */
    note: string;
    /** Added to the over-limit message, for example how extra usage is billed. */
    overageNote?: string;
}

export interface UsageLimitsProps {
    storage: StorageSegment[];
    storageLimit: number;
    meters: UsageMeter[];
    storageLabel?: string;
    storageUnit?: string;
    planName?: string;
    /** Share of the limit, from 0 to 1, at which a meter turns amber. */
    warningAt?: number;
    /** Footer text next to the button. */
    upgradeText?: string;
    upgradeLabel?: string;
    onUpgrade?: () => void;
    className?: string;
}

type Level = "ok" | "warning" | "over";

const levelOf = (ratio: number, warningAt: number): Level => (ratio >= 1 ? "over" : ratio >= warningAt ? "warning" : "ok");

const barColor: Record<Level, string> = {
    ok: "bg-zinc-900 dark:bg-zinc-100",
    warning: "bg-amber-500",
    over: "bg-rose-500",
};

const textColor: Record<Level, string> = {
    ok: "text-zinc-500 dark:text-zinc-400",
    warning: "text-amber-700 dark:text-amber-300",
    over: "text-rose-700 dark:text-rose-300",
};

const format = (value: number) => value.toLocaleString("en-US");
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** A plan usage card with a stacked storage bar and meters that turn amber near the limit and red when it is exceeded. */
export const UsageLimits = ({
    storage,
    storageLimit,
    meters,
    storageLabel = "Storage",
    storageUnit = "GB",
    planName = "Team plan",
    warningAt = 0.85,
    upgradeText = "Need more room? Business includes 1 TB.",
    upgradeLabel = "Compare plans",
    onUpgrade,
    className = "",
}: UsageLimitsProps) => {
    const [hovered, setHovered] = useState<string | null>(null);
    const reduceMotion = useReducedMotion();
    const used = storage.reduce((sum, segment) => sum + segment.size, 0);

    const grow = (delay: number) =>
        reduceMotion
            ? {}
            : {initial: {scaleX: 0}, whileInView: {scaleX: 1}, viewport: {once: true}, transition: {duration: 0.7, delay, ease: EASE}};

    return (
        <div className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">{storageLabel}</p>
                    <p className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">{storageLimit} {storageUnit} on {planName}</p>
                </div>
                <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">
                    {used.toFixed(1)} {storageUnit} <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500">used</span>
                </p>

                <div
                    className="mt-4 flex h-3 gap-0.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]"
                    role="img"
                    aria-label={`${used.toFixed(1)} of ${storageLimit} ${storageUnit} used: ${storage.map((segment) => `${segment.label} ${segment.size} ${storageUnit}`).join(", ")}`}
                >
                    {storage.map((segment, index) => (
                        <motion.span
                            key={segment.label}
                            className={`h-full origin-left transition-opacity ${segment.color} ${hovered && hovered !== segment.label ? "opacity-30" : ""}`}
                            style={{width: `${(segment.size / storageLimit) * 100}%`}}
                            {...grow(index * 0.08)}
                        />
                    ))}
                </div>

                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                    {storage.map((segment) => (
                        <li
                            key={segment.label}
                            onMouseEnter={() => setHovered(segment.label)}
                            onMouseLeave={() => setHovered(null)}
                            className="flex items-center gap-2 rounded-md py-0.5"
                        >
                            <span className={`size-2 shrink-0 rounded-sm ${segment.color}`} aria-hidden/>
                            <span className="text-zinc-600 dark:text-zinc-300">{segment.label}</span>
                            <span className="ml-auto tabular-nums text-zinc-500 dark:text-zinc-400">
                                {segment.size} {storageUnit}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            <ul className="divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-white/[0.06] dark:border-white/[0.06]">
                {meters.map((meter, index) => {
                    const ratio = meter.used / meter.limit;
                    const level = levelOf(ratio, warningAt);
                    return (
                        <li key={meter.label} className="px-5 py-3.5">
                            <div className="flex items-baseline justify-between gap-3 text-sm">
                                <span className="text-zinc-700 dark:text-zinc-300">{meter.label}</span>
                                <span className="tabular-nums text-zinc-900 dark:text-zinc-100">
                                    {format(meter.used)} <span className="text-zinc-400 dark:text-zinc-500">/ {format(meter.limit)}</span>
                                </span>
                            </div>
                            <div
                                className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]"
                                role="progressbar"
                                aria-label={meter.label}
                                aria-valuemin={0}
                                aria-valuemax={meter.limit}
                                aria-valuenow={Math.min(meter.used, meter.limit)}
                                aria-valuetext={`${format(meter.used)} of ${format(meter.limit)} ${meter.unit}`}
                            >
                                <motion.div
                                    className={`h-full origin-left rounded-full ${barColor[level]}`}
                                    style={{width: `${Math.min(ratio, 1) * 100}%`}}
                                    {...grow(0.2 + index * 0.08)}
                                />
                            </div>
                            <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${textColor[level]}`}>
                                {level !== "ok" && <LuInfo className="size-3" aria-hidden/>}
                                {level === "over"
                                    ? `${format(meter.used - meter.limit)} ${meter.unit} over the limit.${meter.overageNote ? ` ${meter.overageNote}` : ""}`
                                    : level === "warning"
                                        ? `${Math.round(ratio * 100)}% used. ${meter.note}.`
                                        : meter.note}
                            </p>
                        </li>
                    );
                })}
            </ul>

            {(upgradeText || upgradeLabel) && (
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 bg-zinc-50/70 px-5 py-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                    {upgradeText && <p className="text-xs text-zinc-500 dark:text-zinc-400">{upgradeText}</p>}
                    {upgradeLabel && (
                        <button
                            type="button"
                            onClick={onUpgrade}
                            className="rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                        >
                            {upgradeLabel}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
