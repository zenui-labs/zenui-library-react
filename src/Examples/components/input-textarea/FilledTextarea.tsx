import {useId, type ReactNode, type TextareaHTMLAttributes} from "react";

export interface FilledTextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
    /** Visible label above the field. */
    label: ReactNode;
    className?: string;
}

/** A textarea with a filled gray background that sets it apart from the page. */
export const FilledTextarea = ({label, id, className = "", ...props}: FilledTextareaProps) => {
    const generatedId = useId();
    const textareaId = id ?? generatedId;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={textareaId} className="font-[400] dark:text-[#abc2d3] text-[15px] text-[#424242]">
                {label}
            </label>
            <textarea
                id={textareaId}
                className="border-[#e5eaf2] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border outline-none px-4 w-full mt-1 min-h-[100px] bg-gray-200 rounded-md py-3 focus:border-gray-400 transition-colors duration-300"
                {...props}
            />
        </div>
    );
};
