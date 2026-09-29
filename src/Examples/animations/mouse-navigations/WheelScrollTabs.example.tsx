import {WheelScrollTabs, type ScrollTab} from "./WheelScrollTabs";

const tabs: ScrollTab[] = [
    {id: "dashboard", label: "Dashboard", icon: "📊", content: "Your dashboard with live analytics and insights."},
    {id: "analytics", label: "Analytics", icon: "📈", content: "Dig into your data with detailed analytics and reporting tools."},
    {id: "projects", label: "Projects", icon: "📋", content: "Track every project, its owners and its deadlines in one place."},
    {id: "team", label: "Team members", icon: "👥", content: "Work with your team and manage member permissions and roles."},
    {id: "settings", label: "Settings", icon: "⚙️", content: "Customize your workspace and set application preferences."},
    {id: "reports", label: "Reports", icon: "📄", content: "Generate detailed reports and export data for presentations."},
    {id: "calendar", label: "Calendar", icon: "📅", content: "Schedule meetings and manage your time with the built-in calendar."},
    {id: "messages", label: "Messages", icon: "💬", content: "Stay in touch with your team through messages."},
    {id: "files", label: "Files", icon: "📁", content: "Organize and share files with version history."},
    {id: "notifications", label: "Notifications", icon: "🔔", content: "Choose which alerts you get and where they reach you."},
    {id: "integrations", label: "Integrations", icon: "🔗", content: "Connect third-party services to extend what the app can do."},
    {id: "security", label: "Security", icon: "🔒", content: "Configure security settings and manage access controls."},
    {id: "billing", label: "Billing", icon: "💳", content: "Manage your subscription and billing information."},
    {id: "support", label: "Support", icon: "🎧", content: "Get help and browse the support articles."},
    {id: "api-docs", label: "API docs", icon: "📚", content: "Read the API documentation and integration guides."},
    {id: "webhooks", label: "Webhooks", icon: "🔄", content: "Set up and manage webhooks that sync data as it changes."},
];

const WheelScrollTabsExample = () => <WheelScrollTabs tabs={tabs}/>;

export default WheelScrollTabsExample;
