import type {Example} from "../../types.ts";
import DashboardShell from "./DashboardShell.example.tsx";
import dashboardShellSource from "./DashboardShell.example.tsx?raw";
import SettingsPage from "./SettingsPage.example.tsx";
import settingsPageSource from "./SettingsPage.example.tsx?raw";
import TopNavTabs from "./TopNavTabs.example.tsx";
import topNavTabsSource from "./TopNavTabs.example.tsx?raw";
import CommandShell from "./CommandShell.example.tsx";
import commandShellSource from "./CommandShell.example.tsx?raw";
import MailShell from "./MailShell.example.tsx";
import mailShellSource from "./MailShell.example.tsx?raw";
import KanbanShell from "./KanbanShell.example.tsx";
import kanbanShellSource from "./KanbanShell.example.tsx?raw";
import EmptyStateShell from "./EmptyStateShell.example.tsx";
import emptyStateShellSource from "./EmptyStateShell.example.tsx?raw";
import MobileBottomNav from "./MobileBottomNav.example.tsx";
import mobileBottomNavSource from "./MobileBottomNav.example.tsx?raw";

const examples: Example[] = [
    {
        id: "dashboard-shell",
        title: "Dashboard shell",
        description: "An app layout with a sidebar, top bar, KPI cards, an interactive revenue chart and activity panels. The sidebar becomes a drawer on small screens.",
        component: DashboardShell,
        source: dashboardShellSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "settings-page",
        title: "Settings page",
        description: "Account settings with section navigation, a profile form, notification switches, session management and a save bar that appears when something changes.",
        component: SettingsPage,
        source: settingsPageSource,
        layout: "full",
        minHeight: 760,
    },
    {
        id: "top-nav-tabs",
        title: "Top navigation with tabs",
        description: "A project layout with breadcrumb switchers in the top bar and keyboard navigable tabs for overview, deployments, logs and settings. Suits developer tools and hosting dashboards.",
        component: TopNavTabs,
        source: topNavTabsSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "command-shell",
        title: "Collapsible sidebar with command menu",
        description: "A sidebar that collapses to an icon rail and a command menu opened with Ctrl K or Cmd K, with grouped results, arrow key navigation and actions that change the app.",
        component: CommandShell,
        source: commandShellSource,
        layout: "full",
        minHeight: 680,
    },
    {
        id: "mail-shell",
        title: "Three pane inbox",
        description: "Folders, a searchable message list and a reading pane with star, archive, delete and reply. On small screens the list and the message become separate views.",
        component: MailShell,
        source: mailShellSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "kanban-shell",
        title: "Kanban board",
        description: "A sprint board with an icon rail, drag and drop between columns, move buttons for keyboard users, inline issue creation and a filter. Columns scroll sideways on small screens.",
        component: KanbanShell,
        source: kanbanShellSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "empty-state-shell",
        title: "Setup checklist in an empty app",
        description: "A first run screen with a progress ring, expandable setup steps, a copyable install snippet and an empty live feed that fills in when you send a test event.",
        component: EmptyStateShell,
        source: emptyStateShellSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "mobile-bottom-nav",
        title: "Mobile app with bottom navigation",
        description: "A phone layout with a header that compacts on scroll, a bottom tab bar with a center action button and a bottom sheet you can drag down to close. Shows in a device frame on wider screens.",
        component: MobileBottomNav,
        source: mobileBottomNavSource,
        layout: "full",
        minHeight: 760,
    },
];

export default examples;
