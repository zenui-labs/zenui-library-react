import type {ReactNode} from "react";

export interface BorderNotificationProps {
    open: boolean;
    /** Called when the notification is clicked. Set `open` to false here. */
    onClose: () => void;
    children: ReactNode;
    /** Border color, any CSS color. */
    accentColor?: string;
    className?: string;
}

/**
 * A bordered message that slides in from the right and closes when clicked. Place it inside a
 * `relative overflow-hidden` element so it stays hidden off to the side while closed.
 */
export const BorderNotification = ({open, onClose, children, accentColor = "#3B9DF8", className = ""}: BorderNotificationProps) => (
    <button
        type="button"
        onClick={onClose}
        className={`${
            open ? "translate-x-[0px]" : "invisible translate-x-[600px]"
        } absolute right-5 top-5 cursor-pointer rounded border px-6 py-2 text-center transition-all duration-300 dark:text-[#abc2d3] ${className}`}
        style={{borderColor: accentColor}}
    >
        {children}
    </button>
);
