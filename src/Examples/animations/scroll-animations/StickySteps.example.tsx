import {motion} from "framer-motion";
import {LuBell, LuLandmark, LuTarget, LuTrendingUp} from "react-icons/lu";
import {StepBar, StickySteps, type StickyStep} from "./StickySteps";

const steps: StickyStep[] = [
    {
        title: "Connect your accounts",
        body: "Link checking, savings and cards from 11,000 banks. Transactions import in about a minute.",
        icon: LuLandmark,
        visual: (
            <div className="space-y-2">
                {["Chase checking", "Amex Gold", "Ally savings"].map((bank, index) => (
                    <motion.div
                        key={bank}
                        initial={{opacity: 0, x: -12}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.1 + index * 0.08}}
                        className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-900"
                    >
                        <span className="font-medium text-gray-800 dark:text-slate-200">{bank}</span>
                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">Synced</span>
                    </motion.div>
                ))}
            </div>
        ),
    },
    {
        title: "Set a budget per category",
        body: "Pick limits for the categories that matter. We suggest amounts based on the last three months.",
        icon: LuTarget,
        visual: (
            <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                <StepBar label="Groceries" value={64} className="bg-emerald-500"/>
                <StepBar label="Dining out" value={88} className="bg-amber-500"/>
                <StepBar label="Transport" value={41} className="bg-sky-500"/>
            </div>
        ),
    },
    {
        title: "Watch spending week by week",
        body: "Every purchase lands in the right category, and weekly totals show when a month starts to drift.",
        icon: LuTrendingUp,
        visual: (
            <div className="flex h-28 items-end gap-2 rounded-xl border border-gray-200 bg-white p-3 dark:border-slate-700 dark:bg-slate-900">
                {[42, 68, 51, 90, 63, 38, 74].map((height, index) => (
                    <motion.div
                        key={index}
                        initial={{scaleY: 0}}
                        animate={{scaleY: 1}}
                        transition={{delay: 0.08 + index * 0.05, type: "spring", stiffness: 260, damping: 22}}
                        style={{height: `${height}%`}}
                        className={`flex-1 origin-bottom rounded-t-md ${index === 3 ? "bg-rose-500" : "bg-violet-500/80 dark:bg-violet-400/80"}`}
                    />
                ))}
            </div>
        ),
    },
    {
        title: "Get a Sunday summary",
        body: "One short note each week: what you spent, what is left and one change worth making.",
        icon: LuBell,
        visual: (
            <motion.div
                initial={{y: -16, opacity: 0, scale: 0.96}}
                animate={{y: 0, opacity: 1, scale: 1}}
                transition={{type: "spring", stiffness: 300, damping: 24, delay: 0.1}}
                className="rounded-xl border border-gray-200 bg-white p-3 shadow-lg shadow-gray-900/5 dark:border-slate-700 dark:bg-slate-900"
            >
                <p className="text-[11px] font-medium text-gray-500 dark:text-slate-400">Ledger, now</p>
                <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">You have $412 left this month</p>
                <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-slate-400">Dining is 88% used with 9 days to go.</p>
            </motion.div>
        ),
    },
];

const StickyStepsExample = () => <StickySteps steps={steps} ariaLabel="How Ledger works, scroll through the steps"/>;

export default StickyStepsExample;
