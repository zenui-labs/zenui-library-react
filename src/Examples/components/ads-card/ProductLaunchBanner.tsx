import type {ReactNode} from "react";
import {BsArrowRight} from "react-icons/bs";

export interface ProductLaunchBannerProps {
    imageSrc: string;
    /** Leave empty when the title already names the product. */
    imageAlt?: string;
    title: string;
    description: string;
    /** Small tag above the title. */
    badge?: string;
    ctaLabel?: string;
    /** Renders the call to action as a link. Without it the call to action is a button. */
    href?: string;
    onCtaClick?: () => void;
    className?: string;
}

interface CtaProps {
    href?: string;
    onClick?: () => void;
    className: string;
    children: ReactNode;
}

const Cta = ({href, onClick, className, children}: CtaProps) =>
    href ? (
        <a href={href} onClick={onClick} className={className}>
            {children}
        </a>
    ) : (
        <button type="button" onClick={onClick} className={className}>
            {children}
        </button>
    );

/** A wide banner that introduces a new product, with copy on the left and the product image on the right. */
export const ProductLaunchBanner = ({
    imageSrc,
    imageAlt = "",
    title,
    description,
    badge = "Introducing",
    ctaLabel = "Shop now",
    href,
    onCtaClick,
    className = "",
}: ProductLaunchBannerProps) => (
    <div
        className={`bg-[#F2F4F5] dark:bg-slate-800 p-5 md:p-8 gap-[30px] md:gap-[15px] w-full rounded-md flex flex-col md:flex-row md:items-center md:justify-between ${className}`}
    >
        <div className="w-full md:w-[55%]">
            {badge && <span className="py-1.5 px-4 text-[0.8rem] uppercase rounded-md bg-blue-400 text-white">{badge}</span>}
            <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-semibold text-gray-900 my-2">{title}</h3>
            <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-700 mb-4">{description}</p>
            <Cta
                href={href}
                onClick={onCtaClick}
                className="group w-max flex items-center gap-[10px] bg-[#FA8232] text-white py-2.5 rounded-md hover:bg-[#DE732D] transition-all duration-300 px-8 justify-center"
            >
                {ctaLabel}
                <BsArrowRight className="group-hover:ml-1 transition-all duration-300" aria-hidden/>
            </Cta>
        </div>
        <div className="w-[90%] mx-auto md:w-[40%]">
            <img alt={imageAlt} src={imageSrc}/>
        </div>
    </div>
);
