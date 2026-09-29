import type {AnchorHTMLAttributes} from "react";

export type PlayStoreButtonVariant = "solid" | "outline" | "gradient";
export type PlayStoreButtonLogo = "color" | "mono";

export interface PlayStoreButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link to the app's Google Play page. */
    href: string;
    variant?: PlayStoreButtonVariant;
    /** `color` shows the full color logo. `mono` shows a white logo on `solid` and `gradient` and a black one on `outline`. */
    logo?: PlayStoreButtonLogo;
    /** Small line above the store name. */
    caption?: string;
    storeName?: string;
    /** Replaces the Google Play logo. */
    logoSrc?: string;
}

const COLOR_LOGO = "https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png";
const WHITE_LOGO = "https://i.ibb.co/0f4qnNX/images-removebg-preview.png";
const BLACK_LOGO = "https://i.ibb.co/p1c3nqd/download-3-removebg-preview.png";

const roots: Record<PlayStoreButtonVariant, string> = {
    solid: "bg-black",
    outline: "border dark:border-slate-600 border-[#424242]",
    gradient: "bg-gradient-to-t from-pink-600 to-pink-300",
};

const text: Record<PlayStoreButtonVariant, {caption: string; name: string}> = {
    solid: {caption: "text-white", name: "text-white"},
    outline: {caption: "dark:text-[#abc2d3] text-[#424242]", name: "dark:text-[#abc2d3]"},
    gradient: {caption: "text-white", name: "text-white"},
};

// Picks the logo image and its width for a variant.
const logoFor = (variant: PlayStoreButtonVariant, logo: PlayStoreButtonLogo) => {
    if (logo === "color") return {src: COLOR_LOGO, size: "w-[35px]"};
    if (variant === "outline") return {src: BLACK_LOGO, size: "w-[35px]"};
    return {src: WHITE_LOGO, size: "w-[40px]"};
};

/** A "Get it on Google Play" link styled as a store badge. */
export const PlayStoreButton = ({
    href,
    variant = "solid",
    logo = "color",
    caption = "Get it on",
    storeName = "Google Play",
    logoSrc,
    className = "",
    ...props
}: PlayStoreButtonProps) => {
    const image = logoFor(variant, logo);
    // The black badge with a white logo sits on a slightly darker surface in dark mode.
    const darkSurface = variant === "solid" ? (logo === "mono" ? "dark:bg-slate-900" : "dark:bg-slate-800") : "";

    return (
        <a
            href={href}
            className={`px-6 py-2 rounded-md flex items-center gap-[17px] ${roots[variant]} ${darkSurface} ${className}`}
            {...props}
        >
            {/* The text already names the store, so the logo is decorative. */}
            <img src={logoSrc ?? image.src} alt="" aria-hidden className={image.size}/>
            <span className="flex items-start flex-col">
                <span className={`text-[0.850rem] font-[500] ${text[variant].caption}`}>{caption}</span>
                <span className={`text-[1.5rem] font-[500] leading-[20px] mb-2 ${text[variant].name}`}>{storeName}</span>
            </span>
        </a>
    );
};
