import {EventRegistration} from "./EventRegistration";
import type {AgendaItem, EventDetails, EventHost, EventSession} from "./EventRegistration";

const details: EventDetails = {
    month: "Oct",
    day: "23",
    location: "Online, free",
    duration: "90 minutes, three time zones",
    hostsLine: "Hosted by Priya Natarajan and Tomás Ibarra",
    calendarTitle: "Build week: offline-first apps workshop",
    calendarDetails: "Live workshop hosted by Priya Natarajan and Tomás Ibarra.",
};

const sessions: EventSession[] = [
    {id: "emea", label: "10:00 London", region: "Europe and Africa", startUtc: "20261023T090000Z", endUtc: "20261023T103000Z", seats: 300, taken: 262},
    {id: "amer", label: "11:00 New York", region: "Americas", startUtc: "20261023T150000Z", endUtc: "20261023T163000Z", seats: 300, taken: 181},
    {id: "apac", label: "10:00 Singapore", region: "Asia Pacific", startUtc: "20261024T020000Z", endUtc: "20261024T033000Z", seats: 200, taken: 196},
];

const agenda: AgendaItem[] = [
    {time: "0:00", title: "Why offline-first changes your data model", speaker: "Priya Natarajan"},
    {time: "0:25", title: "Live build: sync a to-do app with conflict handling", speaker: "Tomás Ibarra"},
    {time: "1:05", title: "Questions from the audience", speaker: "Both hosts"},
];

const hosts: EventHost[] = [
    {initials: "PN", color: "bg-fuchsia-500"},
    {initials: "TI", color: "bg-sky-500"},
];

// Replace with a request to your event platform.
const register = () => new Promise<void>((resolve) => window.setTimeout(resolve, 1000));

const EventRegistrationExample = () => (
    <EventRegistration details={details} sessions={sessions} agenda={agenda} hosts={hosts} defaultValue="amer" onSubmit={register}/>
);

export default EventRegistrationExample;
