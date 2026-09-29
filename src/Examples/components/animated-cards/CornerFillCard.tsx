import type {ComponentType, CSSProperties} from "react";
import {FaArrowRightLong} from "react-icons/fa6";

export interface CornerFillCardProps {
    title: string;
    description: string;
    /** Icon in the colored corner. Defaults to a right arrow. */
    icon?: ComponentType<{className?: string}>;
    /** Color of the corner that grows to fill the card on hover. */
    accentColor?: string;
    /** Renders the card as a link. */
    href?: string;
    className?: string;
}

/** A text card with a colored corner that expands to fill the whole card on hover, turning the text white. */
export const CornerFillCard = ({
    title,
    description,
    icon: Icon = FaArrowRightLong,
    accentColor = "#00838d",
    href,
    className = "",
}: CornerFillCardProps) => {
    const classes = `block w-full dark:bg-slate-800 sm:w-[90%] md:w-[70%] bg-[#f2f8f9] px-[20px] py-[30px] relative overflow-hidden group cursor-pointer rounded-md before:bg-[var(--corner-fill)] before:w-[38px] before:h-[38px] before:absolute before:top-0 before:right-0 before:rounded-bl-[35px] before:z-[-1] hover:before:scale-[38] focus-visible:before:scale-[38] before:transition-all before:ease-out before:duration-[300ms] z-[0] ${className}`;
    const style = {"--corner-fill": accentColor} as CSSProperties;

    const content = (
        <>
            {/* arrow icon */}
            <span className="absolute top-2 z-20 right-2 flex" aria-hidden>
                <Icon className="text-[1rem] text-white"/>
            </span>

            {/* text */}
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-bold transition-all duration-500 group-hover:text-white group-focus-visible:text-white ease-out">
                {title}
            </h3>
            <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500 transition-all ease-out duration-500 mt-1 group-hover:text-white group-focus-visible:text-white">
                {description}
            </p>
        </>
    );

    return href ? (
        <a href={href} className={classes} style={style}>
            {content}
        </a>
    ) : (
        <div className={classes} style={style}>
            {content}
        </div>
    );
};
