import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface BorderHoverButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Color of the border that draws in on hover. */
    accentColor?: string;
}

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** Two borders grow from opposite corners until they frame the button. */
export const CornerDrawButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: BorderHoverButtonProps) => (
    <button
        type={type}
        className={`px-8 py-3 relative shadow-lg before:absolute before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent dark:bg-slate-800 dark:text-slate-300 hover:before:w-full hover:before:h-full hover:before:border-[color:var(--accent)] hover:before:transition-all hover:before:duration-500 after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-[color:var(--accent)] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500 ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);

/** Two borders grow from corners set just outside the button. */
export const OffsetCornerButton = ({
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: BorderHoverButtonProps) => (
    // `isolate` keeps the borders, which sit on a negative z-index, above the page background.
    <button
        type={type}
        className={`py-2 px-6 shadow-lg isolate before:block before:-left-1 before:-top-1 before:border-t-[4px] before:invisible before:hover:visible before:border-l-[4px] before:border-[color:var(--accent)] before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%] dark:bg-slate-800 dark:text-slate-200 before:duration-500 before:-z-40 after:block after:-right-1 after:-bottom-1 after:border-r-[4px] after:border-b-[4px] after:border-[color:var(--accent)] after:invisible after:hover:visible after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-white relative ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        {children}
    </button>
);
