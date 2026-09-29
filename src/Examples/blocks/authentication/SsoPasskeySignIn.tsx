import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, FormEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuBuilding2, LuCheck, LuKeyRound, LuInfo, LuLoader} from "react-icons/lu";

export interface SsoProvider {
    /** Company name shown in the detection message. */
    org: string;
    /** Identity provider name, for example "Okta". */
    name: string;
}

export interface PersonalProvider {
    id: string;
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface SsoPasskeySignInProps {
    /** Email domains with SSO configured, keyed by domain, for example "acme.com". */
    ssoDomains: Record<string, SsoProvider>;
    /**
     * Runs the passkey ceremony and resolves with the signed in person's name. Pass the signal to
     * navigator.credentials.get so Cancel stops the prompt. Rejecting returns the button to its idle state.
     */
    onPasskey?: (signal: AbortSignal) => Promise<string>;
    /** Runs when the person continues with a detected provider. The button shows a redirecting state until it settles. */
    onSsoContinue?: (email: string, provider: SsoProvider) => Promise<void> | void;
    /** Buttons under the card for personal accounts. Pass an empty array to hide them. */
    personalProviders?: PersonalProvider[];
    onPersonalProviderSelect?: (id: string) => void;
    /** When set, a hint under the card fills in this address so people can try SSO detection. */
    hintEmail?: string;
    appName?: string;
    /** Replaces the default cube mark. */
    logo?: ReactNode;
    passwordHref?: string;
    className?: string;
}

type PasskeyState = "idle" | "waiting" | "success";

export const MicrosoftMark = ({className = "h-4 w-4"}: {className?: string}) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path fill="#F25022" d="M2 2h9.5v9.5H2z"/>
        <path fill="#7FBA00" d="M12.5 2H22v9.5h-9.5z"/>
        <path fill="#00A4EF" d="M2 12.5h9.5V22H2z"/>
        <path fill="#FFB900" d="M12.5 12.5H22V22h-9.5z"/>
    </svg>
);

export const GoogleMark = ({className = "h-4 w-4"}: {className?: string}) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2-1.9 3.2-4.7 3.2-8Z"/>
        <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6.1-4.5H2.2v2.8A11 11 0 0 0 12 23Z"/>
        <path fill="#FBBC05" d="M5.9 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8l3.7-2.8Z"/>
        <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3.1-3.1A11 11 0 0 0 2.2 7.1l3.7 2.8C6.8 7.3 9.2 5.4 12 5.4Z"/>
    </svg>
);

export const AppleMark = ({className = "h-4 w-4"}: {className?: string}) => (
    <svg viewBox="0 0 24 24" className={`fill-current ${className}`} aria-hidden="true">
        <path d="M16.4 12.6c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8-.7 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.9 2.3-1.7 2.9-.4 7.2 1.2 9.5.8 1.1 1.7 2.4 2.9 2.4 1.2 0 1.6-.8 3-.8s1.8.8 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.3-.9-2.3-3.8ZM14.2 5.7c.6-.8 1.1-1.8 1-2.9-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.8 1 .1 2.1-.5 2.7-1.3Z"/>
    </svg>
);

const defaultPersonalProviders: PersonalProvider[] = [
    {id: "google", label: "Google", icon: GoogleMark},
    {id: "microsoft", label: "Microsoft", icon: MicrosoftMark},
    {id: "apple", label: "Apple", icon: AppleMark},
];

