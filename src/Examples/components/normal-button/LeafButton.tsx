import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface LeafButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** The rounded corner at the top. The opposite bottom corner is rounded too, which gives the leaf shape. */
    corner?: "top-right" | "top-left";
    /** Border and text color, and the fill on hover. */
    accentColor?: string;
}

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** An outline button with two opposite corners rounded. It fills with the accent color on hover. */
export const LeafButton = ({
    corner = "top-right",
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: LeafButtonProps) => (
    <button
        type={type}
        className={`py-2.5 px-6 border border-[color:var(--accent)] text-[color:var(--accent)] ${
            corner === "top-right" ? "rounded-tr-[30px] rounded-bl-[30px]" : "rounded-tl-[30px] rounded-br-[30px]"
        } hover:bg-[color:var(--accent)] hover:text-white transition-all duration-200 ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);
