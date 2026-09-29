import type {MouseEvent} from "react";

export interface NotFoundSplitProps {
    title?: string;
    description?: string;
    /** Illustration shown beside the text on large screens and above it on small ones. */
    imageSrc?: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Where the button sends people. */
    homeHref?: string;
    homeLabel?: string;
    /** Runs when the button is clicked. Call `event.preventDefault()` to navigate with your router instead. */
    onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

/** A 404 card with an illustration on one side and a headline, message and home link on the other. */
export const NotFoundSplit = ({
    title = "Oops",
    description = "Looks like Bigfoot has broken the link",
    imageSrc = "https://i.ibb.co/HdHH4Pb/Frame-6.png",
    imageAlt = "",
    homeHref = "/",
    homeLabel = "Back to homepage",
    onHomeClick,
    className = "",
}: NotFoundSplitProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] px-10 w-full lg:flex-row gap-[30px] lg:gap-0 flex-col flex items-center justify-evenly py-20 rounded-xl ${className}`}
    >
        <div className="w-[80%] lg:w-[40%]">
            <img src={imageSrc} alt={imageAlt} className="w-full"/>
        </div>

        <div className="w-full lg:w-[30%] text-center lg:text-start">
            <h1 className="text-[2.5rem] dark:text-[#abc2d3] sm:text-[4rem] font-[800] text-[#566FA7] uppercase leading-[80px]">
                {title}
            </h1>

            <p className="text-[#8093B8] dark:text-slate-400 text-[0.9rem] sm:text-[1.2rem]">{description}</p>

            <a
                href={homeHref}
                onClick={onHomeClick}
                className="inline-block py-3 px-6 sm:px-8 text-[0.9rem] sm:text-[1rem] rounded-full bg-[#566FA7] text-white mt-8"
            >
                {homeLabel}
            </a>
        </div>
    </div>
);
