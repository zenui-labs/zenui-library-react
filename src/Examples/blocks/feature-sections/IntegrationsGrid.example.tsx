import {useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuPlus, LuSearch} from "react-icons/lu";

type Category = "Communication" | "Data" | "Developer" | "Payments";

interface Integration {
    id: string;
    name: string;
    category: Category;
    description: string;
    initials: string;
    // Tailwind classes for the lettermark tile.
    tile: string;
    installs: string;
}

const integrations: Integration[] = [
    {id: "chatter", name: "Chatter", category: "Communication", description: "Post new orders and refunds to any channel.", initials: "Ch", tile: "from-fuchsia-500 to-pink-500", installs: "12.4k"},
    {id: "mailroom", name: "Mailroom", category: "Communication", description: "Send receipts and shipping updates from your domain.", initials: "Mr", tile: "from-sky-500 to-blue-600", installs: "8.1k"},
    {id: "ledgerly", name: "Ledgerly", category: "Payments", description: "Sync invoices and payouts to your accounting ledger.", initials: "Lg", tile: "from-emerald-500 to-teal-600", installs: "6.7k"},
    {id: "tender", name: "Tender", category: "Payments", description: "Accept cards, wallets and bank debits in 40 countries.", initials: "Td", tile: "from-indigo-500 to-violet-600", installs: "21.9k"},
    {id: "warehouse", name: "Coldstore", category: "Data", description: "Stream events to your warehouse every five minutes.", initials: "Cs", tile: "from-cyan-500 to-sky-600", installs: "3.2k"},
    {id: "sheets", name: "Gridline", category: "Data", description: "Keep a live spreadsheet of orders for your finance team.", initials: "Gl", tile: "from-lime-500 to-green-600", installs: "9.8k"},
    {id: "hooks", name: "Webhooks", category: "Developer", description: "Signed HTTP callbacks for 38 event types with replay.", initials: "Wh", tile: "from-slate-600 to-slate-800", installs: "15.3k"},
    {id: "repo", name: "Commitly", category: "Developer", description: "Link deploys to incidents and show who shipped what.", initials: "Cm", tile: "from-orange-500 to-amber-500", installs: "4.6k"},
    {id: "status", name: "Beacon", category: "Developer", description: "Publish status updates when checkout degrades.", initials: "Bc", tile: "from-rose-500 to-red-600", installs: "2.9k"},
];

const categories: ("All" | Category)[] = ["All", "Communication", "Data", "Developer", "Payments"];

const IntegrationsGrid = () => {
    const [category, setCategory] = useState<"All" | Category>("All");
    const [query, setQuery] = useState("");
    const [installed, setInstalled] = useState<Set<string>>(() => new Set(["tender", "hooks"]));

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return integrations.filter((item) =>
            (category === "All" || item.category === category) &&
            (q === "" || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)));
    }, [category, query]);

    const toggle = (id: string) => {
        setInstalled((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Integrations</h2>
                        <p className="mt-3 text-slate-600 dark:text-slate-400">
                            Connect the tools your team already uses. Each integration installs in one click and can be
                            removed at any time.
                        </p>
                    </div>
                    <div className="relative w-full md:w-64 md:shrink-0">
                        <label htmlFor="integration-search" className="sr-only">Search integrations</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                        <input
                            id="integration-search"
                            type="search"
                            value={query}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder="Search integrations"
                            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:focus:border-slate-600 dark:focus:ring-white/5"
                        />
                    </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
                    {categories.map((c) => {
                        const selected = c === category;
                        return (
                            <button key={c} type="button" aria-pressed={selected} onClick={() => setCategory(c)}
                                    className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${selected ? "text-white dark:text-slate-900" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                {selected && (
                                    <motion.span layoutId="integration-chip" className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white"
                                                 transition={{type: "spring", bounce: 0.2, duration: 0.4}}/>
                                )}
                                <span className="relative">{c}</span>
                            </button>
                        );
                    })}
                </div>

                <motion.ul layout className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <AnimatePresence initial={false}>
                        {visible.map((item) => {
                            const isInstalled = installed.has(item.id);
                            return (
                                <motion.li
                                    key={item.id}
                                    layout
                                    initial={{opacity: 0, scale: 0.96}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.96}}
                                    transition={{duration: 0.2}}
                                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
                                >
                                    <div className="flex items-start justify-between">
                                        <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-sm ${item.tile}`}>
                                            {item.initials}
                                        </span>
                                        <span className="text-xs text-slate-400">{item.installs} installs</span>
                                    </div>
                                    <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{item.name}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-500">{item.category}</p>
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
                                    <button
                                        type="button"
                                        onClick={() => toggle(item.id)}
                                        aria-label={`${isInstalled ? "Remove" : "Connect"} ${item.name}`}
                                        className={`mt-5 inline-flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-slate-400 ${isInstalled
                                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300"
                                            : "border-slate-200 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"}`}
                                    >
                                        {isInstalled ? <LuCheck className="h-4 w-4"/> : <LuPlus className="h-4 w-4"/>}
                                        {isInstalled ? "Connected" : "Connect"}
                                    </button>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </motion.ul>

                {visible.length === 0 && (
                    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
                        <p className="font-medium text-slate-900 dark:text-white">No integrations match "{query}"</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            Try another name, or <a href="#" className="font-medium text-slate-900 underline underline-offset-4 dark:text-white">request an integration</a>.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default IntegrationsGrid;
