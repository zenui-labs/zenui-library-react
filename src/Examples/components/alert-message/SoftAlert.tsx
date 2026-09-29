import type {ComponentType, ReactNode} from "react";
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";

export type AlertVariant = "success" | "info" | "error" | "warning";

type IconComponent = ComponentType<{className?: string}>;

const VARIANTS: Record<AlertVariant, {icon: IconComponent; box: string; text: string}> = {
    success: {icon: IoCheckmarkDoneCircleOutline, box: "dark:bg-green-800/40 bg-[#edf7ed]", text: "text-[#418944] dark:text-green-500"},
    info: {icon: MdOutlineInfo, box: "dark:bg-blue-800/40 bg-[#e5f6fd]", text: "text-[#2d9dda] dark:text-blue-500"},
    error: {icon: MdErrorOutline, box: "dark:bg-red-800/40 bg-[#fdeded]", text: "text-[#d74242] dark:text-red-500"},
    warning: {icon: IoWarningOutline, box: "dark:bg-orange-800/40 bg-[#fff4e5]", text: "text-[#f18831] dark:text-orange-500"},
};

export interface SoftAlertProps {
    variant: AlertVariant;
    message: ReactNode;
    /** Replaces the variant's default icon. */
    icon?: IconComponent;
    className?: string;
}

/** An alert with a tinted background and matching text color for each variant. */
export const SoftAlert = ({variant, message, icon, className = ""}: SoftAlertProps) => {
    const style = VARIANTS[variant];
    const Icon = icon ?? style.icon;

    return (
        <div className={`p-3 flex items-center gap-3 ${style.box} rounded ${className}`}>
            <Icon className={`${style.text} text-[1.5rem] shrink-0`}/>
            <p className={`${style.text} text-[1rem]`}>{message}</p>
        </div>
    );
};
