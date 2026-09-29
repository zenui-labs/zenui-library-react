import {LuCalendarClock, LuCreditCard, LuShieldCheck, LuUsers} from "react-icons/lu";
import {FaqCardGrid, type FaqTopic} from "./FaqCardGrid";

const topics: FaqTopic[] = [
    {
        id: "booking",
        title: "Booking",
        icon: LuCalendarClock,
        tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
        faqs: [
            {question: "Can clients book outside my hours?", answer: "Only if you allow it. Set buffer times, a minimum notice period and a daily limit per service."},
            {question: "Does it sync with my calendar?", answer: "Two way sync with Google, Outlook and iCloud. Busy events block new bookings within seconds."},
        ],
    },
    {
        id: "payments",
        title: "Payments",
        icon: LuCreditCard,
        tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        faqs: [
            {question: "Can I take deposits?", answer: "Yes. Ask for a fixed amount or a percentage at booking, and charge the rest after the appointment."},
            {question: "What are the card fees?", answer: "2.6% plus 30 cents per charge on every plan. No monthly minimum and no fee on refunds."},
        ],
    },
    {
        id: "team",
        title: "Team",
        icon: LuUsers,
        tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
        faqs: [
            {question: "How do shared schedules work?", answer: "Each staff member has their own hours and services. Clients can pick a person or the first available slot."},
            {question: "Can staff see each other's clients?", answer: "Only if you give them the Manager role. Staff see their own appointments by default."},
        ],
    },
    {
        id: "privacy",
        title: "Privacy",
        icon: LuShieldCheck,
        tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        faqs: [
            {question: "Is client data encrypted?", answer: "Yes, at rest and in transit. Intake forms can be marked sensitive to hide answers from staff without access."},
            {question: "Can clients delete their data?", answer: "Clients can request deletion from any confirmation email, and you approve it with one click."},
        ],
    },
];

const FaqCardGridExample = () => <FaqCardGrid topics={topics}/>;

export default FaqCardGridExample;
