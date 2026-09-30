import {BreakerPanel, type Breaker} from "./BreakerPanel";

const breakers: Breaker[] = [
    {id: "checkout", label: "Checkout v2", flag: "checkout.v2", on: true, detail: "100% of traffic"},
    {id: "search", label: "Dark launch: search", flag: "search.shadow", on: true, detail: "Shadow reads, 12% sample"},
    {id: "limiter", label: "Rate limiter", flag: "edge.ratelimit", on: true, detail: "600 req/min per key"},
    {id: "dashboard", label: "Beta dashboard", flag: "ui.dash-beta", on: false, detail: "Staff and 40 beta orgs"},
    {
        id: "webhooks",
        label: "Webhooks retry",
        flag: "hooks.retry",
        on: true,
        detail: "Exponential backoff, 6 tries",
        tripAfter: 2600,
        tripReason: "retry storm, 4.1k req/s",
    },
];

const BreakerPanelExample = () => (
    <BreakerPanel
        title="Panel A · Production"
        subtitle="eu-west-1 · feature flags"
        breakers={breakers}
    />
);

export default BreakerPanelExample;
