import {useState} from "react";
import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {Transition} from "framer-motion";

const morph: Transition = {type: "spring", stiffness: 380, damping: 28};

// Uses `pressed` when given, otherwise keeps its own state.
const useToggle = (pressed: boolean | undefined, defaultPressed: boolean, onChange?: (next: boolean) => void) => {
    const [inner, setInner] = useState(defaultPressed);
    const value = pressed ?? inner;
    const toggle = () => {
        const next = !value;
        if (pressed === undefined) setInner(next);
        onChange?.(next);
    };
    return [value, toggle] as const;
};

/** Props shared by every morphing icon button. */
export interface MorphToggleProps {
    /** Pass it with `onChange` to control the button. */
    pressed?: boolean;
    defaultPressed?: boolean;
    onChange?: (pressed: boolean) => void;
    /** Accessible name of the button. */
    label?: string;
    /** Caption under the button while it is not pressed. */
    caption?: string;
    /** Caption under the button while it is pressed. */
    pressedCaption?: string;
    className?: string;
}

interface TileProps {
    caption: string;
    className: string;
    children: ReactNode;
}

const Tile = ({caption, className, children}: TileProps) => (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
        {children}
        <p className="text-xs font-medium text-gray-500 dark:text-slate-400">{caption}</p>
    </div>
);

const baseButton =
    "flex h-16 w-16 items-center justify-center rounded-2xl border shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950";
const idleColors = "border-gray-200 bg-white text-gray-900 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800";
const buttonClass = `${baseButton} ${idleColors}`;

/** Three bars that fold into a cross. `pressed` means the menu is open. */
export const MenuToggle = ({pressed, defaultPressed = false, onChange, label = "Menu", caption = "Menu", pressedCaption = "Close menu", className = ""}: MorphToggleProps) => {
    const reduceMotion = useReducedMotion();
    const [open, toggle] = useToggle(pressed, defaultPressed, onChange);
    const transition = reduceMotion ? {duration: 0} : morph;

    return (
        <Tile caption={open ? pressedCaption : caption} className={className}>
            <motion.button type="button" aria-expanded={open} aria-label={label} onClick={toggle} whileTap={{scale: 0.92}} className={buttonClass}>
                <span className="relative block h-4 w-6" aria-hidden="true">
                    <motion.span className="absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current" initial={false} animate={open ? {y: 7, rotate: 45} : {y: 0, rotate: 0}} transition={transition}/>
                    <motion.span className="absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current" initial={false} animate={open ? {scaleX: 0, opacity: 0} : {scaleX: 1, opacity: 1}} transition={transition}/>
                    <motion.span className="absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current" initial={false} animate={open ? {y: -7, rotate: -45} : {y: 0, rotate: 0}} transition={transition}/>
                </span>
            </motion.button>
        </Tile>
    );
};

// The play triangle is drawn as two halves so each half can morph into one pause bar.
const shapes = {
    play: ["M7 4 L12.5 7.4 L12.5 16.6 L7 20 Z", "M12.5 7.4 L19 11.5 L19 12.5 L12.5 16.6 Z"],
    pause: ["M6 4 L10 4 L10 20 L6 20 Z", "M14 4 L18 4 L18 20 L14 20 Z"],
};

/** A play triangle that splits into pause bars. `pressed` means playing. */
export const PlayPause = ({pressed, defaultPressed = false, onChange, label = "Play", caption = "Paused", pressedCaption = "Playing", className = ""}: MorphToggleProps) => {
    const reduceMotion = useReducedMotion();
    const [playing, toggle] = useToggle(pressed, defaultPressed, onChange);
    const [left, right] = playing ? shapes.pause : shapes.play;
    const transition = reduceMotion ? {duration: 0} : {duration: 0.28, ease: [0.4, 0, 0.2, 1]};

    return (
        <Tile caption={playing ? pressedCaption : caption} className={className}>
            <motion.button
                type="button"
                aria-pressed={playing}
                aria-label={label}
                onClick={toggle}
                whileTap={{scale: 0.92}}
                className={`${baseButton} ${playing ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-500 dark:bg-indigo-500" : idleColors}`}
            >
                <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                    <motion.path fill="currentColor" initial={false} animate={{d: left}} transition={transition}/>
                    <motion.path fill="currentColor" initial={false} animate={{d: right}} transition={transition}/>
                </svg>
            </motion.button>
        </Tile>
    );
};

/** A plus sign whose two strokes swing into a tick. `pressed` means added. */
export const AddToggle = ({pressed, defaultPressed = false, onChange, label = "Add to list", caption = "Add to list", pressedCaption = "In your list", className = ""}: MorphToggleProps) => {
    const reduceMotion = useReducedMotion();
    const [added, toggle] = useToggle(pressed, defaultPressed, onChange);
    const transition = reduceMotion ? {duration: 0} : morph;

    return (
        <Tile caption={added ? pressedCaption : caption} className={className}>
            <motion.button
                type="button"
                aria-pressed={added}
                aria-label={label}
                onClick={toggle}
                whileTap={{scale: 0.92}}
                className={`${baseButton} ${added ? "border-emerald-500 bg-emerald-500 text-white" : idleColors}`}
            >
                <motion.svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    aria-hidden="true"
                    initial={false}
                    animate={{rotate: added ? 360 : 0}}
                    transition={transition}
                >
                    <motion.path initial={false} animate={{d: added ? "M5 12.5 L9.5 17" : "M12 5 L12 19"}} transition={transition}/>
                    <motion.path initial={false} animate={{d: added ? "M9.5 17 L19 7" : "M5 12 L19 12"}} transition={transition}/>
                </motion.svg>
            </motion.button>
        </Tile>
    );
};

/** Sound waves retract and a cross is drawn. `pressed` means muted. */
export const MuteToggle = ({pressed, defaultPressed = false, onChange, label = "Mute", caption = "Sound on", pressedCaption = "Muted", className = ""}: MorphToggleProps) => {
    const reduceMotion = useReducedMotion();
    const [muted, toggle] = useToggle(pressed, defaultPressed, onChange);
    const draw = (delay: number) => (reduceMotion ? {duration: 0} : {duration: 0.25, delay});

    return (
        <Tile caption={muted ? pressedCaption : caption} className={className}>
            <motion.button type="button" aria-pressed={muted} aria-label={label} onClick={toggle} whileTap={{scale: 0.92}} className={buttonClass}>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M11 5 L6 9 H3 V15 H6 L11 19 Z" fill="currentColor" fillOpacity="0.15"/>
                    <motion.path d="M15.5 9.5 a3.5 3.5 0 0 1 0 5" initial={false} animate={{pathLength: muted ? 0 : 1, opacity: muted ? 0 : 1}} transition={draw(muted ? 0.1 : 0)}/>
                    <motion.path d="M18.5 7 a7 7 0 0 1 0 10" initial={false} animate={{pathLength: muted ? 0 : 1, opacity: muted ? 0 : 1}} transition={draw(muted ? 0 : 0.1)}/>
                    <motion.path d="M16 9.5 L21 14.5" className="text-rose-500" stroke="currentColor" initial={false} animate={{pathLength: muted ? 1 : 0, opacity: muted ? 1 : 0}} transition={draw(muted ? 0.2 : 0)}/>
                    <motion.path d="M21 9.5 L16 14.5" className="text-rose-500" stroke="currentColor" initial={false} animate={{pathLength: muted ? 1 : 0, opacity: muted ? 1 : 0}} transition={draw(muted ? 0.3 : 0)}/>
                </svg>
            </motion.button>
        </Tile>
    );
};
