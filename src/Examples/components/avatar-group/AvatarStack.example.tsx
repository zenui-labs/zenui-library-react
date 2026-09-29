import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuPlus} from "react-icons/lu";

interface Member {
    name: string;
    role: string;
}

interface AvatarStackProps {
    members: Member[];
    max?: number;
    size?: "sm" | "md";
}

const gradients = [
    "from-rose-400 to-orange-400",
    "from-sky-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-fuchsia-500",
    "from-amber-400 to-rose-500",
    "from-cyan-400 to-blue-500",
];

const gradientFor = (name: string) => gradients[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length];
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

const Avatar = ({name, className = ""}: {name: string; className?: string}) => (
    <span className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ${gradientFor(name)} ${className}`} aria-hidden>
        {initials(name)}
    </span>
);

const AvatarStack = ({members, max = 4, size = "md"}: AvatarStackProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const popoverId = useId();
    const reduceMotion = useReducedMotion();
    const visible = members.slice(0, max);
    const hidden = members.slice(max);
    const dimension = size === "sm" ? "size-7 text-[10px]" : "size-9 text-xs";

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            setOpen(false);
            buttonRef.current?.focus();
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative flex items-center">
            <p className="sr-only">{members.length} members: {members.map((member) => member.name).join(", ")}</p>
            <ul className="flex -space-x-2" aria-hidden>
                {visible.map((member, index) => (
                    <li key={member.name} className="group relative" style={{zIndex: visible.length - index}}>
                        <Avatar
                            name={member.name}
                            className={`${dimension} ring-2 ring-white transition-transform duration-200 group-hover:-translate-y-1 dark:ring-zinc-900`}
                        />
                        <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900">
                            {member.name}
                        </span>
                    </li>
                ))}
            </ul>

            {hidden.length > 0 && (
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-controls={popoverId}
                    aria-label={`Show ${hidden.length} more members`}
                    className={`${dimension} relative -ml-2 flex items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-600 ring-2 ring-white transition hover:bg-zinc-200 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-indigo-500 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus-visible:ring-indigo-400`}
                >
                    +{hidden.length}
                </button>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        id={popoverId}
                        className="absolute right-0 top-full z-20 mt-2 w-60 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.15}}
                    >
                        <p className="border-b border-zinc-100 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:border-white/[0.06] dark:text-zinc-500">
                            {hidden.length} more
                        </p>
                        <ul className="max-h-56 overflow-y-auto p-1">
                            {hidden.map((member) => (
                                <li key={member.name} className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                                    <Avatar name={member.name} className="size-7 text-[10px]"/>
                                    <span className="min-w-0">
                                        <span className="block truncate text-sm text-zinc-800 dark:text-zinc-100">{member.name}</span>
                                        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{member.role}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const team: Member[] = [
    {name: "Maya Chen", role: "Product designer"},
    {name: "Diego Ramos", role: "Frontend engineer"},
    {name: "Priya Nair", role: "Engineering manager"},
    {name: "Tom Becker", role: "Backend engineer"},
    {name: "Aisha Bello", role: "Product manager"},
    {name: "Lucas Moreau", role: "iOS engineer"},
    {name: "Hana Sato", role: "Data analyst"},
    {name: "Owen Walsh", role: "QA engineer"},
    {name: "Sofia Rossi", role: "Content designer"},
    {name: "Kofi Mensah", role: "Android engineer"},
    {name: "Elena Petrova", role: "Security engineer"},
    {name: "Ravi Kapoor", role: "Site reliability"},
];

const projects = [
    {name: "Atlas mobile app", meta: "Updated 2 hours ago", members: team, max: 4},
    {name: "Billing migration", meta: "Updated yesterday", members: team.slice(2, 9), max: 3},
    {name: "Marketing site refresh", meta: "Updated Sep 18", members: team.slice(8, 11), max: 4},
];

const AvatarStackExample = () => (
    <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Projects</h3>
            <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-zinc-300 px-2.5 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
            >
                <LuPlus className="size-3.5" aria-hidden/>
                Invite
            </button>
        </div>
        <ul className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
            {projects.map((project, index) => (
                <li key={project.name} className="flex items-center justify-between gap-4 px-5 py-4">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{project.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{project.meta}</p>
                    </div>
                    <AvatarStack members={project.members} max={project.max} size={index === 0 ? "md" : "sm"}/>
                </li>
            ))}
        </ul>
    </div>
);

export default AvatarStackExample;
