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
    MagnetCardContents
} from "@utils/ContentsConfig/AnimationContents/CardContents.js";
import BasicMagnetCardExample from "./BasicMagnetCardExample.jsx";
import ThreedMagnetCardExample from "./3dMagnetCardExample.jsx";

const Index = () => {
    const sectionIds = MagnetCardContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [basicMagnetCardPreview, setBasicMagnetCardPreview] = useState(true);
    const [basicMagnetCardCode, setBasicMagnetCardCode] = useState(false);

    const [threeDMagnetCardPreview, setThreeDMagnetCardPreview] = useState(true);
    const [threeDMagnetCardCode, setThreeDMagnetCardCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Basic magnet card"} id={"basic-magnet-card"}/>

                <ComponentDescription
                    text='A simple magnetic effect card that reacts subtly on hover to enhance user interaction.'/>

                <ToggleTab setCode={setBasicMagnetCardCode} code={basicMagnetCardCode}
                           setPreview={setBasicMagnetCardPreview} preview={basicMagnetCardPreview}/>

                <ComponentWrapper>
                    {basicMagnetCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BasicMagnetCardExample/>
                        </div>
                    )}

                    {basicMagnetCardCode &&
                        <ShowCode code='
import {useRef, useState} from "react";
import {motion} from "framer-motion";

const BasicMagnetCard = () => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isHovered, setIsHovered] = useState(false);

    const magnetStrength = 15;
    const rotationFactor = 0.8;
    const scaleFactor = 1.01;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const {clientX, clientY} = e;
        const {left, top, width, height} = cardRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) / (width / 2);
        const y = (clientY - centerY) / (height / 2);

        setPosition({
            x: x * magnetStrength,
            y: y * magnetStrength,
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({x: 0, y: 0});
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-full md:w-[70%] p-5 rounded-xl border border-[#e5eaf2] dark:border-white/20 bg-white dark:bg-white/10 backdrop-blur-lg shadow-[2px_1px_10px_rgba(0,0,0,0.1)] cursor-pointer overflow-hidden transition-colors"
            animate={{
                x: position.x,
                y: position.y,
                rotateX: position.y * rotationFactor,
                rotateY: position.x * -rotationFactor,
                scale: isHovered ? scaleFactor : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
                mass: 1,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            {/* Project Image */}
            <div className="w-full h-40 rounded-xl shadow-[0px_2px_6px_rgba(0,0,0,0.05)] overflow-hidden mb-4">
                <img
                    src="https://i.ibb.co/3Sg4Zrg/Screenshot-2.png"
                    alt="Project Thumbnail"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Project Info */}
            <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">ZenUI Component Library</h3>
            <p className="text-sm opacity-80 mb-4 text-gray-600 dark:text-white/80">
                A modern and flexible React UI library built with accessibility and dev experience in mind.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 text-xs mb-6">
        <span className="bg-gray-100 text-gray-800 dark:bg-white/20 dark:text-white px-3 py-1 rounded-full">
          React
        </span>
                <span className="bg-gray-100 text-gray-800 dark:bg-white/20 dark:text-white px-3 py-1 rounded-full">
          Tailwind CSS
        </span>
                <span className="bg-gray-100 text-gray-800 dark:bg-white/20 dark:text-white px-3 py-1 rounded-full">
          Framer Motion
        </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
                <a
                    href="https://yourliveproject.com"
                    target="_blank"
                    className="flex-1 py-2 text-center bg-primary hover:bg-[#3B9DF8]/90 text-white rounded-lg text-sm font-medium transition"
                >
                    Live Preview
                </a>
                <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    className="flex-1 py-2 text-center border border-[#3B9DF8] hover:bg-indigo-50 text-[#3B9DF8] dark:hover:bg-white/10 dark:text-white dark:border-white/30 rounded-lg text-sm font-medium transition"
                >
                    Code
                </a>
            </div>

            {/* Glow effect */}
            <motion.div
                className="absolute inset-0 rounded-inherit"
                animate={{
                    opacity: isHovered ? 0.1 : 0,
                    background: isHovered
                        ? `radial-gradient(circle at ${50 + position.x / 2}% ${50 + position.y / 2}%, rgba(255,255,255,0.2), transparent 40%)`
                        : "none",
                }}
                transition={{duration: 0.3}}
            />
        </motion.div>
    );
};

export default BasicMagnetCard;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d magnet Card"} id={"3d-magnet-card"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setThreeDMagnetCardCode} code={threeDMagnetCardCode}
                           setPreview={setThreeDMagnetCardPreview} preview={threeDMagnetCardPreview}/>

                <ComponentWrapper>
                    {threeDMagnetCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreedMagnetCardExample/>
                        </div>
                    )}

                    {threeDMagnetCardCode &&
                        <ShowCode code='
import {useRef, useState} from "react";
import {motion} from "framer-motion";

const ThreedMagnetCardExample = () => {
    const cardRef = useRef(null);
    const [position, setPosition] = useState({x: 0, y: 0});
    const [isHovered, setIsHovered] = useState(false);

    const magnetStrength = 35;
    const rotationFactor = 1;
    const scaleFactor = 1.05;

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;

        const {clientX, clientY} = e;
        const {left, top, width, height} = cardRef.current.getBoundingClientRect();

        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const x = (clientX - centerX) / (width / 2);
        const y = (clientY - centerY) / (height / 2);

        setPosition({
            x: x * magnetStrength,
            y: y * magnetStrength,
        });
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setPosition({x: 0, y: 0});
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    return (
        <motion.div
            ref={cardRef}
            className="relative w-full md:w-96 cursor-pointer dark:bg-slate-900 dark:border-slate-700 rounded-md bg-white shadow-[2px_1px_15px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-200"
            animate={{
                x: position.x,
                y: position.y,
                rotateX: position.y * rotationFactor,
                rotateY: position.x * -rotationFactor,
                scale: isHovered ? scaleFactor : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 20,
                mass: 1,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
        >
            <div className="flex flex-col justify-between h-full">
                {/* Image */}
                <div className="w-full overflow-hidden">
                    <img
                        src="https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67"
                        alt="Product Preview"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col p-5 space-y-2 flex-grow">
                    <h3 className="text-xl font-semibold dark:text-[#abc2d3] text-gray-800">ZenUI Library</h3>
                    <p className="text-sm dark:text-[#abc2d3]/80 text-gray-500">
                        A UI library for React with modern components and elegant animations.
                    </p>
                    <div className="mt-auto pt-4 flex gap-3">
                        <button
                            className="flex-1 py-2 rounded-lg bg-[#3B9DF8] text-white text-sm font-medium hover:bg-[#3B9DF8]/90 transition">
                            Explore
                        </button>
                        <button
                            className="flex-1 py-2 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition">
                            Docs
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ThreedMagnetCardExample;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/reveal-card' backName='reveal card'
                                forwardUrl='/animations/sorting-animation' forwardName='sorting animation'/>
            </div>

            <ContentNavbar contents={MagnetCardContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magnet Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
