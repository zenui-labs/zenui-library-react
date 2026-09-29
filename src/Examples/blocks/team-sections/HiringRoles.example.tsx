import {useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuBriefcase, LuClock, LuMapPin} from "react-icons/lu";

type Department = "Engineering" | "Design" | "Sales" | "Support";

interface Role {
    title: string;
    department: Department;
    location: string;
    type: string;
    salary: string;
}

const roles: Role[] = [
    {title: "Senior Frontend Engineer", department: "Engineering", location: "Remote, Europe", type: "Full time", salary: "€85k to €110k"},
    {title: "Platform Engineer, Storage", department: "Engineering", location: "Remote, Americas", type: "Full time", salary: "$150k to $190k"},
    {title: "Engineering Manager, Payments", department: "Engineering", location: "Berlin or remote", type: "Full time", salary: "€115k to €140k"},
    {title: "Product Designer, Editor", department: "Design", location: "Remote, anywhere", type: "Full time", salary: "$120k to $150k"},
    {title: "Account Executive, Mid-market", department: "Sales", location: "New York", type: "Full time", salary: "$95k base, $190k OTE"},
    {title: "Support Engineer, APAC hours", department: "Support", location: "Remote, Asia Pacific", type: "Full time", salary: "A$110k to A$130k"},
];

const tabs: ("All" | Department | "Marketing")[] = ["All", "Engineering", "Design", "Sales", "Support", "Marketing"];

const faces: {initials: string; tone: string; x: string; y: string; size: string}[] = [
    {initials: "RA", tone: "bg-rose-400", x: "8%", y: "10%", size: "h-16 w-16"},
    {initials: "JM", tone: "bg-sky-400", x: "42%", y: "0%", size: "h-20 w-20"},
    {initials: "TK", tone: "bg-amber-400", x: "76%", y: "14%", size: "h-14 w-14"},
    {initials: "LS", tone: "bg-emerald-400", x: "22%", y: "46%", size: "h-14 w-14"},
    {initials: "OB", tone: "bg-violet-400", x: "58%", y: "40%", size: "h-24 w-24"},
    {initials: "NC", tone: "bg-teal-400", x: "4%", y: "74%", size: "h-12 w-12"},
    {initials: "PD", tone: "bg-orange-400", x: "38%", y: "76%", size: "h-16 w-16"},
    {initials: "EW", tone: "bg-fuchsia-400", x: "80%", y: "72%", size: "h-14 w-14"},
];

const stats: {value: string; label: string}[] = [
    {value: "46", label: "People"},
    {value: "19", label: "Countries"},
    {value: "4.8", label: "Glassdoor rating"},
];

const HiringRoles = () => {
    const reduceMotion = useReducedMotion();
    const [tab, setTab] = useState<(typeof tabs)[number]>("All");
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const facesRef = useRef<HTMLDivElement>(null);
    // The floating motion only runs while the avatars are on screen.
    const facesInView = useInView(facesRef);
    const float = facesInView && !reduceMotion;

    const count = (t: (typeof tabs)[number]) => (t === "All" ? roles.length : roles.filter((r) => r.department === t).length);
    const visible = roles.filter((r) => tab === "All" || r.department === tab);

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = tabs.indexOf(tab);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        setTab(tabs[next]);
        tabRefs.current[next]?.focus();
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">Careers at Quarry</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Join a small team that ships every week</h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        We are remote first, meet in person twice a year and publish our salary bands. Every role below
                        shows its range.
                    </p>

                    <div ref={facesRef} className="relative mt-10 h-56" aria-hidden="true">
                        {faces.map((face, i) => (
                            <motion.span key={face.initials}
                                         className={`absolute flex items-center justify-center rounded-full text-sm font-semibold text-white shadow-lg ring-4 ring-white dark:ring-slate-950 ${face.tone} ${face.size}`}
                                         style={{left: face.x, top: face.y}}
                                         initial={{opacity: 0, scale: 0.6}}
                                         whileInView={{opacity: 1, scale: 1}}
                                         viewport={{once: true}}
                                         transition={{delay: i * 0.05, type: "spring", stiffness: 260, damping: 18}}>
                                <motion.span className="flex h-full w-full items-center justify-center"
                                             animate={float ? {y: [0, i % 2 ? -5 : 5, 0]} : {y: 0}}
                                             transition={float ? {duration: 4 + (i % 3), repeat: Infinity, ease: "easeInOut"} : {duration: 0.3}}>
                                    {face.initials}
                                </motion.span>
                            </motion.span>
                        ))}
                    </div>

                    <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <dt className="text-xs text-slate-500 dark:text-slate-400">{s.label}</dt>
                                <dd className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{s.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                <div>
                    <div role="tablist" aria-label="Departments" onKeyDown={onKeyDown}
                         className="flex gap-1 overflow-x-auto border-b border-slate-200 [scrollbar-width:none] dark:border-slate-800 [&::-webkit-scrollbar]:hidden">
                        {tabs.map((t, i) => (
                            <button key={t} ref={(el) => {
                                tabRefs.current[i] = el;
                            }}
                                    id={`roles-tab-${t}`} type="button" role="tab" aria-selected={tab === t} aria-controls="roles-panel"
                                    tabIndex={tab === t ? 0 : -1} onClick={() => setTab(t)}
                                    className={`relative shrink-0 rounded-t-md px-3 pb-3 pt-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 ${tab === t ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}>
                                {t}
                                <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] tabular-nums text-slate-600 dark:bg-slate-800 dark:text-slate-300">{count(t)}</span>
                                {tab === t && <motion.span layoutId="roles-underline" className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-sky-600 dark:bg-sky-400"/>}
                            </button>
                        ))}
                    </div>

                    <div id="roles-panel" role="tabpanel" aria-labelledby={`roles-tab-${tab}`} className="mt-4 min-h-[320px]">
                        <AnimatePresence mode="wait" initial={false}>
                            {visible.length ? (
                                <motion.ul key={tab} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -6}} transition={{duration: 0.18}}
                                           className="space-y-2">
                                    {visible.map((role) => (
                                        <li key={role.title}>
                                            <a href="#"
                                               className="group flex items-center gap-4 rounded-2xl border border-transparent p-4 outline-none transition-colors hover:border-slate-200 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:border-slate-800 dark:hover:bg-slate-900">
                                                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 sm:flex dark:bg-sky-500/10 dark:text-sky-300">
                                                    <LuBriefcase className="h-4 w-4"/>
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block font-semibold text-slate-900 dark:text-white">{role.title}</span>
                                                    <span className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 dark:text-slate-400">
                                                        <span className="inline-flex items-center gap-1"><LuMapPin className="h-3.5 w-3.5" aria-hidden="true"/>{role.location}</span>
                                                        <span className="inline-flex items-center gap-1"><LuClock className="h-3.5 w-3.5" aria-hidden="true"/>{role.type}</span>
                                                        <span className="font-medium text-slate-700 dark:text-slate-300">{role.salary}</span>
                                                    </span>
                                                </span>
                                                <LuArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-sky-600 dark:group-hover:text-sky-400" aria-hidden="true"/>
                                            </a>
                                        </li>
                                    ))}
                                </motion.ul>
                            ) : (
                                <motion.div key="empty" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                            className="rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
                                    <p className="font-semibold text-slate-900 dark:text-white">No open {tab.toLowerCase()} roles right now</p>
                                    <p className="mx-auto mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
                                        Leave your details and we will write to you when a role opens. We read every profile.
                                    </p>
                                    <a href="#"
                                       className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white outline-none hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950">
                                        Join the talent pool
                                    </a>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HiringRoles;
