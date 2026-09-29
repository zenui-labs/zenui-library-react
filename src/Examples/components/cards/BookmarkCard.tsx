import {useState} from "react";
import {IoBookmark, IoBookmarkOutline} from "react-icons/io5";

export interface BookmarkCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    /** Controlled saved state. Leave it out to let the card manage its own state. */
    saved?: boolean;
    defaultSaved?: boolean;
    onSavedChange?: (saved: boolean) => void;
    className?: string;
}

/** An image card with a title and a round bookmark button that sits on the edge of the image. */
export const BookmarkCard = ({
    title,
    imageSrc,
    imageAlt,
    saved,
    defaultSaved = false,
    onSavedChange,
    className = "",
}: BookmarkCardProps) => {
    const [internalSaved, setInternalSaved] = useState(defaultSaved);
    const isSaved = saved ?? internalSaved;
    const Icon = isSaved ? IoBookmark : IoBookmarkOutline;

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full md:max-w-[60%] ${className}`}>
            <img src={imageSrc} alt={imageAlt} className="w-full h-[200px] object-cover rounded-t-md"/>

            <div className="py-6 px-4 relative">
                <button
                    type="button"
                    aria-label="Bookmark"
                    aria-pressed={isSaved}
                    onClick={() => {
                        if (saved === undefined) setInternalSaved(!isSaved);
                        onSavedChange?.(!isSaved);
                    }}
                    className="w-[40px] dark:bg-slate-900 h-[40px] rounded-full bg-white absolute -top-5 right-5 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex items-center justify-center"
                >
                    <Icon className="text-gray-500"/>
                </button>

                <h2 className="text-[20px] font-bold text-black dark:text-[#abc2d3] leading-[24px]">{title}</h2>
            </div>
        </div>
    );
};
