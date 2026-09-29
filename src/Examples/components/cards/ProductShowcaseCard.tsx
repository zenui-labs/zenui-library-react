import type {ComponentType} from "react";
import {IoIosNotificationsOutline} from "react-icons/io";
import {BsArrowRight} from "react-icons/bs";

export interface ProductShowcaseCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    /** Icon in the round button at the top right. */
    actionIcon?: ComponentType<{className?: string}>;
    /** Accessible name of the round button. */
    actionLabel?: string;
    onAction?: () => void;
    /** Accessible name of the arrow button. */
    openLabel?: string;
    onOpen?: () => void;
    className?: string;
}

/** An image card with a title, a short description, a corner action button and an arrow button to open the item. */
export const ProductShowcaseCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    actionIcon: ActionIcon = IoIosNotificationsOutline,
    actionLabel = "Turn on notifications",
    onAction,
    openLabel = "View details",
    onOpen,
    className = "",
}: ProductShowcaseCardProps) => (
    <div className={`w-full md:min-w-[60%] md:max-w-[75%] relative dark:bg-slate-800 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-xl flow-root ${className}`}>
        <img src={imageSrc} alt={imageAlt} className="w-full h-[260px] object-cover rounded-t-xl"/>

        <button
            type="button"
            aria-label={actionLabel}
            onClick={onAction}
            className="absolute top-3 right-3 bg-blue-500 rounded-full p-2"
        >
            <ActionIcon className="text-white text-[1.4rem]"/>
        </button>

        <div className="p-4">
            <h2 className="text-[1.3rem] font-bold dark:text-[#abc2d3] leading-[34px]">{title}</h2>
            <p className="text-[0.9rem] dark:text-[#abc2d3]/80 text-gray-400">{description}</p>
        </div>

        <button
            type="button"
            aria-label={openLabel}
            onClick={onOpen}
            className="float-right p-2 dark:hover:bg-slate-900/70 hover:bg-gray-100 cursor-pointer mr-2 mb-2 rounded-full"
        >
            <BsArrowRight className="text-[1.5rem] text-gray-400"/>
        </button>
    </div>
);
