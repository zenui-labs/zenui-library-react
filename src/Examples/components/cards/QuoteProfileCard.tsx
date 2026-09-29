export interface QuoteProfileCardProps {
    name: string;
    role: string;
    quote: string;
    avatarSrc: string;
    avatarAlt: string;
    className?: string;
}

/** A horizontal profile card with a round photo, a name and role, and a short quote. Stacks on small screens. */
export const QuoteProfileCard = ({name, role, quote, avatarSrc, avatarAlt, className = ""}: QuoteProfileCardProps) => (
    <div className={`w-full dark:bg-slate-800 md:min-w-[60%] md:max-w-[90%] relative bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-xl flex sm:flex-row flex-col gap-[20px] p-4 ${className}`}>
        <div className="w-full sm:w-[50%]">
            <img src={avatarSrc} alt={avatarAlt} className="w-full sm:w-[100px] h-[100px] object-cover sm:rounded-full"/>
        </div>

        <div>
            <h2 className="text-[1.4rem] dark:text-[#abc2d3] font-bold leading-[24px]">{name}</h2>
            <span className="text-[0.9rem] text-gray-400">{role}</span>

            <p className="text-gray-600 mt-3 dark:text-[#abc2d3]/90 text-[0.9rem]">{quote}</p>
        </div>
    </div>
);
