import {motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuCheck, LuMinus, LuX} from "react-icons/lu";

type Support = "yes" | "partial" | "no";
type OptionId = "ledgerline" | "spreadsheets" | "erp";

interface Option {
    id: OptionId;
    name: string;
    note: string;
}

interface Row {
    capability: string;
    values: Record<OptionId, {support: Support; detail?: string}>;
}

const options: Option[] = [
    {id: "ledgerline", name: "Ledgerline", note: "Close in days"},
    {id: "spreadsheets", name: "Spreadsheets", note: "What most teams start with"},
    {id: "erp", name: "ERP add-on", note: "Bundled with your ledger"},
];

const rows: Row[] = [
    {capability: "Bank and card reconciliation", values: {ledgerline: {support: "yes", detail: "Matches 94% automatically"}, spreadsheets: {support: "no"}, erp: {support: "partial", detail: "Bank feeds only"}}},
    {capability: "Close checklist with owners", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Manual tracking"}, erp: {support: "no"}}},
    {capability: "Flux analysis with comments", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Formulas break often"}, erp: {support: "no"}}},
    {capability: "Multi-entity consolidation", values: {ledgerline: {support: "yes", detail: "Up to 400 entities"}, spreadsheets: {support: "no"}, erp: {support: "yes"}}},
    {capability: "Audit trail for every change", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "no"}, erp: {support: "yes"}}},
    {capability: "Setup time", values: {ledgerline: {support: "yes", detail: "2 weeks"}, spreadsheets: {support: "yes", detail: "None"}, erp: {support: "partial", detail: "3 to 6 months"}}},
    {capability: "Works with NetSuite, Sage and Xero", values: {ledgerline: {support: "yes"}, spreadsheets: {support: "partial", detail: "Exports only"}, erp: {support: "no", detail: "Its own ledger only"}}},
];

const labels: Record<Support, string> = {yes: "Yes", partial: "Partly", no: "No"};

const Mark = ({support, highlight}: {support: Support; highlight: boolean}) => {
    const styles: Record<Support, string> = {
        yes: highlight ? "bg-violet-600 text-white dark:bg-violet-500" : "bg-slate-900/5 text-slate-700 dark:bg-white/10 dark:text-slate-200",
        partial: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300",
        no: "bg-transparent text-slate-300 ring-1 ring-inset ring-slate-200 dark:text-slate-600 dark:ring-slate-700",
    };
    const Icon = support === "yes" ? LuCheck : support === "partial" ? LuMinus : LuX;
    return (
        <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${styles[support]}`}>
            <Icon className="h-3.5 w-3.5" aria-hidden="true"/>
            <span className="sr-only">{labels[support]}</span>
        </span>
    );
};

const UsVsAlternatives = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-violet-600 dark:text-violet-400">Why teams switch</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Ledgerline compared with the usual month-end stack
                    </h2>
                    <p className="mt-4 text-slate-600 dark:text-slate-400">
                        Spreadsheets are flexible and ERP modules are thorough. Ledgerline sits between them, so the close
                        runs on one checklist without replacing your general ledger.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto pb-2">
                    <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left">
                        <caption className="sr-only">Ledgerline compared with spreadsheets and ERP add-ons</caption>
                        <thead>
                            <tr>
                                <td className="sticky left-0 z-10 w-[34%] bg-white dark:bg-slate-950"/>
                                {options.map((option) => {
                                    const highlight = option.id === "ledgerline";
                                    return (
                                        <th key={option.id} scope="col"
                                            className={`px-4 pb-4 pt-5 align-bottom font-normal ${highlight ? "rounded-t-2xl bg-violet-50 shadow-[inset_1px_0_0_rgb(221_214_254),inset_-1px_0_0_rgb(221_214_254),inset_0_1px_0_rgb(221_214_254)] dark:bg-violet-500/10 dark:shadow-[inset_1px_0_0_rgb(139_92_246/0.3),inset_-1px_0_0_rgb(139_92_246/0.3),inset_0_1px_0_rgb(139_92_246/0.3)]" : ""}`}>
                                            <span className={`block text-base font-semibold ${highlight ? "text-violet-700 dark:text-violet-300" : "text-slate-900 dark:text-white"}`}>
                                                {option.name}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400">{option.note}</span>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, i) => (
                                <motion.tr key={row.capability}
                                           initial={reduceMotion ? false : {opacity: 0, y: 8}}
                                           whileInView={{opacity: 1, y: 0}}
                                           viewport={{once: true, margin: "-40px"}}
                                           transition={{delay: i * 0.05, duration: 0.3}}>
                                    <th scope="row"
                                        className="sticky left-0 z-10 border-t border-slate-200 bg-white py-4 pr-4 text-sm font-medium text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
                                        {row.capability}
                                    </th>
                                    {options.map((option) => {
                                        const highlight = option.id === "ledgerline";
                                        const cell = row.values[option.id];
                                        return (
                                            <td key={option.id}
                                                className={`border-t px-4 py-4 ${highlight
                                                    ? "border-violet-200 bg-violet-50 shadow-[inset_1px_0_0_rgb(221_214_254),inset_-1px_0_0_rgb(221_214_254)] dark:border-violet-500/20 dark:bg-violet-500/10 dark:shadow-[inset_1px_0_0_rgb(139_92_246/0.3),inset_-1px_0_0_rgb(139_92_246/0.3)]"
                                                    : "border-slate-200 dark:border-slate-800"}`}>
                                                <span className="flex items-center gap-2.5">
                                                    <Mark support={cell.support} highlight={highlight}/>
                                                    {cell.detail && (
                                                        <span className={`text-sm ${highlight ? "font-medium text-violet-900 dark:text-violet-200" : "text-slate-600 dark:text-slate-400"}`}>
                                                            {cell.detail}
                                                        </span>
                                                    )}
                                                </span>
                                            </td>
                                        );
                                    })}
                                </motion.tr>
                            ))}
                            <tr>
                                <td className="sticky left-0 z-10 bg-white dark:bg-slate-950"/>
                                <td className="rounded-b-2xl bg-violet-50 px-4 pb-5 pt-2 shadow-[inset_1px_0_0_rgb(221_214_254),inset_-1px_0_0_rgb(221_214_254),inset_0_-1px_0_rgb(221_214_254)] dark:bg-violet-500/10 dark:shadow-[inset_1px_0_0_rgb(139_92_246/0.3),inset_-1px_0_0_rgb(139_92_246/0.3),inset_0_-1px_0_rgb(139_92_246/0.3)]">
                                    <a href="#"
                                       className="group inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white outline-none transition-colors hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950">
                                        Book a demo
                                        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                                    </a>
                                </td>
                                <td colSpan={2}/>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-400">
                    {(["yes", "partial", "no"] as const).map((s) => (
                        <span key={s} className="inline-flex items-center gap-2">
                            <Mark support={s} highlight={false}/>
                            {s === "yes" ? "Built in" : s === "partial" ? "Possible with workarounds" : "Not available"}
                        </span>
                    ))}
                    <span className="sm:ml-auto">Based on a survey of 212 finance teams, July 2026.</span>
                </div>
            </div>
        </section>
    );
};

export default UsVsAlternatives;
