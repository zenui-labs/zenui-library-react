import {useState} from "react";
import type {MouseEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    LuArrowDownRight,
    LuArrowUpRight,
    LuTrendingUp,
    LuBell,
    LuChevronDown,
    LuInbox,
    LuLayoutDashboard,
    LuMenu,
    LuPackage,
    LuSearch,
    LuSettings,
    LuUsers,
    LuX,
} from "react-icons/lu";

interface NavItem {
    label: string;
    icon: ReactNode;
    badge?: number;
}

const nav: NavItem[] = [
    {label: "Overview", icon: <LuLayoutDashboard className="h-4 w-4"/>},
    {label: "Orders", icon: <LuInbox className="h-4 w-4"/>, badge: 12},
    {label: "Products", icon: <LuPackage className="h-4 w-4"/>},
    {label: "Customers", icon: <LuUsers className="h-4 w-4"/>},
    {label: "Reports", icon: <LuTrendingUp className="h-4 w-4"/>},
    {label: "Settings", icon: <LuSettings className="h-4 w-4"/>},
];

interface Kpi {
    label: string;
    value: string;
    change: number;
    trend: number[];
}

const kpis: Kpi[] = [
    {label: "Revenue", value: "$48,290", change: 12.4, trend: [8, 10, 9, 12, 11, 14, 16]},
    {label: "Orders", value: "1,284", change: 8.1, trend: [5, 7, 6, 8, 9, 8, 10]},
    {label: "Average order", value: "$37.61", change: -2.3, trend: [12, 11, 12, 10, 11, 10, 9]},
    {label: "Returning customers", value: "42%", change: 3.0, trend: [6, 6, 7, 7, 8, 8, 9]},
];

const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"];
const revenue: number[] = [28.4, 31.2, 44.8, 30.1, 29.6, 33.9, 35.2, 38.7, 36.4, 41.3, 43.9, 48.3];

interface Activity {
    who: string;
    what: string;
    when: string;
    color: string;
}

const activity: Activity[] = [
    {who: "Lena Fischer", what: "ordered 2 bags of Ethiopia Guji", when: "4 min ago", color: "bg-amber-500"},
    {who: "Owen Price", what: "started a monthly subscription", when: "18 min ago", color: "bg-emerald-500"},
    {who: "Sara Nunez", what: "requested a refund for order 4471", when: "1 hr ago", color: "bg-rose-500"},
    {who: "Dev Patel", what: "left a 5 star review on Colombia Huila", when: "2 hr ago", color: "bg-sky-500"},
];

const channels: {name: string; share: number}[] = [
    {name: "Online store", share: 58},
    {name: "Subscriptions", share: 27},
    {name: "Wholesale", share: 15},
];

