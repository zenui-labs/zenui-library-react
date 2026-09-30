import {RubberStamp} from "./RubberStamp";

const lines = [
    {date: "14 Oct", item: "Train, London St Pancras → Rotterdam", category: "Travel", amount: 212.4},
    {date: "14 Oct", item: "Hotel Nhow, 2 nights", category: "Lodging", amount: 318.0},
    {date: "15 Oct", item: "Client dinner, De Matroos (4 guests)", category: "Meals", amount: 186.75},
    {date: "16 Oct", item: "Taxi to Rotterdam Centraal", category: "Travel", amount: 38.6},
];

const euro = (value: number) => `€${value.toLocaleString("en-GB", {minimumFractionDigits: 2})}`;
const total = lines.reduce((sum, line) => sum + line.amount, 0);

const RubberStampExample = () => (
    <RubberStamp title="Expense report · Rotterdam client visit" reference="ER-2291" approver="M. Okafor">
        <p className="text-[13px] text-stone-500 dark:text-stone-400">
            Submitted by <span className="font-medium text-stone-800 dark:text-stone-200">Marta Kowalczyk</span>, Field Sales · 17 Oct 2026
        </p>
        <table className="mt-4 w-full text-[13px]">
            <thead>
                <tr className="text-left font-mono text-[10px] uppercase tracking-[0.12em] text-stone-400">
                    <th className="pb-2 font-normal">Date</th>
                    <th className="pb-2 font-normal">Item</th>
                    <th className="pb-2 text-right font-normal">Amount</th>
                </tr>
            </thead>
            <tbody className="text-stone-700 dark:text-stone-300">
                {lines.map((line) => (
                    <tr key={line.item} className="border-t border-dashed border-stone-200 dark:border-stone-800">
                        <td className="whitespace-nowrap py-2 pr-3 font-mono text-[11px] text-stone-500 dark:text-stone-400">{line.date}</td>
                        <td className="py-2 pr-3">
                            {line.item}
                            <span className="ml-1.5 text-stone-400 dark:text-stone-500">{line.category}</span>
                        </td>
                        <td className="py-2 text-right tabular-nums">{euro(line.amount)}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr className="border-t border-stone-300 dark:border-stone-700">
                    <td colSpan={2} className="pt-2.5 font-medium text-stone-900 dark:text-stone-100">Total</td>
                    <td className="pt-2.5 text-right font-semibold tabular-nums text-stone-900 dark:text-stone-100">{euro(total)}</td>
                </tr>
            </tfoot>
        </table>
    </RubberStamp>
);

export default RubberStampExample;
