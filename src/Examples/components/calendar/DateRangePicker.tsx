import {useState} from "react";
import {MdOutlineChevronLeft, MdOutlineChevronRight} from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export interface DateRange {
    start: Date | null;
    /** Stays `null` until the second date is picked. */
    end: Date | null;
}

const EMPTY_RANGE: DateRange = {start: null, end: null};

const dayValue = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

const isSameDay = (a: Date | null, b: Date | null) => !!a && !!b && dayValue(a) === dayValue(b);

export interface DateRangePickerProps {
    /** The selected range when controlled. */
    value?: DateRange;
    /** The selected range on first render when uncontrolled. */
    defaultValue?: DateRange;
    /** Called after each click: once with only `start`, then with both dates. */
    onChange?: (range: DateRange) => void;
    /** Any date in the month shown first. Defaults to the range start, then the current month. */
    defaultMonth?: Date;
    /** Hint shown before the first date is picked. */
    startPrompt?: string;
    /** Hint shown after the first date is picked. */
    endPrompt?: string;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

/** Pick a start and an end date in one month view. Hovering previews the range before the second click. */
export const DateRangePicker = ({
    value,
    defaultValue = EMPTY_RANGE,
    onChange,
    defaultMonth,
    startPrompt = "Pick start date",
    endPrompt = "Pick end date",
    previousLabel = "Previous month",
    nextLabel = "Next month",
    className = "",
}: DateRangePickerProps) => {
    const [internal, setInternal] = useState<DateRange>(defaultValue);
    const range = value ?? internal;
    const [hovered, setHovered] = useState<Date | null>(null);

    const initial = defaultMonth ?? range.start ?? new Date();
    const [year, setYear] = useState(initial.getFullYear());
    const [month, setMonth] = useState(initial.getMonth());

    const goTo = (offset: number) => {
        const target = new Date(year, month + offset, 1);
        setYear(target.getFullYear());
        setMonth(target.getMonth());
    };

    const update = (next: DateRange) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const pick = (date: Date) => {
        if (!range.start || range.end) {
            // First click, or starting over after a full range.
            update({start: date, end: null});
        } else if (dayValue(date) < dayValue(range.start)) {
            update({start: date, end: range.start});
        } else {
            update({start: range.start, end: date});
        }
    };

    const preview = (date: Date | null) => {
        if (range.start && !range.end) setHovered(date);
    };

    const inRange = (date: Date) => {
        const end = range.end ?? hovered;
        if (!range.start || !end) return false;
        const a = dayValue(range.start);
        const b = dayValue(end);
        const d = dayValue(date);
        return d > Math.min(a, b) && d < Math.max(a, b);
    };

    const days = new Date(year, month + 1, 0).getDate();
    const start = new Date(year, month, 1).getDay();

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button
                        type="button"
                        onClick={() => goTo(-1)}
                        aria-label={previousLabel}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <MdOutlineChevronLeft className="text-xl dark:text-slate-300" aria-hidden/>
                    </button>
                    <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800" aria-live="polite">
                        {MONTHS[month]} {year}
                    </span>
                    <button
                        type="button"
                        onClick={() => goTo(1)}
                        aria-label={nextLabel}
                        className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                    >
                        <MdOutlineChevronRight className="text-xl dark:text-slate-300" aria-hidden/>
                    </button>
                </div>

                <div className="grid grid-cols-7 mb-1">
                    {DAYS.map((day) => (
                        <div key={day} className="text-center text-[0.65rem] font-medium dark:text-slate-400 text-gray-400 py-1">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-y-1" onMouseLeave={() => setHovered(null)}>
                    {Array.from({length: start}).map((_, index) => (
                        <div key={`empty-${index}`}/>
                    ))}
                    {Array.from({length: days}).map((_, index) => {
                        const date = new Date(year, month, index + 1);
                        const isEdge = isSameDay(range.start, date) || isSameDay(range.end, date);
                        const isBetween = inRange(date);
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => pick(date)}
                                onMouseEnter={() => preview(date)}
                                onFocus={() => preview(date)}
                                aria-pressed={isEdge || isBetween}
                                aria-label={date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"})}
                                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors ${
                                    isEdge
                                        ? "bg-[#0FABCA] text-white font-semibold"
                                        : isBetween
                                            ? "bg-[#0FABCA]/15 dark:bg-[#0FABCA]/20 dark:text-slate-200 text-gray-700 rounded-none"
                                            : "dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            <p className="text-sm dark:text-slate-300 text-gray-600 text-center" aria-live="polite">
                {range.start && range.end ? (
                    <>
                        <span className="font-medium text-[#0FABCA]">
                            {range.start.toLocaleDateString("en-US", {month: "short", day: "numeric"})}
                        </span>
                        {" → "}
                        <span className="font-medium text-[#0FABCA]">
                            {range.end.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"})}
                        </span>
                    </>
                ) : range.start ? (
                    endPrompt
                ) : (
                    startPrompt
                )}
            </p>
        </div>
    );
};
