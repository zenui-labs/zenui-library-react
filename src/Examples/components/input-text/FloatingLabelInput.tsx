import {useState, type ChangeEvent, type InputHTMLAttributes} from "react";

export interface FloatingLabelInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "defaultValue" | "onChange"> {
    /** Text shown inside the field that moves above it on focus or once there is a value. */
    label: string;
    /** Value for a controlled input. */
    value?: string;
    /** Starting value for an uncontrolled input. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Background behind the floating label. Match it to the surface the input sits on. */
    labelBackgroundClassName?: string;
    className?: string;
}

/** A text input with a label that floats above the field when it gets focus or has a value. */
export const FloatingLabelInput = ({
    label,
    value,
    defaultValue = "",
    onChange,
    labelBackgroundClassName = "bg-white dark:bg-[#020617]",
    type = "text",
    className = "",
    ...props
}: FloatingLabelInputProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const current = value ?? internalValue;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
        onChange?.(event.target.value);
    };

    return (
        <label className={`relative block w-full ${className}`}>
            <input
                type={type}
                value={current}
                onChange={handleChange}
                className="peer border-[#e5eaf2] dark:border-slate-600 bg-transparent border rounded-md outline-none px-4 py-3 w-full dark:text-[#d2e5f5] focus:border-[#3B9DF8] transition-colors duration-300"
                {...props}
            />
            <span
                className={`${current ? "-top-3 left-2 scale-[0.9] px-[4px]" : "left-5 top-3"} ${labelBackgroundClassName} pointer-events-none absolute peer-focus:-top-3 dark:text-slate-500 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300`}
            >
                {label}
            </span>
        </label>
    );
};
