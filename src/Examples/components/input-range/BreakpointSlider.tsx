import {useState, type ChangeEvent, type KeyboardEvent} from "react";

export interface BreakpointSliderProps {
    /** Values the slider snaps to, in ascending order. The first and last set the range. */
    breakpoints?: number[];
    /** Value for a controlled slider. It should be one of the breakpoints. */
    value?: number;
    /** Starting value for an uncontrolled slider. */
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Text under each breakpoint marker. */
    formatLabel?: (point: number) => string;
    /** Color of the filled track and the handle. */
    accentColor?: string;
    /** Accessible name for the slider, read by screen readers. */
    label?: string;
    className?: string;
}

const DEFAULT_BREAKPOINTS = [0, 25, 50, 75, 100];

/** A slider that snaps to fixed breakpoints, with a marker and a label for each one. */
export const BreakpointSlider = ({
    breakpoints = DEFAULT_BREAKPOINTS,
    value,
    defaultValue = 50,
    onChange,
    formatLabel = (point) => `${point}%`,
    accentColor = "#108476",
    label = "Value",
    className = "",
}: BreakpointSliderProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const current = value ?? internalValue;
    const min = breakpoints[0] ?? 0;
    const max = breakpoints[breakpoints.length - 1] ?? 100;
    const toPercent = (point: number) => (max > min ? ((point - min) / (max - min)) * 100 : 0);

    const findNearestBreakpoint = (target: number) =>
        breakpoints.reduce((prev, curr) => (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev), min);

    const commit = (next: number) => {
        if (next === current) return;
        setInternalValue(next);
        onChange?.(next);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        commit(findNearestBreakpoint(Number(event.target.value)));
    };

    // A step of 1 would always snap back to the same breakpoint, so the keys jump to the neighbor instead.
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const index = breakpoints.indexOf(findNearestBreakpoint(current));
        const last = breakpoints.length - 1;
        let nextIndex: number | null = null;

        if (event.key === "ArrowRight" || event.key === "ArrowUp") nextIndex = Math.min(index + 1, last);
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextIndex = Math.max(index - 1, 0);
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = last;
        if (nextIndex === null) return;

        event.preventDefault();
        commit(breakpoints[nextIndex]);
    };

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <div className="relative w-64 h-3 dark:bg-slate-700 bg-gray-300 rounded-full cursor-pointer">
                {/* The native input sits on top, invisible, so dragging, clicks and the keyboard all work. */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={current}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    aria-label={label}
                    aria-valuetext={formatLabel(current)}
                    className="peer absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
                />
                <div
                    className="pointer-events-none absolute top-0 h-3 rounded-full"
                    style={{width: `${toPercent(current)}%`, backgroundColor: accentColor}}
                />
                <div
                    className="pointer-events-none absolute top-[50%] w-[22px] h-[22px] transform rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 transition-transform duration-150 ease-in-out border-2 border-white peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900"
                    style={{left: `${toPercent(current)}%`, backgroundColor: accentColor, ["--tw-ring-color" as string]: accentColor}}
                />
                {breakpoints.map((point) => (
                    <div
                        key={point}
                        aria-hidden
                        className="pointer-events-none absolute top-[50%] w-[10px] h-[10px] transform -translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-300 rounded-full border border-gray-500"
                        style={{left: `${toPercent(point)}%`}}
                    />
                ))}
            </div>

            <div className="flex justify-between w-64 mt-2" aria-hidden>
                {breakpoints.map((point) => (
                    <span key={point} className="text-sm dark:text-[#abc2d3] text-gray-700">
                        {formatLabel(point)}
                    </span>
                ))}
            </div>
        </div>
    );
};
