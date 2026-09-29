import {SettingsPage} from "./SettingsPage";
import type {SettingsNotification, SettingsSession, SettingsValues} from "./SettingsPage";

const notifications: SettingsNotification[] = [
    {key: "mentions", label: "Mentions and replies", description: "When someone mentions you or replies to your comment.", channel: "Email"},
    {key: "digest", label: "Weekly digest", description: "A Monday summary of what changed in your projects.", channel: "Email"},
    {key: "product", label: "Product updates", description: "New features, at most twice a month.", channel: "Email"},
    {key: "messages", label: "Direct messages", description: "New messages while you are away from the app.", channel: "Push"},
    {key: "reminders", label: "Due date reminders", description: "The morning a task assigned to you is due.", channel: "Push"},
];

const values: SettingsValues = {
    profile: {
        name: "Maya Chen",
        email: "maya@harborcoffee.co",
        username: "mayachen",
        bio: "Operations lead at Harbor Coffee. I look after roasting schedules and wholesale orders.",
        timezone: "America/Los_Angeles",
    },
    notifications: {mentions: true, digest: true, product: false, messages: true, reminders: false},
};

const sessions: SettingsSession[] = [
    {id: "s1", device: "Chrome on macOS", location: "Portland, US", lastActive: "Active now", kind: "laptop", current: true},
    {id: "s2", device: "Safari on iPhone", location: "Portland, US", lastActive: "2 hours ago", kind: "phone"},
    {id: "s3", device: "Firefox on Windows", location: "Seattle, US", lastActive: "6 days ago", kind: "laptop"},
];

// Replace with a request to your API. The save bar shows a spinner until the promise settles.
const saveSettings = () => new Promise<void>((resolve) => window.setTimeout(resolve, 800));

const SettingsPageExample = () => (
    <SettingsPage defaultValues={values} notifications={notifications} sessions={sessions} onSave={saveSettings}/>
);

export default SettingsPageExample;
