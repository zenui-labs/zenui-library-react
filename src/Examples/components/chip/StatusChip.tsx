import type {ComponentType, ReactNode} from "react";

export type StatusChipTone = "warning" | "info" | "danger" | "highlight";

export interface StatusChipProps {
    children: ReactNode;
    tone?: StatusChipTone;
    icon?: ComponentType<{className?: string}>;
    /** Places the icon before or after the label. */
    iconPosition?: "start" | "end";
    className?: string;
}

// Chip colors and icon styles for each tone. Full class names keep Tailwind able to find them.
const tones: Record<StatusChipTone, {chip: string; icon: string}> = {
    warning: {chip: "dark:bg-orange-700/30 bg-orange-50 text-orange-400", icon: "text-[1.1rem] text-orange-400"},
    info: {chip: "dark:bg-blue-600/20 bg-blue-50 text-blue-800", icon: "text-[1.1rem] text-blue-800"},
    danger: {chip: "dark:bg-red-700/30 bg-red-100 text-red-700", icon: "text-[1rem] text-red-700"},
    highlight: {chip: "bg-blue-500 text-white", icon: "text-[1rem] text-white"},
};

/** A colored chip for status labels and tags, with an optional icon before or after the label. */
export const StatusChip = ({children, tone = "info", icon: Icon, iconPosition = "start", className = ""}: StatusChipProps) => {
    const styles = tones[tone];
    const icon = Icon ? <Icon className={styles.icon}/> : null;

    return (
        <span className={`px-4 py-1.5 ${styles.chip} rounded-full text-[0.9rem] font-[500] flex items-center gap-1 ${className}`}>
            {iconPosition === "start" && icon}
            {children}
            {iconPosition === "end" && icon}
        </span>
    );
};
