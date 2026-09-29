import {useId, useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuMessageSquare, LuPlus, LuSearch} from "react-icons/lu";

type Category = "General" | "Billing" | "Security" | "Integrations";

interface Question {
    id: string;
    category: Category;
    question: string;
    answer: string;
}

const questions: Question[] = [
    {id: "trial", category: "General", question: "How long is the free trial?", answer: "Every workspace gets 14 days on the Team plan with all features turned on. We do not ask for a card until you decide to stay."},
    {id: "seats", category: "General", question: "Who counts as a seat?", answer: "Anyone who can edit or assign work. Viewers, guests and API tokens are free and do not count toward your plan."},
    {id: "import", category: "General", question: "Can I import from another tool?", answer: "Yes. We import projects, issues, comments and attachments from CSV and from most issue trackers. Large imports run in the background and email you when they finish."},
    {id: "change-plan", category: "Billing", question: "What happens when I change plans mid-cycle?", answer: "Upgrades take effect right away and you pay the prorated difference. Downgrades apply at the end of the current billing period."},
    {id: "invoices", category: "Billing", question: "Can I pay by invoice?", answer: "Annual plans with 25 seats or more can pay by bank transfer on net 30 terms. Contact sales and we will set it up."},
    {id: "refunds", category: "Billing", question: "Do you offer refunds?", answer: "If you cancel within 30 days of an annual payment, we refund the unused months in full."},
    {id: "sso", category: "Security", question: "Do you support SSO and SCIM?", answer: "SAML SSO is available on the Business plan. SCIM provisioning works with the major identity providers and removes access within a minute of offboarding."},
    {id: "data", category: "Security", question: "Where is my data stored?", answer: "In the United States by default. Business customers can choose the EU region, and data never leaves the selected region."},
    {id: "soc2", category: "Security", question: "Are you SOC 2 compliant?", answer: "Yes. We complete a SOC 2 Type II audit every year and share the report under NDA from the trust center."},
    {id: "api", category: "Integrations", question: "Is there a public API?", answer: "A REST and GraphQL API covers everything you can do in the app. Rate limits start at 1,000 requests per minute per workspace."},
    {id: "webhooks", category: "Integrations", question: "How do webhooks retry?", answer: "Failed deliveries retry with exponential backoff for up to 24 hours. You can replay any event from the last 30 days in the dashboard."},
];

const categories: Category[] = ["General", "Billing", "Security", "Integrations"];

interface ItemProps {
    item: Question;
    open: boolean;
    onToggle: () => void;
}

const FaqItem = ({item, open, onToggle}: ItemProps) => {
    const id = useId();
    return (
        <div className="border-b border-slate-200 last:border-b-0 dark:border-slate-800">
            <h3>
                <button
                    type="button"
                    id={`${id}-button`}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    onClick={onToggle}
                    className="flex w-full items-center justify-between gap-6 rounded-lg py-5 text-left text-base font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-white"
                >
                    {item.question}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open
                        ? "rotate-45 border-sky-600 bg-sky-600 text-white"
                        : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"}`}>
                        <LuPlus className="h-4 w-4"/>
                    </span>
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-button`}
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 pr-12 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const FaqSection = () => {
    const [category, setCategory] = useState<Category>("General");
    const [query, setQuery] = useState("");
    const [openId, setOpenId] = useState<string | null>("trial");

    const searching = query.trim().length > 0;
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (q) return questions.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(q));
        return questions.filter((item) => item.category === category);
    }, [category, query]);

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div className="md:sticky md:top-8 md:self-start">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Frequently asked questions</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        Answers about plans, billing and security. Search, or pick a topic.
                    </p>

                    <div className="relative mt-6">
                        <label htmlFor="faq-search" className="sr-only">Search questions</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                        <input
                            id="faq-search"
                            type="search"
                            value={query}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder="Search questions"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                        />
                    </div>

                    <nav aria-label="Question topics" className="mt-4">
                        <ul className="flex flex-wrap gap-1 md:flex-col">
                            {categories.map((c) => {
                                const selected = !searching && c === category;
                                const count = questions.filter((q) => q.category === c).length;
                                return (
                                    <li key={c}>
                                        <button
                                            type="button"
                                            aria-current={selected ? "true" : undefined}
                                            onClick={() => {
                                                setQuery("");
                                                setCategory(c);
                                                setOpenId(null);
                                            }}
                                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${selected
                                                ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"}`}
                                        >
                                            {c}
                                            <span className="text-xs tabular-nums text-slate-400">{count}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div>
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
                        {searching ? `${visible.length} result${visible.length === 1 ? "" : "s"} for "${query.trim()}"` : category}
                    </p>
                    <div className="rounded-2xl border border-slate-200 px-5 dark:border-slate-800">
                        {visible.length > 0 ? (
                            visible.map((item) => (
                                <FaqItem key={item.id} item={item} open={openId === item.id}
                                         onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}/>
                            ))
                        ) : (
                            <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
                                No questions match your search. Try a shorter phrase.
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-5 sm:flex-row sm:items-center dark:from-sky-500/10 dark:to-indigo-500/10">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm dark:bg-slate-900 dark:text-sky-400">
                            <LuMessageSquare className="h-5 w-5"/>
                        </span>
                        <div className="flex-1">
                            <p className="font-medium text-slate-900 dark:text-white">Still have a question?</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Our support team replies in under 2 hours on weekdays.</p>
                        </div>
                        <a href="#" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950">
                            Contact support
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