const Sparkline = ({data, positive}: {data: number[]; positive: boolean}) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const d = data.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (data.length - 1)) * 60},${22 - ((v - min) / (max - min || 1)) * 20}`).join(" ");
    return (
        <svg viewBox="0 0 60 24" className="h-6 w-16" aria-hidden="true">
            <path d={d} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className={positive ? "stroke-emerald-500" : "stroke-rose-500"}/>
        </svg>
    );
};

const RevenueChart = () => {
    const [hover, setHover] = useState<number | null>(null);
    const width = 600;
    const height = 180;
    const max = 50;
    const x = (i: number) => (i / (revenue.length - 1)) * width;
    const y = (v: number) => height - (v / max) * (height - 10);
    const line = revenue.map((v, i) => `${i === 0 ? "M" : "L"}${x(i)},${y(v)}`).join(" ");

    const onMove = (event: MouseEvent<SVGSVGElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const ratio = (event.clientX - rect.left) / rect.width;
        setHover(Math.min(revenue.length - 1, Math.max(0, Math.round(ratio * (revenue.length - 1)))));
    };

    return (
        <div className="relative">
            <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-44 w-full cursor-crosshair"
                 onMouseMove={onMove} onMouseLeave={() => setHover(null)} role="img"
                 aria-label="Monthly revenue from October to September, rising from 28.4 to 48.3 thousand dollars">
                <defs>
                    <linearGradient id="dash-revenue" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgb(245 158 11)" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="rgb(245 158 11)" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                {[10, 20, 30, 40].map((v) => (
                    <line key={v} x1="0" x2={width} y1={y(v)} y2={y(v)} className="stroke-slate-100 dark:stroke-slate-800" vectorEffect="non-scaling-stroke"/>
                ))}
                <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#dash-revenue)"/>
                <path d={line} fill="none" strokeWidth="2.5" className="stroke-amber-500" vectorEffect="non-scaling-stroke" strokeLinejoin="round"/>
                {hover !== null && (
                    <line x1={x(hover)} x2={x(hover)} y1="0" y2={height} className="stroke-slate-300 dark:stroke-slate-600"
                          strokeDasharray="4 4" vectorEffect="non-scaling-stroke"/>
                )}
            </svg>
            {hover !== null && (
                <div className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs text-white shadow-lg dark:bg-white dark:text-slate-900"
                     style={{left: `clamp(48px, ${(hover / (revenue.length - 1)) * 100}%, calc(100% - 48px))`}}>
                    <span className="font-semibold">${revenue[hover].toFixed(1)}k</span>
                    <span className="ml-1.5 opacity-70">{months[hover]}</span>
                </div>
            )}
            <div className="mt-2 flex justify-between text-[11px] text-slate-400">
                {months.map((m, i) => <span key={m} className={i % 2 === 1 ? "hidden sm:inline" : ""}>{m}</span>)}
            </div>
        </div>
    );
};

interface SidebarProps {
    // Separate ids keep the desktop and drawer highlights from animating into each other.
    highlightId: string;
    active: string;
    onSelect: (label: string) => void;
}

const Sidebar = ({highlightId, active, onSelect}: SidebarProps) => (
    <div className="flex h-full flex-col">
        <button type="button"
                className="flex items-center gap-2.5 rounded-xl p-2 text-left outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-slate-800">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-xs font-bold text-white">HC</span>
            <span className="flex-1">
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">Harbor Coffee</span>
                <span className="block text-xs text-slate-500">Growth plan</span>
            </span>
            <LuChevronDown className="h-4 w-4 text-slate-400"/>
        </button>

        <nav aria-label="Main" className="mt-6 flex-1">
            <ul className="space-y-0.5">
                {nav.map((item) => {
                    const current = item.label === active;
                    return (
                        <li key={item.label}>
                            <a href="#"
                               aria-current={current ? "page" : undefined}
                               onClick={(e) => {
                                   e.preventDefault();
                                   onSelect(item.label);
                               }}
                               className={`relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${current
                                   ? "text-slate-900 dark:text-white"
                                   : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"}`}>
                                {current && (
                                    <motion.span layoutId={highlightId} transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                 className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700"/>
                                )}
                                <span className="relative">{item.icon}</span>
                                <span className="relative flex-1">{item.label}</span>
                                {item.badge !== undefined && (
                                    <span className="relative rounded-full bg-amber-100 px-1.5 text-xs font-semibold text-amber-800 dark:bg-amber-500/20 dark:text-amber-300">
                                        {item.badge}
                                    </span>
                                )}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>

        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Monthly orders</span>
                <span className="text-slate-500">1,284 of 2,000</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-[64%] rounded-full bg-amber-500"/>
            </div>
            <a href="#" className="mt-2.5 block text-xs font-medium text-amber-700 hover:underline dark:text-amber-400">Upgrade plan</a>
        </div>
    </div>
);

