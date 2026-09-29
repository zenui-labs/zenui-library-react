import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface OffsetLayerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Color of the offset edge, the label and the hover fill. */
    accentColor?: string;
}

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** A colored layer peeks out below and to the right, then slides under the button as it fills on hover. */
export const OffsetLayerButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: OffsetLayerButtonProps) => (
    <button
        type={type}
        className={`relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-[color:var(--accent)] rounded-md group-hover:mt-0 group-hover:ml-0"/>
        <span className="absolute inset-0 w-full h-full dark:bg-slate-800 bg-white rounded-md"/>
        <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-[color:var(--accent)] rounded-md opacity-0 group-hover:opacity-100"/>
        <span className="relative text-[color:var(--accent)] transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">
            {children}
        </span>
    </button>
);
