import {useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuGithub, LuLinkedin, LuMapPin, LuTwitter} from "react-icons/lu";

type Team = "Leadership" | "Engineering" | "Design";

interface Member {
    name: string;
    role: string;
    team: Team;
    location: string;
    bio: string;
    // Two Tailwind gradient stops for the avatar background.
    gradient: string;
    links: {github?: string; linkedin?: string; twitter?: string};
}

const members: Member[] = [
    {name: "Ana Ribeiro", role: "Co-founder and CEO", team: "Leadership", location: "Lisbon", bio: "Previously ran payments at a travel startup. Writes the Friday update.", gradient: "from-rose-400 to-orange-400", links: {linkedin: "#", twitter: "#"}},
    {name: "Kwame Asante", role: "Co-founder and CTO", team: "Leadership", location: "Accra", bio: "Built the first sync engine on a train between two cities.", gradient: "from-sky-400 to-indigo-500", links: {github: "#", linkedin: "#"}},
    {name: "Sofia Lindqvist", role: "Staff Engineer", team: "Engineering", location: "Stockholm", bio: "Owns the query planner and the on-call rotation rules.", gradient: "from-emerald-400 to-cyan-500", links: {github: "#"}},
    {name: "Ravi Menon", role: "Product Designer", team: "Design", location: "Bengaluru", bio: "Designs the editor and keeps the icon set at exactly 212 icons.", gradient: "from-violet-400 to-fuchsia-500", links: {twitter: "#", linkedin: "#"}},
    {name: "Chloe Martin", role: "Engineering Manager", team: "Engineering", location: "Montreal", bio: "Runs the platform team and the monthly architecture review.", gradient: "from-amber-400 to-yellow-500", links: {github: "#", linkedin: "#"}},
    {name: "Yuki Sato", role: "Design Engineer", team: "Design", location: "Osaka", bio: "Prototypes interactions in code before they reach a mockup.", gradient: "from-pink-400 to-rose-500", links: {github: "#", twitter: "#"}},
    {name: "Mateo Alvarez", role: "Backend Engineer", team: "Engineering", location: "Buenos Aires", bio: "Made exports 10 times faster and now looks after billing.", gradient: "from-teal-400 to-emerald-600", links: {github: "#"}},
];

const teams: ("Everyone" | Team)[] = ["Everyone", "Leadership", "Engineering", "Design"];

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

const SocialLink = ({href, label, children}: {href: string; label: string; children: ReactNode}) => (
    <a href={href} aria-label={label}
       className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-white">
        {children}
    </a>
);

const TeamGrid = () => {
    const [team, setTeam] = useState<"Everyone" | Team>("Everyone");
    const visible = members.filter((m) => team === "Everyone" || m.team === team);

    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Our team</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            24 people in 11 time zones
                        </h2>
                    </div>
                    <p className="text-slate-600 md:text-right dark:text-slate-400">
                        We work in writing first, meet twice a week and get together in person every spring.
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by team">
                    {teams.map((t) => (
                        <button key={t} type="button" aria-pressed={team === t} onClick={() => setTeam(t)}
                                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${team === t
                                    ? "border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-900"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700"}`}>
                            {t}
                        </button>
                    ))}
                </div>

                <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <AnimatePresence initial={false} mode="popLayout">
                        {visible.map((member) => (
                            <motion.li
                                key={member.name}
                                layout
                                initial={{opacity: 0, scale: 0.95}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.95}}
                                transition={{duration: 0.25}}
                                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <div className="flex items-start justify-between">
                                    <div className={`relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br text-lg font-semibold text-white ${member.gradient}`}>
                                        <span className="absolute -bottom-3 -right-3 h-8 w-8 rounded-full bg-white/25 transition-transform duration-500 group-hover:scale-[2.5]"/>
                                        <span className="relative">{initials(member.name)}</span>
                                    </div>
                                    <div className="flex">
                                        {member.links.github && <SocialLink href={member.links.github} label={`${member.name} on GitHub`}><LuGithub className="h-4 w-4"/></SocialLink>}
                                        {member.links.linkedin && <SocialLink href={member.links.linkedin} label={`${member.name} on LinkedIn`}><LuLinkedin className="h-4 w-4"/></SocialLink>}
                                        {member.links.twitter && <SocialLink href={member.links.twitter} label={`${member.name} on X`}><LuTwitter className="h-4 w-4"/></SocialLink>}
                                    </div>
                                </div>
                                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{member.name}</h3>
                                <p className="text-sm text-indigo-600 dark:text-indigo-400">{member.role}</p>
                                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{member.bio}</p>
                                <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500">
                                    <LuMapPin className="h-3.5 w-3.5"/> {member.location}
                                </p>
                            </motion.li>
                        ))}
                        <motion.li
                            key="hiring"
                            layout
                            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/60 p-5 dark:border-indigo-500/40 dark:bg-indigo-500/5"
                        >
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">We are hiring</p>
                                <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">4 open roles, fully remote</h3>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Senior frontend, platform engineer, support lead and a product designer.
                                </p>
                            </div>
                            <a href="#" className="group/link mt-6 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-indigo-700 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-300">
                                See open roles
                                <LuArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5"/>
                            </a>
                        </motion.li>
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
};

export default TeamGrid;
