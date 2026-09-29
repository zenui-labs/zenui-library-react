import {LuCalendar, LuInbox, LuLayers, LuMessageCircle, LuSettings, LuTrendingUp, LuUsers} from "react-icons/lu";
import {VerticalDock, type RailSection} from "./VerticalDock";

const sections: RailSection[] = [
    {id: "inbox", label: "Inbox", icon: LuInbox, summary: "12 conversations need a reply, 3 are marked urgent.", count: 12},
    {id: "projects", label: "Projects", icon: LuLayers, summary: "Checkout redesign is 70% done and due next Friday."},
    {id: "calendar", label: "Calendar", icon: LuCalendar, summary: "Design review at 2:30 PM with the payments team."},
    {id: "chat", label: "Chat", icon: LuMessageCircle, summary: "Marcus shared new onboarding screens in #design.", count: 4},
    {id: "people", label: "People", icon: LuUsers, summary: "Two new teammates start on Monday."},
    {id: "reports", label: "Reports", icon: LuTrendingUp, summary: "Weekly active users are up 6% since last Monday."},
    {id: "settings", label: "Settings", icon: LuSettings, summary: "Workspace, billing, members and integrations."},
];

const VerticalDockExample = () => <VerticalDock sections={sections} logo="N" eyebrow="Northwind"/>;

export default VerticalDockExample;
