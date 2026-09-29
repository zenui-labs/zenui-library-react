import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuEye, LuGitBranch, LuGlobe, LuInfo, LuMessageSquare, LuRocket, LuShieldCheck, LuTerminal} from "react-icons/lu";

interface Step {
    id: string;
    icon: ReactNode;
    label: string;
    title: string;
    body: string;
    stat: string;
}

const steps: Step[] = [
    {
        id: "push",
        icon: <LuGitBranch className="h-4 w-4"/>,
        label: "Push",
        title: "Every push starts a build",
        body: "Connect a repository and Stratus detects the framework, installs dependencies with a warm cache and builds on machines sized for your project.",
        stat: "Median build time of 41 seconds",
    },
    {
        id: "preview",
        icon: <LuEye className="h-4 w-4"/>,
        label: "Preview",
        title: "A live URL for every pull request",
        body: "Reviewers open the preview, pin comments to any element and see them synced back to the pull request thread.",
        stat: "Comments land in GitHub and Slack",
    },
    {
        id: "checks",
        icon: <LuShieldCheck className="h-4 w-4"/>,
        label: "Check",
        title: "Checks run before anyone merges",
        body: "Lighthouse scores, bundle size budgets and end to end tests run against the preview. A failing check blocks the merge with a clear reason.",
        stat: "Budgets set per route",
    },
    {
        id: "ship",
        icon: <LuRocket className="h-4 w-4"/>,
        label: "Ship",
        title: "Promote in one click, roll back in one more",
        body: "Shift traffic gradually from the current release to the new one and watch error rates side by side. Instant rollback keeps the last 50 builds ready.",
        stat: "Zero downtime across 35 regions",
    },
];

const buildLog: string[] = [
    "Cloning github.com/acme/storefront (main)",
    "Detected Next.js 15, Node 22",
    "Restored build cache (412 MB)",
    "Installed 1,284 packages in 6.2s",
    "Compiled 318 routes in 28.4s",
    "Uploaded 2,041 static files",
];

const PushVisual = () => (
    <div className="rounded-2xl bg-slate-950 p-4 font-mono text-[12px] leading-6 text-slate-300 ring-1 ring-white/10">
        <p className="flex items-center gap-2 text-slate-500">
            <LuTerminal className="h-3.5 w-3.5"/> build · 7f3a9c2
        </p>
        <ul className="mt-2">
            {buildLog.map((line, i) => (
                <motion.li key={line} initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.1 + i * 0.12}}>
                    <span className="text-slate-600">{String(i + 1).padStart(2, "0")}</span>{" "}
                    <span className="text-cyan-300">›</span> {line}
                </motion.li>
            ))}
        </ul>
        <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.9}}
                  className="mt-2 flex items-center gap-2 text-emerald-400">
            <LuCheck className="h-3.5 w-3.5"/> Ready in 41s
        </motion.p>
    </div>
);