/** A passkey button with a waiting state, plus single sign-on that detects the identity provider from the email domain. */
export const SsoPasskeySignIn = ({
    ssoDomains,
    onPasskey,
    onSsoContinue,
    personalProviders = defaultPersonalProviders,
    onPersonalProviderSelect,
    hintEmail,
    appName = "Cubic",
    logo,
    passwordHref = "#",
    className = "",
}: SsoPasskeySignInProps) => {
    const uid = useId();
    const reduce = useReducedMotion();
    const [passkey, setPasskey] = useState<PasskeyState>("idle");
    const [signedInAs, setSignedInAs] = useState("");
    const [email, setEmail] = useState("");
    const [redirecting, setRedirecting] = useState(false);
    const [touched, setTouched] = useState(false);
    const passkeyAbort = useRef<AbortController | null>(null);
    const mounted = useRef(true);

    // Stops a pending passkey prompt and skips state updates once the component is gone.
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            passkeyAbort.current?.abort();
        };
    }, []);

    const domain = email.includes("@") ? email.split("@")[1].trim().toLowerCase() : "";
    const provider = ssoDomains[domain];
    const domainLooksComplete = /^[^\s@]+\.[a-z]{2,}$/i.test(domain);

    const startPasskey = async () => {
        if (!onPasskey) return;
        const controller = new AbortController();
        passkeyAbort.current = controller;
        setPasskey("waiting");
        try {
            const name = await onPasskey(controller.signal);
            if (!mounted.current || controller.signal.aborted) return;
            setSignedInAs(name);
            setPasskey("success");
        } catch {
            if (mounted.current && !controller.signal.aborted) setPasskey("idle");
        }
    };

    const cancelPasskey = () => {
        passkeyAbort.current?.abort();
        setPasskey("idle");
    };

    const continueSso = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTouched(true);
        if (!provider) return;
        setRedirecting(true);
        try {
            await onSsoContinue?.(email.trim(), provider);
        } finally {
            if (mounted.current) setRedirecting(false);
        }
    };

    return (
        <section className={`relative flex min-h-[700px] w-full items-center justify-center overflow-hidden bg-white px-4 py-16 dark:bg-[#0b0b12] ${className}`}>
            <div aria-hidden="true" className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gradient-to-b from-violet-200/60 to-transparent blur-3xl dark:from-violet-600/20"/>

            <div className="relative w-full max-w-[400px]">
                <div className="text-center">
                    {logo ?? (
                        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M12 3 21 8v8l-9 5-9-5V8z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M12 12 21 8M12 12v9M12 12 3 8" stroke="currentColor" strokeWidth="2"/></svg>
                        </span>
                    )}
                    <h1 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">Sign in to {appName}</h1>
                    <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Use a passkey, or your company&rsquo;s single sign-on.</p>
                </div>

                <div className="mt-8 rounded-2xl border border-zinc-200 bg-white/90 p-2 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70">
                    <button type="button" onClick={passkey === "idle" ? () => void startPasskey() : undefined} aria-disabled={passkey !== "idle"}
                            aria-describedby={`${uid}-status`}
                            className="group relative flex w-full items-center gap-4 overflow-hidden rounded-xl bg-gradient-to-b from-violet-600 to-violet-700 p-4 text-left text-white outline-none transition hover:from-violet-500 hover:to-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 aria-disabled:cursor-default dark:focus-visible:ring-offset-zinc-900">
                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/25">
                            {passkey === "waiting" && !reduce && (
                                <>
                                    <motion.span className="absolute inset-0 rounded-full border border-white/60" animate={{scale: [1, 1.7], opacity: [0.8, 0]}} transition={{duration: 1.4, repeat: Infinity, ease: "easeOut"}}/>
                                    <motion.span className="absolute inset-0 rounded-full border border-white/60" animate={{scale: [1, 1.7], opacity: [0.8, 0]}} transition={{duration: 1.4, repeat: Infinity, ease: "easeOut", delay: 0.7}}/>
                                </>
                            )}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={passkey} initial={{scale: 0.6, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 0.6, opacity: 0}} transition={{duration: 0.15}}>
                                    {passkey === "success" ? <LuCheck className="h-5 w-5" aria-hidden="true"/> : <LuKeyRound className="h-5 w-5" aria-hidden="true"/>}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        <span className="min-w-0 flex-1">
                            <span className="block text-sm font-semibold">
                                {passkey === "idle" && "Sign in with a passkey"}
                                {passkey === "waiting" && "Waiting for your device"}
                                {passkey === "success" && `Signed in as ${signedInAs}`}
                            </span>
                            <span id={`${uid}-status`} className="block text-xs text-violet-100/80" aria-live="polite">
                                {passkey === "idle" && "Touch ID, Face ID, Windows Hello or a security key"}
                                {passkey === "waiting" && "Follow the prompt from your browser"}
                                {passkey === "success" && "Opening your workspace"}
                            </span>
                        </span>
                        {passkey === "idle" && <LuArrowRight className="h-4 w-4 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5" aria-hidden="true"/>}
                    </button>
                    {passkey === "waiting" && (
                        <button type="button" onClick={cancelPasskey}
                                className="mx-auto mt-2 block rounded-md px-2 py-1 text-xs font-medium text-zinc-500 outline-none hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-400 dark:hover:text-white">
                            Cancel
                        </button>
                    )}

                    <div className="flex items-center gap-3 px-3 py-4 text-[11px] font-medium uppercase tracking-wider text-zinc-400">
                        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"/>Single sign-on<span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"/>
                    </div>

                    <form onSubmit={(event) => void continueSso(event)} noValidate className="px-2 pb-2">
                        <label htmlFor={`${uid}-email`} className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Work email</label>
                        <div className="relative mt-1.5">
                            <LuBuilding2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" aria-hidden="true"/>
                            <input id={`${uid}-email`} type="email" autoComplete="username webauthn" value={email} placeholder={hintEmail ?? "you@company.com"}
                                   onChange={(e) => { setEmail(e.target.value); setTouched(false); }}
                                   aria-describedby={`${uid}-detect`}
                                   className="w-full rounded-lg border border-zinc-300 bg-white py-2.5 pl-9 pr-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white"/>
                        </div>

                        <div id={`${uid}-detect`} aria-live="polite" className="min-h-[8px]">
                            <AnimatePresence initial={false}>
                                {provider && (
                                    <motion.p key="found" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}} exit={{opacity: 0, height: 0}}
                                              className="overflow-hidden">
                                        <span className="mt-2 flex items-center gap-2 rounded-lg bg-violet-50 px-3 py-2 text-xs text-violet-800 dark:bg-violet-500/10 dark:text-violet-200">
                                            <LuCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
                                            {provider.org} signs in with {provider.name}.
                                        </span>
                                    </motion.p>
                                )}
                                {!provider && domainLooksComplete && (touched || email.length > 6) && (
                                    <motion.p key="missing" initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: "auto"}} exit={{opacity: 0, height: 0}}
                                              className="overflow-hidden">
                                        <span className="mt-2 flex items-start gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                                            <LuInfo className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true"/>
                                            <span>SSO is not set up for {domain}. <a href={passwordHref} className="font-medium underline underline-offset-2">Sign in with a password</a></span>
                                        </span>
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <button type="submit" disabled={!provider || redirecting}
                                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900">
                            {redirecting && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                            {provider ? (redirecting ? `Redirecting to ${provider.name}` : `Continue with ${provider.name}`) : "Continue with SSO"}
                        </button>
                    </form>
                </div>

                {personalProviders.length > 0 && (
                    <div className="mt-6">
                        <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">Or use a personal account</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                            {personalProviders.map(({id, label, icon: Icon}) => (
                                <button key={id} type="button" onClick={() => onPersonalProviderSelect?.(id)}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 bg-white py-2 text-xs font-medium text-zinc-700 outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800">
                                    <Icon className="h-4 w-4"/> {label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {hintEmail && (
                    <p className="mt-8 text-center text-xs text-zinc-400">
                        Try <button type="button" onClick={() => setEmail(hintEmail)} className="rounded font-mono text-zinc-600 underline decoration-dotted underline-offset-2 outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-300">{hintEmail}</button> to see SSO detection.
                    </p>
                )}
            </div>
        </section>
    );
};
