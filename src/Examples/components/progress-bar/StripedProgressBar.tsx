// The keyframes ship with the component, so no global CSS is needed.
const stripesKeyframes = "@keyframes progress-stripes { 0% { background-position: 0 0; } 100% { background-position: 30px 0; } }";

export interface StripedProgressBarProps {
    /** Percentage from 0 to 100. */
    value: number;
    /** Fill color under the stripes. */
    color?: string;
    /** Seconds for the stripes to move one stripe width. */
    speed?: number;
    /** Name read by screen readers. */
    label?: string;
    className?: string;
}

/** A horizontal bar with diagonal stripes that keep moving while there is progress to show. */
export const StripedProgressBar = ({
    value,
    color = "#3B9DF8",
    speed = 1,
    label = "Progress",
    className = "",
}: StripedProgressBarProps) => {
    const percent = Math.min(100, Math.max(0, Math.round(value)));

    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className={`relative w-full h-[15px] rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 ${className}`}
        >
            <style>{stripesKeyframes}</style>
            <div
                className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
                style={{
                    width: `${percent}%`,
                    backgroundColor: color,
                    backgroundImage:
                        "linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)",
                    backgroundSize: "30px 30px",
                    animation: percent > 0 ? `progress-stripes ${speed}s linear infinite` : "none",
                }}
            />
        </div>
    );
};
