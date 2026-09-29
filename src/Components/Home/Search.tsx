import {useEffect, useMemo, useRef, useState} from "react";
import Fuse from "fuse.js";
import {useNavigate} from "react-router-dom";
import {LuArrowRight, LuBookOpen, LuBox, LuCornerDownLeft, LuLayers, LuSearch, LuSparkles, LuWrench} from "react-icons/lu";

import Dialog from "@shared/Dialog.tsx";
import useZenuiStore from "@/Store/Index.ts";
import {flatDocsNavigation, toolsNavigation} from "@utils/DocsNavigation.ts";
import {cn} from "@utils/Style.ts";

const SECTION_ICONS = {
    "Getting started": LuBookOpen,
    Components: LuBox,
    Animations: LuSparkles,
    Blocks: LuLayers,
    Tools: LuWrench,
};

const SECTION_ORDER = ["Getting started", "Components", "Animations", "Blocks", "Tools", "More"];

const searchItems = [
    ...flatDocsNavigation.map((item) => ({...item, context: item.group ?? item.section})),
    ...toolsNavigation.map((item) => ({...item, section: "Tools", context: item.description})),
    {title: "Contributors", url: "/contributors", section: "More", context: "People behind ZenUI"},
    {title: "Become a ZenUI hero", url: "/zenui-hero-docs", section: "More", context: "Contribute components"},
    {title: "Privacy policy", url: "/privacy-policy", section: "More", context: "Legal"},
];

const fuse = new Fuse(searchItems, {
    keys: [{name: "title", weight: 3}, {name: "group", weight: 1}, {name: "section", weight: 1}, {name: "context", weight: 0.5}],
    threshold: 0.35,
    ignoreLocation: true,
});

// Bold the first match of the query inside a title.
const Highlight = ({text, query}) => {
    const index = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
    if (index === -1) return text;
    return (
        <>
            {text.slice(0, index)}
            <span className="text-accent-strong">{text.slice(index, index + query.length)}</span>
            {text.slice(index + query.length)}
        </>
    );
};

const Search = () => {
    const {searchOpen, setSearchOpen} = useZenuiStore();
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const listRef = useRef(null);
    const navigate = useNavigate();

    // ⌘K / Ctrl+K, ⌘S / Ctrl+S and "/" open the palette.
    useEffect(() => {
        const onKeyDown = (event) => {
            const key = event.key.toLowerCase();
            const typing = /^(input|textarea|select)$/i.test(event.target.tagName) || event.target.isContentEditable;
            if (((event.metaKey || event.ctrlKey) && (key === "k" || key === "s")) || (key === "/" && !typing)) {
                event.preventDefault();
                setSearchOpen(true);
            }
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [setSearchOpen]);

    useEffect(() => {
        if (searchOpen) {
            setQuery("");
            setActive(0);
        }
    }, [searchOpen]);

    const results = useMemo(
        () => (query.trim() ? fuse.search(query.trim()).map((result) => result.item) : searchItems),
        [query]
    );

    // Group while keeping one flat index for keyboard navigation.
    const groups = useMemo(() => {
        const bySection = new Map();
        results.forEach((item) => {
            if (!bySection.has(item.section)) bySection.set(item.section, []);
            bySection.get(item.section).push(item);
        });
        let index = 0;
        return (query ? [...bySection.keys()] : SECTION_ORDER.filter((s) => bySection.has(s))).map((section) => ({
            section,
            items: bySection.get(section).map((item) => ({...item, index: index++})),
        }));
    }, [results, query]);

    useEffect(() => setActive(0), [query]);

    useEffect(() => {
        listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({block: "nearest"});
    }, [active]);

    const open = (item) => {
        if (!item) return;
        setSearchOpen(false);
        navigate(item.url);
    };

    const onKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((i) => (i + 1) % Math.max(results.length, 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((i) => (i - 1 + results.length) % Math.max(results.length, 1));
        } else if (event.key === "Enter") {
            event.preventDefault();
            open(groups.flatMap((g) => g.items).find((item) => item.index === active));
        }
    };

    return (
        <Dialog open={searchOpen} onClose={() => setSearchOpen(false)} label="Search documentation" align="top"
                className="max-w-[640px]">
            <div className="flex items-center gap-3 border-b border-hairline px-4">
                <LuSearch className="size-[18px] shrink-0 text-ink-subtle"/>
                <input
                    data-autofocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Search components, blocks, animations, tools"
                    className="h-14 w-full bg-transparent text-[0.95rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
                    role="combobox"
                    aria-expanded="true"
                    aria-controls="zenui-search-results"
                    aria-activedescendant={`search-option-${active}`}
                    spellCheck={false}
                    autoComplete="off"
                />
                <button onClick={() => setSearchOpen(false)} className="kbd shrink-0 hover:text-ink" aria-label="Close search">
                    Esc
                </button>
            </div>

            <div ref={listRef} id="zenui-search-results" role="listbox"
                 className="scroll-thin max-h-[min(60vh,460px)] overflow-y-auto overscroll-contain p-2">
                {groups.map(({section, items}) => {
                    const Icon = SECTION_ICONS[section] ?? LuArrowRight;
                    return (
                        <div key={section} className="mb-1">
                            <p className="eyebrow px-3 pb-1.5 pt-3">{section}</p>
                            {items.map((item) => (
                                <button
                                    key={item.url}
                                    id={`search-option-${item.index}`}
                                    data-index={item.index}
                                    role="option"
                                    aria-selected={active === item.index}
                                    onMouseMove={() => active !== item.index && setActive(item.index)}
                                    onClick={() => open(item)}
                                    className={cn(
                                        "group flex w-full items-center gap-3 rounded-[10px] px-3 py-2 text-left transition-colors",
                                        active === item.index ? "bg-raised" : "bg-transparent"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex size-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-surface transition-colors",
                                            active === item.index ? "text-accent-strong" : "text-ink-subtle"
                                        )}>
                                        <Icon className="size-4"/>
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-[0.9rem] font-medium text-ink">
                                            <Highlight text={item.title} query={query.trim()}/>
                                        </span>
                                        <span className="block truncate text-[0.78rem] text-ink-subtle">{item.context}</span>
                                    </span>
                                    <LuCornerDownLeft
                                        className={cn("size-4 shrink-0 text-ink-subtle transition-opacity", active === item.index ? "opacity-100" : "opacity-0")}/>
                                </button>
                            ))}
                        </div>
                    );
                })}

                {results.length === 0 && (
                    <div className="px-6 py-14 text-center">
                        <p className="text-[0.95rem] font-medium text-ink">No results for “{query}”</p>
                        <p className="mt-1 text-[0.85rem] text-ink-subtle">Try a component name like “modal”, “table” or “toast”.</p>
                    </div>
                )}
            </div>

            <div className="hidden items-center gap-4 border-t border-hairline bg-canvas/60 px-4 py-2.5 text-[0.75rem] text-ink-subtle 640px:flex">
                <span className="flex items-center gap-1.5"><kbd className="kbd">↑</kbd><kbd className="kbd">↓</kbd> Move</span>
                <span className="flex items-center gap-1.5"><kbd className="kbd">↵</kbd> Open</span>
                <span className="flex items-center gap-1.5"><kbd className="kbd">Esc</kbd> Close</span>
                <span className="ml-auto">{results.length} results</span>
            </div>
        </Dialog>
    );
};

export default Search;
