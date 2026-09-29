import {forwardRef, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuGithub, LuLinkedin, LuMapPin, LuTwitter} from "react-icons/lu";

export interface TeamMemberLinks {
    github?: string;
    linkedin?: string;
    /** Profile on X. */
    twitter?: string;
}

export interface TeamMember {
    name: string;
    role: string;
    /** Team name used by the filter buttons, for example "Engineering". */
    team: string;
    location: string;
    bio: string;
    /** Two Tailwind gradient stops for the avatar background, for example "from-rose-400 to-orange-400". */
    gradient: string;
    links: TeamMemberLinks;
}

export interface HiringCardContent {
    /** Small uppercase label at the top of the card. */
    eyebrow?: string;
    title: string;
    body: string;
    linkLabel?: string;
    href: string;
}

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

const SocialLink = ({href, label, children}: {href: string; label: string; children: ReactNode}) => (
    <a href={href} aria-label={label}
       className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-white">
        {children}
    </a>
);

export interface TeamMemberCardProps {
    member: TeamMember;
}

/** One member card. It renders an animated `li`, so place it inside a list. */
export const TeamMemberCard = forwardRef<HTMLLIElement, TeamMemberCardProps>(({member}, ref) => (
    <motion.li
        ref={ref}
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
));

TeamMemberCard.displayName = "TeamMemberCard";

export interface TeamGridProps {
    members: TeamMember[];
    /** Filter buttons after the "all" button. Defaults to each team in the order it first appears in `members`. */
    teams?: string[];
    /** Label of the button that shows every member. */
    allLabel?: string;
    /** Selected filter when you control it. Use `allLabel` for everyone. */
    value?: string;
    /** Filter selected on first render. Defaults to `allLabel`. */
    defaultValue?: string;
    onChange?: (team: string) => void;
    /** Card shown after the members. Leave it out to hide the card. */
    hiring?: HiringCardContent;
    eyebrow?: string;
    title?: ReactNode;
    description?: ReactNode;
    className?: string;
}

/** Team member cards with a filter by team and an optional hiring card at the end. */
export const TeamGrid = ({
    members,
    teams,
    allLabel = "Everyone",
    value,
    defaultValue,
    onChange,
    hiring,
    eyebrow = "Our team",
    title = "24 people in 11 time zones",
    description = "We work in writing first, meet twice a week and get together in person every spring.",
    className = "",
}: TeamGridProps) => {
    const [internal, setInternal] = useState<string>(defaultValue ?? allLabel);
    const team = value ?? internal;
    const filters = [allLabel, ...(teams ?? Array.from(new Set(members.map((m) => m.team))))];
    const visible = members.filter((m) => team === allLabel || m.team === team);

    const select = (next: string) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    return (
        <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-6 md:grid-cols-2 md:items-end">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                            {title}
                        </h2>
                    </div>
                    <p className="text-slate-600 md:text-right dark:text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by team">
                    {filters.map((t) => (
                        <button key={t} type="button" aria-pressed={team === t} onClick={() => select(t)}
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
                            <TeamMemberCard key={member.name} member={member}/>
                        ))}
                        {hiring && (
                            <motion.li
                                key="hiring"
                                layout
                                className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-indigo-300 bg-indigo-50/60 p-5 dark:border-indigo-500/40 dark:bg-indigo-500/5"
                            >
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{hiring.eyebrow ?? "We are hiring"}</p>
                                    <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{hiring.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                        {hiring.body}
                                    </p>
                                </div>
                                <a href={hiring.href} className="group/link mt-6 inline-flex items-center gap-1.5 self-start rounded-lg text-sm font-semibold text-indigo-700 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-300">
                                    {hiring.linkLabel ?? "See open roles"}
                                    <LuArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5"/>
                                </a>
                            </motion.li>
                        )}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </section>
    );
};
