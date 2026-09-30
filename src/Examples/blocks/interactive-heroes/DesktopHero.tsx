import {useEffect, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode, RefObject} from "react";
import {AnimatePresence, motion, useDragControls, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuArrowRight, LuStickyNote, LuTerminal} from "react-icons/lu";

export interface HeroAction {
    label: string;
    /** Renders a link when set, otherwise a button. */
    href?: string;
    onClick?: () => void;
}

export type DesktopWindowId = "readme" | "terminal" | "notes";

export interface TerminalLine {
    /** Typed lines get a prompt and appear one key at a time; output lines appear whole. */
    typed?: boolean;
    text: string;
    tone?: "muted" | "success";
}

export interface ChangelogEntry {
    version: string;
    date: string;
    items: string[];
}

export interface DesktopIcon {
    id: string;
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Window this icon opens on a second click or Enter. */
    opens?: DesktopWindowId;
}

export interface DesktopHeroProps {
    /** Name in the menu bar and on the README window's dock icon. */
    appName: string;
    eyebrow: string;
    headline: ReactNode;
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    terminalTitle?: string;
    /** Shell prompt shown before typed lines. */
    prompt?: string;
    terminalLines: TerminalLine[];
    notesTitle?: string;
    changelog: ChangelogEntry[];
    /** Icons down the right edge of the desktop. Hidden on narrow screens. */
    icons?: DesktopIcon[];
    /** Decorative menu titles next to the app name. */
    menus?: string[];
    className?: string;
}

interface Placement {
    left: string;
    top: string;
    width: string;
}

const placements = (compact: boolean): Record<DesktopWindowId, Placement> =>
    compact
        ? {
            readme: {left: "3%", top: "3%", width: "94%"},
            terminal: {left: "5%", top: "64%", width: "90%"},
            notes: {left: "8%", top: "30%", width: "84%"},
        }
        : {
            readme: {left: "3%", top: "6%", width: "min(470px, 52%)"},
            terminal: {left: "45%", top: "5%", width: "41%"},
            notes: {left: "51%", top: "50%", width: "35%"},
        };

const titles: Record<DesktopWindowId, (props: DesktopHeroProps) => string> = {
    readme: (props) => `${props.appName} — README`,
    terminal: (props) => props.terminalTitle ?? "Terminal",
    notes: (props) => props.notesTitle ?? "Changelog",
};

const FloppyGlyph = ({className = ""}: {className?: string}) => (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={className}>
        <path d="M2 1.5h9.5L14.5 4.5v10h-12.5z" fill="currentColor"/>
        <rect x="4.5" y="1.5" width="6" height="4" rx="0.5" className="fill-white dark:fill-zinc-900"/>
        <rect x="8.2" y="2.2" width="1.5" height="2.6" fill="currentColor"/>
        <rect x="4" y="8.5" width="8" height="5.2" rx="0.6" className="fill-white/90 dark:fill-zinc-900/90"/>
    </svg>
);

const dockIcons: Record<DesktopWindowId, ComponentType<{className?: string}>> = {
    readme: FloppyGlyph,
    terminal: LuTerminal,
    notes: LuStickyNote,
};

const ActionLink = ({action, className, children}: {action: HeroAction; className: string; children?: ReactNode}) =>
    action.href ? (
        <a href={action.href} onClick={action.onClick} className={className}>
            {action.label}
            {children}
        </a>
    ) : (
        <button type="button" onClick={action.onClick} className={className}>
            {action.label}
            {children}
        </button>
    );

const useClock = () => {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        // Tick on the minute boundary so the clock never shows a stale minute.
        let timer = 0;
        const schedule = () => {
            const wait = 60000 - (Date.now() % 60000) + 20;
            timer = window.setTimeout(() => {
                setNow(new Date());
                schedule();
            }, wait);
        };
        schedule();
        return () => window.clearTimeout(timer);
    }, []);
    return now;
};

