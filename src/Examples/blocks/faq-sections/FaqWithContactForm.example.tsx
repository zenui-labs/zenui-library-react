import {FaqWithContactForm, type ContactFaq, type ContactFormValues, type TeamMember} from "./FaqWithContactForm";

const faqs: ContactFaq[] = [
    {id: "ship", question: "When will my order ship?", answer: "Orders placed before 2 PM Eastern ship the same weekday from our warehouse in Ohio. You get a tracking link by email as soon as the label prints."},
    {id: "returns", question: "What is your return policy?", answer: "Return any unused item within 60 days for a full refund. Start a return from your order page and print the prepaid label. Refunds land 3 to 5 days after we receive the box."},
    {id: "size", question: "How do I pick the right size?", answer: "Each product page has a fit guide measured on the actual garment. If you are between sizes, our fit team suggests going up for outerwear and down for knitwear."},
    {id: "intl", question: "Do you ship internationally?", answer: "We ship to 38 countries. Duties and taxes are calculated at checkout, so there are no surprise fees at delivery."},
    {id: "repair", question: "Do you repair worn items?", answer: "Yes. Send us anything from our workshop line and we will patch, re-stitch or replace zippers for free during the first two years."},
];

const team: TeamMember[] = [
    {initials: "RA", color: "from-rose-400 to-orange-400"},
    {initials: "JK", color: "from-sky-400 to-indigo-500"},
    {initials: "ML", color: "from-emerald-400 to-teal-500"},
];

// Simulated request. Addresses at example.com fail, so the error state can be tried.
const sendQuestion = (values: ContactFormValues) =>
    new Promise<void>((resolve, reject) => {
        window.setTimeout(() => {
            if (values.email.endsWith("@example.com")) reject(new Error("Could not send"));
            else resolve();
        }, 1200);
    });

const FaqWithContactFormExample = () => <FaqWithContactForm faqs={faqs} team={team} onSubmit={sendQuestion}/>;

export default FaqWithContactFormExample;
