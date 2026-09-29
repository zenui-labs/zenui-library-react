import type {ReactNode} from "react";
import {BsArrowRight} from "react-icons/bs";

export interface ProductSpotlightAdProps {
    imageSrc: string;
    /** Leave empty when the title already names the product. */
    imageAlt?: string;
    title: string;
    description: string;
    /** Price as shown, for example "$299 USD". */
    price: string;
    /** Text before the price. */
    priceLabel?: string;
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

/** A centered product ad with an image, a short pitch, the price and a full-width call to action. */
export const ProductSpotlightAd = ({
    imageSrc,
    imageAlt = "",
    title,
    description,
    price,
    priceLabel = "Only for:",
    ctaLabel = "Shop now",
    href,
    onCtaClick,
    className = "",
}: ProductSpotlightAdProps) => (
    <div className={`w-full md:w-[62%] bg-[#F7E99E] rounded-md p-4 md:p-6 text-center ${className}`}>
        <img alt={imageAlt} src={imageSrc} className="w-[150px] mx-auto"/>
        <h3 className="text-[1.3rem] md:text-[1.6rem] leading-[28px] md:leading-[35px] font-semibold">{title}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <div className="flex items-center justify-center my-5 gap-[10px]">
            <p className="text-[1rem] text-gray-700">{priceLabel}</p>
            <span className="py-1.5 px-3 bg-white rounded-md font-semibold text-gray-900 text-[0.9rem]">{price}</span>
        </div>
        <Cta
            href={href}
            onClick={onCtaClick}
            className="group flex items-center gap-[10px] w-full bg-[#FA8232] text-white py-2.5 rounded-md hover:bg-[#DE732D] transition-all duration-300 px-4 justify-center"
        >
            {ctaLabel}
            <BsArrowRight className="group-hover:ml-1 transition-all duration-300" aria-hidden/>
        </Cta>
    </div>
);
