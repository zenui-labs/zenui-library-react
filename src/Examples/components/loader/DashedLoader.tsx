export interface DashedLoaderProps {
    color?: string;
    /** Width and height in pixels. */
    size?: number;
    /** Width of the dashed border in pixels. */
    thickness?: number;
    /** Seconds per full turn. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** A thick dashed ring that spins in place. */
export const DashedLoader = ({
    color = "#3b9df8",
    size = 40,
    thickness = 8,
    duration = 1,
    label = "Loading",
    className = "",
}: DashedLoaderProps) => (
    <div role="status" className={`inline-flex ${className}`}>
        <span
            aria-hidden
            className="block animate-spin rounded-full border-dashed"
            style={{
                width: size,
                height: size,
                borderWidth: thickness,
                borderColor: color,
                animationDuration: `${duration}s`,
            }}
        />
        <span className="sr-only">{label}</span>
    </div>
);
