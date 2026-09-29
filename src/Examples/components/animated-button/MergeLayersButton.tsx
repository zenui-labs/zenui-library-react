import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface MergeLayersButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Color of the layer offset to the top left. */
    accentColor?: string;
    /** Color of the layer offset to the bottom right. It blends with the first layer where they overlap. */
    secondaryColor?: string;
}

// Passes both layer colors to the Tailwind classes through CSS variables.
const withColors = (
    accent: string,
    secondary: string,
    style?: CSSProperties,
): CSSProperties & Record<"--accent" | "--accent-secondary", string> => ({
    ...style,
    "--accent": accent,
    "--accent-secondary": secondary,
});

/** Two offset color layers slide together into one shape on hover. */
export const MergeLayersButton = ({
    accentColor = "#3B9DF8",
    secondaryColor = "#9333ea",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: MergeLayersButtonProps) => (
    <button
        type={type}
        className={`relative px-6 py-3 font-bold text-white rounded-lg group ${className}`}
        style={withColors(accentColor, secondaryColor, style)}
        {...props}
    >
        <span className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-[color:var(--accent)] opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"/>
        <span className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-[color:var(--accent-secondary)] opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"/>
        <span className="relative">{children}</span>
    </button>
);
