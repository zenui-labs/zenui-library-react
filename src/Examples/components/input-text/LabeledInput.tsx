import {useId, type InputHTMLAttributes, type ReactNode} from "react";

export interface LabeledInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    /** Visible label above the field. */
    label: ReactNode;
    /** Shows a red asterisk after the label and marks the input as required. */
    required?: boolean;
    className?: string;
}

/** A text input with a visible label and an optional required marker. */
export const LabeledInput = ({
    label,
    required = false,
    id,
    type = "text",
    className = "",
    ...props
}: LabeledInputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={inputId} className="text-[15px] dark:text-slate-300 text-[#424242] font-[400]">
                {label}
                {required && (
                    <>
                        {" "}
                        <span className="text-red-500" aria-hidden>*</span>
                    </>
                )}
            </label>
            <input
                id={inputId}
                type={type}
                required={required}
                className="border-[#e5eaf2] dark:bg-transparent dark:border-slate-600 dark:placeholder:text-slate-600 dark:text-slate-300 border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                {...props}
            />
        </div>
    );
};
