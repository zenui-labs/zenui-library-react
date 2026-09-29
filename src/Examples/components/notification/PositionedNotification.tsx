import type {ReactNode} from "react";
import {RxCross1} from "react-icons/rx";

export type NotificationPlacement = "top" | "left" | "right" | "bottom";
export type NotificationVariant = "success" | "info" | "warning" | "error";

const placementClasses: Record<NotificationPlacement, {position: string; shown: string; hidden: string}> = {
    top: {position: "top-5 left-[30%]", shown: "translate-y-[0px]", hidden: "translate-y-[-150px]"},
    left: {position: "top-5 left-5", shown: "translate-x-[0px]", hidden: "translate-x-[-500px]"},
    right: {position: "top-5 right-5", shown: "translate-x-[0px]", hidden: "translate-x-[500px]"},
    bottom: {position: "bottom-0 left-[30%]", shown: "translate-y-[0px]", hidden: "translate-y-[150px]"},
};

const variantClasses: Record<NotificationVariant, {box: string; icon: string}> = {
    success: {box: "border-[#418944] text-[#418944]", icon: "text-[#418944]"},
    info: {box: "border-[#2d9dda] text-[#2d9dda]", icon: "text-[#2d9dda]"},
    warning: {box: "border-[#f18831] text-[#f18831]", icon: "text-[#f18831]"},
    error: {box: "border-[#d74242] text-[#d74242]", icon: "text-[#ca3434]"},
};

export interface PositionedNotificationProps {
    open: boolean;
    /** Called when the close button is clicked. Set `open` to false here. */
    onClose: () => void;
    children: ReactNode;
    /** The edge of the container the notification slides in from. */
    placement?: NotificationPlacement;
    /** Sets the border and text color. */
    variant?: NotificationVariant;
    /** Accessible name for the close button. */
    closeLabel?: string;
    className?: string;
}

/**
 * A dismissible message that slides in from the top, left, right or bottom edge. Place it inside a
 * `relative overflow-hidden` element so it stays hidden past that edge while closed.
 */
export const PositionedNotification = ({
    open,
    onClose,
    children,
    placement = "top",
    variant = "info",
    closeLabel = "Close notification",
    className = "",
}: PositionedNotificationProps) => {
    const position = placementClasses[placement];
    const styles = variantClasses[variant];

    return (
        <div
            role="status"
            className={`${
                open ? position.shown : `invisible ${position.hidden}`
            } absolute ${position.position} flex items-center justify-between gap-6 rounded border px-6 py-2 text-center transition-all duration-300 ${styles.box} ${className}`}
        >
            <p>{children}</p>
            <button type="button" onClick={onClose} aria-label={closeLabel} className="cursor-pointer rounded">
                <RxCross1 className={`text-[1rem] ${styles.icon}`} aria-hidden/>
            </button>
        </div>
    );
};
