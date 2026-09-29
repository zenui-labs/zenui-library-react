import {VerticalImageAccordion, type VerticalAccordionItem} from "./VerticalImageAccordion";

const destinations: VerticalAccordionItem[] = [
    {
        id: "mountain-retreat",
        title: "Mountain Retreat",
        description: "Discover hidden valleys, pristine lakes, and breathtaking peaks. Our mountain retreats offer the perfect balance of adventure and relaxation in nature's embrace.",
        imageUrl: "https://img.freepik.com/free-photo/small-house-built-peaceful-green-hill-high-up-mountains_181624-8241.jpg?w=740",
        accentColor: "#3B82F6",
    },
    {
        id: "beach-paradise",
        title: "Beach Paradise",
        description: "White sand beaches stretch as far as the eye can see, with turquoise waters and spectacular sunsets. An ideal destination for both relaxation and water sports.",
        imageUrl: "https://img.freepik.com/free-photo/sea-beach_1203-3728.jpg?w=740",
        accentColor: "#EAB308",
    },
    {
        id: "forest-adventure",
        title: "Forest Adventure",
        description: "Ancient trees form a canopy overhead as you walk through dappled sunlight. The forest is alive with birdsong and the rustle of wildlife in this untouched natural haven.",
        imageUrl: "https://img.freepik.com/free-photo/wide-shot-person-walking-around-narrow-pathway-middle-trees-plants-forest_181624-5497.jpg?w=740",
        accentColor: "#22C55E",
    },
    {
        id: "desert-expedition",
        title: "Desert Expedition",
        description: "Marvel at the ever-changing landscape of golden dunes sculpted by the wind. By night, the desert transforms into one of the world's best locations for stargazing.",
        imageUrl: "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg?w=740",
        accentColor: "#F97316",
    },
];

const VerticalImageAccordionExample = () => <VerticalImageAccordion items={destinations}/>;

export default VerticalImageAccordionExample;
