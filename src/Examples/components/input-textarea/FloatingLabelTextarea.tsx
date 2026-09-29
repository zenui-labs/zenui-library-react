import {useState, type ChangeEvent, type TextareaHTMLAttributes} from "react";

export interface FloatingLabelTextareaProps
    extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className" | "value" | "defaultValue" | "onChange"> {
    /** Text shown inside the field that moves above it on focus or once there is a value. */
    label: string;
    /** Value for a controlled textarea. */
    value?: string;
    /** Starting value for an uncontrolled textarea. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Background behind the floating label. Match it to the surface the textarea sits on. */
    labelBackgroundClassName?: string;
    className?: string;
}

/** A textarea with a label that floats above the field when it gets focus or has a value. */
export const FloatingLabelTextarea = ({
    label,
    value,
    defaultValue = "",
    onChange,
    labelBackgroundClassName = "bg-white dark:bg-[#020617]",
    className = "",
    ...props
}: FloatingLabelTextareaProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const current = value ?? internalValue;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInternalValue(event.target.value);
        onChange?.(event.target.value);
    };

    return (
        <label className={`relative block w-full ${className}`}>
            <textarea
                value={current}
                onChange={handleChange}
                className="peer dark:border-slate-700 dark:bg-transparent border-[#e5eaf2] border rounded-md outline-none px-4 min-h-[200px] py-3 dark:text-slate-400 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                {...props}
            />
            <span
                className={`${current ? "-top-3 left-2 scale-[0.9] px-[4px]" : "left-5 top-3.5"} ${labelBackgroundClassName} pointer-events-none absolute dark:text-slate-500 peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300`}
            >
                {label}
            </span>
        </label>
    );
};
