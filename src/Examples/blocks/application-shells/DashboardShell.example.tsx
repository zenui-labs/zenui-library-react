import {LuInbox, LuLayoutDashboard, LuPackage, LuSettings, LuTrendingUp, LuUsers} from "react-icons/lu";
import {DashboardShell} from "./DashboardShell";
import type {DashboardActivity, DashboardChannel, DashboardChartPoint, DashboardKpi, DashboardNavItem} from "./DashboardShell";

const nav: DashboardNavItem[] = [
    {label: "Overview", icon: LuLayoutDashboard},
    {label: "Orders", icon: LuInbox, badge: 12},
    {label: "Products", icon: LuPackage},
    {label: "Customers", icon: LuUsers},
    {label: "Reports", icon: LuTrendingUp},
    {label: "Settings", icon: LuSettings},
];

const kpis: DashboardKpi[] = [
    {label: "Revenue", value: "$48,290", change: 12.4, trend: [8, 10, 9, 12, 11, 14, 16]},
    {label: "Orders", value: "1,284", change: 8.1, trend: [5, 7, 6, 8, 9, 8, 10]},
    {label: "Average order", value: "$37.61", change: -2.3, trend: [12, 11, 12, 10, 11, 10, 9]},
    {label: "Returning customers", value: "42%", change: 3.0, trend: [6, 6, 7, 7, 8, 8, 9]},
];

const revenue: DashboardChartPoint[] = [
    {label: "Oct", value: 28.4}, {label: "Nov", value: 31.2}, {label: "Dec", value: 44.8}, {label: "Jan", value: 30.1},
    {label: "Feb", value: 29.6}, {label: "Mar", value: 33.9}, {label: "Apr", value: 35.2}, {label: "May", value: 38.7},
    {label: "Jun", value: 36.4}, {label: "Jul", value: 41.3}, {label: "Aug", value: 43.9}, {label: "Sep", value: 48.3},
];

const activity: DashboardActivity[] = [
    {who: "Lena Fischer", what: "ordered 2 bags of Ethiopia Guji", when: "4 min ago", color: "bg-amber-500"},
    {who: "Owen Price", what: "started a monthly subscription", when: "18 min ago", color: "bg-emerald-500"},
    {who: "Sara Nunez", what: "requested a refund for order 4471", when: "1 hr ago", color: "bg-rose-500"},
    {who: "Dev Patel", what: "left a 5 star review on Colombia Huila", when: "2 hr ago", color: "bg-sky-500"},
];

const channels: DashboardChannel[] = [
    {name: "Online store", share: 58},
    {name: "Subscriptions", share: 27},
    {name: "Wholesale", share: 15},
];

const DashboardShellExample = () => (
    <DashboardShell
        nav={nav}
        kpis={kpis}
        revenue={revenue}
        revenueAriaLabel="Monthly revenue from October to September, rising from 28.4 to 48.3 thousand dollars"
        activity={activity}
        channels={channels}
        workspace={{name: "Harbor Coffee", plan: "Growth plan", initials: "HC"}}
        user={{name: "Maya Chen", initials: "MC"}}
        usage={{label: "Monthly orders", detail: "1,284 of 2,000", percent: 64, actionLabel: "Upgrade plan"}}
    />
);

export default DashboardShellExample;
