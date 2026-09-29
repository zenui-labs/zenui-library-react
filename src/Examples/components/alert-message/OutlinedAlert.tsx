import type {ComponentType, ReactNode} from "react";
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";

export type AlertVariant = "success" | "info" | "error" | "warning";

type IconComponent = ComponentType<{className?: string}>;

const VARIANTS: Record<AlertVariant, {icon: IconComponent; border: string; text: string}> = {
    success: {icon: IoCheckmarkDoneCircleOutline, border: "border-[#418944]", text: "text-[#418944]"},
    info: {icon: MdOutlineInfo, border: "border-[#2d9dda]", text: "text-[#2d9dda]"},
    error: {icon: MdErrorOutline, border: "border-[#d74242]", text: "text-[#d74242]"},
    warning: {icon: IoWarningOutline, border: "border-[#f18831]", text: "text-[#f18831]"},
};

export interface OutlinedAlertProps {
    variant: AlertVariant;
    message: ReactNode;
    /** Replaces the variant's default icon. */
    icon?: IconComponent;
    className?: string;
}

/** An alert with a colored border and no background, so it sits on light and dark surfaces. */
export const OutlinedAlert = ({variant, message, icon, className = ""}: OutlinedAlertProps) => {
    const style = VARIANTS[variant];
    const Icon = icon ?? style.icon;

    return (
        <div className={`p-3 flex items-center gap-3 border-[2px] ${style.border} rounded ${className}`}>
            <Icon className={`${style.text} text-[1.5rem] shrink-0`}/>
            <p className={`${style.text} text-[1rem]`}>{message}</p>
        </div>
    );
};
