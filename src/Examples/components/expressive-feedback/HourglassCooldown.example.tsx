import {HourglassCooldown} from "./HourglassCooldown";

const HourglassCooldownExample = () => (
    <div className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-950">
        <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-50">Check your phone</h3>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
            We texted a 6-digit code to <span className="font-mono tabular-nums text-stone-800 dark:text-stone-200">+44 7700 900 481</span>. It expires in 10 minutes.
        </p>
        <div className="mt-5 border-t border-stone-200 pt-5 dark:border-stone-800">
            <HourglassCooldown cooldown={15} startCoolingDown/>
        </div>
    </div>
);

export default HourglassCooldownExample;
