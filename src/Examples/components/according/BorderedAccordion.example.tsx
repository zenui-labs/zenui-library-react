import {BorderedAccordion, type AccordionItem} from "./BorderedAccordion";

const items: AccordionItem[] = [
    {
        id: "wireframing",
        title: "What is the purpose of wireframing in design?",
        content: "Wireframing outlines the basic structure and layout of a design, serving as a visual guide before detailed development.",
    },
    {
        id: "user-centered-design",
        title: "Why is user-centered design important?",
        content: "User-centered design ensures products meet the needs and preferences of the end users, improving usability and satisfaction.",
    },
    {
        id: "contrast",
        title: "What role does contrast play in graphic design?",
        content: "Contrast in graphic design emphasizes differences, making elements stand out and improving visual hierarchy.",
    },
    {
        id: "responsive-design",
        title: "What does responsive design mean in web development?",
        content: "Responsive design lets web pages adapt to different screen sizes, so the layout works well on every device.",
    },
    {
        id: "color-theory",
        title: "What is the significance of color theory in design?",
        content: "Color theory guides how colors are chosen and combined to set a mood, improve readability and create a clear, balanced design.",
    },
];

const BorderedAccordionExample = () => <BorderedAccordion items={items}/>;

export default BorderedAccordionExample;
