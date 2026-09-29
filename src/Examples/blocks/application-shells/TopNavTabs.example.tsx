import {TopNavTabs} from "./TopNavTabs";
import type {Deployment, LogLine, ProjectSetting} from "./TopNavTabs";

const deployments: Deployment[] = [
    {id: "dpl_8fk2", branch: "main", commit: "a41c9e2", message: "Add holiday gift guide landing page", author: "Rin Sato", status: "Building", env: "Production", age: "Just now", duration: "0m 48s"},
    {id: "dpl_7mq1", branch: "main", commit: "3be07d1", message: "Fix cart total rounding for JPY", author: "Owen Hale", status: "Ready", env: "Production", age: "2h ago", duration: "1m 12s", current: true},
    {id: "dpl_6zp4", branch: "feat/wishlist", commit: "9d2f441", message: "Wishlist share sheet", author: "Rin Sato", status: "Ready", env: "Preview", age: "3h ago", duration: "1m 05s"},
    {id: "dpl_5aa9", branch: "chore/deps", commit: "c07e3a8", message: "Bump image optimizer to 4.2", author: "Dependabot", status: "Error", env: "Preview", age: "5h ago", duration: "0m 31s"},
    {id: "dpl_4hx3", branch: "feat/search", commit: "e1f9b30", message: "Typo tolerance for product search", author: "Ana Costa", status: "Canceled", env: "Preview", age: "Yesterday", duration: "0m 09s"},
];

const logs: LogLine[] = [
    {time: "14:02:11", level: "info", route: "GET /products/linen-shirt", message: "200 in 84ms, cache HIT"},
    {time: "14:02:09", level: "info", route: "POST /api/cart", message: "201 in 132ms"},
    {time: "14:01:58", level: "warn", route: "GET /search?q=gift", message: "Slow query, 1,240ms"},
    {time: "14:01:44", level: "error", route: "POST /api/checkout", message: "Payment provider timeout after 10s"},
    {time: "14:01:40", level: "info", route: "GET /", message: "200 in 41ms, cache HIT"},
    {time: "14:01:31", level: "info", route: "GET /collections/fall", message: "200 in 96ms, cache MISS"},
];

const settings: ProjectSetting[] = [
    {label: "Framework", value: "Next.js"},
    {label: "Root directory", value: "apps/storefront"},
    {label: "Node version", value: "22.x"},
    {label: "Production branch", value: "main"},
];

const TopNavTabsExample = () => (
    <TopNavTabs
        project={{name: "storefront", badge: "Pro", domain: "kinfolkgoods.com"}}
        team="Kinfolk Goods"
        userName="Rin Sato"
        deployments={deployments}
        logs={logs}
        settings={settings}
    />
);

export default TopNavTabsExample;
