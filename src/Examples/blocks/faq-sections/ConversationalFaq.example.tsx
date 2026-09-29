import {ConversationalFaq, type ChatFaq} from "./ConversationalFaq";

const faqs: ChatFaq[] = [
    {id: "cancel", question: "Can I skip a week or cancel?", answer: "Yes, any time before Wednesday at noon for the following week. Skipping is one tap in the app, and cancelling takes two. There is no fee for either."},
    {id: "allergies", question: "How do you handle allergies?", answer: "Set allergies in your profile and we hide every recipe that contains them. Our kitchen handles nuts and gluten, so we label each kit with the facilities it passed through."},
    {id: "portions", question: "How big are the portions?", answer: "Each serving is 550 to 750 calories. Choose 2 or 4 servings per recipe, and switch between them from week to week."},
    {id: "packaging", question: "Is the packaging recyclable?", answer: "92% of it by weight. Ice packs are filled with plant based gel that you can pour down the drain, and the insulation is compostable."},
    {id: "delivery", question: "What if I am not home for delivery?", answer: "Boxes stay cold for up to 48 hours. Add delivery notes, such as a side door or a building code, from your account page."},
];

const ConversationalFaqExample = () => <ConversationalFaq faqs={faqs}/>;

export default ConversationalFaqExample;
