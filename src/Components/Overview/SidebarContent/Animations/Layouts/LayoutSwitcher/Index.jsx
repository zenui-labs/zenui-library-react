import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {
    GridSwitcherContents
} from "@utils/ContentsConfig/AnimationContents/LayoutContents.js";
import WaveTransitionExample from "./WaveTransitionExample.jsx";
import DominoTransitionExample from "./DominoTransitionExample.jsx";

const Index = () => {
    const sectionIds = GridSwitcherContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [waveLayoutSwitcherPreview, setWaveLayoutSwitcherPreview] = useState(true);
    const [waveLayoutSwitcherCode, setWaveLayoutSwitcherCode] = useState(false);

    const [dominoLayoutSwitcherPreview, setDominoLayoutSwitcherPreview] = useState(true);
    const [dominoLayoutSwitcherCode, setDominoLayoutSwitcherCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"wave layout switcher"} id={"wave-layout-switcher"}/>

                <ComponentDescription
                    text='Wave layout switcher toggles between layouts with a smooth, wave-like transition effect for a dynamic UI experience.'/>

                <ToggleTab setCode={setWaveLayoutSwitcherCode} code={waveLayoutSwitcherCode}
                           setPreview={setWaveLayoutSwitcherPreview} preview={waveLayoutSwitcherPreview}/>

                <ComponentWrapper>
                    {waveLayoutSwitcherPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <WaveTransitionExample/>
                        </div>
                    )}

                    {waveLayoutSwitcherCode &&
                        <ShowCode code='
import {useState} from "react";
import {motion} from "framer-motion";

const items = [
    {
        id: "1",
        title: "Quantum Computing",
        description: "Breaking computational barriers with quantum mechanics",
        color: "bg-blue-500",
        image: "https://img.freepik.com/free-vector/creative-abstract-quantum-illustration_23-2149226910.jpg",
    },
    {
        id: "2",
        title: "Neural Networks",
        description: "Mimicking brain function for advanced AI systems",
        color: "bg-green-500",
        image: "https://img.freepik.com/free-photo/abstract-futuristic-digital-technology-background_53876-104787.jpg",
    },
    {
        id: "3",
        title: "Augmented Reality",
        description: "Blending digital and physical worlds seamlessly",
        color: "bg-yellow-500",
        image: "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg",
    },
];

const WaveTransition = () => {
    const [isGrid, setIsGrid] = useState(false);

    const toggleView = () => setIsGrid(!isGrid);

    return (
        <div className="w-full">
            <div className="flex justify-end items-end mb-10">
                <button
                    onClick={toggleView}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isGrid ? "Switch to List" : "Switch to Grid"}
                </button>
            </div>

            <div className={isGrid ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"}>
                {items.map((item, i) => {
                    const waveDelay = isGrid
                        ? (i % 3) * 0.1 + Math.floor(i / 3) * 0.1
                        : i * 0.1;

                    return (
                        <motion.div
                            key={item.id}
                            layout
                            initial={false}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [1, 0.5, 1],
                                scale: [1, 0.95, 1],
                                transition: {
                                    duration: 0.6,
                                    times: [0, 0.5, 1],
                                    delay: waveDelay,
                                }
                            }}
                            className={`rounded-md dark:bg-slate-800 bg-gray-100 overflow-hidden`}
                        >
                            <motion.div
                                layout
                                className={`${isGrid ? "p-5" : "p-4 flex items-center"}`}
                                transition={{type: "spring", stiffness: 300, damping: 25, delay: waveDelay + 0.3}}
                            >
                                <motion.img
                                    layout
                                    src={item.image}
                                    alt={item.title}
                                    className={`rounded-lg ${isGrid ? "w-full h-[200px] md:h-[280px] mb-5" : "w-24 h-24 mr-4 flex-shrink-0 object-cover"}`}
                                />
                                <div>
                                    <motion.h3 layout
                                               className={`${isGrid ? "text-[1.4rem]" : "text-[1.1rem]"} font-bold text-gray-800 dark:text-[#d2e5f5]`}>{item.title}</motion.h3>
                                    <motion.p layout
                                              className="text-gray-500 dark:text-[#abc2d3]/80 mt-1">{item.description}</motion.p>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default WaveTransition;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"domino layout switcher"} id={"domino-layout-switcher"}/>
                </div>

                <ComponentDescription
                    text='Domino layout switcher changes layouts with a cascading, domino-like animation effect, creating a sequential and smooth transition.'/>

                <ToggleTab setCode={setDominoLayoutSwitcherCode} code={dominoLayoutSwitcherCode}
                           setPreview={setDominoLayoutSwitcherPreview} preview={dominoLayoutSwitcherPreview}/>

                <ComponentWrapper>
                    {dominoLayoutSwitcherPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <DominoTransitionExample/>
                        </div>
                    )}

                    {dominoLayoutSwitcherCode &&
                        <ShowCode code='
import {useState} from "react";
import {motion} from "framer-motion";

const items = [
    {
        id: "4",
        title: "Blockchain",
        description: "Decentralized, secure transaction systems",
        color: "bg-pink-500",
        image: "https://img.freepik.com/free-photo/blockchain-technology-background-gradient-blue_53876-124648.jpg",
    },
    {
        id: "5",
        title: "Biotechnology",
        description: "Engineering biological systems for medical advances",
        color: "bg-purple-500",
        image: "https://img.freepik.com/free-vector/flat-design-biotechnology-concept-illustrated_23-2148893192.jpg",
    },
    {
        id: "6",
        title: "Space Exploration",
        description: "Pushing the boundaries of human reach beyond Earth",
        color: "bg-red-500",
        image: "https://img.freepik.com/free-vector/astronaut-space-city_1308-35226.jpg",
    },
];

const DominoTransition = () => {
    const [isGrid, setIsGrid] = useState(false);

    const toggleView = () => setIsGrid(!isGrid);

    return (
        <div className="w-full">
            <div className="flex justify-end items-end mb-10">
                <button
                    onClick={toggleView}
                    className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                    {isGrid ? "Switch to List" : "Switch to Grid"}
                </button>
            </div>

            <div className={isGrid ? "grid grid-cols-1 md:grid-cols-3 gap-6" : "space-y-6"}>
                {items.map((item, i) => (
                    <motion.div
                        key={item.id}
                        layout
                        initial={false}
                        animate={{
                            rotateY: [0, isGrid ? 90 : -90, 0],
                            transition: {
                                duration: 0.8,
                                times: [0, 0.5, 1],
                                delay: isGrid ? i * 0.15 : (items.length - i - 1) * 0.15,
                            }
                        }}
                        className={`rounded-md bg-gray-100 dark:bg-slate-800 overflow-hidden transform-gpu`}
                        style={{transformOrigin: isGrid ? "left center" : "right center"}}
                    >
                        <motion.div
                            layout
                            className={`${isGrid ? "p-5" : "p-4 flex items-center"}`}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                delay: isGrid ? (i * 0.15) + 0.4 : ((items.length - i - 1) * 0.15) + 0.4
                            }}
                        >
                            <motion.img
                                layout
                                src={item.image}
                                alt={item.title}
                                className={`rounded-lg ${isGrid ? "w-full h-[200px] md:h-[280px] mb-5" : "w-24 h-24 mr-4 flex-shrink-0 object-cover"}`}
                            />
                            <div>
                                <motion.h3 layout
                                           className={`${isGrid ? "text-[1.4rem]" : "text-[1.1rem]"} font-bold text-gray-800 dark:text-[#d2e5f5]`}>{item.title}</motion.h3>
                                <motion.p layout
                                          className="text-gray-500 mt-1 dark:text-[#abc2d3]/80">{item.description}</motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DominoTransition;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/sorting-animation' backName='sorting animation'
                                forwardUrl='/animations/drag-animations' forwardName='drag animations'/>
            </div>

            <ContentNavbar contents={GridSwitcherContents} activeSection={activeSection}/>

            <Helmet>
                <title>Layouts - Layout Switcher</title>
            </Helmet>
        </aside>
    );
};

export default Index;
