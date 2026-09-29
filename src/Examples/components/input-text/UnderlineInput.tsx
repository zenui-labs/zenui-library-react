import type {InputHTMLAttributes} from "react";

export interface UnderlineInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    /** Accessible name for the field, read by screen readers since there is no visible label. */
    label: string;
    className?: string;
}

/** A text input with only a bottom border, for a lighter form style. */
export const UnderlineInput = ({label, type = "text", className = "", ...props}: UnderlineInputProps) => (
    <input
        type={type}
        aria-label={label}
        className={`border-[#e5eaf2] dark:bg-slate-900 dark:text-[#abc2d3] dark:border-slate-600 border-b outline-none px-4 w-full py-3 focus:border-[#3B9DF8] transition-colors duration-300 ${className}`}
        {...props}
    />
);
