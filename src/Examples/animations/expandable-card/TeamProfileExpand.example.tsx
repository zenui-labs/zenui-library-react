import {useState} from "react";
import {AnimatePresence, LayoutGroup, motion, MotionConfig} from "framer-motion";
import {LuCalendarPlus, LuChevronDown, LuMail, LuMapPin} from "react-icons/lu";

interface Member {
    id: string;
    name: string;
    role: string;
    initials: string;
    tint: string;
    location: string;
    localTime: string;
    status: "online" | "away" | "offline";
    bio: string;
    stats: {label: string; value: string}[];
    skills: string[];
}

const members: Member[] = [
    {
        id: "lena",
        name: "Lena Fischer",
        role: "Product designer",
        initials: "LF",
        tint: "from-rose-400 to-orange-400",
        location: "Berlin",
        localTime: "6:40 PM",
        status: "online",
        bio: "Leads checkout and payments design. Previously built the design system at a fintech in Munich.",
        stats: [{label: "Projects", value: "14"}, {label: "Reviews", value: "212"}, {label: "Joined", value: "2022"}],
        skills: ["Interaction design", "Prototyping", "Research"],
    },
    {
        id: "david",
        name: "David Okafor",
        role: "Staff engineer",
        initials: "DO",
        tint: "from-sky-400 to-indigo-500",
        location: "Lagos",
        localTime: "5:40 PM",
        status: "away",
        bio: "Owns the sync engine and the public API. Happy to pair on anything involving offline data.",
        stats: [{label: "Projects", value: "9"}, {label: "Reviews", value: "486"}, {label: "Joined", value: "2020"}],
        skills: ["TypeScript", "Postgres", "Distributed systems"],
    },
    {
        id: "sofia",
        name: "Sofía Márquez",
        role: "Engineering manager",
        initials: "SM",
        tint: "from-emerald-400 to-teal-500",
        location: "Mexico City",
        localTime: "10:40 AM",
        status: "online",
        bio: "Manages the platform team of eight. Runs the Thursday architecture review, open to anyone.",
        stats: [{label: "Reports", value: "8"}, {label: "Reviews", value: "131"}, {label: "Joined", value: "2021"}],
        skills: ["Hiring", "Planning", "Go"],
    },
    {
        id: "arjun",
        name: "Arjun Mehta",
        role: "Data analyst",
        initials: "AM",
        tint: "from-violet-400 to-fuchsia-500",
        location: "Pune",
        localTime: "10:10 PM",
        status: "offline",
        bio: "Builds the growth dashboards and runs experiment readouts. Ask him before you trust a funnel chart.",
        stats: [{label: "Dashboards", value: "37"}, {label: "Readouts", value: "58"}, {label: "Joined", value: "2023"}],
        skills: ["SQL", "Experiment design", "dbt"],
    },
];

const statusColor: Record<Member["status"], string> = {
    online: "bg-emerald-500",
    away: "bg-amber-400",
    offline: "bg-gray-300 dark:bg-slate-600",
};

// Rows expand in place. Every row has `layout`, so when one grows the rows below slide down smoothly,
// and only one profile is open at a time.
const TeamProfileExpand = () => {
    const [openId, setOpenId] = useState<string | null>("lena");

    return (
        <MotionConfig transition={{type: "spring", stiffness: 380, damping: 34}} reducedMotion="user">
            <LayoutGroup>
                <motion.ul layout className="w-full max-w-md space-y-2">
                    {members.map((member) => {
                        const open = member.id === openId;
                        const panelId = `profile-panel-${member.id}`;
                        return (
                            <motion.li
                                key={member.id}
                                layout
                                style={{borderRadius: 20}}
                                className={`overflow-hidden border bg-white dark:bg-slate-900 ${
                                    open ? "border-gray-300 shadow-lg shadow-gray-900/5 dark:border-slate-700 dark:shadow-black/30" : "border-gray-200 dark:border-slate-800"
                                }`}
                            >
                                <motion.button
                                    layout="position"
                                    type="button"
                                    aria-expanded={open}
                                    aria-controls={panelId}
                                    onClick={() => setOpenId(open ? null : member.id)}
                                    className="flex w-full items-center gap-3 p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                                    style={{borderRadius: 20}}
                                >
                                    <motion.span
                                        layout
                                        className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${member.tint} ${
                                            open ? "h-14 w-14 text-lg" : "h-10 w-10 text-sm"
                                        }`}
                                    >
                                        <motion.span layout="position">{member.initials}</motion.span>
                                        <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white dark:ring-slate-900 ${statusColor[member.status]}`}>
                                            <span className="sr-only">{member.status}</span>
                                        </span>
                                    </motion.span>
                                    <motion.span layout="position" className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-semibold text-gray-900 dark:text-white">{member.name}</span>
                                        <span className="block truncate text-xs text-gray-500 dark:text-slate-400">{member.role}</span>
                                    </motion.span>
                                    <motion.span layout="position" animate={{rotate: open ? 180 : 0}} className="text-gray-400 dark:text-slate-500">
                                        <LuChevronDown className="h-4 w-4" aria-hidden="true"/>
                                    </motion.span>
                                </motion.button>

                                <AnimatePresence initial={false}>
                                    {open && (
                                        <motion.div
                                            id={panelId}
                                            key="panel"
                                            initial={{opacity: 0, y: -6}}
                                            animate={{opacity: 1, y: 0, transition: {delay: 0.08, duration: 0.25}}}
                                            exit={{opacity: 0, transition: {duration: 0.12}}}
                                            className="px-4 pb-4"
                                        >
                                            <p className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
                                                <LuMapPin className="h-3.5 w-3.5" aria-hidden="true"/>
                                                {member.location}, {member.localTime} local time
                                            </p>
                                            <p className="mt-3 text-sm leading-6 text-gray-700 dark:text-slate-300">{member.bio}</p>

                                            <dl className="mt-4 grid grid-cols-3 gap-2">
                                                {member.stats.map((stat, index) => (
                                                    <motion.div
                                                        key={stat.label}
                                                        initial={{opacity: 0, y: 8}}
                                                        animate={{opacity: 1, y: 0, transition: {delay: 0.12 + index * 0.05}}}
                                                        className="rounded-xl bg-gray-50 px-3 py-2 dark:bg-slate-800/60"
                                                    >
                                                        <dt className="text-[11px] text-gray-500 dark:text-slate-400">{stat.label}</dt>
                                                        <dd className="text-base font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
                                                    </motion.div>
                                                ))}
                                            </dl>

                                            <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Skills">
                                                {member.skills.map((skill) => (
                                                    <li key={skill} className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs text-gray-600 dark:border-slate-700 dark:text-slate-300">
                                                        {skill}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="mt-4 grid grid-cols-2 gap-2">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-900 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                                                >
                                                    <LuMail className="h-4 w-4" aria-hidden="true"/>
                                                    Message
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                                >
                                                    <LuCalendarPlus className="h-4 w-4" aria-hidden="true"/>
                                                    Book time
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.li>
                        );
                    })}
                </motion.ul>
            </LayoutGroup>
        </MotionConfig>
    );
};

export default TeamProfileExpand;
