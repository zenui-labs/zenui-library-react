import type {MouseEvent} from "react";

export interface NotFoundPhotoProps {
    title?: string;
    /** Photo that covers the whole card behind the title. */
    imageSrc?: string;
    /** Where the button sends people. */
    homeHref?: string;
    homeLabel?: string;
    /** Runs when the button is clicked. Call `event.preventDefault()` to navigate with your router instead. */
    onHomeClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
    className?: string;
}

/** A 404 card with a full photo background, a large headline and a link back to the homepage. */
export const NotFoundPhoto = ({
    title = "Go home, you’re drunk",
    imageSrc = "https://i.ibb.co/02DvRcV/404.jpg",
    homeHref = "/",
    homeLabel = "Back to home",
    onHomeClick,
    className = "",
}: NotFoundPhotoProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] px-10 w-full lg:min-h-[600px] py-16 flex flex-col justify-center rounded-xl bg-cover bg-center ${className}`}
        style={{backgroundImage: `url("${imageSrc}")`}}
    >
        <h1 className="text-[2rem] sm:text-[3rem] font-[600] text-white w-full lg:w-[50%]">{title}</h1>

        <a
            href={homeHref}
            onClick={onHomeClick}
            className="py-3 px-8 w-max rounded-full bg-[#92E3A9] hover:bg-[#4ec46f] text-white uppercase mt-5"
        >
            {homeLabel}
        </a>
    </div>
);
