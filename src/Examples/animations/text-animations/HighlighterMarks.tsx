import {createContext, useContext, useRef, useState} from "react";
import type {ReactNode} from "react";
import {motion, useInView, useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

interface MarkState {
    play: boolean;
    reduceMotion: boolean;
}

// Marks read whether to draw from the quote around them. Used on their own, they draw on mount.
const MarkContext = createContext<MarkState>({play: true, reduceMotion: false});

const useMarkState = (): MarkState => {
    const context = useContext(MarkContext);
    const reduceMotion = useReducedMotion() ?? false;
    return {play: context.play, reduceMotion: context.reduceMotion || reduceMotion};
};

export interface MarkProps {
    children: ReactNode;
    /** Seconds to wait after the quote scrolls into view. */
    delay?: number;
    /** Color classes for the mark. Replaces the default color. */
    colorClassName?: string;
}

const highlightColor =
    "bg-[linear-gradient(104deg,transparent_0.4%,rgba(253,224,71,0.85)_2%,rgba(253,224,71,0.6)_98%,transparent_99.6%)] dark:bg-[linear-gradient(104deg,transparent_0.4%,rgba(250,204,21,0.35)_2%,rgba(250,204,21,0.25)_98%,transparent_99.6%)]";

// The highlight is a background image that grows from 0% to 100% wide. Inline backgrounds are laid
// out as if all lines were one strip, so a highlight that wraps is drawn line by line, like a pen.
export const Highlight = ({children, delay = 0, colorClassName = highlightColor}: MarkProps) => {
    const {play, reduceMotion} = useMarkState();
    return (
        <motion.mark
            initial={{backgroundSize: "0% 100%"}}
            animate={{backgroundSize: play ? "100% 100%" : "0% 100%"}}
            transition={{duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay, ease: [0.65, 0, 0.35, 1]}}
            className={`rounded-sm bg-transparent bg-no-repeat ${colorClassName} px-0.5 text-inherit`}
        >
            {children}
        </motion.mark>
    );
};

// A hand-drawn loop around a phrase, drawn with pathLength.
export const Circled = ({children, delay = 0, colorClassName = "text-rose-500 dark:text-rose-400"}: MarkProps) => {
    const {play, reduceMotion} = useMarkState();
    return (
        <span className="relative inline-block whitespace-nowrap">
            {children}
            <svg aria-hidden="true" viewBox="0 0 200 70" preserveAspectRatio="none" className={`pointer-events-none absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible ${colorClassName}`}>
                <motion.path
                    d="M110 8 C 55 2, 8 14, 6 36 C 4 58, 70 66, 120 62 C 170 58, 196 44, 192 28 C 188 12, 140 4, 88 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{pathLength: 0, opacity: 0}}
                    animate={play ? {pathLength: 1, opacity: 1} : {pathLength: 0, opacity: 0}}
                    transition={{duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: [0.65, 0, 0.35, 1]}}
                />
            </svg>
        </span>
    );
};

// A quick squiggle underneath a phrase.
export const Squiggle = ({children, delay = 0, colorClassName = "text-sky-500 dark:text-sky-400"}: MarkProps) => {
    const {play, reduceMotion} = useMarkState();
    return (
        <span className="relative inline-block whitespace-nowrap">
            {children}
            <svg aria-hidden="true" viewBox="0 0 120 12" preserveAspectRatio="none" className={`pointer-events-none absolute -bottom-2 left-0 h-3 w-full overflow-visible ${colorClassName}`}>
                <motion.path
                    d="M2 7 C 12 2, 20 11, 30 6 S 48 2, 58 7 S 76 11, 86 6 S 104 2, 118 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{pathLength: 0}}
                    animate={{pathLength: play ? 1 : 0}}
                    transition={{duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : delay, ease: "easeOut"}}
                />
            </svg>
        </span>
    );
};

export interface QuoteAuthor {
    name: string;
    /** Job title and company, shown under the name. */
    role: string;
    /** Shown in the avatar. Defaults to the first letters of the first two words of the name. */
    initials?: string;
}

export interface HighlighterMarksProps {
    /** The quote text. Wrap phrases in Highlight, Circled or Squiggle to mark them. */
    children: ReactNode;
    author: QuoteAuthor;
    /** Accessible name for the replay button. */
    replayLabel?: string;
    className?: string;
}

const toInitials = (name: string) =>
    name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();

// A testimonial whose marks draw themselves once the quote scrolls into view.
export const HighlighterMarks = ({children, author, replayLabel = "Replay highlight animation", className = ""}: HighlighterMarksProps) => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref, {once: true, amount: 0.6});
    const reduceMotion = useReducedMotion() ?? false;
    const [run, setRun] = useState(0);

    return (
        <MarkContext.Provider value={{play: inView, reduceMotion}}>
            {/* Changing the key remounts the quote and its marks, which draws them again. */}
            <figure ref={ref} key={run} className={`w-full max-w-2xl ${className}`}>
                <blockquote className="text-xl font-medium leading-[1.7] tracking-tight text-gray-900 sm:text-2xl sm:leading-[1.7] dark:text-slate-100">
                    {children}
                </blockquote>
                <figcaption className="mt-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-300 to-rose-400 text-sm font-semibold text-white">
                            {author.initials ?? toInitials(author.name)}
                        </span>
                        <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{author.name}</p>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{author.role}</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => setRun((value) => value + 1)}
                        aria-label={replayLabel}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                    </button>
                </figcaption>
            </figure>
        </MarkContext.Provider>
    );
};
