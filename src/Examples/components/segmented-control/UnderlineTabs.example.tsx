import {useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

type TabId = "profile" | "notifications" | "security" | "billing";

interface Tab {
    id: TabId;
    label: string;
    badge?: string;
}

const tabs: Tab[] = [
    {id: "profile", label: "Profile"},
    {id: "notifications", label: "Notifications", badge: "3"},
    {id: "security", label: "Security"},
    {id: "billing", label: "Billing and plans"},
];

const Field = ({label, value}: {label: string; value: string}) => (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <dt className="text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
        <dd className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
    </div>
);

const Toggle = ({label, detail, defaultOn}: {label: string; detail: string; defaultOn: boolean}) => {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="flex items-start justify-between gap-4 py-3">
            <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{detail}</p>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={label}
                onClick={() => setOn((value) => !value)}
                className={`relative mt-0.5 h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900 ${
                    on ? "bg-indigo-600" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
            >
                <span className={`absolute left-0.5 top-0.5 size-4 rounded-full bg-white shadow transition-transform ${on ? "translate-x-4" : ""}`}/>
            </button>
        </div>
    );
};

const panels: Record<TabId, ReactNode> = {
    profile: (
        <dl className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
            <Field label="Name" value="Aisha Bello"/>
            <Field label="Email" value="aisha@northwind.io"/>
            <Field label="Role" value="Product manager"/>
            <Field label="Time zone" value="Lagos (GMT+1)"/>
        </dl>
    ),
    notifications: (
        <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
            <Toggle label="Mentions" detail="When someone mentions you in a comment" defaultOn/>
            <Toggle label="Weekly summary" detail="A Monday email with what changed last week" defaultOn/>
            <Toggle label="Product updates" detail="New features and changes to your plan" defaultOn={false}/>
        </div>
    ),
    security: (
        <div className="space-y-3 py-3">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                <p className="text-sm text-emerald-900 dark:text-emerald-100">Two-step verification is on</p>
                <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white">Authenticator app</span>
            </div>
            <dl className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                <Field label="Password" value="Changed 4 months ago"/>
                <Field label="Active sessions" value="3 devices"/>
            </dl>
        </div>
    ),
    billing: (
        <div className="py-3">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Current plan</p>
                    <p className="text-lg font-semibold text-zinc-900 dark:text-white">Team, 12 seats</p>
                </div>
                <p className="text-sm tabular-nums text-zinc-600 dark:text-zinc-300">$144 per month</p>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                <div className="h-full w-3/4 rounded-full bg-indigo-500"/>
            </div>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">9 of 12 seats in use. Renews on Nov 1.</p>
        </div>
    ),
};

const UnderlineTabs = () => {
    const [selected, setSelected] = useState<TabId>("profile");
    const [direction, setDirection] = useState(1);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const selectedIndex = tabs.findIndex((tab) => tab.id === selected);

    const activate = (index: number) => {
        const next = (index + tabs.length) % tabs.length;
        setDirection(next > selectedIndex ? 1 : -1);
        setSelected(tabs[next].id);
        const node = tabRefs.current[next];
        node?.focus();
        node?.scrollIntoView({block: "nearest", inline: "nearest"});
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        activate(keys[event.key]);
    };

    const offset = reduceMotion ? 0 : 24;

    return (
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <div className="overflow-x-auto border-b border-zinc-200 px-2 [scrollbar-width:none] dark:border-white/10">
                <div role="tablist" aria-label="Account settings" className="flex">
                    {tabs.map((tab, index) => {
                        const isSelected = tab.id === selected;
                        return (
                            <button
                                key={tab.id}
                                ref={(node) => {
                                    tabRefs.current[index] = node;
                                }}
                                id={`${id}-tab-${tab.id}`}
                                type="button"
                                role="tab"
                                aria-selected={isSelected}
                                aria-controls={`${id}-panel`}
                                tabIndex={isSelected ? 0 : -1}
                                onClick={() => activate(index)}
                                onKeyDown={(event) => onKeyDown(event, index)}
                                className={`group relative flex shrink-0 items-center gap-2 whitespace-nowrap px-3 py-3.5 text-sm font-medium outline-none transition-colors ${
                                    isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }`}
                            >
                                <span className="rounded-md px-1 py-0.5 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500/70">{tab.label}</span>
                                {tab.badge && (
                                    <span className="rounded-full bg-indigo-50 px-1.5 text-[11px] font-semibold tabular-nums text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                                        {tab.badge}
                                        <span className="sr-only"> unread</span>
                                    </span>
                                )}
                                {isSelected && (
                                    <motion.span
                                        layoutId={`${id}-underline`}
                                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-zinc-900 dark:bg-white"
                                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 520, damping: 40}}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div
                id={`${id}-panel`}
                role="tabpanel"
                aria-labelledby={`${id}-tab-${selected}`}
                tabIndex={0}
                className="relative min-h-[15rem] overflow-hidden px-5 py-2 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60"
            >
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.div
                        key={selected}
                        custom={direction}
                        variants={{
                            enter: (dir: number) => ({opacity: 0, x: dir * offset}),
                            center: {opacity: 1, x: 0},
                            exit: (dir: number) => ({opacity: 0, x: dir * -offset}),
                        }}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                    >
                        {panels[selected]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default UnderlineTabs;
