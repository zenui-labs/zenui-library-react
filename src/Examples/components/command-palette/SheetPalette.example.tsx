import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useDragControls, useReducedMotion} from "framer-motion";
import type {PanInfo} from "framer-motion";
import type {IconType} from "react-icons";
import {LuBanknote, LuClock, LuHotel, LuMap, LuPin, LuPinOff, LuPlane, LuSearch, LuTicket, LuUtensils, LuX} from "react-icons/lu";

interface Entry {
    id: string;
    label: string;
    detail: string;
    icon: IconType;
}

const entries: Entry[] = [
    {id: "boarding", label: "Boarding pass", detail: "TP 1352 to Lisbon, gate B14", icon: LuTicket},
    {id: "flight", label: "Flight status", detail: "On time, departs 7:40 AM", icon: LuPlane},
    {id: "hotel", label: "Hotel check-in", detail: "Casa do Largo, from 3 PM", icon: LuHotel},
    {id: "maps", label: "Offline maps", detail: "Lisbon and Sintra, 214 MB", icon: LuMap},
    {id: "currency", label: "Currency converter", detail: "USD to EUR", icon: LuBanknote},
    {id: "dinner", label: "Dinner reservation", detail: "Taberna da Rua, Fri 8:30 PM", icon: LuUtensils},
];

const byId = (id: string) => entries.find((entry) => entry.id === id);

