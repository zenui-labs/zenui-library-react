export interface BasicProgressBarProps {
    /** Percentage from 0 to 100. */
    value: number;
    /** Fill color. */
    color?: string;
    /** Name read by screen readers. */
    label?: string;
    className?: string;
}

/** A plain horizontal bar that fills to `value` percent. */
export const BasicProgressBar = ({value, color = "#3B9DF8", label = "Progress", className = ""}: BasicProgressBarProps) => {
    const percent = Math.min(100, Math.max(0, Math.round(value)));

    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className={`relative w-full h-[15px] rounded-full bg-gray-200 dark:bg-slate-700 ${className}`}
        >
            <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{width: `${percent}%`, backgroundColor: color}}
            />
        </div>
    );
};
