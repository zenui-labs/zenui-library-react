import {LuBellRing, LuDatabaseBackup, LuFileText, LuFingerprint, LuGauge, LuGlobe, LuKeyRound, LuLock} from "react-icons/lu";
import {SpotlightIconGrid, type SpotlightFeature} from "./SpotlightIconGrid";

const features: SpotlightFeature[] = [
    {
        icon: LuLock,
        title: "Encryption everywhere",
        body: "Data is encrypted in transit and at rest, with keys you can bring and rotate.",
        specs: ["AES-256 at rest", "TLS 1.3 only", "Customer managed keys"],
    },
    {
        icon: LuFingerprint,
        title: "Single sign-on",
        body: "Connect your identity provider and enforce SSO for every member.",
        specs: ["SAML and OIDC", "SCIM provisioning", "Just in time access"],
    },
    {
        icon: LuFileText,
        title: "Audit log",
        body: "Every sign in, permission change and export is recorded and searchable.",
        specs: ["400 day retention", "Stream to your SIEM", "Tamper evident"],
    },
    {
        icon: LuKeyRound,
        title: "Secrets vault",
        body: "Store API keys and tokens once and inject them at runtime.",
        specs: ["Versioned secrets", "Scoped per environment", "Automatic rotation"],
    },
    {
        icon: LuGauge,
        title: "Rate limiting",
        body: "Protect every endpoint with limits per key, per user or per IP.",
        specs: ["Sliding window counters", "Custom 429 responses", "Burst allowances"],
    },
    {
        icon: LuDatabaseBackup,
        title: "Point in time restore",
        body: "Roll a database back to any second in the last 30 days.",
        specs: ["Continuous backups", "Cross region copies", "Restore to a branch"],
    },
    {
        icon: LuGlobe,
        title: "Data residency",
        body: "Pin data to the US, EU or APAC and keep it there.",
        specs: ["9 regions", "No cross border replication", "Per workspace choice"],
    },
    {
        icon: LuBellRing,
        title: "Anomaly alerts",
        body: "Get notified when access patterns change in ways that matter.",
        specs: ["Impossible travel", "Bulk export spikes", "Slack and PagerDuty"],
    },
];

const SpotlightIconGridExample = () => <SpotlightIconGrid features={features}/>;

export default SpotlightIconGridExample;
