import {useId, useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuPlus, LuSearch} from "react-icons/lu";

export interface Integration {
    id: string;
    name: string;
    category: string;
    description: string;
    /** Two letters for the lettermark tile. */
    initials: string;
    /** Tailwind gradient stops for the lettermark tile, for example "from-sky-500 to-blue-600". */
    tile: string;
    /** Install count, already formatted. */
    installs: string;
}

export interface IntegrationCardProps {
    integration: Integration;
    connected: boolean;
    onToggle: () => void;
    connectLabel?: string;
    connectedLabel?: string;
}

/** One integration tile. Renders an `li`, so place it inside a list. */
export const IntegrationCard = ({integration: item, connected, onToggle, connectLabel = "Connect", connectedLabel = "Connected"}: IntegrationCardProps) => (
    <motion.li
        layout
        initial={{opacity: 0, scale: 0.96}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.96}}
        transition={{duration: 0.2}}
        className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
        <div className="flex items-start justify-between">
            <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-sm ${item.tile}`}>
                {item.initials}
            </span>
            <span className="text-xs text-slate-400">{item.installs} installs</span>
        </div>
        <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{item.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-500">{item.category}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
        <button
            type="button"
            onClick={onToggle}
            aria-label={`${connected ? "Remove" : connectLabel} ${item.name}`}
            className={`mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${connected
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"}`}
        >
            {connected ? <LuCheck className="h-4 w-4"/> : <LuPlus className="h-4 w-4"/>}
            {connected ? connectedLabel : connectLabel}
        </button>
    </motion.li>
);

export interface IntegrationsGridProps {
    integrations: Integration[];
    /** Filter chips after "All". Defaults to every category in the data, sorted A to Z. */
    categories?: string[];
    /** Ids of connected integrations when you control them. */
    installed?: string[];
    /** Ids connected on first render. */
    defaultInstalled?: string[];
    onInstalledChange?: (ids: string[]) => void;
    title?: string;
    description?: string;
    searchPlaceholder?: string;
    allLabel?: string;
    connectLabel?: string;
    connectedLabel?: string;
    /** Link target for "request an integration" in the empty state. */
    requestHref?: string;
    className?: string;
}

/** A searchable, filterable directory of integrations with connect buttons. */
export const IntegrationsGrid = ({
    integrations,
    categories,
    installed,
    defaultInstalled = [],
    onInstalledChange,
    title = "Integrations",
    description = "Connect the tools your team already uses. Each integration installs in one click and can be removed at any time.",
    searchPlaceholder = "Search integrations",
    allLabel = "All",
    connectLabel,
    connectedLabel,
    requestHref = "#",
    className = "",
}: IntegrationsGridProps) => {
    const uid = useId();
    const searchId = `${uid}-search`;
    const [category, setCategory] = useState<string | null>(null);
    const [query, setQuery] = useState("");
    const [internalInstalled, setInternalInstalled] = useState<string[]>(defaultInstalled);
    const installedIds = installed ?? internalInstalled;
    const installedSet = useMemo(() => new Set(installedIds), [installedIds]);

    const chips = useMemo(
        () => categories ?? Array.from(new Set(integrations.map((item) => item.category))).sort(),
        [categories, integrations],
    );

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return integrations.filter((item) =>
            (category === null || item.category === category) &&
            (q === "" || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)));
    }, [integrations, category, query]);

    const toggle = (id: string) => {
        const next = installedSet.has(id) ? installedIds.filter((x) => x !== id) : [...installedIds, id];
        if (installed === undefined) setInternalInstalled(next);
        onInstalledChange?.(next);
    };

    const filters: {value: string | null; label: string}[] = [
        {value: null, label: allLabel},
        ...chips.map((c) => ({value: c, label: c})),
    ];

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                        {description && <p className="mt-3 text-slate-600 dark:text-slate-400">{description}</p>}
                    </div>
                    <div className="relative w-full md:w-64 md:shrink-0">
                        <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                        <input
                            id={searchId}
                            type="search"
                            value={query}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-slate-600 dark:focus:ring-white/5"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                    {filters.map((filter) => {
                        const selected = filter.value === category;
                        return (
                            <button key={filter.label} type="button" aria-pressed={selected} onClick={() => setCategory(filter.value)}
                                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${selected ? "text-white dark:text-slate-900" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                {selected && (
                                    <motion.span layoutId={`${uid}-chip`} className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                                                 transition={{type: "spring", bounce: 0.2, duration: 0.4}}/>
                                )}
                                <span className="relative">{filter.label}</span>
                            </button>
                        );
                    })}
                </div>

                <motion.ul layout className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <AnimatePresence initial={false}>
                        {visible.map((item) => (
                            <IntegrationCard
                                key={item.id}
                                integration={item}
                                connected={installedSet.has(item.id)}
                                onToggle={() => toggle(item.id)}
                                connectLabel={connectLabel}
                                connectedLabel={connectedLabel}
                            />
                        ))}
                    </AnimatePresence>
                </motion.ul>

                {visible.length === 0 && (
                    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
                        <p className="font-medium text-slate-900 dark:text-white">No integrations match "{query}"</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try another name, or <a href={requestHref} className="font-medium text-slate-900 underline underline-offset-4 dark:text-white">request an integration</a>.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};
