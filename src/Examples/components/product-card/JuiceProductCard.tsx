import {useState} from "react";
import {FaStar} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";

export interface JuiceProduct {
    name: string;
    image: string;
    price: string;
    /** Pack size shown above the price, for example "1 KG". */
    size: string;
    /** Star rating from 1 to 5. */
    rating: number;
    /** Shown in parentheses after the stars, for example the review count. */
    ratingNote?: string;
}

export interface JuiceProductCardProps {
    product: JuiceProduct;
    onAdd?: () => void;
    onRate?: (rating: number) => void;
    /** Text on the add button. */
    addLabel?: string;
    className?: string;
}

/** A bordered product card with a rating, the pack size, the price and an add button. */
export const JuiceProductCard = ({product, onAdd, onRate, addLabel = "Add", className = ""}: JuiceProductCardProps) => {
    const [rating, setRating] = useState(product.rating);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    return (
        <div className={`border dark:border-slate-700 border-gray-300 rounded-md p-5 ${className}`}>
            <img alt={product.name} src={product.image} className="w-[250px] mt-2"/>

            <div className="mt-3">
                <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-semibold">{product.name}</h3>

                {/* rating */}
                <div className="flex items-center gap-[10px] mt-2">
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

                <div className="flex items-end justify-between mt-2">
                    <div>
                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">{product.size}</p>
                        <p className="text-[1rem] font-semibold mt-1 text-[#0FABCA]">{product.price}</p>
                    </div>

                    <button
                        type="button"
                        onClick={onAdd}
                        className="py-2 px-4 bg-[#0FABCA] text-white rounded-md flex items-center gap-[0.5rem] text-[0.9rem] hover:bg-[#0195af] transition-all duration-200"
                    >
                        {addLabel}
                        <FaPlus aria-hidden/>
                    </button>
                </div>
            </div>
        </div>
    );
};
