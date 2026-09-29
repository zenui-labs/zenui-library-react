import {useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useAnimation, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

export interface DockApp {
    name: string;
    icon: ComponentType<{className?: string}>;
    /** Tailwind gradient stops for the icon tile, for example "from-sky-400 to-blue-600". */
    color: string;
    /** Unread count shown in a red badge. */
    badge?: number;
}

interface DockItemProps {
    app: DockApp;
    pointerX: MotionValue<number>;
    open: boolean;
    onOpen: () => void;
    reduceMotion: boolean;
    baseSize: number;
    maxSize: number;
    range: number;
}

const DockItem = ({app, pointerX, open, onOpen, reduceMotion, baseSize, maxSize, range}: DockItemProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);
    const bounce = useAnimation();

    // Distance from the pointer to this icon's center drives its size.
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return range;
        return value - (rect.left + rect.width / 2);
    });
    const target = useTransform(distance, [-range, 0, range], reduceMotion ? [baseSize, baseSize, baseSize] : [baseSize, maxSize, baseSize]);
    const size = useSpring(target, {stiffness: 400, damping: 28, mass: 0.2});
    const iconSize = useTransform(size, (value) => value * 0.45);

    const handleClick = () => {
        onOpen();
        if (!reduceMotion) {
            bounce.start({y: [0, -18, 0, -8, 0], transition: {duration: 0.7, ease: "easeOut"}});
        }
    };

    const Icon = app.icon;

    return (
        <div className="relative flex flex-col items-center">
            <AnimatePresence>
                {hovered && (
                    <motion.span
                        role="tooltip"
                        initial={{opacity: 0, y: 6, x: "-50%"}}
                        animate={{opacity: 1, y: 0, x: "-50%"}}
                        exit={{opacity: 0, y: 4, x: "-50%"}}
                        transition={{duration: 0.15}}
                        className="pointer-events-none absolute -top-9 left-1/2 whitespace-nowrap rounded-md border border-gray-200 bg-white px-2 py-1 text-xs font-medium text-gray-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                    >
                        {app.name}
                    </motion.span>
                )}
            </AnimatePresence>

            <motion.button
                ref={ref}
                type="button"
                aria-label={[app.name, app.badge ? `${app.badge} unread` : "", open ? "open" : ""].filter(Boolean).join(", ")}
                onClick={handleClick}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => {
                    setHovered(true);
                    // Magnify around the focused icon for keyboard users.
                    const rect = ref.current?.getBoundingClientRect();
                    if (rect) pointerX.set(rect.left + rect.width / 2);
                }}
                onBlur={() => {
                    setHovered(false);
                    pointerX.set(Infinity);
                }}
                animate={bounce}
                style={{width: size, height: size}}
                className={`relative flex items-center justify-center rounded-[28%] bg-gradient-to-b ${app.color} text-white shadow-md shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900`}
            >
                <motion.span style={{width: iconSize, height: iconSize}} className="flex">
                    <Icon className="h-full w-full" aria-hidden="true"/>
                </motion.span>
                {app.badge ? (
                    <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold text-white ring-2 ring-white dark:ring-slate-900">
                        {app.badge}
                    </span>
                ) : null}
            </motion.button>

            {/* Running indicator. */}
            <span
                aria-hidden="true"
                className={`mt-1 h-1 w-1 rounded-full bg-gray-700 transition-opacity dark:bg-slate-300 ${open ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
};

export interface MagnifyingDockProps {
    apps: DockApp[];
    /** Items after the divider, such as Trash. They bounce when clicked but never show the running dot. */
    trailingApps?: DockApp[];
    /** Names of the apps that show the running dot. Pass it with `onOpenAppsChange` to control it. */
    openApps?: string[];
    defaultOpenApps?: string[];
    onOpenAppsChange?: (names: string[]) => void;
    /** Called for every click, including trailing items. */
    onSelect?: (app: DockApp) => void;
    /** Icon size in px at rest. */
    baseSize?: number;
    /** Icon size in px right under the pointer. */
    maxSize?: number;
    /** Distance in px from the pointer at which icons stop growing. */
    range?: number;
    /** Accessible name for the dock. */
    label?: string;
    className?: string;
}

/** A dock whose icons grow as the pointer gets closer. Clicking an app bounces it and marks it as open. */
export const MagnifyingDock = ({
    apps,
    trailingApps = [],
    openApps,
    defaultOpenApps = [],
    onOpenAppsChange,
    onSelect,
    baseSize = 44,
    maxSize = 76,
    range = 140,
    label = "Dock",
    className = "",
}: MagnifyingDockProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenApps);
    const open = openApps ?? internalOpen;

    const openApp = (app: DockApp) => {
        onSelect?.(app);
        if (open.includes(app.name)) return;
        const next = [...open, app.name];
        if (openApps === undefined) setInternalOpen(next);
        onOpenAppsChange?.(next);
    };

    const sizes = {baseSize, maxSize, range};

    return (
        <nav aria-label={label} className={`flex w-full justify-center overflow-x-auto px-2 pb-2 pt-16 ${className}`}>
            <div
                onPointerMove={(event) => pointerX.set(event.clientX)}
                onPointerLeave={() => pointerX.set(Infinity)}
                className="flex h-[68px] items-end gap-2.5 rounded-2xl border border-gray-200 bg-white/70 px-3 pb-1.5 shadow-lg shadow-gray-900/5 backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/70 dark:shadow-black/30"
            >
                {apps.map((app) => (
                    <DockItem
                        key={app.name}
                        app={app}
                        pointerX={pointerX}
                        open={open.includes(app.name)}
                        onOpen={() => openApp(app)}
                        reduceMotion={reduceMotion}
                        {...sizes}
                    />
                ))}

                {trailingApps.length > 0 && (
                    <div aria-hidden="true" className="mx-1 mb-3 h-10 w-px self-end bg-gray-300 dark:bg-slate-700"/>
                )}

                {trailingApps.map((app) => (
                    <DockItem
                        key={app.name}
                        app={app}
                        pointerX={pointerX}
                        open={false}
                        onOpen={() => onSelect?.(app)}
                        reduceMotion={reduceMotion}
                        {...sizes}
                    />
                ))}
            </div>
        </nav>
    );
};
