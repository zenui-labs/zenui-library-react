import {LuActivity, LuBell, LuCommand, LuGlobe} from "react-icons/lu";
import {AlertStack, BentoGrid, CommandPalette, EdgeMap, TraceChart, UptimeBars} from "./BentoGrid";
import type {AlertItem, BentoTileData, MapPoint} from "./BentoGrid";

// p95 latency samples for the trace chart, in milliseconds.
const latency: number[] = [182, 176, 190, 171, 168, 204, 240, 212, 188, 166, 158, 162, 149, 153, 141, 138, 146, 132];

const regions: MapPoint[] = [
    {name: "Oregon", x: 22, y: 38},
    {name: "Virginia", x: 31, y: 40},
    {name: "Frankfurt", x: 51, y: 32},
    {name: "Mumbai", x: 68, y: 50},
    {name: "Tokyo", x: 84, y: 40},
    {name: "Sydney", x: 86, y: 74},
];

const alerts: AlertItem[] = [
    {service: "payments-worker", message: "Error rate above 2% for 5 minutes", severity: "critical"},
    {service: "search-index", message: "Queue depth rising, 1,240 jobs", severity: "warning"},
    {service: "auth-gateway", message: "Recovered after 3 minutes", severity: "resolved"},
];

// Incidents per day for the last 30 days.
const incidents: number[] = Array.from({length: 30}, (_, i) => (i === 8 ? 2 : i === 21 ? 1 : 0));

const tiles: BentoTileData[] = [
    {
        icon: LuActivity,
        eyebrow: "Tracing",
        title: "Traces you can actually read",
        body: "Every request is grouped by endpoint and annotated with the deploy that shipped it.",
        wide: true,
        visual: <TraceChart label="checkout-api, p95 latency" value="132 ms" samples={latency}
                            note="Spike at 14:32 traced to a slow inventory query"/>,
    },
    {
        icon: LuGlobe,
        eyebrow: "Edge",
        title: "Checks from six regions",
        body: "Synthetic probes run every 30 seconds from where your users are.",
        visual: <EdgeMap regions={regions}/>,
    },
    {
        icon: LuBell,
        eyebrow: "Alerts",
        title: "Alerts that group themselves",
        body: "Related failures collapse into one incident instead of forty pages.",
        visual: <AlertStack alerts={alerts}/>,
    },
    {
        icon: LuCommand,
        eyebrow: "Actions",
        title: "Roll back from the keyboard",
        body: "Press Cmd K, type what you need, and confirm.",
        visual: <CommandPalette query="rollback" results={["Roll back to v412", "Compare with v413"]}/>,
    },
    {
        icon: LuActivity,
        eyebrow: "Status",
        title: "A status page that updates itself",
        body: "Incidents post automatically and resolve when checks go green.",
        visual: <UptimeBars uptime={99.982} incidents={incidents}/>,
    },
];

const BentoGridExample = () => <BentoGrid tiles={tiles}/>;

export default BentoGridExample;
