import {useId, type ReactNode} from "react";

export type ArrowAlign = "left" | "center" | "right";

export interface ArrowTooltipProps {
    /** Text on the button that shows the tooltip. */
    label: ReactNode;
    /** Text inside the tooltip. */
    content: ReactNode;
    /** Where the arrow sits along the top edge of the tooltip. The tooltip lines up with the button on that side. */
    arrow?: ArrowAlign;
    onClick?: () => void;
    className?: string;
}

// Position of the tooltip under the button and of the arrow on top of the tooltip.
const alignClasses: Record<ArrowAlign, string> = {
    left: "left-0 before:left-[1%] before:rotate-[40deg] before:rounded-b-3xl",
    center: "left-1/2 -translate-x-1/2 before:left-1/3 before:rotate-[45deg] before:rounded-b-3xl",
    right: "right-[6%] before:right-[1%] before:rotate-[45deg] before:rounded-r-3xl",
};

/** A button with a tooltip below it whose arrow points up at the button. Shows on hover or keyboard focus. */
export const ArrowTooltip = ({label, content, arrow = "center", onClick, className = ""}: ArrowTooltipProps) => {
    const tooltipId = useId();

    return (
        <div className={`relative group ${className}`}>
            <button
                type="button"
                onClick={onClick}
                aria-describedby={tooltipId}
                className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800"
            >
                {label}
            </button>

            <div
                id={tooltipId}
                role="tooltip"
                className={`absolute bottom-[-100%] w-max pointer-events-none opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] group-focus-within:visible group-focus-within:opacity-100 group-focus-within:scale-[1] scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] dark:before:bg-slate-800 before:z-[-1] before:absolute before:top-[-35%] ${alignClasses[arrow]}`}
            >
                <span className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2">
                    {content}
                </span>
            </div>
        </div>
    );
};
