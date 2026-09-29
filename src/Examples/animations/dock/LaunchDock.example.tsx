import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useAnimationControls, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuImage, LuMap, LuMusic, LuNewspaper, LuPause, LuStickyNote, LuX} from "react-icons/lu";

type AppId = "notes" | "music" | "photos" | "maps" | "news";

interface App {
    id: AppId;
    name: string;
    icon: IconType;
    color: string;
}

const apps: App[] = [
    {id: "notes", name: "Notes", icon: LuStickyNote, color: "from-amber-300 to-yellow-500"},
    {id: "music", name: "Music", icon: LuMusic, color: "from-rose-400 to-pink-600"},
    {id: "photos", name: "Photos", icon: LuImage, color: "from-sky-400 to-indigo-600"},
    {id: "maps", name: "Maps", icon: LuMap, color: "from-emerald-400 to-teal-600"},
    {id: "news", name: "News", icon: LuNewspaper, color: "from-orange-400 to-red-500"},
];

const AppBody = ({id}: {id: AppId}) => {
    if (id === "notes") {
        return (
            <ul className="space-y-2 text-sm">
                {["Book flights to Lisbon", "Draft Q4 roadmap review", "Pick up film from the lab", "Call Grandma on Sunday"].map((note, index) => (
                    <li key={note} className="flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-2.5 text-gray-800 dark:bg-amber-500/10 dark:text-amber-50">
                        <span className={`h-4 w-4 rounded border ${index === 0 ? "border-amber-500 bg-amber-500" : "border-amber-400"}`}/>
                        {note}
                    </li>
                ))}
            </ul>
        );
    }
    if (id === "music") {
        return (
            <div className="flex items-center gap-4">
                <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-rose-400 via-fuchsia-500 to-indigo-600 shadow-lg"/>
                <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-gray-900 dark:text-white">Harbor Lights</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">Juniper Lane</p>
                    <div className="mt-3 h-1.5 rounded-full bg-gray-200 dark:bg-slate-700">
                        <div className="h-full w-2/5 rounded-full bg-rose-500"/>
                    </div>
                    <div className="mt-1.5 flex justify-between text-[11px] tabular-nums text-gray-500 dark:text-slate-400">
                        <span>1:24</span>
                        <span>3:38</span>
                    </div>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-900">
                    <LuPause className="h-4 w-4" aria-hidden="true"/>
                </span>
            </div>
        );
    }
    if (id === "photos") {
        return (
            <div className="grid grid-cols-3 gap-1.5">
                {["from-sky-300 to-indigo-500", "from-amber-200 to-rose-400", "from-emerald-300 to-teal-600", "from-fuchsia-300 to-purple-600", "from-orange-200 to-amber-500", "from-slate-300 to-slate-600"].map((gradient) => (
                    <div key={gradient} className={`aspect-square rounded-lg bg-gradient-to-br ${gradient}`}/>
                ))}
            </div>
        );
    }
    if (id === "maps") {
        return (
            <div className="relative h-32 overflow-hidden rounded-xl bg-emerald-50 dark:bg-emerald-950/40">
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(16,185,129,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.15)_1px,transparent_1px)] [background-size:24px_24px]"/>
                <div className="absolute left-1/3 top-1/2 h-1 w-1/2 -rotate-12 rounded-full bg-sky-500"/>
                <span className="absolute left-[60%] top-[38%] h-4 w-4 rounded-full border-2 border-white bg-rose-500 shadow"/>
                <p className="absolute bottom-2 left-3 text-xs font-medium text-emerald-900 dark:text-emerald-200">12 min to Ferry Building</p>
            </div>
        );
    }
    return (
        <ul className="space-y-3 text-sm">
            {["City approves new protected bike lanes on Market Street", "Local bakery wins national sourdough prize", "Warriors open the season at home tonight"].map((headline) => (
                <li key={headline} className="border-b border-gray-100 pb-3 text-gray-800 last:border-0 dark:border-slate-800 dark:text-slate-200">{headline}</li>
            ))}
        </ul>
    );
};

interface DockIconProps {
    app: App;
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

// Click an app: its icon bounces while it loads, then the window grows out of the icon.
// Closing shrinks it back into the same icon, because the window scales around the icon's position.
const LaunchDock = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const [openId, setOpenId] = useState<AppId | null>(null);
    const [origin, setOrigin] = useState("50% 100%");
    const areaRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const iconRefs = useRef<Partial<Record<AppId, HTMLButtonElement | null>>>({});
    const lastOpened = useRef<AppId | null>(null);
    const openApp = apps.find((app) => app.id === openId) ?? null;

    useEffect(() => {
        if (!openId) return;
        closeRef.current?.focus();
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setOpenId(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [openId]);

    const launch = (app: App, element: HTMLButtonElement) => {
        const area = areaRef.current?.getBoundingClientRect();
        const icon = element.getBoundingClientRect();
        if (area) setOrigin(`${icon.left + icon.width / 2 - area.left}px ${icon.top + icon.height / 2 - area.top}px`);
        lastOpened.current = app.id;
        setOpenId(app.id);
    };

    return (
        <div className="relative h-[28rem] w-full max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-400 via-violet-400 to-rose-300 shadow-xl dark:from-indigo-950 dark:via-violet-950 dark:to-slate-900">
            <div aria-hidden="true" className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/20 blur-3xl dark:bg-indigo-500/20"/>

            {/* The area windows open into. Its position is the reference for the scale origin. */}
            <div ref={areaRef} className="absolute inset-x-4 bottom-24 top-4 sm:inset-x-12">
                <AnimatePresence
                    onExitComplete={() => {
                        // Only after a close. When one app replaces another, focus stays in the new window.
                        if (!openId && lastOpened.current) iconRefs.current[lastOpened.current]?.focus();
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
                                    onClick={() => setOpenId(null)}
                                    aria-label={`Close ${openApp.name}`}
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
                                <AppBody id={openApp.id}/>
                            </motion.div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>

            <nav aria-label="Dock" className="absolute inset-x-0 bottom-3 flex justify-center px-3">
                <ul className="flex items-end gap-2 rounded-2xl border border-white/40 bg-white/30 px-3 pb-1.5 pt-2.5 shadow-lg backdrop-blur-md sm:gap-3 dark:border-white/10 dark:bg-slate-900/50">
                    {apps.map((app) => (
                        <DockIcon
                            key={app.id}
                            app={app}
                            isOpen={openId === app.id}
                            reduceMotion={reduceMotion}
                            buttonRef={(element) => {
                                iconRefs.current[app.id] = element;
                            }}
                            onLaunch={(element) => {
                                if (openId === app.id) {
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

export default LaunchDock;
