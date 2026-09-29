import {useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuArrowRight, LuCheck, LuCode, LuMegaphone, LuPalette, LuPlus, LuUsers, LuX} from "react-icons/lu";

type UseCase = "engineering" | "design" | "marketing" | "operations";
type TeamSize = "1" | "2-10" | "11-50" | "51+";

const useCases: {id: UseCase; label: string; hint: string; icon: ReactNode}[] = [
    {id: "engineering", label: "Engineering", hint: "Sprints, bugs and releases", icon: <LuCode className="h-5 w-5"/>},
    {id: "design", label: "Design", hint: "Reviews, specs and handoff", icon: <LuPalette className="h-5 w-5"/>},
    {id: "marketing", label: "Marketing", hint: "Campaigns and content", icon: <LuMegaphone className="h-5 w-5"/>},
    {id: "operations", label: "Operations", hint: "Hiring, IT and requests", icon: <LuUsers className="h-5 w-5"/>},
];

const sizes: TeamSize[] = ["1", "2-10", "11-50", "51+"];
const stepTitles = ["Your work", "Your workspace", "Your team"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const avatarColors = ["bg-rose-400", "bg-amber-400", "bg-emerald-400", "bg-sky-400", "bg-violet-400"];

const OnboardingSteps = () => {
    const reduce = useReducedMotion();
    const [step, setStep] = useState(0);
    const [useCase, setUseCase] = useState<UseCase | null>(null);
    const [workspace, setWorkspace] = useState("Brightline Studio");
    const [size, setSize] = useState<TeamSize | null>(null);
    const [invites, setInvites] = useState<string[]>(["jordan@brightline.studio"]);
    const [draft, setDraft] = useState("");
    const [inviteError, setInviteError] = useState<string | null>(null);
    const [finished, setFinished] = useState(false);

    const canContinue = step === 0 ? useCase !== null : step === 1 ? workspace.trim().length > 1 && size !== null : true;

    const addInvite = () => {
        const value = draft.trim().replace(/,$/, "");
        if (!value) return;
        if (!emailPattern.test(value)) {
            setInviteError(`${value} is not a valid email.`);
            return;
        }
        if (invites.includes(value)) {
            setInviteError(`${value} is already on the list.`);
            return;
        }
        setInvites((prev) => [...prev, value]);
        setDraft("");
        setInviteError(null);
    };

    const onInviteKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            addInvite();
        } else if (event.key === "Backspace" && !draft && invites.length > 0) {
            setInvites((prev) => prev.slice(0, -1));
        }
    };

    const next = () => {
        if (step < 2) setStep(step + 1);
        else setFinished(true);
    };

    const slide = reduce ? {} : {x: 20};

    return (
        <section className="flex min-h-[720px] w-full flex-col bg-white dark:bg-neutral-950">
            <header className="flex items-center justify-between gap-4 border-b border-neutral-200 px-4 py-3 sm:px-8 dark:border-neutral-800">
                <span className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500 text-white">
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M5 12h10M11 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    Relay
                </span>
                {!finished && (
                    <div className="flex flex-1 items-center justify-center gap-2" aria-label={`Step ${step + 1} of 3, ${stepTitles[step]}`} role="img">
                        {stepTitles.map((t, i) => (
                            <span key={t} className="h-1.5 w-10 overflow-hidden rounded-full bg-neutral-200 sm:w-16 dark:bg-neutral-800">
                                <motion.span className="block h-full rounded-full bg-orange-500" initial={false} animate={{width: i <= step ? "100%" : "0%"}} transition={{duration: 0.35}}/>
                            </span>
                        ))}
                    </div>
                )}
                <a href="#" className="rounded text-sm font-medium text-neutral-500 outline-none hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-400 dark:hover:text-white">
                    {finished ? "Help" : "Skip for now"}
                </a>
            </header>

            <div className="grid flex-1 lg:grid-cols-2">
                <div className="flex flex-col px-4 py-10 sm:px-12 lg:px-16">
                    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
                        <AnimatePresence mode="wait" initial={false}>
                            {finished ? (
                                <motion.div key="done" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} className="my-auto">
                                    <motion.span initial={reduce ? false : {scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 260, damping: 16}}
                                                 className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500 text-white">
                                        <LuCheck className="h-6 w-6" aria-hidden="true"/>
                                    </motion.span>
                                    <h1 className="mt-6 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">{workspace.trim()} is ready</h1>
                                    <p className="mt-3 text-neutral-600 dark:text-neutral-400">
                                        {invites.length > 0
                                            ? `We sent ${invites.length} ${invites.length === 1 ? "invite" : "invites"}. You can start a project while they join.`
                                            : "Start your first project. You can invite people any time from Settings."}
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <a href="#" className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white outline-none hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-offset-neutral-950">
                                            Open workspace <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                        </a>
                                        <button type="button" onClick={() => { setFinished(false); setStep(0); }}
                                                className="rounded-lg px-4 py-2.5 text-sm font-medium text-neutral-600 outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-neutral-300 dark:hover:bg-neutral-900">
                                            Start over
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key={step} initial={{opacity: 0, ...slide}} animate={{opacity: 1, x: 0}} exit={{opacity: 0}} transition={{duration: 0.2}}
                                            className="flex-1">
                                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Step {step + 1} of 3</p>

                                    {step === 0 && (
                                        <fieldset>
                                            <legend>
                                                <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">What will your team use Relay for?</h1>
                                            </legend>
                                            <p className="mt-3 text-neutral-600 dark:text-neutral-400">We will set up templates and views that fit. You can change this later.</p>
                                            <div className="mt-8 grid gap-3 sm:grid-cols-2">
                                                {useCases.map((u) => {
                                                    const checked = useCase === u.id;
                                                    return (
                                                        <label key={u.id}
                                                               className={`relative cursor-pointer rounded-2xl border p-4 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-500 ${checked
                                                                   ? "border-orange-500 bg-orange-50 dark:border-orange-500/70 dark:bg-orange-500/10"
                                                                   : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"}`}>
                                                            <input type="radio" name="onboarding-use-case" value={u.id} checked={checked} onChange={() => setUseCase(u.id)} className="sr-only"/>
                                                            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${checked ? "bg-orange-500 text-white" : "bg-neutral-100 text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"}`} aria-hidden="true">
                                                                {u.icon}
                                                            </span>
                                                            <span className="mt-3 block font-medium text-neutral-900 dark:text-white">{u.label}</span>
                                                            <span className="block text-sm text-neutral-500 dark:text-neutral-400">{u.hint}</span>
                                                            {checked && (
                                                                <motion.span layoutId="onboarding-check" className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white" aria-hidden="true">
                                                                    <LuCheck className="h-3 w-3"/>
                                                                </motion.span>
                                                            )}
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        </fieldset>
                                    )}

                                    {step === 1 && (
                                        <div>
                                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">Name your workspace</h1>
                                            <p className="mt-3 text-neutral-600 dark:text-neutral-400">This is usually your company or team name.</p>
                                            <label htmlFor="onboarding-workspace" className="mt-8 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Workspace name</label>
                                            <input id="onboarding-workspace" value={workspace} onChange={(e) => setWorkspace(e.target.value)} maxLength={40}
                                                   className="mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900 focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-500/10 dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"/>
                                            <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                                                relay.app/<span className="font-medium text-neutral-700 dark:text-neutral-300">{workspace.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "your-team"}</span>
                                            </p>
                                            <fieldset className="mt-8">
                                                <legend className="text-sm font-medium text-neutral-700 dark:text-neutral-300">How many people are on your team?</legend>
                                                <div className="mt-2 grid grid-cols-4 gap-1 rounded-xl bg-neutral-100 p-1 dark:bg-neutral-900">
                                                    {sizes.map((s) => (
                                                        <label key={s} className="relative cursor-pointer rounded-lg py-2 text-center text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-orange-500">
                                                            <input type="radio" name="onboarding-size" value={s} checked={size === s} onChange={() => setSize(s)} className="sr-only"/>
                                                            {size === s && (
                                                                <motion.span layoutId="onboarding-size" transition={{type: "spring", bounce: 0.15, duration: 0.35}}
                                                                             className="absolute inset-0 rounded-lg bg-white shadow-sm dark:bg-neutral-700"/>
                                                            )}
                                                            <span className={`relative ${size === s ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400"}`}>{s}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </fieldset>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div>
                                            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">Invite your teammates</h1>
                                            <p className="mt-3 text-neutral-600 dark:text-neutral-400">Relay works best with your team. They will get an email to join {workspace.trim()}.</p>
                                            <label htmlFor="onboarding-invite" className="mt-8 block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email addresses</label>
                                            <div className={`mt-1.5 flex min-h-[48px] flex-wrap items-center gap-1.5 rounded-lg border bg-white p-1.5 focus-within:ring-4 dark:bg-neutral-900 ${inviteError
                                                ? "border-rose-400 focus-within:ring-rose-500/10"
                                                : "border-neutral-300 focus-within:border-orange-500 focus-within:ring-orange-500/10 dark:border-neutral-700"}`}>
                                                <AnimatePresence initial={false}>
                                                    {invites.map((email) => (
                                                        <motion.span key={email} layout initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}}
                                                                     className="inline-flex items-center gap-1 rounded-md bg-neutral-100 py-1 pl-2 pr-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
                                                            {email}
                                                            <button type="button" onClick={() => setInvites((prev) => prev.filter((e) => e !== email))} aria-label={`Remove ${email}`}
                                                                    className="flex h-5 w-5 items-center justify-center rounded text-neutral-500 outline-none hover:bg-neutral-200 hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-orange-500 dark:hover:bg-neutral-700 dark:hover:text-white">
                                                                <LuX className="h-3 w-3"/>
                                                            </button>
                                                        </motion.span>
                                                    ))}
                                                </AnimatePresence>
                                                <input id="onboarding-invite" type="email" value={draft} placeholder={invites.length ? "Add another" : "name@company.com"}
                                                       onChange={(e) => { setDraft(e.target.value); setInviteError(null); }}
                                                       onKeyDown={onInviteKey} onBlur={addInvite}
                                                       aria-invalid={inviteError ? true : undefined}
                                                       aria-describedby="onboarding-invite-help"
                                                       className="min-w-[140px] flex-1 bg-transparent px-1.5 py-1 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-white"/>
                                            </div>
                                            <p id="onboarding-invite-help" className={`mt-1.5 text-xs ${inviteError ? "text-rose-600 dark:text-rose-400" : "text-neutral-500 dark:text-neutral-400"}`}>
                                                {inviteError ?? "Press Enter or comma after each address."}
                                            </p>
                                            <button type="button" onClick={addInvite}
                                                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-orange-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-orange-400">
                                                <LuPlus className="h-4 w-4" aria-hidden="true"/> Add address
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!finished && (
                            <div className="mt-10 flex items-center justify-between gap-3 border-t border-neutral-200 pt-6 dark:border-neutral-800">
                                <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0}
                                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 outline-none hover:bg-neutral-100 focus-visible:ring-2 focus-visible:ring-orange-500 disabled:invisible dark:text-neutral-300 dark:hover:bg-neutral-900">
                                    <LuArrowLeft className="h-4 w-4" aria-hidden="true"/> Back
                                </button>
                                <button type="button" onClick={next} disabled={!canContinue}
                                        className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-orange-600 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:focus-visible:ring-offset-neutral-950">
                                    {step === 2 ? (invites.length ? `Send ${invites.length} ${invites.length === 1 ? "invite" : "invites"}` : "Finish setup") : "Continue"}
                                    <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Live preview of the workspace being created */}
                <div aria-hidden="true" className="relative hidden overflow-hidden bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100 lg:block dark:from-orange-950/60 dark:via-neutral-900 dark:to-rose-950/40">
                    <div className="absolute inset-y-12 left-12 right-0 rounded-l-2xl border border-r-0 border-white/70 bg-white/80 shadow-2xl shadow-orange-900/10 backdrop-blur dark:border-neutral-700/60 dark:bg-neutral-900/80">
                        <div className="flex h-full">
                            <div className="w-48 border-r border-neutral-200/80 p-4 dark:border-neutral-800">
                                <div className="flex items-center gap-2">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-500 text-xs font-bold text-white">
                                        {(workspace.trim()[0] ?? "R").toUpperCase()}
                                    </span>
                                    <span className="truncate text-sm font-semibold text-neutral-900 dark:text-white">{workspace.trim() || "Your workspace"}</span>
                                </div>
                                <div className="mt-6 space-y-2">
                                    {(useCase === "engineering" ? ["Backlog", "Current sprint", "Releases"] : useCase === "design" ? ["Reviews", "Specs", "Handoff"] : useCase === "marketing" ? ["Campaigns", "Content calendar", "Launches"] : useCase === "operations" ? ["Requests", "Hiring", "IT"] : ["", "", ""]).map((label, i) => (
                                        <div key={i} className="flex h-6 items-center gap-2 rounded px-1.5 text-xs text-neutral-600 dark:text-neutral-300">
                                            <span className="h-2 w-2 rounded-sm bg-neutral-300 dark:bg-neutral-600"/>
                                            {label || <span className="h-2 w-20 rounded bg-neutral-200 dark:bg-neutral-800"/>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 p-6">
                                <div className="flex items-center justify-between">
                                    <span className="h-3 w-32 rounded bg-neutral-200 dark:bg-neutral-800"/>
                                    <span className="flex -space-x-2">
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-[10px] font-semibold text-white ring-2 ring-white dark:bg-white dark:text-neutral-900 dark:ring-neutral-900">You</span>
                                        <AnimatePresence initial={false}>
                                            {invites.slice(0, 5).map((email, i) => (
                                                <motion.span key={email} initial={{scale: 0}} animate={{scale: 1}} exit={{scale: 0}}
                                                             className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-semibold text-white ring-2 ring-white dark:ring-neutral-900 ${avatarColors[i % avatarColors.length]}`}>
                                                    {email[0].toUpperCase()}
                                                </motion.span>
                                            ))}
                                        </AnimatePresence>
                                    </span>
                                </div>
                                <div className="mt-6 space-y-3">
                                    {[0, 1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3 rounded-lg border border-neutral-200/80 p-3 dark:border-neutral-800">
                                            <span className="h-4 w-4 rounded border border-neutral-300 dark:border-neutral-600"/>
                                            <span className="h-2.5 rounded bg-neutral-200 dark:bg-neutral-800" style={{width: `${40 + ((i * 17) % 35)}%`}}/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OnboardingSteps;
