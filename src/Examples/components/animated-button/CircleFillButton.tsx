import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface CircleFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Color of the circle that grows on hover. */
    accentColor?: string;
}

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** A circle grows from the center until it fills the button on hover. */
export const CircleFillButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: CircleFillButtonProps) => (
    <button
        type={type}
        className={`relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono dark:bg-slate-800 tracking-tighter text-white bg-gray-300 rounded-lg group ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-[color:var(--accent)] rounded-full group-hover:w-56 group-hover:h-56"/>
        <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"/>
        <span className="relative text-[#424242] dark:text-slate-200 group-hover:text-white">{children}</span>
    </button>
);
