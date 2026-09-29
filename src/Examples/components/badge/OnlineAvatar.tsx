export type OnlineAvatarSize = "lg" | "md" | "sm" | "xs";

export interface OnlineAvatarProps {
    src: string;
    /** Alternative text for the picture, usually the person's name. */
    alt: string;
    size?: OnlineAvatarSize;
    /** Shows the green dot. Set to false when the person is offline. */
    online?: boolean;
    /** Screen reader text for the green dot. */
    onlineLabel?: string;
    className?: string;
}

// Picture size, dot size and dot position for each size. Full class names keep Tailwind able to find them.
const sizes: Record<OnlineAvatarSize, {image: string; ring: string; dot: string}> = {
    lg: {image: "w-[80px] h-[80px]", ring: "top-[60px] right-2", dot: "w-[16px] h-[16px]"},
    md: {image: "w-[70px] h-[70px]", ring: "top-[53px] right-2", dot: "w-[14px] h-[14px]"},
    sm: {image: "w-[60px] h-[60px]", ring: "top-[47px] right-2", dot: "w-[12px] h-[12px]"},
    xs: {image: "w-[50px] h-[50px]", ring: "top-[38px] right-[4px]", dot: "w-[10px] h-[10px]"},
};

/** A round avatar with a green dot at the bottom right that shows the person is online. */
export const OnlineAvatar = ({src, alt, size = "lg", online = true, onlineLabel = "Online", className = ""}: OnlineAvatarProps) => {
    const classes = sizes[size];

    return (
        <div className={`relative ${className}`}>
            <img src={src} alt={alt} className={`${classes.image} rounded-full object-cover`}/>

            {online && (
                <div className={`p-[2px] bg-white absolute dark:bg-[#020617] ${classes.ring} rounded-full`}>
                    <div className={`${classes.dot} rounded-full bg-green-400`}/>
                    <span className="sr-only">{onlineLabel}</span>
                </div>
            )}
        </div>
    );
};
