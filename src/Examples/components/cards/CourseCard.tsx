import {RiArrowRightSLine} from "react-icons/ri";

export interface CourseCardProps {
    title: string;
    description: string;
    /** Small line under the description, for example the length of the lesson. */
    meta: string;
    ctaLabel?: string;
    onViewMore?: () => void;
    className?: string;
}

/** A text card with a title, a short description, a meta line and a footer button with an arrow. */
export const CourseCard = ({title, description, meta, ctaLabel = "View more", onViewMore, className = ""}: CourseCardProps) => (
    <div className={`bg-white dark:bg-slate-800 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-md w-full md:max-w-[80%] ${className}`}>
        <div className="p-5">
            <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-semibold leading-[28px]">{title}</h2>
            <p className="text-[1rem] dark:text-[#abc2d3]/80 text-gray-600 mt-2 mb-4">{description}</p>
            <span className="text-[0.9rem] text-gray-400 dark:text-[#abc2d3] font-[300]">{meta}</span>
        </div>

        <button
            type="button"
            onClick={onViewMore}
            className="border-t dark:border-slate-600 border-gray-200 p-5 flex items-center justify-between w-full"
        >
            <span className="font-semibold dark:text-[#abc2d3] text-gray-700">{ctaLabel}</span>
            <RiArrowRightSLine className="text-[1.4rem] dark:text-[#abc2d3]" aria-hidden/>
        </button>
    </div>
);
