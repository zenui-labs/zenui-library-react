import type {ButtonHTMLAttributes} from "react";

export type BasicButtonVariant = "solid" | "outline";
export type BasicButtonTone = "blue" | "dark" | "red";

export interface BasicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** `solid` fills the button and clears it on hover; `outline` does the opposite. */
    variant?: BasicButtonVariant;
    tone?: BasicButtonTone;
}

const base = "px-6 py-2 border transition duration-300 rounded";

const styles: Record<BasicButtonTone, Record<BasicButtonVariant, string>> = {
    blue: {
        solid: "border-[#3B9DF8] bg-[#3B9DF8] text-white hover:bg-white hover:text-[#3B9DF8] dark:hover:bg-transparent",
        outline: "border-[#3B9DF8] hover:bg-[#3B9DF8] text-[#3B9DF8] hover:text-white",
    },
    dark: {
        solid: "dark:border-slate-800 dark:text-[#abc2d3] dark:bg-slate-800 dark:hover:bg-transparent dark:hover:text-[#abc2d3] border-[#3e3939] bg-[#000000] text-white hover:bg-white hover:text-[#000]",
        outline: "dark:border-slate-800 dark:text-[#abc2d3] dark:hover:bg-slate-800 border-[#3e3939] hover:bg-[#000000] text-[#000] hover:text-white",
    },
    red: {
        solid: "border-[#9d3533] bg-[#DE3B37] text-white hover:bg-white hover:text-[#000] dark:hover:bg-transparent dark:hover:text-[#abc2d3]",
        outline: "dark:text-[#abc2d3] border-[#9d3533] hover:bg-[#DE3B37] text-[#000] hover:text-white",
    },
};

/** A plain rectangular button in a solid or outline style and one of three color tones. */
export const BasicButton = ({
    variant = "solid",
    tone = "blue",
    type = "button",
    className = "",
    children,
    ...props
}: BasicButtonProps) => (
    <button type={type} className={`${base} ${styles[tone][variant]} ${className}`} {...props}>
        {children}
    </button>
);
