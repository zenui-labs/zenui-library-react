import type {InputHTMLAttributes} from "react";

export interface UrlInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    /** Accessible name for the field, read by screen readers since there is no visible label. */
    label: string;
    /** Fixed text shown in front of the field. */
    prefix?: string;
    className?: string;
}

/** An input for a website address with a fixed prefix in front of the field. */
export const UrlInput = ({label, prefix = "https://", type = "text", placeholder = "Website URL", className = "", ...props}: UrlInputProps) => (
    <div className={`w-full relative ${className}`}>
        <input
            type={type}
            inputMode="url"
            aria-label={label}
            placeholder={placeholder}
            className="border dark:border-slate-600 dark:text-[#abc2d3] dark:placeholder:text-slate-500 bg-transparent border-[#e5eaf2] py-3 pr-4 pl-[90px] outline-none w-full rounded-md"
            {...props}
        />
        <span className="bg-gray-300 dark:bg-slate-900 dark:border dark:border-slate-600 dark:text-slate-400 text-gray-500 text-[1rem] absolute top-0 left-0 h-full px-3 flex items-center justify-center rounded-l-md">
            {prefix}
        </span>
    </div>
);
