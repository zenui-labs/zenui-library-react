import {useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBell, LuChevronDown, LuExternalLink, LuGitBranch, LuHash, LuGlobe, LuRotateCcw, LuSearch} from "react-icons/lu";

type Tab = "Overview" | "Deployments" | "Logs" | "Settings";
type DeployStatus = "Ready" | "Building" | "Error" | "Canceled";

interface Deployment {
    id: string;
    branch: string;
    commit: string;
    message: string;
    author: string;
    status: DeployStatus;
    env: "Production" | "Preview";
    age: string;
    duration: string;
    current?: boolean;
}

const tabs: Tab[] = ["Overview", "Deployments", "Logs", "Settings"];

const deployments: Deployment[] = [
    {id: "dpl_8fk2", branch: "main", commit: "a41c9e2", message: "Add holiday gift guide landing page", author: "Rin Sato", status: "Building", env: "Production", age: "Just now", duration: "0m 48s"},
    {id: "dpl_7mq1", branch: "main", commit: "3be07d1", message: "Fix cart total rounding for JPY", author: "Owen Hale", status: "Ready", env: "Production", age: "2h ago", duration: "1m 12s", current: true},
    {id: "dpl_6zp4", branch: "feat/wishlist", commit: "9d2f441", message: "Wishlist share sheet", author: "Rin Sato", status: "Ready", env: "Preview", age: "3h ago", duration: "1m 05s"},
    {id: "dpl_5aa9", branch: "chore/deps", commit: "c07e3a8", message: "Bump image optimizer to 4.2", author: "Dependabot", status: "Error", env: "Preview", age: "5h ago", duration: "0m 31s"},
    {id: "dpl_4hx3", branch: "feat/search", commit: "e1f9b30", message: "Typo tolerance for product search", author: "Ana Costa", status: "Canceled", env: "Preview", age: "Yesterday", duration: "0m 09s"},
];

const logs: {time: string; level: "info" | "warn" | "error"; route: string; message: string}[] = [
    {time: "14:02:11", level: "info", route: "GET /products/linen-shirt", message: "200 in 84ms, cache HIT"},
    {time: "14:02:09", level: "info", route: "POST /api/cart", message: "201 in 132ms"},
    {time: "14:01:58", level: "warn", route: "GET /search?q=gift", message: "Slow query, 1,240ms"},
    {time: "14:01:44", level: "error", route: "POST /api/checkout", message: "Payment provider timeout after 10s"},
    {time: "14:01:40", level: "info", route: "GET /", message: "200 in 41ms, cache HIT"},
    {time: "14:01:31", level: "info", route: "GET /collections/fall", message: "200 in 96ms, cache MISS"},
];

const statusStyle: Record<DeployStatus, string> = {
    Ready: "bg-emerald-500",
    Building: "bg-amber-500",
    Error: "bg-rose-500",
    Canceled: "bg-zinc-400",
};

const StatusDot = ({status}: {status: DeployStatus}) => {
    const reduce = useReducedMotion();
    return (
        <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
            {status === "Building" && !reduce && (
                <motion.span className="absolute inset-0 rounded-full bg-amber-500" animate={{scale: [1, 2.2], opacity: [0.6, 0]}} transition={{duration: 1.2, repeat: Infinity}}/>
            )}
            <span className={`relative h-2.5 w-2.5 rounded-full ${statusStyle[status]}`}/>
        </span>
    );
};

const card = "rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900";

