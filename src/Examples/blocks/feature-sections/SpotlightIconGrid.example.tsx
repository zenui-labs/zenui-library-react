import type {PointerEvent, ReactNode} from "react";
import {motion} from "framer-motion";
import {LuArrowUpRight, LuBellRing, LuCheck, LuDatabaseBackup, LuFileText, LuFingerprint, LuGauge, LuGlobe, LuKeyRound, LuLock} from "react-icons/lu";

interface Feature {
    icon: ReactNode;
    title: string;
    body: string;
    specs: string[];
}

const features: Feature[] = [
    {
        icon: <LuLock className="h-5 w-5"/>,
        title: "Encryption everywhere",
        body: "Data is encrypted in transit and at rest, with keys you can bring and rotate.",
        specs: ["AES-256 at rest", "TLS 1.3 only", "Customer managed keys"],
    },
    {
        icon: <LuFingerprint className="h-5 w-5"/>,
        title: "Single sign-on",
        body: "Connect your identity provider and enforce SSO for every member.",
        specs: ["SAML and OIDC", "SCIM provisioning", "Just in time access"],
    },
    {
        icon: <LuFileText className="h-5 w-5"/>,
        title: "Audit log",
        body: "Every sign in, permission change and export is recorded and searchable.",
        specs: ["400 day retention", "Stream to your SIEM", "Tamper evident"],
    },
    {
        icon: <LuKeyRound className="h-5 w-5"/>,
        title: "Secrets vault",
        body: "Store API keys and tokens once and inject them at runtime.",
        specs: ["Versioned secrets", "Scoped per environment", "Automatic rotation"],
    },
    {
        icon: <LuGauge className="h-5 w-5"/>,
        title: "Rate limiting",
        body: "Protect every endpoint with limits per key, per user or per IP.",
        specs: ["Sliding window counters", "Custom 429 responses", "Burst allowances"],
    },
    {
        icon: <LuDatabaseBackup className="h-5 w-5"/>,
        title: "Point in time restore",
        body: "Roll a database back to any second in the last 30 days.",
        specs: ["Continuous backups", "Cross region copies", "Restore to a branch"],
    },
    {
        icon: <LuGlobe className="h-5 w-5"/>,
        title: "Data residency",
        body: "Pin data to the US, EU or APAC and keep it there.",
        specs: ["9 regions", "No cross border replication", "Per workspace choice"],
    },
    {
        icon: <LuBellRing className="h-5 w-5"/>,
        title: "Anomaly alerts",
        body: "Get notified when access patterns change in ways that matter.",
        specs: ["Impossible travel", "Bulk export spikes", "Slack and PagerDuty"],
    },
];

// Writes the pointer position into CSS variables, so the glow follows the cursor without React re-renders.
const trackPointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--y", `${event.clientY - rect.top}px`);
};

const FeatureCard = ({feature, index}: {feature: Feature; index: number}) => (
    <motion.li
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{delay: (index % 4) * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        onPointerMove={trackPointer}
        className="group relative overflow-hidden rounded-2xl bg-slate-200 p-px dark:bg-slate-800"
    >
        {/* Border glow: a radial gradient behind the 1px padding. */}
        <span aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              style={{background: "radial-gradient(240px circle at var(--x, 50%) var(--y, 50%), rgb(99 102 241 / 0.8), transparent 70%)"}}/>
        <div className="relative flex h-full flex-col rounded-[15px] bg-white p-5 dark:bg-slate-950">
            <span aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[15px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{background: "radial-gradient(320px circle at var(--x, 50%) var(--y, 50%), rgb(99 102 241 / 0.07), transparent 70%)"}}/>

            {/* The icon area swaps to a spec list on hover or when the card's link has focus. */}
            <div className="relative h-28 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-900">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-focus-within:-translate-y-3 group-focus-within:opacity-0 group-hover:-translate-y-3 group-hover:opacity-0">
                    <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgb(148_163_184_/_0.35)_1px,transparent_1px)] [background-size:14px_14px]"/>
                    <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30">
                        {feature.icon}
                    </span>
                </div>
                <ul className="absolute inset-0 flex translate-y-3 flex-col justify-center gap-1.5 px-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100">
                    {feature.specs.map((spec) => (
                        <li key={spec} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                            <LuCheck className="h-3.5 w-3.5 shrink-0 text-indigo-500"/> {spec}
                        </li>
                    ))}
                </ul>
            </div>

            <h3 className="relative mt-5 font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="relative mt-1.5 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{feature.body}</p>
            <a
                href="#"
                className="relative mt-4 inline-flex w-fit items-center gap-1 rounded text-sm font-medium text-indigo-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:text-indigo-400 dark:focus-visible:ring-offset-slate-950"
            >
                Read the docs <span className="sr-only">for {feature.title.toLowerCase()}</span>
                <LuArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"/>
            </a>
        </div>
    </motion.li>
);

const SpotlightIconGrid = () => (
    <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div className="max-w-xl">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Security and compliance</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        The controls your security review asks for
                    </h2>
                </div>
                <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    Bastion ships with SOC 2 Type II, ISO 27001 and HIPAA controls on every plan. Hover or tap a card to see the details.
                </p>
            </div>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, i) => <FeatureCard key={feature.title} feature={feature} index={i}/>)}
            </ul>
        </div>
    </section>
);

export default SpotlightIconGrid;
