import type {ButtonHTMLAttributes, ComponentType} from "react";
import {MdOutlineFileDownload} from "react-icons/md";

export type DownloadButtonVariant = "solid" | "outline" | "split" | "pill";

export interface DownloadButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * `solid`: filled with the icon first. `outline`: bordered with the icon last. `split`: filled with the icon
     * in a darker end cap. `pill`: bordered and fully rounded with the icon in a filled circle.
     */
    variant?: DownloadButtonVariant;
    icon?: ComponentType<{className?: string}>;
}

/** A download button in four layouts. The label defaults to "Download". */
export const DownloadButton = ({
    variant = "solid",
    icon: Icon = MdOutlineFileDownload,
    type = "button",
    className = "",
    children = "Download",
    ...props
}: DownloadButtonProps) => {
    if (variant === "split") {
        return (
            <button type={type} className={`bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center ${className}`} {...props}>
                <span className="px-4 py-2">{children}</span>
                <span className="w-[40px] h-[43px] rounded-r-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center" aria-hidden>
                    <Icon className="text-[1.4rem]"/>
                </span>
            </button>
        );
    }

    if (variant === "pill") {
        return (
            <button
                type={type}
                className={`border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-full flex items-center ${className}`}
                {...props}
            >
                <span className="w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1" aria-hidden>
                    <Icon className="text-[1.4rem] text-white"/>
                </span>
                <span className="pr-4 pl-2 py-2">{children}</span>
            </button>
        );
    }

    if (variant === "outline") {
        return (
            <button
                type={type}
                className={`px-4 py-2 border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-md flex items-center gap-[7px] ${className}`}
                {...props}
            >
                {children}
                <Icon className="text-[1.4rem]"/>
            </button>
        );
    }

    return (
        <button
            type={type}
            className={`px-4 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center gap-[7px] ${className}`}
            {...props}
        >
            <Icon className="text-[1.4rem]"/>
            {children}
        </button>
    );
};
