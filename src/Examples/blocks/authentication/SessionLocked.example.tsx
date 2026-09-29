import {LuFileText} from "react-icons/lu";
import {SessionLocked, type SessionUser} from "./SessionLocked";

interface Budget {
    name: string;
    owner: string;
    value: string;
    change: string;
}

const user: SessionUser = {name: "Priya Nair", email: "priya.nair@harborview.com", initials: "PN"};

const budgets: Budget[] = [
    {name: "Q3 forecast", owner: "Priya Nair", value: "$1.24M", change: "+8.2%"},
    {name: "Vendor payments", owner: "Luis Ortega", value: "$318K", change: "-1.4%"},
    {name: "Payroll, September", owner: "Priya Nair", value: "$542K", change: "+0.6%"},
    {name: "Cloud spend", owner: "Wen Zhao", value: "$96K", change: "+12.9%"},
    {name: "Travel and events", owner: "Aba Mensah", value: "$41K", change: "-6.0%"},
];

// Replace with your re-authentication request. The demo accepts any password of 8 or more characters.
const checkPassword = () => new Promise<boolean>((resolve) => window.setTimeout(() => resolve(true), 900));

// The app under the lock screen. Put your own page here.
const BudgetsPage = () => (
    <>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Budgets</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                    <tr>
                        <th scope="col" className="px-4 py-2.5 font-medium">Budget</th>
                        <th scope="col" className="hidden px-4 py-2.5 font-medium sm:table-cell">Owner</th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium">Amount</th>
                        <th scope="col" className="px-4 py-2.5 text-right font-medium">Change</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {budgets.map((row) => (
                        <tr key={row.name}>
                            <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                                <span className="flex items-center gap-2"><LuFileText className="h-4 w-4 text-slate-400" aria-hidden="true"/>{row.name}</span>
                            </td>
                            <td className="hidden px-4 py-3 text-slate-500 sm:table-cell dark:text-slate-400">{row.owner}</td>
                            <td className="px-4 py-3 text-right tabular-nums text-slate-900 dark:text-white">{row.value}</td>
                            <td className={`px-4 py-3 text-right tabular-nums ${row.change.startsWith("-") ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>{row.change}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
);

const SessionLockedExample = () => (
    <SessionLocked
        user={user}
        onUnlock={checkPassword}
        message="We locked your session after 30 minutes of inactivity. Your unsaved edits to Q3 forecast are safe."
    >
        <BudgetsPage/>
    </SessionLocked>
);

export default SessionLockedExample;
