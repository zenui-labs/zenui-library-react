import {useState} from "react";
import {IoHeart, IoHeartOutline, IoShareSocialOutline, IoStar} from "react-icons/io5";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";

export interface SizedProductColor {
    name: string;
    /** Tailwind background class for the swatch, for example "bg-[#654321]". */
    className: string;
}

export interface SizedProductSelection {
    color: string;
    size: string;
}

export interface ProductDetailsWithSizesProps {
    name: string;
    /** Small line above the name, usually the brand or collection. */
    brand?: string;
    /** Current price, already formatted, for example "£28.00". */
    price: string;
    /** Original price shown struck through. */
    compareAtPrice?: string;
    /** Average rating from 0 to 5. */
    rating?: number;
    soldCount?: number;
    images: string[];
    colors: SizedProductColor[];
    sizes: string[];
    description: string;
    /** Extra text revealed by the "See more..." button. */
    moreDescription?: string;
    /** Link for the "View size chart" button. The button is hidden without it. */
    sizeChartHref?: string;

    color?: string;
    defaultColor?: string;
    onColorChange?: (color: string) => void;
    size?: string;
    defaultSize?: string;
    onSizeChange?: (size: string) => void;
    wishlisted?: boolean;
    defaultWishlisted?: boolean;
    onWishlistChange?: (wishlisted: boolean) => void;
    /** Replaces the default share action, which opens the system share sheet or copies the page link. */
    onShare?: () => void;
    onAddToCart?: (selection: SizedProductSelection) => void;
    onCheckout?: (selection: SizedProductSelection) => void;

    descriptionLabel?: string;
    readMoreLabel?: string;
    colorLabel?: string;
    sizeLabel?: string;
    sizeChartLabel?: string;
    soldLabel?: string;
    addToCartLabel?: string;
    checkoutLabel?: string;
    className?: string;
}

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

// Opens the system share sheet where it exists, and copies the page link everywhere else.
const sharePage = (title: string) => {
    const url = window.location.href;
    if (typeof navigator.share === "function") {
        navigator.share({title, url}).catch(() => undefined);
    } else {
        navigator.clipboard?.writeText(url).catch(() => undefined);
    }
};

const sideButtonClass =
    "bg-gray-100 dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:bg-slate-800 rounded-md w-max text-gray-600 hover:bg-gray-200";

