import {LuActivity, LuFlag, LuGauge, LuLayers, LuSettings} from "react-icons/lu";
import {EmptyStateShell} from "./EmptyStateShell";
import type {ListenForEvents, SetupNavItem} from "./EmptyStateShell";

const snippet = `<script defer src="https://cdn.beacon.dev/b.js"
  data-project="bcn_pub_7Qd2xk"></script>`;

const nav: SetupNavItem[] = [
    {label: "Get started", icon: LuFlag, active: true, showProgress: true},
    {label: "Live events", icon: LuActivity},
    {label: "Dashboards", icon: LuGauge},
    {label: "Funnels", icon: LuLayers},
    {label: "Settings", icon: LuSettings},
];

// Replace with a real listener, for example a server-sent events stream.
const listen: ListenForEvents = (push) => {
    const timers = [
        window.setTimeout(() => push({id: 1, name: "pageview", path: "/", time: "just now"}), 1800),
        window.setTimeout(() => push({id: 2, name: "click", path: "/pricing", time: "just now"}), 2600),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
};

const EmptyStateShellExample = () => <EmptyStateShell snippet={snippet} siteName="marlowe.shop" nav={nav} listen={listen}/>;

export default EmptyStateShellExample;
