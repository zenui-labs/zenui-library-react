import type {ButtonHTMLAttributes, ComponentType, CSSProperties} from "react";

type Icon = ComponentType<{className?: string}>;

export type IconButtonVariant = "solid" | "outline";

// Passes the accent color to the Tailwind classes through a CSS variable.
const withAccent = (color: string, style?: CSSProperties): CSSProperties & Record<"--accent", string> => ({
    ...style,
    "--accent": color,
});

const variants: Record<IconButtonVariant, string> = {
    solid: "bg-[color:var(--accent)] text-white",
    outline: "border border-[color:var(--accent)] text-[color:var(--accent)]",
};

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
    icon: Icon;
    /** Accessible name, for example "Close" or "Delete". The button shows no text, so screen readers need it. */
    label: string;
    variant?: IconButtonVariant;
    shape?: "circle" | "square";
    /** Classes for the icon, for example a size like `text-[1.3rem]`. */
    iconClassName?: string;
    accentColor?: string;
}

/** A 40px button that shows only an icon. */
export const IconButton = ({
    icon: IconComponent,
    label,
    variant = "solid",
    shape = "circle",
    iconClassName = "",
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    ...props
}: IconButtonProps) => (
    <button
        type={type}
        aria-label={label}
        className={`${variants[variant]} w-[40px] h-[40px] ${shape === "circle" ? "rounded-full" : "rounded-md"} flex items-center justify-center ${className}`}
        style={withAccent(accentColor, style)}
        {...props}
    >
        <IconComponent className={iconClassName}/>
    </button>
);

export interface TextIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: Icon;
    /** Places the icon before or after the label. */
    iconPosition?: "start" | "end";
    variant?: IconButtonVariant;
    /** `pill` is fully rounded with slightly larger text. */
    shape?: "rounded" | "pill";
    /** Classes for the icon, for example a size like `text-[1.2rem]`. */
    iconClassName?: string;
    accentColor?: string;
}

/** A button with a text label and an icon on either side. */
export const TextIconButton = ({
    icon: IconComponent,
    iconPosition = "start",
    variant = "solid",
    shape = "rounded",
    iconClassName = "text-[1.1rem]",
    accentColor = "#3B9DF8",
    type = "button",
    className = "",
    style,
    children,
    ...props
}: TextIconButtonProps) => {
    const shapeClasses =
        shape === "pill"
            ? "rounded-full text-[1.1rem] gap-[10px]"
            : `rounded-md text-[1rem] ${iconPosition === "end" ? "gap-[12px]" : "gap-[8px]"}`;
    const icon = <IconComponent className={iconClassName}/>;

    return (
        <button
            type={type}
            className={`${variants[variant]} px-4 py-2 flex items-center ${shapeClasses} ${className}`}
            style={withAccent(accentColor, style)}
            {...props}
        >
            {iconPosition === "start" && icon}
            {children}
            {iconPosition === "end" && icon}
        </button>
    );
};
