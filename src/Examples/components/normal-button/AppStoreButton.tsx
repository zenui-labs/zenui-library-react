import type {AnchorHTMLAttributes} from "react";

export type AppStoreButtonVariant = "solid" | "outline" | "gradient";

export interface AppStoreButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    /** Link to the app's App Store page. */
    href: string;
    variant?: AppStoreButtonVariant;
    /** Small line above the store name. */
    caption?: string;
    storeName?: string;
    /** Replaces the Apple logo. The default is white for `solid` and `gradient` and black for `outline`. */
    logoSrc?: string;
}

const WHITE_LOGO = "https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png";
const BLACK_LOGO = "https://i.ibb.co/6NFjc6z/download-removebg-preview.png";

const styles: Record<AppStoreButtonVariant, {root: string; logo: string; logoSize: string; caption: string; name: string}> = {
    solid: {
        root: "bg-black dark:bg-slate-800",
        logo: WHITE_LOGO,
        logoSize: "w-[35px]",
        caption: "text-white",
        name: "text-white",
    },
    outline: {
        root: "border border-[#424242] dark:border-slate-600",
        logo: BLACK_LOGO,
        logoSize: "w-[32px]",
        caption: "text-[#424242] dark:text-[#abc2d3]",
        name: "dark:text-[#abc2d3]",
    },
    gradient: {
        root: "bg-gradient-to-t from-pink-600 to-pink-300",
        logo: WHITE_LOGO,
        logoSize: "w-[35px]",
        caption: "text-white",
        name: "text-white",
    },
};

/** A "Download on the App Store" link styled as a store badge. */
export const AppStoreButton = ({
    href,
    variant = "solid",
    caption = "Download on the",
    storeName = "App Store",
    logoSrc,
    className = "",
    ...props
}: AppStoreButtonProps) => {
    const style = styles[variant];

    return (
        <a href={href} className={`px-6 py-2 rounded-md flex items-center gap-[17px] ${style.root} ${className}`} {...props}>
            {/* The text already names the store, so the logo is decorative. */}
            <img src={logoSrc ?? style.logo} alt="" aria-hidden className={style.logoSize}/>
            <span className="block text-center">
                <span className={`text-[0.8rem] font-[500] ${style.caption}`}>{caption}</span>
                <span className={`block text-[1.5rem] font-[500] leading-[20px] mb-2 ${style.name}`}>{storeName}</span>
            </span>
        </a>
    );
};
