import type {PointerEvent} from "react";
import type {IconType} from "react-icons";
import {motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuArrowRight, LuBell, LuCalendar, LuInbox, LuPlay, LuSearch, LuStar, LuUsers} from "react-icons/lu";

interface CalendarEvent {
    title: string;
    time: string;
    day: number;
    start: number;
    length: number;
    tone: string;
}

const days: string[] = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"];
const hours: string[] = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM"];

const events: CalendarEvent[] = [
    {title: "Roadmap review", time: "9:00", day: 0, start: 0, length: 2, tone: "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-400/30 dark:bg-indigo-500/15 dark:text-indigo-200"},
    {title: "Design critique", time: "11:00", day: 1, start: 2, length: 1, tone: "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-400/30 dark:bg-rose-500/15 dark:text-rose-200"},
    {title: "Focus time", time: "9:00", day: 2, start: 0, length: 3, tone: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-200"},
    {title: "Hiring sync", time: "1:00", day: 2, start: 4, length: 1, tone: "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-200"},
    {title: "Customer call", time: "10:00", day: 3, start: 1, length: 2, tone: "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-400/30 dark:bg-sky-500/15 dark:text-sky-200"},
    {title: "Weekly demo", time: "12:00", day: 4, start: 3, length: 2, tone: "border-violet-200 bg-violet-50 text-violet-800 dark:border-violet-400/30 dark:bg-violet-500/15 dark:text-violet-200"},
];

const sidebar: {label: string; icon: IconType; active?: boolean}[] = [
    {label: "Inbox", icon: LuInbox},
    {label: "Calendar", icon: LuCalendar, active: true},
    {label: "People", icon: LuUsers},
];

// Illustration of the product, hidden from assistive technology.
const AppWindow = () => (
    <div aria-hidden="true" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40">
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400"/>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400"/>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <LuSearch className="h-3 w-3"/>
                Search events and people
            </div>
        </div>

        <div className="flex">
            <div className="hidden w-36 shrink-0 border-r border-slate-200 p-3 sm:block dark:border-slate-800">
                {sidebar.map((item) => (
                    <p key={item.label}
                       className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium ${item.active
                           ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                           : "text-slate-500 dark:text-slate-400"}`}>
                        <item.icon className="h-3.5 w-3.5"/>
                        {item.label}
                    </p>
                ))}
                <p className="mt-5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Calendars</p>
                {[["Product", "bg-indigo-500"], ["Hiring", "bg-amber-500"], ["Personal", "bg-emerald-500"]].map(([name, color]) => (
                    <p key={name} className="mt-1.5 flex items-center gap-2 px-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className={`h-2 w-2 rounded-sm ${color}`}/>
                        {name}
                    </p>
                ))}
            </div>

            <div className="min-w-0 flex-1 p-3">
                <div className="grid grid-cols-[2.25rem_repeat(5,minmax(0,1fr))] gap-1 text-[10px] text-slate-400">
                    <span/>
                    {days.map((d) => <span key={d} className="truncate pb-1 text-center font-medium text-slate-500 dark:text-slate-400">{d}</span>)}
                </div>
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-1">
                    <div className="grid grid-rows-6 text-[10px] text-slate-400">
                        {hours.map((h) => <span key={h} className="h-9">{h}</span>)}
                    </div>
                    <div className="relative grid grid-cols-5 grid-rows-6 gap-1">
                        {Array.from({length: 30}, (_, i) => (
                            <span key={i} className="h-9 rounded border border-dashed border-slate-100 dark:border-slate-800"/>
                        ))}
                        {events.map((event, i) => (
                            <motion.div
                                key={event.title}
                                initial={{opacity: 0, y: 8}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.25 + i * 0.08, duration: 0.35}}
                                style={{gridColumn: event.day + 1, gridRow: `${event.start + 1} / span ${event.length}`}}
                                className={`overflow-hidden rounded-md border px-1.5 py-1 ${event.tone}`}
                            >
                                <p className="truncate text-[10px] font-semibold leading-tight">{event.title}</p>
                                <p className="truncate text-[9px] opacity-75">{event.time}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SplitProductPreview = () => {
    const reduceMotion = useReducedMotion();
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-7, 7]), {stiffness: 140, damping: 18});
    const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [6, -6]), {stiffness: 140, damping: 18});

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const onPointerLeave = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <section className="relative w-full overflow-hidden bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div aria-hidden="true" className="absolute right-0 top-0 h-[480px] w-[480px] translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20"/>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                <div>
                    <p className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                        New in Tidewater 4
                    </p>
                    <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                        Plan the whole week in one view
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Tidewater pulls meetings, focus blocks and hiring loops from every calendar your team uses, then
                        suggests a week with fewer context switches.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href="#"
                           className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 outline-none transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
                            Try Tidewater free
                            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                        </a>
                        <a href="#"
                           className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                            <LuPlay className="h-4 w-4"/>
                            Watch the 2 minute demo
                        </a>
                    </div>

                    <div className="mt-8 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                        <span className="flex text-amber-400" aria-hidden="true">
                            {Array.from({length: 5}, (_, i) => <LuStar key={i} className="h-4 w-4 fill-current"/>)}
                        </span>
                        <span><strong className="font-semibold text-slate-900 dark:text-white">4.8 out of 5</strong> from 2,300 reviews</span>
                    </div>
                </div>

                <div className="relative [perspective:1400px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                    <motion.div style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                                initial={{opacity: 0, y: 24}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}>
                        <AppWindow/>

                        <motion.div
                            initial={{opacity: 0, x: 16}}
                            whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true}}
                            transition={{delay: 0.9, duration: 0.4}}
                            className="absolute -bottom-6 right-3 flex w-64 items-start gap-3 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-xl backdrop-blur sm:-right-6 dark:border-slate-700 dark:bg-slate-800/95"
                            style={{z: 40}}
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white">
                                <LuBell className="h-4 w-4"/>
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-slate-900 dark:text-white">Standup moved to 10:30</p>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Frees a 2 hour focus block on Wednesday.</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SplitProductPreview;
