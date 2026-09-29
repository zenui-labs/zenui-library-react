import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuClock, LuPlay, LuX} from "react-icons/lu";

interface Talk {
    id: string;
    title: string;
    speaker: string;
    role: string;
    duration: string;
    artwork: string;
    summary: string;
    chapters: string[];
}

const talks: Talk[] = [
    {
        id: "motion",
        title: "Motion that explains itself",
        speaker: "Priya Raman",
        role: "Design lead, Linearity",
        duration: "24 min",
        artwork: "from-indigo-500 via-violet-500 to-fuchsia-500",
        summary: "How to use timing and easing to show where things come from and where they go, without slowing people down.",
        chapters: ["Why most transitions feel slow", "Choosing an easing curve", "Motion for loading states"],
    },
    {
        id: "tokens",
        title: "Design tokens at scale",
        speaker: "Marcus Lee",
        role: "Staff engineer, Fieldwork",
        duration: "31 min",
        artwork: "from-emerald-400 via-teal-500 to-cyan-600",
        summary: "Lessons from moving 40 products to one token set, including naming, theming and the migration plan.",
        chapters: ["Naming that survives rebrands", "Light and dark from one source", "Rolling out without a freeze"],
    },
    {
        id: "forms",
        title: "Forms people finish",
        speaker: "Ana Ortiz",
        role: "Researcher, Checkpoint",
        duration: "18 min",
        artwork: "from-amber-400 via-orange-500 to-rose-500",
        summary: "What 1,200 recorded sessions taught us about validation, error messages and when to ask for less.",
        chapters: ["Inline errors that help", "Fewer fields, same data", "Testing with real users"],
    },
];

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Cards and the open dialog share layoutIds, so the card itself grows into the dialog.
// The overlay is contained in this section; use `fixed` instead of `absolute` for a full page overlay.
const ExpandableCards = () => {
    const [activeId, setActiveId] = useState<string | null>(null);
    const active = talks.find((talk) => talk.id === activeId) ?? null;
    const closeRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastTrigger = useRef<string | null>(null);

    useEffect(() => {
        if (!activeId) return;
        closeRef.current?.focus();
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setActiveId(null);
            if (event.key !== "Tab" || !dialogRef.current) return;
            // Keep focus inside the dialog while it is open.
            const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button, a[href], input, [tabindex]:not([tabindex='-1'])");
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
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [activeId]);

    const open = (id: string) => {
        lastTrigger.current = id;
        setActiveId(id);
    };

    const returnFocus = () => {
        if (lastTrigger.current) triggerRefs.current[lastTrigger.current]?.focus();
    };

    return (
        <MotionConfig transition={{duration: 0.5, ease}} reducedMotion="user">
            <div className="relative flex min-h-[520px] w-full max-w-3xl items-center">
                <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                    {talks.map((talk) => (
                        <li key={talk.id}>
                            <motion.button
                                ref={(element) => {
                                    triggerRefs.current[talk.id] = element;
                                }}
                                type="button"
                                layoutId={`card-${talk.id}`}
                                onClick={() => open(talk.id)}
                                aria-haspopup="dialog"
                                style={{borderRadius: 20}}
                                className="block w-full overflow-hidden border border-gray-200 bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900"
                            >
                                <motion.span layoutId={`art-${talk.id}`} className={`block h-32 bg-gradient-to-br ${talk.artwork}`}/>
                                <span className="block p-4">
                                    <motion.span layoutId={`title-${talk.id}`} className="block font-semibold text-gray-900 dark:text-white">
                                        {talk.title}
                                    </motion.span>
                                    <motion.span layoutId={`speaker-${talk.id}`} className="mt-1 block text-sm text-gray-500 dark:text-slate-400">
                                        {talk.speaker}
                                    </motion.span>
                                </span>
                            </motion.button>
                        </li>
                    ))}
                </ul>

                <AnimatePresence onExitComplete={returnFocus}>
                    {active && (
                        <motion.div
                            key="overlay"
                            className="absolute -inset-2 z-10 rounded-3xl bg-gray-900/30 backdrop-blur-[2px] dark:bg-black/50"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            onClick={() => setActiveId(null)}
                        />
                    )}
                    {active && (
                        <div key="dialog" className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-2">
                            <motion.div
                                ref={dialogRef}
                                layoutId={`card-${active.id}`}
                                role="dialog"
                                aria-modal="true"
                                aria-labelledby={`talk-title-${active.id}`}
                                style={{borderRadius: 24}}
                                className="pointer-events-auto relative w-full max-w-md overflow-hidden border border-gray-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                            >
                                <motion.div layoutId={`art-${active.id}`} className={`h-40 bg-gradient-to-br ${active.artwork}`}/>
                                <button
                                    ref={closeRef}
                                    type="button"
                                    onClick={() => setActiveId(null)}
                                    aria-label="Close"
                                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                                >
                                    <LuX className="h-4 w-4" aria-hidden="true"/>
                                </button>

                                <div className="p-5">
                                    <motion.h3 id={`talk-title-${active.id}`} layoutId={`title-${active.id}`} className="font-semibold text-gray-900 dark:text-white">
                                        {active.title}
                                    </motion.h3>
                                    <motion.p layoutId={`speaker-${active.id}`} className="mt-1 text-sm text-gray-500 dark:text-slate-400">
                                        {active.speaker}
                                    </motion.p>

                                    {/* Details fade in after the card has mostly grown. */}
                                    <motion.div
                                        initial={{opacity: 0, y: 8}}
                                        animate={{opacity: 1, y: 0, transition: {delay: 0.15, duration: 0.35}}}
                                        exit={{opacity: 0, transition: {duration: 0.1}}}
                                    >
                                        <p className="mt-1 text-xs text-gray-400 dark:text-slate-500">{active.role}</p>
                                        <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-slate-300">{active.summary}</p>
                                        <ol className="mt-4 space-y-2">
                                            {active.chapters.map((chapter, index) => (
                                                <li key={chapter} className="flex items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
                                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                                                        {index + 1}
                                                    </span>
                                                    {chapter}
                                                </li>
                                            ))}
                                        </ol>
                                        <div className="mt-5 flex items-center justify-between">
                                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400">
                                                <LuClock className="h-4 w-4" aria-hidden="true"/>
                                                {active.duration}
                                            </span>
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                                            >
                                                <LuPlay className="h-4 w-4" aria-hidden="true"/>
                                                Watch talk
                                            </button>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
};

export default ExpandableCards;
