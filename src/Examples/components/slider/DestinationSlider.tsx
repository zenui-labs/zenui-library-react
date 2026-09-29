"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectCube, Navigation, Pagination} from "swiper/modules";
import {AiFillCalendar} from "react-icons/ai";
import {BiMapPin} from "react-icons/bi";
import {FaExternalLinkAlt} from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

export interface Destination {
    id: string | number;
    name: string;
    description: string;
    /** Background image URL. */
    image: string;
    /** Price as it should read, for example "$1,299". */
    price: string;
    /** Trip length as it should read, for example "7 days". */
    duration: string;
    /** Rating from 0 to 5. */
    rating: number;
    highlights: string[];
}

export interface DestinationCardProps {
    destination: Destination;
    /** How many highlights to show before collapsing the rest into a "+N more" chip. */
    maxHighlights?: number;
    priceLabel?: string;
    bookLabel?: string;
    learnMoreLabel?: string;
    onBook?: (destination: Destination) => void;
    onLearnMore?: (destination: Destination) => void;
}

/** One full-bleed destination card with a rating, price, highlights and two actions. */
export const DestinationCard = ({
    destination,
    maxHighlights = 3,
    priceLabel = "Starting from",
    bookLabel = "Book now",
    learnMoreLabel = "Learn more",
    onBook,
    onLearnMore,
}: DestinationCardProps) => {
    const hiddenHighlights = destination.highlights.length - maxHighlights;

    return (
        <div className="relative w-full h-96 sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <img src={destination.image} alt={destination.name} className="w-full h-full object-cover"/>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex" aria-hidden>
                        {Array.from({length: 5}, (_, index) => (
                            <span
                                key={index}
                                className={`text-lg ${index < Math.floor(destination.rating) ? "text-yellow-400" : "text-gray-400"}`}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <span className="sr-only">Rated {destination.rating} out of 5</span>
                    <span className="text-sm" aria-hidden>
                        ({destination.rating})
                    </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{destination.name}</h2>

                <p className="text-white/90 mb-4 text-sm sm:text-base">{destination.description}</p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <div className="flex items-center gap-1 text-sm">
                            <AiFillCalendar size={16} aria-hidden/>
                            <span>{destination.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            <BiMapPin size={16} aria-hidden/>
                            <span>{priceLabel}</span>
                        </div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold">{destination.price}</div>
                </div>

                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {destination.highlights.slice(0, maxHighlights).map((highlight) => (
                            <span
                                key={highlight}
                                className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium"
                            >
                                {highlight}
                            </span>
                        ))}
                        {hiddenHighlights > 0 && (
                            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                                +{hiddenHighlights} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => onBook?.(destination)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                    >
                        {bookLabel}
                    </button>
                    <button
                        type="button"
                        onClick={() => onLearnMore?.(destination)}
                        className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                        <FaExternalLinkAlt size={16} aria-hidden/>
                        {learnMoreLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export interface DestinationSliderProps extends Omit<DestinationCardProps, "destination"> {
    destinations: Destination[];
    /** Milliseconds each slide stays before the next one turns in. */
    autoplayDelay?: number;
    className?: string;
}

/** A Swiper slider that turns between destination cards with a cube effect, autoplay, arrows and dots. */
export const DestinationSlider = ({destinations, autoplayDelay = 4000, className = "", ...cardProps}: DestinationSliderProps) => (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
        <Swiper
            modules={[Navigation, Pagination, EffectCube, Autoplay]}
            effect="cube"
            grabCursor
            cubeEffect={{
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94,
            }}
            navigation
            pagination={{clickable: true}}
            autoplay={{delay: autoplayDelay, disableOnInteraction: false}}
            className="cube-slider w-full max-w-md sm:max-w-lg mx-auto"
        >
            {destinations.map((destination) => (
                <SwiperSlide key={destination.id}>
                    <DestinationCard destination={destination} {...cardProps}/>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
);
