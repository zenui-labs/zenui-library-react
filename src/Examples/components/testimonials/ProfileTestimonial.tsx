import {FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar} from "react-icons/fa";

export interface ProfileTestimonialProps {
    quote: string;
    name: string;
    /** City or company line under the name. */
    location: string;
    avatarSrc: string;
    avatarAlt?: string;
    /** Number of filled stars, from 0 to `maxRating`. */
    rating: number;
    maxRating?: number;
    className?: string;
}

/** A centered card that leads with a large portrait, then the name, a star rating and the quote. */
export const ProfileTestimonial = ({
    quote,
    name,
    location,
    avatarSrc,
    avatarAlt = "",
    rating,
    maxRating = 5,
    className = "",
}: ProfileTestimonialProps) => {
    const filled = Math.max(0, Math.min(maxRating, Math.round(rating)));

    return (
        <div
            className={`w-full z-0 md:w-[70%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-6 flex items-center justify-center flex-col ${className}`}
        >
            <img src={avatarSrc} alt={avatarAlt} className="w-[150px] h-[150px] object-cover rounded-full"/>
            <div className="flex flex-col items-center">
                <p className="text-[1.5rem] dark:text-[#abc2d3] font-[500] mt-4">{name}</p>
                <p className="text-[#424242] text-[0.9rem] dark:text-slate-400">{location}</p>
            </div>

            <div className="flex items-center gap-1 my-4" role="img" aria-label={`Rated ${filled} out of ${maxRating}`}>
                {Array.from({length: maxRating}, (_, index) =>
                    index < filled ? (
                        <FaStar key={index} className="text-[1.3rem] text-[#ffba24]" aria-hidden/>
                    ) : (
                        <FaRegStar key={index} className="text-[#ffba24] text-[1.3rem]" aria-hidden/>
                    ),
                )}
            </div>

            <div className="relative">
                <blockquote className="dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-[#424242]">
                    <p>{quote}</p>
                </blockquote>
                {/* The large quote marks sit behind the text; `z-0` on the card keeps them above its background. */}
                <FaQuoteRight
                    className="text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute top-[-20%] left-0"
                    aria-hidden
                />
                <FaQuoteLeft
                    className="text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute bottom-[0%] right-0"
                    aria-hidden
                />
            </div>
        </div>
    );
};
