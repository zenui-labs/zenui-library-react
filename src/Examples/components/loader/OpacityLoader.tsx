export interface OpacityLoaderProps {
    color?: string;
    /** Seconds for one ring to grow and fade out. */
    duration?: number;
    /** Seconds before the inner ring starts. */
    innerDelay?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** Two nested rings that grow and fade out, like a pulse. */
export const OpacityLoader = ({
    color = "#3b9df8",
    duration = 2,
    innerDelay = 3,
    label = "Loading",
    className = "",
}: OpacityLoaderProps) => (
    <div role="status" className={`inline-flex ${className}`}>
        <span
            aria-hidden
            className="flex h-7 w-7 animate-ping items-center justify-center rounded-full border-2"
            style={{borderColor: color, animationDuration: `${duration}s`, animationTimingFunction: "linear"}}
        >
            <span
                className="block h-5 w-5 animate-ping rounded-full border-2"
                style={{
                    borderColor: color,
                    animationDuration: `${duration}s`,
                    animationTimingFunction: "linear",
                    animationDelay: `${innerDelay}s`,
                }}
            />
        </span>
        <span className="sr-only">{label}</span>
    </div>
);
