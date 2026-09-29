import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useAnimationControls, useReducedMotion} from "framer-motion";
import {LuGift, LuRotateCw} from "react-icons/lu";

const LOOPS = 6;
const REEL_COUNT = 4;
// Each reel is the digits 0 to 9 repeated a few times, so a spin can travel several full turns.
const STRIP = Array.from({length: LOOPS * 10}, (_, index) => index % 10);
const CELL = 100 / STRIP.length;

interface Entrant {
    name: string;
    city: string;
}

const entrants: Entrant[] = [
    {name: "Maya Chen", city: "Portland"},
    {name: "Tomás Rivera", city: "Austin"},
    {name: "Aisha Bello", city: "Toronto"},
    {name: "Jonas Weber", city: "Berlin"},
    {name: "Priya Nair", city: "Bengaluru"},
    {name: "Liam O'Connor", city: "Dublin"},
];

interface ReelProps {
    digit: number;
    spinId: number;
    index: number;
    instant: boolean;
    onStop: () => void;
}

const Reel = ({digit, spinId, index, instant, onStop}: ReelProps) => {
    const controls = useAnimationControls();
    const onStopRef = useRef(onStop);
    onStopRef.current = onStop;

    useEffect(() => {
        if (spinId === 0) return;
        let cancelled = false;
        const target = (LOOPS - 1) * 10 + digit;
        const run = async () => {
            if (instant) {
                controls.set({y: `${-digit * CELL}%`});
            } else {
                // Later reels spin longer, and the curve overshoots slightly so each one settles with a bump.
                await controls.start({
                    y: `${-target * CELL}%`,
                    transition: {duration: 1.4 + index * 0.4, ease: [0.15, 0.75, 0.3, 1.04]},
                });
                // Jump back to the same digit in the first loop, so the next spin has room to travel.
                if (!cancelled) controls.set({y: `${-digit * CELL}%`});
            }
            if (!cancelled) onStopRef.current();
        };
        void run();
        return () => {
            cancelled = true;
            controls.stop();
        };
    }, [spinId, digit, index, instant, controls]);

    return (
        <div className="relative h-20 w-14 overflow-hidden rounded-xl bg-gradient-to-b from-gray-100 via-white to-gray-100 shadow-inner ring-1 ring-gray-200 sm:h-24 sm:w-16 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 dark:ring-slate-700">
            <motion.div animate={controls} initial={{y: "0%"}} className="absolute inset-x-0 top-0">
                {STRIP.map((value, cell) => (
                    <div
                        key={cell}
                        className="flex h-20 items-center justify-center text-5xl font-semibold tabular-nums text-gray-900 sm:h-24 sm:text-6xl dark:text-white"
                    >
                        {value}
                    </div>
                ))}
            </motion.div>
            {/* Curved glass: darker at the top and bottom edges. */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/10 dark:from-black/40 dark:to-black/40"/>
        </div>
    );
};

const randomTicket = () => Array.from({length: REEL_COUNT}, () => Math.floor(Math.random() * 10));

// A giveaway draw. Four reels spin and stop one after another on the winning ticket number.
const SlotReels = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const [digits, setDigits] = useState<number[]>([0, 0, 0, 0]);
    const [spinId, setSpinId] = useState(0);
    const [stopped, setStopped] = useState(REEL_COUNT);
    const [winner, setWinner] = useState<Entrant | null>(null);
    const [drawCount, setDrawCount] = useState(0);
    const spinning = stopped < REEL_COUNT;

    const draw = () => {
        if (spinning) return;
        setWinner(null);
        setDigits(randomTicket());
        setStopped(0);
        setSpinId((value) => value + 1);
    };

    const handleStop = () => setStopped((value) => value + 1);

    // Once the last reel stops, reveal who holds the ticket.
    useEffect(() => {
        if (spinId === 0 || stopped !== REEL_COUNT) return;
        setWinner(entrants[Math.floor(Math.random() * entrants.length)]);
        setDrawCount((count) => count + 1);
    }, [spinId, stopped]);

    const ticket = digits.join("");

    return (
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 text-center shadow-xl shadow-gray-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">Spring giveaway</p>
            <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Draw the winning ticket</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">2,418 entries, one pair of studio headphones.</p>

            <div className="relative mx-auto mt-7 w-fit rounded-2xl bg-gray-900 p-2.5 shadow-lg dark:bg-black">
                <div className="flex gap-2" aria-hidden="true">
                    {digits.map((digit, index) => (
                        <Reel key={index} digit={digit} index={index} spinId={spinId} instant={reduceMotion} onStop={handleStop}/>
                    ))}
                </div>
                {/* Pay line across the middle of the reels. */}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-1 top-1/2 h-px -translate-y-1/2 bg-amber-400/60"/>
            </div>

            <div aria-live="polite" className="mt-6 min-h-[4.5rem]">
                <AnimatePresence mode="wait">
                    {winner && !spinning ? (
                        <motion.div
                            key={`${drawCount}-${ticket}`}
                            initial={{opacity: 0, y: 12, scale: 0.96}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: -8}}
                            transition={{type: "spring", stiffness: 260, damping: 22}}
                            className="mx-auto flex w-fit items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-left dark:bg-amber-500/10"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-400 text-sm font-semibold text-amber-950">
                                {winner.name.split(" ").map((part) => part[0]).join("")}
                            </span>
                            <span>
                                <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                                    Ticket {ticket} goes to {winner.name}
                                </span>
                                <span className="block text-xs text-gray-600 dark:text-slate-400">{winner.city}</span>
                            </span>
                        </motion.div>
                    ) : (
                        <motion.p
                            key="waiting"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            className="pt-4 text-sm text-gray-500 dark:text-slate-400"
                        >
                            {spinning ? "Drawing a ticket" : "Press draw to pick a winner."}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>

            <motion.button
                type="button"
                onClick={draw}
                disabled={spinning}
                whileTap={{scale: 0.97}}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
            >
                {spinning ? (
                    <motion.span
                        animate={reduceMotion ? undefined : {rotate: 360}}
                        transition={{duration: 0.8, repeat: Infinity, ease: "linear"}}
                        className="flex"
                    >
                        <LuRotateCw className="h-4 w-4" aria-hidden="true"/>
                    </motion.span>
                ) : (
                    <LuGift className="h-4 w-4" aria-hidden="true"/>
                )}
                {spinning ? "Drawing" : drawCount > 0 ? "Draw again" : "Draw a winner"}
            </motion.button>
        </div>
    );
};

export default SlotReels;
