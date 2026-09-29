import {useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCheck, LuClock, LuMessageCircle, LuRefreshCw, LuX} from "react-icons/lu";

export type Review = "approved" | "changes" | "commented" | "pending";

export interface Reviewer {
    name: string;
    review: Review;
    /** When the review happened or was requested, for example "2h ago". */
    when: string;
}

const statusStyle: Record<Review, {ring: string; badge: string; icon: IconType; label: string}> = {
    approved: {
        ring: "ring-2 ring-emerald-500 ring-offset-2 ring-offset-white dark:ring-emerald-400 dark:ring-offset-zinc-900",
        badge: "bg-emerald-500 text-white",
        icon: LuCheck,
        label: "Approved",
    },
    changes: {
        ring: "ring-2 ring-amber-500 ring-offset-2 ring-offset-white dark:ring-amber-400 dark:ring-offset-zinc-900",
        badge: "bg-amber-500 text-white",
        icon: LuX,
        label: "Requested changes",
    },
    commented: {
        ring: "ring-2 ring-sky-500 ring-offset-2 ring-offset-white dark:ring-sky-400 dark:ring-offset-zinc-900",
        badge: "bg-sky-500 text-white",
        icon: LuMessageCircle,
        label: "Commented",
    },
    pending: {
        ring: "outline-dashed outline-2 outline-offset-2 outline-zinc-300 dark:outline-zinc-600",
        badge: "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300",
        icon: LuClock,
        label: "Waiting for review",
    },
};

const gradients = ["from-rose-400 to-orange-400", "from-sky-400 to-indigo-500", "from-emerald-400 to-teal-500", "from-violet-400 to-fuchsia-500", "from-amber-400 to-rose-500"];
const gradientFor = (name: string) => gradients[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length];
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

export interface RingAvatarProps {
    reviewer: Reviewer;
    size?: "sm" | "md";
}

