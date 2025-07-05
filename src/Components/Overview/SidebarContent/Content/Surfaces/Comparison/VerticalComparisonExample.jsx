import {useEffect, useRef, useState} from 'react';

const VerticalComparisonExample = () => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef(null);
    const isDragging = useRef(false);

    // handle mouse move and calculate the comparison
    const handleMove = (clientY) => {
        if (!isDragging.current) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const y = Math.min(Math.max(0, clientY - rect.top), rect.height);
        const position = (y / rect.height) * 100;

        setSliderPosition(position);
    };

    const handleMouseMove = (e) => handleMove(e.clientY);
    const handleTouchMove = (e) => handleMove(e.touches[0].clientY);

    // start dragging
    const startDragging = () => {
        isDragging.current = true;
    };

    // stop the comparison dragging
    const stopDragging = () => {
        isDragging.current = false;
    };

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchmove', handleTouchMove, {passive: true});
        document.addEventListener('touchend', stopDragging);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', stopDragging);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', stopDragging);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full select-none bg-gray-100"
        >
            {/* Before Image */}
            <img
                src="https://i.ibb.co.com/YXzxRBv/before.png"
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* After Image */}
            <img
                src="https://i.ibb.co.com/1ZKL4wK/after.png"
                alt="After"
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${sliderPosition}%, 0 ${sliderPosition}%)`
                }}
            />

            {/* SwiperSlider Handle */}
            <div
                className="absolute left-0 right-0 h-0.5 bg-white cursor-ns-resize"
                style={{top: `${sliderPosition}%`}}
                onMouseDown={startDragging}
                onTouchStart={startDragging}
            >
                <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
                    <div
                        className="w-full h-full rounded-full bg-[#0FABCA] border-[3px] border-white shadow-lg flex items-center justify-center">
                        <div className="flex gap-[5px] justify-evenly rotate-90">
                            <div className="w-0.5 h-4 bg-white"></div>
                            <div className="w-0.5 h-4 bg-white"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerticalComparisonExample;