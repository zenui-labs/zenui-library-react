import type {MouseEvent} from "react";

export interface NotFoundCenteredProps {
    description?: string;
    /** Illustration shown above the message. */
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

/** A centered 404 card with a large illustration, a short message and a home link. */
export const NotFoundCentered = ({
    description = "The page cannot be found. The requested URL was not found on this server.",
    imageSrc = "https://i.ibb.co/SVMTKPy/Frame-5.png",
    imageAlt = "",
    homeHref = "/",
    homeLabel = "Back to home",
    onHomeClick,
    className = "",
}: NotFoundCenteredProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] px-10 w-full flex items-center flex-col justify-center py-20 rounded-xl ${className}`}
    >
        <img src={imageSrc} alt={imageAlt} className="w-full lg:w-[400px]"/>

        <p className="text-[#73718A] dark:text-[#abc2d3] text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4">
            {description}
        </p>

        <a href={homeHref} onClick={onHomeClick} className="py-3 px-8 rounded-full bg-[#4538FF] text-white mt-8">
            {homeLabel}
        </a>
    </div>
);
