import {useId, useState} from "react";
import type {ChangeEvent, FormEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuBell, LuCheck, LuLaptop, LuLoader, LuShieldCheck, LuSmartphone, LuUser} from "react-icons/lu";

export type SettingsSectionId = "profile" | "notifications" | "security";

const sections: {id: SettingsSectionId; label: string; icon: ReactNode}[] = [
    {id: "profile", label: "Profile", icon: <LuUser className="h-4 w-4"/>},
    {id: "notifications", label: "Notifications", icon: <LuBell className="h-4 w-4"/>},
    {id: "security", label: "Security", icon: <LuShieldCheck className="h-4 w-4"/>},
];

export interface SettingsProfile {
    name: string;
    email: string;
    username: string;
    bio: string;
    /** IANA time zone, matched against the `timezones` options. */
    timezone: string;
}

export interface SettingsNotification {
    /** Key into `SettingsValues.notifications`. */
    key: string;
    label: string;
    description: string;
    /** Group heading, for example "Email" or "Push". Groups appear in the order they first occur. */
    channel: string;
}

export interface SettingsValues {
    profile: SettingsProfile;
    /** On or off for each notification key. */
    notifications: Record<string, boolean>;
}

export interface SettingsSession {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    kind: "laptop" | "phone";
    /** Marks the device you are on. It shows a badge instead of a sign out button. */
    current?: boolean;
}

export interface SettingsTimezone {
    value: string;
    label: string;
}

const defaultTimezones: SettingsTimezone[] = [
    {value: "America/Los_Angeles", label: "Pacific Time (US)"},
    {value: "America/New_York", label: "Eastern Time (US)"},
    {value: "Europe/London", label: "London"},
    {value: "Europe/Berlin", label: "Central European Time"},
    {value: "Asia/Tokyo", label: "Tokyo"},
];

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

export interface SettingsSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    /** Id of the element that names the switch. */
    labelledBy: string;
    /** Id of the element that describes the switch. */
    describedBy?: string;
}

export const SettingsSwitch = ({checked, onChange, labelledBy, describedBy}: SettingsSwitchProps) => (
    <button type="button" role="switch" aria-checked={checked} aria-labelledby={labelledBy} aria-describedby={describedBy}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"}`}>
        <motion.span layout transition={{type: "spring", stiffness: 600, damping: 35}}
                     className={`block h-5 w-5 rounded-full bg-white shadow ${checked ? "ml-[22px]" : "ml-0.5"}`}/>
    </button>
);

export interface SettingsCardProps {
    title: string;
    description: string;
    children: ReactNode;
}

export const SettingsCard = ({title, description, children}: SettingsCardProps) => (
    <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-5 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="p-5">{children}</div>
    </section>
);

export interface SettingsPageProps {
    /** Saved values the form starts from. */
    defaultValues: SettingsValues;
    notifications: SettingsNotification[];
    sessions: SettingsSession[];
    /** Called with the draft when the person saves. Return a promise to keep the spinner up until it settles. */
    onSave?: (values: SettingsValues) => Promise<void> | void;
    /** Called after a session is removed from the list. */
    onSignOutSession?: (session: SettingsSession) => void;
    defaultTwoFactor?: boolean;
    onTwoFactorChange?: (enabled: boolean) => void;
    onDeleteAccount?: () => void;
    defaultSection?: SettingsSectionId;
    timezones?: SettingsTimezone[];
    bioLimit?: number;
    title?: string;
    description?: string;
    className?: string;
}

