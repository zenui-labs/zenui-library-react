import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight} from "react-icons/lu";

type Industry = "Fintech" | "Healthcare" | "Retail" | "Logistics";
type Filter = "All" | Industry;

interface CaseStudy {
    id: string;
    company: string;
    industry: Industry;
    headline: string;
    metric: string;
    metricLabel: string;
    secondary: string;
    // Background for the card header and the logo mark.
    tone: string;
    mark: string;
}

const studies: CaseStudy[] = [
    {
        id: "ferrox",
        company: "Ferrox",
        industry: "Fintech",
        headline: "Ferrox cut card fraud losses while approving more legitimate payments",
        metric: "-48%",
        metricLabel: "fraud losses",
        secondary: "2.1 pt higher approval rate",
        tone: "from-sky-500 to-indigo-600",
        mark: "F",
    },
    {
        id: "halcyon",
        company: "Halcyon Health",
        industry: "Healthcare",
        headline: "How Halcyon moved 40 clinics to one scheduling system in a quarter",
        metric: "19 min",
        metricLabel: "saved per front desk shift",
        secondary: "HIPAA audit passed first time",
        tone: "from-emerald-500 to-teal-600",
        mark: "H",
    },
    {
        id: "arcadia",
        company: "Arcadia Goods",
        industry: "Retail",
        headline: "Arcadia doubled repeat purchases with personalized restock reminders",
        metric: "2.1x",
        metricLabel: "repeat purchase rate",
        secondary: "$4.3M added revenue",
        tone: "from-rose-500 to-orange-500",
        mark: "A",
    },
    {
        id: "parcelly",
        company: "Parcelly",
        industry: "Logistics",
        headline: "Parcelly reached 99.2% on time delivery during peak season",
        metric: "99.2%",
        metricLabel: "on time deliveries",
        secondary: "Across 1.4M December parcels",
        tone: "from-amber-500 to-yellow-500",
        mark: "P",
    },
    {
        id: "northbeam",
        company: "Northbeam Bank",
        industry: "Fintech",
        headline: "Northbeam opened accounts in minutes instead of days",
        metric: "6 min",
        metricLabel: "median account opening",
        secondary: "From 3 days before",
        tone: "from-violet-500 to-fuchsia-600",
        mark: "N",
    },
    {
        id: "brightline",
        company: "Brightline Pharmacy",
        industry: "Healthcare",
        headline: "Brightline answers refill questions before patients call",
        metric: "-37%",
        metricLabel: "inbound call volume",
        secondary: "4.8 average patient rating",
        tone: "from-cyan-500 to-blue-600",
        mark: "B",
    },
];

const filters: Filter[] = ["All", "Fintech", "Healthcare", "Retail", "Logistics"];

const CaseStudyCards = () => {
    const [filter, setFilter] = useState<Filter>("All");
    const visible = filter === "All" ? studies : studies.filter((s) => s.industry === filter);

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div className="max-w-xl">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Case studies</p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            Results our customers measured themselves
                        </h2>
                    </div>

                    <div role="group" aria-label="Filter by industry" className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                        {filters.map((f) => {
                            const selected = f === filter;
                            return (
                                <button
                                    key={f}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => setFilter(f)}
                                    className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${selected
                                        ? "text-white dark:text-slate-900"
                                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
                                >
                                    {selected && (
                                        <motion.span layoutId="case-study-filter"
                                                     transition={{type: "spring", bounce: 0.2, duration: 0.45}}
                                                     className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"/>
                                    )}
                                    <span className="relative">{f}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p className="sr-only" aria-live="polite">{visible.length} case studies shown</p>

                <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map((study) => (
                            <motion.li
                                key={study.id}
                                layout
                                initial={{opacity: 0, scale: 0.96}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.96}}
                                transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                            >
                                <a
                                    href="#"
                                    className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white outline-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/5 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-900 dark:hover:shadow-none dark:focus-visible:ring-offset-slate-950"
                                >
                                    <div className={`relative flex h-36 items-end justify-between overflow-hidden bg-gradient-to-br p-5 ${study.tone}`}>
                                        <div aria-hidden="true"
                                             className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgb(255_255_255_/_0.5)_1px,transparent_1px)] [background-size:12px_12px] transition-transform duration-700 group-hover:scale-110"/>
                                        <span className="relative flex items-center gap-2 text-white">
                                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold backdrop-blur">{study.mark}</span>
                                            <span className="font-semibold">{study.company}</span>
                                        </span>
                                        <span className="relative rounded-full bg-black/15 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                                            {study.industry}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <p className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">{study.metric}</p>
                                        <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{study.metricLabel}</p>
                                        <h3 className="mt-5 flex-1 text-base font-medium leading-snug text-slate-800 dark:text-slate-200">{study.headline}</h3>
                                        <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4 text-sm dark:border-slate-800">
                                            <span className="text-slate-500 dark:text-slate-400">{study.secondary}</span>
                                            <span className="flex items-center gap-1 font-medium text-slate-900 dark:text-white">
                                                Read
                                                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
};

export default CaseStudyCards;
