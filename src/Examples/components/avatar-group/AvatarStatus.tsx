import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronDown} from "react-icons/lu";

export type Presence = "online" | "away" | "busy" | "offline";

export interface Person {
    name: string;
    role: string;
}

export interface Teammate extends Person {
    presence: Presence;
    /** The teammate's local time, already formatted, for example "9:42 AM". */
    localTime: string;
}

const presenceStyles: Record<Presence, {label: string; dot: string; text: string}> = {
    online: {label: "Online", dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400"},
    away: {label: "Away", dot: "bg-amber-400", text: "text-amber-600 dark:text-amber-400"},
    busy: {label: "Do not disturb", dot: "bg-rose-500", text: "text-rose-600 dark:text-rose-400"},
    offline: {label: "Offline", dot: "bg-zinc-300 dark:bg-zinc-600", text: "text-zinc-500 dark:text-zinc-400"},
};

const presenceOrder: Presence[] = ["online", "away", "busy", "offline"];

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

export interface PresenceAvatarProps {
    name: string;
    presence: Presence;
    size?: "md" | "lg";
}

/** An initials avatar with a status dot in the corner. */
export const PresenceAvatar = ({name, presence, size = "md"}: PresenceAvatarProps) => {
    const reduceMotion = useReducedMotion();
    const large = size === "lg";
    return (
        <span className="relative inline-flex shrink-0">
            <span
                className={`flex items-center justify-center rounded-full bg-zinc-100 font-semibold text-zinc-700 ring-1 ring-inset ring-zinc-950/5 dark:bg-zinc-800 dark:text-zinc-200 dark:ring-white/10 ${
                    large ? "size-11 text-sm" : "size-9 text-xs"
                } ${presence === "offline" ? "opacity-60" : ""}`}
                aria-hidden
            >
                {initials(name)}
            </span>
            <span
                className={`absolute bottom-0 right-0 flex items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-900 ${presenceStyles[presence].dot} ${
                    large ? "size-3.5" : "size-3"
                }`}
                aria-hidden
            >
                {presence === "online" && !reduceMotion && (
                    <motion.span
                        className="absolute inset-0 rounded-full bg-emerald-500"
                        animate={{scale: [1, 2], opacity: [0.5, 0]}}
                        transition={{duration: 1.8, repeat: Infinity, ease: "easeOut"}}
                    />
                )}
                {presence === "busy" && <span className="h-[2px] w-1.5 rounded-full bg-white"/>}
                {presence === "away" && <span className="absolute left-0 top-0 size-1.5 rounded-full bg-white dark:bg-zinc-900"/>}
            </span>
        </span>
    );
};

export interface StatusMenuProps {
    value: Presence;
    onChange: (value: Presence) => void;
}

/** A button that opens a listbox for picking your own status. */
export const StatusMenu = ({value, onChange}: StatusMenuProps) => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const rootRef = useRef<HTMLDivElement>(null);
    const listId = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!open) return;
        listRef.current?.focus();
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const openMenu = () => {
        setActive(presenceOrder.indexOf(value));
        setOpen(true);
    };

    const close = () => {
        setOpen(false);
        buttonRef.current?.focus();
    };

    const choose = (presence: Presence) => {
        onChange(presence);
        close();
    };

    const onButtonKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            openMenu();
        }
    };

    const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        const count = presenceOrder.length;
        if (event.key === "ArrowDown") setActive((index) => (index + 1) % count);
        else if (event.key === "ArrowUp") setActive((index) => (index - 1 + count) % count);
        else if (event.key === "Home") setActive(0);
        else if (event.key === "End") setActive(count - 1);
        else if (event.key === "Enter" || event.key === " ") choose(presenceOrder[active]);
        else if (event.key === "Escape" || event.key === "Tab") close();
        else return;
        event.preventDefault();
    };

    return (
        <div ref={rootRef} className="relative">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => (open ? close() : openMenu())}
                onKeyDown={onButtonKeyDown}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                className="flex h-8 items-center gap-2 rounded-lg border border-zinc-200 bg-white pl-2.5 pr-2 text-xs font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700/70"
            >
                <span className={`size-2 rounded-full ${presenceStyles[value].dot}`} aria-hidden/>
                {presenceStyles[value].label}
                <LuChevronDown className={`size-3.5 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden/>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        ref={listRef}
                        id={listId}
                        role="listbox"
                        aria-label="Set your status"
                        aria-activedescendant={`${listId}-${presenceOrder[active]}`}
                        tabIndex={-1}
                        onKeyDown={onListKeyDown}
                        className="absolute right-0 top-full z-20 mt-1.5 w-48 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 outline-none dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.14}}
                    >
                        {presenceOrder.map((presence, index) => (
                            <li
                                key={presence}
                                id={`${listId}-${presence}`}
                                role="option"
                                aria-selected={presence === value}
                                onMouseMove={() => setActive(index)}
                                onClick={() => choose(presence)}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-700 dark:text-zinc-200 ${
                                    index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""
                                }`}
                            >
                                <span className={`size-2 rounded-full ${presenceStyles[presence].dot}`} aria-hidden/>
                                <span className="flex-1">{presenceStyles[presence].label}</span>
                                {presence === value && <LuCheck className="size-4 text-indigo-600 dark:text-indigo-400" aria-hidden/>}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export interface AvatarStatusProps {
    /** The signed-in person, shown at the top with the status menu. */
    currentUser: Person;
    teammates: Teammate[];
    /** Your own status, when you control it from the parent. */
    value?: Presence;
    defaultValue?: Presence;
    onChange?: (value: Presence) => void;
    teamLabel?: string;
    className?: string;
}

/** A presence list: your own status with a menu to change it, then your team with status dots. */
export const AvatarStatus = ({currentUser, teammates, value, defaultValue = "online", onChange, teamLabel = "Team", className = ""}: AvatarStatusProps) => {
    const [internalPresence, setInternalPresence] = useState<Presence>(defaultValue);
    const myPresence = value ?? internalPresence;
    const setMyPresence = (next: Presence) => {
        if (value === undefined) setInternalPresence(next);
        onChange?.(next);
    };
    const onlineCount = teammates.filter((teammate) => teammate.presence === "online").length + (myPresence === "online" ? 1 : 0);

    return (
        <div className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex items-center gap-3 border-b border-zinc-100 p-5 dark:border-white/[0.06]">
                <PresenceAvatar name={currentUser.name} presence={myPresence} size="lg"/>
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{currentUser.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{currentUser.role}</p>
                </div>
                <StatusMenu value={myPresence} onChange={setMyPresence}/>
            </div>
            <div className="px-5 pb-2 pt-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    {teamLabel} <span className="normal-case tracking-normal">· {onlineCount} online</span>
                </p>
            </div>
            <ul className="px-2 pb-2">
                {teammates.map((teammate) => (
                    <li key={teammate.name} className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
                        <PresenceAvatar name={teammate.name} presence={teammate.presence}/>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{teammate.name}</p>
                            <p className={`text-xs ${presenceStyles[teammate.presence].text}`}>{presenceStyles[teammate.presence].label}</p>
                        </div>
                        <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500">{teammate.localTime}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
