import {useState, type ChangeEvent, type ComponentType} from "react";
import {FaStar} from "react-icons/fa";
import {FiMinus, FiPlus} from "react-icons/fi";
import {HiArrowsUpDown} from "react-icons/hi2";
import {IoMdHeartEmpty} from "react-icons/io";
import {IoBagHandleOutline, IoEyeOutline} from "react-icons/io5";

export interface ProductColor {
    name: string;
    /** Any CSS color, for example "#ef4444". */
    value: string;
}

export interface ClothingProduct {
    name: string;
    price: string;
    image: string;
    /** Shown while the pointer is over the image, for example the back of the garment. */
    hoverImage?: string;
    /** Star rating from 1 to 5. */
    rating: number;
    /** Shown in parentheses after the stars, for example the review count. */
    ratingNote?: string;
    colors: ProductColor[];
}

export interface ClothingProductCardLabels {
    wishlist: string;
    compare: string;
    quickView: string;
    addToCart: string;
    decrease: string;
    increase: string;
    quantity: string;
}

export interface ClothingProductCardProps {
    product: ClothingProduct;
    /** Selected color name (controlled). */
    color?: string;
    /** Selected color name when uncontrolled. Defaults to the first color. */
    defaultColor?: string;
    onColorChange?: (color: string) => void;
    /** Quantity in the hover bar (controlled). */
    quantity?: number;
    defaultQuantity?: number;
    onQuantityChange?: (quantity: number) => void;
    onAddToCart?: (quantity: number) => void;
    onWishlist?: () => void;
    onCompare?: () => void;
    onQuickView?: () => void;
    onRate?: (rating: number) => void;
    labels?: Partial<ClothingProductCardLabels>;
    className?: string;
}

const DEFAULT_LABELS: ClothingProductCardLabels = {
    wishlist: "Wishlist",
    compare: "Compare",
    quickView: "Quick view",
    addToCart: "Add to cart",
    decrease: "Decrease quantity",
    increase: "Increase quantity",
    quantity: "Quantity",
};

// Uses the prop when it is set, otherwise keeps the value in local state.
function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void) {
    const [internal, setInternal] = useState<T>(defaultValue);
    const current = value !== undefined ? value : internal;
    const setValue = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };
    return [current, setValue] as const;
}

interface QuickActionProps {
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Start offset and duration, so the three buttons rise one after another. */
    motionClassName: string;
    onClick?: () => void;
}

