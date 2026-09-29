import {ScrollWordReveal} from "./ScrollWordReveal";

const manifesto =
    "We believe software should feel calm. Fewer settings, clearer defaults and interfaces that get out of the way. Every feature we ship has to earn its place, and every screen has to answer one question well. That is how a tool becomes something people trust with their work.";

const ScrollWordRevealExample = () => (
    <ScrollWordReveal
        text={manifesto}
        highlightWords={["calm.", "earn", "trust"]}
        attribution="Linnea Holm and Daniel Osei, founders of Stillwater"
    />
);

export default ScrollWordRevealExample;
