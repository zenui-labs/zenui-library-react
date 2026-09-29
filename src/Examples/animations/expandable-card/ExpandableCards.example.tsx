import {ExpandableCards, type Talk} from "./ExpandableCards";

const talks: Talk[] = [
    {
        id: "motion",
        title: "Motion that explains itself",
        speaker: "Priya Raman",
        role: "Design lead, Linearity",
        duration: "24 min",
        artwork: "from-indigo-500 via-violet-500 to-fuchsia-500",
        summary: "How to use timing and easing to show where things come from and where they go, without slowing people down.",
        chapters: ["Why most transitions feel slow", "Choosing an easing curve", "Motion for loading states"],
    },
    {
        id: "tokens",
        title: "Design tokens at scale",
        speaker: "Marcus Lee",
        role: "Staff engineer, Fieldwork",
        duration: "31 min",
        artwork: "from-emerald-400 via-teal-500 to-cyan-600",
        summary: "Lessons from moving 40 products to one token set, including naming, theming and the migration plan.",
        chapters: ["Naming that survives rebrands", "Light and dark from one source", "Rolling out without a freeze"],
    },
    {
        id: "forms",
        title: "Forms people finish",
        speaker: "Ana Ortiz",
        role: "Researcher, Checkpoint",
        duration: "18 min",
        artwork: "from-amber-400 via-orange-500 to-rose-500",
        summary: "What 1,200 recorded sessions taught us about validation, error messages and when to ask for less.",
        chapters: ["Inline errors that help", "Fewer fields, same data", "Testing with real users"],
    },
];

const ExpandableCardsExample = () => <ExpandableCards items={talks}/>;

export default ExpandableCardsExample;
