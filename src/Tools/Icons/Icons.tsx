import {useEffect, useMemo, useRef, useState} from 'react';
import {LuSearch, LuSearchX, LuX} from "react-icons/lu";

import {IconsData} from "@utils/IconsData.ts";
import Dialog from "@shared/Dialog.tsx";
import {cn} from "@utils/Style.ts";
import IconSidebar from "./IconSidebar.tsx";
import ScrollRow from "@shared/ScrollRow.tsx";

const iconFilterOptions = [
    {name: "All", slug: "all"},
    {name: "E-commerce", slug: "e_commerce"},
    {name: "Social media", slug: "social"},
    {name: "Technology", slug: "technology"},
    {name: "Healthcare", slug: "healthcare"},
    {name: "Education", slug: "education"},
    {name: "Component", slug: "component"},
    {name: "Finance", slug: "finance"},
    {name: "Date and time", slug: "date_&_time"},
    {name: "Actions", slug: "actions"},
    {name: "Construction", slug: "construction"},
    {name: "Alignment", slug: "alignment"},
    {name: "Gaming", slug: "gaming"},
    {name: "Files", slug: "file_icon"},
    {name: "Fitness", slug: "fitness"},
    {name: "Music", slug: "music"},
    {name: "Brand", slug: "brand"},
    {name: "Weather", slug: "weather"},
    {name: "Medical", slug: "medical"},
    {name: "People", slug: "people"},
    {name: "Programming", slug: "programming"},
    {name: "Marketing", slug: "marketing"},
    {name: "Automation", slug: "automation"},
    {name: "AI and machine learning", slug: "ai_machine_learning"},
    {name: "Databases", slug: "databases"},
    {name: "Devices", slug: "devices"},
];

// Grid thumbnails render in the current text color so they read in both themes.
// The customize panel shows the real output with the colors you pick.
const thumbClasses = cn(
    "[&_svg]:size-7",
    "[&_[fill^='#']]:fill-current [&_[fill=black]]:fill-current [&_[fill=white]]:fill-surface",
    "[&_[stroke^='#']]:stroke-current [&_[stroke=black]]:stroke-current"
);

const useMediaQuery = (query) => {
    const get = () => typeof window !== "undefined" && window.matchMedia(query).matches;
    const [matches, setMatches] = useState(get);

    useEffect(() => {
        const media = window.matchMedia(query);
        const onChange = () => setMatches(media.matches);
        onChange();
        media.addEventListener("change", onChange);
        return () => media.removeEventListener("change", onChange);
    }, [query]);

    return matches;
};

