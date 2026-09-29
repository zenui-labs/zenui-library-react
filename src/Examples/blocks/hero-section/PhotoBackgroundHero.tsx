import type {CSSProperties, ReactNode} from "react";
import {FaPlay} from "react-icons/fa";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export interface PhotoBackgroundHeroProps {
    title: string;
    description: string;
    /** Photo that covers the whole section. Keep the left half calm so the text stays readable. */
    backgroundImageSrc: string;
    primaryAction: HeroAction;
    /** A second action with a play icon, for a lookbook or campaign video. */
    videoAction?: HeroAction;
    /** Color of the main button and the play icon. */
    accentColor?: string;
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

/** A hero set on a full photo, with a headline, a main button and a video button on the left half. */
export const PhotoBackgroundHero = ({
    title,
    description,
    backgroundImageSrc,
    primaryAction,
    videoAction,
    accentColor = "#64BCAE",
    className = "",
}: PhotoBackgroundHeroProps) => (
    <div
        className={`w-full h-full rounded-md ${className}`}
        style={{
            backgroundImage: `url("${backgroundImageSrc}")`,
            backgroundSize: "cover",
            "--hero-accent": accentColor,
        } as CSSProperties}
    >
        <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
            <div className="p-8 pb-[100px] w-full lg:w-[50%]">
                <h1 className="text-[40px] lg:text-[60px] dark:text-[#abc2d3] leading-[45px] lg:leading-[65px] font-[500]">
                    {title}
                </h1>
                <p className="text-[16px] dark:text-[#abc2d3] mt-2">{description}</p>

                <div className="flex items-center flex-wrap gap-[20px] mt-6">
                    <ActionControl
                        action={primaryAction}
                        className="py-2 px-6 min-w-fit dark:border-slate-700 bg-[color:var(--hero-accent)] text-white rounded-full hover:bg-transparent hover:border-[color:var(--hero-accent)] hover:text-[color:var(--hero-accent)] transition-all duration-200 border"
                    />

                    {videoAction && (
                        <ActionControl
                            action={videoAction}
                            className="bg-gray-200 min-w-fit dark:bg-slate-800 dark:text-[#abc2d3] rounded-full py-1.5 px-2 flex items-center gap-[10px]"
                        >
                            <FaPlay aria-hidden className="text-white bg-[color:var(--hero-accent)] rounded-full py-2 text-[2rem]"/>
                        </ActionControl>
                    )}
                </div>
            </div>
        </header>
    </div>
);
