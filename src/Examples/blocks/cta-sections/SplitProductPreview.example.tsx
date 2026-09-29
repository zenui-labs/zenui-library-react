import {LuCalendar, LuInbox, LuUsers} from "react-icons/lu";
import {CalendarPreview, SplitProductPreview} from "./SplitProductPreview";
import type {CalendarEvent, CalendarNavItem, CalendarSource} from "./SplitProductPreview";

const days: string[] = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"];
const hours: string[] = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];

const events: CalendarEvent[] = [
    {title: "Roadmap review", time: "9:00", day: 0, start: 0, length: 2, tone: "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200"},
    {title: "Design critique", time: "11:00", day: 1, start: 2, length: 1, tone: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200"},
    {title: "Focus time", time: "9:00", day: 2, start: 0, length: 3, tone: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200"},
    {title: "Hiring sync", time: "1:00", day: 2, start: 4, length: 1, tone: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-200"},
    {title: "Customer call", time: "10:00", day: 3, start: 1, length: 2, tone: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-400/30 dark:bg-sky-500/15 dark:text-sky-200"},
    {title: "Weekly demo", time: "12:00", day: 4, start: 3, length: 2, tone: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200"},
];

const navItems: CalendarNavItem[] = [
    {label: "Inbox", icon: LuInbox},
    {label: "Calendar", icon: LuCalendar, active: true},
    {label: "People", icon: LuUsers},
];

const calendars: CalendarSource[] = [
    {name: "Product", color: "bg-indigo-500"},
    {name: "Hiring", color: "bg-amber-500"},
    {name: "Personal", color: "bg-emerald-500"},
];

const SplitProductPreviewExample = () => (
    <SplitProductPreview
        preview={<CalendarPreview days={days} hours={hours} events={events} navItems={navItems} calendars={calendars}/>}
        notification={{title: "Standup moved to 10:30", detail: "Frees a 2 hour focus block on Wednesday."}}
        rating={{score: 4.8, reviewCount: 2300}}
    />
);

export default SplitProductPreviewExample;
