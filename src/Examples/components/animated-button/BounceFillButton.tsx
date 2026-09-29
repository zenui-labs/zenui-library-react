import type {ButtonHTMLAttributes, ComponentType, CSSProperties} from "react";

export interface BounceFillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Border, label and fill color. */
    accentColor?: string;
    /** Icon that slides in from the right on hover. */
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

/** The fill opens from the middle to cover the pill on hover, and an icon slides in beside the label. */
export const BounceFillButton = ({
    accentColor = "#3B9DF8",
    icon: Icon = ArrowRightIcon,
    type = "button",
    className = "",
    style,
    children,
    ...props
}: BounceFillButtonProps) => (
    <button
        type={type}
        className={`relative inline-flex items-center px-8 py-2.5 overflow-hidden text-lg font-medium text-[color:var(--accent)] border-2 border-[color:var(--accent)] rounded-full hover:text-white group hover:bg-gray-50 ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <span className="absolute left-0 block w-full h-0 transition-all bg-[color:var(--accent)] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-[400ms]"/>
        <span
            className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0"
            aria-hidden="true"
        >
            <Icon className="w-5 h-5"/>
        </span>
        <span className="relative text-[1rem] group-hover:pr-4 transition-all duration-[400ms]">{children}</span>
    </button>
);
