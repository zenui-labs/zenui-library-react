import {useMemo, useState} from "react";
import {NavLink} from "react-router-dom";
import {LuChevronRight, LuSearch, LuX} from "react-icons/lu";

import {docsNavigation} from "@utils/DocsNavigation.ts";
import {navIcons} from "@shared/NavIcons.tsx";
import {cn} from "@utils/Style.ts";

const StatusBadge = ({status}: {status?: string}) => {
    if (status === "new") {
        return <span className="rounded-full bg-accent/15 px-1.5 py-px text-[0.62rem] font-semibold uppercase tracking-wide text-accent-strong">New</span>;
    }
    if (status === "updated") {
        return <span className="size-1.5 rounded-full bg-amber-500" title="Updated recently"/>;
    }
    return null;
};

interface NavItemProps {
    item: {title: string; url: string; icon?: string; status?: string};
    onNavigate?: () => void;
    nested?: boolean;
}

const NavItem = ({item, onNavigate, nested = false}: NavItemProps) => {
    const Icon = item.icon ? navIcons[item.icon] : null;
    return (
        <NavLink
            to={item.url}
            onClick={onNavigate}
            data-sidebar-link
            className={({isActive}) => cn(
                "relative flex items-center gap-2.5 rounded-lg px-3 py-[6px] text-[0.875rem] transition-colors duration-150",
                isActive
                    ? "bg-raised font-medium text-ink"
                    : "text-ink-muted hover:bg-raised/70 hover:text-ink",
                nested && isActive && "before:absolute before:-left-[9px] before:top-1.5 before:bottom-1.5 before:w-px before:bg-accent"
            )}
        >
            {Icon && (
                <span className="flex size-6 items-center justify-center rounded-md border border-hairline bg-surface text-ink-muted">
                    <Icon className="size-3.5"/>
                </span>
            )}
            <span className="truncate">{item.title}</span>
            {item.status && <span className="ml-auto flex items-center"><StatusBadge status={item.status}/></span>}
        </NavLink>
    );
};

const matches = (item, query) => item.title.toLowerCase().includes(query);

/** Docs navigation tree with a quick filter. Shared by the desktop sidebar and the mobile menu. */
const Content = ({onNavigate}: {onNavigate?: () => void}) => {
    const [query, setQuery] = useState("");
    const [collapsed, setCollapsed] = useState({});
    const q = query.trim().toLowerCase();

    const sections = useMemo(() => docsNavigation
        .map((section) => ({
            ...section,
            items: q ? section.items.filter((item) => matches(item, q)) : section.items,
            groups: (section.groups ?? [])
                .map((group) => ({...group, items: q ? group.items.filter((item) => matches(item, q)) : group.items}))
                .filter((group) => group.items.length),
        }))
        .filter((section) => section.items.length || section.groups.length), [q]);

    return (
        <nav aria-label="Documentation" className="pb-10">
            <div className="sticky top-0 z-10 -mx-1 bg-canvas px-1 pb-3 pt-5">
                <label className="flex h-9 items-center gap-2 rounded-lg border border-hairline bg-surface px-2.5 text-ink-subtle focus-within:border-hairline-strong">
                    <LuSearch className="size-3.5 shrink-0"/>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Filter pages"
                        className="w-full bg-transparent text-[0.85rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
                        aria-label="Filter documentation pages"
                    />
                    {query && (
                        <button onClick={() => setQuery("")} aria-label="Clear filter" className="text-ink-subtle hover:text-ink">
                            <LuX className="size-3.5"/>
                        </button>
                    )}
                </label>
            </div>

            {sections.map((section) => {
                const isOpen = q || !collapsed[section.title];
                return (
                    <div key={section.title} className="mt-4 first:mt-1">
                        <button
                            onClick={() => setCollapsed((state) => ({...state, [section.title]: !state[section.title]}))}
                            className="flex w-full items-center justify-between rounded-md px-3 py-1 text-[0.8rem] font-semibold text-ink"
                            aria-expanded={Boolean(isOpen)}
                        >
                            {section.title}
                            <LuChevronRight className={cn("size-3.5 text-ink-subtle transition-transform duration-200", isOpen && "rotate-90")}/>
                        </button>

                        <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out-expo", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                            <div className="overflow-hidden">
                                <div className="mt-1 flex flex-col gap-px">
                                    {section.items.map((item) => (
                                        <NavItem key={item.url} item={item} onNavigate={onNavigate}/>
                                    ))}
                                </div>

                                {section.groups.map((group) => (
                                    <div key={group.label} className="mt-3">
                                        <p className="px-3 pb-1 text-[0.75rem] font-medium text-ink-subtle">
                                            {group.label}
                                        </p>
                                        <div className="ml-3 flex flex-col gap-px border-l border-hairline pl-2">
                                            {group.items.map((item) => (
                                                <NavItem key={item.url} item={item} onNavigate={onNavigate} nested/>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            })}

            {sections.length === 0 && (
                <p className="px-3 py-6 text-[0.85rem] text-ink-subtle">Nothing matches “{query}”.</p>
            )}
        </nav>
    );
};

export default Content;
