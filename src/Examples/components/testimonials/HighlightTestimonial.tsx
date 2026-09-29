import {FaQuoteRight} from "react-icons/fa";

export interface HighlightTestimonialProps {
    /** Large headline under the author, usually the customer's own summary. */
    title: string;
    quote: string;
    name: string;
    /** Job title or company line under the name. */
    role: string;
    avatarSrc: string;
    avatarAlt?: string;
    /** Background color of the card. The text is white, so pick a color with enough contrast. */
    accentColor?: string;
    className?: string;
}

/** A solid color card for a featured review: author first, then a large headline and the quote. */
export const HighlightTestimonial = ({
    title,
    quote,
    name,
    role,
    avatarSrc,
    avatarAlt = "",
    accentColor = "#3B9DF8",
    className = "",
}: HighlightTestimonialProps) => (
    <div
        className={`w-full md:w-[75%] text-white shadow-2xl rounded-lg p-6 relative ${className}`}
        style={{backgroundColor: accentColor}}
    >
        <FaQuoteRight className="text-[4rem] text-[#e9e9e959] absolute top-[10%] right-[10%]" aria-hidden/>
        <div className="flex items-center gap-4 mt-4">
            <img src={avatarSrc} alt={avatarAlt} className="w-[40px] h-[40px] object-cover rounded-full"/>
            <div>
                <p className="text-[1rem] font-[500]">{name}</p>
                <p className="text-[0.9rem] text-[#e9e9e9]">{role}</p>
            </div>
        </div>

        <h3 className="text-[1.5rem] font-[500] mt-5 leading-[30px]">{title}</h3>

        <blockquote className="text-justify text-[0.9rem] my-3 text-[#e9e9e9]">
            <p>{quote}</p>
        </blockquote>
    </div>
);
