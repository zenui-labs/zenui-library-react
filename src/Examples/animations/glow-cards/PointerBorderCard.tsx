import {useEffect, useRef, useState} from "react";
import type {ComponentType, PointerEvent} from "react";
import {AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuCheck, LuGitBranch, LuGitCommit, LuGlobe, LuLoader, LuRocket} from "react-icons/lu";

export type DeployStatus = "ready" | "promoting" | "live";

export interface DeployCheck {
    label: string;
    /** Result shown under the label, for example "42s" or "318 passed". */
    value: string;
}

export interface Deployment {
    /** Project or preview name, shown as the card title. */
    name: string;
    branch: string;
    /** Short commit hash. */
    commit: string;
    commitMessage: string;
    /** Preview address, shown without the protocol. */
    url: string;
    checks: DeployCheck[];
}

export interface PointerBorderCardLabels {
    eyebrow: string;
    promote: string;
    promoting: string;
    /** Announced to screen readers while promoting. */
    promotingStatus: string;
    live: string;
}

const defaultLabels: PointerBorderCardLabels = {
    eyebrow: "Preview ready",
    promote: "Promote to production",
    promoting: "Promoting",
    promotingStatus: "Promoting to production",
    live: "Live",
};

export interface PointerBorderCardProps {
    deployment: Deployment;
    /**
     * Runs when the promote button is pressed. Return a promise to keep the button in the promoting
     * state until it settles. A rejected promise returns the button to ready.
     */
    onPromote?: () => void | Promise<unknown>;
    /** Controls the button state. Leave it out to let the card track the promise from `onPromote`. */
    status?: DeployStatus;
    labels?: Partial<PointerBorderCardLabels>;
    icon?: ComponentType<{className?: string}>;
    className?: string;
}

// The bright part of the border turns to face the pointer, from anywhere in the section.
// Angles are unwrapped before the spring, so crossing from 359 to 1 degree turns 2 degrees, not 358.
export const PointerBorderCard = ({
    deployment,
    onPromote,
    status: statusProp,
    labels: labelOverrides,
    icon: Icon = LuRocket,
    className = "",
}: PointerBorderCardProps) => {
    const labels = {...defaultLabels, ...labelOverrides};
    const reduceMotion = useReducedMotion();
    const [internalStatus, setInternalStatus] = useState<DeployStatus>("ready");
    const status = statusProp ?? internalStatus;
    const mountedRef = useRef(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const angleTarget = useMotionValue(135);
    const nearness = useMotionValue(0.35);
    const angle = useSpring(angleTarget, {stiffness: 120, damping: 20});
    const glow = useSpring(nearness, {stiffness: 120, damping: 24});
    const haloOpacity = useTransform(glow, [0, 1], [0.15, 0.7]);

    const border = useMotionTemplate`conic-gradient(from ${angle}deg at 50% 50%, #a855f7 0deg, #6366f1 40deg, rgba(99,102,241,0) 110deg, rgba(99,102,241,0) 250deg, #ec4899 320deg, #a855f7 360deg)`;

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        // 0 degrees points up in a conic gradient, and the bright stop sits 20 degrees past the start.
        const raw = (Math.atan2(dy, dx) * 180) / Math.PI + 90 - 20;
        const current = angleTarget.get();
        const delta = ((((raw - current) % 360) + 540) % 360) - 180;
        angleTarget.set(current + delta);
        const distance = Math.hypot(dx, dy);
        nearness.set(Math.max(0, 1 - distance / (rect.width * 1.1)));
    };

    const promote = () => {
        if (statusProp !== undefined) {
            void onPromote?.();
            return;
        }
        setInternalStatus("promoting");
        Promise.resolve(onPromote?.()).then(
            () => {
                if (mountedRef.current) setInternalStatus("live");
            },
            () => {
                if (mountedRef.current) setInternalStatus("ready");
            },
        );
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={() => nearness.set(0.35)}
            className={`flex w-full justify-center px-2 py-10 ${className}`}
        >
            <div ref={cardRef} className="relative w-full max-w-md">
                {/* Blurred copy of the border for the halo. */}
                <motion.div
                    aria-hidden="true"
                    style={{background: border, opacity: haloOpacity}}
                    className="pointer-events-none absolute -inset-1 rounded-[28px] blur-2xl"
                />
                <motion.div style={{background: border}} className="relative rounded-3xl p-px">
                    <div className="rounded-[23px] bg-white p-6 dark:bg-slate-950">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-[0.16em] text-violet-600 dark:text-violet-400">{labels.eyebrow}</p>
                                <h3 className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">{deployment.name}</h3>
                            </div>
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 text-white shadow-lg shadow-violet-500/30">
                                <Icon className="h-5 w-5" aria-hidden="true"/>
                            </span>
                        </div>

                        <dl className="mt-5 space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                <LuGitBranch className="h-4 w-4" aria-hidden="true"/>
                                <dt className="sr-only">Branch</dt>
                                <dd className="font-mono text-xs text-gray-900 dark:text-slate-200">{deployment.branch}</dd>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                <LuGitCommit className="h-4 w-4" aria-hidden="true"/>
                                <dt className="sr-only">Commit</dt>
                                <dd><span className="font-mono text-xs text-gray-900 dark:text-slate-200">{deployment.commit}</span> {deployment.commitMessage}</dd>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
                                <LuGlobe className="h-4 w-4" aria-hidden="true"/>
                                <dt className="sr-only">Preview address</dt>
                                <dd className="truncate">{deployment.url}</dd>
                            </div>
                        </dl>

                        <ul className="mt-5 grid grid-cols-3 gap-2">
                            {deployment.checks.map((check) => (
                                <li key={check.label} className="rounded-xl border border-gray-100 bg-gray-50 px-2.5 py-2 dark:border-slate-800 dark:bg-slate-900">
                                    <span className="block text-[11px] text-gray-500 dark:text-slate-400">{check.label}</span>
                                    <span className="mt-0.5 flex items-center gap-1 whitespace-nowrap text-xs font-medium text-gray-900 sm:text-sm dark:text-white">
                                        <LuCheck className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true"/>
                                        {check.value}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <button
                            type="button"
                            onClick={promote}
                            disabled={status !== "ready"}
                            className="relative mt-6 flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-900 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:bg-gray-900 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950 dark:disabled:hover:bg-white"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={status}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    transition={{duration: 0.2}}
                                    className="flex items-center gap-2"
                                >
                                    {status === "ready" && labels.promote}
                                    {status === "promoting" && (
                                        <>
                                            <LuLoader className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true"/>
                                            {labels.promoting}
                                        </>
                                    )}
                                    {status === "live" && (
                                        <>
                                            <LuCheck className="h-4 w-4" aria-hidden="true"/>
                                            {labels.live}
                                        </>
                                    )}
                                </motion.span>
                            </AnimatePresence>
                        </button>
                        <p className="sr-only" role="status">
                            {status === "promoting" ? labels.promotingStatus : status === "live" ? labels.live : ""}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
