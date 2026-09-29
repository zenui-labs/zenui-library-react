import {useState} from "react";
import {MdOutlineChevronLeft, MdOutlineChevronRight} from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export interface DatePickerProps {
    /** The selected date when controlled. Pass `null` for no selection. */
    value?: Date | null;
    /** The selected date on first render when uncontrolled. */
    defaultValue?: Date | null;
    onChange?: (date: Date) => void;
    /** Any date in the month shown first. Defaults to the selected date, then the current month. */
    defaultMonth?: Date;
    /** Text before the selected date under the calendar. Pass an empty string to hide the line. */
    selectedLabel?: string;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

/** A single date picker. The selected date is highlighted and written out under the calendar. */
export const DatePicker = ({
    value,
    defaultValue = null,
    onChange,
    defaultMonth,
    selectedLabel = "Selected:",
    previousLabel = "Previous month",
    nextLabel = "Next month",
    className = "",
}: DatePickerProps) => {
    const today = new Date();
    const [internal, setInternal] = useState<Date | null>(defaultValue);
    const selected = value !== undefined ? value : internal;

    const initial = defaultMonth ?? selected ?? today;
    const [year, setYear] = useState(initial.getFullYear());
    const [month, setMonth] = useState(initial.getMonth());

    const goTo = (offset: number) => {
        const target = new Date(year, month + offset, 1);
        setYear(target.getFullYear());
        setMonth(target.getMonth());
    };

    const pick = (date: Date) => {
        if (value === undefined) setInternal(date);
        onChange?.(date);
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

                <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({length: start}).map((_, index) => (
                        <div key={`empty-${index}`}/>
                    ))}
                    {Array.from({length: days}).map((_, index) => {
                        const date = new Date(year, month, index + 1);
                        const isSelected = isSameDay(selected, date);
                        const isToday = isSameDay(date, today);
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => pick(date)}
                                aria-pressed={isSelected}
                                aria-current={isToday ? "date" : undefined}
                                aria-label={date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"})}
                                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors ${
                                    isSelected
                                        ? "bg-[#0FABCA] text-white font-semibold"
                                        : isToday
                                            ? "border border-[#0FABCA] dark:text-slate-200 text-gray-700"
                                            : "dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                {index + 1}
                            </button>
                        );
                    })}
                </div>
            </div>

            {selected && selectedLabel && (
                <p className="text-sm dark:text-slate-300 text-gray-600">
                    {selectedLabel}{" "}
                    <span className="font-medium text-[#0FABCA]">
                        {selected.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"})}
                    </span>
                </p>
            )}
        </div>
    );
};
