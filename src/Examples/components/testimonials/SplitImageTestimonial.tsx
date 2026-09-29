import {FaQuoteRight} from "react-icons/fa";

export interface SplitImageTestimonialProps {
    /** Short headline above the quote. */
    title: string;
    quote: string;
    name: string;
    /** Job title or company line under the name. */
    role: string;
    /** Photo shown on the left half of the card. It stacks on top on small screens. */
    imageSrc: string;
    imageAlt?: string;
    /** Background color of the round quote badge. */
    accentColor?: string;
    className?: string;
}

/** A wide testimonial with a photo on one side and the headline, quote and author on the other. */
export const SplitImageTestimonial = ({
    title,
    quote,
    name,
    role,
    imageSrc,
    imageAlt = "",
    accentColor = "#3B9DF8",
    className = "",
}: SplitImageTestimonialProps) => (
    <div
        className={`w-full p-4 bg-white dark:bg-slate-800 shadow-2xl rounded-lg relative flex flex-col md:flex-row items-start justify-between gap-6 ${className}`}
    >
        <div className="relative w-full md:w-[50%]">
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover"/>
            <FaQuoteRight
                className="absolute -top-5 right-[-5%] text-[3rem] text-[#ffffff] p-3 rounded-full"
                style={{backgroundColor: accentColor}}
                aria-hidden
            />
        </div>
        <div className="w-full md:w-[45%]">
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500]">{title}</h3>
            <blockquote className="text-[#424242] text-[0.8rem] dark:text-slate-400 mt-2 text-justify">
                <p>{quote}</p>
            </blockquote>

            <div className="mt-4">
                <p className="text-[1rem] dark:text-[#abc2d3] font-[500]">{name}</p>
                <p className="text-[0.9rem] dark:text-slate-400 text-[#727272]">{role}</p>
            </div>
        </div>
    </div>
);
