const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export interface CircularProgressBarProps {
    /** Percentage from 0 to 100. */
    value: number;
    /** Diameter in pixels. */
    size?: number;
    /** Ring thickness, in units of a 100 by 100 view box. */
    strokeWidth?: number;
    /** Color of the filled arc. */
    color?: string;
    /** Name read by screen readers. */
    label?: string;
    className?: string;
}

/** A ring that fills clockwise from the top, with the percentage in the center. */
export const CircularProgressBar = ({
    value,
    size = 150,
    strokeWidth = 10,
    color = "#3B9DF8",
    label = "Progress",
    className = "",
}: CircularProgressBarProps) => {
    const percent = Math.min(100, Math.max(0, Math.round(value)));

    return (
        <div
            role="progressbar"
            aria-label={label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className={`relative ${className}`}
            style={{width: size, height: size}}
        >
            <svg className="w-full h-full" viewBox="0 0 100 100" aria-hidden="true">
                <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    className="dark:stroke-[#334155]"
                    stroke="#e2e2e2"
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={RADIUS}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={(1 - percent / 100) * CIRCUMFERENCE}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                />
            </svg>

            <p className="absolute inset-0 flex items-center justify-center dark:text-gray-400">{percent}%</p>
        </div>
    );
};
