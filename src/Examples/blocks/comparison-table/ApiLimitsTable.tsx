import {useEffect, useId, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuCopy} from "react-icons/lu";

export type RateUnit = "second" | "minute" | "day";
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiTier {
    id: string;
    name: string;
    price: string;
}

export interface ApiEndpoint {
    method: HttpMethod;
    path: string;
    /** Sustained requests per minute, keyed by tier id. null or a missing key means not available. */
    perMinute: Record<string, number | null>;
    /** Burst allowance, keyed by tier id. */
    burst: Record<string, number | null>;
}

export interface ApiLimit {
    label: string;
    /** One value per tier, keyed by tier id. */
    values: Record<string, string>;
}

export interface RateLimitHeader {
    name: string;
    /** Sample value shown after the header name. */
    example: string;
    meaning: string;
}

const methodStyles: Record<HttpMethod, string> = {
    GET: "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300",
    POST: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
    PUT: "bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300",
    PATCH: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    DELETE: "bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300",
};

const units: {id: RateUnit; label: string}[] = [
    {id: "second", label: "Per second"},
    {id: "minute", label: "Per minute"},
    {id: "day", label: "Per day"},
];

const convert = (perMinute: number, unit: RateUnit) => {
    if (unit === "second") {
        const value = perMinute / 60;
        return value < 10 ? value.toFixed(value < 1 ? 2 : 1) : Math.round(value).toLocaleString("en-US");
    }
    if (unit === "day") return (perMinute * 1440).toLocaleString("en-US");
    return perMinute.toLocaleString("en-US");
};

/** Copies `text` to the clipboard and shows a check for a moment. */
export const CopyButton = ({text}: {text: string}) => {
    const [copied, setCopied] = useState(false);
    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 1500);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            // Clipboard access can be blocked in iframes.
        }
    };

    return (
        <button type="button" onClick={copy} aria-label={copied ? `Copied ${text}` : `Copy ${text}`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-400">
            {copied ? <LuCheck className="h-3.5 w-3.5 text-emerald-400"/> : <LuCopy className="h-3.5 w-3.5"/>}
        </button>
    );
};

const defaultDescription = (
    <>
        Limits apply per API key with a sliding one minute window. Bursts let you exceed the sustained rate for a
        few seconds. Requests over the limit return <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] text-slate-800 dark:bg-slate-800 dark:text-slate-200">429 Too Many Requests</code>.
    </>
);

export interface ApiLimitsTableProps {
    tiers: ApiTier[];
    endpoints: ApiEndpoint[];
    /** Extra rows under the endpoints, such as body size or key counts. */
    limits?: ApiLimit[];
    /** Headers listed in the dark panel, each with a copy button. */
    headers?: RateLimitHeader[];
    eyebrow?: string;
    title?: string;
    description?: ReactNode;
    headersTitle?: string;
    headersDescription?: ReactNode;
    /** Controlled rate unit. */
    unit?: RateUnit;
    defaultUnit?: RateUnit;
    onUnitChange?: (unit: RateUnit) => void;
    /** Controlled id of the highlighted tier. */
    highlightedTier?: string;
    /** Defaults to the first tier. */
    defaultHighlightedTier?: string;
    onHighlightedTierChange?: (tierId: string) => void;
    className?: string;
}

