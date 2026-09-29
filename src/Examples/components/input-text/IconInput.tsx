import type {ComponentType, InputHTMLAttributes} from "react";

export interface IconInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    /** Icon shown at the start of the field. */
    icon: ComponentType<{className?: string}>;
    /** Accessible name for the field, read by screen readers since there is no visible label. */
    label: string;
    className?: string;
}

/** A text input with a leading icon that shows what the field is for. */
export const IconInput = ({icon: Icon, label, type = "text", className = "", ...props}: IconInputProps) => (
    <div className={`w-full relative ${className}`}>
        <Icon className="absolute top-3.5 left-3 text-[1.5rem] dark:text-slate-400 text-[#777777]" aria-hidden/>
        <input
            type={type}
            aria-label={label}
            className="peer border-[#e5eaf2] dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] dark:border-slate-600 border rounded-md outline-none pl-10 pr-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
            {...props}
        />
    </div>
);
