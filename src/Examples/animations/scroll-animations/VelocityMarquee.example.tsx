import {VelocityMarquee, type MarqueeNote} from "./VelocityMarquee";

const notes: MarqueeNote[] = [
    {date: "Sep 24", title: "Variable fonts in the type scale", body: "Headings now use one variable file instead of four static weights, which saved 180 KB on first load."},
    {date: "Sep 17", title: "Motion tokens", body: "Durations and easings live next to colors and spacing, so product teams stop inventing their own curves."},
    {date: "Sep 10", title: "Dark mode audit", body: "We checked 212 screens and fixed 38 places where borders disappeared on dark surfaces."},
    {date: "Sep 03", title: "Icon refresh", body: "All 640 icons moved to a 1.5 px stroke to match the new type weight at small sizes."},
    {date: "Aug 27", title: "Accessible focus rings", body: "Every interactive component now shows a two color focus ring that passes contrast on any background."},
];

const VelocityMarqueeExample = () => (
    <VelocityMarquee
        notes={notes}
        primaryWords={["Design systems", "Motion", "Typography", "Accessibility", "Tokens"]}
        accentWords={["Weekly notes", "Changelog", "Component audits", "Office hours"]}
        ariaLabel="Design system notes, scroll to read"
    />
);

export default VelocityMarqueeExample;
