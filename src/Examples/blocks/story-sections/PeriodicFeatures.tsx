import {Fragment, useEffect, useId, useRef, useState} from "react";
import type {CSSProperties} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuX} from "react-icons/lu";

export type ElementTone = "sky" | "emerald" | "amber" | "violet" | "rose" | "slate";

export interface ElementCategory {
    id: string;
    label: string;
    tone: ElementTone;
}

export interface FeatureElement {
    number: number;
    /** One or two letters. The first is capitalised, like a real symbol. */
    symbol: string;
    name: string;
    /** Id of an entry in `categories`. */
    category: string;
    /** Column and row in the wide table, starting at 1. Small screens ignore it and list elements in order. */
    position: [number, number];
    /** Small figure in the top corner, where a real table puts the atomic mass. */
    mass: string;
    description: string;
    properties?: {label: string; value: string}[];
    /** Symbols of elements this one works with. They become links inside the card. */
    bondsWith?: string[];
}

export interface PeriodicFeaturesProps {
    elements: FeatureElement[];
    categories: ElementCategory[];
    /** Columns in the wide table. */
    columns?: number;
    /** Where the key sits in the wide table, as [first column, last column, row]. Pick an empty stretch. */
    keyArea?: [number, number, number];
    /** A detached row, like the lanthanides, with a label in its first two columns. */
    series?: {row: number; label: string; note?: string};
    eyebrow?: string;
    title?: string;
    description?: string;
    className?: string;
}

const TONES: Record<ElementTone, {tile: string; accent: string; swatch: string}> = {
    sky: {
        tile: "border-sky-200 bg-sky-50 text-sky-950 dark:border-sky-300/15 dark:bg-sky-400/[0.08] dark:text-sky-50",
        accent: "text-sky-700 dark:text-sky-300",
        swatch: "bg-sky-400",
    },
    emerald: {
        tile: "border-emerald-200 bg-emerald-50 text-emerald-950 dark:border-emerald-300/15 dark:bg-emerald-400/[0.08] dark:text-emerald-50",
        accent: "text-emerald-700 dark:text-emerald-300",
        swatch: "bg-emerald-400",
    },
    amber: {
        tile: "border-amber-200 bg-amber-50 text-amber-950 dark:border-amber-300/15 dark:bg-amber-400/[0.08] dark:text-amber-50",
        accent: "text-amber-700 dark:text-amber-300",
        swatch: "bg-amber-400",
    },
    violet: {
        tile: "border-violet-200 bg-violet-50 text-violet-950 dark:border-violet-300/15 dark:bg-violet-400/[0.08] dark:text-violet-50",
        accent: "text-violet-700 dark:text-violet-300",
        swatch: "bg-violet-400",
    },
    rose: {
        tile: "border-rose-200 bg-rose-50 text-rose-950 dark:border-rose-300/15 dark:bg-rose-400/[0.08] dark:text-rose-50",
        accent: "text-rose-700 dark:text-rose-300",
        swatch: "bg-rose-400",
    },
    slate: {
        tile: "border-slate-200 bg-slate-50 text-slate-950 dark:border-slate-300/15 dark:bg-slate-400/[0.08] dark:text-slate-50",
        accent: "text-slate-600 dark:text-slate-300",
        swatch: "bg-slate-400",
    },
};

const SPRING = {type: "spring", stiffness: 380, damping: 34, mass: 0.9} as const;

/**
 * Product features laid out as a periodic table. Hover a tile or a key entry to light up its category; open a tile
 * and its element card grows out of it with a shared layout animation. Small screens get a plain grid in order.
 */
