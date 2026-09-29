import type {ButtonHTMLAttributes, ComponentType, CSSProperties} from "react";

export interface SlideRevealButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Border, label and fill color. */
    accentColor?: string;
    /** Icon that slides in over the label on hover. */
    icon?: ComponentType<{className?: string}>;
}

const ArrowRightIcon = ({className}: {className?: string}) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
    </svg>
);

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

/** On hover a filled panel with an icon slides in from the left and pushes the label out to the right. */
export const SlideRevealButton = ({
    accentColor = "#3B9DF8",
    icon: Icon = ArrowRightIcon,
    type = "button",
    className = "",
    style,
    children,
    ...props
}: SlideRevealButtonProps) => (
    <button
        type={type}
        className={`relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-[color:var(--accent)] transition duration-300 ease-out border-2 border-[color:var(--accent)] rounded-full shadow-md group ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <span
            className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[color:var(--accent)] group-hover:translate-x-0"
            aria-hidden="true"
        >
            <Icon className="w-6 h-6"/>
        </span>
        <span className="absolute flex items-center justify-center w-full h-full text-[color:var(--accent)] transition-all duration-300 transform group-hover:translate-x-full">
            {children}
        </span>
        {/* Invisible copy of the label that gives the button its size. */}
        <span className="relative invisible">{children}</span>
    </button>
);
