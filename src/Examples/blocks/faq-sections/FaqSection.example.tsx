import {FaqSection, type FaqEntry} from "./FaqSection";

const questions: FaqEntry[] = [
    {id: "trial", topic: "General", question: "How long is the free trial?", answer: "Every workspace gets 14 days on the Team plan with all features turned on. We do not ask for a card until you decide to stay."},
    {id: "seats", topic: "General", question: "Who counts as a seat?", answer: "Anyone who can edit or assign work. Viewers, guests and API tokens are free and do not count toward your plan."},
    {id: "import", topic: "General", question: "Can I import from another tool?", answer: "Yes. We import projects, issues, comments and attachments from CSV and from most issue trackers. Large imports run in the background and email you when they finish."},
    {id: "change-plan", topic: "Billing", question: "What happens when I change plans mid-cycle?", answer: "Upgrades take effect right away and you pay the prorated difference. Downgrades apply at the end of the current billing period."},
    {id: "invoices", topic: "Billing", question: "Can I pay by invoice?", answer: "Annual plans with 25 seats or more can pay by bank transfer on net 30 terms. Contact sales and we will set it up."},
    {id: "refunds", topic: "Billing", question: "Do you offer refunds?", answer: "If you cancel within 30 days of an annual payment, we refund the unused months in full."},
    {id: "sso", topic: "Security", question: "Do you support SSO and SCIM?", answer: "SAML SSO is available on the Business plan. SCIM provisioning works with the major identity providers and removes access within a minute of offboarding."},
    {id: "data", topic: "Security", question: "Where is my data stored?", answer: "In the United States by default. Business customers can choose the EU region, and data never leaves the selected region."},
    {id: "soc2", topic: "Security", question: "Are you SOC 2 compliant?", answer: "Yes. We complete a SOC 2 Type II audit every year and share the report under NDA from the trust center."},
    {id: "api", topic: "Integrations", question: "Is there a public API?", answer: "A REST and GraphQL API covers everything you can do in the app. Rate limits start at 1,000 requests per minute per workspace."},
    {id: "webhooks", topic: "Integrations", question: "How do webhooks retry?", answer: "Failed deliveries retry with exponential backoff for up to 24 hours. You can replay any event from the last 30 days in the dashboard."},
];

const FaqSectionExample = () => <FaqSection questions={questions}/>;

export default FaqSectionExample;
