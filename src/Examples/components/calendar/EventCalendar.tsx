import {useState} from "react";
import {MdOutlineChevronLeft, MdOutlineChevronRight} from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const isSameDay = (a: Date | null, b: Date | null) =>
    !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export interface CalendarEvent {
    date: Date;
    label: string;
    /** Tailwind background class for the dot, for example `bg-blue-500`. */
    color: string;
}

export interface EventCalendarProps {
    events: CalendarEvent[];
    /** Any date in the month shown first. Defaults to the current month. */
    defaultMonth?: Date;
    /** Called when a day is clicked, with the events on that day. */
    onDayClick?: (date: Date, events: CalendarEvent[]) => void;
    /** Lists the events of the month under the grid. */
    showLegend?: boolean;
    previousLabel?: string;
    nextLabel?: string;
    className?: string;
}

/** A month view that marks event days with colored dots. Clicking a day shows its event labels. */
export const EventCalendar = ({
    events,
    defaultMonth,
    onDayClick,
    showLegend = true,
    previousLabel = "Previous month",
    nextLabel = "Next month",
    className = "",
}: EventCalendarProps) => {
    const today = new Date();
    const initial = defaultMonth ?? today;
    const [year, setYear] = useState(initial.getFullYear());
    const [month, setMonth] = useState(initial.getMonth());
    const [active, setActive] = useState<Date | null>(null);

    const goTo = (offset: number) => {
        const target = new Date(year, month + offset, 1);
        setYear(target.getFullYear());
        setMonth(target.getMonth());
        setActive(null);
    };

    const monthEvents = events.filter((event) => event.date.getFullYear() === year && event.date.getMonth() === month);

    const days = new Date(year, month + 1, 0).getDate();
    const start = new Date(year, month, 1).getDay();

    return (
        <div className={`w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm ${className}`}>
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
                    const dayEvents = monthEvents.filter((event) => isSameDay(event.date, date));
                    const isToday = isSameDay(date, today);
                    const isActive = isSameDay(active, date);
                    const dateLabel = date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"});

                    return (
                        <div key={index} className="relative flex flex-col items-center">
                            <button
                                type="button"
                                onClick={() => {
                                    setActive(isActive ? null : date);
                                    onDayClick?.(date, dayEvents);
                                }}
                                aria-pressed={isActive}
                                aria-current={isToday ? "date" : undefined}
                                aria-label={dayEvents.length ? `${dateLabel}: ${dayEvents.map((event) => event.label).join(", ")}` : dateLabel}
                                className={`flex items-center justify-center h-8 w-8 rounded-full text-[0.8rem] cursor-pointer transition-colors ${
                                    isToday
                                        ? "bg-[#0FABCA] text-white font-semibold"
                                        : isActive
                                            ? "bg-gray-100 dark:bg-slate-700 dark:text-slate-200 text-gray-700"
                                            : "dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700"
                                }`}
                            >
                                {index + 1}
                            </button>

                            {dayEvents.length > 0 && (
                                <span className="flex gap-0.5 mt-0.5" aria-hidden>
                                    {dayEvents.map((event, eventIndex) => (
                                        <span key={`${event.label}-${eventIndex}`} className={`h-1 w-1 rounded-full ${event.color}`}/>
                                    ))}
                                </span>
                            )}

                            {isActive && dayEvents.length > 0 && (
                                <div
                                    className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-slate-900 text-white text-[0.6rem] px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg"
                                    aria-hidden
                                >
                                    {dayEvents.map((event) => event.label).join(", ")}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {showLegend && monthEvents.length > 0 && (
                <ul className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-2">
                    {monthEvents.map((event, eventIndex) => (
                        <li
                            key={`${event.label}-${eventIndex}`}
                            className="flex items-center gap-1 text-[0.65rem] dark:text-slate-400 text-gray-500"
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${event.color}`} aria-hidden/>
                            {event.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
