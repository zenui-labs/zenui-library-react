import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll} from "framer-motion";
import type {PanInfo} from "framer-motion";
import {LuBell, LuCheck, LuPlus, LuSearch} from "react-icons/lu";

export type MobileIcon = ComponentType<{className?: string}>;
export type MobileTabId = "Today" | "Explore" | "Activity" | "Profile";

export interface MobileTab {
    id: MobileTabId;
    icon: MobileIcon;
    /** Count shown on the icon, for example new activity. */
    badge?: number;
}

export interface MobileGoal {
    label: string;
    value: number;
    goal: number;
}

export interface MobilePlanItem {
    id: string;
    title: string;
    detail: string;
}

export interface MobileProgram {
    title: string;
    /** Small line at the bottom of the card, for example length and level. */
    meta: string;
    /** Tailwind gradient stops, for example "from-orange-400 to-rose-500". */
    tone: string;
    href?: string;
}

export interface MobileDayValue {
    day: string;
    /** Bar height from 0 to 100. */
    value: number;
    /** Draws the bar in the accent color. */
    highlight?: boolean;
}

export interface MobileFeedItem {
    text: string;
    when: string;
    /** Adds an unread dot. */
    fresh?: boolean;
}

export interface MobileProfile {
    name: string;
    initials: string;
    /** Line under the name, for example "Member since March 2025". */
    subtitle: string;
}

export interface MobileStat {
    label: string;
    value: string;
}

export interface MobileWorkoutType {
    label: string;
    icon: MobileIcon;
    /** Tailwind classes for the icon tile background and color. */
    tone: string;
}

const formatNumber = (value: number) => value.toLocaleString("en-US");

/** A progress ring that animates from empty to `value` (0 to 1). */
export const Ring = ({value, className}: {value: number; className: string}) => {
    const r = 40;
    const c = 2 * Math.PI * r;
    return (
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r={r} fill="none" strokeWidth="12" className="stroke-zinc-100 dark:stroke-zinc-800"/>
            <motion.circle cx="50" cy="50" r={r} fill="none" strokeWidth="12" strokeLinecap="round" className={className}
                           strokeDasharray={c} initial={{strokeDashoffset: c}} animate={{strokeDashoffset: c * (1 - value)}}
                           transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}/>
        </svg>
    );
};

export interface MobileBottomNavProps {
    /** Four tabs. The first two sit left of the center button, the rest to the right. */
    tabs: MobileTab[];
    /** Date line under the Today heading. */
    date: string;
    /** Outer and inner ring on the Today tab. */
    goals: [MobileGoal, MobileGoal];
    plan: MobilePlanItem[];
    /** Plan items checked at start. */
    defaultCompleted?: string[];
    onPlanChange?: (completed: string[]) => void;
    /** Callout under the plan. Leave empty to hide it. */
    streakMessage?: string;
    programs: MobileProgram[];
    week: MobileDayValue[];
    feed: MobileFeedItem[];
    profile: MobileProfile;
    stats: MobileStat[];
    /** Choices in the bottom sheet opened by the center button. */
    workouts: MobileWorkoutType[];
    onStartWorkout?: (workout: MobileWorkoutType) => void;
    /** Current tab (controlled). */
    tab?: MobileTabId;
    defaultTab?: MobileTabId;
    onTabChange?: (tab: MobileTabId) => void;
    /** Unread count on the bell. Zero hides the dot. */
    unreadCount?: number;
    searchPlaceholder?: string;
    weekTitle?: string;
    className?: string;
}

