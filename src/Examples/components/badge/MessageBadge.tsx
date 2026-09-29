import type {ComponentType} from "react";
import {MdOutlineMail} from "react-icons/md";

export interface MessageBadgeProps {
    /** Number of new messages. Leave it out to show a plain dot, and pass 0 to hide the badge. */
    count?: number;
    /** Counts above this show as "99+". */
    max?: number;
    /** Name read by screen readers, for example "Messages". */
    label?: string;
    /** Word after the count for screen readers. */
    newLabel?: string;
    icon?: ComponentType<{className?: string}>;
    className?: string;
}

/** A mail icon with a count bubble or a dot that flags new messages. */
export const MessageBadge = ({count, max = 99, label = "Messages", newLabel = "new", icon: Icon = MdOutlineMail, className = ""}: MessageBadgeProps) => {
    const srText = count === undefined ? `${label}, ${newLabel}` : count > 0 ? `${label}, ${count} ${newLabel}` : label;

    // Dot variant: the marker is drawn with a before pseudo element.
    if (count === undefined) {
        return (
            <div
                className={`relative before:absolute before:w-[20px] before:h-[20px] before:rounded-full before:top-[-2%] before:right-[-5%] before:border-[2px] before:border-white dark:before:border-[#020617] before:bg-[#3B9DF8] ${className}`}
            >
                <Icon className="text-[2.7rem] dark:text-[#abc2d3]" aria-hidden/>
                <span className="sr-only">{srText}</span>
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <Icon className="text-[2.7rem] dark:text-[#abc2d3]" aria-hidden/>
            <span className="sr-only">{srText}</span>
            {count > 0 && (
                <div className="absolute top-[-10%] right-[-15%] text-white min-w-[20px] min-h-[20px] text-center" aria-hidden>
                    <span className="text-[0.8rem] bg-[#3B9DF8] dark:border-[#020617] py-1 px-1 rounded-full w-full h-full border-[2px] border-white">
                        {count > max ? `${max}+` : count}
                    </span>
                </div>
            )}
        </div>
    );
};
