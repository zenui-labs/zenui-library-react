import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuFileText} from "react-icons/lu";

interface Particle {
    id: number;
    x: number;
    peakY: number;
    endY: number;
    rotate: number;
    color: string;
    round: boolean;
    duration: number;
}

interface Burst {
    id: number;
    particles: Particle[];
}

const DEFAULT_COLORS = ["#6366f1", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

// Particles fan out upward, slow at the top of their arc, then fall and fade.
const createParticles = (count: number, colors: string[]): Particle[] =>
    Array.from({length: count}, (_, id) => {
        const angle = (-160 + Math.random() * 140) * (Math.PI / 180);
        const speed = 70 + Math.random() * 110;
        const peakY = Math.sin(angle) * speed;
        return {
            id,
            x: Math.cos(angle) * speed * 1.5,
            peakY,
            endY: peakY + 90 + Math.random() * 70,
            rotate: (Math.random() - 0.5) * 720,
            color: colors[id % colors.length],
            round: Math.random() > 0.6,
            duration: 1 + Math.random() * 0.5,
        };
    });

export interface ConfettiButtonProps {
    /** Whether the task is complete. Pass it with `onCompletedChange` to control the button. */
    completed?: boolean;
    /** Starting state when the button manages its own state. */
    defaultCompleted?: boolean;
    onCompletedChange?: (completed: boolean) => void;
    label?: string;
    completedLabel?: string;
    /** Confetti colors as CSS colors. Particles cycle through them in order. */
    colors?: string[];
    /** Number of pieces in each burst. */
    particleCount?: number;
    className?: string;
}

// A toggle that sends a burst of confetti from its center each time it is switched to complete.
// Switching back is quiet, and reduced motion skips the burst.
export const ConfettiButton = ({
    completed,
    defaultCompleted = false,
    onCompletedChange,
    label = "Mark complete",
    completedLabel = "Completed",
    colors = DEFAULT_COLORS,
    particleCount = 32,
    className = "",
}: ConfettiButtonProps) => {
    const reduceMotion = useReducedMotion();
    const [internalDone, setInternalDone] = useState(defaultCompleted);
    const done = completed ?? internalDone;
    const [bursts, setBursts] = useState<Burst[]>([]);
    const nextId = useRef(0);
    const timers = useRef<number[]>([]);

    useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

    const toggle = () => {
        const next = !done;
        setInternalDone(next);
        onCompletedChange?.(next);
        if (!next || reduceMotion) return;

        const id = nextId.current++;
        setBursts((current) => [...current, {id, particles: createParticles(particleCount, colors)}]);
        const timer = window.setTimeout(() => {
            setBursts((current) => current.filter((burst) => burst.id !== id));
        }, 1700);
        timers.current.push(timer);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Confetti starts from the center of the button and is allowed to leave its container. */}
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                {bursts.map((burst) =>
                    burst.particles.map((particle) => (
                        <motion.span
                            key={`${burst.id}-${particle.id}`}
                            className={`absolute -ml-1 -mt-1.5 h-3 w-2 ${particle.round ? "rounded-full" : "rounded-[2px]"}`}
                            style={{backgroundColor: particle.color}}
                            initial={{x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.6}}
                            animate={{
                                x: particle.x,
                                y: [0, particle.peakY, particle.endY],
                                rotate: particle.rotate,
                                opacity: [1, 1, 0],
                                scale: 1,
                            }}
                            transition={{
                                duration: particle.duration,
                                x: {duration: particle.duration, ease: [0.16, 1, 0.3, 1]},
                                y: {duration: particle.duration, times: [0, 0.35, 1], ease: ["easeOut", "easeIn"]},
                                opacity: {duration: particle.duration, times: [0, 0.7, 1]},
                            }}
                        />
                    )),
                )}
            </div>

            <motion.button
                type="button"
                onClick={toggle}
                whileTap={{scale: 0.95}}
                transition={{type: "spring", stiffness: 500, damping: 30}}
                className={`relative inline-flex min-w-[9.5rem] items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
                    done
                        ? "bg-emerald-600 text-white focus-visible:ring-emerald-500 dark:bg-emerald-500"
                        : "bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                }`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={done ? "done" : "todo"}
                        className="inline-flex items-center gap-2"
                        initial={{opacity: 0, y: 6}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -6}}
                        transition={{duration: 0.15}}
                    >
                        {done && <LuCheck className="h-4 w-4" aria-hidden="true"/>}
                        {done ? completedLabel : label}
                    </motion.span>
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export interface Assignee {
    initials: string;
    /** Background class for the avatar, for example "bg-sky-500". */
    colorClassName: string;
}

export interface Task {
    title: string;
    /** Second line under the title, such as the due date and project. */
    detail: string;
    assignees: Assignee[];
}

export interface TaskCardProps {
    task: Task;
    icon?: ComponentType<{className?: string; "aria-hidden"?: boolean | "true" | "false"}>;
    completed?: boolean;
    defaultCompleted?: boolean;
    onCompletedChange?: (completed: boolean) => void;
    /** Read by screen readers when the task is completed. */
    completedAnnouncement?: string;
    className?: string;
}

/** A task card whose complete button celebrates with confetti and strikes the title through. */
export const TaskCard = ({
    task,
    icon: Icon = LuFileText,
    completed,
    defaultCompleted = false,
    onCompletedChange,
    completedAnnouncement = "Task marked as complete",
    className = "",
}: TaskCardProps) => {
    const [internalDone, setInternalDone] = useState(defaultCompleted);
    const done = completed ?? internalDone;

    const handleChange = (next: boolean) => {
        setInternalDone(next);
        onCompletedChange?.(next);
    };

    return (
        <div className={`w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
            <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                    <Icon className="h-5 w-5" aria-hidden="true"/>
                </span>
                <div className="min-w-0">
                    <p className={`font-medium transition-colors ${done ? "text-gray-400 line-through dark:text-slate-500" : "text-gray-900 dark:text-white"}`}>
                        {task.title}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500 dark:text-slate-400">{task.detail}</p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-100 pt-4 dark:border-slate-800">
                <div className="flex -space-x-2">
                    {task.assignees.map((assignee) => (
                        <span key={assignee.initials} className={`h-8 w-8 rounded-full ring-2 ring-white dark:ring-slate-900 ${assignee.colorClassName}`} aria-hidden="true">
                            <span className="flex h-full items-center justify-center text-[11px] font-semibold text-white">
                                {assignee.initials}
                            </span>
                        </span>
                    ))}
                </div>

                <ConfettiButton completed={done} onCompletedChange={handleChange}/>
            </div>

            <p className="sr-only" aria-live="polite">
                {done ? completedAnnouncement : ""}
            </p>
        </div>
    );
};
