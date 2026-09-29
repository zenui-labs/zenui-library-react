import {useId, useState, type ReactNode} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaHeart} from "react-icons/fa";
import {HiMiniShare} from "react-icons/hi2";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

export interface ExpandableBlogCardProps {
    authorName: string;
    /** Letter shown in the avatar circle. Defaults to the first letter of the author's name. */
    authorInitial?: string;
    avatarColor?: string;
    date: string;
    imageSrc: string;
    imageAlt: string;
    excerpt: string;
    /** Content revealed by the arrow button, for example the full recipe. */
    children: ReactNode;
    /** Controlled favorite state. Leave it out to let the card manage its own state. */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    defaultExpanded?: boolean;
    onShare?: () => void;
    onMoreClick?: () => void;
    className?: string;
}

/** A blog post card with an author row, an image, favorite and share buttons, and a section that expands. */
export const ExpandableBlogCard = ({
    authorName,
    authorInitial = authorName.charAt(0),
    avatarColor = "#f36f23",
    date,
    imageSrc,
    imageAlt,
    excerpt,
    children,
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    defaultExpanded = false,
    onShare,
    onMoreClick,
    className = "",
}: ExpandableBlogCardProps) => {
    const [internalFavorite, setInternalFavorite] = useState(defaultFavorite);
    const [isOpen, setIsOpen] = useState(defaultExpanded);
    const isFavorite = favorite ?? internalFavorite;
    const contentId = useId();

    const toggleFavorite = () => {
        if (favorite === undefined) setInternalFavorite(!isFavorite);
        onFavoriteChange?.(!isFavorite);
    };

    return (
        <div className={`w-full md:w-[70%] shadow-lg dark:bg-slate-800 bg-white rounded ${className}`}>
            <div className="flex w-full justify-between items-center p-4">
                <div className="flex items-center gap-4">
                    <div
                        aria-hidden
                        className="w-[50px] h-[50px] flex items-center justify-center text-white text-[1.3rem] rounded-full"
                        style={{backgroundColor: avatarColor}}
                    >
                        {authorInitial}
                    </div>

                    <div>
                        <h2 className="font-[500] dark:text-[#abc2d3] text-[1.2rem]">{authorName}</h2>
                        <p className="text-[#424242] dark:text-[#abc2d3]/70 text-[0.9rem]">{date}</p>
                    </div>
                </div>
                <button
                    type="button"
                    aria-label="More options"
                    onClick={onMoreClick}
                    className="rounded-full"
                >
                    <BsThreeDotsVertical className="text-[#424242] dark:hover:bg-slate-900/60 dark:text-[#abc2d3] rounded-full text-[2.5rem] p-2 hover:bg-[#ececec] cursor-pointer"/>
                </button>
            </div>

            <img src={imageSrc} alt={imageAlt} className="w-full h-[250px] object-cover"/>

            <p className="text-[#424242] dark:text-[#abc2d3] p-4">{excerpt}</p>

            <div className="flex items-center justify-between w-full p-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Favorite"
                        aria-pressed={isFavorite}
                        onClick={toggleFavorite}
                        className={`${
                            isFavorite ? "text-[#ff3d3d]" : "text-[#424242] dark:text-[#abc2d3]"
                        } text-[1.4rem] cursor-pointer`}
                    >
                        <FaHeart/>
                    </button>
                    <button
                        type="button"
                        aria-label="Share"
                        onClick={onShare}
                        className="text-[#424242] dark:text-[#abc2d3] text-[1.4rem] cursor-pointer"
                    >
                        <HiMiniShare/>
                    </button>
                </div>
                <button
                    type="button"
                    aria-label={isOpen ? "Show less" : "Show more"}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-[#424242] text-[1.4rem] dark:text-[#abc2d3] cursor-pointer"
                >
                    {isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}
                </button>
            </div>

            <div
                id={contentId}
                className={`grid overflow-hidden px-4 transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] py-4" : "grid-rows-[0fr] invisible"
                } text-[0.9rem] dark:text-[#abc2d3]`}
            >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    );
};
