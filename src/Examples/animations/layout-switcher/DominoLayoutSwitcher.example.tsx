import {DominoLayoutSwitcher, type LayoutSwitcherItem} from "./DominoLayoutSwitcher";

const topics: LayoutSwitcherItem[] = [
    {
        id: "4",
        title: "Blockchain",
        description: "Decentralized, secure transaction systems",
        image: "https://img.freepik.com/free-photo/blockchain-technology-background-gradient-blue_53876-124648.jpg",
    },
    {
        id: "5",
        title: "Biotechnology",
        description: "Engineering biological systems for medical advances",
        image: "https://img.freepik.com/free-vector/flat-design-biotechnology-concept-illustrated_23-2148893192.jpg",
    },
    {
        id: "6",
        title: "Space Exploration",
        description: "Pushing the boundaries of human reach beyond Earth",
        image: "https://img.freepik.com/free-vector/astronaut-space-city_1308-35226.jpg",
    },
];

const DominoLayoutSwitcherExample = () => <DominoLayoutSwitcher items={topics}/>;

export default DominoLayoutSwitcherExample;
