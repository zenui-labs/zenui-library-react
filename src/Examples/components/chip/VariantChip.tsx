import type {ReactNode} from "react";

export type VariantChipVariant = "filled" | "outlined" | "soft";

export interface VariantChipProps {
    children: ReactNode;
    /** "filled" has a blue background, "outlined" a blue border and "soft" a light gray background. */
    variant?: VariantChipVariant;
    className?: string;
}

// Full class names keep Tailwind able to find them.
const variants: Record<VariantChipVariant, string> = {
    filled: "bg-[#3B9DF8] text-[#fff]",
    outlined: "border border-[#3B9DF8] text-[#3B9DF8]",
    soft: "bg-[#e9e9e9] dark:bg-slate-700 dark:text-[#abc2d3] text-[#9c9c9c]",
};

/** A rounded chip in a filled, outlined or soft style. */
export const VariantChip = ({children, variant = "filled", className = ""}: VariantChipProps) => (
    <span className={`inline-block px-6 py-1 ${variants[variant]} rounded-full text-[0.9rem] font-[500] ${className}`}>
        {children}
    </span>
);
