import {useEffect, useRef, useState} from "react";
import type {MouseEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuCreditCard, LuPlug, LuRocket, LuShieldCheck, LuUsers} from "react-icons/lu";

interface Faq {
    question: string;
    answer: string;
}

interface Section {
    id: string;
    title: string;
    icon: ReactNode;
    faqs: Faq[];
}

const sections: Section[] = [
    {
        id: "getting-started",
        title: "Getting started",
        icon: <LuRocket className="h-4 w-4"/>,
        faqs: [
            {question: "How long does setup take?", answer: "Most teams connect their first data source and publish a dashboard in under 20 minutes. Our onboarding checklist walks you through each step."},
            {question: "Do I need to know SQL?", answer: "No. The visual query builder covers filters, joins and aggregations. Analysts who prefer SQL can switch any chart to the editor and back."},
            {question: "Can I try it with sample data?", answer: "Every new workspace includes a sample e-commerce dataset with 18 months of orders, so you can explore before connecting anything."},
        ],
    },
    {
        id: "billing",
        title: "Plans and billing",
        icon: <LuCreditCard className="h-4 w-4"/>,
        faqs: [
            {question: "How is pricing calculated?", answer: "By editor seats. Viewers are free and unlimited on every plan, so you can share dashboards with the whole company."},
            {question: "Is there a discount for nonprofits?", answer: "Registered nonprofits and schools get 50% off any annual plan. Email us your registration details to apply."},
            {question: "Can I switch between monthly and annual billing?", answer: "Yes, from the billing page. Switching to annual applies a prorated credit for the unused part of your month."},
        ],
    },
    {
        id: "data",
        title: "Data sources",
        icon: <LuPlug className="h-4 w-4"/>,
        faqs: [
            {question: "Which databases can I connect?", answer: "Postgres, MySQL, SQL Server, BigQuery, Snowflake, Redshift and ClickHouse, plus 60 SaaS sources such as Stripe and HubSpot."},
            {question: "Do you copy my data?", answer: "Queries run live against your warehouse by default. Optional caching stores query results, never raw tables, for up to 24 hours."},
            {question: "How often do dashboards refresh?", answer: "As often as every minute on Business plans, or on demand. Each tile shows when its data was last updated."},
        ],
    },
    {
        id: "sharing",
        title: "Sharing and teams",
        icon: <LuUsers className="h-4 w-4"/>,
        faqs: [
            {question: "Can I embed dashboards in my app?", answer: "Yes. Signed embed URLs apply row level filters per customer, so each tenant only sees their own numbers."},
            {question: "Can I schedule reports by email?", answer: "Send any dashboard as a PDF or CSV on a schedule, to people inside or outside your workspace."},
        ],
    },
    {
        id: "security",
        title: "Security",
        icon: <LuShieldCheck className="h-4 w-4"/>,
        faqs: [
            {question: "Is Chartwell SOC 2 compliant?", answer: "Yes. We hold a SOC 2 Type II report, renewed every year, available from the trust center under NDA."},
            {question: "Can I restrict access by IP?", answer: "Business plans can limit workspace access to a list of IP ranges and require SSO for every member."},
        ],
    },
];

const FaqSideNav = () => {
    const [active, setActive] = useState(sections[0].id);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const reduceMotion = useReducedMotion();

    // Highlight the section nearest the top third of the viewport.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting);
                if (visible.length === 0) return;
                visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                const id = (visible[0].target as HTMLElement).dataset.section;
                if (id) setActive(id);
            },
            {rootMargin: "-20% 0px -60% 0px"},
        );
        sectionRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const jumpTo = (event: MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
        event.preventDefault();
        setActive(id);
        const target = sectionRefs.current[index];
        target?.scrollIntoView({behavior: reduceMotion ? "auto" : "smooth", block: "start"});
        target?.focus({preventScroll: true});
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Help and answers</h2>
                    <p className="mt-3 text-slate-600 dark:text-slate-400">
                        Everything teams ask about Chartwell before and after they sign up, grouped by topic.
                    </p>
                </div>

                <div className="mt-12 grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
                    <nav aria-label="FAQ topics" className="lg:sticky lg:top-8 lg:self-start">
                        <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
                            {sections.map((section, i) => {
                                const isActive = section.id === active;
                                return (
                                    <li key={section.id} className="shrink-0">
                                        <a
                                            href={`#faq-${section.id}`}
                                            onClick={(e) => jumpTo(e, section.id, i)}
                                            aria-current={isActive ? "location" : undefined}
                                            className={`relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${isActive
                                                ? "text-indigo-700 dark:text-indigo-300"
                                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
                                        >
                                            {isActive && (
                                                <motion.span layoutId="faq-side-nav-active"
                                                             transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                             className="absolute inset-0 rounded-lg bg-indigo-50 dark:bg-indigo-500/10"/>
                                            )}
                                            <span className="relative">{section.icon}</span>
                                            <span className="relative whitespace-nowrap">{section.title}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                        <div className="mt-8 hidden rounded-2xl border border-slate-200 p-4 lg:block dark:border-slate-800">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">Need a hand?</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">Book a 20 minute call with a data specialist.</p>
                            <a href="#" className="mt-3 inline-block rounded text-xs font-semibold text-indigo-600 outline-none hover:text-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                                Pick a time
                            </a>
                        </div>
                    </nav>

                    <div className="space-y-14">
                        {sections.map((section, i) => (
                            <section
                                key={section.id}
                                id={`faq-${section.id}`}
                                ref={(el) => {
                                    sectionRefs.current[i] = el;
                                }}
                                data-section={section.id}
                                tabIndex={-1}
                                aria-labelledby={`faq-${section.id}-title`}
                                className="scroll-mt-8 outline-none"
                            >
                                <h3 id={`faq-${section.id}-title`} className="flex items-center gap-3 text-lg font-semibold text-slate-900 dark:text-white">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">{section.icon}</span>
                                    {section.title}
                                </h3>
                                <dl className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">
                                    {section.faqs.map((faq) => (
                                        <div key={faq.question}>
                                            <dt className="font-medium text-slate-900 dark:text-white">{faq.question}</dt>
                                            <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSideNav;
