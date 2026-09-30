import {RadialTimeRange} from "./RadialTimeRange";

const RadialTimeRangeExample = () => (
    <div className="w-full max-w-sm">
        <div className="mb-5 flex items-baseline justify-between">
            <h3 className="text-[15px] font-medium tracking-tight text-stone-900 dark:text-stone-100">Sleep schedule</h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">Sun – Thu</span>
        </div>
        <RadialTimeRange
            defaultValue={{start: 23 * 60 + 15, end: 7 * 60}}
            goal={8 * 60}
            sunrise={6 * 60 + 48}
            sunset={19 * 60 + 12}
        />
    </div>
);

export default RadialTimeRangeExample;
