import {useState, type ChangeEvent} from "react";
import {FaHeart, FaRegHeart, FaStar} from "react-icons/fa";
import {FiMinus, FiPlus} from "react-icons/fi";
import {IoCartOutline} from "react-icons/io5";

export interface GroceryProduct {
    name: string;
    image: string;
    price: string;
    /** Price before the discount, shown struck through. */
    originalPrice?: string;
    /** Star rating from 1 to 5. */
    rating: number;
}

export interface GroceryProductCardLabels {
    addToFavorites: string;
    removeFromFavorites: string;
    addToCart: string;
    decrease: string;
    increase: string;
    quantity: string;
}

export interface GroceryProductCardProps {
    product: GroceryProduct;
    /** Whether the heart is filled (controlled). */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    /** Quantity in the stepper (controlled). */
    quantity?: number;
    defaultQuantity?: number;
    onQuantityChange?: (quantity: number) => void;
    onAddToCart?: (quantity: number) => void;
    onRate?: (rating: number) => void;
    labels?: Partial<GroceryProductCardLabels>;
    className?: string;
}

const DEFAULT_LABELS: GroceryProductCardLabels = {
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
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

/** A bordered grocery card with a favorite toggle, a sale price, a quantity stepper and a cart button. */
export const GroceryProductCard = ({
    product,
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    quantity,
    defaultQuantity = 0,
    onQuantityChange,
    onAddToCart,
    onRate,
    labels,
    className = "",
}: GroceryProductCardProps) => {
    const text = {...DEFAULT_LABELS, ...labels};
    const [rating, setRating] = useState(product.rating);
    const [isFavorite, setIsFavorite] = useControllableState(favorite, defaultFavorite, onFavoriteChange);
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
        <div className={`relative border dark:border-slate-700 w-full md:w-[55%] border-gray-300 rounded-md p-5 ${className}`}>
            {/* favorite toggle: the two hearts cross-fade */}
            <button
                type="button"
                aria-pressed={isFavorite}
                aria-label={isFavorite ? text.removeFromFavorites : text.addToFavorites}
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-3 right-3 z-10 w-[1.4rem] h-[1.4rem] text-[1.4rem] cursor-pointer"
            >
                <FaHeart
                    className={`${isFavorite ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.7]"} absolute inset-0 dark:text-slate-400 text-red-500 transition-all duration-300`}
                />
                <FaRegHeart
                    className={`${isFavorite ? "opacity-0 scale-[0.7]" : "opacity-100 scale-[1]"} absolute inset-0 dark:text-slate-400 text-gray-600 transition-all duration-300`}
                />
            </button>

            <img alt={product.name} src={product.image} className="w-[150px] mt-2 mx-auto"/>

            <div className="mt-8">
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

                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium mt-1.5">{product.name}</h3>

                <div className="flex items-center gap-[10px]">
                    <p className="text-[1rem] font-semibold mt-1 text-[#0FABCA]">{product.price}</p>
                    {product.originalPrice && (
                        <del className="text-[1rem] font-normal mt-1 dark:text-slate-500 text-gray-500">{product.originalPrice}</del>
                    )}
                </div>

                <div className="flex items-center w-full justify-between mt-4">
                    <div className="flex items-center dark:border-slate-700 border border-gray-200 rounded-md">
                        <button
                            type="button"
                            aria-label={text.decrease}
                            className="bg-gray-100 p-[9px] rounded-l-md dark:text-[#abc2d3] dark:bg-slate-900 text-gray-600 text-[1.1rem]"
                            onClick={() => setCount(Math.max(0, count - 1))}
                        >
                            <FiMinus/>
                        </button>
                        <input
                            type="number"
                            min={0}
                            value={count}
                            aria-label={text.quantity}
                            className="w-[50px] py-[4px] dark:bg-transparent dark:text-[#abc2d3] outline-none text-gray-600 focus:ring-0 border-none text-center text-[1.1rem]"
                            onChange={handleInputValueChange}
                        />
                        <button
                            type="button"
                            aria-label={text.increase}
                            className="bg-gray-100 p-[9px] rounded-r-md dark:text-[#abc2d3] dark:bg-slate-900 text-gray-600 text-[1.1rem]"
                            onClick={() => setCount(count + 1)}
                        >
                            <FiPlus/>
                        </button>
                    </div>

                    <button
                        type="button"
                        aria-label={text.addToCart}
                        onClick={() => onAddToCart?.(count)}
                        className="py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200"
                    >
                        <IoCartOutline className="text-[1.3rem]"/>
                    </button>
                </div>
            </div>
        </div>
    );
};
