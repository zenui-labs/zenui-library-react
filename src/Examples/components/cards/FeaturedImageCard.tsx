import type {ComponentType} from "react";
import {IoIosNotificationsOutline} from "react-icons/io";

export interface FeaturedImageCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    /** Pill above the title. Leave it out to hide the pill. */
    badge?: string;
    /** Icon in the round button at the top right. */
    actionIcon?: ComponentType<{className?: string}>;
    /** Accessible name of the round button. */
    actionLabel?: string;
    onAction?: () => void;
    className?: string;
}

/** A tall image card with the title over a dark gradient and a round action button in the corner. */
export const FeaturedImageCard = ({
    title,
    imageSrc,
    imageAlt,
    badge,
    actionIcon: ActionIcon = IoIosNotificationsOutline,
    actionLabel = "Turn on notifications",
    onAction,
    className = "",
}: FeaturedImageCardProps) => (
    <div className={`w-full md:min-w-[60%] md:max-w-[75%] relative ${className}`}>
        <img src={imageSrc} alt={imageAlt} className="w-full h-[400px] object-cover rounded-xl"/>

        <button
            type="button"
            aria-label={actionLabel}
            onClick={onAction}
            className="absolute top-3 right-3 bg-blue-500 rounded-full p-2"
        >
            <ActionIcon className="text-white text-[1.4rem]"/>
        </button>

        <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-[#000] to-[rgb(0,0,0,0.0001)] p-5 rounded-b-xl">
            {badge && <span className="text-[0.8rem] py-1 px-3 bg-blue-500 rounded-full text-white">{badge}</span>}
            <h2 className="text-[1.8rem] text-white font-bold leading-[34px] mt-4">{title}</h2>
        </div>
    </div>
);
