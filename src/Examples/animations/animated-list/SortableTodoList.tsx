import {useId, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, MotionConfig, Reorder, useDragControls} from "framer-motion";
import {LuGripVertical, LuPlus, LuX} from "react-icons/lu";

export interface TodoTask {
    id: number;
    title: string;
    done: boolean;
}

interface TaskRowProps {
    task: TodoTask;
    position: number;
    total: number;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
    onMove: (id: number, direction: -1 | 1) => void;
}

const TaskRow = ({task, position, total, onToggle, onRemove, onMove}: TaskRowProps) => {
    const controls = useDragControls();
    const checkboxId = useId();

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === "ArrowUp") {
            event.preventDefault();
            onMove(task.id, -1);
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            onMove(task.id, 1);
        }
    };

    return (
        <Reorder.Item
            value={task}
            dragListener={false}
            dragControls={controls}
            initial={{opacity: 0, y: -12, scale: 0.97}}
            animate={{opacity: 1, y: 0, scale: 1}}
            exit={{opacity: 0, x: 32, transition: {duration: 0.2}}}
            whileDrag={{scale: 1.03, boxShadow: "0 18px 40px -16px rgba(15, 23, 42, 0.35)"}}
            transition={{type: "spring", stiffness: 500, damping: 36}}
            className="group relative flex items-center gap-2 rounded-2xl border border-gray-200 bg-white py-2.5 pl-1.5 pr-2 dark:border-slate-800 dark:bg-slate-900"
        >
            <button
                type="button"
                aria-label={`Reorder "${task.title}", position ${position} of ${total}. Use the arrow keys to move it.`}
                onPointerDown={(event) => controls.start(event)}
                onKeyDown={handleKeyDown}
                className="flex h-8 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-gray-300 transition-colors hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:cursor-grabbing dark:text-slate-600 dark:hover:text-slate-400"
            >
                <LuGripVertical className="h-4 w-4" aria-hidden="true"/>
            </button>

            <input
                id={checkboxId}
                type="checkbox"
                checked={task.done}
                onChange={() => onToggle(task.id)}
                className="peer sr-only"
            />
            <label htmlFor={checkboxId} className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-lg peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500">
                <motion.span
                    aria-hidden="true"
                    animate={{scale: task.done ? [1, 0.85, 1] : 1}}
                    transition={{duration: 0.25}}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                        task.done ? "border-indigo-600 bg-indigo-600 dark:border-indigo-500 dark:bg-indigo-500" : "border-gray-300 bg-white dark:border-slate-600 dark:bg-slate-900"
                    }`}
                >
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                        <motion.path
                            d="M3.5 8.5 6.5 11.5 12.5 4.5"
                            stroke="white"
                            strokeWidth={2.2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={false}
                            animate={{pathLength: task.done ? 1 : 0}}
                            transition={{duration: 0.25, ease: "easeOut", delay: task.done ? 0.05 : 0}}
                        />
                    </svg>
                </motion.span>
                <span className="relative min-w-0 truncate text-sm">
                    <span className={`transition-colors duration-300 ${task.done ? "text-gray-400 dark:text-slate-500" : "text-gray-800 dark:text-slate-100"}`}>
                        {task.title}
                    </span>
                    {/* The strike line draws from left to right instead of snapping on. */}
                    <motion.span
                        aria-hidden="true"
                        initial={false}
                        animate={{scaleX: task.done ? 1 : 0}}
                        transition={{duration: 0.3, ease: [0.65, 0, 0.35, 1]}}
                        className="absolute left-0 right-0 top-1/2 h-px origin-left bg-gray-400 dark:bg-slate-500"
                    />
                </span>
            </label>

            <button
                type="button"
                onClick={() => onRemove(task.id)}
                aria-label={`Delete "${task.title}"`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 sm:opacity-0 sm:group-hover:opacity-100 dark:text-slate-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
                <LuX className="h-4 w-4" aria-hidden="true"/>
            </button>
        </Reorder.Item>
    );
};

export interface SortableTodoListProps {
    /** Tasks in display order. Pass with `onChange` to control the list. */
    value?: TodoTask[];
    /** Starting tasks when the list manages its own state. */
    defaultValue?: TodoTask[];
    /** Called with the new list after a task is added, checked, moved or removed. */
    onChange?: (tasks: TodoTask[]) => void;
    title?: string;
    placeholder?: string;
    emptyTitle?: string;
    emptyDescription?: string;
    className?: string;
}

// A to-do list you can reorder by dragging the handle or with the arrow keys.
// Checking a task draws the tick and the strike line, and the progress bar follows.
export const SortableTodoList = ({
    value,
    defaultValue = [],
    onChange,
    title = "This week",
    placeholder = "Add a task",
    emptyTitle = "Nothing left this week",
    emptyDescription = "Add a task above to get started.",
    className = "",
}: SortableTodoListProps) => {
    const [internalTasks, setInternalTasks] = useState<TodoTask[]>(defaultValue);
    const tasks = value ?? internalTasks;
    const [draft, setDraft] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const inputId = useId();

    const setTasks = (next: TodoTask[]) => {
        if (value === undefined) setInternalTasks(next);
        onChange?.(next);
    };

    const doneCount = tasks.filter((task) => task.done).length;
    const progress = tasks.length ? doneCount / tasks.length : 0;

    const addTask = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title = draft.trim();
        if (!title) return;
        setTasks([{id: Date.now(), title, done: false}, ...tasks]);
        setDraft("");
        setAnnouncement(`Added "${title}"`);
    };

    const toggle = (id: number) => setTasks(tasks.map((task) => (task.id === id ? {...task, done: !task.done} : task)));

    const remove = (id: number) => {
        const task = tasks.find((item) => item.id === id);
        setTasks(tasks.filter((item) => item.id !== id));
        if (task) setAnnouncement(`Deleted "${task.title}"`);
    };

    const move = (id: number, direction: -1 | 1) => {
        const from = tasks.findIndex((task) => task.id === id);
        const to = from + direction;
        if (from < 0 || to < 0 || to >= tasks.length) return;
        const next = [...tasks];
        const [task] = next.splice(from, 1);
        next.splice(to, 0, task);
        setTasks(next);
        setAnnouncement(`Moved "${task.title}" to position ${to + 1} of ${next.length}`);
    };

    const clearCompleted = () => {
        setTasks(tasks.filter((task) => !task.done));
        setAnnouncement(`Cleared ${doneCount} completed ${doneCount === 1 ? "task" : "tasks"}`);
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className={`w-full max-w-md rounded-3xl border border-gray-200 bg-gray-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/60 ${className}`}>
                <div className="flex items-baseline justify-between px-1">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-xs tabular-nums text-gray-500 dark:text-slate-400">
                        {doneCount} of {tasks.length} done
                    </p>
                </div>
                <div className="mx-1 mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-800">
                    <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                        initial={false}
                        animate={{scaleX: progress}}
                        transition={{type: "spring", stiffness: 160, damping: 24}}
                    />
                </div>

                <form onSubmit={addTask} className="mt-4 flex gap-2">
                    <label htmlFor={inputId} className="sr-only">New task</label>
                    <input
                        id={inputId}
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder={placeholder}
                        maxLength={80}
                        className="min-w-0 flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
                    />
                    <button
                        type="submit"
                        disabled={!draft.trim()}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-gray-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuPlus className="h-4 w-4" aria-hidden="true"/>
                        Add
                    </button>
                </form>

                <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="mt-3 flex min-h-[208px] flex-col gap-2">
                    <AnimatePresence initial={false}>
                        {tasks.map((task, index) => (
                            <TaskRow
                                key={task.id}
                                task={task}
                                position={index + 1}
                                total={tasks.length}
                                onToggle={toggle}
                                onRemove={remove}
                                onMove={move}
                            />
                        ))}
                    </AnimatePresence>
                    {tasks.length === 0 && (
                        <motion.li
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            className="flex h-[208px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 text-center dark:border-slate-700"
                        >
                            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">{emptyTitle}</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{emptyDescription}</p>
                        </motion.li>
                    )}
                </Reorder.Group>

                <div className="mt-3 flex items-center justify-between px-1">
                    <p className="text-xs text-gray-400 dark:text-slate-500">Drag the handle to reorder</p>
                    <button
                        type="button"
                        onClick={clearCompleted}
                        disabled={doneCount === 0}
                        className="rounded-md text-xs font-medium text-indigo-600 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:text-gray-300 dark:text-indigo-400 dark:disabled:text-slate-600"
                    >
                        Clear completed
                    </button>
                </div>
                <p className="sr-only" aria-live="polite">{announcement}</p>
            </div>
        </MotionConfig>
    );
};
