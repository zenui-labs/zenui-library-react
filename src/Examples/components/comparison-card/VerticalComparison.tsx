import {useRef, useState, type KeyboardEvent, type PointerEvent} from "react";

export interface ComparisonImage {
    src: string;
    /** Describes the image for screen readers. */
    alt: string;
}

export interface VerticalComparisonProps {
    /** Image shown below the divider. */
    before: ComparisonImage;
    /** Image shown above the divider. */
    after: ComparisonImage;
    /** Divider position from the top, in percent. Pass it with `onChange` to control the divider. */
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Fill color of the round handle. */
    accentColor?: string;
    /** Accessible name of the divider. */
    handleLabel?: string;
    className?: string;
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/** Compares two images with a divider you drag up and down. The divider also moves with the arrow keys. */
export const VerticalComparison = ({
    before,
    after,
    value,
    defaultValue = 50,
    onChange,
    accentColor = "#0FABCA",
    handleLabel = "Comparison divider",
    className = "",
}: VerticalComparisonProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const sliderPosition = value ?? innerValue;

    const setPosition = (next: number) => {
        const position = clamp(next);
        if (value === undefined) setInnerValue(position);
        onChange?.(position);
    };

    const handleMove = (clientY: number) => {
        const container = containerRef.current;
        if (!isDragging.current || !container) return;
        const rect = container.getBoundingClientRect();
        const y = Math.min(Math.max(0, clientY - rect.top), rect.height);
        setPosition((y / rect.height) * 100);
    };

    const startDragging = (event: PointerEvent<HTMLDivElement>) => {
        isDragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
    };

    const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
        isDragging.current = false;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 10 : 2;
        const moves: Record<string, number> = {
            ArrowUp: sliderPosition - step,
            ArrowDown: sliderPosition + step,
            Home: 0,
            End: 100,
        };
        if (!(event.key in moves)) return;
        event.preventDefault();
        setPosition(moves[event.key]);
    };

    return (
        <div ref={containerRef} className={`relative w-full h-full select-none bg-gray-100 ${className}`}>
            <img src={before.src} alt={before.alt} className="absolute inset-0 w-full h-full object-cover" draggable={false}/>

            <img
                src={after.src}
                alt={after.alt}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                style={{clipPath: `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`}}
            />

            <div
                role="slider"
                tabIndex={0}
                aria-label={handleLabel}
                aria-orientation="vertical"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPosition)}
                className="absolute left-0 right-0 h-0.5 bg-white cursor-ns-resize touch-none outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{top: `${sliderPosition}%`}}
                onPointerDown={startDragging}
                onPointerMove={(event) => handleMove(event.clientY)}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onKeyDown={handleKeyDown}
            >
                <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="w-full h-full rounded-full border-[3px] border-white shadow-lg flex items-center justify-center"
                        style={{backgroundColor: accentColor}}
                    >
                        <div className="flex gap-[5px] justify-evenly rotate-90">
                            <div className="w-0.5 h-4 bg-white"/>
                            <div className="w-0.5 h-4 bg-white"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
