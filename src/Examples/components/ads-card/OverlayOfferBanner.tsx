import type {ReactNode} from "react";
import {MdKeyboardArrowRight} from "react-icons/md";

export interface OverlayOfferBannerProps {
    /** Background image. Keep the left side calm so the text stays readable. */
    imageSrc: string;
    imageAlt?: string;
    /** Small line above the title, for example "Today special". */
    eyebrow: string;
    title: string;
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

/** An image banner with the offer text and a text link laid over its left side. */
export const OverlayOfferBanner = ({
    imageSrc,
    imageAlt = "",
    eyebrow,
    title,
    ctaLabel = "Shop now",
    href,
    onCtaClick,
    className = "",
}: OverlayOfferBannerProps) => (
    <div className={`w-full md:w-[70%] relative ${className}`}>
        <img alt={imageAlt} src={imageSrc} className="w-full rounded-xl"/>

        <div className="absolute top-[50%] transform translate-y-[-50%] left-8">
            <p className="text-[1rem] font-[300] text-gray-900">{eyebrow}</p>
            <h4 className="text-[1.3rem] mt-2 font-semibold text-gray-900">{title}</h4>

            <Cta
                href={href}
                onClick={onCtaClick}
                className="py-2 text-[#239698] font-semibold mt-2 group hover:underline text-[1rem] flex items-center gap-[10px]"
            >
                {ctaLabel}
                <MdKeyboardArrowRight className="text-[1.3rem] group-hover:ml-1 transition-all duration-300" aria-hidden/>
            </Cta>
        </div>
    </div>
);
