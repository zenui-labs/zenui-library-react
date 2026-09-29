import {useState} from "react";
import type {ChangeEvent, FormEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuBell, LuCheck, LuLaptop, LuLoader, LuShieldCheck, LuSmartphone, LuUser} from "react-icons/lu";

type SectionId = "profile" | "notifications" | "security";

const sections: {id: SectionId; label: string; icon: ReactNode}[] = [
    {id: "profile", label: "Profile", icon: <LuUser className="h-4 w-4"/>},
    {id: "notifications", label: "Notifications", icon: <LuBell className="h-4 w-4"/>},
    {id: "security", label: "Security", icon: <LuShieldCheck className="h-4 w-4"/>},
];

interface Profile {
    name: string;
    email: string;
    username: string;
    bio: string;
    timezone: string;
}

type NotificationKey = "mentions" | "digest" | "product" | "messages" | "reminders";

interface NotificationSetting {
    key: NotificationKey;
    label: string;
    description: string;
    channel: "Email" | "Push";
}

const notificationSettings: NotificationSetting[] = [
    {key: "mentions", label: "Mentions and replies", description: "When someone mentions you or replies to your comment.", channel: "Email"},
    {key: "digest", label: "Weekly digest", description: "A Monday summary of what changed in your projects.", channel: "Email"},
    {key: "product", label: "Product updates", description: "New features, at most twice a month.", channel: "Email"},
    {key: "messages", label: "Direct messages", description: "New messages while you are away from the app.", channel: "Push"},
    {key: "reminders", label: "Due date reminders", description: "The morning a task assigned to you is due.", channel: "Push"},
];

interface Settings {
    profile: Profile;
    notifications: Record<NotificationKey, boolean>;
}

const initialSettings: Settings = {
    profile: {
        name: "Maya Chen",
        email: "maya@harborcoffee.co",
        username: "mayachen",
        bio: "Operations lead at Harbor Coffee. I look after roasting schedules and wholesale orders.",
        timezone: "America/Los_Angeles",
    },
    notifications: {mentions: true, digest: true, product: false, messages: true, reminders: false},
};

interface Session {
    id: string;
    device: string;
    location: string;
    lastActive: string;
    kind: "laptop" | "phone";
    current?: boolean;
}

const initialSessions: Session[] = [
    {id: "s1", device: "Chrome on macOS", location: "Portland, US", lastActive: "Active now", kind: "laptop", current: true},
    {id: "s2", device: "Safari on iPhone", location: "Portland, US", lastActive: "2 hours ago", kind: "phone"},
    {id: "s3", device: "Firefox on Windows", location: "Seattle, US", lastActive: "6 days ago", kind: "laptop"},
];

const BIO_LIMIT = 160;

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    labelledBy: string;
    describedBy: string;
}

