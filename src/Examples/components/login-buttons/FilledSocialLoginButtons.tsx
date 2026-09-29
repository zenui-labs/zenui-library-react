import type {ButtonHTMLAttributes, CSSProperties} from "react";

export interface SocialProvider {
    /** Provider name shown after the label prefix, for example "GitHub". */
    name: string;
    /** Image URL of a logo that reads on the brand color. */
    logoSrc: string;
    /** Brand color used as the button background. */
    color: string;
    /** Extra classes for the button, for example padding or a dark mode background. */
    className?: string;
    /** Classes for the logo image. Defaults to "w-[25px]". */
    logoClassName?: string;
}

export interface FilledSocialLoginButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
    provider: SocialProvider;
    /** Text before the provider name. */
    labelPrefix?: string;
}

// Passes the brand color to the Tailwind classes through a CSS variable, so dark: classes can still override it.
const withBrand = (color: string, style?: CSSProperties): CSSProperties & Record<"--brand", string> => ({
    ...style,
    "--brand": color,
});

/** A single login button filled with the provider's brand color. */
export const FilledSocialLoginButton = ({
    provider,
    labelPrefix = "Continue with",
    type = "button",
    className = "",
    style,
    ...props
}: FilledSocialLoginButtonProps) => (
    <button
        type={type}
        className={`bg-[color:var(--brand)] text-white rounded-md flex items-center gap-[10px] text-[1rem] ${provider.className ?? "py-[11px] px-4"} ${className}`}
        style={withBrand(provider.color, style)}
        {...props}
    >
        <img src={provider.logoSrc} alt={`${provider.name} logo`} className={provider.logoClassName ?? "w-[25px]"}/>
        {labelPrefix} {provider.name}
    </button>
);

export interface FilledSocialLoginButtonsProps {
    providers: SocialProvider[];
    labelPrefix?: string;
    /** Called with the provider whose button was clicked. */
    onSelect?: (provider: SocialProvider) => void;
    className?: string;
}

/** A stack of social login buttons, each filled with its provider's brand color. */
export const FilledSocialLoginButtons = ({providers, labelPrefix, onSelect, className = ""}: FilledSocialLoginButtonsProps) => (
    <div className={`flex flex-col flex-wrap items-center gap-5 justify-center ${className}`}>
        {providers.map((provider) => (
            <FilledSocialLoginButton
                key={provider.name}
                provider={provider}
                labelPrefix={labelPrefix}
                onClick={() => onSelect?.(provider)}
            />
        ))}
    </div>
);
