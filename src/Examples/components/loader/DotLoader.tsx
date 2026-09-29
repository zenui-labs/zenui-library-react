import type {CSSProperties} from "react";

type LoaderStyle = CSSProperties & Record<`--${string}`, string>;

const keyframes = `
@keyframes dot-loader-turn {
    to {
        transform: rotate(0.5turn);
    }
}
`;

export interface DotLoaderProps {
    color?: string;
    /** Width and height in pixels. The dots scale with it. */
    size?: number;
    /** Seconds per half turn. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** Four dots in a cross that turn together with an easing pause between turns. */
export const DotLoader = ({
    color = "#3B9DF8",
    size = 56,
    duration = 1,
    label = "Loading",
    className = "",
}: DotLoaderProps) => {
    const dot = (size * 13.4) / 56;
    const style: LoaderStyle = {
        "--c": `radial-gradient(farthest-side, ${color} 92%, transparent)`,
        width: size,
        height: size,
        background: "var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%, var(--c) 0 50%",
        backgroundSize: `${dot}px ${dot}px`,
        backgroundRepeat: "no-repeat",
        animation: `dot-loader-turn ${duration}s infinite`,
    };

    return (
        <div role="status" className={`inline-flex ${className}`}>
            <span aria-hidden className="block" style={style}/>
            <span className="sr-only">{label}</span>
            <style>{keyframes}</style>
        </div>
    );
};
