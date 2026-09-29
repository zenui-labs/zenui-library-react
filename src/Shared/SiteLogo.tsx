import {Link} from "react-router-dom";
import {cn} from "@utils/Style.ts";

// Full ZenUI logo (mark + wordmark). The navy part of the artwork is lifted in dark mode so it stays readable.
const SiteLogo = ({className, size = "md"}: {className?: string; size?: "md" | "lg"}) => (
    <Link to="/" aria-label="ZenUI home" className={cn("flex shrink-0 items-center", className)}>
        <img
            src="/zenui-logo.png"
            alt="ZenUI"
            width={679}
            height={134}
            className={cn(
                "w-auto dark:brightness-[1.9] dark:saturate-[1.15]",
                size === "lg" ? "h-8" : "h-[18px]"
            )}
        />
    </Link>
);

export default SiteLogo;
