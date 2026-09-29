import type {ComponentType, MouseEvent} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";

export interface NotFoundColoredProps {
    description?: string;
    /** Illustration shown above the message. */
    imageSrc?: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Where the button sends people. */
    homeHref?: string;
    homeLabel?: string;
    /** Icon before the button label. */
    icon?: ComponentType<{className?: string}>;
    /** Runs when the button is clicked. Call `event.preventDefault()` to navigate with your router instead. */
    onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

/** A 404 card on a solid dark green background with an illustration, a message and a white home button. */
export const NotFoundColored = ({
    description = "Oops, it looks like you followed a broken link",
    imageSrc = "https://i.ibb.co/LvLq6d3/Group-29.png",
    imageAlt = "",
    homeHref = "/",
    homeLabel = "Back to home",
    icon: Icon = FaArrowLeftLong,
    onHomeClick,
    className = "",
}: NotFoundColoredProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] px-10 w-full flex items-center flex-col justify-center py-20 rounded-xl bg-[#00543A] ${className}`}
    >
        <img src={imageSrc} alt={imageAlt} className="w-full lg:w-[400px]"/>

        <p className="text-[#fff] text-[1.2rem] w-full lg:w-[55%] text-center">{description}</p>

        <a
            href={homeHref}
            onClick={onHomeClick}
            className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-black mt-4 flex items-center gap-[10px]"
        >
            <span aria-hidden className="flex"><Icon/></span>
            {homeLabel}
        </a>
    </div>
);