const useIsDesktop = () => {
    const [desktop, setDesktop] = useState(false);
    useEffect(() => {
        const media = window.matchMedia("(min-width: 640px)");
        const update = () => setDesktop(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return desktop;
};

interface RowProps {
    entry: Entry;
    pinned: boolean;
    onOpen: (entry: Entry) => void;
    onTogglePin: (id: string) => void;
}

const Row = ({entry, pinned, onOpen, onTogglePin}: RowProps) => {
    const Icon = entry.icon;
    return (
        <li className="flex items-center gap-1">
            <button
                type="button"
                onClick={() => onOpen(entry)}
                className="flex min-h-14 min-w-0 flex-1 items-center gap-3 rounded-xl px-3 text-left transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500/70 active:bg-zinc-200/70 dark:hover:bg-white/[0.06] dark:active:bg-white/10"
            >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 dark:bg-sky-400/10 dark:text-sky-300" aria-hidden>
                    <Icon className="size-4"/>
                </span>
                <span className="min-w-0">
                    <span className="block truncate text-[15px] font-medium text-zinc-900 dark:text-zinc-100">{entry.label}</span>
                    <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{entry.detail}</span>
                </span>
            </button>
            <button
                type="button"
                onClick={() => onTogglePin(entry.id)}
                aria-pressed={pinned}
                aria-label={`Pin ${entry.label}`}
                className={`flex size-11 shrink-0 items-center justify-center rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 ${
                    pinned ? "text-sky-600 dark:text-sky-300" : "text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200"
                }`}
            >
                {pinned ? <LuPinOff className="size-4" aria-hidden/> : <LuPin className="size-4" aria-hidden/>}
            </button>
        </li>
    );
};

const SheetPalette = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [pinned, setPinned] = useState<string[]>(["boarding", "maps"]);
    const [recent, setRecent] = useState<string[]>(["currency", "hotel", "flight"]);
    const [opened, setOpened] = useState<string | null>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const sheetRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const wasOpen = useRef(false);
    const dragControls = useDragControls();
    const reduceMotion = useReducedMotion();
    const desktop = useIsDesktop();
    const titleId = useId();

    useEffect(() => {
        if (open) {
            setQuery("");
            inputRef.current?.focus();
        } else if (wasOpen.current) {
            triggerRef.current?.focus();
        }
        wasOpen.current = open;
    }, [open]);

    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return needle ? entries.filter((entry) => `${entry.label} ${entry.detail}`.toLowerCase().includes(needle)) : [];
    }, [query]);

    const openEntry = (entry: Entry) => {
        setOpened(entry.label);
        setRecent((list) => [entry.id, ...list.filter((id) => id !== entry.id)].slice(0, 4));
        setOpen(false);
    };

    const togglePin = (id: string) => {
        setPinned((list) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id]));
    };

    // Keeps Tab inside the sheet and closes it on Escape.
    const onSheetKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
            return;
        }
        if (event.key !== "Tab" || !sheetRef.current) return;
        const focusable = sheetRef.current.querySelectorAll<HTMLElement>("button, input");
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

    const onDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
        if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
    };

    const sheetMotion = desktop || reduceMotion
        ? {initial: {opacity: 0, scale: reduceMotion ? 1 : 0.97}, animate: {opacity: 1, scale: 1}, exit: {opacity: 0, scale: reduceMotion ? 1 : 0.98}}
        : {initial: {y: "100%"}, animate: {y: 0}, exit: {y: "100%"}};

    return (
        <div className="flex w-full max-w-sm flex-col items-center gap-3">
            <div className="w-full rounded-3xl border border-zinc-200 bg-gradient-to-b from-sky-50 to-white p-5 dark:border-white/10 dark:from-sky-950/40 dark:to-zinc-900">
                <p className="text-xs font-medium text-sky-700 dark:text-sky-300">Trip to Lisbon</p>
                <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">Oct 12 to 18</p>
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-haspopup="dialog"
                    className="mt-4 flex w-full items-center gap-2.5 rounded-full border border-zinc-200 bg-white px-4 py-3 text-left text-sm text-zinc-500 shadow-sm transition hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:border-white/20"
                >
                    <LuSearch className="size-4" aria-hidden/>
                    Search your trip
                </button>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
                {opened ? <>Opened <span className="font-medium text-zinc-800 dark:text-zinc-200">{opened}</span></> : "On a phone, drag the handle down to close"}
            </p>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-950/40 sm:items-start sm:px-4 sm:pt-[12vh] dark:bg-black/60"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setOpen(false);
                        }}
                    >
                        <motion.div
                            ref={sheetRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            onKeyDown={onSheetKeyDown}
                            className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-md sm:rounded-2xl sm:border sm:border-zinc-200 dark:bg-zinc-900 sm:dark:border-white/10"
                            {...sheetMotion}
                            transition={{type: "spring", stiffness: 420, damping: 40}}
                            drag={desktop || reduceMotion ? false : "y"}
                            dragControls={dragControls}
                            dragListener={false}
                            dragConstraints={{top: 0, bottom: 0}}
                            dragElastic={{top: 0, bottom: 0.6}}
                            onDragEnd={onDragEnd}
                        >
                            <div
                                className="flex shrink-0 cursor-grab touch-none justify-center pb-1 pt-3 active:cursor-grabbing sm:hidden"
                                onPointerDown={(event) => dragControls.start(event)}
                                aria-hidden
                            >
                                <span className="h-1.5 w-10 rounded-full bg-zinc-300 dark:bg-zinc-600"/>
                            </div>
                            <h2 id={titleId} className="sr-only">Search your trip</h2>

                            <div className="flex shrink-0 items-center gap-2 px-4 pb-3 pt-2 sm:pt-4">
                                <div className="relative flex-1">
                                    <LuSearch className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden/>
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        type="search"
                                        placeholder="Tickets, bookings, tools"
                                        aria-label="Search your trip"
                                        className="h-11 w-full rounded-full bg-zinc-100 pl-10 pr-4 text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-sky-500/60 dark:bg-white/[0.06] dark:text-zinc-100 dark:placeholder:text-zinc-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex h-11 shrink-0 items-center rounded-full px-3 text-sm font-medium text-sky-600 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:text-sky-300 dark:hover:bg-sky-400/10"
                                >
                                    Cancel
                                </button>
                            </div>

                            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-6">
                                {query.trim() ? (
                                    <>
                                        <ul aria-label="Results">
                                            {results.map((entry) => (
                                                <Row key={entry.id} entry={entry} pinned={pinned.includes(entry.id)} onOpen={openEntry} onTogglePin={togglePin}/>
                                            ))}
                                        </ul>
                                        {results.length === 0 && (
                                            <p className="px-3 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">Nothing in this trip matches “{query.trim()}”</p>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <section aria-label="Pinned">
                                            <p className="px-3 pb-2 pt-1 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Pinned</p>
                                            {pinned.length ? (
                                                <ul className="flex gap-2 overflow-x-auto px-2 pb-2 [scrollbar-width:none]">
                                                    <AnimatePresence initial={false}>
                                                        {pinned.map((id) => {
                                                            const entry = byId(id);
                                                            if (!entry) return null;
                                                            const Icon = entry.icon;
                                                            return (
                                                                <motion.li
                                                                    key={id}
                                                                    layout={!reduceMotion}
                                                                    initial={{opacity: 0, scale: 0.9}}
                                                                    animate={{opacity: 1, scale: 1}}
                                                                    exit={{opacity: 0, scale: 0.9}}
                                                                    transition={{duration: 0.15}}
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => openEntry(entry)}
                                                                        className="flex w-24 flex-col items-center gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 px-2 py-3 text-center text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-200 dark:hover:bg-white/[0.06]"
                                                                    >
                                                                        <span className="flex size-10 items-center justify-center rounded-full bg-sky-500 text-white shadow-md shadow-sky-500/30" aria-hidden>
                                                                            <Icon className="size-5"/>
                                                                        </span>
                                                                        <span className="line-clamp-2">{entry.label}</span>
                                                                    </button>
                                                                </motion.li>
                                                            );
                                                        })}
                                                    </AnimatePresence>
                                                </ul>
                                            ) : (
                                                <p className="px-3 pb-3 text-sm text-zinc-500 dark:text-zinc-400">Pin the things you open most to keep them here.</p>
                                            )}
                                        </section>

                                        <section aria-label="Recent" className="mt-2">
                                            <div className="flex items-center justify-between px-3 pb-1 pt-2">
                                                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recent</p>
                                                {recent.length > 0 && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setRecent([])}
                                                        className="flex items-center gap-1 rounded-full px-2 py-1 text-xs text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                                                    >
                                                        <LuX className="size-3" aria-hidden/>
                                                        Clear
                                                    </button>
                                                )}
                                            </div>
                                            {recent.length ? (
                                                <ul>
                                                    {recent.map((id) => {
                                                        const entry = byId(id);
                                                        return entry ? <Row key={id} entry={entry} pinned={pinned.includes(id)} onOpen={openEntry} onTogglePin={togglePin}/> : null;
                                                    })}
                                                </ul>
                                            ) : (
                                                <p className="flex items-center gap-2 px-3 py-3 text-sm text-zinc-500 dark:text-zinc-400">
                                                    <LuClock className="size-4" aria-hidden/>
                                                    Things you open will show up here.
                                                </p>
                                            )}
                                        </section>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SheetPalette;
