import {useRef, useState, type KeyboardEvent, type PointerEvent} from "react";

export interface ComparisonImage {
    src: string;
    /** Describes the image for screen readers. */
    alt: string;
}

export interface HorizontalComparisonProps {
    /** Image shown to the right of the divider. */
    before: ComparisonImage;
    /** Image shown to the left of the divider. */
    after: ComparisonImage;
    /** Divider position from the left, in percent. Pass it with `onChange` to control the divider. */
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

/** Compares two images with a divider you drag left and right. The divider also moves with the arrow keys. */
export const HorizontalComparison = ({
    before,
    after,
    value,
    defaultValue = 50,
    onChange,
    accentColor = "#0FABCA",
    handleLabel = "Comparison divider",
    className = "",
}: HorizontalComparisonProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);
    const sliderPosition = value ?? innerValue;

    const setPosition = (next: number) => {
        const position = clamp(next);
        if (value === undefined) setInnerValue(position);
        onChange?.(position);
    };

    const handleMove = (clientX: number) => {
        const container = containerRef.current;
        if (!isDragging.current || !container) return;
        const rect = container.getBoundingClientRect();
        const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
        setPosition((x / rect.width) * 100);
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
            ArrowLeft: sliderPosition - step,
            ArrowRight: sliderPosition + step,
            Home: 0,
            End: 100,
        };
        if (!(event.key in moves)) return;
        event.preventDefault();
        setPosition(moves[event.key]);
    };

    return (
        <div ref={containerRef} className={`relative w-full aspect-video select-none bg-gray-100 ${className}`}>
            <img src={before.src} alt={before.alt} className="absolute inset-0 w-full h-full object-cover" draggable={false}/>

            <img
                src={after.src}
                alt={after.alt}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
                style={{clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`}}
            />

            <div
                role="slider"
                tabIndex={0}
                aria-label={handleLabel}
                aria-orientation="horizontal"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(sliderPosition)}
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize touch-none outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{left: `${sliderPosition}%`}}
                onPointerDown={startDragging}
                onPointerMove={(event) => handleMove(event.clientX)}
                onPointerUp={stopDragging}
                onPointerCancel={stopDragging}
                onKeyDown={handleKeyDown}
            >
                <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="w-full h-full rounded-full border-[3px] border-white shadow-lg flex items-center justify-center"
                        style={{backgroundColor: accentColor}}
                    >
                        <div className="flex gap-[5px] justify-evenly">
                            <div className="w-0.5 h-4 bg-white"/>
                            <div className="w-0.5 h-4 bg-white"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
