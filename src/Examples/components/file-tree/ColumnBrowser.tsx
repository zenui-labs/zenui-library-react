import {useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuChevronLeft, LuChevronRight, LuFileImage, LuFileSpreadsheet, LuFileText, LuFilm, LuFolder, LuHardDrive} from "react-icons/lu";

type IconComponent = ComponentType<{className?: string}>;

export interface BrowserItem {
    /** Unique among its siblings. The selection is the list of ids from the root down. */
    id: string;
    name: string;
    /** Set on folders. Files leave it out and show a details panel when selected. */
    children?: BrowserItem[];
    /** Shown in the details panel, already formatted, such as "18 KB". */
    size?: string;
    modified?: string;
    owner?: string;
    /** Replaces the icon picked from the file extension. */
    icon?: IconComponent;
    /** Color classes for a custom icon, for example "text-rose-500". */
    iconClassName?: string;
}

export interface DetailLabels {
    size: string;
    modified: string;
    owner: string;
}

const iconFor = (item: BrowserItem): {icon: IconComponent; color: string} => {
    if (item.icon) return {icon: item.icon, color: item.iconClassName ?? "text-zinc-400"};
    if (item.children) return {icon: LuFolder, color: "text-sky-500 dark:text-sky-400"};
    if (/\.(svg|png)$/.test(item.name)) return {icon: LuFileImage, color: "text-emerald-500"};
    if (/\.mp4$/.test(item.name)) return {icon: LuFilm, color: "text-violet-500"};
    if (/\.xlsx$/.test(item.name)) return {icon: LuFileSpreadsheet, color: "text-green-600 dark:text-green-500"};
    return {icon: LuFileText, color: "text-rose-500"};
};

export interface ColumnBrowserProps {
    items: BrowserItem[];
    /** Ids picked in each open column, from the root down. Pass it with `onChange` to control the location. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (trail: string[]) => void;
    /** Name of the root in the breadcrumbs and of the first column. */
    rootLabel?: string;
    detailLabels?: DetailLabels;
    className?: string;
}

const defaultDetailLabels: DetailLabels = {size: "Size", modified: "Modified", owner: "Owner"};

