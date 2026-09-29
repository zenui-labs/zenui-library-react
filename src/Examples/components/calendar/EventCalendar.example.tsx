import {EventCalendar, type CalendarEvent} from "./EventCalendar";

const now = new Date();
const inThisMonth = (day: number) => new Date(now.getFullYear(), now.getMonth(), day);

const events: CalendarEvent[] = [
    {date: inThisMonth(3), label: "Team sync", color: "bg-blue-500"},
    {date: inThisMonth(8), label: "Design review", color: "bg-purple-500"},
    {date: inThisMonth(14), label: "Release day", color: "bg-green-500"},
    {date: inThisMonth(21), label: "Sprint planning", color: "bg-yellow-500"},
    {date: inThisMonth(27), label: "Q3 demo", color: "bg-red-500"},
];

const EventCalendarExample = () => <EventCalendar events={events}/>;

export default EventCalendarExample;
