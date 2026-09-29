import "react";

// Allow CSS custom properties such as `--marquee-duration` in style objects.
declare module "react" {
    interface CSSProperties {
        [key: `--${string}`]: string | number | undefined;
    }
}