const Icons = () => {
    // One icon is always selected so the customize panel is never empty. Small screens show it in a dialog
    // only after the visitor picks an icon.
    const [selectedIcon, setSelectedIcon] = useState(IconsData[0]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchInputValue, setSearchInputValue] = useState("");
    const [activeFilterOption, setActiveFilterOption] = useState(iconFilterOptions[0]);
    const searchRef = useRef(null);
    const isDesktop = useMediaQuery("(min-width: 1024px)");

    const filteredIcons = useMemo(() => {
        const query = searchInputValue.trim().toLowerCase();
        const slug = activeFilterOption.slug.toLowerCase();

        return IconsData.filter((icon) => {
            const inGroup = slug === "all" || icon?.groupName?.toLowerCase().includes(slug);
            return inGroup && icon.name.toLowerCase().includes(query);
        });
    }, [searchInputValue, activeFilterOption]);

    // Press "/" anywhere on the page to jump to search.
    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key !== "/" || event.metaKey || event.ctrlKey || event.altKey) return;
            const target = event.target;
            if (target.closest?.("input, textarea, select, [contenteditable='true']")) return;
            event.preventDefault();
            searchRef.current?.focus();
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, []);

    const selectIcon = (icon) => {
        setSelectedIcon(icon);
        setDialogOpen(true);
    };

    const resetFilters = () => {
        setSearchInputValue("");
        setActiveFilterOption(iconFilterOptions[0]);
    };

    return (
        <div className="shell pb-20 pt-10">
            <header className="max-w-[62ch]">
                <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                    Icons
                </h1>
                <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.05rem]">
                    Free SVG icons for interfaces. Pick one to change its size, fill and stroke,
                    then copy the code or download it as SVG or PNG.
                </p>
            </header>

            {/* Toolbar */}
            <div className="sticky top-[60px] z-30 -mx-5 mt-8 border-b border-hairline bg-canvas/85 px-5 py-3 backdrop-blur-xl backdrop-saturate-150 640px:-mx-8 640px:px-8">
                <div className="flex flex-col gap-3 1024px:flex-row 1024px:items-center">
                    <label className="flex h-10 w-full shrink-0 items-center gap-2 rounded-[10px] border border-hairline bg-surface px-3 text-ink-subtle transition-colors focus-within:border-hairline-strong 1024px:w-[280px]">
                        <LuSearch className="size-4 shrink-0"/>
                        <input
                            ref={searchRef}
                            value={searchInputValue}
                            onChange={(event) => setSearchInputValue(event.target.value)}
                            placeholder="Search icons"
                            aria-label="Search icons"
                            maxLength={50}
                            className="w-full min-w-0 bg-transparent text-[0.9rem] text-ink outline-none placeholder:text-ink-subtle focus-visible:outline-none"
                        />
                        {searchInputValue ? (
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchInputValue("");
                                    searchRef.current?.focus();
                                }}
                                aria-label="Clear search"
                                className="-mr-1 flex size-6 shrink-0 items-center justify-center rounded-md text-ink-subtle hover:bg-raised hover:text-ink"
                            >
                                <LuX className="size-3.5"/>
                            </button>
                        ) : (
                            <kbd className="kbd hidden 1024px:inline-flex">/</kbd>
                        )}
                    </label>

                    <ScrollRow label="Categories" className="flex-1">
                        {iconFilterOptions.map((option) => {
                            const active = activeFilterOption.slug === option.slug;
                            return (
                                <button
                                    key={option.slug}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => setActiveFilterOption(option)}
                                    className={cn(
                                        "h-8 shrink-0 rounded-full border px-3 text-[0.8rem] transition-colors",
                                        active
                                            ? "border-ink bg-ink text-canvas"
                                            : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink"
                                    )}
                                >
                                    {option.name}
                                </button>
                            );
                        })}
                    </ScrollRow>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 1024px:grid-cols-[minmax(0,1fr)_320px] 1260px:grid-cols-[minmax(0,1fr)_340px]">
                <section aria-label="Icon results" className="min-w-0">

                    {filteredIcons.length > 0 ? (
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2 640px:grid-cols-[repeat(auto-fill,minmax(104px,1fr))]">
                            {filteredIcons.map((icon) => {
                                const selected = selectedIcon?.id === icon.id;
                                return (
                                    <button
                                        key={icon.id}
                                        type="button"
                                        onClick={() => selectIcon(icon)}
                                        aria-pressed={selected}
                                        title={icon.name}
                                        className={cn(
                                            "group flex aspect-square min-w-0 flex-col items-center justify-center gap-3 rounded-xl border bg-surface px-2 pb-2 pt-4 transition-[border-color,color,box-shadow] duration-200",
                                            selected
                                                ? "border-accent text-ink ring-1 ring-accent"
                                                : "border-hairline text-ink-muted hover:border-hairline-strong hover:text-ink hover:shadow-card"
                                        )}
                                    >
                                        <span className={cn("flex h-8 items-center justify-center", thumbClasses)}
                                              dangerouslySetInnerHTML={{__html: icon.iconCode}}/>
                                        <span className={cn(
                                            "w-full truncate text-center text-[0.72rem] transition-colors",
                                            selected ? "text-ink" : "text-ink-subtle group-hover:text-ink-muted"
                                        )}>
                                            {icon.name}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="panel flex flex-col items-center px-6 py-16 text-center">
                            <span className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-raised text-ink-muted">
                                <LuSearchX className="size-5"/>
                            </span>
                            <h2 className="mt-4 text-[1rem] font-semibold tracking-heading text-ink">
                                {searchInputValue ? <>No icons match &ldquo;{searchInputValue}&rdquo;</> : "No icons in this category yet"}
                            </h2>
                            <p className="mt-1.5 max-w-[42ch] text-[0.9rem] text-ink-muted">
                                Check the spelling or try a broader word.
                                {activeFilterOption.slug !== "all" && " Searching all categories may also help."}
                            </p>
                            <div className="mt-5 flex flex-wrap justify-center gap-2">
                                {searchInputValue && (
                                    <button type="button" className="btn-ghost h-9" onClick={() => setSearchInputValue("")}>
                                        Clear search
                                    </button>
                                )}
                                {activeFilterOption.slug !== "all" && (
                                    <button type="button" className="btn-ghost h-9" onClick={resetFilters}>
                                        Search all categories
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </section>

                {isDesktop && (
                    <aside aria-label="Customize icon" className="relative">
                        <div className="scroll-thin sticky top-[144px] max-h-[calc(100vh-164px)] overflow-y-auto">
                            <div className="panel shadow-card">
                                <IconSidebar iconData={selectedIcon}/>
                            </div>
                        </div>
                    </aside>
                )}
            </div>

            {!isDesktop && (
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} label="Customize icon" className="max-w-[440px]">
                    <div className="scroll-thin max-h-[88vh] overflow-y-auto">
                        <IconSidebar iconData={selectedIcon} onClose={() => setDialogOpen(false)}/>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default Icons;
