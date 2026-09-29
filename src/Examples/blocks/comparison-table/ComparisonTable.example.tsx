import {ComparisonTable, type ComparisonGroup, type ComparisonPlan} from "./ComparisonTable";

const plans: ComparisonPlan[] = [
    {id: "starter", name: "Starter", tagline: "For side projects", monthly: 0, yearly: 0, cta: "Start for free"},
    {id: "team", name: "Team", tagline: "For growing teams", monthly: 12, yearly: 10, cta: "Start trial", featured: true},
    {id: "business", name: "Business", tagline: "For regulated companies", monthly: null, yearly: null, cta: "Contact sales"},
];

const groups: ComparisonGroup[] = [
    {
        name: "Workspace",
        rows: [
            {name: "Members", values: {starter: "Up to 5", team: "Unlimited", business: "Unlimited"}},
            {name: "Projects", values: {starter: "3", team: "Unlimited", business: "Unlimited"}},
            {name: "File storage", values: {starter: "2 GB", team: "100 GB per seat", business: "Unlimited"}},
            {name: "Guest access", values: {starter: false, team: true, business: true}},
        ],
    },
    {
        name: "Automation",
        rows: [
            {name: "Workflow rules", values: {starter: "10 a month", team: "5,000 a month", business: "Unlimited"}},
            {name: "API access", values: {starter: true, team: true, business: true}},
            {name: "Custom fields", values: {starter: false, team: true, business: true}},
        ],
    },
    {
        name: "Security",
        rows: [
            {name: "SAML single sign-on", values: {starter: false, team: false, business: true}},
            {name: "Audit log", values: {starter: false, team: "30 days", business: "Unlimited"}},
            {name: "Data residency", values: {starter: false, team: false, business: true}},
        ],
    },
    {
        name: "Support",
        rows: [
            {name: "Response time", values: {starter: "Community", team: "1 business day", business: "4 hours"}},
            {name: "Dedicated manager", values: {starter: false, team: false, business: true}},
        ],
    },
];

const ComparisonTableExample = () => <ComparisonTable plans={plans} groups={groups}/>;

export default ComparisonTableExample;
