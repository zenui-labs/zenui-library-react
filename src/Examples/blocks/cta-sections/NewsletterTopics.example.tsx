import {NewsletterTopics, type NewsletterIssue, type NewsletterTopic} from "./NewsletterTopics";

const topics: NewsletterTopic[] = [
    {id: "pricing", label: "Pricing"},
    {id: "retention", label: "Retention"},
    {id: "analytics", label: "Product analytics"},
    {id: "growth", label: "Growth loops"},
    {id: "hiring", label: "Hiring"},
];

const issues: NewsletterIssue[] = [
    {number: 142, title: "Why annual discounts above 20 percent rarely pay off", minutes: 6},
    {number: 141, title: "The three churn signals we now alert on", minutes: 8},
    {number: 140, title: "Reading a cohort chart without fooling yourself", minutes: 5},
];

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const NewsletterTopicsExample = () => (
    <NewsletterTopics topics={topics} issues={issues} defaultValue={["pricing", "retention"]} onSubmit={subscribe}/>
);

export default NewsletterTopicsExample;
