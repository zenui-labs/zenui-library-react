import {useCallback, useMemo, useState, type MouseEvent} from "react";

/** Activity counts keyed by local date in `YYYY-MM-DD` form. Missing days count as 0. */
export type ActivityData = Record<string, number>;

export interface ActivityDay {
    /** Local date in `YYYY-MM-DD` form. */
    date: string;
    count: number;
}

/** Five Tailwind class sets, from no activity to the most activity. */
export type ActivityLevelClassNames = [string, string, string, string, string];

export interface ActivityGraphWithMonthsProps {
    data: ActivityData;
    /** Last day shown in the graph. Defaults to today. */
    endDate?: Date;
    /** Number of weeks (columns) to show. */
    weeks?: number;
    heading?: string;
    /** Upper counts for levels 1 to 3. Anything above the last value uses the darkest level. */
    thresholds?: [number, number, number];
    levelClassNames?: ActivityLevelClassNames;
    lessLabel?: string;
    moreLabel?: string;
    /** Text for the hover tooltip. `formattedDate` uses `locale`. */
    formatTooltip?: (day: ActivityDay, formattedDate: string) => string;
    /** Locale for dates, for example "en-US" or "de-DE". */
    locale?: string;
    className?: string;
}

interface MonthLabel {
    month: string;
    /** First week column of the month. */
    startIndex: number;
    endIndex: number;
}

interface TooltipState {
    show: boolean;
    content: string;
    x: number;
    y: number;
}

const TOOLTIP_WIDTH = 200;
const TOOLTIP_HEIGHT = 60;
// A day cell is 12px wide plus a 4px gap.
const WEEK_WIDTH = 16;

const DEFAULT_LEVELS: ActivityLevelClassNames = [
    "bg-[#ebedf0] dark:bg-[#0f172a]",
    "bg-[#9be9a8] dark:bg-[#0e4429]",
    "bg-[#40c463] dark:bg-[#006d32]",
    "bg-[#30a14e] dark:bg-[#26a641]",
    "bg-[#216e39] dark:bg-[#39d353]",
];

const pad = (value: number) => String(value).padStart(2, "0");

// Turns a Date into the `YYYY-MM-DD` key the graph reads, using the local calendar day.
const toDateKey = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

// Parses a key as a local date, so the label never shifts a day in time zones behind UTC.
const fromDateKey = (key: string) => {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
};

const defaultTooltip = (day: ActivityDay, formattedDate: string) => `${day.count} contributions on ${formattedDate}`;

