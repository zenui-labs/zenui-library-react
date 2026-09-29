export interface DonutChartDatum {
    name: string;
    value: number;
    /** Overrides the palette color for this slice. */
    color?: string;
}

export interface DonutChartProps {
    data: DonutChartDatum[];
    /** Slice colors, used in order and repeated when there are more slices than colors. */
    colors?: string[];
    /** Width of the chart in px at full size. It scales down to fit narrow containers. */
    size?: number;
    /** Size of the hole as a fraction of the outer radius, from 0 to below 1. */
    innerRadius?: number;
    /** Color of the percentage labels inside the ring. */
    labelColor?: string;
    /** Accessible name for the chart. */
    label?: string;
    emptyText?: string;
    invalidText?: string;
    className?: string;
}

const DEFAULT_COLORS = ["#4b77be", "#f5ab35", "#e74c3c", "#96c0ce", "#2ecc71", "#c39bd3"];

// Leaves out the empty space under the ring, as the original chart did.
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

// Two half arcs, since a single arc cannot draw a full circle. `sweep` sets the direction.
const circlePath = (cx: number, cy: number, r: number, sweep: 0 | 1) =>
    `M ${cx - r},${cy} A ${r},${r} 0 1,${sweep} ${cx + r},${cy} A ${r},${r} 0 1,${sweep} ${cx - r},${cy} Z`;

const buildSlices = (
    data: DonutChartDatum[],
    colors: string[],
    size: number,
    innerRadius: number,
    total: number,
): Slice[] => {
    const radius = size / 3;
    const inner = radius * innerRadius;
    const centerX = size / 2;
    const centerY = size / 2;
    // Labels sit halfway across the ring.
    const labelRadius = (radius * (1 - innerRadius)) / 2 + inner;
    let startAngle = 0;

    return data.map((item, index) => {
        const value = Math.max(0, Number(item.value) || 0);
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;
        const endAngle = startAngle + angle;
        const largeArc = angle > Math.PI ? 1 : 0;

        let path: string;
        if (angle >= 2 * Math.PI - 1e-6) {
            // A slice that fills the chart is the outer circle with the inner circle cut out.
            path = `${circlePath(centerX, centerY, radius, 1)} ${circlePath(centerX, centerY, inner, 0)}`;
        } else {
            const outerX1 = centerX + radius * Math.cos(startAngle);
            const outerY1 = centerY + radius * Math.sin(startAngle);
            const outerX2 = centerX + radius * Math.cos(endAngle);
            const outerY2 = centerY + radius * Math.sin(endAngle);
            const innerX1 = centerX + inner * Math.cos(startAngle);
            const innerY1 = centerY + inner * Math.sin(startAngle);
            const innerX2 = centerX + inner * Math.cos(endAngle);
            const innerY2 = centerY + inner * Math.sin(endAngle);
            path = `M ${outerX1},${outerY1} A ${radius},${radius} 0 ${largeArc},1 ${outerX2},${outerY2} L ${innerX2},${innerY2} A ${inner},${inner} 0 ${largeArc},0 ${innerX1},${innerY1} Z`;
        }

        const labelAngle = startAngle + angle / 2;
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

/** A donut chart: a pie chart with a hollow center, labels in the ring and a legend underneath. */
export const DonutChart = ({
    data,
    colors = DEFAULT_COLORS,
    size = 400,
    innerRadius = 0.5,
    labelColor = "#efefef",
    label = "Donut chart",
    emptyText = "No data available",
    invalidText = "Invalid data values",
    className = "",
}: DonutChartProps) => {
    if (data.length === 0) {
        return <Message text={emptyText} className={className}/>;
    }

    const total = data.reduce((sum, item) => sum + Math.max(0, Number(item.value) || 0), 0);
    if (total === 0) {
        return <Message text={invalidText} className={className}/>;
    }

    const hole = Math.min(Math.max(innerRadius, 0), 0.95);
    const slices = buildSlices(data, colors, size, hole, total);
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
                        fillRule="evenodd"
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
                        className="pointer-events-none text-[0.9rem]"
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
