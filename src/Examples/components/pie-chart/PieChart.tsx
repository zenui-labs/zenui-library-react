export interface PieChartDatum {
    name: string;
    value: number;
    /** Overrides the palette color for this slice. */
    color?: string;
}

export interface PieChartProps {
    data: PieChartDatum[];
    /** Slice colors, used in order and repeated when there are more slices than colors. */
    colors?: string[];
    /** Width of the chart in px at full size. It scales down to fit narrow containers. */
    size?: number;
    /** Color of the percentage labels inside the slices. */
    labelColor?: string;
    /** Accessible name for the chart. */
    label?: string;
    emptyText?: string;
    invalidText?: string;
    className?: string;
}

const DEFAULT_COLORS = ["#4b77be", "#f5ab35", "#e74c3c", "#96c0ce", "#2ecc71", "#c39bd3"];

// Leaves out the empty space under the circle, as the original chart did.
const BOTTOM_TRIM = 30;

interface Slice {
    key: string;
    name: string;
    value: number;
    percentage: number;
    color: string;
    path: string;
    labelX: number;
    labelY: number;
}

const buildSlices = (data: PieChartDatum[], colors: string[], size: number, total: number): Slice[] => {
    const radius = size / 3;
    const centerX = size / 2;
    const centerY = size / 2;
    let startAngle = 0;

    return data.map((item, index) => {
        const value = Math.max(0, Number(item.value) || 0);
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;
        const endAngle = startAngle + angle;

        let path: string;
        if (angle >= 2 * Math.PI - 1e-6) {
            // A single arc cannot draw a full circle, so a slice that fills the chart uses two half arcs.
            path = `M ${centerX - radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX + radius},${centerY} A ${radius},${radius} 0 1,1 ${centerX - radius},${centerY} Z`;
        } else {
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            path = `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${x2},${y2} Z`;
        }

        // The label sits in the middle of the slice, 70% of the way out from the center.
        const labelAngle = startAngle + angle / 2;
        const labelRadius = angle >= 2 * Math.PI - 1e-6 ? 0 : radius * 0.7;
        const name = item.name || `Slice ${index + 1}`;

        const slice: Slice = {
            key: `${name}-${index}`,
            name,
            value,
            percentage,
            color: item.color ?? colors[index % colors.length],
            path,
            labelX: centerX + labelRadius * Math.cos(labelAngle),
            labelY: centerY + labelRadius * Math.sin(labelAngle),
        };

        startAngle = endAngle;
        return slice;
    });
};

const Message = ({text, className}: {text: string; className: string}) => (
    <div className={`flex h-full w-full items-center justify-center rounded-lg border p-4 ${className}`}>
        <p className="text-gray-500">{text}</p>
    </div>
);

/** A pie chart that sizes each slice by its share of the total, with percentage labels and a legend. */
export const PieChart = ({
    data,
    colors = DEFAULT_COLORS,
    size = 400,
    labelColor = "#efefef",
    label = "Pie chart",
    emptyText = "No data available",
    invalidText = "Invalid data values",
    className = "",
}: PieChartProps) => {
    if (data.length === 0) {
        return <Message text={emptyText} className={className}/>;
    }

    const total = data.reduce((sum, item) => sum + Math.max(0, Number(item.value) || 0), 0);
    if (total === 0) {
        return <Message text={invalidText} className={className}/>;
    }

    const slices = buildSlices(data, colors, size, total);
    const visible = slices.filter((slice) => slice.value > 0);

    return (
        <div className={`relative w-full ${className}`} style={{maxWidth: size}}>
            <svg
                viewBox={`0 0 ${size} ${size - BOTTOM_TRIM}`}
                className="mx-auto block h-auto w-full overflow-visible"
                role="img"
                aria-label={label}
            >
                {visible.map((slice) => (
                    <path
                        key={slice.key}
                        d={slice.path}
                        fill={slice.color}
                        className="transition-opacity duration-200 hover:opacity-80"
                    >
                        <title>{`${slice.name}: ${slice.percentage.toFixed(1)}%`}</title>
                    </path>
                ))}

                {visible.map((slice) => (
                    <text
                        key={`label-${slice.key}`}
                        x={slice.labelX}
                        y={slice.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={labelColor}
                        className="pointer-events-none text-[1rem]"
                        aria-hidden
                    >
                        {`${slice.percentage.toFixed(1)}%`}
                    </text>
                ))}
            </svg>

            <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-[20px] gap-y-[10px] px-[30px] sm:mt-0">
                {slices.map((slice) => (
                    <li key={`legend-${slice.key}`} className="flex items-center">
                        <span className="mr-2 h-3 w-3" style={{backgroundColor: slice.color}} aria-hidden/>
                        <span className="text-[0.7rem] dark:text-[#abc2d3] sm:text-[0.9rem]">{slice.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
