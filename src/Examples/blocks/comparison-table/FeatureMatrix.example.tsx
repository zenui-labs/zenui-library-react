import {FeatureMatrix, type MatrixGroup, type MatrixPlan} from "./FeatureMatrix";

const plans: MatrixPlan[] = [
    {id: "free", name: "Free", price: "$0", cta: "Start free"},
    {id: "growth", name: "Growth", price: "$79"},
    {id: "scale", name: "Scale", price: "$349", featured: true},
    {id: "enterprise", name: "Enterprise", price: "Custom", cta: "Contact sales"},
];

const groups: MatrixGroup[] = [
    {
        id: "collect",
        name: "Data collection",
        features: [
            {name: "Tracked events", hint: "Events sent from your apps and servers each month. Extra events are billed at $0.20 per 1,000.", values: {free: "1M", growth: "10M", scale: "100M", enterprise: "Custom"}},
            {name: "Data sources", hint: "SDKs, warehouse syncs and webhooks that feed events into a project.", values: {free: "2", growth: "10", scale: "Unlimited", enterprise: "Unlimited"}},
            {name: "Warehouse sync", hint: "Two-way sync with Snowflake, BigQuery and Redshift, every 15 minutes.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "Data retention", hint: "How long raw events stay queryable. Aggregates are kept for the life of the project.", values: {free: "90 days", growth: "2 years", scale: "5 years", enterprise: "Custom"}},
        ],
    },
    {
        id: "analyze",
        name: "Analysis",
        features: [
            {name: "Funnels and retention", hint: "Conversion funnels, retention curves and cohort tables on any event.", values: {free: true, growth: true, scale: true, enterprise: true}},
            {name: "Saved reports", hint: "Reports you can pin to dashboards and share with a link.", values: {free: "10", growth: "Unlimited", scale: "Unlimited", enterprise: "Unlimited"}},
            {name: "Experiment analysis", hint: "Significance testing for A/B tests with sequential stopping rules.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "SQL workspace", hint: "Query raw events with SQL and turn results into charts.", values: {free: false, growth: false, scale: true, enterprise: true}},
        ],
    },
    {
        id: "govern",
        name: "Governance",
        features: [
            {name: "Roles and permissions", hint: "Viewer, analyst and admin roles, with project-level access.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "SAML single sign-on", hint: "Sign in through Okta, Entra ID or Google Workspace, with enforced SSO.", values: {free: false, growth: false, scale: true, enterprise: true}},
            {name: "Data residency", hint: "Store and process events only in the EU or US region you choose.", values: {free: false, growth: false, scale: false, enterprise: true}},
        ],
    },
    {
        id: "support",
        name: "Support",
        features: [
            {name: "Support channel", hint: "Where you reach us and how fast we answer on business days.", values: {free: "Community", growth: "Email, 1 day", scale: "Chat, 4 hours", enterprise: "Phone, 1 hour"}},
            {name: "Onboarding", hint: "Help with tracking plans, instrumentation reviews and first dashboards.", values: {free: false, growth: "Guides", scale: "2 sessions", enterprise: "Dedicated team"}},
        ],
    },
];

const FeatureMatrixExample = () => (
    <FeatureMatrix
        plans={plans}
        groups={groups}
        title="Every Northstar feature, by plan"
        caption="Northstar features by plan"
    />
);

export default FeatureMatrixExample;