/** A phone layout with a header that compacts on scroll, a bottom tab bar with a center action and a draggable bottom sheet. */
export const MobileBottomNav = ({
    tabs,
    date,
    goals,
    plan,
    defaultCompleted = [],
    onPlanChange,
    streakMessage,
    programs,
    week,
    feed,
    profile,
    stats,
    workouts,
    onStartWorkout,
    tab: tabProp,
    defaultTab = "Today",
    onTabChange,
    unreadCount = 1,
    searchPlaceholder = "Search workouts",
    weekTitle = "Active minutes this week",
    className = "",
}: MobileBottomNavProps) => {
    const reduce = useReducedMotion();
    const [innerTab, setInnerTab] = useState<MobileTabId>(defaultTab);
    const [checked, setChecked] = useState<string[]>(defaultCompleted);
    const tab = tabProp ?? innerTab;
    const uid = useId().replace(/:/g, "");
    const searchId = `mobile-shell-search-${uid}`;
    const sheetTitleId = `mobile-shell-sheet-title-${uid}`;
    const [outer, inner] = goals;
    const [sheet, setSheet] = useState(false);
    const [logged, setLogged] = useState<string | null>(null);
    const [compact, setCompact] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const fabRef = useRef<HTMLButtonElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const {scrollY} = useScroll({container: scrollRef});

    useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 24));

    useEffect(() => {
        if (sheet) sheetRef.current?.focus();
    }, [sheet]);

    useEffect(() => {
        if (!logged) return;
        const id = window.setTimeout(() => setLogged(null), 2200);
        return () => window.clearTimeout(id);
    }, [logged]);

    const closeSheet = () => {
        setSheet(false);
        fabRef.current?.focus();
    };

    const onSheetDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.y > 80 || info.velocity.y > 500) closeSheet();
    };

    const togglePlan = (id: string) => {
        const next = checked.includes(id) ? checked.filter((x) => x !== id) : [...checked, id];
        setChecked(next);
        onPlanChange?.(next);
    };

    const selectTab = (id: MobileTabId) => {
        setInnerTab(id);
        onTabChange?.(id);
        scrollRef.current?.scrollTo({top: 0});
    };

    const renderTab = (t: MobileTab) => {
        const current = t.id === tab;
        return (
            <li key={t.id}>
                <button type="button" onClick={() => selectTab(t.id)} aria-current={current ? "page" : undefined}
                        className={`relative mx-auto flex w-full max-w-[72px] flex-col items-center gap-1 rounded-2xl py-1.5 text-[11px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-lime-500 ${current ? "text-zinc-900 dark:text-white" : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"}`}>
                    {current && (
                        <motion.span layoutId={`mobile-shell-pill-${uid}`} transition={{type: "spring", bounce: 0.25, duration: 0.45}}
                                     className="absolute inset-x-2 top-0 h-8 rounded-full bg-lime-100 dark:bg-lime-500/15"/>
                    )}
                    <span className="relative flex h-8 items-center">
                        <t.icon className="h-5 w-5"/>
                        {t.badge !== undefined && (
                            <span className="absolute -right-2 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-white">
                                {t.badge}<span className="sr-only"> new</span>
                            </span>
                        )}
                    </span>
                    <span className="relative">{t.id}</span>
                </button>
            </li>
        );
    };

    // Keep keyboard focus inside the sheet while it is open.
    const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            closeSheet();
            return;
        }
        if (event.key !== "Tab" || !sheetRef.current) return;
        const items = Array.from(sheetRef.current.querySelectorAll<HTMLButtonElement>("button"));
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === sheetRef.current)) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    return (
        <div className={`flex min-h-[760px] w-full items-center justify-center bg-gradient-to-br from-lime-100 via-zinc-100 to-orange-100 sm:p-8 dark:from-lime-950/40 dark:via-zinc-950 dark:to-orange-950/30 ${className}`}>
            <div className="relative flex h-[760px] w-full flex-col overflow-hidden bg-white sm:h-[720px] sm:max-w-[390px] sm:rounded-[44px] sm:border-[10px] sm:border-zinc-900 sm:shadow-2xl dark:bg-zinc-950 dark:sm:border-zinc-800">
                {/* Header that compacts on scroll */}
                <header className={`absolute inset-x-0 top-0 z-10 flex h-14 items-center justify-between px-5 transition-colors duration-200 ${compact
                    ? "border-b border-zinc-200/80 bg-white/80 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/80"
                    : "border-b border-transparent"}`}>
                    <motion.p animate={{opacity: compact ? 1 : 0, y: compact ? 0 : 6}} transition={{duration: 0.15}}
                              className="text-sm font-semibold text-zinc-900 dark:text-white" aria-hidden={!compact}>{tab}</motion.p>
                    <button type="button" aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} new` : "Notifications"}
                            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-700 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-lime-500 dark:text-zinc-200 dark:hover:bg-zinc-800">
                        <LuBell className="h-5 w-5"/>
                        {unreadCount > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white dark:ring-zinc-950"/>}
                    </button>
                </header>

                <div ref={scrollRef} className="flex-1 overflow-y-auto overscroll-contain px-5 pb-28 pt-14">
                    <h1 className="pt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{tab}</h1>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={tab} initial={{opacity: 0, x: reduce ? 0 : 12}} animate={{opacity: 1, x: 0}} exit={{opacity: 0}} transition={{duration: 0.18}}>
                            {tab === "Today" && (
                                <>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{date}</p>
                                    <div className="mt-5 grid grid-cols-[112px_minmax(0,1fr)] items-center gap-5 rounded-3xl bg-zinc-900 p-5 text-white dark:bg-zinc-900">
                                        <div className="relative h-28 w-28">
                                            <Ring value={outer.value / outer.goal} className="stroke-lime-400"/>
                                            <div className="absolute inset-[18px]"><Ring value={inner.value / inner.goal} className="stroke-orange-400"/></div>
                                        </div>
                                        <dl className="space-y-3 text-sm">
                                            <div><dt className="text-xs text-zinc-400">{outer.label}</dt><dd className="font-semibold tabular-nums"><span className="text-lime-400">{formatNumber(outer.value)}</span> / {formatNumber(outer.goal)}</dd></div>
                                            <div><dt className="text-xs text-zinc-400">{inner.label}</dt><dd className="font-semibold tabular-nums"><span className="text-orange-400">{formatNumber(inner.value)}</span> / {formatNumber(inner.goal)}</dd></div>
                                        </dl>
                                    </div>
                                    <h2 className="mt-7 text-sm font-semibold text-zinc-900 dark:text-white">Today&rsquo;s plan</h2>
                                    <ul className="mt-3 space-y-2">
                                        {plan.map((p) => {
                                            const isDone = checked.includes(p.id);
                                            return (
                                                <li key={p.id}>
                                                    <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-zinc-200 p-3.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-lime-500 dark:border-zinc-800">
                                                        <input type="checkbox" className="sr-only" checked={isDone}
                                                               onChange={() => togglePlan(p.id)}/>
                                                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isDone ? "border-lime-500 bg-lime-500 text-zinc-900" : "border-zinc-300 dark:border-zinc-600"}`} aria-hidden="true">
                                                            {isDone && <LuCheck className="h-3.5 w-3.5"/>}
                                                        </span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className={`block text-sm font-medium ${isDone ? "text-zinc-400 line-through" : "text-zinc-900 dark:text-white"}`}>{p.title}</span>
                                                            <span className="block text-xs text-zinc-500 dark:text-zinc-400">{p.detail}</span>
                                                        </span>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    {streakMessage && (
                                        <div className="mt-6 rounded-2xl bg-lime-50 p-4 text-sm text-lime-900 dark:bg-lime-500/10 dark:text-lime-200">
                                            {streakMessage}
                                        </div>
                                    )}
                                </>
                            )}

                            {tab === "Explore" && (
                                <>
                                    <div className="relative mt-4">
                                        <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                                        <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true"/>
                                        <input id={searchId} type="search" placeholder={searchPlaceholder}
                                               className="w-full rounded-2xl bg-zinc-100 py-3 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-lime-500 dark:bg-zinc-900 dark:text-white"/>
                                    </div>
                                    <div className="mt-5 space-y-3">
                                        {programs.map((w) => (
                                            <a key={w.title} href={w.href ?? "#"} className={`block rounded-3xl bg-gradient-to-br ${w.tone} p-5 text-white outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950`}>
                                                <span className="block text-lg font-semibold leading-snug">{w.title}</span>
                                                <span className="mt-8 block text-xs font-medium text-white/80">{w.meta}</span>
                                            </a>
                                        ))}
                                    </div>
                                </>
                            )}

                            {tab === "Activity" && (
                                <>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{weekTitle}</p>
                                    <div className="mt-5 flex h-40 items-end justify-between gap-2 rounded-3xl border border-zinc-200 p-4 dark:border-zinc-800" role="img"
                                         aria-label={`${weekTitle}: ${week.map((d) => d.value).join(", ")}`}>
                                        {week.map((d, i) => (
                                            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                                                <motion.div className={`w-full max-w-[22px] origin-bottom rounded-full ${d.highlight ? "bg-lime-500" : "bg-zinc-200 dark:bg-zinc-700"}`}
                                                            style={{height: `${d.value}%`}} initial={{scaleY: 0}} animate={{scaleY: 1}}
                                                            transition={{delay: reduce ? 0 : i * 0.04, duration: reduce ? 0 : 0.5, ease: [0.16, 1, 0.3, 1]}}/>
                                                <span className="text-[11px] text-zinc-500">{d.day}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <ul className="mt-5 divide-y divide-zinc-100 dark:divide-zinc-800">
                                        {feed.map((a) => (
                                            <li key={a.text} className="flex items-center gap-3 py-3.5 text-sm">
                                                <span className={`h-2 w-2 shrink-0 rounded-full ${a.fresh ? "bg-orange-500" : "bg-transparent"}`} aria-hidden="true"/>
                                                <span className="flex-1 text-zinc-800 dark:text-zinc-200">{a.text}</span>
                                                <span className="text-xs text-zinc-400">{a.when}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            {tab === "Profile" && (
                                <>
                                    <div className="mt-5 flex items-center gap-4">
                                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-emerald-500 text-lg font-bold text-zinc-900">{profile.initials}</span>
                                        <div>
                                            <p className="font-semibold text-zinc-900 dark:text-white">{profile.name}</p>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">{profile.subtitle}</p>
                                        </div>
                                    </div>
                                    <dl className="mt-6 grid grid-cols-3 gap-2 text-center">
                                        {stats.map((s) => (
                                            <div key={s.label} className="flex flex-col-reverse rounded-2xl bg-zinc-100 p-3 dark:bg-zinc-900">
                                                <dt className="text-[11px] text-zinc-500 dark:text-zinc-400">{s.label}</dt>
                                                <dd className="text-lg font-bold tabular-nums text-zinc-900 dark:text-white">{s.value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {logged && (
                        <motion.p role="status" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 10}}
                                  className="absolute inset-x-5 bottom-24 z-20 rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white shadow-lg dark:bg-white dark:text-zinc-900">
                            {logged} started. Timer is running.
                        </motion.p>
                    )}
                </AnimatePresence>

                {/* Bottom navigation */}
                <nav aria-label="Primary" className="absolute inset-x-0 bottom-0 z-10 border-t border-zinc-200/80 bg-white/85 px-3 pb-5 pt-2 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/85">
                    <ul className="grid grid-cols-5 items-center">
                        {tabs.slice(0, 2).map(renderTab)}
                        <li className="flex justify-center">
                            <motion.button ref={fabRef} type="button" onClick={() => setSheet(true)} aria-label="Start a workout" aria-haspopup="dialog" aria-expanded={sheet}
                                           whileTap={reduce ? undefined : {scale: 0.92}}
                                           className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-zinc-900 shadow-lg shadow-lime-500/40 outline-none ring-4 ring-white focus-visible:ring-lime-600 dark:ring-zinc-950 dark:focus-visible:ring-lime-300">
                                <LuPlus className="h-6 w-6"/>
                            </motion.button>
                        </li>
                        {tabs.slice(2).map(renderTab)}
                    </ul>
                </nav>

                {/* Bottom sheet */}
                <AnimatePresence>
                    {sheet && (
                        <>
                            <motion.div key="scrim" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={closeSheet}
                                        className="absolute inset-0 z-30 bg-zinc-900/40"/>
                            <motion.div key="sheet" ref={sheetRef} role="dialog" aria-modal="true" aria-labelledby={sheetTitleId} tabIndex={-1}
                                        onKeyDown={trapFocus}
                                        initial={{y: "100%"}} animate={{y: 0}} exit={{y: "100%"}}
                                        transition={reduce ? {duration: 0} : {type: "spring", bounce: 0, duration: 0.35}}
                                        drag={reduce ? false : "y"} dragConstraints={{top: 0, bottom: 0}} dragElastic={{top: 0, bottom: 0.6}} onDragEnd={onSheetDragEnd}
                                        className="absolute inset-x-0 bottom-0 z-40 rounded-t-[28px] bg-white px-5 pb-8 pt-3 outline-none dark:bg-zinc-900">
                                <div className="mx-auto h-1.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-700" aria-hidden="true"/>
                                <h2 id={sheetTitleId} className="mt-4 text-lg font-semibold text-zinc-900 dark:text-white">Start a workout</h2>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Drag down or press Escape to close.</p>
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    {workouts.map((w) => (
                                        <button key={w.label} type="button" onClick={() => { setLogged(w.label); onStartWorkout?.(w); closeSheet(); }}
                                                className="flex flex-col items-start gap-6 rounded-2xl border border-zinc-200 p-4 text-left outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-lime-500 dark:border-zinc-800 dark:hover:bg-zinc-800">
                                            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${w.tone}`} aria-hidden="true"><w.icon className="h-5 w-5"/></span>
                                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">{w.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

