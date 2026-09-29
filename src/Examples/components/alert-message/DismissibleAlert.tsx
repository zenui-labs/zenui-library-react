import {useState, type ComponentType, type ReactNode} from "react";
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";
import {HiOutlineXMark} from "react-icons/hi2";

export type AlertVariant = "success" | "info" | "error" | "warning";

type IconComponent = ComponentType<{className?: string}>;

const VARIANTS: Record<AlertVariant, {icon: IconComponent; box: string; text: string; hover: string}> = {
    success: {icon: IoCheckmarkDoneCircleOutline, box: "dark:bg-green-800/40 bg-[#edf7ed]", text: "text-[#418944] dark:text-green-500", hover: "hover:bg-[#41894317]"},
    info: {icon: MdOutlineInfo, box: "dark:bg-blue-800/40 bg-[#e5f6fd]", text: "text-[#2d9dda] dark:text-blue-500", hover: "hover:bg-[#2d9dda15]"},
    error: {icon: MdErrorOutline, box: "dark:bg-red-800/40 bg-[#fdeded]", text: "text-[#d74242] dark:text-red-500", hover: "hover:bg-[#d7424215]"},
    warning: {icon: IoWarningOutline, box: "dark:bg-orange-800/40 bg-[#fff4e5]", text: "text-[#f18831] dark:text-orange-500", hover: "hover:bg-[#f1873118]"},
};

export interface DismissibleAlertProps {
    variant: AlertVariant;
    message: ReactNode;
    /** Called after the close button hides the alert. */
    onDismiss?: () => void;
    /** Replaces the variant's default icon. */
    icon?: IconComponent;
    /** Accessible label for the close button. */
    dismissLabel?: string;
    className?: string;
}

/** An alert on a tinted background with a close button that hides it. */
export const DismissibleAlert = ({
    variant,
    message,
    onDismiss,
    icon,
    dismissLabel = "Dismiss alert",
    className = "",
}: DismissibleAlertProps) => {
    const [open, setOpen] = useState(true);
    const style = VARIANTS[variant];
    const Icon = icon ?? style.icon;

    if (!open) return null;

    return (
        <div className={`p-3 flex items-center justify-between gap-3 ${style.box} rounded ${className}`}>
            <div className="flex items-center gap-3">
                <Icon className={`${style.text} text-[1.5rem] shrink-0`}/>
                <p className={`${style.text} text-[1rem]`}>{message}</p>
            </div>
            <button
                type="button"
                aria-label={dismissLabel}
                onClick={() => {
                    setOpen(false);
                    onDismiss?.();
                }}
                className="flex shrink-0 rounded-full"
            >
                <HiOutlineXMark className={`${style.text} text-[1.8rem] p-1 rounded-full ${style.hover} active:scale-[0.9]`} aria-hidden/>
            </button>
        </div>
    );
};
