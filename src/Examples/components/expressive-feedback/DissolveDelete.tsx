import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, animate, motion, useReducedMotion} from "framer-motion";
import {LuRotateCcw, LuX} from "react-icons/lu";

export interface DissolveNotification {
    id: string;
    title: string;
    body: string;
    /** Short relative time, e.g. "2m". */
    time: string;
    icon: ComponentType<{className?: string}>;
}

export interface DissolveDeleteProps {
    notifications: DissolveNotification[];
    title?: string;
    /** Seconds one card takes to blow away. */
    duration?: number;
    className?: string;
}

type Phase = "idle" | "out" | "in";

// A left-to-right white-to-black ramp. Mixed into the noise, it makes the right edge erode first, so the
// card crumbles from the side the dust is blowing toward.
const RAMP = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3ClinearGradient id='g'%3E%3Cstop offset='0' stop-color='%23fff'/%3E%3Cstop offset='1' stop-color='%23000'/%3E%3C/linearGradient%3E%3Crect width='100' height='100' fill='url(%23g)'/%3E%3C/svg%3E";

// Sharpness of the solid edge, and of the band of freshly eroded pixels that becomes dust.
const EDGE = 14;
const BAND = 4.5;
const DRIFT = 150;

const matrixFor = (slope: number, offset: number) => `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${slope} 0 0 0 ${offset}`;

interface CardProps {
    item: DissolveNotification;
    phase: Phase;
    delay: number;
    duration: number;
    seed: number;
    onDismiss: () => void;
    onDone: () => void;
    registerButton: (node: HTMLButtonElement | null) => void;
}

