import type {ReactNode} from "react";

export interface PromoPosterCardProps {
    title: string;
    subtitle: string;
    /** Product image shown under the button. */
    imageSrc: string;
    imageAlt?: string;
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

/** A tall promo card with centered copy, a button and a large product image below. */
export const PromoPosterCard = ({
    title,
    subtitle,
    imageSrc,
    imageAlt = "",
    ctaLabel = "Shop now",
    href,
    onCtaClick,
    className = "",
}: PromoPosterCardProps) => (
    <div
        className={`w-full md:w-[60%] overflow-hidden flex items-center justify-center flex-col pt-12 p-6 bg-[#0BAF9A] rounded-xl ${className}`}
    >
        <h4 className="text-center text-[1.2rem] font-medium text-white">{title}</h4>
        <p className="text-[1rem] text-center text-[#FFFFFF]">{subtitle}</p>

        <Cta
            href={href}
            onClick={onCtaClick}
            className="py-2 px-6 rounded-md bg-white text-[#0BAF9A] font-[400] text-[1rem] mx-auto mb-5 mt-4"
        >
            {ctaLabel}
        </Cta>

        <img alt={imageAlt} src={imageSrc} className="w-[400px] mx-auto"/>
    </div>
);
