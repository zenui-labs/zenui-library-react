import {useEffect, useId, useRef, useState} from "react";
import type {ClipboardEvent, FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useAnimationControls, useReducedMotion} from "framer-motion";
import {LuCheck, LuKeyRound, LuLoader, LuShieldCheck, LuSmartphone} from "react-icons/lu";

export type TwoFactorMethod = "app" | "recovery";

export interface TwoFactorCodeProps {
    /**
     * Checks a code. Resolve with true when it is correct and false when it is not; a rejection counts as a
     * wrong code. `trustBrowser` is the state of the trust checkbox.
     */
    onVerify: (code: string, method: TwoFactorMethod, trustBrowser: boolean) => Promise<boolean> | boolean;
    /** Number of digit boxes. */
    length?: number;
    /** Wrong codes allowed before the form locks. */
    maxAttempts?: number;
    appName?: string;
    /** Describes this browser under the trust checkbox, for example "Chrome on macOS, San Francisco". */
    device?: string;
    /** Days a trusted browser skips the code. */
    trustDays?: number;
    defaultTrust?: boolean;
    /** Number of recovery codes people saved, used in the recovery instructions. */
    recoveryCodeCount?: number;
    lockedMessage?: string;
    /** Small print next to the method switch, for example a test code. */
    hint?: ReactNode;
    /** When set, the success view shows a button with this label that clears the form. */
    resetLabel?: string;
    className?: string;
}

type Status = "idle" | "verifying" | "error" | "success";

