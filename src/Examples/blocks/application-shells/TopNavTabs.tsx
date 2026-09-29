import {useId, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBell, LuChevronDown, LuExternalLink, LuGitBranch, LuHash, LuGlobe, LuRotateCcw, LuSearch} from "react-icons/lu";

export type TopNavTab = "Overview" | "Deployments" | "Logs" | "Settings";
export type DeployStatus = "Ready" | "Building" | "Error" | "Canceled";
export type DeployEnv = "Production" | "Preview";

export interface Deployment {
    id: string;
    branch: string;
    /** Short commit hash. */
    commit: string;
    message: string;
    author: string;
    status: DeployStatus;
    env: DeployEnv;
    /** Relative time, for example "2h ago". */
    age: string;
    duration: string;
    /** Marks the deployment serving production. The overview tab describes this one. */
    current?: boolean;
}

export interface LogLine {
    time: string;
    level: "info" | "warn" | "error";
    route: string;
    message: string;
}

export interface ProjectSetting {
    label: string;
    value: string;
}

export interface TopNavProject {
    name: string;
    /** Small badge after the project name, for example the plan. */
    badge?: string;
    /** Production domain shown on the overview tab. */
    domain: string;
}

const tabs: TopNavTab[] = ["Overview", "Deployments", "Logs", "Settings"];

const statusStyle: Record<DeployStatus, string> = {
    Ready: "bg-emerald-500",
    Building: "bg-amber-500",
    Error: "bg-rose-500",
    Canceled: "bg-zinc-400",
};

