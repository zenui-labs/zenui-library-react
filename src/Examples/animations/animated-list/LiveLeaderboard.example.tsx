import {useEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, MotionConfig, useInView, useMotionValue, useTransform} from "framer-motion";
import {LuArrowDown, LuArrowUp, LuPause, LuPlay} from "react-icons/lu";

interface Rep {
    id: string;
    name: string;
    region: string;
    initials: string;
    color: string;
    total: number;
}

interface Gain {
    key: number;
    amount: number;
}

const initialReps: Rep[] = [
    {id: "ana", name: "Ana Souza", region: "São Paulo", initials: "AS", color: "from-rose-400 to-pink-500", total: 48200},
    {id: "kofi", name: "Kofi Mensah", region: "Accra", initials: "KM", color: "from-amber-400 to-orange-500", total: 45900},
    {id: "lin", name: "Lin Wei", region: "Singapore", initials: "LW", color: "from-sky-400 to-blue-500", total: 44100},
    {id: "noah", name: "Noah Fischer", region: "Berlin", initials: "NF", color: "from-emerald-400 to-teal-500", total: 41800},
    {id: "maya", name: "Maya Patel", region: "Toronto", initials: "MP", color: "from-violet-400 to-purple-500", total: 40300},
    {id: "leo", name: "Leo Martin", region: "Lyon", initials: "LM", color: "from-cyan-400 to-sky-500", total: 38700},
];

const medals = ["bg-amber-400 text-amber-950", "bg-slate-300 text-slate-800", "bg-orange-300 text-orange-950"];
const money = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;
const byTotal = (a: Rep, b: Rep) => b.total - a.total;

// Counts smoothly from the old total to the new one without re-rendering React on every frame.
const AnimatedTotal = ({value}: {value: number}) => {
    const motionValue = useMotionValue(value);
    const text = useTransform(motionValue, money);
    useEffect(() => {
        const controls = animate(motionValue, value, {duration: 0.8, ease: [0.16, 1, 0.3, 1]});
        return () => controls.stop();
    }, [motionValue, value]);
    return <motion.span>{text}</motion.span>;
};

// A sales leaderboard where new deals close every couple of seconds.
// Rows slide to their new rank, totals count up and a badge shows who moved.
const LiveLeaderboard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [paused, setPaused] = useState(false);
    const [reps, setReps] = useState<Rep[]>(() => [...initialReps].sort(byTotal));
    const [gains, setGains] = useState<Record<string, Gain>>({});
    const [moves, setMoves] = useState<Record<string, number>>({});
    const repsRef = useRef(reps);
    const gainKey = useRef(0);

    useEffect(() => {
        if (!inView || paused) return;
        const timer = window.setInterval(() => {
            const current = repsRef.current;
            // One or two reps close a deal. Lower ranks get slightly bigger deals so the order keeps changing.
            const winners = new Set<string>();
            const picks = Math.random() > 0.55 ? 2 : 1;
            while (winners.size < picks) winners.add(current[Math.floor(Math.random() * current.length)].id);

            const newGains: Record<string, Gain> = {};
            const updated = current.map((rep, rank) => {
                if (!winners.has(rep.id)) return rep;
                const amount = Math.round((1200 + Math.random() * 2600 + rank * 700) / 50) * 50;
                newGains[rep.id] = {key: ++gainKey.current, amount};
                return {...rep, total: rep.total + amount};
            });
            const sorted = [...updated].sort(byTotal);

            const newMoves: Record<string, number> = {};
            sorted.forEach((rep, rank) => {
                const before = current.findIndex((item) => item.id === rep.id);
                if (before !== rank) newMoves[rep.id] = before - rank;
            });

            repsRef.current = sorted;
            setReps(sorted);
            setGains(newGains);
            setMoves(newMoves);
        }, 2200);
        return () => window.clearInterval(timer);
    }, [inView, paused]);

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">September sales</h3>
                        <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">Closed revenue, updated as deals land</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setPaused((value) => !value)}
                        aria-pressed={paused}
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        {paused ? <LuPlay className="h-3 w-3" aria-hidden="true"/> : <LuPause className="h-3 w-3" aria-hidden="true"/>}
                        {paused ? "Paused" : "Live"}
                    </button>
                </div>

                <ol className="mt-4 flex flex-col gap-1.5" aria-label="Leaderboard">
                    {reps.map((rep, rank) => {
                        const move = moves[rep.id] ?? 0;
                        const gain = gains[rep.id];
                        return (
                            <motion.li
                                key={rep.id}
                                layout
                                transition={{type: "spring", stiffness: 300, damping: 30}}
                                className={`relative flex items-center gap-3 rounded-2xl px-2.5 py-2 ${rank === 0 ? "bg-amber-50 ring-1 ring-inset ring-amber-200/70 dark:bg-amber-400/10 dark:ring-amber-400/20" : ""}`}
                            >
                                <span
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold tabular-nums ${medals[rank] ?? "text-gray-500 dark:text-slate-400"}`}
                                >
                                    {rank + 1}
                                </span>
                                <span aria-hidden="true" className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ${rep.color}`}>
                                    {rep.initials}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="flex items-center gap-1.5 truncate text-sm font-medium text-gray-900 dark:text-white">
                                        {rep.name}
                                        <AnimatePresence>
                                            {move !== 0 && (
                                                <motion.span
                                                    key={`${rep.id}-${gain?.key ?? 0}-${move}`}
                                                    initial={{opacity: 0, scale: 0.5}}
                                                    animate={{opacity: 1, scale: 1}}
                                                    exit={{opacity: 0, scale: 0.5}}
                                                    className={`inline-flex items-center rounded-full px-1 text-[10px] font-semibold tabular-nums ${
                                                        move > 0
                                                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                                            : "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300"
                                                    }`}
                                                >
                                                    {move > 0 ? <LuArrowUp className="h-2.5 w-2.5" aria-hidden="true"/> : <LuArrowDown className="h-2.5 w-2.5" aria-hidden="true"/>}
                                                    {Math.abs(move)}
                                                    <span className="sr-only">{move > 0 ? "places up" : "places down"}</span>
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </p>
                                    <p className="truncate text-xs text-gray-500 dark:text-slate-400">{rep.region}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <p className="text-sm font-semibold tabular-nums text-gray-900 dark:text-white">
                                        <AnimatedTotal value={rep.total}/>
                                    </p>
                                    <span className="relative h-4 w-full">
                                        <AnimatePresence>
                                            {gain && (
                                                <motion.span
                                                    key={gain.key}
                                                    aria-hidden="true"
                                                    initial={{opacity: 0, y: 4}}
                                                    animate={{opacity: [0, 1, 1, 0], y: [4, 0, 0, -4]}}
                                                    transition={{duration: 1.8, times: [0, 0.15, 0.7, 1]}}
                                                    className="absolute right-0 top-0 whitespace-nowrap text-[11px] font-medium tabular-nums text-emerald-600 dark:text-emerald-400"
                                                >
                                                    +{money(gain.amount)}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </span>
                                </div>
                            </motion.li>
                        );
                    })}
                </ol>
            </div>
        </MotionConfig>
    );
};

export default LiveLeaderboard;