const DissolveCard = ({item, phase, delay, duration, seed, onDismiss, onDone, registerButton}: CardProps) => {
    const filterId = `dissolve-${useId().replace(/:/g, "")}`;
    const cardRef = useRef<HTMLDivElement>(null);
    const rampRef = useRef<SVGFEImageElement>(null);
    const solidRef = useRef<SVGFEColorMatrixElement>(null);
    const reachRef = useRef<SVGFEColorMatrixElement>(null);
    const driftRef = useRef<SVGFEDisplacementMapElement>(null);
    const doneRef = useRef(onDone);
    doneRef.current = onDone;
    // A card that mounts to reassemble starts fully dissolved, before the first paint.
    const [start] = useState(() => (phase === "in" ? 1 : 0));
    const [filtered, setFiltered] = useState(phase !== "idle");
    const Icon = item.icon;

    const threshold = (progress: number) => -0.1 + progress * 1.36;

    useEffect(() => {
        if (phase === "idle") return;
        const card = cardRef.current;
        if (!card) return;
        rampRef.current?.setAttribute("width", String(card.offsetWidth));
        rampRef.current?.setAttribute("height", String(card.offsetHeight));

        // One progress value drives three filter nodes: where the solid edge is, which pixels are fresh dust,
        // and how far the dust has been blown.
        const apply = (progress: number) => {
            const t = threshold(progress);
            solidRef.current?.setAttribute("values", matrixFor(EDGE, -EDGE * t));
            reachRef.current?.setAttribute("values", matrixFor(BAND, 1 - BAND * t));
            driftRef.current?.setAttribute("scale", String(DRIFT * Math.min(1, progress / 0.12)));
        };

        const from = phase === "out" ? 0 : 1;
        apply(from);
        setFiltered(true);
        const controls = animate(from, 1 - from, {
            duration: phase === "out" ? duration : duration * 0.8,
            delay,
            ease: phase === "out" ? [0.3, 0.05, 0.6, 1] : [0.3, 0, 0.3, 1],
            onUpdate: apply,
            onComplete: () => {
                if (phase === "in") setFiltered(false);
                doneRef.current();
            },
        });
        return () => controls.stop();
    }, [phase, delay, duration]);

    const startT = threshold(start);

    return (
        <>
            <svg aria-hidden="true" className="absolute h-0 w-0">
                <filter id={filterId} x="-5%" y="-45%" width="175%" height="190%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves={2} seed={seed} result="noise"/>
                    <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0  1 0 0 0 0  1 0 0 0 0  0 0 0 0 1" result="gray"/>
                    <feImage ref={rampRef} href={RAMP} x="0" y="0" width="400" height="100" preserveAspectRatio="none" result="ramp"/>
                    <feComposite in="gray" in2="ramp" operator="arithmetic" k1="0" k2="0.45" k3="0.55" k4="0" result="mix"/>
                    <feColorMatrix ref={solidRef} in="mix" type="matrix" values={matrixFor(EDGE, -EDGE * startT)} result="solidMask"/>
                    <feColorMatrix ref={reachRef} in="mix" type="matrix" values={matrixFor(BAND, 1 - BAND * startT)} result="reachMask"/>
                    <feComposite in="reachMask" in2="solidMask" operator="out" result="bandMask"/>
                    <feComposite in="SourceGraphic" in2="solidMask" operator="in" result="solid"/>
                    <feComposite in="SourceGraphic" in2="bandMask" operator="in" result="eroded"/>
                    {/* Fine grain biased so every grain samples from its left and a little below: dust drifts right and up. */}
                    <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves={1} seed={seed + 7} result="grain"/>
                    <feColorMatrix in="grain" type="matrix" values="1.25 0 0 0 -0.375  0 1 0 0 0.05  0 0 1 0 0  0 0 0 0 1" result="wind"/>
                    <feDisplacementMap ref={driftRef} in="eroded" in2="wind" scale={DRIFT * Math.min(1, start / 0.12)} xChannelSelector="R" yChannelSelector="G" result="scattered"/>
                    {/* Pull the dust toward a mid grey so it reads as ash on both light and dark surfaces. */}
                    <feColorMatrix in="scattered" type="matrix" values="0.5 0 0 0 0.24  0 0.5 0 0 0.23  0 0 0.5 0 0.22  0 0 0 0.9 0" result="dust"/>
                    <feMerge>
                        <feMergeNode in="dust"/>
                        <feMergeNode in="solid"/>
                    </feMerge>
                </filter>
            </svg>
            <div
                ref={cardRef}
                style={{filter: filtered ? `url(#${filterId})` : undefined}}
                className={`relative flex gap-3 rounded-xl border border-stone-200 bg-white p-3.5 pr-11 shadow-[0_1px_2px_rgba(28,25,23,0.06)] dark:border-stone-800 dark:bg-stone-900 ${phase === "out" ? "pointer-events-none" : ""}`}
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true"/>
                </span>
                <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                        <p className="min-w-0 flex-1 truncate text-sm font-medium text-stone-900 dark:text-stone-100">{item.title}</p>
                        <span className="shrink-0 font-mono text-[11px] tabular-nums text-stone-400 dark:text-stone-500">{item.time}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-stone-500 dark:text-stone-400">{item.body}</p>
                </div>
                <button
                    ref={registerButton}
                    type="button"
                    onClick={onDismiss}
                    disabled={phase === "out"}
                    aria-label={`Dismiss: ${item.title}`}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-500 dark:hover:bg-stone-800 dark:hover:text-stone-100 dark:focus-visible:ring-stone-100"
                >
                    <LuX className="h-4 w-4" aria-hidden="true"/>
                </button>
            </div>
        </>
    );
};

/**
 * Dismissable notification cards that crumble into dust and blow away to the right. The effect is one SVG filter per
 * card: noise decides which pixels erode, a displacement map scatters the freshly eroded ones. Restoring runs it backwards.
 */
