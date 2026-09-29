import {useEffect, useRef} from "react";
import type {MutableRefObject, PointerEvent} from "react";
import {animate, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";

const WORD = "Let's talk";
const LIFT = 26; // px the letter under the pointer rises
const SPREAD = 56; // px, how far the wave reaches to each side
const OFF = -10000; // pointer position used when the pointer is away

interface LetterProps {
    character: string;
    index: number;
    pointerX: MotionValue<number>;
    centers: MutableRefObject<number[]>;
    register: (index: number, element: HTMLSpanElement | null) => void;
}

// Each letter rises by a bell curve of its distance to the pointer, and tilts away from it.
// Springs give the wave a little overshoot as the pointer sweeps across.
const Letter = ({character, index, pointerX, centers, register}: LetterProps) => {
    const strength = useTransform(pointerX, (x) => {
        const distance = x - (centers.current[index] ?? OFF);
        return Math.exp(-(distance * distance) / (2 * SPREAD * SPREAD)) * Math.sign(distance || 1);
    });
    const y = useSpring(useTransform(strength, (value) => -Math.abs(value) * LIFT), {stiffness: 320, damping: 16, mass: 0.6});
    const rotate = useSpring(useTransform(strength, (value) => value * -8), {stiffness: 260, damping: 18});
    const scale = useSpring(useTransform(strength, (value) => 1 + Math.abs(value) * 0.12), {stiffness: 320, damping: 20});

    return (
        <motion.span
            ref={(element) => register(index, element)}
            style={{y, rotate, scale}}
            className="inline-block origin-bottom"
        >
            {character === " " ? "\u00A0" : character}
        </motion.span>
    );
};

const HoverWaveLetters = () => {
    const linkRef = useRef<HTMLAnchorElement>(null);
    const letters = useRef<(HTMLSpanElement | null)[]>([]);
    const centers = useRef<number[]>([]);
    const pointerX = useMotionValue(OFF);
    const reduceMotion = useReducedMotion();

    // Letter centers are measured once and again on resize, never during pointer moves.
    useEffect(() => {
        const link = linkRef.current;
        if (!link) return;
        const measure = () => {
            centers.current = letters.current.map((letter) => (letter ? letter.offsetLeft + letter.offsetWidth / 2 : OFF));
        };
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(link);
        return () => observer.disconnect();
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        pointerX.set(event.clientX - event.currentTarget.getBoundingClientRect().left);
    };

    // Keyboard focus plays one sweep from left to right, so the effect is not pointer only.
    const handleFocus = () => {
        const link = linkRef.current;
        if (reduceMotion || !link) return;
        animate(pointerX, [-SPREAD * 2, link.offsetWidth + SPREAD * 2], {duration: 1.1, ease: [0.45, 0, 0.55, 1]}).then(() => pointerX.set(OFF));
    };

    return (
        <div className="w-full max-w-2xl text-center">
            <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Have a project in mind?</p>

            <a
                ref={linkRef}
                href="#contact"
                onPointerMove={handlePointerMove}
                onPointerLeave={() => pointerX.set(OFF)}
                onFocus={handleFocus}
                aria-label={WORD}
                className="group relative mt-4 inline-block rounded-xl px-2 pt-6 text-5xl font-semibold tracking-tight text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 sm:text-8xl dark:text-white dark:focus-visible:ring-offset-slate-950"
            >
                <span aria-hidden="true" className="whitespace-nowrap">
                    {Array.from(WORD).map((character, index) => (
                        <Letter
                            key={`${character}-${index}`}
                            character={character}
                            index={index}
                            pointerX={pointerX}
                            centers={centers}
                            register={(i, element) => {
                                letters.current[i] = element;
                            }}
                        />
                    ))}
                </span>
                <span
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-1 h-1 origin-left scale-x-0 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
            </a>

            <p className="mx-auto mt-6 max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
                We reply within one business day. Or write to hello@northwind.studio.
            </p>
        </div>
    );
};

export default HoverWaveLetters;