/** A rate limits table per endpoint and tier, with a unit switch, a plan highlight and copyable headers. */
export const ApiLimitsTable = ({
    tiers,
    endpoints,
    limits = [],
    headers = [],
    eyebrow = "Reference",
    title = "Rate limits",
    description = defaultDescription,
    headersTitle = "Response headers",
    headersDescription = "Every response includes your current usage. When you receive a 429, wait until the reset time and retry with exponential backoff.",
    unit: unitProp,
    defaultUnit = "minute",
    onUnitChange,
    highlightedTier,
    defaultHighlightedTier,
    onHighlightedTierChange,
    className = "",
}: ApiLimitsTableProps) => {
    const idPrefix = `api-unit-${useId().replace(/:/g, "")}`;
    const [internalUnit, setInternalUnit] = useState<RateUnit>(defaultUnit);
    const [internalTier, setInternalTier] = useState<string>(defaultHighlightedTier ?? tiers[0]?.id ?? "");
    const unit = unitProp ?? internalUnit;
    const tier = highlightedTier ?? internalTier;

    const setUnit = (next: RateUnit) => {
        if (unitProp === undefined) setInternalUnit(next);
        onUnitChange?.(next);
    };
    const setTier = (next: string) => {
        if (highlightedTier === undefined) setInternalTier(next);
        onHighlightedTierChange?.(next);
    };

    const onUnitKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
        event.preventDefault();
        const index = units.findIndex((u) => u.id === unit);
        const next = units[(index + (event.key === "ArrowRight" ? 1 : units.length - 1)) % units.length];
        setUnit(next.id);
        document.getElementById(`${idPrefix}-${next.id}`)?.focus();
    };

    const cellClass = (t: string) =>
        `px-4 py-3 text-right font-mono text-sm tabular-nums transition-colors ${t === tier
            ? "bg-cyan-50 text-slate-900 dark:bg-cyan-400/10 dark:text-white"
            : "text-slate-500 dark:text-slate-400"}`;

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                {eyebrow && <p className="font-mono text-xs uppercase tracking-widest text-cyan-600 dark:text-cyan-400">{eyebrow}</p>}
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                {description && <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">{description}</p>}

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div role="radiogroup" aria-label="Rate unit" onKeyDown={onUnitKeyDown}
                         className="inline-flex self-start rounded-lg border border-slate-200 bg-slate-50 p-0.5 dark:border-slate-800 dark:bg-slate-900">
                        {units.map((u) => (
                            <button key={u.id} id={`${idPrefix}-${u.id}`} type="button" role="radio" aria-checked={unit === u.id}
                                    tabIndex={unit === u.id ? 0 : -1} onClick={() => setUnit(u.id)}
                                    className="relative rounded-md px-3 py-1.5 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-cyan-500">
                                {unit === u.id && <motion.span layoutId={idPrefix} className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700" transition={{type: "spring", bounce: 0.15, duration: 0.35}}/>}
                                <span className={`relative ${unit === u.id ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>{u.label}</span>
                            </button>
                        ))}
                    </div>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        Highlight my plan
                        <select value={tier} onChange={(e) => setTier(e.target.value)}
                                className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                            {tiers.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                        </select>
                    </label>
                </div>

                <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full min-w-[640px] border-collapse text-left">
                        <caption className="sr-only">Sustained rate and burst per endpoint, {units.find((u) => u.id === unit)?.label.toLowerCase()}</caption>
                        <thead className="bg-slate-50 dark:bg-slate-900">
                            <tr className="text-xs text-slate-500 dark:text-slate-400">
                                <th scope="col" className="px-4 py-3 font-medium">Endpoint</th>
                                {tiers.map((t) => (
                                    <th key={t.id} scope="col" className={`px-4 py-3 text-right font-medium ${t.id === tier ? "bg-cyan-50 text-cyan-900 dark:bg-cyan-400/10 dark:text-cyan-200" : ""}`}>
                                        <span className="block text-sm font-semibold text-slate-900 dark:text-white">{t.name}</span>
                                        {t.price}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {endpoints.map((endpoint) => (
                                <tr key={`${endpoint.method} ${endpoint.path}`} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/50">
                                    <th scope="row" className="px-4 py-3 font-normal">
                                        <span className="flex items-center gap-2.5">
                                            <span className={`w-14 rounded px-1.5 py-0.5 text-center font-mono text-[10px] font-semibold ${methodStyles[endpoint.method]}`}>{endpoint.method}</span>
                                            <code className="font-mono text-sm text-slate-800 dark:text-slate-200">{endpoint.path}</code>
                                        </span>
                                    </th>
                                    {tiers.map((t) => {
                                        const rate = endpoint.perMinute[t.id] ?? null;
                                        const burst = endpoint.burst[t.id] ?? null;
                                        return (
                                            <td key={t.id} className={cellClass(t.id)}>
                                                {rate === null ? (
                                                    <span className="font-sans text-xs text-slate-400">Not available</span>
                                                ) : (
                                                    <>
                                                        <AnimatePresence mode="wait" initial={false}>
                                                            <motion.span key={unit} className="block"
                                                                         initial={{opacity: 0, y: -4}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 4}}
                                                                         transition={{duration: 0.15}}>
                                                                {convert(rate, unit)}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                        <span className="block font-sans text-[11px] text-slate-400">burst {burst}</span>
                                                    </>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            {limits.map((limit) => (
                                <tr key={limit.label} className="bg-slate-50/50 dark:bg-slate-900/30">
                                    <th scope="row" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300">{limit.label}</th>
                                    {tiers.map((t) => <td key={t.id} className={cellClass(t.id)}>{limit.values[t.id]}</td>)}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {headers.length > 0 && (
                    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
                        <div>
                            <h3 className="text-base font-semibold text-slate-900 dark:text-white">{headersTitle}</h3>
                            {headersDescription && <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{headersDescription}</p>}
                        </div>
                        <ul className="overflow-hidden rounded-xl bg-slate-950 ring-1 ring-slate-900/10 dark:ring-white/10">
                            {headers.map((h) => (
                                <li key={h.name} className="flex items-center gap-3 border-b border-white/5 px-4 py-3 last:border-b-0">
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-mono text-sm">
                                            <span className="text-cyan-300">{h.name}</span>
                                            <span className="text-slate-500">: </span>
                                            <span className="text-slate-200">{h.example}</span>
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-500">{h.meaning}</p>
                                    </div>
                                    <CopyButton text={h.name}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
};

