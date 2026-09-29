import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface SocialProvider {
    /** Provider name shown after the label prefix, for example "GitHub". */
    name: string;
    /** Image URL of the provider's logo in its brand color. */
    logoSrc: string;
    /** Brand color used for the border and the text. */
    color: string;
    /** Extra classes for the button, for example padding or dark mode colors. */
    className?: string;
    /** Classes for the logo image. Defaults to "w-[25px]". */
    logoClassName?: string;
}

export interface OutlinedSocialLoginButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    provider: SocialProvider;
    /** Text before the provider name. */
    labelPrefix?: string;
}

// Passes the brand color to the Tailwind classes through a CSS variable, so dark: classes can still override it.
const withBrand = (color: string, style?: CSSProperties): CSSProperties & Record<"--brand", string> => ({
    ...style,
    "--brand": color,
});

/** A single login button with a border and text in the provider's brand color. */
export const OutlinedSocialLoginButton = ({
    provider,
    labelPrefix = "Continue with",
    type = "button",
    className = "",
    style,
    ...props
}: OutlinedSocialLoginButtonProps) => (
    <button
        type={type}
        className={`border border-[color:var(--brand)] text-[color:var(--brand)] rounded-md flex items-center gap-[10px] text-[1rem] ${provider.className ?? "py-[11px] px-4"} ${className}`}
        style={withBrand(provider.color, style)}
        {...props}
    >
        <img src={provider.logoSrc} alt={`${provider.name} logo`} className={provider.logoClassName ?? "w-[25px]"}/>
        {labelPrefix} {provider.name}
    </button>
);

export interface OutlinedSocialLoginButtonsProps {
    providers: SocialProvider[];
    labelPrefix?: string;
    /** Called with the provider whose button was clicked. */
    onSelect?: (provider: SocialProvider) => void;
    className?: string;
}

/** A stack of outlined social login buttons in each provider's brand color. */
export const OutlinedSocialLoginButtons = ({providers, labelPrefix, onSelect, className = ""}: OutlinedSocialLoginButtonsProps) => (
    <div className={`flex flex-col flex-wrap items-center gap-5 justify-center ${className}`}>
        {providers.map((provider) => (
            <OutlinedSocialLoginButton
                key={provider.name}
                provider={provider}
                labelPrefix={labelPrefix}
                onClick={() => onSelect?.(provider)}
            />
        ))}
    </div>
);
