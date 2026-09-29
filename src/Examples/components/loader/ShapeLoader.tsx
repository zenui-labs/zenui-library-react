import type {CSSProperties} from "react";

type LoaderStyle = CSSProperties & Record<`--${string}`, string>;

const keyframes = `
@keyframes shape-loader-morph {
    33% {
        inset: var(--shape-loader-inset);
        transform: rotate(0deg);
    }
    66% {
        inset: var(--shape-loader-inset);
        transform: rotate(90deg);
    }
    100% {
        inset: 0;
        transform: rotate(90deg);
    }
}
`;

export interface ShapeLoaderProps {
    color?: string;
    /** Width and height in pixels at rest. The shape grows past this box while it animates. */
    size?: number;
    /** Seconds for one full cycle. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** A circle that splits into four corner pieces, turns a quarter and closes back into a circle. */
export const ShapeLoader = ({
    color = "#3B9DF8",
    size = 44.8,
    duration = 1.5,
    label = "Loading",
    className = "",
}: ShapeLoaderProps) => {
    // Measurements scale with the size, matching the original 44.8px design.
    const radius = size * 0.225;
    const style: LoaderStyle = {
        "--shape-loader-inset": `${-size / 4}px`,
        background: [
            `radial-gradient(${radius}px at bottom right, transparent 94%, currentColor) top left`,
            `radial-gradient(${radius}px at bottom left, transparent 94%, currentColor) top right`,
            `radial-gradient(${radius}px at top right, transparent 94%, currentColor) bottom left`,
            `radial-gradient(${radius}px at top left, transparent 94%, currentColor) bottom right`,
        ].join(", "),
        backgroundSize: `${size / 2}px ${size / 2}px`,
        backgroundRepeat: "no-repeat",
        animation: `shape-loader-morph ${duration}s infinite cubic-bezier(0.3,1,0,1)`,
    };

    return (
        <div role="status" className={`relative ${className}`} style={{width: size, height: size, color}}>
            <span aria-hidden className="absolute inset-0 rounded-full" style={style}/>
            <span className="sr-only">{label}</span>
            <style>{keyframes}</style>
        </div>
    );
};
