import {IoBookmarkOutline} from "react-icons/io5";
import {GoShareAndroid} from "react-icons/go";

export interface EventCardProps {
    title: string;
    /** Small line above the title, for example the kind of event. */
    category: string;
    imageSrc: string;
    imageAlt: string;
    /** Day of the month shown in the date badge, for example "18". */
    day: string;
    /** Month shown under the day, for example "Jan". */
    month: string;
    onBookmark?: () => void;
    onShare?: () => void;
    className?: string;
}

const iconButton =
    "w-[40px] dark:border-slate-500 cursor-pointer h-[40px] rounded-full border border-[#959393] flex items-center justify-center";

/** An event card with a date badge on the edge of the image, a category, a title, and bookmark and share buttons. */
export const EventCard = ({
    title,
    category,
    imageSrc,
    imageAlt,
    day,
    month,
    onBookmark,
    onShare,
    className = "",
}: EventCardProps) => (
    <div className={`bg-white dark:bg-slate-800 rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full md:min-w-[70%] md:max-w-[80%] ${className}`}>
        <img src={imageSrc} alt={imageAlt} className="w-full h-[250px] object-cover rounded-t-md"/>

        <div className="p-4 relative">
            <div className="rounded-xl w-[70px] dark:bg-slate-900 dark:text-[#abc2d3] py-3 bg-white absolute -top-9 right-6 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex items-center flex-col justify-center">
                <b className="text-[1.4rem] leading-[1.4rem]">{day}</b>
                <span className="text-[1rem] uppercase">{month}</span>
            </div>

            <p className="text-[1rem] dark:text-[#abc2d3]/90 text-gray-300 mt-6">{category}</p>
            <h2 className="text-[22px] font-bold dark:text-[#abc2d3] text-black leading-[28px] mt-1.5">{title}</h2>

            <div className="mt-5 flex items-center gap-[10px]">
                <button type="button" aria-label="Bookmark" onClick={onBookmark} className={iconButton}>
                    <IoBookmarkOutline className="text-[#959393] dark:text-[#abc2d3]"/>
                </button>
                <button type="button" aria-label="Share" onClick={onShare} className={iconButton}>
                    <GoShareAndroid className="text-[#959393] dark:text-[#abc2d3]"/>
                </button>
            </div>
        </div>
    </div>
);
