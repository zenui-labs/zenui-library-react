import type {ComponentType} from "react";

export interface SocialLink {
    /** Accessible name, for example "Facebook". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface ProfileRevealCardProps {
    imageSrc: string;
    imageAlt?: string;
    name: string;
    role: string;
    socials?: SocialLink[];
    /** Extra delay in ms added to each social icon after the first, so they rise one after another. */
    stagger?: number;
    className?: string;
}

/**
 * A portrait card. On hover a blurred panel rises from the bottom with the name, role and social links.
 * Keyboard focus on a social link reveals the panel too.
 */
export const ProfileRevealCard = ({
    imageSrc,
    imageAlt = "",
    name,
    role,
    socials = [],
    stagger = 300,
    className = "",
}: ProfileRevealCardProps) => (
    <div className={`w-full sm:w-[80%] lg:w-[60%] rounded-md relative group overflow-hidden ${className}`}>
        {/* image */}
        <img src={imageSrc} alt={imageAlt} className="w-full h-[350px] object-cover"/>

        {/* texts */}
        <div className="flex flex-col items-center justify-center backdrop-blur-md text-white absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-[400ms] overflow-hidden">
            <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                {name}
            </h3>
            <p className="text-[1rem] translate-y-[100px] group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
                {role}
            </p>

            {/* socials icons */}
            {socials.length > 0 && (
                <ul className="flex items-center gap-[20px] mt-[15px]">
                    {socials.map(({label, href, icon: Icon}, index) => (
                        <li
                            key={label}
                            className="translate-y-[100px] group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                            style={{transitionDuration: `${500 + index * stagger}ms`}}
                        >
                            <a href={href} aria-label={label} className="block">
                                <Icon className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);