/** An initials avatar with a ring and a corner badge for the review state. */
export const RingAvatar = ({reviewer, size = "md"}: RingAvatarProps) => {
    const style = statusStyle[reviewer.review];
    const Icon = style.icon;
    const reduceMotion = useReducedMotion();
    const dimension = size === "sm" ? "size-8 text-[11px]" : "size-10 text-xs";

    return (
        <span className="relative inline-flex">
            <span className={`flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white transition-[box-shadow,outline-color] duration-300 ${dimension} ${gradientFor(reviewer.name)} ${style.ring}`}>
                {initials(reviewer.name)}
            </span>
            <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                    key={reviewer.review}
                    className={`absolute -bottom-1 -right-1 flex size-4 items-center justify-center rounded-full ring-2 ring-white dark:ring-zinc-900 ${style.badge}`}
                    initial={reduceMotion ? {opacity: 0} : {scale: 0, rotate: -45}}
                    animate={{scale: 1, rotate: 0, opacity: 1}}
                    exit={reduceMotion ? {opacity: 0} : {scale: 0}}
                    transition={{type: "spring", stiffness: 500, damping: 26}}
                >
                    <Icon className="size-2.5" strokeWidth={3}/>
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

export interface ReviewerRingsProps {
    /** Reviewers, when you control the list from the parent. */
    value?: Reviewer[];
    defaultValue?: Reviewer[];
    onChange?: (reviewers: Reviewer[]) => void;
    /** Called when someone asks a reviewer who requested changes to review again. */
    onRerequest?: (reviewer: Reviewer) => void;
    /** Approvals needed before the badge says the change is ready to merge. */
    requiredApprovals?: number;
    /** Small line above the title, for example a pull request number. */
    eyebrow?: string;
    title?: string;
    /** Shows a button on pending reviewers that marks them approved. Useful for demos and tests. */
    simulateApproval?: boolean;
    className?: string;
}

/** Reviewers with a colored ring and badge for each review state, plus an approvals meter. */
export const ReviewerRings = ({
    value,
    defaultValue = [],
    onChange,
    onRerequest,
    requiredApprovals = 2,
    eyebrow,
    title,
    simulateApproval = false,
    className = "",
}: ReviewerRingsProps) => {
    const [internalReviewers, setInternalReviewers] = useState<Reviewer[]>(defaultValue);
    const reviewers = value ?? internalReviewers;
    const [announcement, setAnnouncement] = useState("");
    const approvals = reviewers.filter((reviewer) => reviewer.review === "approved").length;
    const blocked = reviewers.some((reviewer) => reviewer.review === "changes");
    const ready = approvals >= requiredApprovals && !blocked;

    const update = (name: string, review: Review, when: string, message: string) => {
        const next = reviewers.map((reviewer) => (reviewer.name === name ? {...reviewer, review, when} : reviewer));
        if (value === undefined) setInternalReviewers(next);
        onChange?.(next);
        setAnnouncement(message);
    };

    return (
        <div className={`w-full max-w-md rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="p-5">
                {eyebrow && <p className="text-xs text-zinc-500 dark:text-zinc-400">{eyebrow}</p>}
                {title && <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>}

                <div className={`${eyebrow || title ? "mt-5 " : ""}flex flex-wrap items-center justify-between gap-4`}>
                    <ul className="flex gap-3" aria-label="Reviewers">
                        {reviewers.map((reviewer) => (
                            <li key={reviewer.name} className="group relative">
                                <span className="sr-only">
                                    {reviewer.name}: {statusStyle[reviewer.review].label}
                                </span>
                                <span aria-hidden>
                                    <RingAvatar reviewer={reviewer}/>
                                </span>
                                <span className="pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900" aria-hidden>
                                    {reviewer.name}, {statusStyle[reviewer.review].label.toLowerCase()}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                            ready
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20"
                                : blocked
                                    ? "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"
                                    : "bg-zinc-100 text-zinc-600 ring-zinc-500/15 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10"
                        }`}
                    >
                        {ready ? "Ready to merge" : blocked ? "Changes requested" : "In review"}
                    </span>
                </div>

                <div className="mt-5">
                    <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                        <span>Approvals</span>
                        <span className="tabular-nums">
                            {Math.min(approvals, requiredApprovals)} of {requiredApprovals} required
                        </span>
                    </div>
                    <div className="mt-1.5 grid gap-1" style={{gridTemplateColumns: `repeat(${requiredApprovals}, minmax(0, 1fr))`}} aria-hidden>
                        {Array.from({length: requiredApprovals}, (_, index) => (
                            <span key={index} className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                                <motion.span
                                    className="block h-full origin-left rounded-full bg-emerald-500"
                                    initial={false}
                                    animate={{scaleX: index < approvals ? 1 : 0}}
                                    transition={{duration: 0.4, ease: [0.16, 1, 0.3, 1]}}
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <ul className="divide-y divide-zinc-100 border-t border-zinc-100 dark:divide-white/[0.06] dark:border-white/[0.06]">
                {reviewers.map((reviewer) => (
                    <li key={reviewer.name} className="flex items-center gap-3 px-5 py-3">
                        <span aria-hidden>
                            <RingAvatar reviewer={reviewer} size="sm"/>
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm text-zinc-900 dark:text-zinc-100">{reviewer.name}</p>
                            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                {statusStyle[reviewer.review].label}, {reviewer.when}
                            </p>
                        </div>
                        {reviewer.review === "changes" && (
                            <button
                                type="button"
                                onClick={() => {
                                    update(reviewer.name, "pending", "Requested just now", `Asked ${reviewer.name} to review again`);
                                    onRerequest?.(reviewer);
                                }}
                                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
                            >
                                <LuRefreshCw className="size-3.5" aria-hidden/>
                                Re-request
                            </button>
                        )}
                        {simulateApproval && reviewer.review === "pending" && (
                            <button
                                type="button"
                                onClick={() => update(reviewer.name, "approved", "just now", `${reviewer.name} approved`)}
                                className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 dark:text-emerald-300 dark:hover:bg-emerald-400/10"
                            >
                                Simulate approval
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <p className="sr-only" aria-live="polite">
                {announcement}
            </p>
        </div>
    );
};