const TopNavTabs = () => {
    const [tab, setTab] = useState<Tab>("Deployments");
    const [env, setEnv] = useState<"All" | "Production" | "Preview">("All");

    const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = tabs.indexOf(tab);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        setTab(tabs[next]);
        document.getElementById(`topnav-tab-${tabs[next]}`)?.focus();
    };

    const shown = deployments.filter((d) => env === "All" || d.env === env);

    return (
        <div className="flex h-[720px] w-full flex-col overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
            <header className="shrink-0 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-14 items-center gap-2 px-4 sm:px-6">
                    <a href="#" aria-label="Launchpad home" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-white dark:focus-visible:ring-offset-zinc-900">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white dark:text-zinc-900" aria-hidden="true"><path d="M12 3 22 20H2z" fill="currentColor"/></svg>
                    </a>
                    <span className="text-lg font-light text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
                    <button type="button" className="hidden items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex dark:hover:bg-zinc-800">
                        <span className="h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400"/> Kinfolk Goods
                        <LuChevronDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true"/>
                    </button>
                    <span className="hidden text-lg font-light text-zinc-300 sm:inline dark:text-zinc-700" aria-hidden="true">/</span>
                    <button type="button" className="flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                        <span className="truncate">storefront</span>
                        <span className="hidden rounded-full border border-zinc-200 px-1.5 text-[10px] font-medium text-zinc-500 sm:inline dark:border-zinc-700">Pro</span>
                        <LuChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" aria-hidden="true"/>
                    </button>

                    <div className="ml-auto flex items-center gap-1.5">
                        <button type="button" aria-label="Search"
                                className="flex h-8 items-center gap-2 rounded-md border border-zinc-200 px-2 text-sm text-zinc-500 outline-none hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-blue-500 md:w-52 dark:border-zinc-700 dark:hover:bg-zinc-800">
                            <LuSearch className="h-4 w-4" aria-hidden="true"/>
                            <span className="hidden md:inline">Find</span>
                            <kbd className="ml-auto hidden rounded border border-zinc-200 px-1 font-sans text-[10px] md:inline dark:border-zinc-700">F</kbd>
                        </button>
                        <button type="button" aria-label="Notifications"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                            <LuBell className="h-4 w-4"/>
                        </button>
                        <button type="button" aria-label="Account menu for Rin Sato"
                                className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"/>
                    </div>
                </div>

                <div role="tablist" aria-label="Project sections" onKeyDown={onTabKey}
                     className="flex gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
                    {tabs.map((t) => {
                        const current = t === tab;
                        return (
                            <button key={t} id={`topnav-tab-${t}`} role="tab" type="button" aria-selected={current} aria-controls="topnav-panel"
                                    tabIndex={current ? 0 : -1} onClick={() => setTab(t)}
                                    className={`relative shrink-0 px-3 pb-3 pt-2 text-sm outline-none transition-colors focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${current
                                        ? "text-zinc-900 dark:text-white"
                                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}>
                                <span className="relative z-10">{t}</span>
                                {current && (
                                    <motion.span layoutId="topnav-underline" transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                 className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-zinc-900 dark:bg-white"/>
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            <main id="topnav-panel" role="tabpanel" aria-labelledby={`topnav-tab-${tab}`} tabIndex={0}
                  className="flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={tab} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 0.15}}
                                className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
                        {tab === "Overview" && (
                            <>
                                <h1 className="text-2xl font-semibold tracking-tight">storefront</h1>
                                <div className={`${card} mt-5 grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}>
                                    <div className="relative aspect-[16/10] bg-gradient-to-br from-orange-100 to-rose-200 md:aspect-auto dark:from-orange-950 dark:to-rose-900" aria-hidden="true">
                                        <div className="absolute inset-4 rounded-lg bg-white/80 p-3 shadow dark:bg-zinc-900/80">
                                            <div className="h-2 w-16 rounded bg-zinc-300 dark:bg-zinc-700"/>
                                            <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="aspect-square rounded bg-rose-200 dark:bg-rose-900/60"/>)}</div>
                                        </div>
                                    </div>
                                    <dl className="grid grid-cols-2 gap-4 p-5 text-sm">
                                        <div className="col-span-2"><dt className="text-xs text-zinc-500">Production URL</dt><dd className="mt-1 flex items-center gap-1.5 font-medium"><LuGlobe className="h-4 w-4 text-zinc-400" aria-hidden="true"/>kinfolkgoods.com</dd></div>
                                        <div><dt className="text-xs text-zinc-500">Status</dt><dd className="mt-1 flex items-center gap-2 font-medium"><StatusDot status="Ready"/>Ready</dd></div>
                                        <div><dt className="text-xs text-zinc-500">Created</dt><dd className="mt-1 font-medium">2h ago by Owen Hale</dd></div>
                                        <div className="col-span-2"><dt className="text-xs text-zinc-500">Source</dt><dd className="mt-1 flex items-center gap-1.5 font-mono text-xs"><LuGitBranch className="h-3.5 w-3.5" aria-hidden="true"/>main <LuHash className="ml-2 h-3.5 w-3.5" aria-hidden="true"/>3be07d1 Fix cart total rounding for JPY</dd></div>
                                    </dl>
                                </div>
                            </>
                        )}

                        {tab === "Deployments" && (
                            <>
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <h1 className="text-2xl font-semibold tracking-tight">Deployments</h1>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Every push to a branch creates a deployment.</p>
                                    </div>
                                    <div role="group" aria-label="Environment" className="flex rounded-lg border border-zinc-200 bg-white p-0.5 text-sm dark:border-zinc-800 dark:bg-zinc-900">
                                        {(["All", "Production", "Preview"] as const).map((e) => (
                                            <button key={e} type="button" aria-pressed={env === e} onClick={() => setEnv(e)}
                                                    className={`rounded-md px-2.5 py-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${env === e ? "bg-zinc-100 font-medium dark:bg-zinc-800" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}>
                                                {e}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <ul className={`${card} mt-5 divide-y divide-zinc-100 dark:divide-zinc-800`}>
                                    {shown.map((d) => (
                                        <li key={d.id} className="group grid gap-2 p-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1.6fr)_auto] sm:items-center sm:gap-4">
                                            <div className="min-w-0">
                                                <p className="truncate font-mono text-sm font-medium">{d.id}</p>
                                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{d.env}{d.current ? ", current" : ""}</p>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <StatusDot status={d.status}/>
                                                <span>{d.status}</span>
                                                <span className="text-xs text-zinc-400">{d.duration}</span>
                                            </div>
                                            <div className="min-w-0 text-sm">
                                                <p className="flex items-center gap-1.5 font-mono text-xs text-zinc-600 dark:text-zinc-300"><LuGitBranch className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/><span className="truncate">{d.branch}</span></p>
                                                <p className="mt-0.5 truncate text-zinc-500 dark:text-zinc-400"><span className="font-mono text-xs">{d.commit}</span> {d.message}</p>
                                            </div>
                                            <div className="flex items-center justify-between gap-3 text-xs text-zinc-500 sm:justify-end dark:text-zinc-400">
                                                <span className="whitespace-nowrap">{d.age} by {d.author}</span>
                                                <span className="flex gap-1 opacity-100 transition-opacity sm:opacity-0 sm:group-focus-within:opacity-100 sm:group-hover:opacity-100">
                                                    <button type="button" aria-label={`Redeploy ${d.id}`} className="flex h-7 w-7 items-center justify-center rounded-md outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                                                        <LuRotateCcw className="h-3.5 w-3.5"/>
                                                    </button>
                                                    <a href="#" aria-label={`Visit ${d.id}`} className="flex h-7 w-7 items-center justify-center rounded-md outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                                                        <LuExternalLink className="h-3.5 w-3.5"/>
                                                    </a>
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {tab === "Logs" && (
                            <>
                                <h1 className="text-2xl font-semibold tracking-tight">Runtime logs</h1>
                                <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300">
                                    <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2 text-xs text-zinc-500">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"/> Live, last 15 minutes
                                    </div>
                                    <ol className="overflow-x-auto p-2 font-mono text-xs">
                                        {logs.map((l, i) => (
                                            <li key={i} className="flex gap-4 whitespace-nowrap rounded px-2 py-1.5 hover:bg-white/5">
                                                <span className="text-zinc-500">{l.time}</span>
                                                <span className={`w-10 uppercase ${l.level === "error" ? "text-rose-400" : l.level === "warn" ? "text-amber-400" : "text-sky-400"}`}>{l.level}</span>
                                                <span className="text-zinc-200">{l.route}</span>
                                                <span className="text-zinc-400">{l.message}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </>
                        )}

                        {tab === "Settings" && (
                            <>
                                <h1 className="text-2xl font-semibold tracking-tight">Project settings</h1>
                                <div className={`${card} mt-5 divide-y divide-zinc-100 dark:divide-zinc-800`}>
                                    {[
                                        {label: "Framework", value: "Next.js"},
                                        {label: "Root directory", value: "apps/storefront"},
                                        {label: "Node version", value: "22.x"},
                                        {label: "Production branch", value: "main"},
                                    ].map((row) => (
                                        <div key={row.label} className="flex items-center justify-between gap-4 p-4 text-sm">
                                            <span className="text-zinc-500 dark:text-zinc-400">{row.label}</span>
                                            <span className="font-mono text-xs">{row.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default TopNavTabs;