/** Account settings with section navigation, a profile form, notification switches, sessions and a save bar. */
export const SettingsPage = ({
    defaultValues,
    notifications,
    sessions: initialSessions,
    onSave,
    onSignOutSession,
    defaultTwoFactor = false,
    onTwoFactorChange,
    onDeleteAccount,
    defaultSection = "profile",
    timezones = defaultTimezones,
    bioLimit = 160,
    title = "Settings",
    description = "Manage your profile, notifications and sign-in security.",
    className = "",
}: SettingsPageProps) => {
    const [section, setSection] = useState<SettingsSectionId>(defaultSection);
    const [saved, setSaved] = useState<SettingsValues>(defaultValues);
    const [draft, setDraft] = useState<SettingsValues>(defaultValues);
    const [saving, setSaving] = useState(false);
    const [justSaved, setJustSaved] = useState(false);
    const [sessions, setSessions] = useState<SettingsSession[]>(initialSessions);
    const [twoFactor, setTwoFactor] = useState(defaultTwoFactor);
    const uid = useId().replace(/:/g, "");
    const fieldId = (name: string) => `settings-${name}-${uid}`;

    const dirty = JSON.stringify(saved) !== JSON.stringify(draft);
    const channels = [...new Set(notifications.map((n) => n.channel))];

    const updateProfile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setDraft((prev) => ({...prev, profile: {...prev.profile, [name]: value}}));
    };

    const setNotification = (key: string, value: boolean) => {
        setDraft((prev) => ({...prev, notifications: {...prev.notifications, [key]: value}}));
    };

    const save = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        setSaving(true);
        const values = draft;
        void Promise.resolve(onSave?.(values)).then(() => {
            setSaved(values);
            setSaving(false);
            setJustSaved(true);
            window.setTimeout(() => setJustSaved(false), 2000);
        }, () => setSaving(false));
    };

    const toggleTwoFactor = () => {
        const next = !twoFactor;
        setTwoFactor(next);
        onTwoFactorChange?.(next);
    };

    const signOut = (session: SettingsSession) => {
        setSessions((prev) => prev.filter((x) => x.id !== session.id));
        onSignOutSession?.(session);
    };

    const initials = draft.profile.name.split(" ").map((p) => p[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";

    return (
        <div className={`w-full bg-slate-50 px-4 py-8 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-4xl">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-[180px_minmax(0,1fr)]">
                    <nav aria-label="Settings sections">
                        <ul className="flex gap-1 overflow-x-auto sm:flex-col">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <button type="button" onClick={() => setSection(s.id)} aria-current={section === s.id ? "page" : undefined}
                                            className={`flex w-full items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 ${section === s.id
                                                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-white dark:ring-slate-800"
                                                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}>
                                        {s.icon}
                                        {s.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="min-w-0">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div key={section} initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -8}}
                                        transition={{duration: 0.18}} className="space-y-6">
                                {section === "profile" && (
                                    <form id={fieldId("profile-form")} onSubmit={save}>
                                        <SettingsCard title="Profile" description="This is how other people see you in the workspace.">
                                            <div className="flex items-center gap-4">
                                                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-lg font-semibold text-white">
                                                    {initials}
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    <label className="cursor-pointer rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                                                        Upload photo
                                                        <input type="file" accept="image/png,image/jpeg" className="sr-only"/>
                                                    </label>
                                                    <p className="w-full text-xs text-slate-500">PNG or JPG, at least 256 by 256 pixels.</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                                <div>
                                                    <label htmlFor={fieldId("name")} className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                                                    <input id={fieldId("name")} name="name" value={draft.profile.name} onChange={updateProfile} autoComplete="name" className={inputClass}/>
                                                </div>
                                                <div>
                                                    <label htmlFor={fieldId("email")} className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                                    <input id={fieldId("email")} name="email" type="email" value={draft.profile.email} onChange={updateProfile} autoComplete="email" className={inputClass}/>
                                                </div>
                                                <div>
                                                    <label htmlFor={fieldId("username")} className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                                                    <div className="mt-1.5 flex rounded-lg border border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700">
                                                        <span className="flex items-center rounded-l-lg border-r border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">@</span>
                                                        <input id={fieldId("username")} name="username" value={draft.profile.username} onChange={updateProfile}
                                                               className="w-full min-w-0 rounded-r-lg bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none dark:bg-slate-900 dark:text-white"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor={fieldId("timezone")} className="text-sm font-medium text-slate-700 dark:text-slate-300">Time zone</label>
                                                    <select id={fieldId("timezone")} name="timezone" value={draft.profile.timezone} onChange={updateProfile} className={inputClass}>
                                                        {timezones.map((tz) => <option key={tz.value} value={tz.value}>{tz.label}</option>)}
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="flex items-baseline justify-between">
                                                        <label htmlFor={fieldId("bio")} className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                                                        <span className={`text-xs tabular-nums ${draft.profile.bio.length > bioLimit ? "text-rose-600" : "text-slate-400"}`}>
                                                            {draft.profile.bio.length} / {bioLimit}
                                                        </span>
                                                    </div>
                                                    <textarea id={fieldId("bio")} name="bio" rows={3} value={draft.profile.bio} onChange={updateProfile} maxLength={bioLimit}
                                                              className={`${inputClass} resize-none`}/>
                                                </div>
                                            </div>
                                        </SettingsCard>
                                    </form>
                                )}

                                {section === "notifications" && (
                                    <SettingsCard title="Notifications" description="Choose what reaches you and where.">
                                        {channels.map((channel) => (
                                            <fieldset key={channel} className="first:mt-0 mt-6">
                                                <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">{channel}</legend>
                                                <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                                                    {notifications.filter((n) => n.channel === channel).map((n) => (
                                                        <li key={n.key} className="flex items-center justify-between gap-6 py-3">
                                                            <div>
                                                                <p id={fieldId(`notify-${n.key}`)} className="text-sm font-medium text-slate-900 dark:text-white">{n.label}</p>
                                                                <p id={fieldId(`notify-${n.key}-desc`)} className="text-sm text-slate-500 dark:text-slate-400">{n.description}</p>
                                                            </div>
                                                            <SettingsSwitch checked={draft.notifications[n.key] ?? false} onChange={(v) => setNotification(n.key, v)}
                                                                            labelledBy={fieldId(`notify-${n.key}`)} describedBy={fieldId(`notify-${n.key}-desc`)}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </fieldset>
                                        ))}
                                    </SettingsCard>
                                )}

                                {section === "security" && (
                                    <>
                                        <SettingsCard title="Two-factor authentication" description="Require a code from an authenticator app when you sign in.">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <p className="inline-flex items-center gap-2 text-sm">
                                                    <span className={`h-2 w-2 rounded-full ${twoFactor ? "bg-emerald-500" : "bg-amber-500"}`}/>
                                                    <span className="text-slate-700 dark:text-slate-300">{twoFactor ? "Enabled with an authenticator app" : "Not enabled"}</span>
                                                </p>
                                                <button type="button" onClick={toggleTwoFactor}
                                                        className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${twoFactor
                                                            ? "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                                            : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
                                                    {twoFactor ? "Turn off" : "Set up"}
                                                </button>
                                            </div>
                                        </SettingsCard>

                                        <SettingsCard title="Active sessions" description="Devices signed in to your account.">
                                            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                                <AnimatePresence initial={false}>
                                                    {sessions.map((s) => (
                                                        <motion.li key={s.id} exit={{opacity: 0, height: 0}} className="overflow-hidden">
                                                            <div className="flex items-center gap-3 py-3">
                                                                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                                                                    {s.kind === "phone" ? <LuSmartphone className="h-4 w-4"/> : <LuLaptop className="h-4 w-4"/>}
                                                                </span>
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{s.device}</p>
                                                                    <p className="text-xs text-slate-500">{s.location}, {s.lastActive}</p>
                                                                </div>
                                                                {s.current ? (
                                                                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">This device</span>
                                                                ) : (
                                                                    <button type="button" onClick={() => signOut(s)}
                                                                            className="rounded-lg px-2.5 py-1 text-sm font-medium text-slate-600 outline-none hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                                                                        Sign out
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </motion.li>
                                                    ))}
                                                </AnimatePresence>
                                            </ul>
                                        </SettingsCard>

                                        <section className="rounded-2xl border border-rose-200 p-5 dark:border-rose-500/30">
                                            <h2 className="font-semibold text-rose-700 dark:text-rose-400">Delete account</h2>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                Permanently remove your account and personal data. Workspaces you own must be transferred first.
                                            </p>
                                            <button type="button" onClick={onDeleteAccount}
                                                    className="mt-4 rounded-lg border border-rose-300 px-3 py-1.5 text-sm font-medium text-rose-700 outline-none hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-500 dark:border-rose-500/40 dark:text-rose-400 dark:hover:bg-rose-500/10">
                                                Delete account
                                            </button>
                                        </section>
                                    </>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Save bar, shown when profile or notification settings change */}
                <AnimatePresence>
                    {(dirty || justSaved) && (
                        <motion.div initial={{y: 80, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{y: 80, opacity: 0}}
                                    transition={{type: "spring", bounce: 0.2, duration: 0.4}}
                                    className="sticky bottom-4 z-10 mx-auto mt-6 flex max-w-xl items-center justify-between gap-4 rounded-2xl bg-slate-900 py-2.5 pl-4 pr-2.5 text-sm text-white shadow-2xl dark:bg-white dark:text-slate-900"
                                    role="status">
                            {justSaved && !dirty ? (
                                <span className="inline-flex items-center gap-2"><LuCheck className="h-4 w-4 text-emerald-400 dark:text-emerald-600"/> Changes saved</span>
                            ) : (
                                <>
                                    <span>You have unsaved changes</span>
                                    <span className="flex gap-2">
                                        <button type="button" onClick={() => setDraft(saved)} disabled={saving}
                                                className="rounded-lg px-3 py-1.5 font-medium text-slate-300 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-slate-600 dark:hover:text-slate-900">
                                            Discard
                                        </button>
                                        <button type="button" onClick={() => save()} disabled={saving}
                                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 px-3 py-1.5 font-medium text-white outline-none hover:bg-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-300 disabled:opacity-70">
                                            {saving && <LuLoader className="h-4 w-4 animate-spin"/>}
                                            Save changes
                                        </button>
                                    </span>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
