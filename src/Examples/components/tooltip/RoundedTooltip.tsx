import {useId, type ReactNode} from "react";

export interface RoundedTooltipProps {
    /** Text on the button that shows the tooltip. */
    label: ReactNode;
    /** Text inside the tooltip. */
    content: ReactNode;
    onClick?: () => void;
    className?: string;
}

/** A button with a rounded tooltip below it that fades in on hover or keyboard focus. */
export const RoundedTooltip = ({label, content, onClick, className = ""}: RoundedTooltipProps) => {
    const tooltipId = useId();

    return (
        <div className={`relative group ${className}`}>
            {/* button */}
            <button
                type="button"
                onClick={onClick}
                aria-describedby={tooltipId}
                className="px-3 py-2 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-800 rounded text-gray-800"
            >
                {label}
            </button>

            {/* tooltip */}
            <div
                id={tooltipId}
                role="tooltip"
                className="absolute bottom-[-90%] right-[6%] w-max pointer-events-none opacity-0 invisible group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 transition-all duration-300"
            >
                <span className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2">
                    {content}
                </span>
            </div>
        </div>
    );
};
