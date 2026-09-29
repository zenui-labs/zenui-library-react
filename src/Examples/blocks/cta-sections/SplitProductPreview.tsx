import type {ComponentType, PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuArrowRight, LuBell, LuPlay, LuSearch, LuStar} from "react-icons/lu";

export interface CalendarEvent {
    title: string;
    /** Start time shown under the title, for example "9:00". */
    time: string;
    /** Zero-based column in `days`. */
    day: number;
    /** Zero-based row in `hours` where the event starts. */
    start: number;
    /** Number of hour rows the event covers. */
    length: number;
    /** Tailwind classes for border, background and text color. */
    tone: string;
}

export interface CalendarNavItem {
    label: string;
    icon: ComponentType<{className?: string}>;
    active?: boolean;
}

export interface CalendarSource {
    name: string;
    /** Tailwind background class for the swatch, for example "bg-indigo-500". */
    color: string;
}

export interface CalendarPreviewProps {
    /** Column headings, one per day. */
    days: string[];
    /** Row labels, one per hour. */
    hours: string[];
    events: CalendarEvent[];
    navItems: CalendarNavItem[];
    calendars: CalendarSource[];
    searchPlaceholder?: string;
    calendarsHeading?: string;
    className?: string;
}

/** A week calendar drawn as an app window. It is an illustration, so it is hidden from assistive technology. */
export const CalendarPreview = ({
    days,
    hours,
    events,
    navItems,
    calendars,
    searchPlaceholder = "Search events and people",
    calendarsHeading = "Calendars",
    className = "",
}: CalendarPreviewProps) => (
    <div aria-hidden="true" className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 ${className}`}>
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400"/>
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400"/>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"/>
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md bg-slate-100 px-2.5 py-1 text-[11px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <LuSearch className="h-3 w-3"/>
                {searchPlaceholder}
            </div>
        </div>

        <div className="flex">
            <div className="hidden w-36 shrink-0 border-r border-slate-200 p-3 sm:block dark:border-slate-800">
                {navItems.map((item) => (
                    <p key={item.label}
                       className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium ${item.active
                           ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                           : "text-slate-500 dark:text-slate-400"}`}>
                        <item.icon className="h-3.5 w-3.5"/>
                        {item.label}
                    </p>
                ))}
                <p className="mt-5 px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{calendarsHeading}</p>
                {calendars.map((calendar) => (
                    <p key={calendar.name} className="mt-1.5 flex items-center gap-2 px-2 text-xs text-slate-600 dark:text-slate-300">
                        <span className={`h-2 w-2 rounded-sm ${calendar.color}`}/>
                        {calendar.name}
                    </p>
                ))}
            </div>

            <div className="min-w-0 flex-1 p-3">
                <div className="grid gap-1 text-[10px] text-slate-400"
                     style={{gridTemplateColumns: `2.25rem repeat(${days.length}, minmax(0, 1fr))`}}>
                    <span/>
                    {days.map((d) => <span key={d} className="truncate pb-1 text-center font-medium text-slate-500 dark:text-slate-400">{d}</span>)}
                </div>
                <div className="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-1">
                    <div className="grid text-[10px] text-slate-400" style={{gridTemplateRows: `repeat(${hours.length}, minmax(0, 1fr))`}}>
                        {hours.map((h) => <span key={h} className="h-9">{h}</span>)}
                    </div>
                    <div className="relative grid gap-1"
                         style={{
                             gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`,
                             gridTemplateRows: `repeat(${hours.length}, minmax(0, 1fr))`,
                         }}>
                        {Array.from({length: days.length * hours.length}, (_, i) => (
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

export interface PreviewNotification {
    title: string;
    detail: string;
}

export interface ProductRating {
    /** Average score out of 5. */
    score: number;
    reviewCount: number;
}

export interface SplitProductPreviewProps {
    /** The product visual on the right, for example a CalendarPreview or a screenshot. */
    preview: ReactNode;
    /** Floating card over the corner of the preview. Leave out to hide it. */
    notification?: PreviewNotification;
    /** Star rating under the actions. Leave out to hide it. */
    rating?: ProductRating;
    badge?: string;
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    className?: string;
}

/** A two-column call to action with a product visual that tilts toward the pointer and a floating notification. */
export const SplitProductPreview = ({
    preview,
    notification,
    rating,
    badge = "New in Tidewater 4",
    title = "Plan the whole week in one view",
    description = "Tidewater pulls meetings, focus blocks and hiring loops from every calendar your team uses, then suggests a week with fewer context switches.",
    primaryLabel = "Try Tidewater free",
    primaryHref = "#",
    secondaryLabel = "Watch the 2 minute demo",
    secondaryHref = "#",
    className = "",
}: SplitProductPreviewProps) => {
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
        <section className={`relative w-full overflow-hidden bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div aria-hidden="true" className="absolute right-0 top-0 h-[480px] w-[480px] translate-x-1/3 -translate-y-1/3 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-600/20"/>

            <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
                <div>
                    {badge && (
                        <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                            {badge}
                        </p>
                    )}
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                        {title}
                    </h2>
                    <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        {description}
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a href={primaryHref}
                           className="group inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 outline-none transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
                            {primaryLabel}
                            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                        </a>
                        {secondaryLabel && (
                            <a href={secondaryHref}
                               className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800">
                                <LuPlay className="h-4 w-4"/>
                                {secondaryLabel}
                            </a>
                        )}
                    </div>

                    {rating && (
                        <div className="mt-8 flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                            <span className="flex text-amber-400" aria-hidden="true">
                                {Array.from({length: 5}, (_, i) => <LuStar key={i} className="h-4 w-4 fill-current"/>)}
                            </span>
                            <span>
                                <strong className="font-semibold text-slate-900 dark:text-white">{rating.score} out of 5</strong> from {rating.reviewCount.toLocaleString("en-US")} reviews
                            </span>
                        </div>
                    )}
                </div>

                <div className="relative [perspective:1400px]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
                    <motion.div style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                                initial={{opacity: 0, y: 24}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{duration: 0.6, ease: [0.22, 1, 0.36, 1]}}>
                        {preview}

                        {notification && (
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
                                    <p className="text-xs font-semibold text-slate-900 dark:text-white">{notification.title}</p>
                                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{notification.detail}</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
