import {useId, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuStar} from "react-icons/lu";

const labels = ["Poor", "Fair", "Good", "Great", "Loved it"];
const sparkAngles = [-90, -30, 30, 90, 150, 210];

// Rate with stars: hovering previews the score, choosing one pops the stars in sequence.
const StarRating = () => {
    const reduceMotion = useReducedMotion();
    const [rating, setRating] = useState(0);
    const [preview, setPreview] = useState(0);
    const [pops, setPops] = useState(0);
    const [note, setNote] = useState("");
    const [sent, setSent] = useState(false);
    const name = useId();
    const noteId = useId();
    const shown = preview || rating;

    const choose = (value: number) => {
        setRating(value);
        setPops((count) => count + 1);
        setSent(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-gray-400 dark:text-slate-500">Order #48213</p>
            <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">How was your delivery?</h3>

            <fieldset className="mt-5">
                <legend className="sr-only">Rating</legend>
                <div className="flex justify-center gap-1" onPointerLeave={() => setPreview(0)}>
                    {labels.map((label, index) => {
                        const value = index + 1;
                        const filled = value <= shown;
                        const justChosen = pops > 0 && value <= rating && !reduceMotion;
                        return (
                            <label key={label} onPointerEnter={() => setPreview(value)} className="relative cursor-pointer p-1">
                                <input
                                    type="radio"
                                    name={name}
                                    value={value}
                                    checked={rating === value}
                                    onChange={() => choose(value)}
                                    className="peer sr-only"
                                />
                                <span className="sr-only">{`${value} of 5, ${label}`}</span>
                                {/* Sparks burst from the chosen star only. */}
                                {pops > 0 && value === rating && !reduceMotion && (
                                    <span key={pops} aria-hidden="true" className="pointer-events-none absolute inset-0">
                                        {sparkAngles.map((angle) => {
                                            const radians = (angle * Math.PI) / 180;
                                            return (
                                                <motion.span
                                                    key={angle}
                                                    className="absolute left-1/2 top-1/2 -ml-0.5 -mt-0.5 h-1 w-1 rounded-full bg-amber-400"
                                                    initial={{x: 0, y: 0, opacity: 1, scale: 1.4}}
                                                    animate={{x: Math.cos(radians) * 24, y: Math.sin(radians) * 24, opacity: 0, scale: 0}}
                                                    transition={{duration: 0.55, ease: "easeOut", delay: 0.1}}
                                                />
                                            );
                                        })}
                                    </span>
                                )}
                                <motion.span
                                    key={justChosen ? `pop-${pops}` : "rest"}
                                    className="flex rounded-md peer-focus-visible:ring-2 peer-focus-visible:ring-amber-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900"
                                    initial={justChosen ? {scale: 0.6} : false}
                                    animate={{scale: 1}}
                                    whileHover={reduceMotion ? undefined : {scale: 1.15}}
                                    transition={{type: "spring", stiffness: 500, damping: 12, delay: justChosen ? index * 0.05 : 0}}
                                >
                                    <LuStar
                                        className={`h-8 w-8 transition-colors duration-150 ${filled ? "text-amber-400" : "text-gray-300 dark:text-slate-600"}`}
                                        fill={filled ? "currentColor" : "none"}
                                        aria-hidden="true"
                                    />
                                </motion.span>
                            </label>
                        );
                    })}
                </div>
            </fieldset>

            <div className="mt-2 h-5 text-sm font-medium text-gray-600 dark:text-slate-300" aria-hidden="true">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.p key={shown} initial={{opacity: 0, y: 4}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -4}} transition={{duration: 0.12}}>
                        {shown ? labels[shown - 1] : "Choose a rating"}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* The comment box opens once a rating is chosen. */}
            <AnimatePresence initial={false}>
                {rating > 0 && (
                    <motion.div
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{type: "spring", stiffness: 260, damping: 30}}
                        className="overflow-hidden text-left"
                    >
                        <div className="pt-5">
                            <label htmlFor={noteId} className="text-xs font-medium text-gray-700 dark:text-slate-300">
                                Anything we should know? <span className="font-normal text-gray-400 dark:text-slate-500">Optional</span>
                            </label>
                            <textarea
                                id={noteId}
                                rows={3}
                                value={note}
                                onChange={(event) => setNote(event.target.value)}
                                placeholder="The courier left it with the front desk."
                                className="mt-1.5 w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-500/15 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder:text-slate-500"
                            />
                            <button
                                type="submit"
                                className="mt-3 w-full rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                            >
                                {sent ? "Thanks for the feedback" : "Send review"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <p className="sr-only" aria-live="polite">{sent ? "Review sent" : ""}</p>
        </form>
    );
};

export default StarRating;
