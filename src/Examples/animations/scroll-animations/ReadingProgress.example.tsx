import {ReadingProgress, type ArticleSection} from "./ReadingProgress";

const sections: ArticleSection[] = [
    {
        heading: "Start with the smallest useful release",
        paragraphs: [
            "When our team rebuilt the checkout, the first version we shipped supported one currency, one payment method and no coupons. It went to 5 percent of traffic on a Tuesday morning.",
            "That release taught us more in a week than the previous two months of planning. Conversion held steady, but support tickets about address validation doubled within a day.",
        ],
    },
    {
        heading: "Measure the thing people feel",
        paragraphs: [
            "Page load time looked fine on our dashboards. What customers felt was the 1.8 seconds between pressing Pay and seeing a confirmation, so that became the number we tracked.",
            "We moved fraud checks after the confirmation screen and sent receipts from a queue. The wait dropped to 400 ms and abandoned payments fell by a third.",
        ],
    },
    {
        heading: "Keep the old path until the new one wins",
        paragraphs: [
            "Both checkouts ran side by side for six weeks behind a flag. Every Friday we compared refunds, disputes and completion rates before moving another 10 percent of traffic.",
            "When the new flow finally reached everyone, deleting the old one took a single pull request, because nothing else depended on it anymore.",
        ],
    },
];

const ReadingProgressExample = () => (
    <ReadingProgress
        sections={sections}
        title="How we rebuilt checkout"
        headline="How we rebuilt checkout without a freeze"
        category="Engineering"
        byline="Marcus Lee, Staff engineer"
        readingMinutes={6}
    />
);

export default ReadingProgressExample;
