import type {CSSProperties} from "react";

type LoaderStyle = CSSProperties & Record<`--${string}`, string>;

const keyframes = `
@keyframes chase-loader-intro {
    from {
        box-shadow: 0 0 0 var(--chase-loader-spread) var(--chase-loader-color);
    }
}

@keyframes chase-loader-rotate {
    to {
        transform: rotate(360deg);
    }
}
`;

export interface ChaseLoaderProps {
    color?: string;
    /** Width and height of the ring in pixels. The orbiting dot sits outside this box. */
    size?: number;
    /** Seconds per full turn. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** Two rings, each with a dot above it, that rotate half a second apart so one dot chases the other. */
export const ChaseLoader = ({
    color = "#3B9DF8",
    size = 22.4,
    duration = 1.25,
    label = "Loading",
    className = "",
}: ChaseLoaderProps) => {
    // All measurements scale with the size, matching the original 22.4px design.
    const border = size * 0.25;
    const ringStyle: LoaderStyle = {
        "--chase-loader-spread": `${-border}px`,
        "--chase-loader-color": color,
        width: "100%",
        height: "100%",
        display: "block",
        border: `${border}px solid ${color}`,
        borderRadius: "50%",
        boxShadow: `0 ${-size * 1.5}px 0 ${-border}px ${color}`,
        position: "absolute",
    };

    return (
        <div role="status" className={`relative ${className}`} style={{width: size, height: size}}>
            <span
                aria-hidden
                style={{
                    ...ringStyle,
                    animation: `chase-loader-intro 0.5s backwards, chase-loader-rotate ${duration}s 0.5s infinite ease`,
                }}
            />
            <span aria-hidden style={{...ringStyle, animation: `chase-loader-rotate ${duration}s infinite ease`}}/>
            <span className="sr-only">{label}</span>
            <style>{keyframes}</style>
        </div>
    );
};