/** A colored status dot. Building pulses unless the person prefers reduced motion. */
export const StatusDot = ({status}: {status: DeployStatus}) => {
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

export interface TopNavTabsProps {
    project: TopNavProject;
    /** Team name in the first breadcrumb switcher. */
    team: string;
    /** Name of the signed in person, used for the account button label. */
    userName: string;
    deployments: Deployment[];
    logs: LogLine[];
    settings: ProjectSetting[];
    /** Current tab (controlled). */
    tab?: TopNavTab;
    defaultTab?: TopNavTab;
    onTabChange?: (tab: TopNavTab) => void;
    onRedeploy?: (deployment: Deployment) => void;
    /** Link for the visit button on each deployment. */
    getDeploymentHref?: (deployment: Deployment) => string;
    /** Product name used in the home link label. */
    brandName?: string;
    deploymentsDescription?: string;
    logsTitle?: string;
    logsCaption?: string;
    settingsTitle?: string;
    className?: string;
}

/** A project layout with breadcrumb switchers and keyboard navigable tabs for overview, deployments, logs and settings. */
export const TopNavTabs = ({
    project,
    team,
    userName,
    deployments,
    logs,
    settings,
    tab: tabProp,
    defaultTab = "Deployments",
    onTabChange,
    onRedeploy,
    getDeploymentHref = () => "#",
    brandName = "Launchpad",
    deploymentsDescription = "Every push to a branch creates a deployment.",
    logsTitle = "Runtime logs",
    logsCaption = "Live, last 15 minutes",
    settingsTitle = "Project settings",
    className = "",
}: TopNavTabsProps) => {
    const [innerTab, setInnerTab] = useState<TopNavTab>(defaultTab);
    const [env, setEnv] = useState<"All" | DeployEnv>("All");
    const tab = tabProp ?? innerTab;
    const uid = useId().replace(/:/g, "");
    const tabId = (t: TopNavTab) => `topnav-tab-${t}-${uid}`;
    const panelId = `topnav-panel-${uid}`;

    const selectTab = (t: TopNavTab) => {
        setInnerTab(t);
        onTabChange?.(t);
    };

    const onTabKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = tabs.indexOf(tab);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = tabs.length - 1;
        else return;
        event.preventDefault();
        selectTab(tabs[next]);
        document.getElementById(tabId(tabs[next]))?.focus();
    };

    const shown = deployments.filter((d) => env === "All" || d.env === env);
    const live = deployments.find((d) => d.current);

    return (
        <div className={`flex h-[720px] w-full flex-col overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white ${className}`}>
            <header className="shrink-0 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex h-14 items-center gap-2 px-4 sm:px-6">
                    <a href="#" aria-label={`${brandName} home`} className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-white dark:focus-visible:ring-offset-zinc-900">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-white dark:text-zinc-900" aria-hidden="true"><path d="M12 3 22 20H2z" fill="currentColor"/></svg>
                    </a>
                    <span className="text-lg font-light text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
                    <button type="button" className="hidden items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 sm:flex dark:hover:bg-zinc-800">
                        <span className="h-4 w-4 rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400"/> {team}
                        <LuChevronDown className="h-3.5 w-3.5 text-zinc-400" aria-hidden="true"/>
                    </button>
                    <span className="hidden text-lg font-light text-zinc-300 sm:inline dark:text-zinc-700" aria-hidden="true">/</span>
                    <button type="button" className="flex min-w-0 items-center gap-1.5 rounded-md px-1.5 py-1 text-sm font-medium outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                        <span className="truncate">{project.name}</span>
                        {project.badge && (
                            <span className="hidden rounded-full border border-zinc-200 px-1.5 text-[10px] font-medium text-zinc-500 sm:inline dark:border-zinc-700">{project.badge}</span>
                        )}
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
                        <button type="button" aria-label={`Account menu for ${userName}`}
                                className="h-8 w-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"/>
                    </div>
                </div>

                <div role="tablist" aria-label="Project sections" onKeyDown={onTabKey}
                     className="flex gap-1 overflow-x-auto px-2 [scrollbar-width:none] sm:px-4 [&::-webkit-scrollbar]:hidden">
                    {tabs.map((t) => {
                        const current = t === tab;
                        return (
                            <button key={t} id={tabId(t)} role="tab" type="button" aria-selected={current} aria-controls={panelId}
                                    tabIndex={current ? 0 : -1} onClick={() => selectTab(t)}
                                    className={`relative shrink-0 px-3 pb-3 pt-2 text-sm outline-none transition-colors focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 ${current
                                        ? "text-zinc-900 dark:text-white"
                                        : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}`}>
                                <span className="relative z-10">{t}</span>
                                {current && (
                                    <motion.span layoutId={`topnav-underline-${uid}`} transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                 className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-zinc-900 dark:bg-white"/>
                                )}
                            </button>
                        );
                    })}
                </div>
            </header>

            <main id={panelId} role="tabpanel" aria-labelledby={tabId(tab)} tabIndex={0}
                  className="flex-1 overflow-y-auto outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={tab} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 0.15}}
                                className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
                        {tab === "Overview" && (
                            <>
                                <h1 className="text-2xl font-semibold tracking-tight">{project.name}</h1>
                                <div className={`${card} mt-5 grid overflow-hidden md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]`}>
                                    <div className="relative aspect-[16/10] bg-gradient-to-br from-orange-100 to-rose-200 md:aspect-auto dark:from-orange-950 dark:to-rose-900" aria-hidden="true">
                                        <div className="absolute inset-4 rounded-lg bg-white/80 p-3 shadow dark:bg-zinc-900/80">
                                            <div className="h-2 w-16 rounded bg-zinc-300 dark:bg-zinc-700"/>
                                            <div className="mt-3 grid grid-cols-3 gap-2">{[0, 1, 2].map((i) => <div key={i} className="aspect-square rounded bg-rose-200 dark:bg-rose-900/60"/>)}</div>
                                        </div>
                                    </div>
                                    <dl className="grid grid-cols-2 gap-4 p-5 text-sm">
                                        <div className="col-span-2"><dt className="text-xs text-zinc-500">Production URL</dt><dd className="mt-1 flex items-center gap-1.5 font-medium"><LuGlobe className="h-4 w-4 text-zinc-400" aria-hidden="true"/>{project.domain}</dd></div>
                                        {live && (
                                            <>
                                                <div><dt className="text-xs text-zinc-500">Status</dt><dd className="mt-1 flex items-center gap-2 font-medium"><StatusDot status={live.status}/>{live.status}</dd></div>
                                                <div><dt className="text-xs text-zinc-500">Created</dt><dd className="mt-1 font-medium">{live.age} by {live.author}</dd></div>
                                                <div className="col-span-2"><dt className="text-xs text-zinc-500">Source</dt><dd className="mt-1 flex items-center gap-1.5 font-mono text-xs"><LuGitBranch className="h-3.5 w-3.5" aria-hidden="true"/>{live.branch} <LuHash className="ml-2 h-3.5 w-3.5" aria-hidden="true"/>{live.commit} {live.message}</dd></div>
                                            </>
                                        )}
                                    </dl>
                                </div>
                            </>
                        )}

                        {tab === "Deployments" && (
                            <>
                                <div className="flex flex-wrap items-end justify-between gap-3">
                                    <div>
                                        <h1 className="text-2xl font-semibold tracking-tight">Deployments</h1>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{deploymentsDescription}</p>
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
                                                    <button type="button" aria-label={`Redeploy ${d.id}`} onClick={() => onRedeploy?.(d)}
                                                            className="flex h-7 w-7 items-center justify-center rounded-md outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
                                                        <LuRotateCcw className="h-3.5 w-3.5"/>
                                                    </button>
                                                    <a href={getDeploymentHref(d)} aria-label={`Visit ${d.id}`} className="flex h-7 w-7 items-center justify-center rounded-md outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:hover:bg-zinc-800">
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
                                <h1 className="text-2xl font-semibold tracking-tight">{logsTitle}</h1>
                                <div className="mt-5 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300">
                                    <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-2 text-xs text-zinc-500">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true"/> {logsCaption}
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
                                <h1 className="text-2xl font-semibold tracking-tight">{settingsTitle}</h1>
                                <div className={`${card} mt-5 divide-y divide-zinc-100 dark:divide-zinc-800`}>
                                    {settings.map((row) => (
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
