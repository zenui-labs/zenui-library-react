import {StaggeredTextAccordion, type StaggeredTextAccordionItem} from "./StaggeredTextAccordion";

const topics: StaggeredTextAccordionItem[] = [
    {
        id: "cloud-computing",
        title: "Cloud Computing",
        content: "Cloud computing provides on-demand availability of computer system resources without direct active management by the user. It enables global access to shared pools of configurable resources.",
        barGradient: "from-blue-400 to-cyan-300",
    },
    {
        id: "internet-of-things",
        title: "Internet of Things",
        content: "IoT describes physical objects with sensors, processing ability, and software that connect and exchange data with other devices over the Internet, linking the physical and digital worlds.",
        barGradient: "from-green-400 to-emerald-300",
    },
    {
        id: "augmented-reality",
        title: "Augmented Reality",
        content: "Augmented reality overlays digital content onto the real world, enhancing users' perception of their surroundings with computer-generated information across multiple sensory modalities.",
        barGradient: "from-amber-400 to-yellow-300",
    },
    {
        id: "bioinformatics",
        title: "Bioinformatics",
        content: "Bioinformatics combines biology, computer science, and statistics to analyze and interpret biological data, particularly when dealing with large genomic datasets.",
        barGradient: "from-purple-400 to-pink-300",
    },
];

const StaggeredTextAccordionExample = () => <StaggeredTextAccordion items={topics}/>;

export default StaggeredTextAccordionExample;
