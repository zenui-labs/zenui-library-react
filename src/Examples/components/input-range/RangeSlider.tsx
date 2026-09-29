import {useState, type ChangeEvent} from "react";

export interface RangeSliderProps {
    /** Value for a controlled slider. */
    value?: number;
    /** Starting value for an uncontrolled slider. */
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    step?: number;
    /** Color of the filled track and the handle. */
    accentColor?: string;
    /** Accessible name for the slider, read by screen readers. */
    label?: string;
    disabled?: boolean;
    className?: string;
}

/** A slider with a filled track and a round handle. Drag, click the track or use the arrow keys to change the value. */
export const RangeSlider = ({
    value,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    accentColor = "#108476",
    label = "Value",
    disabled = false,
    className = "",
}: RangeSliderProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const current = value ?? internalValue;
    const percent = max > min ? ((current - min) / (max - min)) * 100 : 0;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = Number(event.target.value);
        setInternalValue(next);
        onChange?.(next);
    };

    return (
        <div className={`flex items-center justify-center ${disabled ? "opacity-50" : ""} ${className}`}>
            <div className="relative w-64 h-3 bg-gray-300 dark:bg-slate-700 rounded-full cursor-pointer">
                {/* The native input sits on top, invisible, so dragging, clicks and the keyboard all work. */}
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={current}
                    disabled={disabled}
                    onChange={handleChange}
                    aria-label={label}
                    className="peer absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
                <div
                    className="pointer-events-none absolute top-0 h-3 rounded-full"
                    style={{width: `${percent}%`, backgroundColor: accentColor}}
                />
                <div
                    className="pointer-events-none absolute top-[50%] w-[22px] h-[22px] transform rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 transition-transform duration-150 ease-in-out border-2 border-white peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900"
                    style={{left: `${percent}%`, backgroundColor: accentColor, ["--tw-ring-color" as string]: accentColor}}
                />
            </div>
        </div>
    );
};
