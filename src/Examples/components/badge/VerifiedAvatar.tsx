import {MdVerified} from "react-icons/md";

export type VerifiedAvatarSize = "lg" | "md" | "sm" | "xs";

export interface VerifiedAvatarProps {
    src: string;
    /** Alternative text for the picture, usually the person's name. */
    alt: string;
    size?: VerifiedAvatarSize;
    /** Shows the check mark badge. */
    verified?: boolean;
    /** Screen reader text for the check mark. */
    verifiedLabel?: string;
    className?: string;
}

// Picture size, icon size and icon position for each size. Full class names keep Tailwind able to find them.
const sizes: Record<VerifiedAvatarSize, {image: string; icon: string}> = {
    lg: {image: "w-[80px] h-[80px]", icon: "text-[1.5rem] top-[57px] right-[5px]"},
    md: {image: "w-[70px] h-[70px]", icon: "text-[1.4rem] top-[50px] right-[4px]"},
    sm: {image: "w-[60px] h-[60px]", icon: "text-[1.3rem] top-[43px] right-[4px]"},
    xs: {image: "w-[50px] h-[50px]", icon: "text-[1.2rem] top-[35px] right-[4px]"},
};

/** A round avatar with a blue check mark at the bottom right that marks the account as verified. */
export const VerifiedAvatar = ({
    src,
    alt,
    size = "lg",
    verified = true,
    verifiedLabel = "Verified",
    className = "",
}: VerifiedAvatarProps) => {
    const classes = sizes[size];

    return (
        <div className={`relative ${className}`}>
            <img src={src} alt={alt} className={`${classes.image} rounded-full object-cover`}/>

            {verified && (
                <>
                    <MdVerified
                        aria-hidden
                        className={`text-blue-500 p-[2px] ${classes.icon} dark:bg-[#020617] bg-white rounded-full absolute`}
                    />
                    <span className="sr-only">{verifiedLabel}</span>
                </>
            )}
        </div>
    );
};
