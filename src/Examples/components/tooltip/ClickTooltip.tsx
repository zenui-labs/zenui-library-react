import {useEffect, useId, useRef, useState, type ReactNode} from "react";

export type ClickTooltipSide = "top" | "right" | "bottom" | "left";

export interface ClickTooltipProps {
    /** Text on the button that opens the tooltip. */
    label: ReactNode;
    /** Text inside the tooltip. */
    content: ReactNode;
    /** Side of the button the tooltip appears on. */
    side?: ClickTooltipSide;
    /** Controlled open state. Leave it out to let the component manage it. */
    open?: boolean;
    /** Initial open state when uncontrolled. */
    defaultOpen?: boolean;
    /** Called with the next open state on a click, a click outside or Escape. */
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

// Placement, the offset it slides in from, and where the arrow sits for each side.
const sideClasses: Record<ClickTooltipSide, {tooltip: string; shown: string; hidden: string; arrow: string}> = {
    left: {
        tooltip: "top-[50%] translate-y-[-50%] right-full mr-3 w-max",
        shown: "translate-x-0",
        hidden: "translate-x-[20px]",
        arrow: "top-[50%] translate-y-[-50%] right-[-3%]",
    },
    top: {
        tooltip: "bottom-full mb-3.5 left-[50%] translate-x-[-50%] w-max",
        shown: "translate-y-0",
        hidden: "translate-y-[20px]",
        arrow: "left-[50%] translate-x-[-50%] bottom-[-10%]",
    },
    bottom: {
        tooltip: "top-full mt-3.5 left-[50%] translate-x-[-50%] w-max",
        shown: "translate-y-0",
        hidden: "translate-y-[-20px]",
        arrow: "left-[50%] translate-x-[-50%] top-[-13%]",
    },
    right: {
        tooltip: "top-[50%] translate-y-[-50%] left-full ml-3 w-max",
        shown: "translate-x-0",
        hidden: "translate-x-[-20px]",
        arrow: "top-[50%] translate-y-[-50%] left-[-3%]",
    },
};

/** A button that toggles a tooltip on click. A click outside or Escape closes it. */
export const ClickTooltip = ({
    label,
    content,
    side = "top",
    open,
    defaultOpen = false,
    onOpenChange,
    className = "",
}: ClickTooltipProps) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = open ?? internalOpen;
    const rootRef = useRef<HTMLDivElement>(null);
    const tooltipId = useId();
    const classes = sideClasses[side];

    // Kept in a ref so the document listener below always calls the latest callback.
    const setOpenRef = useRef<(next: boolean) => void>(() => undefined);
    setOpenRef.current = (next: boolean) => {
        if (open === undefined) setInternalOpen(next);
        onOpenChange?.(next);
    };

    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setOpenRef.current(false);
        };
        const handleKeyDown = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setOpenRef.current(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <button
                type="button"
                onClick={() => setOpenRef.current(!isOpen)}
                aria-expanded={isOpen}
                aria-describedby={isOpen ? tooltipId : undefined}
                className="py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800"
            >
                {label}
            </button>

            {/* tooltip */}
            <p
                id={tooltipId}
                role="tooltip"
                className={`${
                    isOpen ? `opacity-100 z-[100] ${classes.shown}` : `opacity-0 z-[-1] pointer-events-none ${classes.hidden}`
                } absolute transform ${classes.tooltip} py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
            >
                {content}
                {/* arrow */}
                <span className={`w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute transform ${classes.arrow}`}/>
            </p>
        </div>
    );
};
