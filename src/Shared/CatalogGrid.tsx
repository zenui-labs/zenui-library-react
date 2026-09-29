import {useMemo, useState} from "react";
import {Link} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowUpRight, LuSearch} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

/**
 * Filterable grid of thumbnail cards, grouped by `groupName`.
 * `groups` sets the order and labels: [{id: "input", label: "Form"}].
 */
export interface CatalogItem {
    title: string;
    url: string;
    image: string;
    groupName: string;
}

interface CatalogGridProps {
    items: CatalogItem[];
    groups: {id: string; label: string}[];
    noun?: string;
}

const CatalogGrid = ({items, groups, noun = "components"}: CatalogGridProps) => {
    const [query, setQuery] = useState("");
    const [group, setGroup] = useState("all");

    const visibleGroups = useMemo(() => {
        const q = query.trim().toLowerCase();
        return groups
            .filter((g) => group === "all" || g.id === group)
            .map((g) => ({
                ...g,
                items: items.filter((item) => item.groupName === g.id && item.title.toLowerCase().includes(q)),
            }))
            .filter((g) => g.items.length);
    }, [items, groups, group, query]);

    return (
        <div className="mt-8">
            <div className="flex flex-col gap-3 768px:flex-row 768px:items-center 768px:justify-between">
                <div className="scroll-none -mx-1 flex gap-1 overflow-x-auto px-1">
                    {[{id: "all", label: "All"}, ...groups].map((g) => (
                        <button
                            key={g.id}
                            onClick={() => setGroup(g.id)}
                            className={cn(
                                "h-8 shrink-0 rounded-full border px-3 text-[0.8rem] transition-colors",
                                group === g.id ? "border-ink bg-ink text-canvas" : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink"
                            )}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>
                <label className="flex h-9 items-center gap-2 rounded-lg border border-hairline bg-surface px-3 text-ink-subtle focus-within:border-hairline-strong 768px:w-[240px]">
                    <LuSearch className="size-3.5 shrink-0"/>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={`Filter ${noun}`}
                        aria-label={`Filter ${noun}`}
                        className="w-full bg-transparent text-[0.85rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
                    />
                </label>
            </div>

            {visibleGroups.map((g) => (
                <section key={g.id} className="mt-10">
                    <div className="flex items-baseline gap-2">
                        <h2 id={g.id} className="text-[1.05rem] font-semibold tracking-heading text-ink">{g.label}</h2>
                    </div>
                    <motion.div layout className="mt-4 grid grid-cols-1 gap-3 425px:grid-cols-2 1024px:grid-cols-3">
                        <AnimatePresence initial={false}>
                            {g.items.map((item) => (
                                <motion.div
                                    layout
                                    key={item.url + item.title}
                                    initial={{opacity: 0, scale: 0.97}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.97}}
                                    transition={{duration: 0.25}}
                                >
                                    <Link
                                        to={item.url}
                                        className="group block overflow-hidden rounded-panel border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-float"
                                    >
                                        <div className="flex h-[150px] items-center justify-center bg-white p-3 dark:bg-[#020617]">
                                            <img src={item.image} alt="" loading="lazy"
                                                 className="max-h-full w-full object-contain transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"/>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
                                            <span className="text-[0.875rem] font-medium text-ink first-letter:uppercase">{item.title}</span>
                                            <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
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
