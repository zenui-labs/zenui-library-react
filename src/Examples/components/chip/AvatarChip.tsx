import type {ReactNode} from "react";

export type AvatarChipSize = "sm" | "md" | "lg";

export interface AvatarChipProps {
    children: ReactNode;
    /** Picture shown before the label. */
    avatarSrc: string;
    /** Alternative text for the picture. Leave empty when the label already names the person. */
    avatarAlt?: string;
    size?: AvatarChipSize;
    className?: string;
}

// Picture size for each chip size. Full class names keep Tailwind able to find them.
const sizes: Record<AvatarChipSize, string> = {
    sm: "w-[25px] h-[25px]",
    md: "w-[35px] h-[35px]",
    lg: "w-[45px] h-[45px]",
};

/** A rounded chip with a small avatar before the label. */
export const AvatarChip = ({children, avatarSrc, avatarAlt = "", size = "sm", className = ""}: AvatarChipProps) => (
    <span
        className={`pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2 ${className}`}
    >
        <img src={avatarSrc} alt={avatarAlt} className={`${sizes[size]} rounded-full`}/>
        {children}
    </span>
);