const QuickAction = ({label, icon: Icon, motionClassName, onClick}: QuickActionProps) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className={`relative w-max group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${motionClassName}`}
        >
            <button
                type="button"
                aria-label={label}
                onClick={onClick}
                onFocus={() => setTooltipVisible(true)}
                onBlur={() => setTooltipVisible(false)}
                className="block rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer"
            >
                <Icon className="text-[1.3rem]"/>
            </button>

            {/* tooltip */}
            <p
                aria-hidden
                className={`${tooltipVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
            >
                {label}
                <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"/>
            </p>
        </div>
    );
};

/** A clothing card with an image that swaps on hover, quick actions with tooltips, a quantity bar and color swatches. */
export const ClothingProductCard = ({
    product,
    color,
    defaultColor,
    onColorChange,
    quantity,
    defaultQuantity = 0,
    onQuantityChange,
    onAddToCart,
    onWishlist,
    onCompare,
    onQuickView,
    onRate,
    labels,
    className = "",
}: ClothingProductCardProps) => {
    const text = {...DEFAULT_LABELS, ...labels};
    const [imageHovered, setImageHovered] = useState(false);
    const [rating, setRating] = useState(product.rating);
    const [selectedColor, setSelectedColor] = useControllableState(color, defaultColor ?? product.colors[0]?.name ?? "", onColorChange);
    const [count, setCount] = useControllableState(quantity, defaultQuantity, onQuantityChange);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = Number(event.target.value);
        setCount(Number.isNaN(next) ? 0 : Math.max(0, next));
    };

    return (
        <div className={`w-full md:w-[50%] group ${className}`}>
            {/* image & action buttons */}
            <div
                onMouseEnter={() => setImageHovered(true)}
                onMouseLeave={() => setImageHovered(false)}
                className="w-full relative cursor-pointer overflow-hidden"
            >
                <img
                    alt={product.name}
                    src={imageHovered && product.hoverImage ? product.hoverImage : product.image}
                    className="w-full"
                />

                <div className="absolute bottom-0 left-0 w-full">
                    {/* quick action buttons */}
                    <div className="flex items-center gap-[15px] justify-center">
                        <QuickAction
                            label={text.wishlist}
                            icon={IoMdHeartEmpty}
                            motionClassName="translate-y-[50px] duration-300"
                            onClick={onWishlist}
                        />
                        <QuickAction
                            label={text.compare}
                            icon={HiArrowsUpDown}
                            motionClassName="translate-y-[80px] duration-500"
                            onClick={onCompare}
                        />
                        <QuickAction
                            label={text.quickView}
                            icon={IoEyeOutline}
                            motionClassName="translate-y-[110px] duration-700"
                            onClick={onQuickView}
                        />
                    </div>

                    {/* quantity & add to cart */}
                    <div className="w-full flex mt-6 items-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-500 translate-y-[60px] bg-[rgb(0,0,0,0.5)]">
                        <div className="flex w-[50%] justify-center px-2 py-0.5 items-center border-r border-gray-400 text-white">
                            <button
                                type="button"
                                aria-label={text.decrease}
                                className="active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]"
                                onClick={() => setCount(Math.max(0, count - 1))}
                            >
                                <FiMinus/>
                            </button>
                            <input
                                type="number"
                                min={0}
                                value={count}
                                aria-label={text.quantity}
                                className="w-[40px] py-2.5 outline-none focus:ring-0 border-none text-center text-[0.9rem] bg-transparent"
                                onChange={handleInputValueChange}
                            />
                            <button
                                type="button"
                                aria-label={text.increase}
                                className="active:bg-gray-100 p-[6px] rounded-full text-white transition-all duration-300 active:text-gray-700 text-[0.9rem]"
                                onClick={() => setCount(count + 1)}
                            >
                                <FiPlus/>
                            </button>
                        </div>

                        <button
                            type="button"
                            aria-label={text.addToCart}
                            onClick={() => onAddToCart?.(count)}
                            className="py-[13px] overflow-hidden before:w-full before:h-full before:bg-[#0FABCA] before:absolute before:top-0 z-0 before:z-[-1] before:translate-x-[-150px] hover:before:translate-x-0 before:transition-all before:duration-300 before:left-0 relative flex items-center justify-center grow text-white"
                        >
                            <IoBagHandleOutline className="text-[1.3rem]"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* product details */}
            <div className="mt-4">
                <div className="flex items-center justify-center gap-[10px] mt-2">
                    <div className="flex items-center space-x-1" role="group" aria-label={`Rated ${rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                aria-label={`Rate ${star} out of 5`}
                                onClick={() => handleRate(star)}
                                className="flex cursor-pointer"
                            >
                                <FaStar className={star <= rating ? "text-yellow-400" : "text-gray-300"} size={16}/>
                            </button>
                        ))}
                    </div>
                    {product.ratingNote && (
                        <span className="text-[0.9rem] dark:text-slate-400 text-gray-500">({product.ratingNote})</span>
                    )}
                </div>

                <h3 className="text-[1rem] font-medium text-center mt-0.5 text-gray-900 dark:text-[#abc2d3]">{product.name}</h3>
                <p className="text-center mt-0.5 text-[0.9rem] text-gray-900 dark:text-[#abc2d3]">{product.price}</p>

                <div className="flex items-center gap-[10px] justify-center mt-3">
                    {product.colors.map((swatch) => {
                        const selected = swatch.name === selectedColor;
                        return (
                            <button
                                key={swatch.name}
                                type="button"
                                aria-label={swatch.name}
                                aria-pressed={selected}
                                onClick={() => setSelectedColor(swatch.name)}
                                className={`w-4 h-4 rounded-full cursor-pointer ${selected ? "outline outline-1 outline-offset-2" : ""}`}
                                style={{backgroundColor: swatch.value, outlineColor: swatch.value}}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
