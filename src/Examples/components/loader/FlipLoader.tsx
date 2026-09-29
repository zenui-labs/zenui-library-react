import type {CSSProperties} from "react";

type LoaderStyle = CSSProperties & Record<`--${string}`, string>;

const keyframes = `
@keyframes flip-loader-tile {
    0% {
        transform: perspective(var(--flip-loader-size)) rotateX(-90deg);
    }
    50%, 75% {
        transform: perspective(var(--flip-loader-size)) rotateX(0);
    }
    100% {
        opacity: 0;
        transform: perspective(var(--flip-loader-size)) rotateX(0);
    }
}
`;

export interface FlipLoaderProps {
    color?: string;
    /** Width and height of the grid in pixels. */
    size?: number;
    /** Seconds for one tile to flip in and fade out. */
    duration?: number;
    /** Seconds between one tile and the next. */
    stagger?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** A three by three grid of tiles that flip in one after another and fade out. */
export const FlipLoader = ({
    color = "#3B9DF8",
    size = 67.2,
    duration = 1.5,
    stagger = 0.1,
    label = "Loading",
    className = "",
}: FlipLoaderProps) => {
    const style: LoaderStyle = {"--flip-loader-size": `${size}px`, width: size, height: size};

    return (
        <div role="status" className={`inline-block ${className}`}>
            <div aria-hidden className="grid grid-cols-3 grid-rows-3" style={style}>
                {Array.from({length: 9}, (_, index) => (
                    <div
                        key={index}
                        style={{
                            backgroundColor: color,
                            animation: `flip-loader-tile ${duration}s ${index * stagger}s infinite backwards`,
                        }}
                    />
                ))}
            </div>
            <span className="sr-only">{label}</span>
            <style>{keyframes}</style>
        </div>
    );
};
