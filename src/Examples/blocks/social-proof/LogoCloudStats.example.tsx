import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

interface Logo {
    name: string;
    mark: ReactNode;
}

// Simple geometric marks drawn with SVG so the block has no image dependencies.
const logos: Logo[] = [
    {
        name: "Halcyon",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25"/><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>,
    },
    {
        name: "Northbeam",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M12 2 22 20H2Z" fill="currentColor"/></svg>,
    },
    {
        name: "Quillo",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor"/><rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor"/><rect x="13" y="2" width="9" height="9" rx="4.5" fill="currentColor" opacity="0.35"/></svg>,
    },
    {
        name: "Ferrox",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 4h16v4H8v4h10v4H8v4H4Z" fill="currentColor"/></svg>,
    },
    {
        name: "Arcadia",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M2 20a10 10 0 0 1 20 0h-5a5 5 0 0 0-10 0Z" fill="currentColor"/></svg>,
    },
    {
        name: "Brightline",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M3 12h18M12 3v18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
    },
    {
        name: "Parcelly",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7Z" fill="currentColor" opacity="0.3"/><path d="M12 12 21 7M12 12 3 7M12 12v10" stroke="currentColor" strokeWidth="2"/></svg>,
    },
];

interface Stat {
    value: string;
    label: string;
    detail: string;
}

const stats: Stat[] = [
    {value: "38M", label: "API calls a day", detail: "Across 14 regions"},
    {value: "99.99%", label: "Uptime", detail: "Trailing 12 months"},
    {value: "4,200", label: "Teams", detail: "From 3 to 3,000 seats"},
    {value: "140 ms", label: "Median response", detail: "Measured at the edge"},
];

const LogoRow = ({hidden = false}: {hidden?: boolean}) => (
    <ul className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={hidden || undefined}>
        {logos.map((logo) => (
            <li key={logo.name}
                className="flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-900 dark:text-slate-500 dark:hover:text-white">
                {logo.mark}
                <span className="text-lg font-semibold tracking-tight">{logo.name}</span>
            </li>
        ))}
    </ul>
);

const LogoCloudStats = () => {
    const reduceMotion = useReducedMotion();

    return (
        <section className="w-full bg-white py-16 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">
                <h2 className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                    Trusted by product and platform teams at 4,200 companies
                </h2>
            </div>

            <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
                <motion.div
                    className="flex w-max"
                    animate={reduceMotion ? undefined : {x: ["0%", "-50%"]}}
                    transition={{duration: 32, ease: "linear", repeat: Infinity}}
                >
                    <LogoRow/>
                    <LogoRow hidden/>
                </motion.div>
            </div>

            <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-8">
                <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-slate-200 md:grid-cols-4 dark:border-slate-800">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{opacity: 0, y: 12}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{delay: i * 0.08, duration: 0.5}}
                            className={`relative flex flex-col gap-1 p-6 ${i % 2 === 1 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} ${i === 2 ? "md:border-l" : ""} border-slate-200 dark:border-slate-800`}
                        >
                            <dt className="order-2 text-sm font-medium text-slate-900 dark:text-white">{stat.label}</dt>
                            <dd className="order-1 bg-gradient-to-br from-slate-900 to-slate-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl dark:from-white dark:to-slate-400">
                                {stat.value}
                            </dd>
                            <dd className="order-3 text-xs text-slate-500 dark:text-slate-400">{stat.detail}</dd>
                        </motion.div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default LogoCloudStats;
