import {useEffect, useId, useRef, useState} from "react";
import {MdOutlineCalendarMonth, MdOutlineCheck, MdOutlineChevronLeft, MdOutlineChevronRight} from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const dayValue = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
const isSameDay = (a: Date | null, b: Date | null) => !!a && !!b && dayValue(a) === dayValue(b);
const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString("en-US", {month: "short", day: "numeric", year: "numeric"}) : null;

interface YearListProps {
    year: number;
    minYear: number;
    maxYear: number;
    onSelect: (year: number) => void;
}

// A scrollable year list that opens with the active year centered.
const YearList = ({year, minYear, maxYear, onSelect}: YearListProps) => {
    const listRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);
    const years = Array.from({length: Math.max(maxYear - minYear + 1, 0)}, (_, index) => minYear + index);

    useEffect(() => {
        if (activeRef.current && listRef.current) {
            const {offsetTop, offsetHeight} = activeRef.current;
            listRef.current.scrollTop = offsetTop - listRef.current.clientHeight / 2 + offsetHeight / 2;
        }
    }, []);

    return (
        <div ref={listRef} className="h-48 overflow-y-auto py-2" style={{scrollbarWidth: "thin"}}>
            {years.map((item) => (
                <button
                    key={item}
                    ref={item === year ? activeRef : null}
                    type="button"
                    onClick={() => onSelect(item)}
                    aria-pressed={item === year}
                    className={`w-full px-4 py-1.5 text-sm text-left transition-colors ${
                        item === year
                            ? "bg-[#0FABCA] text-white font-semibold"
                            : "dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>
    );
};

type CalendarView = "day" | "month" | "year";

export interface DatePickerPopupProps {
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    /** Days before this date are disabled. */
    minDate?: Date | null;
    /** Called after a day is picked. */
    onClose?: () => void;
    /** First year in the year list. */
    minYear?: number;
    /** Last year in the year list. */
    maxYear?: number;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

/** A calendar card with day, month and year views. Click the month or the year in the header to switch views. */
export const DatePickerPopup = ({
    selectedDate,
    onSelect,
    minDate,
    onClose,
    minYear = 2000,
    maxYear = 2999,
    previousLabel = "Previous month",
    nextLabel = "Next month",
    className = "",
}: DatePickerPopupProps) => {
    const today = new Date();
    const [year, setYear] = useState(selectedDate?.getFullYear() ?? today.getFullYear());
    const [month, setMonth] = useState(selectedDate?.getMonth() ?? today.getMonth());
    const [view, setView] = useState<CalendarView>("day");

    const goTo = (offset: number) => {
        const target = new Date(year, month + offset, 1);
        setYear(target.getFullYear());
        setMonth(target.getMonth());
    };

    const isDisabled = (date: Date) => !!minDate && dayValue(date) < dayValue(minDate);

    const days = new Date(year, month + 1, 0).getDate();
    const start = new Date(year, month, 1).getDay();

    return (
        <div className={`w-[290px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden ${className}`}>
            <div className="bg-[#0FABCA] px-4 py-2.5 flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => goTo(-1)}
                    aria-label={previousLabel}
                    className="p-1 rounded hover:bg-white/20 transition-colors text-white"
                >
                    <MdOutlineChevronLeft className="text-xl" aria-hidden/>
                </button>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setView((current) => (current === "month" ? "day" : "month"))}
                        aria-expanded={view === "month"}
                        className="text-sm font-semibold text-white hover:underline"
                    >
                        {MONTHS[month]}
                    </button>
                    <button
                        type="button"
                        onClick={() => setView((current) => (current === "year" ? "day" : "year"))}
                        aria-expanded={view === "year"}
                        className="text-sm font-semibold text-white hover:underline"
                    >
                        {year}
                    </button>
                </div>
                <button
                    type="button"
                    onClick={() => goTo(1)}
                    aria-label={nextLabel}
                    className="p-1 rounded hover:bg-white/20 transition-colors text-white"
                >
                    <MdOutlineChevronRight className="text-xl" aria-hidden/>
                </button>
            </div>

            {view === "month" && (
                <div className="grid grid-cols-3 gap-2 p-4">
                    {MONTHS.map((name, index) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => {
                                setMonth(index);
                                setView("day");
                            }}
                            aria-pressed={index === month}
                            className={`py-1.5 text-xs rounded-lg font-medium transition-colors ${
                                index === month
                                    ? "bg-[#0FABCA] text-white"
                                    : "hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300 text-gray-700"
                            }`}
                        >
                            {name.slice(0, 3)}
                        </button>
                    ))}
                </div>
            )}

            {view === "year" && (
                <YearList
                    year={year}
                    minYear={minYear}
                    maxYear={maxYear}
                    onSelect={(item) => {
                        setYear(item);
                        setView("day");
                    }}
                />
            )}

            {view === "day" && (
                <div className="p-3">
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS.map((day) => (
                            <div key={day} className="text-center text-[0.6rem] font-medium dark:text-slate-400 text-gray-400 py-1">
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
                            const disabled = isDisabled(date);
                            const isSelected = isSameDay(selectedDate, date);
                            const isToday = isSameDay(date, today);
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    disabled={disabled}
                                    onClick={() => {
                                        onSelect(date);
                                        onClose?.();
                                    }}
                                    aria-pressed={isSelected}
                                    aria-current={isToday ? "date" : undefined}
                                    aria-label={date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"})}
                                    className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.78rem] transition-colors ${
                                        disabled
                                            ? "text-gray-300 dark:text-slate-600 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-[#0FABCA] text-white font-semibold"
                                                : isToday
                                                    ? "border border-[#0FABCA] text-[#0FABCA] font-medium dark:text-[#0FABCA]"
                                                    : "dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export interface FromToRange {
    from: Date | null;
    to: Date | null;
}

const EMPTY_RANGE: FromToRange = {from: null, to: null};

export interface FromToDatePickerProps {
    /** The selected dates when controlled. */
    value?: FromToRange;
    /** The selected dates on first render when uncontrolled. */
    defaultValue?: FromToRange;
    onChange?: (range: FromToRange) => void;
    /** Called when the confirm button is pressed. The button is disabled until both dates are set. */
    onConfirm?: (range: {from: Date; to: Date}) => void;
    title?: string;
    fromLabel?: string;
    toLabel?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    confirmLabel?: string;
    /** First year in the year list. */
    minYear?: number;
    /** Last year in the year list. */
    maxYear?: number;
    className?: string;
}

/**
 * Two date fields that each open a popup calendar. The end date cannot fall before the start date, and picking a
 * start date on or after the end date clears the end date.
 */
export const FromToDatePicker = ({
    value,
    defaultValue = EMPTY_RANGE,
    onChange,
    onConfirm,
    title = "Select date range",
    fromLabel = "From",
    toLabel = "To",
    startPlaceholder = "Start date",
    endPlaceholder = "End date",
    confirmLabel = "Confirm dates",
    minYear,
    maxYear,
    className = "",
}: FromToDatePickerProps) => {
    const [internal, setInternal] = useState<FromToRange>(defaultValue);
    const {from: fromDate, to: toDate} = value ?? internal;
    const [openPicker, setOpenPicker] = useState<"from" | "to" | null>(null);
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();
    const fromId = `${id}-from`;
    const toId = `${id}-to`;

    // Close the popup on a click outside the component or on Escape.
    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setOpenPicker(null);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpenPicker(null);
        };
        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const update = (next: FromToRange) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const handleConfirm = () => {
        if (fromDate && toDate) onConfirm?.({from: fromDate, to: toDate});
    };

    const triggerClass = (open: boolean) =>
        `w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors bg-gray-50 dark:bg-slate-700/50 ${
            open ? "border-[#0FABCA] ring-2 ring-[#0FABCA]/20" : "border-gray-200 dark:border-slate-600 hover:border-[#0FABCA]"
        }`;

    const valueClass = (date: Date | null) =>
        `text-[0.78rem] truncate ${date ? "text-gray-800 dark:text-slate-200 font-medium" : "text-gray-400 dark:text-slate-500"}`;

    const labelClass = "text-[0.68rem] font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1 block";

    return (
        <div ref={ref} className={`w-full max-w-[420px] ${className}`}>
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-5 flex flex-col gap-4">
                <p className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">{title}</p>

                <div className="grid grid-cols-2 gap-3 relative">
                    <div>
                        <label htmlFor={fromId} className={labelClass}>
                            {fromLabel}
                        </label>
                        <button
                            id={fromId}
                            type="button"
                            onClick={() => setOpenPicker((current) => (current === "from" ? null : "from"))}
                            aria-haspopup="dialog"
                            aria-expanded={openPicker === "from"}
                            className={triggerClass(openPicker === "from")}
                        >
                            <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" aria-hidden/>
                            <span className={valueClass(fromDate)}>{formatDate(fromDate) ?? startPlaceholder}</span>
                        </button>

                        {openPicker === "from" && (
                            <div className="absolute top-full left-0 mt-2 z-50" role="dialog" aria-label={fromLabel}>
                                <DatePickerPopup
                                    selectedDate={fromDate}
                                    minYear={minYear}
                                    maxYear={maxYear}
                                    onSelect={(date) =>
                                        update({from: date, to: toDate && dayValue(date) >= dayValue(toDate) ? null : toDate})
                                    }
                                    onClose={() => setOpenPicker(null)}
                                />
                            </div>
                        )}
                    </div>

                    <div>
                        <label htmlFor={toId} className={labelClass}>
                            {toLabel}
                        </label>
                        <button
                            id={toId}
                            type="button"
                            onClick={() => setOpenPicker((current) => (current === "to" ? null : "to"))}
                            aria-haspopup="dialog"
                            aria-expanded={openPicker === "to"}
                            className={triggerClass(openPicker === "to")}
                        >
                            <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" aria-hidden/>
                            <span className={valueClass(toDate)}>{formatDate(toDate) ?? endPlaceholder}</span>
                        </button>

                        {openPicker === "to" && (
                            <div className="absolute top-full right-0 mt-2 z-50" role="dialog" aria-label={toLabel}>
                                <DatePickerPopup
                                    selectedDate={toDate}
                                    minDate={fromDate}
                                    minYear={minYear}
                                    maxYear={maxYear}
                                    onSelect={(date) => update({from: fromDate, to: date})}
                                    onClose={() => setOpenPicker(null)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {fromDate && toDate && (
                    <div className="bg-[#0FABCA]/10 dark:bg-[#0FABCA]/15 border border-[#0FABCA]/30 rounded-xl px-4 py-2.5 text-[0.75rem] dark:text-slate-300 text-gray-700 flex items-center gap-2">
                        <MdOutlineCalendarMonth className="text-[#0FABCA] shrink-0" aria-hidden/>
                        <span>
                            <span className="font-semibold text-[#0FABCA]">{formatDate(fromDate)}</span>
                            {" → "}
                            <span className="font-semibold text-[#0FABCA]">{formatDate(toDate)}</span>
                        </span>
                    </div>
                )}

                <button
                    type="button"
                    onClick={handleConfirm}
                    disabled={!fromDate || !toDate}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0FABCA] hover:bg-[#0891b2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold"
                >
                    <MdOutlineCheck className="text-base" aria-hidden/>
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};