// Types the typed lines one key at a time and drops output lines in whole, like a real shell.
const useTypewriter = (lines: TerminalLine[], running: boolean, instant: boolean) => {
    const [progress, setProgress] = useState({line: 0, chars: 0});
    useEffect(() => {
        if (instant) {
            setProgress({line: lines.length, chars: 0});
            return;
        }
        if (!running || progress.line >= lines.length) return;
        const line = lines[progress.line];
        const typing = line.typed && progress.chars < line.text.length;
        const delay = typing
            ? 28 + Math.random() * 55
            : line.typed
                ? 420
                : 140;
        const timer = window.setTimeout(() => {
            setProgress((current) => (typing ? {line: current.line, chars: current.chars + 1} : {line: current.line + 1, chars: 0}));
        }, progress.line === 0 && progress.chars === 0 ? 700 : delay);
        return () => window.clearTimeout(timer);
    }, [lines, running, instant, progress]);
    return progress;
};

interface WindowFrameProps {
    id: DesktopWindowId;
    title: string;
    placement: Placement;
    zIndex: number;
    active: boolean;
    minimized: boolean;
    boundsRef: RefObject<HTMLDivElement>;
    position: {x: MotionValue<number>; y: MotionValue<number>};
    /** Where the dock icon sits relative to the window, for the minimise animation. */
    dockOffset: {x: number; y: number};
    reduceMotion: boolean;
    onFocus: () => void;
    onMinimize: () => void;
    frameRef: (element: HTMLDivElement | null) => void;
    bodyClassName?: string;
    children: ReactNode;
}