/** Digit inputs for a two-factor code with paste support, keyboard navigation, auto submit, an attempts counter and a recovery code fallback. */
export const TwoFactorCode = ({
    onVerify,
    length: LENGTH = 6,
    maxAttempts = 5,
    appName = "Ledgerly",
    device,
    trustDays = 30,
    defaultTrust = true,
    recoveryCodeCount = 10,
    lockedMessage = "Too many attempts. Try again in 15 minutes.",
    hint,
    resetLabel,
    className = "",
}: TwoFactorCodeProps) => {
    const uid = useId();
    const feedbackId = `${uid}-feedback`;
    const reduce = useReducedMotion();
    const shake = useAnimationControls();
    const [digits, setDigits] = useState<string[]>(() => Array<string>(LENGTH).fill(""));
    const [status, setStatus] = useState<Status>("idle");
    const [attempts, setAttempts] = useState(maxAttempts);
    const [mode, setMode] = useState<TwoFactorMethod>("app");
    const [recovery, setRecovery] = useState("");
    const [trust, setTrust] = useState(defaultTrust);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const mounted = useRef(true);

    // Skips state updates when a check finishes after the component is gone.
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    // After a wrong code, the inputs are enabled again on the next render, so focus the first one then.
    useEffect(() => {
        if (status === "error" && mode === "app") inputs.current[0]?.focus();
    }, [status, mode]);

    const verify = async (code: string) => {
        const method = mode;
        setStatus("verifying");
        let ok = false;
        try {
            ok = await onVerify(code, method, trust);
        } catch {
            ok = false;
        }
        if (!mounted.current) return;
        if (ok) {
            setStatus("success");
            return;
        }
        setStatus("error");
        setAttempts((a) => Math.max(0, a - 1));
        if (!reduce) void shake.start({x: [0, -10, 10, -6, 6, 0], transition: {duration: 0.4}});
        if (method === "app") setDigits(Array<string>(LENGTH).fill(""));
    };

    const setAt = (index: number, value: string) => {
        const next = [...digits];
        next[index] = value;
        setDigits(next);
        if (status === "error") setStatus("idle");
        if (next.every((d) => d !== "")) void verify(next.join(""));
    };

    const onInput = (index: number, raw: string) => {
        const value = raw.replace(/\D/g, "");
        if (!value) return;
        // Typing over a filled box gives two characters: keep the new one.
        if (value.length === 2 && digits[index]) {
            setAt(index, value.startsWith(digits[index]) ? value[1] : value[0]);
            if (index < LENGTH - 1) inputs.current[index + 1]?.focus();
            return;
        }
        if (value.length > 1) {
            fill(index, value);
            return;
        }
        setAt(index, value);
        if (index < LENGTH - 1) inputs.current[index + 1]?.focus();
    };

    const fill = (start: number, value: string) => {
        const next = [...digits];
        value.slice(0, LENGTH - start).split("").forEach((d, i) => { next[start + i] = d; });
        setDigits(next);
        if (status === "error") setStatus("idle");
        const firstEmpty = next.findIndex((d) => d === "");
        inputs.current[firstEmpty === -1 ? LENGTH - 1 : firstEmpty]?.focus();
        if (next.every((d) => d !== "")) void verify(next.join(""));
    };

    const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace") {
            event.preventDefault();
            if (digits[index]) setAt(index, "");
            else if (index > 0) {
                const next = [...digits];
                next[index - 1] = "";
                setDigits(next);
                inputs.current[index - 1]?.focus();
            }
        } else if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            inputs.current[index - 1]?.focus();
        } else if (event.key === "ArrowRight" && index < LENGTH - 1) {
            event.preventDefault();
            inputs.current[index + 1]?.focus();
        }
    };

    const onPaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
        const text = event.clipboardData.getData("text").replace(/\D/g, "");
        if (!text) return;
        event.preventDefault();
        fill(index, text);
    };

    const submitRecovery = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void verify(recovery.trim());
    };

    const locked = attempts === 0;
    const busy = status === "verifying" || status === "success" || locked;

    return (
        <section className={`flex min-h-[640px] w-full items-center justify-center bg-zinc-100 px-4 py-16 dark:bg-zinc-950 ${className}`}>
            <motion.div animate={shake} className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-10 dark:border-zinc-800 dark:bg-zinc-900">
                <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                        <motion.div key="done" initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} className="py-6 text-center" role="status">
                            <motion.span initial={reduce ? false : {scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 300, damping: 15}}
                                         className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                                <LuCheck className="h-7 w-7" aria-hidden="true"/>
                            </motion.span>
                            <h1 className="mt-5 text-xl font-semibold text-zinc-900 dark:text-white">You are signed in</h1>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                {trust ? `We will not ask for a code on this browser for ${trustDays} days.` : "We will ask for a code next time you sign in."}
                            </p>
                            {resetLabel && (
                                <button type="button" onClick={() => { setStatus("idle"); setDigits(Array<string>(LENGTH).fill("")); setAttempts(maxAttempts); setRecovery(""); }}
                                        className="mt-6 rounded-lg px-3 py-1.5 text-sm font-medium text-emerald-700 outline-none hover:bg-emerald-50 focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-500/10">
                                    {resetLabel}
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key={mode} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.15}}>
                            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/30">
                                {mode === "app" ? <LuSmartphone className="h-5 w-5" aria-hidden="true"/> : <LuKeyRound className="h-5 w-5" aria-hidden="true"/>}
                            </span>
                            <h1 className="mt-5 text-xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                                {mode === "app" ? "Enter your verification code" : "Use a recovery code"}
                            </h1>
                            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                                {mode === "app"
                                    ? `Open your authenticator app and enter the ${LENGTH} digit code for ${appName}.`
                                    : `Enter one of the ${recoveryCodeCount} codes you saved when you turned on two-factor authentication. Each code works once.`}
                            </p>

                            {mode === "app" ? (
                                <fieldset className="mt-7" disabled={busy}>
                                    <legend className="sr-only">{LENGTH} digit verification code</legend>
                                    <div className="flex justify-between gap-2 sm:gap-3">
                                        {digits.map((digit, i) => (
                                            <input key={i} ref={(el) => { inputs.current[i] = el; }}
                                                   value={digit}
                                                   onChange={(e) => onInput(i, e.target.value)}
                                                   onKeyDown={(e) => onKeyDown(i, e)}
                                                   onPaste={(e) => onPaste(i, e)}
                                                   onFocus={(e) => e.target.select()}
                                                   inputMode="numeric" pattern="[0-9]*" maxLength={LENGTH}
                                                   autoComplete={i === 0 ? "one-time-code" : "off"}
                                                   aria-label={`Digit ${i + 1} of ${LENGTH}`}
                                                   aria-invalid={status === "error" ? true : undefined}
                                                   aria-describedby={feedbackId}
                                                   className={`h-12 w-full min-w-0 rounded-xl border bg-zinc-50 text-center font-mono text-xl font-semibold text-zinc-900 caret-emerald-500 transition focus:bg-white focus:outline-none focus:ring-4 disabled:opacity-60 sm:h-14 sm:text-2xl dark:bg-zinc-950 dark:text-white dark:focus:bg-zinc-950 ${status === "error"
                                                       ? "border-rose-400 focus:ring-rose-500/15"
                                                       : digit
                                                           ? "border-zinc-400 focus:border-emerald-500 focus:ring-emerald-500/15 dark:border-zinc-600"
                                                           : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/15 dark:border-zinc-800"} ${i === Math.floor(LENGTH / 2) - 1 ? "mr-2 sm:mr-3" : ""}`}/>
                                        ))}
                                    </div>
                                </fieldset>
                            ) : (
                                <form onSubmit={submitRecovery} className="mt-7">
                                    <label htmlFor={`${uid}-recovery`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Recovery code</label>
                                    <input id={`${uid}-recovery`} value={recovery} onChange={(e) => { setRecovery(e.target.value); if (status === "error") setStatus("idle"); }}
                                           placeholder="a1b2-c3d4" autoComplete="off" spellCheck={false} disabled={busy}
                                           aria-invalid={status === "error" ? true : undefined}
                                           aria-describedby={feedbackId}
                                           className={`mt-1.5 w-full rounded-xl border bg-zinc-50 px-3 py-2.5 font-mono text-sm tracking-widest text-zinc-900 focus:bg-white focus:outline-none focus:ring-4 dark:bg-zinc-950 dark:text-white ${status === "error"
                                               ? "border-rose-400 focus:ring-rose-500/15"
                                               : "border-zinc-200 focus:border-emerald-500 focus:ring-emerald-500/15 dark:border-zinc-800"}`}/>
                                    <button type="submit" disabled={busy || !recovery.trim()}
                                            className="mt-4 w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900">
                                        Verify recovery code
                                    </button>
                                </form>
                            )}

                            <p id={feedbackId} role="status" aria-live="polite" className="mt-3 flex min-h-[1.25rem] items-center gap-2 text-sm">
                                {status === "verifying" && (
                                    <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400"><LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/> Checking code</span>
                                )}
                                {status === "error" && !locked && (
                                    <span className="text-rose-600 dark:text-rose-400">
                                        That code did not work. {attempts} {attempts === 1 ? "attempt" : "attempts"} left.
                                    </span>
                                )}
                                {locked && <span className="text-rose-600 dark:text-rose-400">{lockedMessage}</span>}
                            </p>

                            <label className="mt-4 flex items-start gap-3 rounded-xl border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                                <input type="checkbox" checked={trust} onChange={(e) => setTrust(e.target.checked)}
                                       className="mt-0.5 h-4 w-4 rounded accent-emerald-600"/>
                                <span>
                                    <span className="block font-medium text-zinc-800 dark:text-zinc-200">Trust this browser for {trustDays} days</span>
                                    {device && <span className="block text-zinc-500 dark:text-zinc-400">{device}</span>}
                                </span>
                            </label>

                            <div className="mt-6 flex flex-col gap-3 border-t border-zinc-100 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800">
                                <button type="button" onClick={() => { setMode(mode === "app" ? "recovery" : "app"); setStatus(locked ? "error" : "idle"); }}
                                        className="rounded text-left font-medium text-emerald-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-400">
                                    {mode === "app" ? "Use a recovery code" : "Use my authenticator app"}
                                </button>
                                {hint && (
                                    <p className="flex items-center gap-1.5 text-xs text-zinc-400">
                                        <LuShieldCheck className="h-3.5 w-3.5" aria-hidden="true"/> {hint}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};
