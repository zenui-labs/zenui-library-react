export interface LabeledProgressBarProps {
    /** Percentage from 0 to 100. */
    value: number;
    /** Text before the percentage under the bar. Also used as the name read by screen readers. */
    label?: string;
    /** Fill color. */
    color?: string;
    className?: string;
}

/** A horizontal bar with the percentage written underneath, such as "Loading: 45%". */
export const LabeledProgressBar = ({value, label = "Loading", color = "#3B9DF8", className = ""}: LabeledProgressBarProps) => {
    const percent = Math.min(100, Math.max(0, Math.round(value)));

    return (
        <div className={`flex flex-col items-center justify-center w-full gap-[10px] ${className}`}>
            <div
                role="progressbar"
                aria-label={label}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="relative w-full h-[15px] rounded-full bg-gray-200 dark:bg-slate-700"
            >
                <div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{width: `${percent}%`, backgroundColor: color}}
                />
            </div>

            <p className="dark:text-gray-400">
                {label}: <b>{percent}%</b>
            </p>
        </div>
    );
};
