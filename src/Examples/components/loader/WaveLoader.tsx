import type {CSSProperties} from "react";

type BarStyle = CSSProperties & Record<`--${string}`, number>;

// Each bar reads its own angle and push distance from CSS variables, so one keyframe drives all of them.
const keyframes = `
@keyframes wave-loader-bar {
    0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
        transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
    }
    50% {
        transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
    }
}
`;

export interface WaveLoaderProps {
    color?: string;
    /** Number of bars around the circle. */
    bars?: number;
    /** Seconds for one bar to push out and back. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** Bars arranged in a circle that push outward one after another, so a wave runs around the ring. */
export const WaveLoader = ({
    color = "#3B9DF8",
    bars = 10,
    duration = 1,
    label = "Loading",
    className = "",
}: WaveLoaderProps) => (
    <div role="status" className={`relative flex h-14 w-14 items-center justify-center ${className}`}>
        <div aria-hidden className="relative h-[9px] w-[9px]">
            {Array.from({length: bars}, (_, index) => {
                const style: BarStyle = {
                    "--rotation": ((index + 1) * 360) / bars,
                    "--translation": 150,
                    backgroundColor: color,
                    transform: "rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%))",
                    animation: `wave-loader-bar ${duration}s ${((index + 1) * duration) / bars}s infinite ease`,
                };
                return <div key={index} className="absolute h-[140%] w-[50%]" style={style}/>;
            })}
        </div>
        <span className="sr-only">{label}</span>
        <style>{keyframes}</style>
    </div>
);
