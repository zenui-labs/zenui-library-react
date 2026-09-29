import type {ButtonHTMLAttributes} from "react";

export type AppleLoginButtonVariant = "solid" | "outline";

export interface AppleLoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** "solid" is a black button with a white logo, "outline" a bordered button with a black logo. */
    variant?: AppleLoginButtonVariant;
    /** Image URL of the Apple logo. Defaults to a white logo for "solid" and a black one for "outline". */
    logoSrc?: string;
    logoAlt?: string;
}

const APPLE_LOGOS: Record<AppleLoginButtonVariant, string> = {
    solid: "https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png",
    outline: "https://i.ibb.co/6NFjc6z/download-removebg-preview.png",
};

const variantClasses: Record<AppleLoginButtonVariant, string> = {
    solid: "bg-black text-white dark:bg-slate-800",
    outline:
        "border border-[#e5eaf2] dark:border-slate-600 dark:text-[#abc2d3] text-[#424242] hover:bg-gray-50 transition-all duration-200",
};

/** A "Continue with Apple" button in a solid or outline style. The label defaults to "Continue with Apple". */
export const AppleLoginButton = ({
    variant = "solid",
    logoSrc,
    logoAlt = "Apple logo",
    type = "button",
    className = "",
    children = "Continue with Apple",
    ...props
}: AppleLoginButtonProps) => (
    <button
        type={type}
        className={`rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] ${variantClasses[variant]} ${className}`}
        {...props}
    >
        <img src={logoSrc ?? APPLE_LOGOS[variant]} alt={logoAlt} className="w-[23px]"/>
        {children}
    </button>
);