const Switch = ({checked, onChange, labelledBy, describedBy}: SwitchProps) => (
    <button type="button" role="switch" aria-checked={checked} aria-labelledby={labelledBy} aria-describedby={describedBy}
            onClick={() => onChange(!checked)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${checked ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"}`}>
        <motion.span layout transition={{type: "spring", stiffness: 600, damping: 35}}
                     className={`block h-5 w-5 rounded-full bg-white shadow ${checked ? "ml-[22px]" : "ml-0.5"}`}/>
    </button>
);

const Card = ({title, description, children}: {title: string; description: string; children: ReactNode}) => (
    <section className="rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-100 p-5 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">{title}</h2>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <div className="p-5">{children}</div>
    </section>
);

const SettingsPage = () => {
    const [section, setSection] = useState<SectionId>("profile");
    const [saved, setSaved] = useState<Settings>(initialSettings);
    const [draft, setDraft] = useState<Settings>(initialSettings);
    const [saving, setSaving] = useState(false);
    const [justSaved, setJustSaved] = useState(false);
    const [sessions, setSessions] = useState<Session[]>(initialSessions);
    const [twoFactor, setTwoFactor] = useState(false);

    const dirty = JSON.stringify(saved) !== JSON.stringify(draft);

    const updateProfile = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = event.target;
        setDraft((prev) => ({...prev, profile: {...prev.profile, [name]: value}}));
    };

    const setNotification = (key: NotificationKey, value: boolean) => {
        setDraft((prev) => ({...prev, notifications: {...prev.notifications, [key]: value}}));
    };

    const save = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        setSaving(true);
        // Replace with a request to your API.
        window.setTimeout(() => {
            setSaved(draft);
            setSaving(false);
            setJustSaved(true);
            window.setTimeout(() => setJustSaved(false), 2000);
        }, 800);
    };

    const initials = draft.profile.name.split(" ").map((p) => p[0] ?? "").join("").slice(0, 2).toUpperCase() || "?";

    return (
        <div className="w-full bg-slate-50 px-4 py-8 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Settings</h1>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your profile, notifications and sign-in security.</p>

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
                                    <form id="profile-form" onSubmit={save}>
                                        <Card title="Profile" description="This is how other people see you in the workspace.">
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
                                                    <label htmlFor="settings-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                                                    <input id="settings-name" name="name" value={draft.profile.name} onChange={updateProfile} autoComplete="name" className={inputClass}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="settings-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                                    <input id="settings-email" name="email" type="email" value={draft.profile.email} onChange={updateProfile} autoComplete="email" className={inputClass}/>
                                                </div>
                                                <div>
                                                    <label htmlFor="settings-username" className="text-sm font-medium text-slate-700 dark:text-slate-300">Username</label>
                                                    <div className="mt-1.5 flex rounded-lg border border-slate-300 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-slate-700">
                                                        <span className="flex items-center rounded-l-lg border-r border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">@</span>
                                                        <input id="settings-username" name="username" value={draft.profile.username} onChange={updateProfile}
                                                               className="w-full min-w-0 rounded-r-lg bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none dark:bg-slate-900 dark:text-white"/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="settings-timezone" className="text-sm font-medium text-slate-700 dark:text-slate-300">Time zone</label>
                                                    <select id="settings-timezone" name="timezone" value={draft.profile.timezone} onChange={updateProfile} className={inputClass}>
                                                        <option value="America/Los_Angeles">Pacific Time (US)</option>
                                                        <option value="America/New_York">Eastern Time (US)</option>
                                                        <option value="Europe/London">London</option>
                                                        <option value="Europe/Berlin">Central European Time</option>
                                                        <option value="Asia/Tokyo">Tokyo</option>
                                                    </select>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <div className="flex items-baseline justify-between">
                                                        <label htmlFor="settings-bio" className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                                                        <span className={`text-xs tabular-nums ${draft.profile.bio.length > BIO_LIMIT ? "text-rose-600" : "text-slate-400"}`}>
                                                            {draft.profile.bio.length} / {BIO_LIMIT}
                                                        </span>
                                                    </div>
                                                    <textarea id="settings-bio" name="bio" rows={3} value={draft.profile.bio} onChange={updateProfile} maxLength={BIO_LIMIT}
                                                              className={`${inputClass} resize-none`}/>
                                                </div>
                                            </div>
                                        </Card>
                                    </form>
                                )}

                                {section === "notifications" && (
                                    <Card title="Notifications" description="Choose what reaches you and where.">
                                        {(["Email", "Push"] as const).map((channel) => (
                                            <fieldset key={channel} className="first:mt-0 mt-6">
                                                <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400">{channel}</legend>
                                                <ul className="mt-2 divide-y divide-slate-100 dark:divide-slate-800">
                                                    {notificationSettings.filter((n) => n.channel === channel).map((n) => (
                                                        <li key={n.key} className="flex items-center justify-between gap-6 py-3">
                                                            <div>
                                                                <p id={`notify-${n.key}`} className="text-sm font-medium text-slate-900 dark:text-white">{n.label}</p>
                                                                <p id={`notify-${n.key}-desc`} className="text-sm text-slate-500 dark:text-slate-400">{n.description}</p>
                                                            </div>
                                                            <Switch checked={draft.notifications[n.key]} onChange={(v) => setNotification(n.key, v)}
                                                                    labelledBy={`notify-${n.key}`} describedBy={`notify-${n.key}-desc`}/>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </fieldset>
                                        ))}
                                    </Card>
                                )}

                                {section === "security" && (
                                    <>
                                        <Card title="Two-factor authentication" description="Require a code from an authenticator app when you sign in.">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <p className="inline-flex items-center gap-2 text-sm">
                                                    <span className={`h-2 w-2 rounded-full ${twoFactor ? "bg-emerald-500" : "bg-amber-500"}`}/>
                                                    <span className="text-slate-700 dark:text-slate-300">{twoFactor ? "Enabled with an authenticator app" : "Not enabled"}</span>
                                                </p>
                                                <button type="button" onClick={() => setTwoFactor((v) => !v)}
                                                        className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${twoFactor
                                                            ? "border border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                                            : "bg-indigo-600 text-white hover:bg-indigo-500"}`}>
                                                    {twoFactor ? "Turn off" : "Set up"}
                                                </button>
                                            </div>
                                        </Card>

                                        <Card title="Active sessions" description="Devices signed in to your account.">
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
                                                                    <button type="button" onClick={() => setSessions((prev) => prev.filter((x) => x.id !== s.id))}
                                                                            className="rounded-lg px-2.5 py-1 text-sm font-medium text-slate-600 outline-none hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                                                                        Sign out
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </motion.li>
                                                    ))}
                                                </AnimatePresence>
                                            </ul>
                                        </Card>

                                        <section className="rounded-2xl border border-rose-200 p-5 dark:border-rose-500/30">
                                            <h2 className="font-semibold text-rose-700 dark:text-rose-400">Delete account</h2>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                                Permanently remove your account and personal data. Workspaces you own must be transferred first.
                                            </p>
                                            <button type="button"
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

export default SettingsPage;
