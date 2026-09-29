import {useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode} from "react";

export interface ResizableLayoutProps {
    /** Content of the left panel, the one that changes width. */
    left: ReactNode;
    /** Content of the right panel, which fills the remaining space. */
    right: ReactNode;
    /** Width of the left panel in pixels. Pass it with `onWidthChange` to control the layout. */
    width?: number;
    defaultWidth?: number;
    onWidthChange?: (width: number) => void;
    minWidth?: number;
    maxWidth?: number;
    /** Pixels the divider moves per arrow key press. Hold Shift for five times this. */
    keyboardStep?: number;
    /** Accessible name of the divider. */
    handleLabel?: string;
    className?: string;
}

/** A two panel layout with a divider you drag, or move with the arrow keys, to resize the left panel. */
export const ResizableLayout = ({
    left,
    right,
    width,
    defaultWidth = 100,
    onWidthChange,
    minWidth = 100,
    maxWidth = 600,
    keyboardStep = 10,
    handleLabel = "Resize panels",
    className = "",
}: ResizableLayoutProps) => {
    const [innerWidth, setInnerWidth] = useState(defaultWidth);
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftWidth = width ?? innerWidth;

    const setWidth = (next: number) => {
        const containerWidth = containerRef.current?.getBoundingClientRect().width ?? maxWidth;
        const clamped = Math.round(Math.min(Math.max(next, minWidth), maxWidth, containerWidth));
        if (width === undefined) setInnerWidth(clamped);
        onWidthChange?.(clamped);
    };

    const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
        setDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!dragging || !container) return;
        setWidth(event.clientX - container.getBoundingClientRect().left);
    };

    const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
        setDragging(false);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? keyboardStep * 5 : keyboardStep;
        const moves: Record<string, number> = {
            ArrowLeft: leftWidth - step,
            ArrowRight: leftWidth + step,
            Home: minWidth,
            End: maxWidth,
        };
        if (!(event.key in moves)) return;
        event.preventDefault();
        setWidth(moves[event.key]);
    };

    return (
        <div ref={containerRef} className={`flex w-full h-[500px] text-gray-800 ${className}`}>
            <div
                style={{width: `${leftWidth}px`}}
                // The transition smooths keyboard steps and is turned off while dragging so the panel follows the pointer.
                className={`shrink-0 bg-gray-300 ${dragging ? "" : "transition-all duration-500 motion-reduce:transition-none"}`}
            >
                {left}
            </div>

            <div
                role="separator"
                tabIndex={0}
                aria-label={handleLabel}
                aria-orientation="vertical"
                aria-valuemin={minWidth}
                aria-valuemax={maxWidth}
                aria-valuenow={leftWidth}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={handleKeyDown}
                className="w-2 shrink-0 bg-gray-500 cursor-col-resize touch-none outline-none focus-visible:bg-gray-700"
            />

            <div className="flex-1 min-w-0 bg-gray-100">{right}</div>
        </div>
    );
};
