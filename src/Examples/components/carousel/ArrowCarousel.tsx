import {useState} from "react";
import {FiChevronLeft, FiChevronRight} from "react-icons/fi";

export interface CarouselSlide {
    src: string;
    /** Describes the image for screen readers. */
    alt: string;
}

export interface ArrowCarouselProps {
    slides: CarouselSlide[];
    /** Index of the visible slide. Pass it with `onIndexChange` to control the carousel. */
    index?: number;
    defaultIndex?: number;
    onIndexChange?: (index: number) => void;
    /** Accessible name of the carousel region. */
    label?: string;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

const arrowClass =
    "absolute transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 lg:p-1 text-white text-[1.8rem] lg:text-[2.8rem] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-white";

/** An image carousel with previous and next arrows. It wraps around at both ends. */
export const ArrowCarousel = ({
    slides,
    index,
    defaultIndex = 0,
    onIndexChange,
    label = "Image carousel",
    previousLabel = "Previous slide",
    nextLabel = "Next slide",
    className = "",
}: ArrowCarouselProps) => {
    const [innerIndex, setInnerIndex] = useState(defaultIndex);
    const count = slides.length;
    const current = count ? (index ?? innerIndex) % count : 0;

    const goTo = (next: number) => {
        const wrapped = (next + count) % count;
        if (index === undefined) setInnerIndex(wrapped);
        onIndexChange?.(wrapped);
    };

    if (!count) return null;
    const slide = slides[current];

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            className={`relative flex items-center justify-center w-full h-full rounded-lg ${className}`}
        >
            <button type="button" aria-label={previousLabel} onClick={() => goTo(current - 1)} className={`${arrowClass} left-2 lg:left-5`}>
                <FiChevronLeft aria-hidden/>
            </button>
            <img src={slide.src} alt={slide.alt} className="w-full h-full rounded-lg object-cover"/>
            <button type="button" aria-label={nextLabel} onClick={() => goTo(current + 1)} className={`${arrowClass} right-2 lg:right-5`}>
                <FiChevronRight aria-hidden/>
            </button>
        </div>
    );
};
