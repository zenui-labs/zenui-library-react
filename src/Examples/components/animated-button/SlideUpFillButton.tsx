import type {ButtonHTMLAttributes, ComponentType, CSSProperties} from "react";

export interface SlideUpFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Fill, bar and label color. */
    accentColor?: string;
    /** Arrow that slides out to the right and back in from the left on hover. */
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

/** A bar at the bottom grows into a full background on hover while the arrow swaps sides. */
export const SlideUpFillButton = ({
    accentColor = "#3B9DF8",
    icon: Icon = ArrowRightIcon,
    type = "button",
    className = "",
    style,
    children,
    ...props
}: SlideUpFillButtonProps) => (
    <button
        type={type}
        className={`relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[color:var(--accent)] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-slate-800 group ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[color:var(--accent)] group-hover:h-full"/>
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12" aria-hidden="true">
            <Icon className="w-5 h-5 text-[color:var(--accent)]"/>
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200" aria-hidden="true">
            <Icon className="w-5 h-5 text-white"/>
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
            {children}
        </span>
    </button>
);
