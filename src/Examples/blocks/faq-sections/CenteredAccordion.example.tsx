import {CenteredAccordion, type AccordionFaq} from "./CenteredAccordion";

const items: AccordionFaq[] = [
    {id: "what", question: "What exactly does Brightpath track?", answer: "Page views, sessions, referrers, devices and any custom events you send. We do not use cookies or fingerprinting, and we never store IP addresses."},
    {id: "banner", question: "Do I still need a cookie banner?", answer: "Not for Brightpath. Because we do not store personal data or set cookies, our analytics are exempt from consent under GDPR, PECR and CCPA. Other tools on your site may still need one."},
    {id: "script", question: "Will the script slow my site down?", answer: "The script is 1.8 kB gzipped and loads asynchronously from a global edge network. It has no measurable effect on Core Web Vitals in our tests on 4,000 customer sites."},
    {id: "limit", question: "What happens if I go over my monthly page views?", answer: "Nothing breaks and we keep counting. If you stay over the limit for two months in a row, we will email you about moving to the next plan."},
    {id: "migrate", question: "Can I import history from my current analytics?", answer: "Yes. Upload a Universal Analytics or GA4 export and we will backfill daily totals for pages, sources and countries going back as far as your data does."},
    {id: "own", question: "Who owns the data?", answer: "You do. Export everything as CSV or through the API at any time, and delete a site with one click. Deleted data is gone from our servers within 30 days."},
];

const CenteredAccordionExample = () => <CenteredAccordion items={items}/>;

export default CenteredAccordionExample;
