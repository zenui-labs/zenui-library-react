import {LuBookOpen, LuClock, LuSettings, LuStar, LuUsers} from "react-icons/lu";
import {CommandShell} from "./CommandShell";
import type {CommandAction, CommandDocument, CommandNavItem} from "./CommandShell";

const nav: CommandNavItem[] = [
    {label: "Home", icon: LuClock},
    {label: "Docs", icon: LuBookOpen},
    {label: "Starred", icon: LuStar},
    {label: "Team", icon: LuUsers},
    {label: "Settings", icon: LuSettings},
];

const documents: CommandDocument[] = [
    {title: "Pricing page rewrite", folder: "Marketing", edited: "12 min ago", by: "Noor"},
    {title: "Onboarding interview notes", folder: "Research", edited: "1 hr ago", by: "Felix"},
    {title: "Q4 hiring plan", folder: "People", edited: "3 hr ago", by: "You"},
    {title: "Incident review, Sep 24 outage", folder: "Engineering", edited: "Yesterday", by: "Ravi"},
    {title: "Brand voice guidelines", folder: "Marketing", edited: "Mon", by: "Noor"},
    {title: "Mobile roadmap, H1 2027", folder: "Product", edited: "Last week", by: "You"},
];

const actions: CommandAction[] = [
    {id: "invite", label: "Invite a teammate", icon: LuUsers, goTo: "Team"},
];

const CommandShellExample = () => (
    <CommandShell
        nav={nav}
        documents={documents}
        folders={["Marketing", "Research", "Engineering", "Product"]}
        user={{name: "Eva", initials: "EK"}}
        actions={actions}
    />
);

export default CommandShellExample;
