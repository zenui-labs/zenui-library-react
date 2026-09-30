import {useEffect, useId, useRef, useState} from "react";
import type {ReactNode} from "react";
import {animate, useReducedMotion} from "framer-motion";
import {LuCheck, LuUndo2, LuX} from "react-icons/lu";

export type StampDecision = "approved" | "rejected";

export interface RubberStampProps {
    title: string;
    /** Reference printed in the corner, e.g. "ER-2291". */
    reference?: string;
    /** The document the stamp lands on. */
    children: ReactNode;
    /** Name cut into the stamp, e.g. "M. Okafor". */
    approver: string;
    department?: string;
    /** Called with the decision, or with null when it is withdrawn. */
    onDecision?: (decision: StampDecision | null) => void;
    className?: string;
}

interface Impression {
    kind: StampDecision;
    date: Date;
    rotation: number;
    offsetX: number;
    offsetY: number;
    seed: number;
    settled: boolean;
}

const INK = {
    approved: "text-[#27459c] dark:text-[#9db0ff]",
    rejected: "text-[#b42318] dark:text-[#ff8f80]",
};

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * A document with Approve and Reject buttons that answer with an ink stamp. The stamp falls toward the page in
 * perspective while its shadow tightens underneath, the page gives a little on impact, and the impression it leaves
 * is roughened by SVG noise so no two look the same.
 */
