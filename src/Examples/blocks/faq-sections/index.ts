import type {Example} from "../../types.ts";
import FaqSection from "./FaqSection.example.tsx";
import faqSectionSource from "./FaqSection.example.tsx?raw";
import CenteredAccordion from "./CenteredAccordion.example.tsx";
import centeredAccordionSource from "./CenteredAccordion.example.tsx?raw";
import FaqCardGrid from "./FaqCardGrid.example.tsx";
import faqCardGridSource from "./FaqCardGrid.example.tsx?raw";
import FaqWithContactForm from "./FaqWithContactForm.example.tsx";
import faqWithContactFormSource from "./FaqWithContactForm.example.tsx?raw";
import FaqSideNav from "./FaqSideNav.example.tsx";
import faqSideNavSource from "./FaqSideNav.example.tsx?raw";
import HelpCenterSearch from "./HelpCenterSearch.example.tsx";
import helpCenterSearchSource from "./HelpCenterSearch.example.tsx?raw";
import ConversationalFaq from "./ConversationalFaq.example.tsx";
import conversationalFaqSource from "./ConversationalFaq.example.tsx?raw";

const examples: Example[] = [
    {
        id: "faq-with-topics",
        title: "FAQ with topics and search",
        description: "An accordion FAQ grouped by topic, with search across every answer and a support card below. Use it on pricing or help pages with more than a handful of questions.",
        component: FaqSection,
        source: faqSectionSource,
        layout: "full",
        minHeight: 640,
    },
    {
        id: "centered-accordion",
        title: "Centered accordion",
        description: "A single column of questions that can open together, with an expand all toggle and arrow key navigation. Use it for a short FAQ at the bottom of a landing page.",
        component: CenteredAccordion,
        source: centeredAccordionSource,
        layout: "full",
        minHeight: 720,
    },
    {
        id: "faq-card-grid",
        title: "Q&A card grid",
        description: "Topic cards with every answer visible and quick links to each topic. Use it when answers are short and readers should be able to scan without clicking.",
        component: FaqCardGrid,
        source: faqCardGridSource,
        layout: "full",
        minHeight: 820,
    },
    {
        id: "faq-with-contact-form",
        title: "FAQ with contact form",
        description: "An accordion next to a contact card with validation, a sending state, and success and error messages. Use it on support and order help pages where the next step is asking a person.",
        component: FaqWithContactForm,
        source: faqWithContactFormSource,
        layout: "full",
        minHeight: 680,
    },
    {
        id: "faq-side-nav",
        title: "FAQ with side navigation",
        description: "A long FAQ split into sections, with a navigation list that tracks the section in view and scrolls to any topic. Use it for a dedicated FAQ page with many questions.",
        component: FaqSideNav,
        source: faqSideNavSource,
        layout: "full",
        minHeight: 900,
    },
    {
        id: "help-center-search",
        title: "Help center search",
        description: "A help center hero with an accessible search combobox, highlighted matches, category cards and popular articles. Use it as the front page of a knowledge base.",
        component: HelpCenterSearch,
        source: helpCenterSearchSource,
        layout: "full",
        minHeight: 920,
    },
    {
        id: "conversational-faq",
        title: "Conversational FAQ",
        description: "Suggested questions that play out as a chat, with a typing indicator and a restart button. Use it for consumer products where a friendly, guided tone fits the brand.",
        component: ConversationalFaq,
        source: conversationalFaqSource,
        layout: "full",
        minHeight: 640,
    },
];

export default examples;
