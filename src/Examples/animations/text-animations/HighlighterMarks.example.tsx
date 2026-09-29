import {Circled, Highlight, HighlighterMarks, Squiggle, type QuoteAuthor} from "./HighlighterMarks";

const author: QuoteAuthor = {name: "Priya Nair", role: "VP of Product, Fieldnote"};

const HighlighterMarksExample = () => (
    <HighlighterMarks author={author}>
        "We moved every team onto one roadmap and{" "}
        <Highlight delay={0.2}>cut our planning cycle from three weeks to</Highlight>{" "}
        <Circled delay={1.1}>four days</Circled>. Support tickets about missed launches dropped by{" "}
        <Highlight delay={1.7}>38 percent</Highlight> in the{" "}
        <Squiggle delay={2.4}>first quarter</Squiggle>."
    </HighlighterMarks>
);

export default HighlighterMarksExample;
