import {useState, type ChangeEvent, type FocusEvent, type InputHTMLAttributes} from "react";
import {FiMinus, FiPlus} from "react-icons/fi";

export interface RoundedNumberInputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "type" | "className" | "value" | "defaultValue" | "onChange" | "min" | "max" | "step"
    > {
    /** Controlled value. Leave it out to let the input manage its own state. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    min?: number;
    max?: number;
    /** Amount added or removed by the buttons. */
    step?: number;
    /** Accessible name of the field. */
    label?: string;
    decrementLabel?: string;
    incrementLabel?: string;
    className?: string;
}

const clamp = (value: number, min?: number, max?: number) =>
    Math.min(max ?? Infinity, Math.max(min ?? -Infinity, value));

/** A number field with round minus and plus buttons inside its border. */
export const RoundedNumberInput = ({
    value,
    defaultValue = 0,
    onChange,
    min,
    max,
    step = 1,
    label = "Quantity",
    decrementLabel = "Decrease",
    incrementLabel = "Increase",
    className = "",
    onBlur,
    ...props
}: RoundedNumberInputProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    // Holds the raw text while the user types, so the field can be cleared and retyped.
    const [draft, setDraft] = useState<string | null>(null);
    const current = value ?? internalValue;

    const commit = (next: number) => {
        const clamped = clamp(next, min, max);
        if (value === undefined) setInternalValue(clamped);
        onChange?.(clamped);
    };

    const stepBy = (amount: number) => {
        setDraft(null);
        commit(current + amount);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const raw = event.target.value;
        setDraft(raw);
        if (raw !== "" && !Number.isNaN(Number(raw))) commit(Number(raw));
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setDraft(null);
        onBlur?.(event);
    };

    return (
        <div className={`flex px-2 py-0.5 items-center dark:border-slate-700 mx-auto border border-gray-200 rounded-md ${className}`}>
            <button
                type="button"
                aria-label={decrementLabel}
                disabled={min !== undefined && current <= min}
                className="bg-gray-100 dark:bg-slate-800 dark:text-[#abc2d3] p-[10px] rounded-full text-gray-700 text-[1.1rem] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => stepBy(-step)}
            >
                <FiMinus aria-hidden/>
            </button>
            <input
                {...props}
                type="number"
                aria-label={label}
                min={min}
                max={max}
                step={step}
                value={draft ?? String(current)}
                className="w-[70px] py-2.5 outline-none dark:bg-transparent dark:text-[#abc2d3] focus:ring-0 border-none text-center text-[1.1rem]"
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <button
                type="button"
                aria-label={incrementLabel}
                disabled={max !== undefined && current >= max}
                className="bg-gray-100 p-[10px] dark:bg-slate-800 dark:text-[#abc2d3] rounded-full text-gray-700 text-[1.1rem] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => stepBy(step)}
            >
                <FiPlus aria-hidden/>
            </button>
        </div>
    );
};