export const RubberStamp = ({title, reference, children, approver, department = "Finance", onDecision, className = ""}: RubberStampProps) => {
    const uid = useId().replace(/:/g, "");
    const reduceMotion = useReducedMotion() ?? false;
    const [impression, setImpression] = useState<Impression | null>(null);
    const pageRef = useRef<HTMLDivElement>(null);
    const stampRef = useRef<HTMLDivElement>(null);
    const shadowRef = useRef<HTMLDivElement>(null);
    const inkRef = useRef<HTMLDivElement>(null);
    const decideRef = useRef<HTMLDivElement>(null);

    const stamping = impression !== null && !impression.settled;

    useEffect(() => {
        if (!impression || impression.settled) return;
        const stamp = stampRef.current;
        const shadow = shadowRef.current;
        const ink = inkRef.current;
        const page = pageRef.current;
        if (!stamp || !shadow || !ink || !page) return;
        let cancelled = false;
        const settle = () => {
            if (!cancelled) setImpression((current) => (current ? {...current, settled: true} : current));
        };

        if (reduceMotion) {
            animate(ink, {opacity: [0, 0.92]}, {duration: 0.3}).then(settle);
            return () => {
                cancelled = true;
            };
        }

        const {rotation} = impression;
        // Accelerating in: the stamp is thrown, not floated.
        const fall = {duration: 0.46, ease: [0.55, 0, 0.95, 0.45] as const};
        const run = async () => {
            await Promise.all([
                animate(stamp, {opacity: [0, 1], z: [340, 0], rotateX: [22, 0], rotateY: [-12, 0], rotate: [rotation - 14, rotation]}, fall),
                animate(shadow, {opacity: [0, 0.42], x: [44, 3], y: [60, 5], scale: [1.3, 1], filter: ["blur(22px)", "blur(3px)"]}, fall),
            ]);
            if (cancelled) return;
            // Impact: the page dips, the rubber squashes and the ink goes down wet, then dries slightly lighter.
            animate(page, {y: [0, 3, -0.6, 0], scale: [1, 0.994, 1.001, 1]}, {duration: 0.42, ease: "easeOut"});
            animate(ink, {opacity: [0, 1, 0.9], scale: [1.015, 1, 1]}, {duration: 1.4, times: [0, 0.06, 1], ease: "easeOut"});
            await animate(stamp, {scale: [1, 0.978, 1]}, {duration: 0.18, ease: "easeOut"});
            await wait(90);
            if (cancelled) return;
            await Promise.all([
                animate(stamp, {opacity: 0, z: 280, x: 46, y: -64, rotateX: -14}, {duration: 0.5, ease: [0.2, 0.7, 0.3, 1]}),
                animate(shadow, {opacity: 0, x: 60, y: 70, filter: "blur(24px)"}, {duration: 0.45, ease: [0.2, 0.7, 0.3, 1]}),
            ]);
            settle();
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [impression, reduceMotion]);

    const decide = (kind: StampDecision) => {
        const direction = kind === "approved" ? -1 : 1;
        setImpression({
            kind,
            date: new Date(),
            rotation: direction * (4 + Math.random() * 4),
            offsetX: (Math.random() - 0.5) * 22,
            offsetY: (Math.random() - 0.5) * 16,
            seed: Math.floor(Math.random() * 1000),
            settled: false,
        });
        onDecision?.(kind);
    };

    const withdraw = async () => {
        if (inkRef.current) await animate(inkRef.current, {opacity: 0, scale: 0.99}, {duration: reduceMotion ? 0.15 : 0.35});
        setImpression(null);
        onDecision?.(null);
        requestAnimationFrame(() => decideRef.current?.querySelector("button")?.focus());
    };

    const word = impression?.kind === "rejected" ? "REJECTED" : "APPROVED";
    const dateText = impression?.date.toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric"}).toUpperCase().replace(/\./g, "");
    const timeText = impression?.date.toLocaleTimeString("en-GB", {hour: "2-digit", minute: "2-digit"});
    const ink = impression ? INK[impression.kind] : "";

    return (
        <div
            ref={pageRef}
            className={`relative w-full max-w-lg rounded-xl border border-stone-200 bg-[#fbfaf7] shadow-[0_1px_2px_rgba(28,25,23,0.06),0_12px_32px_-16px_rgba(28,25,23,0.25)] dark:border-stone-800 dark:bg-stone-900 dark:shadow-none ${className}`}
        >
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-5 py-4 sm:px-6 dark:border-stone-800">
                <h3 className="text-[15px] font-semibold text-stone-900 dark:text-stone-50">{title}</h3>
                {reference && <span className="shrink-0 font-mono text-[11px] tracking-[0.12em] text-stone-500 dark:text-stone-400">{reference}</span>}
            </div>

            <div className="px-5 py-4 sm:px-6">{children}</div>

            <div className="flex min-h-[64px] flex-wrap items-center justify-end gap-2 border-t border-stone-200 px-5 py-3 sm:px-6 dark:border-stone-800">
                {impression?.settled ? (
                    <>
                        <p className="mr-auto text-[13px] text-stone-600 dark:text-stone-300">
                            {impression.kind === "approved" ? "Approved" : "Rejected"} by {approver}
                            <span className="ml-1.5 font-mono text-[11px] tabular-nums text-stone-400 dark:text-stone-500">{timeText}</span>
                        </p>
                        <button
                            type="button"
                            onClick={withdraw}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white dark:focus-visible:ring-stone-100"
                        >
                            <LuUndo2 className="h-3.5 w-3.5" aria-hidden="true"/>
                            Withdraw
                        </button>
                    </>
                ) : (
                    <div ref={decideRef} className="flex gap-2">
                        <button
                            type="button"
                            disabled={stamping}
                            onClick={() => decide("rejected")}
                            className="flex items-center gap-1.5 rounded-lg border border-stone-300 px-3.5 py-2 text-[13px] font-medium text-stone-700 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:opacity-50 dark:border-stone-700 dark:text-stone-200 dark:hover:border-red-900 dark:hover:bg-red-950/40 dark:hover:text-red-300 dark:focus-visible:ring-offset-stone-900"
                        >
                            <LuX className="h-3.5 w-3.5" aria-hidden="true"/>
                            Reject
                        </button>
                        <button
                            type="button"
                            disabled={stamping}
                            onClick={() => decide("approved")}
                            className="flex items-center gap-1.5 rounded-lg bg-stone-900 px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:opacity-50 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white dark:focus-visible:ring-stone-100 dark:focus-visible:ring-offset-stone-900"
                        >
                            <LuCheck className="h-3.5 w-3.5" aria-hidden="true"/>
                            Approve
                        </button>
                    </div>
                )}
            </div>

            {impression && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-visible">
                    {/* Perspective sits on the stamp's direct parent, so the vanishing point is right over the landing spot. */}
                    <div
                        className="absolute left-1/2 top-[48%] h-0 w-0 sm:left-[60%]"
                        style={{transform: `translate(${impression.offsetX}px, ${impression.offsetY}px)`, perspective: 900}}
                    >
                        <div ref={inkRef} className={`absolute -left-[104px] -top-[46px] opacity-0 mix-blend-multiply dark:mix-blend-screen ${ink}`} style={{rotate: `${impression.rotation}deg`}}>
                            <svg width="208" height="92" viewBox="0 0 208 92">
                                <defs>
                                    <filter id={`${uid}-ink`} x="-4%" y="-8%" width="108%" height="116%">
                                        {/* Low-frequency warp roughens the edges; high-frequency speckle leaves the gaps rubber always leaves. */}
                                        <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves={2} seed={impression.seed} result="warp"/>
                                        <feDisplacementMap in="SourceGraphic" in2="warp" scale="2.8" xChannelSelector="R" yChannelSelector="G" result="rough"/>
                                        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={1} seed={impression.seed + 3} result="grain"/>
                                        <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -8 0 0 0 5.3" result="speckle"/>
                                        {/* Uneven pressure: one side of the stamp always prints lighter. */}
                                        <feTurbulence type="fractalNoise" baseFrequency="0.011 0.02" numOctaves={1} seed={impression.seed + 9} result="pressure"/>
                                        <feColorMatrix in="pressure" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.4" result="pressureMask"/>
                                        <feComposite in="speckle" in2="pressureMask" operator="arithmetic" k1="1" k2="0" k3="0" k4="0" result="inkMask"/>
                                        <feComposite in="rough" in2="inkMask" operator="in"/>
                                    </filter>
                                </defs>
                                <g filter={`url(#${uid}-ink)`} fill="currentColor" stroke="currentColor">
                                    <rect x="2.5" y="2.5" width="203" height="87" rx="7" fill="none" strokeWidth="4"/>
                                    <rect x="9" y="9" width="190" height="74" rx="3.5" fill="none" strokeWidth="1.2"/>
                                    <text x="104" y="23.5" textAnchor="middle" fontSize="8" letterSpacing="2.2" stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                                        {`${approver} · ${department}`.toUpperCase()}
                                    </text>
                                    <line x1="22" y1="29.5" x2="186" y2="29.5" strokeWidth="0.8"/>
                                    <text
                                        x="104"
                                        y="57"
                                        textAnchor="middle"
                                        fontSize="27"
                                        fontWeight="900"
                                        stroke="none"
                                        textLength="162"
                                        lengthAdjust="spacingAndGlyphs"
                                        fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
                                    >
                                        {word}
                                    </text>
                                    <line x1="22" y1="64" x2="186" y2="64" strokeWidth="0.8"/>
                                    <text x="104" y="76" textAnchor="middle" fontSize="9" letterSpacing="2.6" stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
                                        {dateText}
                                    </text>
                                </g>
                            </svg>
                        </div>

                        {!impression.settled && !reduceMotion && (
                            <>
                                <div ref={shadowRef} className="absolute -left-[114px] -top-[56px] h-[112px] w-[228px] rounded-[12px] bg-stone-950 opacity-0"/>
                                {/* The stamp from above: a walnut mount with a turned knob, lit from the top left. */}
                                <div
                                    ref={stampRef}
                                    className="absolute -left-[114px] -top-[56px] h-[112px] w-[228px] rounded-[12px] bg-gradient-to-br from-[#7a563b] via-[#5f412c] to-[#3f2a1c] opacity-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),inset_0_-2px_0_rgba(0,0,0,0.3)]"
                                    style={{transformStyle: "preserve-3d"}}
                                >
                                    <div className="absolute inset-[5px] rounded-[9px] border border-black/20"/>
                                    <div className={`absolute left-3 top-3 rounded-[3px] bg-[#f3efe6] px-1.5 py-[1px] font-mono text-[7px] font-bold tracking-[0.18em] ${impression.kind === "rejected" ? "text-[#b42318]" : "text-[#27459c]"}`}>
                                        {word}
                                    </div>
                                    <div className="absolute left-1/2 top-1/2 h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2e1e14] shadow-[0_3px_6px_rgba(0,0,0,0.45)]"/>
                                    <div className="absolute left-1/2 top-1/2 h-[62px] w-[62px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_34%_30%,#e2b184_0%,#a8744c_38%,#6b4529_75%,#4a2f1d_100%)] shadow-[inset_0_-3px_6px_rgba(0,0,0,0.35)]"/>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
            <p className="sr-only" aria-live="polite">
                {impression?.settled ? `${impression.kind === "approved" ? "Approved" : "Rejected"} by ${approver} on ${dateText}.` : ""}
            </p>
        </div>
    );
};
