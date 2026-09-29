import {useEffect, useState} from "react";

export interface CarouselSlide {
    src: string;
    /** Describes the image for screen readers. */
    alt: string;
}

export interface FadingCarouselProps {
    slides: CarouselSlide[];
    /** Time between slide changes, in milliseconds. */
    interval?: number;
    /** How long the current slide fades out before the next one fades in, in milliseconds. */
    fadeOutDelay?: number;
    /** Length of the opacity transition, in milliseconds. */
    fadeDuration?: number;
    /** Accessible name of the carousel region. */
    label?: string;
    className?: string;
}

/** An image carousel that changes slides on its own and cross fades between them. */
export const FadingCarousel = ({
    slides,
    interval = 5000,
    fadeOutDelay = 1000,
    fadeDuration = 10000,
    label = "Image carousel",
    className = "",
}: FadingCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImage, setShowImage] = useState(true);
    const count = slides.length;

    useEffect(() => {
        if (count < 2) return;
        let swap: number | undefined;
        const timer = window.setInterval(() => {
            setShowImage(false);
            window.clearTimeout(swap);
            swap = window.setTimeout(() => {
                setCurrentIndex((index) => (index + 1) % count);
                setShowImage(true);
            }, fadeOutDelay);
        }, interval);

        return () => {
            window.clearInterval(timer);
            window.clearTimeout(swap);
        };
    }, [count, interval, fadeOutDelay]);

    return (
        <div
            role="region"
            aria-roledescription="carousel"
            aria-label={label}
            className={`relative w-full h-full max-h-full overflow-hidden ${className}`}
        >
            <div className="w-full h-full relative">
                {slides.map((slide, index) => {
                    const active = index === currentIndex % Math.max(count, 1);
                    return (
                        <img
                            key={`${index}-${slide.src}`}
                            src={slide.src}
                            alt={active ? slide.alt : ""}
                            aria-hidden={!active}
                            style={{transitionDuration: `${fadeDuration}ms`}}
                            className={`absolute inset-0 w-full h-full max-h-full rounded-lg object-cover transition-opacity ease-out motion-reduce:transition-none ${
                                active && showImage ? "opacity-100" : "opacity-[0.05]"
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
};