const DashboardShell = () => {
    const [active, setActive] = useState("Overview");
    const [drawerOpen, setDrawerOpen] = useState(false);

    const select = (label: string) => {
        setActive(label);
        setDrawerOpen(false);
    };

    return (
        <div className="relative flex h-[720px] w-full overflow-hidden bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
            <aside className="hidden w-56 shrink-0 border-r border-slate-200 p-3 md:block dark:border-slate-800">
                <Sidebar highlightId="nav-desktop" active={active} onSelect={select}/>
            </aside>

            {/* Mobile drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div key="scrim" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                    onClick={() => setDrawerOpen(false)}
                                    className="absolute inset-0 z-20 bg-slate-900/40 backdrop-blur-sm md:hidden"/>
                        <motion.aside key="drawer" initial={{x: "-100%"}} animate={{x: 0}} exit={{x: "-100%"}}
                                      transition={{type: "spring", bounce: 0, duration: 0.35}}
                                      className="absolute inset-y-0 left-0 z-30 w-64 border-r border-slate-200 bg-slate-50 p-3 md:hidden dark:border-slate-800 dark:bg-slate-950">
                            <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close navigation"
                                    className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-slate-800">
                                <LuX className="h-4 w-4"/>
                            </button>
                            <Sidebar highlightId="nav-drawer" active={active} onSelect={select}/>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white/70 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
                    <button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open navigation"
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-500 md:hidden dark:text-slate-300 dark:hover:bg-slate-800">
                        <LuMenu className="h-5 w-5"/>
                    </button>
                    <div className="relative max-w-xs flex-1">
                        <label htmlFor="dashboard-search" className="sr-only">Search orders, products and customers</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                        <input id="dashboard-search" type="search" placeholder="Search"
                               className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-12 text-sm placeholder:text-slate-400 focus:border-amber-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-amber-500/10 dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900"/>
                        <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 px-1.5 text-[10px] text-slate-400 sm:block dark:border-slate-700">Ctrl K</kbd>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                        <button type="button" aria-label="Notifications, 3 unread"
                                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-slate-300 dark:hover:bg-slate-800">
                            <LuBell className="h-5 w-5"/>
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"/>
                        </button>
                        <button type="button" aria-label="Account menu for Maya Chen"
                                className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:focus-visible:ring-offset-slate-900">
                            MC
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Harbor Coffee / {active}</p>
                            <h1 className="mt-1 text-xl font-semibold tracking-tight">Good morning, Maya</h1>
                        </div>
                        <div>
                            <label htmlFor="dashboard-range" className="sr-only">Date range</label>
                            <select id="dashboard-range" defaultValue="30"
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                                <option value="7">Last 7 days</option>
                                <option value="30">Last 30 days</option>
                                <option value="90">Last 90 days</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {kpis.map((kpi, i) => {
                            const positive = kpi.change >= 0;
                            return (
                                <motion.div key={kpi.label}
                                            initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} transition={{delay: i * 0.05}}
                                            className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{kpi.label}</p>
                                    <div className="mt-2 flex items-end justify-between gap-2">
                                        <p className="text-2xl font-semibold tabular-nums tracking-tight">{kpi.value}</p>
                                        <Sparkline data={kpi.trend} positive={positive}/>
                                    </div>
                                    <p className={`mt-1 inline-flex items-center gap-0.5 text-xs font-medium ${positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                        {positive ? <LuArrowUpRight className="h-3.5 w-3.5"/> : <LuArrowDownRight className="h-3.5 w-3.5"/>}
                                        {positive ? "+" : ""}{kpi.change.toFixed(1)}%
                                        <span className="ml-1 font-normal text-slate-400">vs last period</span>
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>

                    <section aria-labelledby="revenue-heading" className="mt-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex items-baseline justify-between">
                            <h2 id="revenue-heading" className="text-sm font-semibold">Revenue, last 12 months</h2>
                            <p className="text-xs text-slate-500">Hover the chart for monthly totals</p>
                        </div>
                        <div className="mt-4"><RevenueChart/></div>
                    </section>

                    <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                        <section aria-labelledby="activity-heading" className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                            <h2 id="activity-heading" className="text-sm font-semibold">Recent activity</h2>
                            <ul className="mt-3 space-y-3">
                                {activity.map((item) => (
                                    <li key={item.who} className="flex gap-3 text-sm">
                                        <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${item.color}`}/>
                                        <p className="min-w-0 flex-1 text-slate-600 dark:text-slate-400">
                                            <span className="font-medium text-slate-900 dark:text-white">{item.who}</span> {item.what}
                                        </p>
                                        <span className="shrink-0 text-xs text-slate-400">{item.when}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section aria-labelledby="channels-heading" className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                            <h2 id="channels-heading" className="text-sm font-semibold">Sales by channel</h2>
                            <ul className="mt-3 space-y-3">
                                {channels.map((c) => (
                                    <li key={c.name}>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-600 dark:text-slate-400">{c.name}</span>
                                            <span className="font-medium tabular-nums">{c.share}%</span>
                                        </div>
                                        <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                            <motion.div className="h-full rounded-full bg-amber-500" initial={{width: 0}} animate={{width: `${c.share}%`}}
                                                        transition={{duration: 0.8, ease: [0.16, 1, 0.3, 1]}}/>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardShell;
