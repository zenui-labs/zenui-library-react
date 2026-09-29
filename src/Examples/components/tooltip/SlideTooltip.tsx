import {useId, type ReactNode} from "react";

export type TooltipSide = "top" | "right" | "bottom" | "left";

export interface SlideTooltipProps {
    /** Text on the button that shows the tooltip. */
    label: ReactNode;
    /** Text inside the tooltip. */
    content: ReactNode;
    /** Side of the button the tooltip appears on. It slides in from further out on that side. */
    side?: TooltipSide;
    onClick?: () => void;
    className?: string;
}

// Each side places the tooltip next to the button and starts it 20px further out, so it slides toward the button.
const sideClasses: Record<TooltipSide, string> = {
    left: "right-full mr-2 top-1/2 -translate-y-1/2 translate-x-[-20px] group-hover:translate-x-0 group-focus-within:translate-x-0",
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2 translate-y-[-20px] group-hover:translate-y-0 group-focus-within:translate-y-0",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2 translate-y-[20px] group-hover:translate-y-0 group-focus-within:translate-y-0",
    right: "left-full ml-2 top-1/2 -translate-y-1/2 translate-x-[20px] group-hover:translate-x-0 group-focus-within:translate-x-0",
};

/** A button with a tooltip that slides in from the chosen side on hover or keyboard focus. */
export const SlideTooltip = ({label, content, side = "top", onClick, className = ""}: SlideTooltipProps) => {
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
                className={`absolute pointer-events-none opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-[1000] group-focus-within:opacity-100 group-focus-within:z-[1000] transition-all duration-500 ${sideClasses[side]}`}
            >
                <p className="text-[0.9rem] w-max bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2">
                    {content}
                </p>
            </div>
        </div>
    );
};
