import {WorkspaceRail, type Workspace} from "./WorkspaceRail";

const workspaces: Workspace[] = [
    {id: "northwind", name: "Northwind", short: "N", color: "bg-indigo-600", unread: 0, mentions: 0, members: 142, channels: ["general", "product", "releases"]},
    {id: "fernhill", name: "Fernhill Goods", short: "FG", color: "bg-emerald-600", unread: 12, mentions: 2, members: 18, channels: ["orders", "suppliers", "photo-shoots"]},
    {id: "tidal", name: "Tidal Studio", short: "TS", color: "bg-sky-600", unread: 3, mentions: 0, members: 9, channels: ["client-work", "invoices"]},
    {id: "rowing", name: "Harbor Rowing Club", short: "HR", color: "bg-rose-600", unread: 0, mentions: 0, members: 64, channels: ["schedule", "race-day", "kit"]},
    {id: "oss", name: "Open source maintainers", short: "OS", color: "bg-zinc-800 dark:bg-zinc-700", unread: 1, mentions: 1, members: 1320, channels: ["triage", "security", "docs"]},
];

const WorkspaceRailExample = () => <WorkspaceRail workspaces={workspaces}/>;

export default WorkspaceRailExample;
