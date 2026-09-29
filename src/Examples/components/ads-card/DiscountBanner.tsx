import type {ReactNode} from "react";
import {HiArrowRight} from "react-icons/hi";

export interface DiscountBannerProps {
    /** Small line above the title, for example "Summer sales". */
    eyebrow: string;
    title: string;
    /** Product image pinned to the bottom right corner. */
    imageSrc: string;
    imageAlt?: string;
    /** Discount tag in the top right corner, for example "29% OFF". Leave empty to hide it. */
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

/** A dark sale banner with a discount tag, the offer copy and a product image in the corner. */
export const DiscountBanner = ({
    eyebrow,
    title,
    imageSrc,
    imageAlt = "",
    badge,
    ctaLabel = "Shop now",
    href,
    onCtaClick,
    className = "",
}: DiscountBannerProps) => (
    <div
        className={`w-full md:w-[90%] bg-gray-900 flex flex-col justify-center min-h-[260px] overflow-hidden rounded-md relative px-7 md:px-12 ${className}`}
    >
        {/* coupon */}
        {badge && (
            <span className="py-1 md:py-2 font-semibold px-3 md:px-4 rounded-md absolute right-4 md:right-6 z-20 top-4 md:top-6 bg-[#EFD33D]">
                {badge}
            </span>
        )}

        {/* offer details */}
        <div className="w-full md:w-[45%] z-30">
            <p className="text-[1rem] font-[300] text-[#EBC80C]">{eyebrow}</p>
            <h4 className="text-[1.5rem] mt-2 font-medium text-white">{title}</h4>

            <Cta
                href={href}
                onClick={onCtaClick}
                className="py-2 px-5 text-white font-medium mt-5 group hover:bg-[#ed6104] transition-all duration-300 text-[1rem] flex items-center gap-[10px] bg-[#FA8232] rounded-md"
            >
                {ctaLabel}
                <HiArrowRight className="text-[1.3rem] group-hover:ml-1 transition-all duration-300" aria-hidden/>
            </Cta>
        </div>

        {/* product image */}
        <img alt={imageAlt} src={imageSrc} className="w-[130px] md:w-[220px] absolute right-0 bottom-0"/>
    </div>
);
