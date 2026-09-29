import type {ReactNode} from "react";
import {motion} from "framer-motion";
import {LuArrowRight, LuCalendarClock, LuCreditCard, LuShieldCheck, LuUsers} from "react-icons/lu";

interface Faq {
    question: string;
    answer: string;
}

interface Group {
    id: string;
    title: string;
    icon: ReactNode;
    tone: string;
    faqs: Faq[];
}

const groups: Group[] = [
    {
        id: "booking",
        title: "Booking",
        icon: <LuCalendarClock className="h-4 w-4"/>,
        tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
        faqs: [
            {question: "Can clients book outside my hours?", answer: "Only if you allow it. Set buffer times, a minimum notice period and a daily limit per service."},
            {question: "Does it sync with my calendar?", answer: "Two way sync with Google, Outlook and iCloud. Busy events block new bookings within seconds."},
        ],
    },
    {
        id: "payments",
        title: "Payments",
        icon: <LuCreditCard className="h-4 w-4"/>,
        tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
        faqs: [
            {question: "Can I take deposits?", answer: "Yes. Ask for a fixed amount or a percentage at booking, and charge the rest after the appointment."},
            {question: "What are the card fees?", answer: "2.6% plus 30 cents per charge on every plan. No monthly minimum and no fee on refunds."},
        ],
    },
    {
        id: "team",
        title: "Team",
        icon: <LuUsers className="h-4 w-4"/>,
        tone: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
        faqs: [
            {question: "How do shared schedules work?", answer: "Each staff member has their own hours and services. Clients can pick a person or the first available slot."},
            {question: "Can staff see each other's clients?", answer: "Only if you give them the Manager role. Staff see their own appointments by default."},
        ],
    },
    {
        id: "privacy",
        title: "Privacy",
        icon: <LuShieldCheck className="h-4 w-4"/>,
        tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
        faqs: [
            {question: "Is client data encrypted?", answer: "Yes, at rest and in transit. Intake forms can be marked sensitive to hide answers from staff without access."},
            {question: "Can clients delete their data?", answer: "Clients can request deletion from any confirmation email, and you approve it with one click."},
        ],
    },
];

const FaqCardGrid = () => (
    <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Good to know before you switch
                    </h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        The questions studios and clinics ask most often when they move their bookings to Slotwise.
                    </p>
                </div>
                <nav aria-label="Jump to topic">
                    <ul className="flex flex-wrap gap-2">
                        {groups.map((group) => (
                            <li key={group.id}>
                                <a
                                    href={`#faq-grid-${group.id}`}
                                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:text-white"
                                >
                                    {group.icon} {group.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2">
                {groups.map((group, g) => (
                    <motion.section
                        key={group.id}
                        id={`faq-grid-${group.id}`}
                        aria-labelledby={`faq-grid-${group.id}-title`}
                        initial={{opacity: 0, y: 16}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true, amount: 0.2}}
                        transition={{delay: (g % 2) * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                        className="scroll-mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900"
                    >
                        <h3 id={`faq-grid-${group.id}-title`} className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${group.tone}`}>{group.icon}</span>
                            {group.title}
                        </h3>
                        <dl className="mt-6 divide-y divide-slate-100 dark:divide-slate-800">
                            {group.faqs.map((faq) => (
                                <div key={faq.question} className="py-5 first:pt-0 last:pb-0">
                                    <dt className="font-medium text-slate-900 dark:text-white">{faq.question}</dt>
                                    <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</dd>
                                </div>
                            ))}
                        </dl>
                        <a
                            href="#"
                            className="group mt-6 inline-flex items-center gap-1 rounded text-sm font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-white"
                        >
                            More about {group.title.toLowerCase()}
                            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                        </a>
                    </motion.section>
                ))}
            </div>
        </div>
    </section>
);

export default FaqCardGrid;