const PreviewVisual = () => (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-100 px-3 py-2 dark:border-slate-800">
            <LuGlobe className="h-3.5 w-3.5 text-slate-400"/>
            <span className="truncate text-xs text-slate-500 dark:text-slate-400">storefront-git-new-checkout.stratus.app</span>
        </div>
        <div className="relative p-5">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700"/>
            <div className="mt-3 h-6 w-3/4 rounded bg-slate-900 dark:bg-slate-200"/>
            <div className="mt-4 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((n) => <div key={n} className="aspect-square rounded-xl bg-gradient-to-br from-cyan-100 to-slate-100 dark:from-cyan-500/20 dark:to-slate-800"/>)}
            </div>
            <div className="mt-4 h-9 w-32 rounded-lg bg-cyan-600"/>
            <motion.div
                initial={{scale: 0, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                transition={{delay: 0.3, type: "spring", bounce: 0.5}}
                className="absolute bottom-10 left-36 flex h-7 w-7 items-center justify-center rounded-full rounded-bl-none bg-fuchsia-500 text-[11px] font-semibold text-white shadow-lg"
            >
                JM
            </motion.div>
            <motion.div
                initial={{opacity: 0, y: 8}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.55}}
                className="absolute bottom-3 right-3 w-48 rounded-xl border border-slate-200 bg-white p-2.5 text-xs shadow-xl dark:border-slate-700 dark:bg-slate-800"
            >
                <p className="font-medium text-slate-900 dark:text-white">Jordan Mills</p>
                <p className="mt-0.5 text-slate-600 dark:text-slate-300">Can the button match the new brand teal?</p>
            </motion.div>
        </div>
    </div>
);

interface Check {
    name: string;
    result: string;
    pass: boolean;
}

const checks: Check[] = [
    {name: "Lighthouse performance", result: "98", pass: true},
    {name: "Bundle size /checkout", result: "184 kB of 200 kB", pass: true},
    {name: "Playwright, 212 tests", result: "212 passed", pass: true},
    {name: "Accessibility audit", result: "2 issues", pass: false},
];

const ChecksVisual = () => (
    <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-700 dark:bg-slate-900">
        {checks.map((check, i) => (
            <motion.li key={check.name}
                       initial={{opacity: 0, x: 12}}
                       animate={{opacity: 1, x: 0}}
                       transition={{delay: 0.08 + i * 0.1}}
                       className="flex items-center gap-3 px-4 py-3.5">
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${check.pass
                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"}`}>
                    {check.pass ? <LuCheck className="h-3.5 w-3.5"/> : <LuInfo className="h-3.5 w-3.5"/>}
                </span>
                <span className="min-w-0 flex-1 truncate text-sm text-slate-800 dark:text-slate-200">{check.name}</span>
                <span className="shrink-0 text-xs text-slate-500 dark:text-slate-400">{check.result}</span>
            </motion.li>
        ))}
    </ul>
);

const ShipVisual = () => (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Rolling out build 7f3a9c2</p>
            <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-medium text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-300">75%</span>
        </div>
        <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <motion.div className="h-full bg-cyan-500" initial={{width: "0%"}} animate={{width: "75%"}}
                        transition={{duration: 1, ease: [0.16, 1, 0.3, 1]}}/>
        </div>
        <div className="mt-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>New release</span>
            <span>Current release</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
            {[["Error rate", "0.02%", "0.03%"], ["p95 latency", "142 ms", "168 ms"]].map(([label, next, current]) => (
                <div key={label} className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{next}</p>
                    <p className="text-[11px] text-slate-400">was {current}</p>
                </div>
            ))}
        </div>
    </div>
);

const visuals: Record<string, ReactNode> = {
    push: <PushVisual/>,
    preview: <PreviewVisual/>,
    checks: <ChecksVisual/>,
    ship: <ShipVisual/>,
};

const StickyScrollFeatures = () => {
    const [active, setActive] = useState<string>(steps[0].id);
    const stepRefs = useRef<(HTMLElement | null)[]>([]);

    // The step crossing the middle band of the viewport becomes the active one.
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = (entry.target as HTMLElement).dataset.step;
                        if (id) setActive(id);
                    }
                });
            },
            {rootMargin: "-45% 0px -45% 0px"},
        );
        stepRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const activeIndex = steps.findIndex((s) => s.id === active);

    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400">From commit to customers</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        One workflow for every change you ship
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                        Scroll through what happens between git push and a release your customers see.
                    </p>
                </div>

                <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
                    <ol className="relative">
                        <span aria-hidden="true" className="absolute bottom-0 left-[15px] top-0 w-px bg-slate-200 dark:bg-slate-800"/>
                        <motion.span
                            aria-hidden="true"
                            className="absolute left-[15px] top-0 hidden w-px origin-top bg-cyan-500 lg:block"
                            style={{height: "100%"}}
                            animate={{scaleY: (activeIndex + 1) / steps.length}}
                            transition={{type: "spring", stiffness: 120, damping: 24}}
                        />
                        {steps.map((step, i) => {
                            const isActive = step.id === active;
                            return (
                                <li
                                    key={step.id}
                                    ref={(el) => {
                                        stepRefs.current[i] = el;
                                    }}
                                    data-step={step.id}
                                    aria-current={isActive ? "step" : undefined}
                                    className="relative pb-14 pl-12 last:pb-0 lg:flex lg:min-h-[60vh] lg:flex-col lg:justify-center lg:pb-0"
                                >
                                    <span className={`absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300 lg:top-1/2 lg:-translate-y-1/2 ${isActive
                                        ? "border-cyan-500 bg-cyan-500 text-white"
                                        : "border-slate-200 bg-white text-slate-400 dark:border-slate-700 dark:bg-slate-900"}`}>
                                        {step.icon}
                                    </span>
                                    <div className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "lg:opacity-40"}`}>
                                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Step {i + 1} · {step.label}
                                        </p>
                                        <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl dark:text-white">{step.title}</h3>
                                        <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">{step.body}</p>
                                        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">
                                            <LuMessageSquare className="h-4 w-4"/> {step.stat}
                                        </p>
                                    </div>
                                    {/* On small screens each step shows its own visual inline. */}
                                    <div className="mt-6 lg:hidden">{visuals[step.id]}</div>
                                </li>
                            );
                        })}
                    </ol>

                    <div className="hidden lg:block">
                        <div className="sticky top-[20vh]">
                            <div className="relative rounded-[2rem] border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-slate-100 p-6 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:from-cyan-500/10 dark:via-slate-900 dark:to-slate-950">
                                <div className="mb-4 flex gap-1.5" aria-hidden="true">
                                    {steps.map((step) => (
                                        <span key={step.id}
                                              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${step.id === active ? "bg-cyan-500" : "bg-slate-200 dark:bg-slate-700"}`}/>
                                    ))}
                                </div>
                                <div className="min-h-[300px]">
                                    <AnimatePresence mode="wait">
                                        <motion.div key={active}
                                                    initial={{opacity: 0, y: 16, scale: 0.98}}
                                                    animate={{opacity: 1, y: 0, scale: 1}}
                                                    exit={{opacity: 0, y: -16, scale: 0.98}}
                                                    transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}>
                                            {visuals[active]}
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StickyScrollFeatures;
