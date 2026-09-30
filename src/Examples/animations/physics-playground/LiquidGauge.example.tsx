import {useState} from "react";
import {LuGlassWater, LuMilk, LuUndo2} from "react-icons/lu";
import {LiquidGauge} from "./LiquidGauge";

const GOAL = 2.5;

const LiquidGaugeExample = () => {
    const [log, setLog] = useState([0.33, 0.25, 0.5, 0.25, 0.25]);
    const total = Math.min(GOAL, log.reduce((sum, amount) => sum + amount, 0));
    const add = (amount: number) => setLog((entries) => [...entries, amount]);

    return (
        <div className="w-full max-w-xs rounded-2xl border border-slate-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-baseline justify-between">
                <p className="text-sm font-medium text-slate-900 dark:text-zinc-100">Water today</p>
                <p className="font-mono text-[11px] text-slate-400 dark:text-zinc-500">Tue 30 Sep</p>
            </div>
            <LiquidGauge value={total} max={GOAL} unit="L" label="Water today" precision={2} className="mt-3"/>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs font-medium">
                <button type="button" onClick={() => add(0.25)} className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-2 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
                    <LuGlassWater className="h-4 w-4" aria-hidden="true"/>
                    250 ml
                </button>
                <button type="button" onClick={() => add(0.5)} className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-2 text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900">
                    <LuMilk className="h-4 w-4" aria-hidden="true"/>
                    500 ml
                </button>
                <button type="button" onClick={() => setLog((entries) => entries.slice(0, -1))} disabled={!log.length} className="flex flex-col items-center gap-1 rounded-xl border border-slate-200 py-2 text-slate-500 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 disabled:opacity-40 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900">
                    <LuUndo2 className="h-4 w-4" aria-hidden="true"/>
                    Undo
                </button>
            </div>
        </div>
    );
};

export default LiquidGaugeExample;
