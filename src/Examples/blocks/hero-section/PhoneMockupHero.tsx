import type {ReactNode} from "react";
import {FaPlay} from "react-icons/fa";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface PhoneMockupHeroProps {
    title: string;
    description: string;
    /** Product mockup shown beside the text on large screens and below it on small ones. */
    imageSrc: string;
    /** Leave empty when the image is decorative. */
    imageAlt?: string;
    /** Optional image behind the whole section. */
    backgroundImageSrc?: string;
    primaryAction: HeroAction;
    /** A second action with a play icon, for a walkthrough or demo video. */
    videoAction?: HeroAction;
    className?: string;
}

const ActionControl = ({action, className, children}: {action: HeroAction; className: string; children?: ReactNode}) =>
    action.href ? (
        <a href={action.href} onClick={action.onClick} className={className}>
            {children}
            {action.label}
        </a>
    ) : (
        <button type="button" onClick={action.onClick} className={className}>
            {children}
            {action.label}
        </button>
    );

/** A split hero with a headline, a main button, a video button and a phone mockup. */
export const PhoneMockupHero = ({
    title,
    description,
    imageSrc,
    imageAlt = "",
    backgroundImageSrc,
    primaryAction,
    videoAction,
    className = "",
}: PhoneMockupHeroProps) => (
    <div
        className={`w-full h-full rounded-md ${className}`}
        style={backgroundImageSrc ? {backgroundImage: `url("${backgroundImageSrc}")`} : undefined}
    >
        <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
            <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
                <h1 className="text-[40px] lg:text-[60px] leading-[45px] dark:text-[#abc2d3] lg:leading-[65px] font-[500]">
                    {title}
                </h1>
                <p className="text-[16px] dark:text-[#abc2d3] mt-2">{description}</p>

                <div className="flex items-center flex-wrap gap-[20px] mt-6">
                    <ActionControl
                        action={primaryAction}
                        className="py-2 px-6 min-w-fit bg-black text-white rounded-full hover:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 hover:border-black hover:text-black transition-all duration-200 border"
                    />

                    {videoAction && (
                        <ActionControl
                            action={videoAction}
                            className="bg-gray-200 min-w-fit dark:bg-slate-900 dark:text-[#abc2d3] rounded-full py-1.5 px-2 flex items-center gap-[10px]"
                        >
                            <FaPlay
                                aria-hidden
                                className="text-white bg-black dark:text-[#abc2d3] dark:bg-slate-800 rounded-full py-2 text-[2rem]"
                            />
                        </ActionControl>
                    )}
                </div>
            </div>

            <div className="w-full lg:w-[50%]">
                <img src={imageSrc} alt={imageAlt} className="w-full"/>
            </div>
        </header>
    </div>
);
