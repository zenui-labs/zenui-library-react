import {BsArrowRight} from "react-icons/bs";

export interface AuthorBioCardProps {
    name: string;
    role: string;
    bio: string;
    imageSrc: string;
    imageAlt: string;
    ctaLabel?: string;
    onLearnMore?: () => void;
    className?: string;
}

/** A person card with a large photo, a name and role, a short bio and a full width learn more button. */
export const AuthorBioCard = ({
    name,
    role,
    bio,
    imageSrc,
    imageAlt,
    ctaLabel = "Learn more",
    onLearnMore,
    className = "",
}: AuthorBioCardProps) => (
    <div className={`md:min-w-[60%] dark:bg-slate-800 w-full md:max-w-[75%] relative bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-xl ${className}`}>
        <img src={imageSrc} alt={imageAlt} className="w-full h-[260px] object-cover rounded-t-xl"/>

        <div className="p-5">
            <h2 className="text-[1.3rem] font-bold dark:text-[#abc2d3] leading-[24px]">{name}</h2>
            <span className="text-[0.9rem] dark:text-[#abc2d3]/80 text-gray-400">{role}</span>

            <p className="text-gray-600 dark:text-[#abc2d3] mt-3">{bio}</p>

            <button
                type="button"
                onClick={onLearnMore}
                className="py-2.5 px-4 bg-gray-300 dark:bg-slate-700 mt-4 rounded-md w-full flex items-center justify-center gap-[10px] dark:text-[#abc2d3] group"
            >
                {ctaLabel}
                <BsArrowRight className="text-[1.3rem] text-gray-600 dark:text-[#abc2d3] group-hover:ml-2 transition-all duration-200"/>
            </button>
        </div>
    </div>
);
