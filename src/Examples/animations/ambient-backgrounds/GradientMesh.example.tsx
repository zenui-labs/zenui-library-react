import {LuCheck} from "react-icons/lu";
import {GradientMesh} from "./GradientMesh";

const perks = ["Unlimited projects and guests", "Version history for 90 days", "Priority support from real people"];

const GradientMeshExample = () => (
    <GradientMesh>
        <div className="w-full max-w-sm rounded-3xl border border-white/60 bg-white/55 p-6 shadow-2xl shadow-rose-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/40 sm:p-8">
            <p className="text-sm font-medium text-rose-600 dark:text-rose-300">Team plan</p>
            <p className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">$12</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">per seat, monthly</span>
            </p>
            <ul className="mt-5 space-y-2.5">
                {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                            <LuCheck className="h-3 w-3" aria-hidden="true"/>
                        </span>
                        {perk}
                    </li>
                ))}
            </ul>
            <button
                type="button"
                className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:focus-visible:ring-offset-slate-900"
            >
                Start a 14-day trial
            </button>
            <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">No card needed. Cancel anytime.</p>
        </div>
    </GradientMesh>
);

export default GradientMeshExample;