/** A GitHub style grid of daily activity with month labels on top and a color legend below. */
export const ActivityGraphWithMonths = ({
    data,
    endDate,
    weeks = 52,
    heading = "Activity contributions",
    thresholds = [2, 4, 6],
    levelClassNames = DEFAULT_LEVELS,
    lessLabel = "Less",
    moreLabel = "More",
    formatTooltip = defaultTooltip,
    locale = "en-US",
    className = "",
}: ActivityGraphWithMonthsProps) => {
    const [tooltip, setTooltip] = useState<TooltipState>({show: false, content: "", x: 0, y: 0});

    const endKey = toDateKey(endDate ?? new Date());

    // One entry per day, oldest first, ending on endDate.
    const days = useMemo<ActivityDay[]>(() => {
        const end = fromDateKey(endKey);
        const list: ActivityDay[] = [];
        for (let i = weeks * 7 - 1; i >= 0; i--) {
            const key = toDateKey(new Date(end.getFullYear(), end.getMonth(), end.getDate() - i));
            list.push({date: key, count: data[key] ?? 0});
        }
        return list;
    }, [data, endKey, weeks]);

    const columns = useMemo(() => {
        const result: ActivityDay[][] = [];
        for (let i = 0; i < days.length; i += 7) {
            result.push(days.slice(i, i + 7));
        }
        return result;
    }, [days]);

    const total = useMemo(() => days.reduce((sum, day) => sum + day.count, 0), [days]);

    // Groups week columns by the month of their days, for the labels above the grid.
    const months = useMemo<MonthLabel[]>(() => {
        const labels: MonthLabel[] = [];
        let currentMonth = "";
        let currentStartIndex = 0;

        days.forEach((day, index) => {
            const month = fromDateKey(day.date).toLocaleString(locale, {month: "short"});
            if (month !== currentMonth) {
                if (currentMonth !== "") {
                    labels.push({month: currentMonth, startIndex: currentStartIndex, endIndex: Math.floor(index / 7)});
                }
                currentMonth = month;
                currentStartIndex = Math.floor(index / 7);
            }
        });

        labels.push({month: currentMonth, startIndex: currentStartIndex, endIndex: Math.floor(days.length / 7)});
        return labels;
    }, [days, locale]);

    const getLevel = (count: number) => {
        if (count <= 0) return 0;
        if (count <= thresholds[0]) return 1;
        if (count <= thresholds[1]) return 2;
        if (count <= thresholds[2]) return 3;
        return 4;
    };

    const formatDate = useCallback(
        (key: string) => fromDateKey(key).toLocaleDateString(locale, {month: "short", day: "numeric", year: "numeric"}),
        [locale],
    );

    // Places the tooltip above the hovered day, or below it near the top of the window, and keeps it on screen.
    const handleMouseMove = (event: MouseEvent<HTMLDivElement>, day: ActivityDay) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const spaceRight = windowWidth - rect.right;
        const spaceLeft = rect.left;
        const spaceTop = rect.top;
        const spaceBottom = windowHeight - rect.bottom;

        let x: number;
        if (spaceRight < TOOLTIP_WIDTH / 2 && spaceLeft > TOOLTIP_WIDTH / 2) {
            x = rect.right - TOOLTIP_WIDTH;
        } else if (spaceLeft < TOOLTIP_WIDTH / 2 && spaceRight > TOOLTIP_WIDTH / 2) {
            x = rect.left;
        } else {
            x = rect.left - TOOLTIP_WIDTH / 2 + rect.width / 2;
        }

        // The tooltip is fixed, so it uses window coordinates without the scroll offset.
        const y = spaceTop < TOOLTIP_HEIGHT && spaceBottom > TOOLTIP_HEIGHT
            ? rect.bottom + 5
            : rect.top - TOOLTIP_HEIGHT + 15;

        x = Math.max(10, Math.min(windowWidth - TOOLTIP_WIDTH - 10, x));

        setTooltip({show: true, content: formatTooltip(day, formatDate(day.date)), x, y});
    };

    const handleMouseLeave = () => {
        setTooltip((prev) => ({...prev, show: false}));
    };

    const firstDate = formatDate(days[0].date);
    const lastDate = formatDate(days[days.length - 1].date);

    return (
        <div className={`p-6 w-full max-w-4xl ${className}`}>
            <h2 className="text-xl text-gray-800 dark:text-[#abc2d3] font-bold mb-7">{heading}</h2>

            <div className="flex flex-col gap-4">
                <div className="relative overflow-x-auto pb-2 scrollbar">
                    <div className="flex">
                        <div className="w-full">
                            <div className="flex relative h-6 mb-1" aria-hidden>
                                {months.map((monthData) => (
                                    <div
                                        key={`${monthData.month}-${monthData.startIndex}`}
                                        className="absolute dark:text-[#abc2d3] text-xs text-gray-600 text-center"
                                        style={{
                                            left: `${monthData.startIndex * WEEK_WIDTH}px`,
                                            width: `${(monthData.endIndex - monthData.startIndex) * WEEK_WIDTH}px`,
                                        }}
                                    >
                                        {monthData.month}
                                    </div>
                                ))}
                            </div>

                            <div
                                className="flex gap-1"
                                role="img"
                                aria-label={`${total} contributions from ${firstDate} to ${lastDate}`}
                            >
                                {columns.map((week) => (
                                    <div key={week[0].date} className="flex flex-col gap-1">
                                        {week.map((day) => (
                                            <div
                                                key={day.date}
                                                className={`w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200 border border-gray-200 dark:border-slate-800 hover:border-gray-400 ${levelClassNames[getLevel(day.count)]}`}
                                                onMouseMove={(event) => handleMouseMove(event, day)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {tooltip.show && (
                        <div
                            role="tooltip"
                            className="fixed z-50 px-3 dark:bg-slate-800 dark:text-[#abc2d3] py-2 text-sm text-white bg-gray-800 rounded-md pointer-events-none"
                            style={{left: `${tooltip.x}px`, top: `${tooltip.y}px`, width: "max-content"}}
                        >
                            {tooltip.content}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-2 dark:text-[#abc2d3] text-[0.8rem] text-gray-600" aria-hidden>
                    <span>{lessLabel}</span>
                    {levelClassNames.map((levelClass, level) => (
                        <div key={level} className="flex flex-col items-center">
                            <div className={`w-3 h-3 border dark:border-slate-800 rounded-sm border-gray-200 ${levelClass}`}/>
                        </div>
                    ))}
                    <span>{moreLabel}</span>
                </div>
            </div>
        </div>
    );
};
