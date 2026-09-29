import {LuCreditCard, LuPlug, LuRocket, LuShieldCheck, LuUsers} from "react-icons/lu";
import {FaqSideNav, type SideNavSection} from "./FaqSideNav";

const sections: SideNavSection[] = [
    {
        id: "getting-started",
        title: "Getting started",
        icon: LuRocket,
        faqs: [
            {question: "How long does setup take?", answer: "Most teams connect their first data source and publish a dashboard in under 20 minutes. Our onboarding checklist walks you through each step."},
            {question: "Do I need to know SQL?", answer: "No. The visual query builder covers filters, joins and aggregations. Analysts who prefer SQL can switch any chart to the editor and back."},
            {question: "Can I try it with sample data?", answer: "Every new workspace includes a sample e-commerce dataset with 18 months of orders, so you can explore before connecting anything."},
        ],
    },
    {
        id: "billing",
        title: "Plans and billing",
        icon: LuCreditCard,
        faqs: [
            {question: "How is pricing calculated?", answer: "By editor seats. Viewers are free and unlimited on every plan, so you can share dashboards with the whole company."},
            {question: "Is there a discount for nonprofits?", answer: "Registered nonprofits and schools get 50% off any annual plan. Email us your registration details to apply."},
            {question: "Can I switch between monthly and annual billing?", answer: "Yes, from the billing page. Switching to annual applies a prorated credit for the unused part of your month."},
        ],
    },
    {
        id: "data",
        title: "Data sources",
        icon: LuPlug,
        faqs: [
            {question: "Which databases can I connect?", answer: "Postgres, MySQL, SQL Server, BigQuery, Snowflake, Redshift and ClickHouse, plus 60 SaaS sources such as Stripe and HubSpot."},
            {question: "Do you copy my data?", answer: "Queries run live against your warehouse by default. Optional caching stores query results, never raw tables, for up to 24 hours."},
            {question: "How often do dashboards refresh?", answer: "As often as every minute on Business plans, or on demand. Each tile shows when its data was last updated."},
        ],
    },
    {
        id: "sharing",
        title: "Sharing and teams",
        icon: LuUsers,
        faqs: [
            {question: "Can I embed dashboards in my app?", answer: "Yes. Signed embed URLs apply row level filters per customer, so each tenant only sees their own numbers."},
            {question: "Can I schedule reports by email?", answer: "Send any dashboard as a PDF or CSV on a schedule, to people inside or outside your workspace."},
        ],
    },
    {
        id: "security",
        title: "Security",
        icon: LuShieldCheck,
        faqs: [
            {question: "Is Chartwell SOC 2 compliant?", answer: "Yes. We hold a SOC 2 Type II report, renewed every year, available from the trust center under NDA."},
            {question: "Can I restrict access by IP?", answer: "Business plans can limit workspace access to a list of IP ranges and require SSO for every member."},
        ],
    },
];

const FaqSideNavExample = () => <FaqSideNav sections={sections}/>;

export default FaqSideNavExample;
