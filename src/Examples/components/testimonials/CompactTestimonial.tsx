export interface CompactTestimonialProps {
    /** Short headline above the quote. */
    title: string;
    quote: string;
    name: string;
    /** Job title or company line under the name. */
    role: string;
    avatarSrc: string;
    avatarAlt?: string;
    className?: string;
}

/** A plain card with a headline, the quote and a small avatar next to the author. */
export const CompactTestimonial = ({
    title,
    quote,
    name,
    role,
    avatarSrc,
    avatarAlt = "",
    className = "",
}: CompactTestimonialProps) => (
    <div className={`w-full md:w-[55%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-6 ${className}`}>
        <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500]">{title}</h3>
        <blockquote className="dark:text-slate-400 text-justify text-[0.9rem] my-3 text-[#424242]">
            <p>{quote}</p>
        </blockquote>

        <div className="flex items-center gap-4 mt-4">
            <img src={avatarSrc} alt={avatarAlt} className="w-[40px] h-[40px] object-cover rounded-full"/>
            <div>
                <p className="text-[1rem] dark:text-[#abc2d3] font-[500]">{name}</p>
                <p className="text-[0.9rem] dark:text-slate-400 text-[#424242]">{role}</p>
            </div>
        </div>
    </div>
);
