import {FaQuoteLeft, FaRegStar, FaStar} from "react-icons/fa";

export interface FloatingAvatarTestimonialProps {
    quote: string;
    name: string;
    /** Job title or company line under the name. */
    role: string;
    avatarSrc: string;
    avatarAlt?: string;
    /** Number of filled stars, from 0 to `maxRating`. */
    rating: number;
    maxRating?: number;
    /** Color of the ring around the avatar. */
    accentColor?: string;
    className?: string;
}

/** A quote card with the avatar floating over its top edge and a star rating next to the author. */
export const FloatingAvatarTestimonial = ({
    quote,
    name,
    role,
    avatarSrc,
    avatarAlt = "",
    rating,
    maxRating = 5,
    accentColor = "#3B9DF8",
    className = "",
}: FloatingAvatarTestimonialProps) => {
    const filled = Math.max(0, Math.min(maxRating, Math.round(rating)));

    return (
        // The top margin leaves room for the avatar, which sits 40px above the card.
        <div className={`w-full md:w-[70%] mt-10 p-4 dark:bg-slate-800 bg-white shadow-2xl rounded-lg relative ${className}`}>
            <FaQuoteLeft className="absolute -top-2 left-[5%] dark:text-slate-400 text-[1.3rem] text-[#727272]" aria-hidden/>
            <img
                src={avatarSrc}
                alt={avatarAlt}
                className="w-[100px] h-[100px] object-cover rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4"
                style={{borderColor: accentColor}}
            />
            <blockquote className="text-[#424242] text-[0.9rem] dark:text-[#abc2d3] mt-16">
                <p>{quote}</p>
            </blockquote>

            <div className="flex items-start mt-5 justify-between">
                <div>
                    <p className="text-[1.2rem] dark:text-[#abc2d3] font-[600]">{name}</p>
                    <p className="text-[1rem] dark:text-slate-400 text-[#727272]">{role}</p>
                </div>
                <div className="flex items-center gap-1" role="img" aria-label={`Rated ${filled} out of ${maxRating}`}>
                    {Array.from({length: maxRating}, (_, index) =>
                        index < filled ? (
                            <FaStar key={index} className="text-[1.3rem] text-[#ffba24]" aria-hidden/>
                        ) : (
                            <FaRegStar key={index} className="text-[#ffba24] text-[1.3rem]" aria-hidden/>
                        ),
                    )}
                </div>
            </div>
            <FaQuoteLeft
                className="absolute -bottom-2 dark:text-slate-400 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]"
                aria-hidden
            />
        </div>
    );
};
