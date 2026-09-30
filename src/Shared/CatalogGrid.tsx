import {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowUpRight, LuSearch} from "react-icons/lu";
import {cn} from "@utils/Style.ts";
import {docsNavigation} from "@utils/DocsNavigation.ts";
import {catalogArt} from "@shared/Catalog/art/index.ts";

interface CatalogGridProps {
    /** Which docs section to list. Every page in its sidebar groups is shown, so new pages appear on their own. */
    section: "Components" | "Animations" | "Blocks";
    noun?: string;
}

const slugOf = (url: string) => url.split("/").pop() ?? url;

// Shown only if a page has no illustration yet: its initials on the stage, so the grid never has a hole.
const FallbackArt = ({title}: {title: string}) => (
    <span className="font-mono text-2xl font-medium tracking-tight text-ink/25">
        {title.split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase()).join("")}
    </span>
);

const CatalogGrid = ({section, noun = "components"}: CatalogGridProps) => {
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("all");

    const groups = useMemo(
        () => (docsNavigation.find((entry) => entry.title === section)?.groups ?? []).map((entry) => ({id: entry.label, label: entry.label, items: entry.items})),
        [section]
    );

    const visibleGroups = useMemo(() => {
        const q = query.trim().toLowerCase();
        return groups
            .filter((entry) => group === "all" || entry.id === group)
            .map((entry) => ({...entry, items: entry.items.filter((item) => item.title.toLowerCase().includes(q))}))
            .filter((entry) => entry.items.length);
    }, [groups, group, query]);

    const total = groups.reduce((sum, entry) => sum + entry.items.length, 0);

    return (
        <div className="mt-8">
            <div className="flex flex-col gap-3 768px:flex-row 768px:items-center 768px:justify-between">
                <div className="scroll-none -mx-1 flex gap-1 overflow-x-auto px-1">
                    {[{id: "all", label: "All", items: {length: total}}, ...groups].map((entry) => (
                        <button
                            key={entry.id}
                            onClick={() => setGroup(entry.id)}
                            className={cn(
                                "flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[0.8rem] transition-colors",
                                group === entry.id ? "border-ink bg-ink text-canvas" : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink"
                            )}
                        >
                            {entry.label}
                            <span className={cn("font-mono text-[0.68rem] tabular-nums", group === entry.id ? "text-canvas/60" : "text-ink-subtle")}>{entry.items.length}</span>
                        </button>
                    ))}
                </div>
                <label className="flex h-9 items-center gap-2 rounded-lg border border-hairline bg-surface px-3 text-ink-subtle focus-within:border-hairline-strong 768px:w-[240px]">
                    <LuSearch className="size-3.5 shrink-0"/>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={`Filter ${total} ${noun}`}
                        aria-label={`Filter ${noun}`}
                        className="w-full bg-transparent text-[0.85rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
                    />
                </label>
            </div>

            {visibleGroups.map((entry) => (
                <section key={entry.id} className="mt-10">
                    <div className="flex items-baseline gap-2">
                        <h2 id={entry.id.toLowerCase().replace(/\s+/g, "-")} className="text-[1.05rem] font-semibold tracking-heading text-ink">{entry.label}</h2>
                        <span className="font-mono text-[0.72rem] tabular-nums text-ink-subtle">{entry.items.length}</span>
                    </div>
                    <motion.div layout className="mt-4 grid grid-cols-1 gap-3 425px:grid-cols-2 1024px:grid-cols-3">
                        <AnimatePresence initial={false}>
                            {entry.items.map((item) => {
                                const Art = catalogArt[slugOf(item.url)];
                                return (
                                    <motion.div
                                        layout
                                        key={item.url}
                                        initial={{opacity: 0, scale: 0.97}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.97}}
                                        transition={{duration: 0.25}}
                                    >
                                        <Link
                                            to={item.url}
                                            className="group block overflow-hidden rounded-panel border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-float"
                                        >
                                            <div
                                                aria-hidden="true"
                                                className="relative flex h-[150px] items-center justify-center overflow-hidden bg-canvas [background-image:radial-gradient(rgb(var(--ink)/0.07)_1px,transparent_1.2px)] [background-size:14px_14px]"
                                            >
                                                {/* A soft light that brightens the stage under the illustration on hover. */}
                                                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_45%,rgb(var(--accent)/0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
                                                <div className="relative h-full w-full p-3">
                                                    {Art ? <Art/> : <div className="flex h-full items-center justify-center"><FallbackArt title={item.title}/></div>}
                                                </div>
                                                {item.status && (
                                                    <span className="absolute right-2.5 top-2.5 rounded-full bg-accent-soft px-1.5 py-px font-mono text-[0.6rem] font-medium uppercase tracking-wider text-accent-strong">
                                                        {item.status}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
                                                <span className="text-[0.875rem] font-medium text-ink first-letter:uppercase">{item.title}</span>
                                                <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </section>
            ))}

            {visibleGroups.length === 0 && (
                <p className="mt-16 text-center text-[0.9rem] text-ink-subtle">No {noun} match “{query}”.</p>
            )}
        </div>
    );
};

export default CatalogGrid;
