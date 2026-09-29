import {FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar} from "react-icons/fa";

export interface OutlinedReviewTestimonialProps {
    /** Short headline for the review. */
    title: string;
    quote: string;
    name: string;
    /** Job title or company line next to the name. */
    role: string;
    avatarSrc: string;
    avatarAlt?: string;
    /** Number of filled stars, from 0 to `maxRating`. */
    rating: number;
    maxRating?: number;
    /** Color of the border and the quote marks. */
    accentColor?: string;
    className?: string;
}

/** An outlined, horizontal review with a round portrait, the author and rating on one line, a headline and the quote. */
export const OutlinedReviewTestimonial = ({
    title,
    quote,
    name,
    role,
    avatarSrc,
    avatarAlt = "",
    rating,
    maxRating = 5,
    accentColor = "#3B9DF8",
    className = "",
}: OutlinedReviewTestimonialProps) => {
    const filled = Math.max(0, Math.min(maxRating, Math.round(rating)));

    return (
        <div
            className={`w-full border shadow-2xl rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-16 ${className}`}
            style={{borderColor: accentColor}}
        >
            <img src={avatarSrc} alt={avatarAlt} className="w-[180px] h-[180px] object-cover rounded-full"/>

            <div className="w-full md:w-[65%] relative">
                <div className="flex flex-col md:flex-row flex-wrap gap-y-2 items-center justify-between relative">
                    <FaQuoteRight
                        className="absolute top-[-550%] md:top-[-150%] left-[0%] text-[2rem]"
                        style={{color: accentColor}}
                        aria-hidden
                    />
                    <div className="flex items-center gap-2">
                        <p className="text-[1rem] dark:text-[#abc2d3] font-[500]">
                            {name} <span aria-hidden>-</span>
                        </p>
                        <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#9c9c9c]">{role}</p>
                    </div>
                    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${filled} out of ${maxRating}`}>
                        {Array.from({length: maxRating}, (_, index) =>
                            index < filled ? (
                                <FaStar key={index} className="text-[1.1rem] text-[#ffba24]" aria-hidden/>
                            ) : (
                                <FaRegStar key={index} className="text-[#ffba24] text-[1.1rem]" aria-hidden/>
                            ),
                        )}
                    </div>
                </div>
                <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500] mt-3">{title}</h3>
                <blockquote className="text-justify dark:text-[#abc2d3] text-[0.9rem] my-3 text-[#424242]">
                    <p>{quote}</p>
                </blockquote>
                <FaQuoteLeft
                    className="absolute bottom-[-10%] right-[0%] text-[2rem]"
                    style={{color: accentColor}}
                    aria-hidden
                />
            </div>
        </div>
    );
};
