import {AuroraPromptCard} from "./AuroraPromptCard";

const suggestions: string[] = [
    "Summarize this week's support tickets",
    "Which experiments shipped in September",
    "Draft a reply to the Acme renewal email",
];

const answers: Record<string, string> = {
    [suggestions[0]]: "212 tickets this week, down 9%. Most were about invoice downloads after Tuesday's release. Refund requests stayed flat, and median first reply time was 38 minutes.",
    [suggestions[1]]: "Four experiments shipped: one-page checkout, the annual plan nudge, saved carts for guests and the new search ranking. One-page checkout had the largest lift at 4.2%.",
    [suggestions[2]]: "Hi Dana, thanks for the note. We can hold your current per-seat price for the renewal if you confirm 40 seats by October 15. Happy to walk through the new admin features on a call.",
};

const fallback = "I searched 1,284 documents in the Northwind workspace and pinned the three most relevant to the top of your results.";

// Stands in for a request to your assistant API.
const ask = (question: string) =>
    new Promise<string>((resolve) => window.setTimeout(() => resolve(answers[question] ?? fallback), 1400));

const AuroraPromptCardExample = () => (
    <AuroraPromptCard onAsk={ask} suggestions={suggestions} context="Northwind workspace"/>
);

export default AuroraPromptCardExample;
