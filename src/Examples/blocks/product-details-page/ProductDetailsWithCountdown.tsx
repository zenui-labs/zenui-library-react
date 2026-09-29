import {useEffect, useState} from "react";
import {FaStar} from "react-icons/fa6";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

export interface CountdownProductColor {
    name: string;
    /** Tailwind background class for the swatch, for example "bg-[#D2C4B5]". */
    className: string;
}

export interface CountdownUnitLabels {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
}

export interface CountdownProductSelection {
    color: string;
    quantity: number;
}

export interface ProductDetailsWithCountdownProps {
    name: string;
    description: string;
    /** Current price, already formatted, for example "$199.00". */
    price: string;
    /** Original price shown struck through. */
    compareAtPrice?: string;
    images: string[];
    colors: CountdownProductColor[];
    /** Average rating from 0 to 5. */
    rating: number;
    reviewCount: number;
    /** When the sale ends. Accepts a Date, a timestamp or an ISO date string. */
    expiresAt: Date | number | string;
    /** Size or dimensions text shown under the countdown. */
    measurements?: string;
    /** Dark tag over the image, for example "NEW". */
    badge?: string;
    /** Green tag under the badge, for example "-50%". */
    discountLabel?: string;

    color?: string;
    defaultColor?: string;
    onColorChange?: (color: string) => void;
    quantity?: number;
    defaultQuantity?: number;
    onQuantityChange?: (quantity: number) => void;
    wishlisted?: boolean;
    defaultWishlisted?: boolean;
    onWishlistChange?: (wishlisted: boolean) => void;
    onAddToCart?: (selection: CountdownProductSelection) => void;

    reviewsLabel?: string;
    expiresLabel?: string;
    unitLabels?: CountdownUnitLabels;
    measurementsLabel?: string;
    colorLabel?: string;
    wishlistLabel?: string;
    addToCartLabel?: string;
    className?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const ZERO: TimeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};

const getTimeLeft = (target: number): TimeLeft => {
    const difference = target - Date.now();
    if (difference <= 0) return ZERO;
    return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
    };
};

// Ticks once a second until the target passes, then stops the timer.
const useCountdown = (expiresAt: Date | number | string) => {
    const target = new Date(expiresAt).getTime();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));

    useEffect(() => {
        const tick = () => {
            const next = getTimeLeft(target);
            setTimeLeft(next);
            return next !== ZERO;
        };
        if (!tick()) return;
        const timer = window.setInterval(() => {
            if (!tick()) window.clearInterval(timer);
        }, 1000);
        return () => window.clearInterval(timer);
    }, [target]);

    return timeLeft;
};

// Uses the parent's value when one is passed, and internal state otherwise.
const useControllable = <T, >(value: T | undefined, defaultValue: T, onChange?: (next: T) => void) => {
    const [inner, setInner] = useState<T>(defaultValue);
    const controlled = value !== undefined;
    const set = (next: T) => {
        if (!controlled) setInner(next);
        onChange?.(next);
    };
    return [controlled ? value : inner, set] as const;
};

const formatNumber = (number: number) => number.toString().padStart(2, "0");