/** A product page with side image controls, color swatches, a size picker and add to cart and checkout buttons. */
export const ProductDetailsWithSizes = ({
    name,
    brand,
    price,
    compareAtPrice,
    rating,
    soldCount,
    images,
    colors,
    sizes,
    description,
    moreDescription,
    sizeChartHref,
    color,
    defaultColor,
    onColorChange,
    size,
    defaultSize,
    onSizeChange,
    wishlisted,
    defaultWishlisted = false,
    onWishlistChange,
    onShare,
    onAddToCart,
    onCheckout,
    descriptionLabel = "Description:",
    readMoreLabel = "See more...",
    colorLabel = "Color:",
    sizeLabel = "Size:",
    sizeChartLabel = "View size chart",
    soldLabel = "sold",
    addToCartLabel = "Add to cart",
    checkoutLabel = "Checkout now",
    className = "",
}: ProductDetailsWithSizesProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [selectedColor, setSelectedColor] = useControllable(color, defaultColor ?? colors[0]?.name ?? "", onColorChange);
    const [selectedSize, setSelectedSize] = useControllable(size, defaultSize ?? sizes[0] ?? "", onSizeChange);
    const [isFavorite, setIsFavorite] = useControllable(wishlisted, defaultWishlisted, onWishlistChange);

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    const selection: SizedProductSelection = {color: selectedColor, size: selectedSize};

    return (
        <div className={`md:p-8 ${className}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {/* Image section */}
                <div className="relative">
                    <div className="flex">
                        <div className="flex items-center justify-center w-[90%] dark:bg-slate-900 bg-gray-100 overflow-hidden rounded-md">
                            <img
                                src={images[currentImageIndex]}
                                alt={`${name}, image ${currentImageIndex + 1} of ${images.length}`}
                                className="w-[300px] h-[400px] object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-between gap-[15px] ml-[20px]">
                            <div className="flex flex-col gap-[10px]">
                                <button
                                    type="button"
                                    onClick={() => (onShare ? onShare() : sharePage(name))}
                                    aria-label="Share"
                                    className={`${sideButtonClass} p-2.5`}
                                >
                                    <IoShareSocialOutline className="w-5 h-5" aria-hidden/>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    aria-label="Add to wishlist"
                                    aria-pressed={isFavorite}
                                    className={`${sideButtonClass} p-2.5`}
                                >
                                    {isFavorite ? <IoHeart className="w-5 h-5 text-red-500" aria-hidden/> : <IoHeartOutline className="w-5 h-5" aria-hidden/>}
                                </button>
                            </div>

                            <div className="flex flex-col gap-[10px]">
                                <button type="button" onClick={prevImage} className={`${sideButtonClass} p-2`} aria-label="Previous image">
                                    <BiChevronLeft className="w-6 h-6" aria-hidden/>
                                </button>
                                <button type="button" onClick={nextImage} className={`${sideButtonClass} p-2`} aria-label="Next image">
                                    <BiChevronRight className="w-6 h-6" aria-hidden/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="scrollbar flex w-full md:w-[87%] gap-2 mt-4 overflow-x-auto">
                        {images.map((image, index) => (
                            <button
                                key={`${image}-${index}`}
                                type="button"
                                onClick={() => setCurrentImageIndex(index)}
                                aria-label={`Show image ${index + 1}`}
                                aria-pressed={currentImageIndex === index}
                                className={`flex-shrink-0 dark:bg-slate-900 bg-gray-100 w-20 transition-all duration-300 h-20 rounded-md mb-1 overflow-hidden border-2 ${
                                    currentImageIndex === index ? "border-[#0FABCA]" : "border-transparent"
                                }`}
                            >
                                <img src={image} alt="" className="w-full h-full object-cover"/>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product details section */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                        <div className="w-full">
                            {brand && <p className="text-gray-400 dark:text-slate-400 text-[0.9rem]">{brand}</p>}
                            <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.8rem] text-gray-800 font-semibold mb-3">{name}</h1>
                            <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-1 md:gap-4 mb-4">
                                <div className="flex items-center">
                                    <span className="text-[1.4rem] font-semibold dark:text-[#abc2d3] text-gray-800">{price}</span>
                                    {compareAtPrice && (
                                        <span className="text-gray-400 dark:text-slate-400 text-[1rem] line-through ml-2">{compareAtPrice}</span>
                                    )}
                                </div>
                                {rating !== undefined && (
                                    <div className="flex items-center gap-1">
                                        <IoStar className="text-yellow-400 text-[1.1rem]" aria-hidden/>
                                        <span className="text-gray-800 dark:text-[#abc2d3] font-semibold">
                                            <span className="sr-only">Rated </span>
                                            {rating}
                                            <span className="sr-only"> out of 5</span>
                                        </span>
                                        {soldCount !== undefined && (
                                            <span className="text-gray-500 dark:text-slate-400">
                                                ({soldCount.toLocaleString("en-US")} {soldLabel})
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 border-t-[2px] dark:border-slate-700 border-gray-200 border-dashed mt-1 pt-6">
                        <h2 className="text-gray-700 dark:text-[#abc2d3] font-semibold mb-2">{descriptionLabel}</h2>
                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">
                            {description}
                            {moreDescription && expanded && <> {moreDescription}</>}
                            {moreDescription && !expanded && (
                                <button
                                    type="button"
                                    onClick={() => setExpanded(true)}
                                    aria-expanded={expanded}
                                    className="text-blue-600 hover:underline ml-1"
                                >
                                    {readMoreLabel}
                                </button>
                            )}
                        </p>
                    </div>

                    <div className="mb-8" role="group" aria-label={colorLabel}>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-medium dark:text-[#abc2d3] text-gray-400">
                                {colorLabel} <span className="text-gray-700 dark:text-slate-400 font-semibold">{selectedColor}</span>
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            {colors.map((option) => (
                                <button
                                    key={option.name}
                                    type="button"
                                    onClick={() => setSelectedColor(option.name)}
                                    aria-label={`Select ${option.name} color`}
                                    aria-pressed={selectedColor === option.name}
                                    className={`w-20 h-10 rounded-md border-2 transition-all duration-300 ${
                                        selectedColor === option.name ? "border-[#0FABCA] p-1" : "border-transparent"
                                    }`}
                                >
                                    <span className={`block w-full h-full rounded-md transition-all duration-300 ${option.className}`}/>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mb-10" role="group" aria-label={sizeLabel}>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-medium dark:text-[#abc2d3] text-gray-400">
                                {sizeLabel} <span className="font-semibold dark:text-slate-400 text-gray-700">{selectedSize}</span>
                            </h2>
                            {sizeChartHref && (
                                <a href={sizeChartHref} className="text-gray-600 text-[0.8rem] dark:text-[#abc2d3] underline">
                                    {sizeChartLabel}
                                </a>
                            )}
                        </div>
                        <div className="flex w-full flex-wrap gap-2">
                            {sizes.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setSelectedSize(option)}
                                    aria-pressed={selectedSize === option}
                                    className={`px-4 py-2 max-w-[60px] grow rounded-md border ${
                                        selectedSize === option
                                            ? "border-[#0FABCA] bg-[#0FABCA] text-white"
                                            : "border-gray-200 dark:border-slate-700 dark:text-[#abc2d3] hover:border-[#0FABCA]"
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mt-auto">
                        <button
                            type="button"
                            onClick={() => onAddToCart?.(selection)}
                            className="grow py-3 px-6 bg-[#0FABCA] hover:bg-[#0FABCA]/90 rounded-md text-white"
                        >
                            {addToCartLabel}
                        </button>
                        <button
                            type="button"
                            onClick={() => onCheckout?.(selection)}
                            className="grow py-3 px-6 border dark:border-slate-700 dark:hover:bg-slate-900 dark:text-[#abc2d3] border-gray-300 text-gray-600 rounded-md"
                        >
                            {checkoutLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
