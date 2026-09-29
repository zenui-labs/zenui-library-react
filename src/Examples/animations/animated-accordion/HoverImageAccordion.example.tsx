import {HoverImageAccordion, type HoverAccordionItem} from "./HoverImageAccordion";

const destinations: HoverAccordionItem[] = [
    {
        id: "mountain-retreat",
        title: "Mountain Retreat",
        description: "Escape to the serene mountain landscapes with breathtaking views and adventure trails.",
        imageUrl: "https://img.freepik.com/free-photo/small-house-built-peaceful-green-hill-high-up-mountains_181624-8241.jpg",
    },
    {
        id: "beach-paradise",
        title: "Beach Paradise",
        description: "Relax on pristine beaches with crystal clear waters and golden sands.",
        imageUrl: "https://img.freepik.com/free-photo/sea-beach_1203-3728.jpg",
    },
    {
        id: "forest-adventure",
        title: "Forest Adventure",
        description: "Explore dense forests with diverse wildlife and lush greenery.",
        imageUrl: "https://img.freepik.com/free-photo/wide-shot-person-walking-around-narrow-pathway-middle-trees-plants-forest_181624-5497.jpg",
    },
    {
        id: "desert-expedition",
        title: "Desert Expedition",
        description: "Experience the vast expanse of sand dunes and golden sunsets.",
        imageUrl: "https://img.freepik.com/free-photo/woman-wearing-hijab-desert_23-2149197951.jpg",
    },
];

const HoverImageAccordionExample = () => <HoverImageAccordion items={destinations}/>;

export default HoverImageAccordionExample;