const defaultUnitLabels: CountdownUnitLabels = {days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds"};

/** A product page with an image carousel, sale tags, a countdown to the end of the offer, a quantity stepper and a wishlist button. */
export const ProductDetailsWithCountdown = ({
    name,
    description,
    price,
    compareAtPrice,
    images,
    colors,
    rating,
    reviewCount,
    expiresAt,
    measurements,
    badge,
    discountLabel,
    color,
    defaultColor,
    onColorChange,
    quantity,
    defaultQuantity = 1,
    onQuantityChange,
    wishlisted,
    defaultWishlisted = false,
    onWishlistChange,
    onAddToCart,
    reviewsLabel = "Reviews",
    expiresLabel = "Offer expires in:",
    unitLabels = defaultUnitLabels,
    measurementsLabel = "Measurements",
    colorLabel = "Choose color",
    wishlistLabel = "Wishlist",
    addToCartLabel = "Add to cart",
    className = "",
}: ProductDetailsWithCountdownProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedColor, setSelectedColor] = useControllable(color, defaultColor ?? colors[0]?.name ?? "", onColorChange);
    const [count, setCount] = useControllable(quantity, defaultQuantity, onQuantityChange);
    const [isFavorite, setIsFavorite] = useControllable(wishlisted, defaultWishlisted, onWishlistChange);
    const timeLeft = useCountdown(expiresAt);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const previousImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

    const filledStars = Math.round(Math.min(5, Math.max(0, rating)));
    const units: {key: keyof TimeLeft; label: string}[] = [
        {key: "days", label: unitLabels.days},
        {key: "hours", label: unitLabels.hours},
        {key: "minutes", label: unitLabels.minutes},
        {key: "seconds", label: unitLabels.seconds},
    ];

    return (
        <div className={`mx-auto md:px-8 md:py-12 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Left side, image gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square">
                        {/* Badge and discount tags */}
                        {(badge || discountLabel) && (
                            <div className="absolute top-4 left-4 z-10 space-y-2">
                                {badge && <span className="inline-block px-2 py-1 text-xs font-semibold bg-black text-white">{badge}</span>}
                                {discountLabel && (
                                    <div className="inline-block px-2 py-1 text-xs font-semibold bg-emerald-500 text-white">{discountLabel}</div>
                                )}
                            </div>
                        )}

                        {/* Main image with navigation arrows */}
                        <div className="relative h-full">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${name}, image ${currentImageIndex + 1} of ${images.length}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={previousImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white text-gray-900 shadow-lg hover:bg-[#0FABCA] hover:text-white"
                                aria-label="Previous image"
                            >
                                <BiChevronLeft className="w-6 h-6" aria-hidden/>
                            </button>
                            <button
                                type="button"
                                onClick={nextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white text-gray-900 shadow-lg hover:bg-[#0FABCA] hover:text-white"
                                aria-label="Next image"
                            >
                                <BiChevronRight className="w-6 h-6" aria-hidden/>
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail images */}
                    <div className="flex gap-4 justify-between">
                        {images.map((image, index) => (
                            <button
                                key={`${image}-${index}`}
                                type="button"
                                onClick={() => setCurrentImageIndex(index)}
                                aria-label={`Show image ${index + 1}`}
                                aria-pressed={currentImageIndex === index}
                                className={`relative transition-all duration-300 w-[8rem] aspect-square ${
                                    currentImageIndex === index ? "ring-2 ring-[#0FABCA]" : "hover:ring-2 hover:ring-[#0FABCA]"
                                }`}
                            >
                                <img src={image} alt="" className="w-full h-full object-cover"/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right side, product details */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {Array.from({length: 5}, (_, i) => (
                                <FaStar
                                    key={i}
                                    aria-hidden
                                    className={`w-4 h-4 ${i < filledStars ? "dark:fill-slate-400 fill-black" : "dark:fill-slate-700 fill-gray-300"}`}
                                />
                            ))}
                            <span className="sr-only">Rated {rating} out of 5</span>
                        </div>
                        <span className="text-sm dark:text-slate-400 text-gray-600">{reviewCount} {reviewsLabel}</span>
                    </div>

                    <h1 className="text-[1.6rem] md:text-[1.9rem] dark:text-[#abc2d3] text-gray-800 font-semibold">{name}</h1>

                    <p className="text-gray-600 dark:text-slate-400 text-[0.9rem]">{description}</p>

                    <div className="flex items-center gap-3">
                        <span className="text-[1.5rem] dark:text-[#abc2d3] text-gray-800 font-medium">{price}</span>
                        {compareAtPrice && <span className="text-lg dark:text-slate-400 text-gray-500 line-through">{compareAtPrice}</span>}
                    </div>

                    <div className="pb-2">
                        <p className="font-medium text-[0.9rem] dark:text-[#abc2d3] text-gray-600">{expiresLabel}</p>
                        <div className="flex items-center gap-[10px] mt-2" role="timer">
                            {units.map((unit) => (
                                <div key={unit.key} className="flex items-center justify-center dark:text-[#abc2d3] flex-col gap-[0.2rem]">
                                    <span className="py-2 px-3 dark:bg-slate-900 bg-gray-100 text-[1.9rem] font-semibold">
                                        {formatNumber(timeLeft[unit.key])}
                                    </span>
                                    <span className="text-[0.7rem]">{unit.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {measurements && (
                        <div className="space-y-2 border-t dark:border-slate-700 border-t-gray-200 pt-4">
                            <p className="font-medium dark:text-[#abc2d3] text-[0.9rem] text-gray-600">{measurementsLabel}</p>
                            <p className="text-gray-800 dark:text-slate-400">{measurements}</p>
                        </div>
                    )}

                    <div className="space-y-2 pt-2" role="group" aria-label={colorLabel}>
                        <p className="font-medium text-gray-600 dark:text-[#abc2d3] text-[0.9rem]">{colorLabel}</p>
                        <p className="font-semibold pb-1 dark:text-slate-400 text-gray-800 text-[0.9rem] capitalize">{selectedColor}</p>
                        <div className="flex gap-2">
                            {colors.map((option) => (
                                <button
                                    key={option.name}
                                    type="button"
                                    onClick={() => setSelectedColor(option.name)}
                                    aria-label={option.name}
                                    aria-pressed={selectedColor === option.name}
                                    className={`w-8 h-8 rounded-full ${option.className} ${
                                        selectedColor === option.name ? "ring-2 dark:ring-offset-slate-800 ring-offset-2 ring-[#0FABCA]" : ""
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 items-center pt-6">
                        <div className="flex items-center dark:bg-slate-900 bg-gray-100 rounded-md">
                            <button
                                type="button"
                                onClick={() => setCount(Math.max(1, count - 1))}
                                aria-label="Decrease quantity"
                                className="px-4 py-[0.560rem] dark:hover:bg-slate-800 dark:text-[#abc2d3] text-[1.3rem] font-[300] hover:bg-gray-100 rounded-l-md"
                            >
                                −
                            </button>
                            <input
                                type="number"
                                min={1}
                                value={count}
                                aria-label="Quantity"
                                onChange={(e) => setCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                className="w-10 font-medium outline-none dark:text-[#abc2d3] text-[0.9rem] bg-transparent text-center"
                            />
                            <button
                                type="button"
                                onClick={() => setCount(count + 1)}
                                aria-label="Increase quantity"
                                className="px-4 py-[0.560rem] dark:text-[#abc2d3] dark:hover:bg-slate-800 text-[1.3rem] font-[300] hover:bg-gray-100 rounded-r-md"
                            >
                                +
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsFavorite(!isFavorite)}
                            aria-pressed={isFavorite}
                            className="py-3 border border-gray-200 rounded-md dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 flex items-center justify-center gap-[10px] grow hover:bg-gray-50"
                        >
                            {isFavorite ? (
                                <FaHeart className="w-5 h-5 text-red-500" aria-hidden/>
                            ) : (
                                <FaRegHeart className="w-5 h-5 dark:text-[#abc2d3] text-gray-800" aria-hidden/>
                            )}
                            {wishlistLabel}
                        </button>
                    </div>

                    <button
                        type="button"
                        onClick={() => onAddToCart?.({color: selectedColor, quantity: count})}
                        className="w-full px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90"
                    >
                        {addToCartLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
