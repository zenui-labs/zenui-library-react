import type {ComponentType, ReactNode} from "react";
import {RxCross2} from "react-icons/rx";

export type IconChipVariant = "success" | "accent" | "neutral";

export interface IconChipProps {
    children: ReactNode;
    /** Icon shown before the label. */
    icon?: ComponentType<{className?: string}>;
    variant?: IconChipVariant;
    /** Shows a remove button after the label and calls this when it is pressed. */
    onDismiss?: () => void;
    /** Screen reader label for the remove button. */
    dismissLabel?: string;
    className?: string;
}

// Chip colors and icon styles for each variant. Full class names keep Tailwind able to find them.
const variants: Record<IconChipVariant, {chip: string; icon: string}> = {
    success: {
        chip: "dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964]",
        icon: "p-0.5 text-[1.1rem] rounded-full bg-[#18c964] text-[#fff]",
    },
    accent: {
        chip: "bg-[#e4d4f4] dark:bg-purple-700/30 text-[#7828c8]",
        icon: "text-[1.3rem] text-[#7828c8]",
    },
    neutral: {
        chip: "border dark:border-slate-600 dark:text-[#abc2d3] border-[#e5eaf2] text-[#424242]",
        icon: "text-[1.3rem] dark:text-[#abc2d3] text-[#424242]",
    },
};

/** A rounded chip with an optional leading icon and an optional remove button. */
export const IconChip = ({
    children,
    icon: Icon,
    variant = "neutral",
    onDismiss,
    dismissLabel = "Remove",
    className = "",
}: IconChipProps) => {
    const styles = variants[variant];

    return (
        <span
            className={`px-4 py-1.5 ${styles.chip} rounded-full text-[0.9rem] font-[500] flex items-center gap-2 ${className}`}
        >
            {Icon && <Icon className={styles.icon}/>}
            {children}
            {onDismiss && (
                <button type="button" onClick={onDismiss} aria-label={dismissLabel} className="rounded-full">
                    <RxCross2 className="text-[1.1rem] text-[#fff] rounded-full p-0.5 dark:bg-slate-700 bg-[#424242]"/>
                </button>
            )}
        </span>
    );
};
