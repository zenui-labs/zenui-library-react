import {SettingField, SettingSwitch, UnderlineTabs, type UnderlineTab} from "./UnderlineTabs";

type TabId = "profile" | "notifications" | "security" | "billing";

const tabs: UnderlineTab<TabId>[] = [
    {
        id: "profile",
        label: "Profile",
        content: (
            <dl className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                <SettingField label="Name" value="Aisha Bello"/>
                <SettingField label="Email" value="aisha@northwind.io"/>
                <SettingField label="Role" value="Product manager"/>
                <SettingField label="Time zone" value="Lagos (GMT+1)"/>
            </dl>
        ),
    },
    {
        id: "notifications",
        label: "Notifications",
        badge: "3",
        content: (
            <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                <SettingSwitch label="Mentions" detail="When someone mentions you in a comment" defaultOn/>
                <SettingSwitch label="Weekly summary" detail="A Monday email with what changed last week" defaultOn/>
                <SettingSwitch label="Product updates" detail="New features and changes to your plan"/>
            </div>
        ),
    },
    {
        id: "security",
        label: "Security",
        content: (
            <div className="space-y-3 py-3">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-400/20 dark:bg-emerald-400/10">
                    <p className="text-sm text-emerald-900 dark:text-emerald-100">Two-step verification is on</p>
                    <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white">Authenticator app</span>
                </div>
                <dl className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                    <SettingField label="Password" value="Changed 4 months ago"/>
                    <SettingField label="Active sessions" value="3 devices"/>
                </dl>
            </div>
        ),
    },
    {
        id: "billing",
        label: "Billing and plans",
        content: (
            <div className="py-3">
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Current plan</p>
                        <p className="text-lg font-semibold text-zinc-900 dark:text-white">Team, 12 seats</p>
                    </div>
                    <p className="text-sm tabular-nums text-zinc-600 dark:text-zinc-300">$144 per month</p>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]">
                    <div className="h-full w-3/4 rounded-full bg-indigo-500"/>
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">9 of 12 seats in use. Renews on Nov 1.</p>
            </div>
        ),
    },
];

const UnderlineTabsExample = () => <UnderlineTabs tabs={tabs}/>;

export default UnderlineTabsExample;