const WindowFrame = ({
    id,
    title,
    placement,
    zIndex,
    active,
    minimized,
    boundsRef,
    position,
    dockOffset,
    reduceMotion,
    onFocus,
    onMinimize,
    frameRef,
    bodyClassName = "",
    children,
}: WindowFrameProps) => {
    const controls = useDragControls();
    const titleId = `desktop-window-${id}`;

    // Arrow keys on the title bar nudge the window, clamped to the desktop.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 48 : 12;
        const delta = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]}[event.key];
        if (!delta) return;
        event.preventDefault();
        const bounds = boundsRef.current?.getBoundingClientRect();
        const frame = event.currentTarget.closest("[data-window]")?.getBoundingClientRect();
        if (!bounds || !frame) return;
        const dx = Math.min(bounds.right - frame.right, Math.max(bounds.left - frame.left, delta[0]));
        const dy = Math.min(bounds.bottom - frame.bottom, Math.max(bounds.top - frame.top, delta[1]));
        position.x.set(position.x.get() + dx);
        position.y.set(position.y.get() + dy);
    };

    return (
        <motion.div
            ref={frameRef}
            data-window=""
            drag={!minimized}
            dragControls={controls}
            dragListener={false}
            dragConstraints={boundsRef}
            dragElastic={0.04}
            dragMomentum={false}
            onPointerDownCapture={onFocus}
            onFocusCapture={onFocus}
            className="absolute"
            style={{...placement, x: position.x, y: position.y, zIndex, pointerEvents: minimized ? "none" : "auto"}}
        >
            <AnimatePresence initial={false}>
                {!minimized && (
                    <motion.section
                        key="window"
                        aria-labelledby={titleId}
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.12, x: dockOffset.x, y: dockOffset.y}}
                        animate={{opacity: 1, scale: 1, x: 0, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.12, x: dockOffset.x, y: dockOffset.y}}
                        transition={reduceMotion ? {duration: 0.12} : {type: "spring", stiffness: 380, damping: 34, mass: 0.8}}
                        className={`overflow-hidden rounded-lg border bg-white transition-[border-color,box-shadow] duration-200 dark:bg-zinc-900 ${
                            active
                                ? "border-zinc-900 shadow-[5px_5px_0_0_rgba(24,24,27,0.92)] dark:border-zinc-300 dark:shadow-[5px_5px_0_0_rgba(0,0,0,0.7)]"
                                : "border-zinc-400 shadow-[2px_2px_0_0_rgba(24,24,27,0.18)] dark:border-zinc-700 dark:shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]"
                        }`}
                    >
                        <div
                            onPointerDown={(event) => {
                                // Stops the drag from also selecting text in the windows it passes over.
                                event.preventDefault();
                                controls.start(event);
                            }}
                            className={`flex h-7 cursor-grab touch-none items-center gap-2 border-b px-2 active:cursor-grabbing ${active ? "border-zinc-900 text-zinc-900 dark:border-zinc-300 dark:text-zinc-300" : "border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-600"}`}
                        >
                            <button
                                type="button"
                                aria-label={`Minimise ${title}`}
                                onClick={onMinimize}
                                onPointerDown={(event) => event.stopPropagation()}
                                className={`group flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-[3px] border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:bg-zinc-900 ${active ? "border-current" : "border-zinc-300 dark:border-zinc-700"}`}
                            >
                                <span className="h-px w-2 bg-current opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"/>
                            </button>
                            {/* Pinstripes mark the focused window, as on the old desktops. */}
                            <span aria-hidden="true" className={`h-[9px] flex-1 ${active ? "bg-[repeating-linear-gradient(to_bottom,currentColor_0_1px,transparent_1px_3px)]" : ""}`}/>
                            <div
                                id={titleId}
                                tabIndex={0}
                                aria-label={`${title}. Use the arrow keys to move the window.`}
                                onKeyDown={handleKeyDown}
                                className="max-w-[70%] truncate rounded px-1 font-mono text-[11px] font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                            >
                                {title}
                            </div>
                            <span aria-hidden="true" className={`h-[9px] flex-1 ${active ? "bg-[repeating-linear-gradient(to_bottom,currentColor_0_1px,transparent_1px_3px)]" : ""}`}/>
                            <span className="w-3.5"/>
                        </div>
                        <div className={bodyClassName}>{children}</div>
                    </motion.section>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const WINDOWS: DesktopWindowId[] = ["readme", "terminal", "notes"];

/**
 * A hero dressed as a small retro desktop: a menu bar with a live clock, desktop icons, a dock and
 * three windows you can drag, focus and minimise. The headline lives in one window, a terminal types
 * the install command in another, and a notes window holds the changelog.
 */
export const DesktopHero = (props: DesktopHeroProps) => {
    const {
        appName,
        eyebrow,
        headline,
        description,
        primaryAction,
        secondaryAction,
        prompt = "~ %",
        terminalLines,
        changelog,
        icons = [],
        menus = ["File", "Edit", "View", "Window", "Help"],
        className = "",
    } = props;

    const rootRef = useRef<HTMLElement>(null);
    const desktopRef = useRef<HTMLDivElement>(null);
    const frames = useRef<Partial<Record<DesktopWindowId, HTMLDivElement | null>>>({});
    const dockButtons = useRef<Partial<Record<DesktopWindowId, HTMLButtonElement | null>>>({});

    const inView = useInView(rootRef, {amount: 0.3});
    const reduceMotion = useReducedMotion() ?? false;
    const now = useClock();

    const [compact, setCompact] = useState(false);
    const [order, setOrder] = useState<DesktopWindowId[]>(["notes", "terminal", "readme"]);
    const [minimized, setMinimized] = useState<Record<DesktopWindowId, boolean>>({readme: false, terminal: false, notes: false});
    const [dockOffsets, setDockOffsets] = useState<Record<DesktopWindowId, {x: number; y: number}>>({
        readme: {x: 0, y: 300},
        terminal: {x: 0, y: 300},
        notes: {x: 0, y: 300},
    });
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const positions = {
        readme: {x: useMotionValue(0), y: useMotionValue(0)},
        terminal: {x: useMotionValue(0), y: useMotionValue(0)},
        notes: {x: useMotionValue(0), y: useMotionValue(0)},
    };
    const positionsRef = useRef(positions);
    positionsRef.current = positions;

    // Narrow frames get a stacked layout with the notes tucked into the dock.
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        let current: boolean | null = null;
        const update = () => {
            const next = root.clientWidth < 640;
            if (current === next) return;
            // Dragged offsets belong to the old layout, so windows snap back to their new homes.
            if (current !== null) {
                WINDOWS.forEach((id) => {
                    positionsRef.current[id].x.set(0);
                    positionsRef.current[id].y.set(0);
                });
            }
            current = next;
            setCompact(next);
            setMinimized((state) => ({...state, notes: next}));
        };
        update();
        const observer = new ResizeObserver(update);
        observer.observe(root);
        return () => observer.disconnect();
    }, []);

    const progress = useTypewriter(terminalLines, inView && !minimized.terminal, reduceMotion);
    const terminalBody = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const body = terminalBody.current;
        if (body) body.scrollTop = body.scrollHeight;
    }, [progress]);

    const visible = order.filter((id) => !minimized[id]);
    const focused = visible[visible.length - 1];

    const bringToFront = (id: DesktopWindowId) => {
        setOrder((current) => (current[current.length - 1] === id ? current : [...current.filter((item) => item !== id), id]));
    };

    // Measure from the window's centre to its dock icon, so it shrinks into the right slot.
    const measureDockOffset = (id: DesktopWindowId) => {
        const frame = frames.current[id]?.getBoundingClientRect();
        const dock = dockButtons.current[id]?.getBoundingClientRect();
        if (!frame || !dock) return;
        const x = dock.left + dock.width / 2 - (frame.left + frame.width / 2);
        const y = dock.top + dock.height / 2 - (frame.top + Math.max(frame.height, 120) / 2);
        setDockOffsets((current) => ({...current, [id]: {x, y}}));
    };

    const minimize = (id: DesktopWindowId) => {
        measureDockOffset(id);
        // Let the offset render before the window unmounts, so the exit uses it.
        requestAnimationFrame(() => setMinimized((current) => ({...current, [id]: true})));
        dockButtons.current[id]?.focus();
    };

    const restore = (id: DesktopWindowId) => {
        setMinimized((current) => ({...current, [id]: false}));
        bringToFront(id);
    };

    const handleDock = (id: DesktopWindowId) => {
        if (minimized[id]) restore(id);
        else if (focused === id) minimize(id);
        else bringToFront(id);
    };

    const openIcon = (icon: DesktopIcon) => {
        if (selectedIcon !== icon.id) {
            setSelectedIcon(icon.id);
            return;
        }
        if (icon.opens) restore(icon.opens);
    };

    const layout = placements(compact);
    const clock = new Intl.DateTimeFormat(undefined, {weekday: "short", hour: "2-digit", minute: "2-digit"}).format(now);

    const renderBody = (id: DesktopWindowId) => {
        if (id === "readme") {
            return (
                <div className={compact ? "px-5 pb-6 pt-5" : "px-7 pb-7 pt-6"}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{eyebrow}</p>
                    <h1 className={`mt-3 text-balance font-semibold leading-[1.04] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 ${compact ? "text-[30px]" : "text-[40px]"}`}>{headline}</h1>
                    <p className="mt-4 text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                        <ActionLink
                            action={primaryAction}
                            className="group inline-flex h-10 items-center gap-2 rounded-md border border-zinc-900 bg-blue-600 pl-4 pr-3 text-sm font-medium text-white shadow-[2px_2px_0_0_rgba(24,24,27,1)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[3px_3px_0_0_rgba(24,24,27,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:border-zinc-950 dark:bg-blue-500 dark:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:focus-visible:ring-offset-zinc-900"
                        >
                            <LuArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                        </ActionLink>
                        {secondaryAction && (
                            <ActionLink
                                action={secondaryAction}
                                className="inline-flex h-10 items-center rounded-md border border-zinc-300 px-4 text-sm font-medium text-zinc-800 transition-colors hover:border-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-300"
                            />
                        )}
                    </div>
                </div>
            );
        }
        if (id === "terminal") {
            return (
                <div ref={terminalBody} className={`overflow-hidden bg-zinc-950 px-3.5 py-3 font-mono text-[11.5px] leading-[1.65] text-zinc-300 ${compact ? "h-44" : "h-52"}`}>
                    {terminalLines.slice(0, progress.line + 1).map((line, index) => {
                        const done = index < progress.line;
                        const text = line.typed && !done ? line.text.slice(0, progress.chars) : line.text;
                        if (!done && !line.typed) return null;
                        return (
                            <div key={index} className={`whitespace-pre-wrap break-all ${line.tone === "success" ? "text-emerald-400" : line.tone === "muted" || !line.typed ? "text-zinc-500" : ""}`}>
                                {line.typed && <span className="mr-2 text-blue-400">{prompt}</span>}
                                {text}
                                {!done && <span aria-hidden="true" className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-zinc-300"/>}
                            </div>
                        );
                    })}
                    {progress.line >= terminalLines.length && (
                        <div>
                            <span className="mr-2 text-blue-400">{prompt}</span>
                            <motion.span
                                aria-hidden="true"
                                className="inline-block h-[1.1em] w-[7px] translate-y-[3px] bg-zinc-300"
                                animate={reduceMotion ? undefined : {opacity: [1, 1, 0, 0]}}
                                transition={{duration: 1.1, repeat: Infinity, times: [0, 0.5, 0.5, 1]}}
                            />
                        </div>
                    )}
                </div>
            );
        }
        return (
            <div className="max-h-56 overflow-y-auto bg-[#fffbeb] bg-[linear-gradient(to_bottom,transparent_23px,rgba(180,140,60,0.18)_23px)] bg-[length:100%_24px] px-4 py-2 text-[12.5px] leading-6 text-stone-700 dark:bg-zinc-900 dark:bg-[linear-gradient(to_bottom,transparent_23px,rgba(255,255,255,0.05)_23px)] dark:text-zinc-300">
                {changelog.map((entry) => (
                    <div key={entry.version} className="mb-2">
                        <p className="flex items-baseline justify-between font-mono text-[11px]">
                            <span className="font-semibold text-stone-900 dark:text-zinc-100">{entry.version}</span>
                            <span className="text-stone-400 dark:text-zinc-500">{entry.date}</span>
                        </p>
                        <ul>
                            {entry.items.map((item) => (
                                <li key={item} className="flex gap-2">
                                    <span aria-hidden="true" className="text-stone-400 dark:text-zinc-600">–</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section
            ref={rootRef}
            className={`relative isolate flex w-full flex-col overflow-hidden bg-[#d9ddd7] text-zinc-900 dark:bg-[#131517] dark:text-zinc-100 ${compact ? "min-h-[720px]" : "min-h-[640px]"} ${className}`}
        >
            {/* Wallpaper: a fine dither of dots. */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(24,24,27,0.14)_1px,transparent_1.2px)] bg-[length:5px_5px] dark:bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1.2px)]"
            />

            <div className="relative z-[60] flex h-7 shrink-0 items-center justify-between border-b border-zinc-900 bg-white/95 px-3 text-[12px] dark:border-zinc-700 dark:bg-zinc-900/95">
                <div className="flex min-w-0 items-center gap-4">
                    <FloppyGlyph className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400"/>
                    <span className="font-semibold">{appName}</span>
                    <span aria-hidden="true" className={`gap-4 text-zinc-600 dark:text-zinc-400 ${compact ? "hidden" : "flex"}`}>
                        {menus.map((menu) => (
                            <span key={menu}>{menu}</span>
                        ))}
                    </span>
                </div>
                <time dateTime={now.toISOString()} className="whitespace-nowrap font-mono text-[11px] tabular-nums text-zinc-700 dark:text-zinc-300">
                    {clock}
                </time>
            </div>

            <div ref={desktopRef} className="relative flex-1">
                {icons.length > 0 && !compact && (
                    <ul className="absolute right-3 top-4 flex flex-col items-center gap-3" aria-label="Desktop">
                        {icons.map((icon) => {
                            const Icon = icon.icon;
                            const selected = selectedIcon === icon.id;
                            return (
                                <li key={icon.id}>
                                    <button
                                        type="button"
                                        onClick={() => openIcon(icon)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter" && icon.opens) {
                                                event.preventDefault();
                                                restore(icon.opens);
                                            }
                                        }}
                                        onBlur={() => setSelectedIcon((current) => (current === icon.id ? null : current))}
                                        aria-label={icon.opens ? `${icon.label}, click twice to open` : icon.label}
                                        className="flex w-[76px] flex-col items-center gap-1 rounded-md p-1 focus-visible:outline-none"
                                    >
                                        <span className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${selected ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900" : "border-transparent text-zinc-800 dark:text-zinc-300"}`}>
                                            <Icon className="h-7 w-7 stroke-[1.4]"/>
                                        </span>
                                        <span className={`max-w-full truncate rounded-sm px-1 text-[11px] leading-4 ${selected ? "bg-blue-600 text-white dark:bg-blue-500" : "bg-white/70 text-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-300"}`}>
                                            {icon.label}
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}

                {WINDOWS.map((id) => (
                    <WindowFrame
                        key={id}
                        id={id}
                        title={titles[id](props)}
                        placement={layout[id]}
                        zIndex={10 + order.indexOf(id)}
                        active={focused === id}
                        minimized={minimized[id]}
                        boundsRef={desktopRef}
                        position={positions[id]}
                        dockOffset={dockOffsets[id]}
                        reduceMotion={reduceMotion}
                        onFocus={() => bringToFront(id)}
                        onMinimize={() => minimize(id)}
                        frameRef={(element) => {
                            frames.current[id] = element;
                        }}
                    >
                        {renderBody(id)}
                    </WindowFrame>
                ))}
            </div>

            <nav aria-label="Dock" className="relative z-[60] flex shrink-0 justify-center pb-3 pt-2">
                <ul className="flex items-end gap-1.5 rounded-xl border border-zinc-900 bg-white/90 px-2 py-1.5 shadow-[3px_3px_0_0_rgba(24,24,27,0.9)] dark:border-zinc-600 dark:bg-zinc-900/90 dark:shadow-[3px_3px_0_0_rgba(0,0,0,0.7)]">
                    {WINDOWS.map((id) => {
                        const Icon = dockIcons[id];
                        const title = titles[id](props);
                        return (
                            <li key={id} className="flex flex-col items-center">
                                <motion.button
                                    ref={(element: HTMLButtonElement | null) => {
                                        dockButtons.current[id] = element;
                                    }}
                                    type="button"
                                    aria-label={minimized[id] ? `Restore ${title}` : focused === id ? `Minimise ${title}` : `Bring ${title} to front`}
                                    onClick={() => handleDock(id)}
                                    whileHover={reduceMotion ? undefined : {y: -3}}
                                    whileTap={reduceMotion ? undefined : {scale: 0.92}}
                                    transition={{type: "spring", stiffness: 500, damping: 26}}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-300 bg-zinc-50 text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                                >
                                    <Icon className={`h-[18px] w-[18px] ${id === "readme" ? "text-blue-600 dark:text-blue-400" : ""}`}/>
                                </motion.button>
                                <span aria-hidden="true" className={`mt-1 h-1 w-1 rounded-full transition-colors ${minimized[id] ? "bg-transparent" : "bg-zinc-900 dark:bg-zinc-300"}`}/>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </section>
    );
};
