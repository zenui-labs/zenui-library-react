import {useEffect, useId, useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuMail, LuMapPin, LuSearch, LuX} from "react-icons/lu";

type Department = "Engineering" | "Design" | "Sales" | "Support" | "Operations";
type SortKey = "name" | "location" | "start";

interface Person {
    name: string;
    role: string;
    department: Department;
    city: string;
    timeZone: string;
    started: number;
    email: string;
}

const people: Person[] = [
    {name: "Aiko Watanabe", role: "Frontend Engineer", department: "Engineering", city: "Tokyo", timeZone: "Asia/Tokyo", started: 2021, email: "aiko@parcel.dev"},
    {name: "Benjamin Clarke", role: "Account Executive", department: "Sales", city: "London", timeZone: "Europe/London", started: 2023, email: "ben@parcel.dev"},
    {name: "Carla Mendes", role: "Support Lead", department: "Support", city: "São Paulo", timeZone: "America/Sao_Paulo", started: 2020, email: "carla@parcel.dev"},
    {name: "David Kim", role: "Platform Engineer", department: "Engineering", city: "Seoul", timeZone: "Asia/Seoul", started: 2022, email: "david@parcel.dev"},
    {name: "Elena Popescu", role: "Product Designer", department: "Design", city: "Bucharest", timeZone: "Europe/Bucharest", started: 2021, email: "elena@parcel.dev"},
    {name: "Farid Rahman", role: "Data Engineer", department: "Engineering", city: "Dhaka", timeZone: "Asia/Dhaka", started: 2024, email: "farid@parcel.dev"},
    {name: "Grace Mwangi", role: "Head of Operations", department: "Operations", city: "Nairobi", timeZone: "Africa/Nairobi", started: 2019, email: "grace@parcel.dev"},
    {name: "Hugo Lefèvre", role: "Brand Designer", department: "Design", city: "Paris", timeZone: "Europe/Paris", started: 2023, email: "hugo@parcel.dev"},
    {name: "Isabel Torres", role: "Sales Engineer", department: "Sales", city: "Mexico City", timeZone: "America/Mexico_City", started: 2022, email: "isabel@parcel.dev"},
    {name: "Jonah Weiss", role: "Support Engineer", department: "Support", city: "Toronto", timeZone: "America/Toronto", started: 2024, email: "jonah@parcel.dev"},
    {name: "Kiri Parata", role: "Engineering Manager", department: "Engineering", city: "Auckland", timeZone: "Pacific/Auckland", started: 2020, email: "kiri@parcel.dev"},
    {name: "Lucía Romero", role: "People Partner", department: "Operations", city: "Madrid", timeZone: "Europe/Madrid", started: 2022, email: "lucia@parcel.dev"},
];

const departments: ("All" | Department)[] = ["All", "Engineering", "Design", "Sales", "Support", "Operations"];

const badge: Record<Department, string> = {
    Engineering: "bg-sky-50 text-sky-700 ring-sky-200 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-500/20",
    Design: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-200 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:ring-fuchsia-500/20",
    Sales: "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-500/20",
    Support: "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/20",
    Operations: "bg-slate-100 text-slate-700 ring-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:ring-slate-500/20",
};

const localTime = (timeZone: string, now: Date) => {
    const parts = new Intl.DateTimeFormat("en-US", {timeZone, hour: "numeric", minute: "2-digit", hour12: true}).formatToParts(now);
    const hour24 = Number(new Intl.DateTimeFormat("en-US", {timeZone, hour: "numeric", hourCycle: "h23"}).format(now));
    const text = parts.map((p) => p.value).join("");
    return {text, working: hour24 >= 9 && hour24 < 18};
};

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