export const DissolveDelete = ({notifications, title = "Notifications", duration = 1.7, className = ""}: DissolveDeleteProps) => {
    const reduceMotion = useReducedMotion() ?? false;
    const [visible, setVisible] = useState<string[]>(() => notifications.map((item) => item.id));
    const [phases, setPhases] = useState<Record<string, {phase: Phase; delay: number}>>({});
    const [message, setMessage] = useState("");
    const buttons = useRef(new Map<string, HTMLButtonElement>());
    const restoreRef = useRef<HTMLButtonElement>(null);

    const shown = notifications.filter((item) => visible.includes(item.id));
    const leaving = shown.filter((item) => phases[item.id]?.phase === "out").length;
    const active = shown.length - leaving;
    const missing = notifications.length - active;

    const remove = (id: string) => {
        setVisible((list) => list.filter((value) => value !== id));
        setPhases((current) => {
            const next = {...current};
            delete next[id];
            return next;
        });
    };

    const focusAfter = (ids: string[]) => {
        const rest = shown.filter((item) => !ids.includes(item.id) && phases[item.id]?.phase !== "out");
        const index = shown.findIndex((item) => item.id === ids[0]);
        const next = rest.find((item) => shown.indexOf(item) > index) ?? rest[rest.length - 1];
        requestAnimationFrame(() => (next ? buttons.current.get(next.id) : restoreRef.current)?.focus());
    };

    const dismiss = (item: DissolveNotification) => {
        setMessage(`Dismissed: ${item.title}`);
        focusAfter([item.id]);
        if (reduceMotion) {
            remove(item.id);
            return;
        }
        setPhases((current) => ({...current, [item.id]: {phase: "out", delay: 0}}));
    };

    const clearAll = () => {
        const targets = shown.filter((item) => phases[item.id]?.phase !== "out");
        setMessage(`Dismissed ${targets.length} notifications`);
        focusAfter(targets.map((item) => item.id));
        if (reduceMotion) {
            setVisible([]);
            return;
        }
        setPhases((current) => {
            const next = {...current};
            targets.forEach((item, index) => {
                next[item.id] = {phase: "out", delay: index * 0.09};
            });
            return next;
        });
    };

    const restoreAll = () => {
        const returning = notifications.filter((item) => !visible.includes(item.id));
        setMessage(`Restored ${returning.length} ${returning.length === 1 ? "notification" : "notifications"}`);
        setVisible(notifications.map((item) => item.id));
        if (reduceMotion) return;
        setPhases((current) => {
            const next = {...current};
            returning.forEach((item, index) => {
                next[item.id] = {phase: "in", delay: 0.28 + index * 0.08};
            });
            return next;
        });
    };

    return (
        <section
            aria-label={title}
            className={`w-full max-w-md overflow-hidden rounded-2xl border border-stone-200 bg-stone-100 p-3 dark:border-stone-800 dark:bg-stone-950 ${className}`}
        >
            <div className="flex items-center gap-2 px-2 pb-3 pt-1">
                <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
                <span className="rounded-full bg-stone-200 px-1.5 font-mono text-[11px] tabular-nums text-stone-600 dark:bg-stone-800 dark:text-stone-300">{active}</span>
                <div className="ml-auto flex items-center gap-1">
                    {missing > 0 && (
                        <button
                            ref={restoreRef}
                            type="button"
                            onClick={restoreAll}
                            className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[13px] font-medium text-stone-600 hover:bg-stone-200 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white dark:focus-visible:ring-stone-100"
                        >
                            <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                            Restore all
                        </button>
                    )}
                    {active > 0 && (
                        <button
                            type="button"
                            onClick={clearAll}
                            className="rounded-md px-2 py-1 text-[13px] font-medium text-stone-600 hover:bg-stone-200 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white dark:focus-visible:ring-stone-100"
                        >
                            Clear all
                        </button>
                    )}
                </div>
            </div>

            <ul className="relative">
                <AnimatePresence initial={false}>
                    {shown.map((item, index) => {
                        const state = phases[item.id];
                        return (
                            <motion.li
                                key={item.id}
                                initial={{height: 0, opacity: reduceMotion ? 0 : 1}}
                                animate={{height: "auto", opacity: 1}}
                                exit={{height: 0, opacity: reduceMotion ? 0 : 1}}
                                transition={{height: {duration: 0.32, ease: [0.4, 0, 0.2, 1]}, opacity: {duration: 0.2}}}
                            >
                                <div className="pb-2">
                                    <DissolveCard
                                        item={item}
                                        phase={state?.phase ?? "idle"}
                                        delay={state?.delay ?? 0}
                                        duration={duration}
                                        seed={index * 13 + 3}
                                        onDismiss={() => dismiss(item)}
                                        onDone={() => {
                                            if (state?.phase === "out") remove(item.id);
                                            else setPhases((current) => {
                                                const next = {...current};
                                                delete next[item.id];
                                                return next;
                                            });
                                        }}
                                        registerButton={(node) => {
                                            if (node) buttons.current.set(item.id, node);
                                            else buttons.current.delete(item.id);
                                        }}
                                    />
                                </div>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
                {shown.length === 0 && (
                    <li className="flex h-28 flex-col items-center justify-center gap-1 text-center">
                        <span className="text-sm font-medium text-stone-700 dark:text-stone-200">Nothing new</span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone-400 dark:text-stone-500">0 unread</span>
                    </li>
                )}
            </ul>
            <p className="sr-only" aria-live="polite">{message}</p>
        </section>
    );
};
