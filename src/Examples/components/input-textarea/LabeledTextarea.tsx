import {useId, type ReactNode, type TextareaHTMLAttributes} from "react";

export interface LabeledTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
    /** Visible label above the field. */
    label: ReactNode;
    /** Shows a red asterisk after the label and marks the textarea as required. */
    required?: boolean;
    className?: string;
}

/** A textarea with a visible label and an optional required marker. */
export const LabeledTextarea = ({label, required = false, id, className = "", ...props}: LabeledTextareaProps) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={textareaId} className="font-[400] dark:text-[#abc2d3] text-[15px] text-[#424242]">
                {label}
                {required && (
                    <>
                        {" "}
                        <span className="text-red-500" aria-hidden>*</span>
                    </>
                )}
            </label>
            <textarea
                id={textareaId}
                required={required}
                className="border-[#e5eaf2] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
                {...props}
            />
        </div>
    );
};
