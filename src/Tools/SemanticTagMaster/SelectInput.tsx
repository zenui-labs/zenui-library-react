import {LuSearch, LuX} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

/**
 * Search field, group filter and tag list. The list scrolls sideways on small
 * screens and stacks as a sidebar from 1024px up.
 */
const SelectInput = ({query, onQueryChange, groups, group, onGroupChange, items, value, onChange}) => {
    const onKeyDown = (event) => {
        if (event.key === "Enter" && items.length) {
            event.preventDefault();
            onChange(items[0]);
        }
        if (event.key === "Escape" && query) {
            event.preventDefault();
            onQueryChange("");
        }
    };

    return (
        <div className="flex min-w-0 flex-col gap-4">
            <label className="relative block">
                <span className="sr-only">Search tags</span>
                <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-subtle"/>
                <input
                    type="search"
                    value={query}
                    onChange={(event) => onQueryChange(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Search tags"
                    className="h-10 w-full rounded-[10px] border border-hairline-strong bg-surface pl-9 pr-9 text-[0.9rem] text-ink placeholder:text-ink-subtle focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 [&::-webkit-search-cancel-button]:hidden"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => onQueryChange("")}
                        aria-label="Clear search"
                        className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-ink-subtle hover:bg-raised hover:text-ink"
                    >
                        <LuX className="size-3.5"/>
                    </button>
                )}
            </label>

            <div role="radiogroup" aria-label="Filter by group" className="scroll-none -mx-1 flex gap-1.5 overflow-x-auto px-1 1024px:flex-wrap">
                {groups.map((item) => {
                    const active = group === item.id;
                    return (
                        <button
                            key={item.id}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => onGroupChange(item.id)}
                            className={cn(
                                "flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[0.8rem] font-medium transition-colors",
                                active
                                    ? "border-ink bg-ink text-canvas"
                                    : "border-hairline bg-surface text-ink-muted hover:border-hairline-strong hover:text-ink"
                            )}
                        >
                            {item.label}
                            
                        </button>
                    );
                })}
            </div>

            {items.length ? (
                <ul
                    aria-label="Semantic tags"
                    className="scroll-none -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 1024px:mx-0 1024px:flex-col 1024px:gap-0.5 1024px:overflow-visible 1024px:px-0 1024px:pb-0"
                >
                    {items.map((tag) => {
                        const active = value === tag;
                        return (
                            <li key={tag} className="shrink-0">
                                <button
                                    type="button"
                                    onClick={() => onChange(tag)}
                                    aria-current={active ? "true" : undefined}
                                    className={cn(
                                        "flex h-9 w-full items-center rounded-[10px] border px-3 text-left font-mono text-[0.84rem] transition-colors 1024px:border-transparent",
                                        active
                                            ? "border-hairline-strong bg-raised text-ink 1024px:border-hairline"
                                            : "border-hairline bg-surface text-ink-muted hover:bg-raised hover:text-ink 1024px:bg-transparent"
                                    )}
                                >
                                    <span className="text-ink-subtle">&lt;</span>
                                    {tag}
                                    <span className="text-ink-subtle">&gt;</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p className="rounded-[10px] border border-dashed border-hairline-strong px-4 py-6 text-center text-[0.85rem] text-ink-subtle">
                    No tags match “{query}”.
                </p>
            )}
        </div>
    );
};

export default SelectInput;
