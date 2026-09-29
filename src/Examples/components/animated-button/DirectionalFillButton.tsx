import type {ButtonHTMLAttributes, CSSProperties} from "react";

/** Where the background fill slides in from. */
export type FillDirection = "left-bottom" | "right-top" | "left" | "right" | "top" | "bottom";

export interface DirectionalFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    direction?: FillDirection;
    /** Border and fill color. */
    accentColor?: string;
}

// Start position of the fill for each direction. It moves to the center on hover.
const directionClasses: Record<FillDirection, string> = {
    "left-bottom": "before:translate-x-[-200px] before:translate-y-12 hover:before:translate-x-0 hover:before:translate-y-0",
    "right-top": "before:translate-x-[200px] before:-translate-y-12 hover:before:translate-x-0 hover:before:-translate-y-0",
    left: "before:translate-x-[-200px] hover:before:translate-x-0",
    right: "before:translate-x-[200px] hover:before:translate-x-0",
    top: "before:translate-y-[-200px] hover:before:translate-y-0",
    bottom: "before:translate-y-[200px] hover:before:translate-y-0",
};

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** An outlined button whose background slides in from one side on hover. */
export const DirectionalFillButton = ({
    direction = "left",
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: DirectionalFillButtonProps) => (
    // `isolate` keeps the fill, which sits on a negative z-index, above the page background and below the label.
    <button
        type={type}
        className={`px-6 py-2 rounded-md border border-[color:var(--accent)] relative isolate overflow-hidden before:absolute before:z-[-1] before:transition before:duration-300 before:w-full before:h-full before:bg-[color:var(--accent)] before:top-0 before:left-0 hover:text-white dark:text-slate-200 dark:border-slate-700 dark:before:bg-slate-700 ${directionClasses[direction]} ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);
