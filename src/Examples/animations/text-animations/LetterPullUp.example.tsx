import {LetterPullUp, type PullUpLine} from "./LetterPullUp";

const lines: PullUpLine[] = [
    {text: "Design at the"},
    {text: "speed of thought", accent: true},
];

const LetterPullUpExample = () => (
    <LetterPullUp
        eyebrow="Canvas studio"
        lines={lines}
        description="Sketch, prototype and hand off from one shared canvas. Used by 4,800 product teams."
    />
);

export default LetterPullUpExample;
