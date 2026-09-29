import type {ButtonHTMLAttributes} from "react";

export type GoogleLoginButtonVariant = "outline" | "logo-box" | "logo-circle";

export interface GoogleLoginButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** "outline" is a bordered button, "logo-box" and "logo-circle" put the logo on a white tile on a blue button. */
    variant?: GoogleLoginButtonVariant;
    /** Image URL of the Google logo. */
    logoSrc?: string;
    logoAlt?: string;
}

const GOOGLE_LOGO = "https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png";

const variantClasses: Record<GoogleLoginButtonVariant, string> = {
    outline:
        "border border-[#e5eaf2] dark:border-slate-600 dark:text-[#abc2d3] py-2 px-4 text-[#424242] hover:bg-gray-50",
    "logo-box": "bg-[#3B9DF8] text-white py-1 pl-1 pr-4 hover:bg-blue-500",
    "logo-circle": "bg-[#3B9DF8] text-white py-[5px] pl-[5px] pr-4 hover:bg-blue-500",
};

const logoWrapperClasses: Record<Exclude<GoogleLoginButtonVariant, "outline">, string> = {
    "logo-box": "py-2 px-2.5 rounded-l-md bg-white",
    "logo-circle": "p-2 rounded-full bg-white",
};

/** A "Sign in with Google" button in three styles. The label defaults to "Sign in with Google". */
export const GoogleLoginButton = ({
    variant = "outline",
    logoSrc = GOOGLE_LOGO,
    logoAlt = "Google logo",
    type = "button",
    className = "",
    children = "Sign in with Google",
    ...props
}: GoogleLoginButtonProps) => {
    const logo = <img src={logoSrc} alt={logoAlt} className="w-[23px]"/>;

    return (
        <button
            type={type}
            className={`rounded-md flex items-center gap-[10px] text-[1rem] transition-all duration-200 ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {variant === "outline" ? logo : <span className={logoWrapperClasses[variant]}>{logo}</span>}
            {children}
        </button>
    );
};
