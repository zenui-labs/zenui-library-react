import {useState} from "react";
import type {ComponentType} from "react";
import {BsHeart, BsHeartFill} from "react-icons/bs";

export type IconComponent = ComponentType<{className?: string}>;

export interface ProductColor {
    name: string;
    /** Tailwind background class for the swatch, for example "bg-purple-600". */
    className: string;
}

export interface ProductSpec {
    icon: IconComponent;
    label: string;
    value: string;
}

export interface ProductPerk {
    icon: IconComponent;
    /** Short heading, for example "Free delivery". */
    label: string;
    /** Detail under the heading, for example "1-2 days". */
    value: string;
}

export interface ProductSelection {
    color: string;
    storage: string;
}

export interface ProductDetailsWithSpecsProps {
    name: string;
    /** Current price, already formatted, for example "$1399". */
    price: string;
    /** Original price shown struck through. */
    compareAtPrice?: string;
    images: string[];
    colors: ProductColor[];
    storageOptions: string[];
    specs: ProductSpec[];
    /** Delivery, stock and warranty notes under the buttons. */
    perks?: ProductPerk[];
    description: string;
    /** Extra text revealed by the "more..." button. */
    moreDescription?: string;

    color?: string;
    defaultColor?: string;
    onColorChange?: (color: string) => void;
    storage?: string;
    defaultStorage?: string;
    onStorageChange?: (storage: string) => void;
    wishlisted?: boolean;
    defaultWishlisted?: boolean;
    onWishlistChange?: (wishlisted: boolean) => void;
    onAddToCart?: (selection: ProductSelection) => void;

    colorLabel?: string;
    readMoreLabel?: string;
    wishlistLabel?: string;
    addToCartLabel?: string;
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

/** A product page with a thumbnail gallery, color and storage pickers, a spec grid and delivery notes. */
export const ProductDetailsWithSpecs = ({
    name,
    price,
    compareAtPrice,
    images,
    colors,
    storageOptions,
    specs,
    perks = [],
    description,
    moreDescription,
    color,
    defaultColor,
    onColorChange,
    storage,
    defaultStorage,
    onStorageChange,
    wishlisted,
    defaultWishlisted = false,
    onWishlistChange,
    onAddToCart,
    colorLabel = "Select color:",
    readMoreLabel = "more...",
    wishlistLabel = "Add to wishlist",
    addToCartLabel = "Add to cart",
    className = "",
}: ProductDetailsWithSpecsProps) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [selectedColor, setSelectedColor] = useControllable(color, defaultColor ?? colors[0]?.name ?? "", onColorChange);
    const [selectedStorage, setSelectedStorage] = useControllable(storage, defaultStorage ?? storageOptions[0] ?? "", onStorageChange);
    const [isFavorite, setIsFavorite] = useControllable(wishlisted, defaultWishlisted, onWishlistChange);

    return (
        <div className={`mx-auto md:px-8 md:py-12 ${className}`}>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left side, image gallery */}
                <div className="flex flex-col-reverse gap-[15px] md:gap-0 md:flex-row">
                    {/* Thumbnails */}
                    <div className="w-full md:w-[20%] flex flex-row md:flex-col md:gap-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 md:pr-2">
                        {images.map((image, index) => (
                            <button
                                key={`${image}-${index}`}
                                type="button"
                                onClick={() => setSelectedImage(index)}
                                aria-label={`Show image ${index + 1}`}
                                aria-pressed={selectedImage === index}
                                className={`relative w-36 md:w-20 h-[70px] md:h-20 border-2 p-1 md:p-2 rounded-lg overflow-hidden ${
                                    selectedImage === index ? "border-[#0FABCA]" : "border-transparent dark:border-slate-700"
                                }`}
                            >
                                <img src={image} alt="" className="object-cover"/>
                            </button>
                        ))}
                    </div>

                    {/* Main image */}
                    <div className="w-full md:w-[80%] dark:bg-slate-900 bg-gray-100 rounded-sm h-[280px] md:h-[400px] relative flex items-center justify-center">
                        <img src={images[selectedImage]} alt={name} className="object-cover w-[200px] md:w-[300px] rounded-lg"/>
                    </div>
                </div>

                {/* Right side, product details */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-[1.6rem] dark:text-[#abc2d3] md:text-[1.9rem] font-bold text-gray-800">{name}</h1>
                        <div className="flex items-center gap-2 mt-2 md:mt-5">
                            <span className="text-3xl dark:text-[#abc2d3] font-medium">{price}</span>
                            {compareAtPrice && (
                                <span className="text-xl dark:text-slate-400 text-gray-500 line-through">{compareAtPrice}</span>
                            )}
                        </div>
                    </div>

                    {/* Color selection */}
                    <div className="flex float-start md:items-center flex-col md:flex-row gap-[10px]" role="group" aria-label={colorLabel}>
                        <span className="text-sm dark:text-[#abc2d3] font-medium">{colorLabel}</span>
                        <div className="flex gap-3">
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

                    {/* Storage selection */}
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {storageOptions.map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => setSelectedStorage(size)}
                                    aria-pressed={selectedStorage === size}
                                    className={`py-2 px-4 rounded-lg border ${
                                        selectedStorage === size
                                            ? "border-[#0FABCA] bg-[#0FABCA]/10 text-[#0FABCA]"
                                            : "border-gray-200 dark:border-slate-700 dark:text-[#abc2d3]"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specs.map((spec) => (
                            <div key={spec.label} className="flex items-center gap-2 dark:bg-slate-900 bg-gray-50 p-3 rounded-lg">
                                <spec.icon className="w-5 h-5 dark:text-[#abc2d3] text-gray-700"/>
                                <div>
                                    <p className="text-sm dark:text-[#abc2d3] text-gray-500">{spec.label}</p>
                                    <p className="font-medium text-gray-700 dark:text-slate-400 text-[0.9rem]">{spec.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-[0.9rem] dark:text-slate-400 text-gray-600">
                        {description}
                        {moreDescription && expanded && <> {moreDescription}</>}
                        {moreDescription && !expanded && (
                            <>
                                {" "}
                                <button type="button" onClick={() => setExpanded(true)} aria-expanded={expanded} className="text-[#3B9DF8] hover:underline">
                                    {readMoreLabel}
                                </button>
                            </>
                        )}
                    </p>

                    {/* Action buttons */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            type="button"
                            onClick={() => setIsFavorite(!isFavorite)}
                            aria-pressed={isFavorite}
                            className="flex-1 py-3 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-50"
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isFavorite ? <BsHeartFill className="w-5 h-5 text-red-500" aria-hidden/> : <BsHeart className="w-5 h-5" aria-hidden/>}
                                {wishlistLabel}
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => onAddToCart?.({color: selectedColor, storage: selectedStorage})}
                            className="flex-1 py-3 px-4 rounded-lg bg-[#0FABCA] text-white hover:bg-[#0FABCA]/90"
                        >
                            {addToCartLabel}
                        </button>
                    </div>

                    {/* Delivery info */}
                    {perks.length > 0 && (
                        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between mt-2">
                            {perks.map((perk) => (
                                <div key={perk.label} className="flex items-center gap-3">
                                    <perk.icon className="text-[3rem] dark:bg-slate-900 dark:text-[#abc2d3] text-gray-500 p-3 bg-gray-100 rounded-md"/>
                                    <div>
                                        <p className="text-sm dark:text-[#abc2d3] text-gray-500">{perk.label}</p>
                                        <p className="font-medium text-[0.9rem] dark:text-slate-500 text-gray-800">{perk.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
