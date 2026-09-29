import { useState, useEffect, useRef } from 'react';
import { toast, Toaster } from '@components/Feedback/Toast';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import { calendarContents } from '@utils/ContentsConfig/DataDisplayContents';
import { useScrollSpy } from '@/CustomHooks/useScrollSpy';

// react helmet
import { Helmet } from 'react-helmet';

// icons
import { MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineCalendarMonth, MdOutlineCheck } from 'react-icons/md';

import Showcode from '@shared/Component/ShowCode.tsx';
import ToggleTab from '@shared/Component/ToggleTab.tsx';
import ContentNavbar from '@shared/Component/ContentNavbar.tsx';
import ComponentDescription from '@shared/Component/ComponentDescription.tsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.tsx';

// ─── helpers ────────────────────────────────────────────────────────────────
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const getDays = (year, month) => new Date(year, month + 1, 0).getDate();
const getStartDay = (year, month) => new Date(year, month, 1).getDay();
const today = new Date();

const isSameDay = (a, b) =>
    a && b && a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

// ─── Basic Calendar ──────────────────────────────────────────────────────────
const BasicCalendar = () => {
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());

    const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

    const days = getDays(year, month);
    const start = getStartDay(year, month);

    return (
        <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
                </button>
                <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
                    {MONTHS[month]} {year}
                </span>
                <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
                </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[0.65rem] font-medium dark:text-slate-400 text-gray-400 py-1">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: start }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: days }).map((_, i) => {
                    const date = i + 1;
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    return (
                        <div
                            key={date}
                            className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] transition-colors
                                ${isToday ? 'bg-[#0FABCA] text-white font-semibold' : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'}`}
                        >
                            {date}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// ─── Date Picker ────────────────────────────────────────────────────────────
const DatePicker = () => {
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(null);

    const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

    const days = getDays(year, month);
    const start = getStartDay(year, month);

    const pick = (date) => setSelected(new Date(year, month, date));

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
                    </button>
                    <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
                        {MONTHS[month]} {year}
                    </span>
                    <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
                    </button>
                </div>
                <div className="grid grid-cols-7 mb-1">
                    {DAYS.map(d => (
                        <div key={d} className="text-center text-[0.65rem] font-medium dark:text-slate-400 text-gray-400 py-1">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: start }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: days }).map((_, i) => {
                        const date = i + 1;
                        const dateObj = new Date(year, month, date);
                        const isSelected = isSameDay(selected, dateObj);
                        const isToday = isSameDay(dateObj, today);
                        return (
                            <div
                                key={date}
                                onClick={() => pick(date)}
                                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors
                                    ${isSelected ? 'bg-[#0FABCA] text-white font-semibold'
                                        : isToday ? 'border border-[#0FABCA] dark:text-slate-200 text-gray-700'
                                            : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                            >
                                {date}
                            </div>
                        );
                    })}
                </div>
            </div>
            {selected && (
                <p className="text-sm dark:text-slate-300 text-gray-600">
                    Selected: <span className="font-medium text-[#0FABCA]">
                        {selected.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                </p>
            )}
        </div>
    );
};

// ─── Date Range Picker ───────────────────────────────────────────────────────
const DateRangePicker = () => {
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [range, setRange] = useState({ start: null, end: null });
    const [hovered, setHovered] = useState(null);

    const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

    const days = getDays(year, month);
    const start = getStartDay(year, month);

    const pick = (date) => {
        const d = new Date(year, month, date);
        if (!range.start || (range.start && range.end)) {
            setRange({ start: d, end: null });
        } else {
            if (d < range.start) setRange({ start: d, end: range.start });
            else setRange({ start: range.start, end: d });
        }
    };

    const inRange = (date) => {
        const d = new Date(year, month, date);
        const end = range.end ?? hovered;
        if (!range.start || !end) return false;
        const [lo, hi] = range.start <= end ? [range.start, end] : [end, range.start];
        return d > lo && d < hi;
    };

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
                    </button>
                    <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
                        {MONTHS[month]} {year}
                    </span>
                    <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                        <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
                    </button>
                </div>
                <div className="grid grid-cols-7 mb-1">
                    {DAYS.map(d => (
                        <div key={d} className="text-center text-[0.65rem] font-medium dark:text-slate-400 text-gray-400 py-1">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                    {Array.from({ length: start }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: days }).map((_, i) => {
                        const date = i + 1;
                        const dateObj = new Date(year, month, date);
                        const isStart = isSameDay(range.start, dateObj);
                        const isEnd = isSameDay(range.end, dateObj);
                        const isBetween = inRange(date);

                        return (
                            <div
                                key={date}
                                onClick={() => pick(date)}
                                onMouseEnter={() => !range.end && range.start && setHovered(dateObj)}
                                onMouseLeave={() => setHovered(null)}
                                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors
                                    ${(isStart || isEnd) ? 'bg-[#0FABCA] text-white font-semibold'
                                        : isBetween ? 'bg-[#0FABCA]/15 dark:bg-[#0FABCA]/20 dark:text-slate-200 text-gray-700 rounded-none'
                                            : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                            >
                                {date}
                            </div>
                        );
                    })}
                </div>
            </div>
            <p className="text-sm dark:text-slate-300 text-gray-600 text-center">
                {range.start && range.end
                    ? <>
                        <span className="font-medium text-[#0FABCA]">{range.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        {' → '}
                        <span className="font-medium text-[#0FABCA]">{range.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </>
                    : range.start
                        ? 'Pick end date'
                        : 'Pick start date'}
            </p>
        </div>
    );
};

// ─── Calendar with Events ───────────────────────────────────────────────────
const SAMPLE_EVENTS = {
    3: { label: 'Team sync', color: 'bg-blue-500' },
    8: { label: 'Design review', color: 'bg-purple-500' },
    14: { label: 'Release day', color: 'bg-green-500' },
    21: { label: 'Sprint planning', color: 'bg-yellow-500' },
    27: { label: 'Q3 demo', color: 'bg-red-500' },
};

const EventCalendar = () => {
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [active, setActive] = useState(null);

    const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

    const days = getDays(year, month);
    const start = getStartDay(year, month);

    return (
        <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
                </button>
                <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
                    {MONTHS[month]} {year}
                </span>
                <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                    <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
                </button>
            </div>
            <div className="grid grid-cols-7 mb-1">
                {DAYS.map(d => (
                    <div key={d} className="text-center text-[0.65rem] font-medium dark:text-slate-400 text-gray-400 py-1">{d}</div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
                {Array.from({ length: start }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: days }).map((_, i) => {
                    const date = i + 1;
                    const event = SAMPLE_EVENTS[date];
                    const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const isActive = active === date;

                    return (
                        <div
                            key={date}
                            onClick={() => setActive(isActive ? null : date)}
                            className="relative flex flex-col items-center cursor-pointer"
                        >
                            <div className={`flex items-center justify-center h-8 w-8 rounded-full text-[0.8rem] transition-colors
                                ${isToday ? 'bg-[#0FABCA] text-white font-semibold'
                                    : isActive ? 'bg-gray-100 dark:bg-slate-700 dark:text-slate-200 text-gray-700'
                                        : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'}`}>
                                {date}
                            </div>
                            {event && (
                                <span className={`h-1 w-1 rounded-full ${event.color} mt-0.5`} />
                            )}
                            {isActive && event && (
                                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-slate-900 text-white text-[0.6rem] px-2 py-1 rounded whitespace-nowrap z-10 shadow-lg">
                                    {event.label}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700 flex flex-wrap gap-2">
                {Object.entries(SAMPLE_EVENTS).map(([day, ev]) => (
                    <div key={day} className="flex items-center gap-1 text-[0.65rem] dark:text-slate-400 text-gray-500">
                        <span className={`h-1.5 w-1.5 rounded-full ${ev.color}`} />
                        {ev.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

// ─── Hotel Booking Picker ────────────────────────────────────────────────────
// scrollable year list 2000-2999, auto-scrolls to active year
const YearDropdown = ({ year, onSelect }) => {
    const YEARS = Array.from({ length: 1000 }, (_, i) => 2000 + i);
    const listRef  = useRef(null);
    const activeRef = useRef(null);

    useEffect(() => {
        if (activeRef.current && listRef.current) {
            // centre the active year in the visible area
            const { offsetTop, offsetHeight } = activeRef.current;
            listRef.current.scrollTop = offsetTop - listRef.current.clientHeight / 2 + offsetHeight / 2;
        }
    }, []);

    return (
        <div
            ref={listRef}
            className="h-48 overflow-y-auto py-2 scrollbar-thin"
            style={{ scrollbarWidth: 'thin' }}
        >
            {YEARS.map((y) => (
                <button
                    key={y}
                    ref={y === year ? activeRef : null}
                    onClick={() => onSelect(y)}
                    className={`w-full px-4 py-1.5 text-sm text-left transition-colors
                        ${y === year
                            ? 'bg-[#0FABCA] text-white font-semibold'
                            : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                >
                    {y}
                </button>
            ))}
        </div>
    );
};

interface DatePickerPopupProps {
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    minDate?: Date | null;
    onClose: () => void;
}

const DatePickerPopup = ({ selectedDate, onSelect, minDate, onClose }: DatePickerPopupProps) => {
    const [year, setYear]   = useState(selectedDate ? selectedDate.getFullYear() : today.getFullYear());
    const [month, setMonth] = useState(selectedDate ? selectedDate.getMonth() : today.getMonth());
    const [view, setView]   = useState('day'); // 'day' | 'month' | 'year'

    const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
    const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

    const days  = getDays(year, month);
    const start = getStartDay(year, month);

    const isDisabled = (date) => {
        if (!minDate) return false;
        const d = new Date(year, month, date); d.setHours(0, 0, 0, 0);
        const mn = new Date(minDate);          mn.setHours(0, 0, 0, 0);
        return d < mn;
    };

    return (
        <div className="w-[290px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
            {/* header */}
            <div className="bg-[#0FABCA] px-4 py-2.5 flex items-center justify-between">
                <button onClick={prev} className="p-1 rounded hover:bg-white/20 transition-colors text-white">
                    <MdOutlineChevronLeft className="text-xl" />
                </button>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setView(v => v === 'month' ? 'day' : 'month')}
                        className="text-sm font-semibold text-white hover:underline"
                    >
                        {MONTHS[month]}
                    </button>
                    <button
                        onClick={() => setView(v => v === 'year' ? 'day' : 'year')}
                        className="text-sm font-semibold text-white hover:underline"
                    >
                        {year}
                    </button>
                </div>
                <button onClick={next} className="p-1 rounded hover:bg-white/20 transition-colors text-white">
                    <MdOutlineChevronRight className="text-xl" />
                </button>
            </div>

            {/* month grid */}
            {view === 'month' && (
                <div className="grid grid-cols-3 gap-2 p-4">
                    {MONTHS.map((m, i) => (
                        <button key={m} onClick={() => { setMonth(i); setView('day'); }}
                            className={`py-1.5 text-xs rounded-lg font-medium transition-colors
                                ${i === month ? 'bg-[#0FABCA] text-white' : 'hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300 text-gray-700'}`}>
                            {m.slice(0, 3)}
                        </button>
                    ))}
                </div>
            )}

            {/* year scrollable dropdown */}
            {view === 'year' && (
                <YearDropdown year={year} onSelect={(y) => { setYear(y); setView('day'); }} />
            )}

            {/* day grid */}
            {view === 'day' && (
                <div className="p-3">
                    <div className="grid grid-cols-7 mb-1">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-[0.6rem] font-medium dark:text-slate-400 text-gray-400 py-1">{d}</div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-y-1">
                        {Array.from({ length: start }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: days }).map((_, i) => {
                            const date    = i + 1;
                            const dateObj = new Date(year, month, date);
                            const isSelected = isSameDay(selectedDate, dateObj);
                            const isToday    = isSameDay(dateObj, today);
                            const disabled   = isDisabled(date);

                            return (
                                <button
                                    key={date}
                                    disabled={disabled}
                                    onClick={() => { onSelect(dateObj); onClose(); }}
                                    className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.78rem] transition-colors
                                        ${disabled   ? 'text-gray-300 dark:text-slate-600 cursor-not-allowed'
                                        : isSelected ? 'bg-[#0FABCA] text-white font-semibold'
                                        : isToday    ? 'border border-[#0FABCA] text-[#0FABCA] font-medium dark:text-[#0FABCA]'
                                        : 'dark:text-slate-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer'}`}
                                >
                                    {date}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

const FromToDatePicker = () => {
    const [fromDate,    setFromDate]    = useState(null);
    const [toDate,      setToDate]      = useState(null);
    const [openPicker,  setOpenPicker]  = useState(null); // 'from' | 'to' | null
    const ref = useRef(null);

    useEffect(() => {
        const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpenPicker(null); };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const fmt = (d) => d
        ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : null;

    const handleConfirm = () => {
        if (!fromDate || !toDate) return;
        toast.success('Date range selected!', {
            description: `${fmt(fromDate)} → ${fmt(toDate)}`,
        });
    };

    return (
        <div ref={ref} className="w-full max-w-[420px]">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-5 flex flex-col gap-4">

                <p className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">Select date range</p>

                {/* from / to row */}
                <div className="grid grid-cols-2 gap-3 relative">
                    {/* from */}
                    <div>
                        <label className="text-[0.68rem] font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1 block">
                            From
                        </label>
                        <button
                            onClick={() => setOpenPicker(p => p === 'from' ? null : 'from')}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors bg-gray-50 dark:bg-slate-700/50
                                ${openPicker === 'from'
                                    ? 'border-[#0FABCA] ring-2 ring-[#0FABCA]/20'
                                    : 'border-gray-200 dark:border-slate-600 hover:border-[#0FABCA]'}`}
                        >
                            <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" />
                            <span className={`text-[0.78rem] truncate ${fromDate ? 'text-gray-800 dark:text-slate-200 font-medium' : 'text-gray-400 dark:text-slate-500'}`}>
                                {fmt(fromDate) ?? 'Start date'}
                            </span>
                        </button>

                        {openPicker === 'from' && (
                            <div className="absolute top-full left-0 mt-2 z-50">
                                <DatePickerPopup
                                    selectedDate={fromDate}
                                    onSelect={(d) => { setFromDate(d); if (toDate && d >= toDate) setToDate(null); }}
                                    onClose={() => setOpenPicker(null)}
                                />
                            </div>
                        )}
                    </div>

                    {/* to */}
                    <div>
                        <label className="text-[0.68rem] font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1 block">
                            To
                        </label>
                        <button
                            onClick={() => setOpenPicker(p => p === 'to' ? null : 'to')}
                            className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors bg-gray-50 dark:bg-slate-700/50
                                ${openPicker === 'to'
                                    ? 'border-[#0FABCA] ring-2 ring-[#0FABCA]/20'
                                    : 'border-gray-200 dark:border-slate-600 hover:border-[#0FABCA]'}`}
                        >
                            <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" />
                            <span className={`text-[0.78rem] truncate ${toDate ? 'text-gray-800 dark:text-slate-200 font-medium' : 'text-gray-400 dark:text-slate-500'}`}>
                                {fmt(toDate) ?? 'End date'}
                            </span>
                        </button>

                        {openPicker === 'to' && (
                            <div className="absolute top-full right-0 mt-2 z-50">
                                <DatePickerPopup
                                    selectedDate={toDate}
                                    minDate={fromDate}
                                    onSelect={setToDate}
                                    onClose={() => setOpenPicker(null)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* summary */}
                {fromDate && toDate && (
                    <div className="bg-[#0FABCA]/10 dark:bg-[#0FABCA]/15 border border-[#0FABCA]/30 rounded-xl px-4 py-2.5 text-[0.75rem] dark:text-slate-300 text-gray-700 flex items-center gap-2">
                        <MdOutlineCalendarMonth className="text-[#0FABCA] shrink-0" />
                        <span>
                            <span className="font-semibold text-[#0FABCA]">{fmt(fromDate)}</span>
                            {' → '}
                            <span className="font-semibold text-[#0FABCA]">{fmt(toDate)}</span>
                        </span>
                    </div>
                )}

                {/* confirm */}
                <button
                    onClick={handleConfirm}
                    disabled={!fromDate || !toDate}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0FABCA] hover:bg-[#0891b2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold"
                >
                    <MdOutlineCheck className="text-base" />
                    Confirm dates
                </button>
            </div>
            <Toaster position="bottom-right" />
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const Calendar = () => {
    const sectionIds = calendarContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [basicPreview, setBasicPreview] = useState(true);
    const [basicCode, setBasicCode] = useState(false);
    const [pickerPreview, setPickerPreview] = useState(true);
    const [pickerCode, setPickerCode] = useState(false);
    const [rangePreview, setRangePreview] = useState(true);
    const [rangeCode, setRangeCode] = useState(false);
    const [eventPreview, setEventPreview] = useState(true);
    const [eventCode, setEventCode] = useState(false);
    const [bookingPreview, setBookingPreview] = useState(true);
    const [bookingCode, setBookingCode] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>

                    {/* ── 1. Basic Calendar ── */}
                    <ContentHeader text="basic calendar" id="basic_calendar" />
                    <ComponentDescription text="A month-view calendar with previous and next navigation and the current day highlighted." />
                    <ToggleTab
                        preview={basicPreview} setPreview={setBasicPreview}
                        code={basicCode} setCode={setBasicCode}
                    />
                    <ComponentWrapper>
                        {basicPreview && (
                            <div className="p-8 flex justify-center">
                                <BasicCalendar />
                            </div>
                        )}
                        {basicCode && (
                            <Showcode code='
import { useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = new Date();

export default function BasicCalendar() {
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const days = new Date(year, month + 1, 0).getDate();
  const start = new Date(year, month, 1).getDay();

  return (
    <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
          <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
        </button>
        <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
          {MONTHS[month]} {year}
        </span>
        <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
          <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[0.65rem] font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: start }).map((_, i) => <div key={i} />)}
        {Array.from({ length: days }).map((_, i) => {
          const date = i + 1;
          const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          return (
            <div key={date}
              className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] transition-colors
                ${isToday ? "bg-[#0FABCA] text-white font-semibold" : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"}`}>
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    {/* ── 2. Date Picker ── */}
                    <ContentHeader text="date picker" id="date_picker" />
                    <ComponentDescription text="A date picker. Click any date to select it, and the selected date is highlighted and shown below the calendar." />
                    <ToggleTab
                        preview={pickerPreview} setPreview={setPickerPreview}
                        code={pickerCode} setCode={setPickerCode}
                    />
                    <ComponentWrapper>
                        {pickerPreview && (
                            <div className="p-8 flex justify-center">
                                <DatePicker />
                            </div>
                        )}
                        {pickerCode && (
                            <Showcode code='
import { useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = new Date();

const isSameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export default function DatePicker() {
  const [year, setYear]       = useState(today.getFullYear());
  const [month, setMonth]     = useState(today.getMonth());
  const [selected, setSelected] = useState<Date | null>(null);

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const days = new Date(year, month + 1, 0).getDate();
  const start = new Date(year, month, 1).getDay();

  const pick = (date: number) => setSelected(new Date(year, month, date));

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
          </button>
          <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
            {MONTHS[month]} {year}
          </span>
          <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[0.65rem] font-medium text-gray-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: start }).map((_, i) => <div key={i} />)}
          {Array.from({ length: days }).map((_, i) => {
            const date = i + 1;
            const dateObj = new Date(year, month, date);
            const isSelected = isSameDay(selected, dateObj);
            const isToday = isSameDay(dateObj, today);
            return (
              <div key={date} onClick={() => pick(date)}
                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors
                  ${isSelected ? "bg-[#0FABCA] text-white font-semibold"
                    : isToday ? "border border-[#0FABCA] dark:text-slate-200 text-gray-700"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"}`}>
                {date}
              </div>
            );
          })}
        </div>
      </div>

      {selected && (
        <p className="text-sm dark:text-slate-300 text-gray-600">
          Selected: <span className="font-medium text-[#0FABCA]">
            {selected.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </p>
      )}
    </div>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    {/* ── 3. Date Range Picker ── */}
                    <ContentHeader text="date range picker" id="date_range_picker" />
                    <ComponentDescription text="A date range picker. Select a start and end date, and hover to preview the range before confirming." />
                    <ToggleTab
                        preview={rangePreview} setPreview={setRangePreview}
                        code={rangeCode} setCode={setRangeCode}
                    />
                    <ComponentWrapper>
                        {rangePreview && (
                            <div className="p-8 flex justify-center">
                                <DateRangePicker />
                            </div>
                        )}
                        {rangeCode && (
                            <Showcode code='
import { useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = new Date();

interface DateRange {
  start: Date | null;
  end: Date | null;
}

const isSameDay = (a: Date | null, b: Date | null) =>
  !!a && !!b && a.toDateString() === b.toDateString();

export default function DateRangePicker() {
  const [year, setYear]       = useState(today.getFullYear());
  const [month, setMonth]     = useState(today.getMonth());
  const [range, setRange]     = useState<DateRange>({ start: null, end: null });
  const [hovered, setHovered] = useState<Date | null>(null);

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const days = new Date(year, month + 1, 0).getDate();
  const start = new Date(year, month, 1).getDay();

  const pick = (date: number) => {
    const d = new Date(year, month, date);
    if (!range.start || (range.start && range.end)) {
      setRange({ start: d, end: null });          // first click → set start
    } else {
      if (d < range.start) setRange({ start: d, end: range.start });
      else                 setRange({ start: range.start, end: d }); // second click → set end
    }
  };

  const inRange = (date: number) => {
    const d   = new Date(year, month, date);
    const end = range.end ?? hovered;
    if (!range.start || !end) return false;
    const [lo, hi] = range.start <= end ? [range.start, end] : [end, range.start];
    return d > lo && d < hi;
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
          </button>
          <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
            {MONTHS[month]} {year}
          </span>
          <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
          </button>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAYS.map(d => (
            <div key={d} className="text-center text-[0.65rem] font-medium text-gray-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-1">
          {Array.from({ length: start }).map((_, i) => <div key={i} />)}
          {Array.from({ length: days }).map((_, i) => {
            const date = i + 1;
            const dateObj = new Date(year, month, date);
            const isEdge = isSameDay(range.start, dateObj) || isSameDay(range.end, dateObj);
            return (
              <div key={date}
                onClick={() => pick(date)}
                onMouseEnter={() => !range.end && range.start && setHovered(dateObj)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.8rem] cursor-pointer transition-colors
                  ${isEdge ? "bg-[#0FABCA] text-white font-semibold"
                    : inRange(date) ? "bg-[#0FABCA]/15 text-gray-700 dark:text-slate-200 rounded-none"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"}`}>
                {date}
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-sm dark:text-slate-300 text-gray-600 text-center">
        {range.start && range.end
          ? `${range.start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} → ${range.end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
          : range.start ? "Pick end date" : "Pick start date"}
      </p>
    </div>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    {/* ── 4. Calendar with Events ── */}
                    <ContentHeader text="calendar with events" id="calendar_with_events" />
                    <ComponentDescription text="A calendar that attaches events to dates and marks them with colored dots. Click a date to see its event label." />
                    <ToggleTab
                        preview={eventPreview} setPreview={setEventPreview}
                        code={eventCode} setCode={setEventCode}
                    />
                    <ComponentWrapper>
                        {eventPreview && (
                            <div className="p-8 flex justify-center">
                                <EventCalendar />
                            </div>
                        )}
                        {eventCode && (
                            <Showcode code='
import { useState } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight } from "react-icons/md";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today = new Date();

interface CalendarEvent {
  label: string;
  color: string;
}

// Define events keyed by day-of-month
const EVENTS: Record<number, CalendarEvent> = {
  3:  { label: "Team sync",      color: "bg-blue-500" },
  8:  { label: "Design review",  color: "bg-purple-500" },
  14: { label: "Release day",    color: "bg-green-500" },
  21: { label: "Sprint planning",color: "bg-yellow-500" },
};

export default function EventCalendar() {
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [active, setActive] = useState<number | null>(null);

  const prev = () => { if (month === 0) { setYear(y => y - 1); setMonth(11); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setYear(y => y + 1); setMonth(0); } else setMonth(m => m + 1); };

  const days = new Date(year, month + 1, 0).getDate();
  const start = new Date(year, month, 1).getDay();

  return (
    <div className="w-[300px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
          <MdOutlineChevronLeft className="text-xl dark:text-slate-300" />
        </button>
        <span className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">
          {MONTHS[month]} {year}
        </span>
        <button onClick={next} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
          <MdOutlineChevronRight className="text-xl dark:text-slate-300" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-[0.65rem] font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: start }).map((_, i) => <div key={i} />)}
        {Array.from({ length: days }).map((_, i) => {
          const date = i + 1;
          const event = EVENTS[date];
          const isToday = date === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isActive = active === date;

          return (
            <div key={date} className="relative flex flex-col items-center cursor-pointer" onClick={() => setActive(isActive ? null : date)}>
              <div className={`flex items-center justify-center h-8 w-8 rounded-full text-[0.8rem] transition-colors
                ${isToday ? "bg-[#0FABCA] text-white font-semibold"
                  : isActive ? "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200"
                  : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"}`}>
                {date}
              </div>

              {/* event dot */}
              {event && <span className={`h-1 w-1 rounded-full ${event.color} mt-0.5`} />}

              {/* tooltip on click */}
              {isActive && event && (
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[0.6rem] px-2 py-1 rounded whitespace-nowrap z-10">
                  {event.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    {/* ── 5. From / To Date Picker ── */}
                    <ContentHeader text="from / to date picker" id="hotel_booking_picker" />
                    <ComponentDescription text="Choose a start and end date from a popup calendar with year, month, and day views. Years run from 2000 to 2999, and confirming shows a toast with the range." />
                    <ToggleTab
                        preview={bookingPreview} setPreview={setBookingPreview}
                        code={bookingCode} setCode={setBookingCode}
                    />
                    <ComponentWrapper>
                        {bookingPreview && (
                            <div className="p-8 flex justify-center">
                                <FromToDatePicker />
                            </div>
                        )}
                        {bookingCode && (
                            <Showcode code='
import { useState, useEffect, useRef } from "react";
import { MdOutlineChevronLeft, MdOutlineChevronRight, MdOutlineCalendarMonth, MdOutlineCheck } from "react-icons/md";

// ── helpers ──────────────────────────────────────────────────────────────────
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const today  = new Date();
const getDays     = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getStartDay = (y: number, m: number) => new Date(y, m, 1).getDay();
const isSameDay   = (a: Date | null, b: Date | null) => !!a && !!b && a.toDateString() === b.toDateString();

// ── YearDropdown — scrollable list 2000-2999 ─────────────────────────────────
interface YearDropdownProps {
  year: number;
  onSelect: (year: number) => void;
}

const YearDropdown = ({ year, onSelect }: YearDropdownProps) => {
  const YEARS    = Array.from({ length: 1000 }, (_, i) => 2000 + i);
  const listRef  = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && listRef.current) {
      const { offsetTop, offsetHeight } = activeRef.current;
      listRef.current.scrollTop = offsetTop - listRef.current.clientHeight / 2 + offsetHeight / 2;
    }
  }, []);

  return (
    <div ref={listRef} className="h-48 overflow-y-auto py-2" style={{ scrollbarWidth: "thin" }}>
      {YEARS.map((y) => (
        <button key={y} ref={y === year ? activeRef : null} onClick={() => onSelect(y)}
          className={`w-full px-4 py-1.5 text-sm text-left transition-colors
            ${y === year ? "bg-[#0FABCA] text-white font-semibold" : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700"}`}>
          {y}
        </button>
      ))}
    </div>
  );
};

// ── DatePickerPopup ───────────────────────────────────────────────────────────
type CalendarView = "day" | "month" | "year";

interface DatePickerPopupProps {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  minDate?: Date | null;
  onClose: () => void;
}

const DatePickerPopup = ({ selectedDate, onSelect, minDate, onClose }: DatePickerPopupProps) => {
  const [year, setYear]   = useState(selectedDate?.getFullYear() ?? today.getFullYear());
  const [month, setMonth] = useState(selectedDate?.getMonth()    ?? today.getMonth());
  const [view, setView]   = useState<CalendarView>("day");

  const prev = () => { if (month === 0) { setYear(y => y-1); setMonth(11); } else setMonth(m => m-1); };
  const next = () => { if (month === 11){ setYear(y => y+1); setMonth(0);  } else setMonth(m => m+1); };

  const isDisabled = (date: number) => {
    if (!minDate) return false;
    const d = new Date(year, month, date); d.setHours(0,0,0,0);
    const mn = new Date(minDate);          mn.setHours(0,0,0,0);
    return d < mn;
  };

  return (
    <div className="w-[290px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
      {/* teal header */}
      <div className="bg-[#0FABCA] px-4 py-2.5 flex items-center justify-between">
        <button onClick={prev} className="p-1 rounded hover:bg-white/20 text-white"><MdOutlineChevronLeft className="text-xl" /></button>
        <div className="flex items-center gap-2">
          <button onClick={() => setView(v => v==="month"?"day":"month")} className="text-sm font-semibold text-white hover:underline">{MONTHS[month]}</button>
          <button onClick={() => setView(v => v==="year" ?"day":"year" )} className="text-sm font-semibold text-white hover:underline">{year}</button>
        </div>
        <button onClick={next} className="p-1 rounded hover:bg-white/20 text-white"><MdOutlineChevronRight className="text-xl" /></button>
      </div>

      {view === "month" && (
        <div className="grid grid-cols-3 gap-2 p-4">
          {MONTHS.map((m, i) => (
            <button key={m} onClick={() => { setMonth(i); setView("day"); }}
              className={`py-1.5 text-xs rounded-lg font-medium transition-colors ${i===month?"bg-[#0FABCA] text-white":"hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-slate-300 text-gray-700"}`}>
              {m.slice(0,3)}
            </button>
          ))}
        </div>
      )}

      {/* year scrollable dropdown — 2000 to 2999 */}
      {view === "year" && <YearDropdown year={year} onSelect={(y) => { setYear(y); setView("day"); }} />}

      {view === "day" && (
        <div className="p-3">
          <div className="grid grid-cols-7 mb-1">
            {DAYS.map(d => <div key={d} className="text-center text-[0.6rem] font-medium text-gray-400 py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-y-1">
            {Array.from({ length: getStartDay(year, month) }).map((_,i) => <div key={i} />)}
            {Array.from({ length: getDays(year, month) }).map((_,i) => {
              const date = i + 1;
              const d    = new Date(year, month, date);
              const disabled  = isDisabled(date);
              const isSelected= isSameDay(selectedDate, d);
              const isToday   = isSameDay(d, today);
              return (
                <button key={date} disabled={disabled} onClick={() => { onSelect(d); onClose(); }}
                  className={`flex items-center justify-center h-8 w-8 mx-auto rounded-full text-[0.78rem] transition-colors
                    ${disabled   ? "text-gray-300 dark:text-slate-600 cursor-not-allowed"
                    : isSelected ? "bg-[#0FABCA] text-white font-semibold"
                    : isToday    ? "border border-[#0FABCA] text-[#0FABCA] font-medium"
                    : "text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"}`}>
                  {date}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ── FromToDatePicker ──────────────────────────────────────────────────────────
export default function FromToDatePicker() {
  const [fromDate,   setFromDate]   = useState<Date | null>(null);
  const [toDate,     setToDate]     = useState<Date | null>(null);
  const [openPicker, setOpenPicker] = useState<"from" | "to" | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpenPicker(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fmt = (d: Date | null) => d?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const handleConfirm = () => {
    if (!fromDate || !toDate) return;
    // replace with your own handler — show toast, submit form, etc.
    alert(`${fmt(fromDate)} → ${fmt(toDate)}`);
  };

  return (
    <div ref={ref} className="w-full max-w-[420px]">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-5 flex flex-col gap-4">
        <p className="text-sm font-semibold dark:text-[#abc2d3] text-gray-800">Select date range</p>

        <div className="grid grid-cols-2 gap-3 relative">
          {/* From */}
          <div>
            <label className="text-[0.68rem] font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1 block">From</label>
            <button onClick={() => setOpenPicker(p => p==="from" ? null : "from")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors bg-gray-50 dark:bg-slate-700/50
                ${openPicker==="from" ? "border-[#0FABCA] ring-2 ring-[#0FABCA]/20" : "border-gray-200 dark:border-slate-600 hover:border-[#0FABCA]"}`}>
              <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" />
              <span className={`text-[0.78rem] truncate ${fromDate ? "text-gray-800 dark:text-slate-200 font-medium" : "text-gray-400 dark:text-slate-500"}`}>
                {fmt(fromDate) ?? "Start date"}
              </span>
            </button>
            {openPicker === "from" && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <DatePickerPopup selectedDate={fromDate}
                  onSelect={(d) => { setFromDate(d); if (toDate && d >= toDate) setToDate(null); }}
                  onClose={() => setOpenPicker(null)} />
              </div>
            )}
          </div>

          {/* To */}
          <div>
            <label className="text-[0.68rem] font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400 mb-1 block">To</label>
            <button onClick={() => setOpenPicker(p => p==="to" ? null : "to")}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-colors bg-gray-50 dark:bg-slate-700/50
                ${openPicker==="to" ? "border-[#0FABCA] ring-2 ring-[#0FABCA]/20" : "border-gray-200 dark:border-slate-600 hover:border-[#0FABCA]"}`}>
              <MdOutlineCalendarMonth className="text-[#0FABCA] text-base shrink-0" />
              <span className={`text-[0.78rem] truncate ${toDate ? "text-gray-800 dark:text-slate-200 font-medium" : "text-gray-400 dark:text-slate-500"}`}>
                {fmt(toDate) ?? "End date"}
              </span>
            </button>
            {openPicker === "to" && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <DatePickerPopup selectedDate={toDate} minDate={fromDate}
                  onSelect={setToDate} onClose={() => setOpenPicker(null)} />
              </div>
            )}
          </div>
        </div>

        {/* summary */}
        {fromDate && toDate && (
          <div className="bg-[#0FABCA]/10 dark:bg-[#0FABCA]/15 border border-[#0FABCA]/30 rounded-xl px-4 py-2.5 text-[0.75rem] dark:text-slate-300 text-gray-700 flex items-center gap-2">
            <MdOutlineCalendarMonth className="text-[#0FABCA] shrink-0" />
            <span>
              <span className="font-semibold text-[#0FABCA]">{fmt(fromDate)}</span>
              {" → "}
              <span className="font-semibold text-[#0FABCA]">{fmt(toDate)}</span>
            </span>
          </div>
        )}

        <button onClick={handleConfirm} disabled={!fromDate || !toDate}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0FABCA] hover:bg-[#0891b2] disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold">
          <MdOutlineCheck className="text-base" />
          Confirm dates
        </button>
      </div>
    </div>
  );
}
            ' />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/timeline'
                        backName='timeline'
                        forwardName='product card'
                        forwardUrl='/components/product-card'
                    />
                </div>

                <ContentNavbar contents={calendarContents} activeSection={activeSection} />
            </aside>

            <Helmet>
                <title>Data Display - Calendar</title>
            </Helmet>
        </>
    );
};

export default Calendar;
