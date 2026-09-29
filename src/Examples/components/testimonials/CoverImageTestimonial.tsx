import {FaQuoteRight} from "react-icons/fa";

export interface CoverImageTestimonialProps {
    quote: string;
    name: string;
    /** Job title or company line under the name. */
    role: string;
    /** Wide photo across the top of the card, cropped to 200px high. */
    imageSrc: string;
    imageAlt?: string;
    /** Background color of the round quote badge. */
    accentColor?: string;
    className?: string;
}

/** A card with a cover photo on top, a quote badge on its bottom edge and the quote and author below. */
export const CoverImageTestimonial = ({
    quote,
    name,
    role,
    imageSrc,
    imageAlt = "",
    accentColor = "#3B9DF8",
    className = "",
}: CoverImageTestimonialProps) => (
    <div className={`w-full md:w-[70%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg ${className}`}>
        <div className="relative">
            <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-[200px] object-cover rounded-t-md border-b-[10px] border-[#e6e6e6]"
            />
            <FaQuoteRight
                className="absolute -bottom-5 left-[5%] text-[3rem] text-[#ffffff] p-3 rounded-full"
                style={{backgroundColor: accentColor}}
                aria-hidden
            />
        </div>
        <div className="p-6">
            <blockquote className="dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-[#424242]">
                <p>{quote}</p>
            </blockquote>

            <div className="mt-4">
                <p className="text-[1rem] dark:text-[#abc2d3] font-[500]">{name}</p>
                <p className="text-[0.9rem] text-[#424242] dark:text-slate-400">{role}</p>
            </div>
        </div>
    </div>
);
