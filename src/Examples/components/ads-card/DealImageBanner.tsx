import type {ReactNode} from "react";

export interface DealImageBannerProps {
    /** Full-bleed banner image. The labels sit on top of it. */
    imageSrc: string;
    imageAlt?: string;
    /** Colored line in the top tag, for example "Hot deals". */
    eyebrow: string;
    /** Second line in the top tag, usually the category. */
    category: string;
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

/** An image banner with a deal tag in the top left corner and a pill button in the bottom right. */
export const DealImageBanner = ({
    imageSrc,
    imageAlt = "",
    eyebrow,
    category,
    ctaLabel = "View offer",
    href,
    onCtaClick,
    className = "",
}: DealImageBannerProps) => (
    <div className={`w-full md:w-[80%] relative ${className}`}>
        {/* offer details */}
        <div className="bg-white rounded-l-md rounded-r-[60px] absolute top-3 left-3 pl-3.5 pr-6 py-1.5">
            <p className="text-[1rem] text-[#0BAF9A] leading-[15px] mt-1.5">{eyebrow}</p>
            <span className="text-gray-600 text-[0.9rem] tracking-wider">{category}</span>
        </div>

        <img alt={imageAlt} src={imageSrc} className="rounded-xl"/>

        {/* action button */}
        <Cta
            href={href}
            onClick={onCtaClick}
            className="absolute bottom-3 right-3 py-[8px] px-5 text-white bg-[#0BAF9A] rounded-full font-medium"
        >
            {ctaLabel}
        </Cta>
    </div>
);
