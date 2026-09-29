import {useEffect, useRef, useState} from "react";

const ComparisonCard = () => {
    const [sliderPosition, setSliderPosition] = useState(80);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    const handleMove = (clientX) => {
        if (!isDragging.current) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const x = Math.min(Math.max(0, clientX - rect.left), rect.width);
        const position = (x / rect.width) * 100;

        setSliderPosition(position);
    };

    const handleMouseMove = (e) => handleMove(e.clientX);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

    const startDragging = () => {
        isDragging.current = true;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", stopDragging);
        document.addEventListener("touchmove", handleTouchMove, {passive: true});
        document.addEventListener("touchend", stopDragging);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", stopDragging);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", stopDragging);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-video select-none overflow-hidden bg-raised"
        >
            {/* Before Image */}
            <img
                src="/lightcontainer.svg"
                alt="Components in light mode"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* After Image */}
            <img
                src="/darkcontainer.svg"
                alt="The same components in dark mode"
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`
                }}
            />

            {/* SwiperSlider Handle */}
            <div
                className="absolute top-0 bottom-0 w-8 -translate-x-1/2 cursor-ew-resize before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-white/90"
                style={{left: `${sliderPosition}%`}}
                onMouseDown={startDragging}
                onTouchStart={startDragging}
            >
                <div className="absolute top-1/2 left-1/2 w-9 h-9 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="w-full h-full rounded-full border border-black/10 bg-white shadow-lg flex items-center justify-center">
                        <div className="flex gap-[5px] justify-evenly">
                            <div className="w-px h-3.5 bg-gray-400"></div>
                            <div className="w-px h-3.5 bg-gray-400"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComparisonCard;
