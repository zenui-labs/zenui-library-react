export interface TooltipProgressBarProps {
    /** Percentage from 0 to 100. */
    value: number;
    /** Fill and tooltip color. */
    color?: string;
    /** Name read by screen readers. */
    label?: string;
    className?: string;
}

/** A horizontal bar with a tooltip above the end of the fill that shows the percentage. Leave about 40px of room above it. */
export const TooltipProgressBar = ({value, color = "#3B9DF8", label = "Progress", className = ""}: TooltipProgressBarProps) => {
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
            {percent !== 0 && (
                // The arrow inherits the tooltip background, so one color prop covers both.
                <div
                    aria-hidden="true"
                    className="absolute top-[-40px] rounded-[5px] px-2 py-0.5 text-white before:absolute before:bottom-[-4px] before:left-[35%] before:h-[8px] before:w-[8px] before:translate-x-1/2 before:rotate-[45deg] before:bg-inherit"
                    style={{left: `calc(${percent}% - 40px)`, backgroundColor: color}}
                >
                    {percent}%
                </div>
            )}
            <div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{width: `${percent}%`, backgroundColor: color}}
            />
        </div>
    );
};