const TeamDirectory = () => {
    const searchId = useId();
    const [query, setQuery] = useState("");
    const [department, setDepartment] = useState<"All" | Department>("All");
    const [sort, setSort] = useState<SortKey>("name");
    const [now, setNow] = useState(() => new Date());

    // Local times only change once a minute.
    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 30_000);
        return () => window.clearInterval(timer);
    }, []);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = people.filter((p) =>
            (department === "All" || p.department === department) &&
            (!q || `${p.name} ${p.role} ${p.city}`.toLowerCase().includes(q)));
        return [...filtered].sort((a, b) => {
            if (sort === "location") return a.city.localeCompare(b.city);
            if (sort === "start") return a.started - b.started;
            return a.name.localeCompare(b.name);
        });
    }, [query, department, sort]);

    const clear = () => {
        setQuery("");
        setDepartment("All");
    };

    const onlineCount = people.filter((p) => localTime(p.timeZone, now).working).length;

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Team directory</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">{people.length} people at Parcel, with their local time.</p>
                    </div>
                    <p className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                        {onlineCount} in working hours now
                    </p>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
                    <div className="relative">
                        <label htmlFor={searchId} className="sr-only">Search people</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                        <input id={searchId} type="search" value={query} placeholder="Search by name, role or city"
                               onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                               className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-slate-600 dark:focus:ring-white/5 [&::-webkit-search-cancel-button]:hidden"/>
                        {query && (
                            <button type="button" onClick={() => setQuery("")} aria-label="Clear search"
                                    className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 outline-none hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 dark:hover:text-slate-200">
                                <LuX className="h-3.5 w-3.5"/>
                            </button>
                        )}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="sr-only sm:not-sr-only">Team</span>
                        <select value={department} onChange={(e: ChangeEvent<HTMLSelectElement>) => setDepartment(e.target.value as "All" | Department)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                            {departments.map((d) => <option key={d} value={d}>{d === "All" ? "All teams" : d}</option>)}
                        </select>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="sr-only sm:not-sr-only">Sort</span>
                        <select value={sort} onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value as SortKey)}
                                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
                            <option value="name">Name</option>
                            <option value="location">City</option>
                            <option value="start">Start date</option>
                        </select>
                    </label>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="hidden grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1fr)_2.5rem] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-slate-500 md:grid dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400" aria-hidden="true">
                        <span>Name</span><span>Team</span><span>Location</span><span>Local time</span><span/>
                    </div>
                    <ul aria-label="People" className="divide-y divide-slate-100 dark:divide-slate-800">
                        <AnimatePresence initial={false}>
                            {visible.map((person) => {
                                const time = localTime(person.timeZone, now);
                                return (
                                    <motion.li key={person.email} layout="position"
                                               initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.18}}
                                               className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-5 py-3.5 transition-colors hover:bg-slate-50 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,1fr)_2.5rem] dark:hover:bg-slate-900/60">
                                        <div className="flex min-w-0 items-center gap-3">
                                            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                                                {initials(person.name)}
                                                <span className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white dark:ring-slate-950 ${time.working ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600"}`}
                                                      title={time.working ? "In working hours" : "Outside working hours"}/>
                                            </span>
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">{person.name}</p>
                                                <p className="truncate text-sm text-slate-500 dark:text-slate-400">{person.role} <span className="text-slate-400 dark:text-slate-500">since {person.started}</span></p>
                                            </div>
                                        </div>
                                        <span className="order-last col-span-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-12 md:order-none md:col-span-1 md:pl-0">
                                            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${badge[person.department]}`}>{person.department}</span>
                                            <span className="inline-flex items-center gap-1 text-xs text-slate-500 md:hidden dark:text-slate-400">
                                                <LuMapPin className="h-3 w-3" aria-hidden="true"/>{person.city}, {time.text}
                                            </span>
                                        </span>
                                        <span className="hidden items-center gap-1.5 text-sm text-slate-600 md:flex dark:text-slate-300">
                                            <LuMapPin className="h-3.5 w-3.5 text-slate-400" aria-hidden="true"/>{person.city}
                                        </span>
                                        <span className="hidden text-sm tabular-nums text-slate-600 md:block dark:text-slate-300">
                                            {time.text}
                                            <span className="sr-only">{time.working ? ", in working hours" : ", outside working hours"}</span>
                                        </span>
                                        <a href={`mailto:${person.email}`} aria-label={`Email ${person.name}`}
                                           className="flex h-9 w-9 items-center justify-center justify-self-end rounded-lg text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                                            <LuMail className="h-4 w-4"/>
                                        </a>
                                    </motion.li>
                                );
                            })}
                        </AnimatePresence>
                    </ul>
                    {visible.length === 0 && (
                        <div className="px-5 py-14 text-center">
                            <p className="font-medium text-slate-900 dark:text-white">No one matches those filters</p>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Try a different name or city, or show every team.</p>
                            <button type="button" onClick={clear}
                                    className="mt-4 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
                <p className="mt-3 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">Showing {visible.length} of {people.length}</p>
            </div>
        </section>
    );
};

export default TeamDirectory;
