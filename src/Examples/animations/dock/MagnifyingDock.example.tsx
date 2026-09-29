import {useRef, useState} from "react";
import {AnimatePresence, motion, useAnimation, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCalendar, LuCompass, LuFolder, LuImage, LuMail, LuMusic, LuSettings, LuTerminal, LuTrash2} from "react-icons/lu";

interface App {
    name: string;
    icon: IconType;
    color: string;
    badge?: number;
}

const apps: App[] = [
    {name: "Files", icon: LuFolder, color: "from-sky-400 to-blue-600"},
    {name: "Browser", icon: LuCompass, color: "from-cyan-400 to-sky-600"},
    {name: "Mail", icon: LuMail, color: "from-blue-400 to-indigo-600", badge: 3},
    {name: "Calendar", icon: LuCalendar, color: "from-rose-400 to-red-600"},
    {name: "Photos", icon: LuImage, color: "from-amber-300 to-orange-500"},
    {name: "Music", icon: LuMusic, color: "from-pink-400 to-rose-600"},
    {name: "Terminal", icon: LuTerminal, color: "from-slate-600 to-slate-900"},
    {name: "Settings", icon: LuSettings, color: "from-gray-400 to-gray-600"},
];

const BASE_SIZE = 44;
const MAX_SIZE = 76;
const RANGE = 140;

interface DockItemProps {
    app: App;
    pointerX: MotionValue<number>;
    open: boolean;
    onOpen: () => void;
    reduceMotion: boolean;
}

const DockItem = ({app, pointerX, open, onOpen, reduceMotion}: DockItemProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const [hovered, setHovered] = useState(false);
    const bounce = useAnimation();

    // Distance from the pointer to this icon's center drives its size.
    const distance = useTransform(pointerX, (value) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return RANGE;
        return value - (rect.left + rect.width / 2);
    });
    const target = useTransform(distance, [-RANGE, 0, RANGE], reduceMotion ? [BASE_SIZE, BASE_SIZE, BASE_SIZE] : [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
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

const MagnifyingDock = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const pointerX = useMotionValue(Infinity);
    const [openApps, setOpenApps] = useState<string[]>(["Files", "Mail"]);

    const openApp = (name: string) => {
        setOpenApps((current) => (current.includes(name) ? current : [...current, name]));
    };

    return (
        <nav aria-label="Dock" className="flex w-full justify-center overflow-x-auto px-2 pb-2 pt-16">
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
                        open={openApps.includes(app.name)}
                        onOpen={() => openApp(app.name)}
                        reduceMotion={reduceMotion}
                    />
                ))}

                <div aria-hidden="true" className="mx-1 mb-3 h-10 w-px self-end bg-gray-300 dark:bg-slate-700"/>

                <DockItem
                    app={{name: "Trash", icon: LuTrash2, color: "from-zinc-300 to-zinc-500"}}
                    pointerX={pointerX}
                    open={false}
                    onOpen={() => undefined}
                    reduceMotion={reduceMotion}
                />
            </div>
        </nav>
    );
};

export default MagnifyingDock;
