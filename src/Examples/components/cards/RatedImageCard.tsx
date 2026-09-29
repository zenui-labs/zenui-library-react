import {FaStar} from "react-icons/fa";

export interface RatedImageCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    /** Number of filled stars, from 0 to `maxRating`. */
    rating: number;
    maxRating?: number;
    /** Pill in the top right corner. Leave it out to hide the pill. */
    badge?: string;
    className?: string;
}

/** An image card with a corner badge, a star rating and a title. */
export const RatedImageCard = ({title, imageSrc, imageAlt, rating, maxRating = 5, badge, className = ""}: RatedImageCardProps) => (
    <div className={`bg-white dark:bg-slate-800 rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] relative min-w-[60%] ${className}`}>
        <img src={imageSrc} alt={imageAlt} className="w-full h-[250px] object-cover rounded-t-md"/>

        {badge && (
            <span className="text-[0.9rem] py-0.5 px-3 bg-blue-500 text-white rounded-full absolute top-4 right-4">{badge}</span>
        )}

        <div className="p-3">
            <div className="flex items-center gap-[5px]">
                {Array.from({length: maxRating}, (_, index) => (
                    <FaStar
                        key={index}
                        aria-hidden
                        className={index < rating ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"}
                    />
                ))}
                <span className="sr-only">
                    Rated {rating} out of {maxRating}
                </span>
            </div>

            <h2 className="text-[20px] dark:text-[#abc2d3] font-bold text-black leading-[24px] mt-1.5">{title}</h2>
        </div>
    </div>
);