export const PeriodicFeatures = ({
    elements,
    categories,
    columns = 9,
    keyArea = [3, 8, 1],
    series,
    eyebrow = "The periodic table of features",
    title = "Small, stable elements that bond well",
    description = "Every feature does one thing and works with the rest. Hover a group to see how they cluster, then open an element for the details.",
    className = "",
}: PeriodicFeaturesProps) => {
    const uid = useId();
    const reduceMotion = useReducedMotion();
    const [focusCategory, setFocusCategory] = useState<string | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const tileRefs = useRef(new Map<number, HTMLButtonElement>());
    const closeRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const lastOpened = useRef<number | null>(null);

    const categoryOf = (id: string) => categories.find((category) => category.id === id) ?? categories[0];
    const sorted = [...elements].sort((a, b) => a.number - b.number);
    const active = sorted.find((element) => element.number === selected) ?? null;
    const layoutId = (part: string, number: number) => (reduceMotion ? undefined : `${uid}-${part}-${number}`);

    useEffect(() => {
        if (selected === null) {
            // Hand focus back to the tile the card came from.
            if (lastOpened.current !== null) tileRefs.current.get(lastOpened.current)?.focus({preventScroll: true});
            return;
        }
        lastOpened.current = selected;
        closeRef.current?.focus({preventScroll: true});
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSelected(null);
            if (event.key !== "Tab" || !dialogRef.current) return;
            // Keep Tab inside the card while it is open.
            const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [selected]);

    const gridStyle = {"--cols": columns} as CSSProperties;

    return (
        <section className={`relative w-full overflow-hidden bg-[#fbfaf7] px-4 py-16 text-zinc-900 sm:px-8 sm:py-24 dark:bg-zinc-950 dark:text-white ${className}`}>
            <div className="relative mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">{eyebrow}</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
                    <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                </div>

                <div className="relative mt-10 sm:mt-14">
                    <div
                        style={gridStyle}
                        className="grid grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2 md:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                        onMouseLeave={() => setFocusCategory(null)}
                    >
                        <div
                            style={{"--key-col": `${keyArea[0]} / ${keyArea[1] + 1}`, "--key-row": keyArea[2]} as CSSProperties}
                            className="col-span-full mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 md:mb-0 md:self-center md:px-4 md:[grid-column:var(--key-col)] md:[grid-row:var(--key-row)]"
                        >
                            <span className="w-full font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Key</span>
                            {categories.map((category) => {
                                const count = elements.filter((element) => element.category === category.id).length;
                                const lit = focusCategory === category.id;
                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        aria-pressed={lit}
                                        onMouseEnter={() => setFocusCategory(category.id)}
                                        onFocus={() => setFocusCategory(category.id)}
                                        onBlur={() => setFocusCategory(null)}
                                        onClick={() => setFocusCategory(lit ? null : category.id)}
                                        className="group inline-flex items-center gap-2 rounded-md py-0.5 text-sm text-zinc-600 outline-none transition-colors hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 dark:text-zinc-400 dark:hover:text-white dark:focus-visible:ring-white"
                                    >
                                        <span aria-hidden="true" className={`h-3 w-3 rounded-[3px] ${TONES[category.tone].swatch} transition-transform duration-200 ${lit ? "scale-125" : ""}`}/>
                                        {category.label}
                                        <span className="font-mono text-xs tabular-nums text-zinc-400 dark:text-zinc-500">{count}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {sorted.map((element) => {
                            const category = categoryOf(element.category);
                            const tone = TONES[category.tone];
                            const dimmed = focusCategory !== null && focusCategory !== element.category;
                            const inSeries = series !== undefined && element.position[1] === series.row;
                            const firstInSeries = inSeries && sorted.find((item) => item.position[1] === series.row) === element;
                            return (
                                <Fragment key={element.number}>
                                    {firstInSeries && (
                                        <div
                                            style={{"--series-row": series.row} as CSSProperties}
                                            className="col-span-full mt-3 flex items-end gap-3 md:mt-4 md:flex-col md:items-end md:justify-center md:gap-0.5 md:pr-3 md:text-right md:[grid-column:1/3] md:[grid-row:var(--series-row)]"
                                        >
                                            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{series.label}</span>
                                            {series.note && <span className="text-xs text-zinc-500 dark:text-zinc-400">{series.note}</span>}
                                        </div>
                                    )}
                                    <motion.button
                                        ref={(node) => {
                                            if (node) tileRefs.current.set(element.number, node);
                                            else tileRefs.current.delete(element.number);
                                        }}
                                        type="button"
                                        layoutId={layoutId("tile", element.number)}
                                        transition={SPRING}
                                        onClick={() => setSelected(element.number)}
                                        onMouseEnter={() => setFocusCategory(element.category)}
                                        aria-label={`${element.number}, ${element.name} (${element.symbol}), ${category.label}`}
                                        aria-haspopup="dialog"
                                        style={{"--col": element.position[0], "--row": element.position[1], borderRadius: 10} as CSSProperties}
                                        className={`relative aspect-square min-w-0 border text-left outline-none transition-[opacity,filter,box-shadow] duration-300 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.35)] focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7] md:[grid-column:var(--col)] md:[grid-row:var(--row)] dark:focus-visible:ring-white dark:focus-visible:ring-offset-zinc-950 ${tone.tile} ${dimmed ? "opacity-25 saturate-0" : ""} ${inSeries ? "md:mt-4" : ""}`}
                                    >
                                        <span aria-hidden="true" className="absolute left-1.5 top-1 font-mono text-[10px] tabular-nums opacity-70 sm:left-2 sm:top-1.5">{element.number}</span>
                                        <span aria-hidden="true" className="absolute right-1.5 top-1 hidden font-mono text-[9px] tabular-nums opacity-50 lg:block">{element.mass}</span>
                                        <span aria-hidden="true" className="absolute inset-x-1 top-1/2 flex -translate-y-[58%] justify-center">
                                            <motion.span layoutId={layoutId("symbol", element.number)} transition={SPRING} className="block text-2xl font-semibold leading-none tracking-tight sm:text-[1.7rem]">
                                                {element.symbol}
                                            </motion.span>
                                        </span>
                                        <span aria-hidden="true" className={`absolute inset-x-1 bottom-1.5 truncate text-center text-[10px] font-medium sm:bottom-2 ${tone.accent}`}>{element.name}</span>
                                    </motion.button>
                                </Fragment>
                            );
                        })}
                    </div>

                    <AnimatePresence>
                        {active && (() => {
                            const category = categoryOf(active.category);
                            const tone = TONES[category.tone];
                            const bonds = (active.bondsWith ?? [])
                                .map((symbol) => sorted.find((element) => element.symbol === symbol))
                                .filter((element): element is FeatureElement => Boolean(element));
                            return (
                                <motion.div
                                    key="overlay"
                                    className="absolute inset-0 z-20 flex items-start justify-center px-0 pt-4 sm:items-center sm:px-6 sm:pt-0"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.2}}
                                >
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        tabIndex={-1}
                                        onClick={() => setSelected(null)}
                                        className="absolute inset-0 -m-2 cursor-default rounded-2xl bg-[#fbfaf7]/75 backdrop-blur-[3px] dark:bg-zinc-950/75"
                                    />
                                    <motion.div
                                        key={active.number}
                                        ref={dialogRef}
                                        role="dialog"
                                        aria-modal="true"
                                        aria-labelledby={`${uid}-title`}
                                        layoutId={layoutId("tile", active.number)}
                                        transition={SPRING}
                                        style={{borderRadius: 18}}
                                        className="relative w-full max-w-2xl overflow-hidden border border-zinc-200 bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)] dark:border-white/10 dark:bg-zinc-900"
                                    >
                                        <div className="flex flex-col sm:flex-row">
                                            <div className={`relative flex aspect-[5/3] shrink-0 flex-col justify-between border-b p-4 sm:aspect-square sm:w-52 sm:border-b-0 sm:border-r ${tone.tile}`}>
                                                <div className="flex justify-between font-mono text-xs tabular-nums">
                                                    <span>{active.number}</span>
                                                    <span className="opacity-60">{active.mass}</span>
                                                </div>
                                                <motion.span layoutId={layoutId("symbol", active.number)} transition={SPRING} className="block self-center text-6xl font-semibold leading-none tracking-tight sm:text-7xl">
                                                    {active.symbol}
                                                </motion.span>
                                                <span className={`text-center text-sm font-medium ${tone.accent}`}>{active.name}</span>
                                            </div>
                                            <motion.div
                                                className="relative flex-1 p-5 sm:p-6"
                                                initial={{opacity: 0, y: reduceMotion ? 0 : 8}}
                                                animate={{opacity: 1, y: 0, transition: {delay: reduceMotion ? 0 : 0.12, duration: 0.3}}}
                                                exit={{opacity: 0, transition: {duration: 0.08}}}
                                            >
                                                <button
                                                    ref={closeRef}
                                                    type="button"
                                                    aria-label="Close element card"
                                                    onClick={() => setSelected(null)}
                                                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 outline-none transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-white"
                                                >
                                                    <LuX className="h-4 w-4" aria-hidden="true"/>
                                                </button>
                                                <p className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] ${tone.accent}`}>
                                                    <span aria-hidden="true" className={`h-2 w-2 rounded-[2px] ${tone.swatch}`}/>
                                                    {category.label}
                                                </p>
                                                <h3 id={`${uid}-title`} className="mt-2 pr-8 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">{active.name}</h3>
                                                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{active.description}</p>
                                                {active.properties && (
                                                    <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-200 bg-zinc-200 text-sm dark:border-white/10 dark:bg-white/10">
                                                        {active.properties.map((property) => (
                                                            <div key={property.label} className="bg-white px-3 py-2 dark:bg-zinc-900">
                                                                <dt className="text-[11px] text-zinc-500 dark:text-zinc-400">{property.label}</dt>
                                                                <dd className="mt-0.5 font-medium tabular-nums text-zinc-900 dark:text-white">{property.value}</dd>
                                                            </div>
                                                        ))}
                                                    </dl>
                                                )}
                                                {bonds.length > 0 && (
                                                    <div className="mt-4 flex flex-wrap items-center gap-2">
                                                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Bonds with</span>
                                                        {bonds.map((bond) => (
                                                            <button
                                                                key={bond.number}
                                                                type="button"
                                                                onClick={() => setSelected(bond.number)}
                                                                className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs font-medium outline-none transition-shadow hover:shadow-sm focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-white ${TONES[categoryOf(bond.category).tone].tile}`}
                                                            >
                                                                <span className="font-semibold">{bond.symbol}</span>
                                                                <span className="opacity-70">{bond.name}</span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })()}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
