import type {ReactNode} from "react";
import {RxCross1} from "react-icons/rx";

export type NotificationVariant = "success" | "info" | "warning" | "error";

const variantClasses: Record<NotificationVariant, {box: string; icon: string}> = {
    success: {box: "border-[#418944] text-[#418944]", icon: "text-[#418944]"},
    info: {box: "border-[#2d9dda] text-[#2d9dda]", icon: "text-[#2d9dda]"},
    warning: {box: "border-[#f18831] text-[#f18831]", icon: "text-[#f18831]"},
    error: {box: "border-[#d74242] text-[#d74242]", icon: "text-[#ca3434]"},
};

export interface DismissibleNotificationProps {
    open: boolean;
    /** Called when the close button is clicked. Set `open` to false here. */
    onClose: () => void;
    children: ReactNode;
    /** Sets the border and text color. */
    variant?: NotificationVariant;
    /** Accessible name for the close button. */
    closeLabel?: string;
    className?: string;
}

/**
 * A bordered message with a close button that slides in from the right. Place it inside a
 * `relative overflow-hidden` element so it stays hidden off to the side while closed.
 */
export const DismissibleNotification = ({
    open,
    onClose,
    children,
    variant = "info",
    closeLabel = "Close notification",
    className = "",
}: DismissibleNotificationProps) => {
    const styles = variantClasses[variant];

    return (
        <div
            role="status"
            className={`${
                open ? "translate-x-[0px]" : "invisible translate-x-[600px]"
            } absolute right-5 top-5 flex items-center justify-between gap-6 rounded border px-6 py-2 text-center transition-all duration-300 ${styles.box} ${className}`}
        >
            <p>{children}</p>
            <button type="button" onClick={onClose} aria-label={closeLabel} className="cursor-pointer rounded">
                <RxCross1 className={`text-[1rem] ${styles.icon}`} aria-hidden/>
            </button>
        </div>
    );
};
