import {LuBell, LuCreditCard, LuFolder, LuInbox, LuKey, LuLogOut, LuPlus, LuUserPlus} from "react-icons/lu";
import {CommandPalette, type Command} from "./CommandPalette";

const commands: Command[] = [
    {id: "new-issue", label: "Create new issue", group: "Suggestions", icon: LuPlus, shortcut: ["C"], keywords: ["add", "task", "bug"]},
    {id: "invite", label: "Invite teammates", group: "Suggestions", icon: LuUserPlus, keywords: ["member", "team", "people"]},
    {id: "inbox", label: "Go to inbox", group: "Suggestions", icon: LuInbox, shortcut: ["G", "I"], keywords: ["messages", "mentions"]},
    {id: "atlas", label: "Atlas mobile app", group: "Projects", icon: LuFolder, detail: "12 open issues"},
    {id: "billing-migration", label: "Billing migration", group: "Projects", icon: LuFolder, detail: "4 open issues"},
    {id: "marketing-site", label: "Marketing site refresh", group: "Projects", icon: LuFolder, detail: "Updated yesterday"},
    {id: "notifications", label: "Notification settings", group: "Settings", icon: LuBell, keywords: ["email", "alerts"]},
    {id: "billing", label: "Billing and plans", group: "Settings", icon: LuCreditCard, keywords: ["invoice", "payment", "upgrade"]},
    {id: "tokens", label: "API tokens", group: "Settings", icon: LuKey, keywords: ["developer", "keys"]},
    {id: "logout", label: "Log out", group: "Settings", icon: LuLogOut, shortcut: ["⇧", "Q"], keywords: ["sign out"]},
];

// ⌘K is the usual choice. This demo listens for ⌘J so it does not clash with other shortcuts on the page.
const CommandPaletteExample = () => <CommandPalette commands={commands} shortcutKey="j"/>;

export default CommandPaletteExample;
