import {WaveLayoutSwitcher, type LayoutSwitcherItem} from "./WaveLayoutSwitcher";

const topics: LayoutSwitcherItem[] = [
    {
        id: "1",
        title: "Quantum Computing",
        description: "Breaking computational barriers with quantum mechanics",
        image: "https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149226910.jpg",
    },
    {
        id: "2",
        title: "Neural Networks",
        description: "Mimicking brain function for advanced AI systems",
        image: "https://img.freepik.com/free-photo/abstract-futuristic-digital-technology-background_53876-104787.jpg",
    },
    {
        id: "3",
        title: "Augmented Reality",
        description: "Blending digital and physical worlds in real time",
        image: "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg",
    },
];

const WaveLayoutSwitcherExample = () => <WaveLayoutSwitcher items={topics}/>;

export default WaveLayoutSwitcherExample;
