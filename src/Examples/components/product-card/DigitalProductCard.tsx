import {useState} from "react";
import {FaStar} from "react-icons/fa";
import {IoIosHeart, IoMdHeartEmpty} from "react-icons/io";
import {IoCartOutline} from "react-icons/io5";

export interface DigitalProduct {
    title: string;
    image: string;
    author: string;
    category: string;
    price: string;
    /** Number of sales shown above the price. */
    sales: number;
    /** Star rating from 1 to 5. */
    rating: number;
    /** Shown in parentheses after the stars, for example the average score. */
    ratingNote?: string;
}

export interface DigitalProductCardLabels {
    by: string;
    in: string;
    sales: string;
    preview: string;
    addToCart: string;
    addToFavorites: string;
    removeFromFavorites: string;
}

export interface DigitalProductCardProps {
    product: DigitalProduct;
    /** Whether the heart is filled (controlled). */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    onAddToCart?: () => void;
    onPreview?: () => void;
    onRate?: (rating: number) => void;
    labels?: Partial<DigitalProductCardLabels>;
    className?: string;
}

const DEFAULT_LABELS: DigitalProductCardLabels = {
    by: "by",
    in: "in",
    sales: "Sales",
    preview: "Preview",
    addToCart: "Add to cart",
    addToFavorites: "Add to favorites",
    removeFromFavorites: "Remove from favorites",
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

/** A card for templates, themes and other digital goods, with the author, category, sales count and a preview button. */
export const DigitalProductCard = ({
    product,
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    onAddToCart,
    onPreview,
    onRate,
    labels,
    className = "",
}: DigitalProductCardProps) => {
    const text = {...DEFAULT_LABELS, ...labels};
    const [rating, setRating] = useState(product.rating);
    const [isFavorite, setIsFavorite] = useControllableState(favorite, defaultFavorite, onFavoriteChange);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    return (
        <div className={`border border-gray-300 dark:border-slate-700 rounded-xl p-2 w-full md:w-[70%] ${className}`}>
            <div className="relative">
                <img alt={product.title} src={product.image} className="w-full"/>

                <button
                    type="button"
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? text.removeFromFavorites : text.addToFavorites}
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full bg-gray-600 absolute top-2 right-2 cursor-pointer"
                >
                    {isFavorite ? (
                        <IoIosHeart className="text-[#0FABCA] text-[1.2rem]"/>
                    ) : (
                        <IoMdHeartEmpty className="text-white text-[1.2rem]"/>
                    )}
                </button>
            </div>

            <div className="mt-2 pt-0 p-1">
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium line-clamp-1">{product.title}</h3>

                {/* author & rating */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mt-1">
                    <p className="text-gray-400 text-[0.9rem]">
                        {text.by} <span className="text-black dark:text-[#abc2d3]">{product.author}</span> {text.in}{" "}
                        <span className="text-black dark:text-[#abc2d3]">{product.category}</span>
                    </p>

                    <div className="flex items-center gap-[10px]">
                        <div className="flex items-center space-x-1" role="group" aria-label={`Rated ${rating} out of 5`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    aria-label={`Rate ${star} out of 5`}
                                    onClick={() => handleRate(star)}
                                    className="flex cursor-pointer"
                                >
                                    <FaStar className={star <= rating ? "text-yellow-400" : "text-gray-300"} size={15}/>
                                </button>
                            ))}
                        </div>
                        {product.ratingNote && (
                            <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">({product.ratingNote})</span>
                        )}
                    </div>
                </div>

                {/* price & actions */}
                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">
                            {product.sales} {text.sales}
                        </span>
                        <p className="text-[1.150rem] font-semibold text-[#0FABCA]">{product.price}</p>
                    </div>

                    <div className="flex items-center gap-[10px]">
                        <button
                            type="button"
                            aria-label={text.addToCart}
                            onClick={onAddToCart}
                            className="py-2 px-4 border border-[#0FABCA] text-white rounded-md flex items-center group gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200"
                        >
                            <IoCartOutline className="text-[1.3rem] group-hover:text-white text-[#0FABCA]"/>
                        </button>

                        <button
                            type="button"
                            onClick={onPreview}
                            className="py-2 px-4 border border-[#0FABCA] text-[#0FABCA] hover:text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0FABCA] transition-all duration-200"
                        >
                            {text.preview}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
