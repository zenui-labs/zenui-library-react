import {useState} from "react";
import {FaStar} from "react-icons/fa";

export interface RatedListProduct {
    name: string;
    image: string;
    price: string;
    /** Star rating from 1 to 5. */
    rating: number;
    /** Shown in parentheses after the stars, for example the average score. */
    ratingNote?: string;
}

export interface RatedProductListCardProps {
    product: RatedListProduct;
    onRate?: (rating: number) => void;
    className?: string;
}

/** A compact list row with a small thumbnail, the name, a star rating and the price. Stacks on small screens. */
export const RatedProductListCard = ({product, onRate, className = ""}: RatedProductListCardProps) => {
    const [rating, setRating] = useState(product.rating);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    return (
        <div className={`w-full md:w-[80%] justify-center flex flex-col md:flex-row md:items-center gap-[10px] ${className}`}>
            <img alt={product.name} src={product.image} className="w-[80px] rounded-md"/>

            <div>
                <h3 className="text-[1.1rem] font-medium dark:text-[#abc2d3] line-clamp-2">{product.name}</h3>

                <div className="flex items-center gap-[10px] mb-2">
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

                <p className="text-[1rem] font-medium text-[#0FABCA] mt-1">{product.price}</p>
            </div>
        </div>
    );
};
