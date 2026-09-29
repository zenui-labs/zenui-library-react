import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface ClickFeedbackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Background color of the button. */
    accentColor?: string;
}

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

const base =
    "px-6 py-3 bg-[color:var(--accent)] border-none outline-none text-white text-[1rem] rounded focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2";

/** Shrinks slightly while pressed. */
export const ScalePressButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: ClickFeedbackButtonProps) => (
    <button
        type={type}
        className={`${base} active:scale-[0.9] transition-all duration-300 ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);

/** Flashes a white layer across the button while pressed. */
export const FlashPressButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: ClickFeedbackButtonProps) => (
    <button
        type={type}
        className={`${base} transition-all duration-500 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#ffffffb4] before:translate-x-[-150px] before:rounded overflow-hidden active:before:animate-ping active:before:translate-x-[0px] ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);