/** A Finder style column view with breadcrumbs and a details panel for the selected file. */
export const ColumnBrowser = ({
    items: rootItems,
    value,
    defaultValue = [],
    onChange,
    rootLabel = "Drive",
    detailLabels = defaultDetailLabels,
    className = "",
}: ColumnBrowserProps) => {
    // One selected id per open column, from the root down.
    const [innerTrail, setInnerTrail] = useState<string[]>(defaultValue);
    const trail = value ?? innerTrail;
    const setTrail = (next: string[]) => {
        if (value === undefined) setInnerTrail(next);
        onChange?.(next);
    };
    const itemRefs = useRef(new Map<string, HTMLButtonElement>());
    const reduceMotion = useReducedMotion();

    // Resolve the trail into the list of columns and the items picked in each.
    const columns: BrowserItem[][] = [rootItems];
    const picked: BrowserItem[] = [];
    for (const id of trail) {
        const item = columns[columns.length - 1].find((entry) => entry.id === id);
        if (!item) break;
        picked.push(item);
        if (item.children) columns.push(item.children);
    }
    const current = picked[picked.length - 1];
    const preview = current && !current.children ? current : null;
    const depth = columns.length - 1;

    const focusItem = (id: string) => window.setTimeout(() => itemRefs.current.get(id)?.focus(), 0);

    const choose = (column: number, item: BrowserItem) => setTrail([...trail.slice(0, column), item.id]);

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, column: number, index: number) => {
        const items = columns[column];
        const item = items[index];
        let target: BrowserItem | undefined;
        if (event.key === "ArrowDown") target = items[index + 1];
        else if (event.key === "ArrowUp") target = items[index - 1];
        else if (event.key === "ArrowRight" && item.children?.length) {
            target = item.children[0];
            setTrail([...trail.slice(0, column), item.id, target.id]);
            focusItem(target.id);
            event.preventDefault();
            return;
        } else if (event.key === "ArrowLeft" && column > 0) {
            const parent = picked[column - 1];
            setTrail(trail.slice(0, column));
            focusItem(parent.id);
            event.preventDefault();
            return;
        } else return;
        event.preventDefault();
        if (target) {
            choose(column, target);
            focusItem(target.id);
        }
    };

    const renderColumn = (items: BrowserItem[], column: number) => (
        <motion.ul
            key={column === 0 ? "root" : picked[column - 1]?.id}
            role="listbox"
            aria-label={column === 0 ? rootLabel : picked[column - 1]?.name}
            className="h-full w-full shrink-0 overflow-y-auto border-zinc-100 p-1.5 sm:w-52 sm:border-r dark:border-white/[0.06]"
            initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: 16}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
        >
            {items.map((item, index) => {
                const isPicked = trail[column] === item.id;
                const isActive = isPicked && column === trail.length - 1;
                const {icon: Icon, color} = iconFor(item);
                return (
                    <li key={item.id} role="none">
                        <button
                            ref={(element) => {
                                if (element) itemRefs.current.set(item.id, element);
                                else itemRefs.current.delete(item.id);
                            }}
                            type="button"
                            role="option"
                            aria-selected={isPicked}
                            tabIndex={isPicked || (!trail[column] && index === 0) ? 0 : -1}
                            onClick={() => choose(column, item)}
                            onKeyDown={(event) => onKeyDown(event, column, index)}
                            className={`flex h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500/60 ${
                                isActive
                                    ? "bg-sky-500 text-white dark:bg-sky-500"
                                    : isPicked
                                        ? "bg-zinc-200/70 text-zinc-900 dark:bg-white/10 dark:text-white"
                                        : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                            }`}
                        >
                            <Icon className={`size-4 shrink-0 ${isActive ? "text-white" : color}`} aria-hidden/>
                            <span className="min-w-0 flex-1 truncate">{item.name}</span>
                            {item.children && <LuChevronRight className={`size-3.5 shrink-0 ${isActive ? "text-white/80" : "text-zinc-400"}`} aria-hidden/>}
                        </button>
                    </li>
                );
            })}
        </motion.ul>
    );

    const Preview = preview ? iconFor(preview).icon : null;

    return (
        <div className={`w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <nav aria-label="Location" className="flex items-center gap-1 overflow-x-auto border-b border-zinc-100 px-3 py-2 text-sm dark:border-white/[0.06]">
                <button
                    type="button"
                    onClick={() => setTrail(trail.slice(0, Math.max(0, depth - (preview ? 0 : 1))))}
                    disabled={trail.length === 0}
                    aria-label="Back"
                    className="mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 disabled:opacity-40 disabled:hover:bg-transparent sm:hidden dark:hover:bg-white/5"
                >
                    <LuChevronLeft className="size-4" aria-hidden/>
                </button>
                <ol className="flex min-w-0 items-center gap-1">
                    <li>
                        <button
                            type="button"
                            onClick={() => setTrail([])}
                            className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                            <LuHardDrive className="size-4" aria-hidden/>
                            {rootLabel}
                        </button>
                    </li>
                    {picked.map((item, index) => (
                        <li key={item.id} className="flex min-w-0 items-center gap-1">
                            <LuChevronRight className="size-3.5 shrink-0 text-zinc-300 dark:text-zinc-600" aria-hidden/>
                            <button
                                type="button"
                                onClick={() => setTrail(trail.slice(0, index + 1))}
                                aria-current={index === picked.length - 1 ? "location" : undefined}
                                className="truncate rounded-md px-1.5 py-1 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 aria-[current=location]:font-medium aria-[current=location]:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white dark:aria-[current=location]:text-white"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ol>
            </nav>

            <div className="flex h-80">
                {/* Small screens show only the deepest column; wider screens show the whole path. */}
                <div className="flex min-w-0 flex-1 overflow-x-auto">
                    {columns.map((items, column) => (
                        <div key={column} className={`h-full w-full shrink-0 sm:w-auto ${column === depth ? "" : "hidden sm:block"} ${preview ? "max-sm:hidden" : ""}`}>
                            {renderColumn(items, column)}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {preview && Preview && (
                        <motion.aside
                            key={preview.id}
                            aria-label="File details"
                            className="flex w-full shrink-0 flex-col items-center border-zinc-100 bg-zinc-50/60 p-5 text-center sm:w-60 sm:border-l dark:border-white/[0.06] dark:bg-white/[0.02]"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.18}}
                        >
                            <div className="flex size-20 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-800 dark:ring-white/10">
                                <Preview className={`size-9 ${iconFor(preview).color}`} aria-hidden/>
                            </div>
                            <p className="mt-4 w-full truncate text-sm font-medium text-zinc-900 dark:text-white">{preview.name}</p>
                            <dl className="mt-4 w-full space-y-2 text-xs">
                                {[
                                    [detailLabels.size, preview.size],
                                    [detailLabels.modified, preview.modified],
                                    [detailLabels.owner, preview.owner],
                                ].map(([label, value]) => (
                                    <div key={label} className="flex justify-between gap-3 border-t border-zinc-200/70 pt-2 dark:border-white/[0.06]">
                                        <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
                                        <dd className="truncate text-zinc-800 dark:text-zinc-200">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </motion.aside>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
