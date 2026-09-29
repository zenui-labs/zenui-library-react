import {useEffect, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuLayers, LuWifi} from "react-icons/lu";

interface WalletCard {
    id: string;
    name: string;
    last4: string;
    balance: string;
    gradient: string;
}

const cards: WalletCard[] = [
    {id: "everyday", name: "Everyday debit", last4: "4821", balance: "$2,418.60", gradient: "from-slate-800 via-slate-900 to-black"},
    {id: "travel", name: "Travel rewards", last4: "9034", balance: "$640.12", gradient: "from-sky-500 via-blue-600 to-indigo-700"},
    {id: "savings", name: "High-yield savings", last4: "1177", balance: "$18,905.00", gradient: "from-emerald-500 via-teal-600 to-cyan-700"},
    {id: "business", name: "Studio business", last4: "6650", balance: "$7,212.45", gradient: "from-rose-500 via-pink-600 to-purple-700"},
];

// True on narrow screens, where the fan needs a tighter spread to fit.
const useCompact = () => {
    const [compact, setCompact] = useState(false);
    useEffect(() => {
        const query = window.matchMedia("(max-width: 639px)");
        const update = () => setCompact(query.matches);
        update();
        query.addEventListener("change", update);
        return () => query.removeEventListener("change", update);
    }, []);
    return compact;
};

// A stacked wallet. Fan the cards out, pick one, and it moves to the top of the stack.
const CardFan = () => {
    const reduceMotion = useReducedMotion();
    const [order, setOrder] = useState<string[]>(cards.map((card) => card.id));
    const [fanned, setFanned] = useState(false);
    const selected = cards.find((card) => card.id === order[0]) ?? cards[0];
    const middle = (cards.length - 1) / 2;
    const compact = useCompact();
    const spread = compact ? {x: 30, rotate: 6, scale: 0.8} : {x: 46, rotate: 9, scale: 0.92};

    const choose = (id: string) => {
        setOrder((current) => [id, ...current.filter((item) => item !== id)]);
        setFanned(false);
    };

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6">
            <div className="relative h-56 w-full">
                {cards.map((card, cardIndex) => {
                    const depth = order.indexOf(card.id);
                    // Fanned: spread by original position so cards keep their place in the fan.
                    const offset = cardIndex - middle;
                    const target = fanned
                        ? {x: offset * spread.x, y: Math.abs(offset) * 10, rotate: offset * spread.rotate, scale: spread.scale}
                        : {x: 0, y: depth * -10, rotate: 0, scale: 1 - depth * 0.05};

                    return (
                        <motion.button
                            key={card.id}
                            type="button"
                            tabIndex={fanned ? 0 : -1}
                            aria-hidden={!fanned}
                            aria-label={`${card.name} ending in ${card.last4}`}
                            onClick={() => choose(card.id)}
                            initial={false}
                            animate={target}
                            whileHover={fanned && !reduceMotion ? {y: target.y - 18, scale: spread.scale + 0.04} : undefined}
                            whileFocus={fanned && !reduceMotion ? {y: target.y - 18, scale: spread.scale + 0.04} : undefined}
                            transition={
                                reduceMotion
                                    ? {duration: 0}
                                    : {type: "spring", stiffness: 260, damping: 24, delay: fanned ? cardIndex * 0.03 : 0}
                            }
                            style={{zIndex: fanned ? cardIndex + 1 : cards.length - depth, transformOrigin: "50% 140%"}}
                            className={`absolute left-1/2 top-8 -ml-[7.5rem] flex aspect-[1.586/1] w-[15rem] sm:-ml-[8.5rem] sm:w-[17rem] flex-col justify-between rounded-2xl bg-gradient-to-br ${card.gradient} p-5 text-left text-white shadow-xl shadow-black/20 ring-1 ring-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${fanned ? "cursor-pointer" : "pointer-events-none"}`}
                        >
                            <span className="flex items-center justify-between">
                                <span className="text-sm font-medium">{card.name}</span>
                                <LuWifi className="h-4 w-4 rotate-90 text-white/60" aria-hidden="true"/>
                            </span>
                            <span>
                                <span className="block text-[11px] uppercase tracking-widest text-white/60">Balance</span>
                                <span className="block text-xl font-semibold tabular-nums">{card.balance}</span>
                            </span>
                            <span className="flex items-center justify-between font-mono text-sm text-white/80">
                                <span>•••• {card.last4}</span>
                                <span className="flex" aria-hidden="true">
                                    <span className="h-5 w-5 rounded-full bg-white/40"/>
                                    <span className="-ml-2 h-5 w-5 rounded-full bg-white/25"/>
                                </span>
                            </span>
                        </motion.button>
                    );
                })}
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
                <p className="text-sm text-gray-500 dark:text-slate-400" aria-live="polite">
                    Paying with <span className="font-medium text-gray-900 dark:text-white">{selected.name}</span> ending in {selected.last4}
                </p>
                <button
                    type="button"
                    aria-expanded={fanned}
                    onClick={() => setFanned((value) => !value)}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                    <LuLayers className="h-4 w-4" aria-hidden="true"/>
                    {fanned ? "Close wallet" : "Choose another card"}
                </button>
            </div>
        </div>
    );
};

export default CardFan;
