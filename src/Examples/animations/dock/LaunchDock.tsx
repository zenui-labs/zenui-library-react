import {useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {AnimatePresence, motion, useAnimationControls, useReducedMotion} from "framer-motion";
import {LuX} from "react-icons/lu";

export interface LaunchApp {
    id: string;
    name: string;
    icon: ComponentType<{className?: string}>;
    /** Tailwind gradient stops for the icon tile, for example "from-amber-300 to-yellow-500". */
    color: string;
    /** What the app's window shows. */
    content: ReactNode;
}

interface DockIconProps {
    app: LaunchApp;
    isOpen: boolean;
    reduceMotion: boolean;
    onLaunch: (element: HTMLButtonElement) => void;
    buttonRef: (element: HTMLButtonElement | null) => void;
}

// Bounces while the app "loads", then asks the dock to open its window.
const DockIcon = ({app, isOpen, reduceMotion, onLaunch, buttonRef}: DockIconProps) => {
    const bounce = useAnimationControls();
    const [launching, setLaunching] = useState(false);
    const Icon = app.icon;

    const handleClick = async (element: HTMLButtonElement) => {
        if (isOpen || reduceMotion) {
            onLaunch(element);
            return;
        }
        setLaunching(true);
        await bounce.start({
            y: [0, -20, 0, -20, 0],
            transition: {duration: 1.1, times: [0, 0.22, 0.45, 0.7, 1], ease: ["easeOut", "easeIn", "easeOut", "easeIn"]},
        });
        setLaunching(false);
        onLaunch(element);
    };

    return (
        <li className="flex flex-col items-center">
            <motion.button
                ref={buttonRef}
                type="button"
                aria-label={`${app.name}${isOpen ? ", open" : ""}${launching ? ", opening" : ""}`}
                onClick={(event) => void handleClick(event.currentTarget)}
                animate={bounce}
                whileHover={reduceMotion ? undefined : {y: -4}}
                whileTap={{scale: 0.92}}
                className={`flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-b text-white shadow-lg shadow-black/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500 sm:h-12 sm:w-12 ${app.color}`}
            >
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true"/>
            </motion.button>
            <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full bg-white transition-opacity duration-300 ${isOpen || launching ? "opacity-100" : "opacity-0"}`}
            />
        </li>
    );
};

export interface LaunchDockProps {
    apps: LaunchApp[];
    /** Id of the app whose window is open, or null. Pass it with `onOpenChange` to control it. */
    openId?: string | null;
    defaultOpenId?: string | null;
    onOpenChange?: (id: string | null) => void;
    /** Accessible name for the dock. */
    label?: string;
    /** Accessible name for a window's close button. */
    closeLabel?: (appName: string) => string;
    className?: string;
}

const defaultCloseLabel = (appName: string) => `Close ${appName}`;

// Click an app: its icon bounces while it loads, then the window grows out of the icon.
// Closing shrinks it back into the same icon, because the window scales around the icon's position.
export const LaunchDock = ({
    apps,
    openId,
    defaultOpenId = null,
    onOpenChange,
    label = "Dock",
    closeLabel = defaultCloseLabel,
    className = "",
}: LaunchDockProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const [internalOpenId, setInternalOpenId] = useState<string | null>(defaultOpenId);
    const currentId = openId === undefined ? internalOpenId : openId;
    const [origin, setOrigin] = useState("50% 100%");
    const areaRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const iconRefs = useRef<Partial<Record<string, HTMLButtonElement | null>>>({});
    const lastOpened = useRef<string | null>(null);
    const openApp = apps.find((app) => app.id === currentId) ?? null;

    const setOpen = (id: string | null) => {
        if (openId === undefined) setInternalOpenId(id);
        onOpenChange?.(id);
    };

    // Keeps the latest setter for the Escape listener without re-subscribing on every render.
    const setOpenRef = useRef(setOpen);
    setOpenRef.current = setOpen;

    useEffect(() => {
        if (!currentId) return;
        closeRef.current?.focus();
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setOpenRef.current(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [currentId]);

    const launch = (app: LaunchApp, element: HTMLButtonElement) => {
        const area = areaRef.current?.getBoundingClientRect();
        const icon = element.getBoundingClientRect();
        if (area) setOrigin(`${icon.left + icon.width / 2 - area.left}px ${icon.top + icon.height / 2 - area.top}px`);
        lastOpened.current = app.id;
        setOpen(app.id);
    };

    return (
        <div className={`relative h-[28rem] w-full max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-400 via-violet-400 to-rose-300 shadow-xl dark:from-indigo-950 dark:via-violet-950 dark:to-slate-900 ${className}`}>
            <div aria-hidden="true" className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl dark:bg-indigo-500/20"/>

            {/* The area windows open into. Its position is the reference for the scale origin. */}
            <div ref={areaRef} className="absolute inset-x-4 bottom-24 top-4 sm:inset-x-12">
                <AnimatePresence
                    onExitComplete={() => {
                        // Only after a close. When one app replaces another, focus stays in the new window.
                        if (!currentId && lastOpened.current) iconRefs.current[lastOpened.current]?.focus();
                    }}
                >
                    {openApp && (
                        <motion.section
                            key={openApp.id}
                            role="dialog"
                            aria-label={openApp.name}
                            style={{transformOrigin: origin}}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.06}}
                            animate={{opacity: 1, scale: 1}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.06}}
                            transition={{type: "spring", stiffness: 260, damping: 28, opacity: {duration: 0.2}}}
                            className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95"
                        >
                            <header className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-slate-800">
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={() => setOpen(null)}
                                    aria-label={closeLabel(openApp.name)}
                                    className="group flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:ring-offset-1"
                                >
                                    <LuX className="h-2.5 w-2.5 text-rose-900 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true"/>
                                </button>
                                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full bg-amber-400"/>
                                <span aria-hidden="true" className="h-3.5 w-3.5 rounded-full bg-emerald-500"/>
                                <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">{openApp.name}</h3>
                            </header>
                            <motion.div
                                initial={{opacity: 0, y: 8}}
                                animate={{opacity: 1, y: 0, transition: {delay: 0.18, duration: 0.3}}}
                                className="flex-1 overflow-auto p-4"
                            >
                                {openApp.content}
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            <nav aria-label={label} className="absolute inset-x-0 bottom-3 flex justify-center px-3">
                <ul className="flex items-end gap-2 rounded-2xl border border-white/40 bg-white/30 px-3 pb-1.5 pt-2.5 shadow-lg backdrop-blur-md sm:gap-3 dark:border-white/10 dark:bg-slate-900/50">
                    {apps.map((app) => (
                        <DockIcon
                            key={app.id}
                            app={app}
                            isOpen={currentId === app.id}
                            reduceMotion={reduceMotion}
                            buttonRef={(element) => {
                                iconRefs.current[app.id] = element;
                            }}
                            onLaunch={(element) => {
                                if (currentId === app.id) {
                                    closeRef.current?.focus();
                                    return;
                                }
                                launch(app, element);
                            }}
                        />
                    ))}
                </ul>
            </nav>
        </div>
    );
};
