import {useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuCheck, LuChevronLeft, LuChevronRight, LuRotateCcw} from "react-icons/lu";

export interface Flashcard {
    /** The word or phrase on the front face. */
    word: string;
    /** Small label above the word, for example "noun". */
    partOfSpeech: string;
    /** The answer on the back face. */
    meaning: string;
    /** A sample sentence shown under the meaning. */
    example: string;
}

export interface FlashcardDeckProps {
    cards: Flashcard[];
    /** Accessible name for the deck. */
    label?: string;
    /** Controlled list of learned card indexes. Leave it out to let the deck manage its own state. */
    learned?: number[];
    defaultLearned?: number[];
    onLearnedChange?: (learned: number[]) => void;
    /** Called with the new index whenever the visible card changes. */
    onIndexChange?: (index: number) => void;
    /** Heading on the back face. */
    backHeading?: string;
    flipHint?: string;
    keyboardHint?: string;
    className?: string;
}

const faceClass =
    "col-start-1 row-start-1 flex min-h-[15rem] flex-col rounded-3xl p-6 text-left [-webkit-backface-visibility:hidden] [backface-visibility:hidden] sm:p-8";

// Direction is passed through `custom`, so a card leaves on one side and the next enters from the other.
const slide: Variants = {
    enter: (direction: number) => ({x: direction * 90, rotate: direction * 5, opacity: 0, scale: 0.96}),
    center: {x: 0, rotate: 0, opacity: 1, scale: 1},
    exit: (direction: number) => ({x: direction * -90, rotate: direction * -5, opacity: 0, scale: 0.96}),
};

// A vocabulary deck: flip a card to see the meaning, then move to the next one.
export const FlashcardDeck = ({
    cards,
    label = "Flashcards",
    learned: learnedProp,
    defaultLearned,
    onLearnedChange,
    onIndexChange,
    backHeading = "Meaning",
    flipHint = "Tap or press Space to flip",
    keyboardHint = "Use the left and right arrow keys to move between cards.",
    className = "",
}: FlashcardDeckProps) => {
    const reduceMotion = useReducedMotion();
    const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
    const [flipped, setFlipped] = useState(false);
    const [internalLearned, setInternalLearned] = useState<Set<number>>(() => new Set(defaultLearned));
    const learned = learnedProp ? new Set(learnedProp) : internalLearned;
    const card = cards[index];
    const isLearned = learned.has(index);

    const go = (step: number) => {
        const next = index + step;
        if (next < 0 || next >= cards.length) return;
        setFlipped(false);
        setPage([next, step]);
        onIndexChange?.(next);
    };

    const toggleLearned = () => {
        const next = new Set(learned);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        if (!learnedProp) setInternalLearned(next);
        onLearnedChange?.([...next].sort((a, b) => a - b));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
    };

    const navButton =
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

    return (
        <div role="group" aria-label={label} onKeyDown={handleKeyDown} className={`w-full max-w-md ${className}`}>
            <div className="mb-4 flex items-center justify-between text-sm">
                <p className="font-medium text-gray-900 dark:text-white">
                    Card {index + 1} <span className="text-gray-400 dark:text-slate-500">of {cards.length}</span>
                </p>
                <p className="text-gray-500 dark:text-slate-400">{learned.size} learned</p>
            </div>
            <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                <motion.div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-teal-400 to-emerald-500"
                    initial={false}
                    animate={{scaleX: (index + 1) / cards.length}}
                    transition={{type: "spring", stiffness: 200, damping: 30}}
                />
            </div>

            <div className="relative">
                {/* Two cards peeking out from behind give the deck some depth. */}
                <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-3 rounded-3xl bg-teal-100 dark:bg-teal-950/60"/>
                <div aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-3xl bg-teal-200/70 dark:bg-teal-900/50"/>

                <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={reduceMotion ? undefined : slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{type: "spring", stiffness: 260, damping: 26}}
                        className="relative [perspective:1400px]"
                    >
                        <motion.button
                            type="button"
                            onClick={() => setFlipped((value) => !value)}
                            aria-label={flipped ? `${card.word}: ${card.meaning}. Press to show the word.` : `${card.word}. Press to show the meaning.`}
                            className="grid w-full rounded-3xl [transform-style:preserve-3d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-950"
                            initial={false}
                            animate={{rotateY: flipped ? 180 : 0}}
                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 150, damping: 18}}
                        >
                            <span className={`${faceClass} border border-gray-200 bg-white shadow-lg shadow-gray-900/5 dark:border-slate-700 dark:bg-slate-900`}>
                                <span className="text-xs font-medium uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">{card.partOfSpeech}</span>
                                <span className="my-auto py-6 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{card.word}</span>
                                <span className="text-center text-xs text-gray-400 dark:text-slate-500">{flipHint}</span>
                            </span>
                            <span className={`${faceClass} bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-600/25 [transform:rotateY(180deg)]`}>
                                <span className="text-xs font-medium uppercase tracking-[0.18em] text-teal-100">{backHeading}</span>
                                <span className="mt-4 text-2xl font-semibold leading-snug">{card.meaning}</span>
                                <span className="mt-auto rounded-2xl bg-white/15 px-4 py-3 text-sm italic text-teal-50">{card.example}</span>
                            </span>
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3">
                <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Previous card" className={navButton}>
                    <LuChevronLeft className="h-5 w-5" aria-hidden="true"/>
                </button>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => setFlipped((value) => !value)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                        Flip
                    </button>
                    <motion.button
                        type="button"
                        onClick={toggleLearned}
                        aria-pressed={isLearned}
                        whileTap={{scale: 0.94}}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                            isLearned
                                ? "bg-emerald-600 text-white hover:bg-emerald-500 dark:bg-emerald-500"
                                : "bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                        }`}
                    >
                        <AnimatePresence initial={false}>
                            {isLearned && (
                                <motion.span initial={{width: 0, opacity: 0}} animate={{width: "auto", opacity: 1}} exit={{width: 0, opacity: 0}} className="overflow-hidden">
                                    <LuCheck className="h-4 w-4" aria-hidden="true"/>
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {isLearned ? "Learned" : "I know this"}
                    </motion.button>
                </div>
                <button type="button" onClick={() => go(1)} disabled={index === cards.length - 1} aria-label="Next card" className={navButton}>
                    <LuChevronRight className="h-5 w-5" aria-hidden="true"/>
                </button>
            </div>
            <p className="mt-4 text-center text-xs text-gray-400 dark:text-slate-500">{keyboardHint}</p>
        </div>
    );
};

