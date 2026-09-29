import {motion, useReducedMotion} from "framer-motion";
import {LuArrowDownRight, LuArrowUpRight} from "react-icons/lu";

interface Channel {
    name: string;
    current: number;
    previous: number;
    color: string;
}

const channels: Channel[] = [
    {name: "Organic search", current: 18_420, previous: 15_310, color: "bg-indigo-500"},
    {name: "Direct", current: 9_860, previous: 10_240, color: "bg-sky-500"},
    {name: "Referral", current: 6_130, previous: 4_020, color: "bg-emerald-500"},
    {name: "Paid social", current: 4_770, previous: 6_950, color: "bg-amber-500"},
    {name: "Email", current: 2_940, previous: 2_610, color: "bg-rose-500"},
];

const number = (value: number) => value.toLocaleString("en-US");

const ChannelComparison = () => {
    const reduceMotion = useReducedMotion();
    const total = channels.reduce((sum, channel) => sum + channel.current, 0);
    const previousTotal = channels.reduce((sum, channel) => sum + channel.previous, 0);
    const totalChange = ((total - previousTotal) / previousTotal) * 100;
    const max = Math.max(...channels.flatMap((channel) => [channel.current, channel.previous]));

    return (
        <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Visitors by channel</p>
                    <p className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">{number(total)}</span>
                        <span className={`text-sm font-medium tabular-nums ${totalChange >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {totalChange >= 0 ? "+" : ""}
                            {totalChange.toFixed(1)}%
                        </span>
                    </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400" aria-hidden>
                    <span className="flex items-center gap-1.5">
                        <span className="h-2 w-3 rounded-sm bg-zinc-800 dark:bg-zinc-200"/>
                        September
                    </span>
                    <span className="flex items-center gap-1.5">
                        <span className="h-3 w-0.5 rounded-full bg-zinc-400 dark:bg-zinc-500"/>
                        August
                    </span>
                </div>
            </div>

            <table className="mt-6 w-full border-separate border-spacing-y-3 text-sm">
                <caption className="sr-only">Visitors per channel in September compared with August</caption>
                <thead className="sr-only">
                    <tr>
                        <th scope="col">Channel</th>
                        <th scope="col">September</th>
                        <th scope="col">August</th>
                        <th scope="col">Change</th>
                    </tr>
                </thead>
                <tbody>
                    {channels.map((channel, index) => {
                        const change = ((channel.current - channel.previous) / channel.previous) * 100;
                        const up = change >= 0;
                        const Arrow = up ? LuArrowUpRight : LuArrowDownRight;
                        return (
                            <tr key={channel.name} className="group">
                                <th scope="row" className="w-full p-0 text-left font-normal">
                                    <div className="flex items-baseline justify-between gap-3">
                                        <span className="truncate text-zinc-700 dark:text-zinc-300">{channel.name}</span>
                                        <span className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{number(channel.current)}</span>
                                    </div>
                                    <div className="relative mt-1.5 h-2 rounded-full bg-zinc-100 dark:bg-white/[0.05]" aria-hidden>
                                        <motion.div
                                            className={`h-full origin-left rounded-full opacity-90 transition-opacity group-hover:opacity-100 ${channel.color}`}
                                            style={{width: `${(channel.current / max) * 100}%`}}
                                            initial={reduceMotion ? false : {scaleX: 0}}
                                            whileInView={{scaleX: 1}}
                                            viewport={{once: true}}
                                            transition={{duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1]}}
                                        />
                                        {/* Last month's value is a marker, so the bar reads as this month against last. */}
                                        <span
                                            className="absolute -top-1 h-4 w-0.5 -translate-x-1/2 rounded-full bg-zinc-400 ring-2 ring-white dark:bg-zinc-500 dark:ring-zinc-900"
                                            style={{left: `${(channel.previous / max) * 100}%`}}
                                        />
                                    </div>
                                </th>
                                <td className="sr-only">{number(channel.current)}</td>
                                <td className="sr-only">{number(channel.previous)}</td>
                                <td className="whitespace-nowrap p-0 pl-4 text-right align-bottom">
                                    <span
                                        className={`inline-flex w-[4.5rem] items-center justify-end gap-0.5 text-xs font-medium tabular-nums ${
                                            up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                                        }`}
                                    >
                                        <Arrow className="size-3.5" aria-hidden/>
                                        <span className="sr-only">{up ? "Up" : "Down"}</span>
                                        {Math.abs(change).toFixed(1)}%
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">September 1 to 30, compared with August</p>
        </div>
    );
};

export default ChannelComparison;
