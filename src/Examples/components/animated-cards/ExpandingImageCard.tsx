import {FaRegHeart} from "react-icons/fa";
import {MdOutlineTimer} from "react-icons/md";

export interface ExpandingImageCardProps {
    imageSrc: string;
    imageAlt?: string;
    /** Small uppercase label above the title. */
    category: string;
    title: string;
    author: string;
    /** Reading or trip time shown in the top right corner on hover, for example "5 min". */
    duration?: string;
    /** Word placed before the author name. */
    bylineLabel?: string;
    className?: string;
}

/**
 * A story card whose image grows to fill the card and fades on hover, revealing a heart and a duration in the
 * top corners.
 */
export const ExpandingImageCard = ({
    imageSrc,
    imageAlt = "",
    category,
    title,
    author,
    duration,
    bylineLabel = "by",
    className = "",
}: ExpandingImageCardProps) => (
    <div className={`w-full sm:w-[80%] md:w-[60%] shadow-md h-[350px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group ${className}`}>
        {/* icons */}
        <div className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
            <FaRegHeart className="text-[1.1rem] dark:text-[#abc2d3] text-gray-600" aria-hidden/>
            {duration && (
                <div className="flex items-center gap-[5px]">
                    <MdOutlineTimer className="dark:text-orange-600 text-orange-700 text-[1.1rem]" aria-hidden/>
                    <p className="text-[1rem] dark:text-orange-600 text-orange-700">{duration}</p>
                </div>
            )}
        </div>

        {/* image */}
        <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out"
        />

        {/* texts */}
        <div className="absolute bottom-0 left-0 py-[20px] pb-[40px] px-[20px] w-full">
            <p className="text-[1rem] dark:text-[#abc2d3]/80 uppercase text-gray-600">{category}</p>
            <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-bold text-gray-900">{title}</h3>
            <p className="text-[0.9rem] dark:text-[#abc2d3]/90 text-gray-600 mt-2">
                {bylineLabel} {author}
            </p>
        </div>
    </div>
);
