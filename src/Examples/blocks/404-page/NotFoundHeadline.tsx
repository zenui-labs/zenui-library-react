import type {ComponentType, MouseEvent} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";

export interface NotFoundHeadlineProps {
    title?: string;
    /** Illustration shown above the title. */
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

/** A 404 card with a wide illustration, a bold headline and an outlined home button. */
export const NotFoundHeadline = ({
    title = "Thunder 404",
    imageSrc = "https://i.ibb.co/nP1Cngw/Error-Server-1.png",
    imageAlt = "",
    homeHref = "/",
    homeLabel = "Back to home",
    icon: Icon = FaArrowLeftLong,
    onHomeClick,
    className = "",
}: NotFoundHeadlineProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] px-10 w-full flex items-center flex-col justify-center pb-[50px] rounded-xl ${className}`}
    >
        <img src={imageSrc} alt={imageAlt} className="w-full lg:w-[500px]"/>

        <h1 className="text-[#1C3177] dark:text-blue-600 text-[1.8rem] sm:text-[2.5rem] font-[800] mt-3 w-full lg:w-[55%] text-center">
            {title}
        </h1>

        <a
            href={homeHref}
            onClick={onHomeClick}
            className="py-3 px-6 sm:px-8 dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] rounded-full bg-[#fff] text-[#1C3177] border border-[#1C3177] mt-4 flex items-center gap-[10px]"
        >
            <span aria-hidden className="flex"><Icon/></span>
            {homeLabel}
        </a>
    </div>
);
