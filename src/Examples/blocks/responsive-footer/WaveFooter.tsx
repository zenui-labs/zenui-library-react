import type {ComponentType} from "react";
import {SlArrowUp} from "react-icons/sl";

export interface SocialLink {
    /** Read by screen readers, for example "Facebook". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface FooterLogo {
    src: string;
    alt: string;
}

export interface WaveFooterProps {
    logo: FooterLogo;
    description: string;
    socialLinks: SocialLink[];
    /** Text in the bottom row, for example "© 2024 Acme. All rights reserved." */
    copyright: string;
    contactLabel?: string;
    /** Renders the contact button as a link when set. */
    contactHref?: string;
    /** Called when the contact button is pressed and no `contactHref` is set. */
    onContactClick?: () => void;
    /** Replaces the default scroll to the top of the page. */
    onBackToTop?: () => void;
    backToTopLabel?: string;
    /** Decorative wave image drawn behind the front wave. */
    backWaveSrc?: string;
    /** Decorative wave image along the bottom edge. */
    frontWaveSrc?: string;
    className?: string;
}

const scrollToTop = () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({top: 0, behavior: reduceMotion ? "auto" : "smooth"});
};

/** A centered brand footer with a contact button, social icons and decorative waves along the bottom. */
export const WaveFooter = ({
    logo,
    description,
    socialLinks,
    copyright,
    contactLabel = "Contact us",
    contactHref,
    onContactClick,
    onBackToTop = scrollToTop,
    backToTopLabel = "Back to top",
    backWaveSrc = "https://i.ibb.co/zNk7XT4/Rectangle-97.png",
    frontWaveSrc = "https://i.ibb.co/0mp2FwS/Rectangle-95.png",
    className = "",
}: WaveFooterProps) => {
    const contactClassName = "py-3 px-6 rounded-full bg-[#3B9DF8] text-white";

    return (
        <footer className={`bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-3 md:p-4 relative ${className}`}>
            <div className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">
                <img src={logo.src} alt={logo.alt} className="w-[150px]"/>

                <p className="text-[0.9rem] dark:text-[#abc2d3] text-center sm:text-start text-gray-600">{description}</p>

                {contactHref ? (
                    <a href={contactHref} className={contactClassName}>{contactLabel}</a>
                ) : (
                    <button type="button" onClick={onContactClick} className={contactClassName}>{contactLabel}</button>
                )}

                <div className="flex gap-[15px] text-black mt-4">
                    {socialLinks.map(({label, href, icon: Icon}) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="text-[1.2rem] dark:bg-slate-800 dark:text-[#abc2d3] p-1.5 cursor-pointer rounded-full bg-white text-[#424242] shadow-md"
                        >
                            <Icon/>
                        </a>
                    ))}
                </div>
            </div>

            <div className="z-30 absolute bottom-3 left-0 right-0 px-3 flex items-center justify-between w-full">
                <p className="text-[0.9rem] text-gray-300">{copyright}</p>

                <button
                    type="button"
                    onClick={onBackToTop}
                    aria-label={backToTopLabel}
                    className="p-2 rounded-full border border-gray-300 cursor-pointer text-[2rem] text-gray-300"
                >
                    <SlArrowUp className="block" aria-hidden/>
                </button>
            </div>

            <img src={backWaveSrc} alt="" aria-hidden className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-b-xl"/>
            <img src={frontWaveSrc} alt="" aria-hidden className="absolute bottom-0 left-0 right-0 z-10 rounded-b-xl"/>
        </footer>
    );
};
