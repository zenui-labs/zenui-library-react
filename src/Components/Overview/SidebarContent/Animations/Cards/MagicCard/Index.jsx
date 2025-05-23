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
import MagicHoverCardExample from "./MagicHoverCardExample.jsx";
import ParallaxCardExample from "./ParallaxCardExample.jsx";
import RotatingGlowCardExample from "./RotatingGlowCardExample.jsx";
import {MagicCardContents} from "@utils/ContentsConfig/AnimationContents/CardContents.js";

const Index = () => {
    const sectionIds = MagicCardContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [magicHoverCardPreview, setMagicHoverCardPreview] = useState(true);
    const [magicHoverCardCode, setMagicHoverCardCode] = useState(false);

    const [rotatingGlowCardPreview, setRotatingGlowCardPreview] = useState(true);
    const [rotatingGlowCardCode, setRotatingGlowCardCode] = useState(false);

    const [parallaxCardPreview, setParallaxCardPreview] = useState(true);
    const [parallaxCardCode, setParallaxCardCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"magic hover card"} id={"magic-hover-card"}/>

                <ComponentDescription
                    text='A card that reveals a detailed preview panel that smoothly follows your mouse cursor with spring physics for a natural, responsive feel.'/>

                <ToggleTab setCode={setMagicHoverCardCode} code={magicHoverCardCode}
                           setPreview={setMagicHoverCardPreview} preview={magicHoverCardPreview}/>

                <ComponentWrapper>
                    {magicHoverCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <MagicHoverCardExample/>
                        </div>
                    )}

                    {magicHoverCardCode &&
                        <ShowCode code='
import {useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";

const MagicHoverCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            className="relative py-4 px-8 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            Open Magic Hover Card

            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        className="absolute top-0 left-0 z-50 w-80 rounded-xl backdrop-blur-lg dark:bg-slate-900/40 bg-white/60 border border-white/20 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] overflow-hidden"
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: mousePosition.x - 160,
                            y: mousePosition.y - 100,
                        }}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <div className="p-5">
                            <img alt="zenui banner" src="https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67" className="object-cover rounded-xl"/>
                            <h3 className="mb-1 text-lg font-bold dark:text-[#abc2d3] text-gray-700 mt-4">ZenUI Library</h3>
                            <p className="text-sm text-gray-500 dark:text-[#abc2d3] font-[400]">
                                Elevate your project with free UI components, customizable icons, and a color palette. No dependencies required 🤫
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MagicHoverCard;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Rotating glow card"} id={"rotating-glow-card"}/>
                </div>

                <ComponentDescription
                    text='3D card that tilts based on cursor position, featuring a spotlight effect and glowing border for an interactive, tactile experience.'/>

                <ToggleTab setCode={setRotatingGlowCardCode} code={rotatingGlowCardCode}
                           setPreview={setRotatingGlowCardPreview} preview={rotatingGlowCardPreview}/>

                <ComponentWrapper>
                    {rotatingGlowCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <RotatingGlowCardExample/>
                        </div>
                    )}

                    {rotatingGlowCardCode &&
                        <ShowCode code='
import {useRef, useState} from "react";
import {motion} from "framer-motion";

const RotatingGlowCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0.5, y: 0.5});
    const cardRef = useRef(null);

    const theme = "light"

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height
            });
        }
    };

    const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;
    const rotateX = isHovered ? (0.5 - mousePosition.y) * 20 : 0;

    const spotlightX = `${mousePosition.x * 100}%`;
    const spotlightY = `${mousePosition.y * 100}%`;

    return (
        <div
            className="relative w-64 h-[300px] perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            ref={cardRef}
        >
            <motion.div
                className="relative w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-xl cursor-pointer"
                animate={{
                    rotateY: rotateY,
                    rotateX: rotateX,
                    boxShadow: isHovered
                        ? theme === "dark" ? "0px 10px 25px rgba(0, 0, 0, 0.2), 0 0 30px rgba(100, 100, 255, 0.4)" : "0px 10px 25px rgb(152, 0, 255, 0.15), 0 0 30px rgb(152, 0, 255, 0.15)"
                        : "0px 5px 15px rgba(0, 0, 0, 0.1)"
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                }}
            >
                <div className="flex flex-col items-center justify-center h-full p-4 z-10">
                    <h3 className="mb-2 text-lg font-bold text-white">Rotating Glow Card</h3>
                    <p className="text-sm text-center text-gray-300">Move your mouse over the card to see the 3D
                        effect.</p>
                </div>

                {isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 0.15}}
                        style={{
                            background: `radial-gradient(circle at ${spotlightX} ${spotlightY}, ${theme === "dark" ? "rgba(255, 255, 255, 1)" : "rgb(152, 0, 255, 3)"} 0%, transparent 70%)`
                        }}
                    />
                )}

                {isHovered && (
                    <motion.div
                        className="absolute inset-0 border-2 border-[rgb(152,0,255,0.6)] dark:border-blue-400 rounded-lg pointer-events-none"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        style={{
                            boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)"
                        }}
                    />
                )}
            </motion.div>
        </div>
    );
}

export default RotatingGlowCard;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d parallax card"} id={"3d-parallax-card"}/>
                </div>

                <ComponentDescription
                    text='Multi-layered card where elements move at different speeds relative to mouse position, creating a depth effect with dynamic motion.'/>

                <ToggleTab setCode={setParallaxCardCode} code={parallaxCardCode}
                           setPreview={setParallaxCardPreview} preview={parallaxCardPreview}/>

                <ComponentWrapper>
                    {parallaxCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ParallaxCardExample/>
                        </div>
                    )}

                    {parallaxCardCode &&
                        <ShowCode code='
import {useRef, useState} from "react";

// framer motion
import {motion} from "framer-motion";

// react icons
import {FaRegStar, FaStar} from "react-icons/fa";

const ParallaxCard = () => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0.5, y: 0.5});
    const [selectedSize, setSelectedSize] = useState(7);
    const [selectedColor, setSelectedColor] = useState("bg-red-600");

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: (e.clientX - rect.left) / rect.width,
            y: (e.clientY - rect.top) / rect.height,
        });
    };

    const getOffset = (depth = 1) => {
        const offset = 23 * depth;
        return {
            x: (mousePos.x - 0.6) * offset,
            y: (mousePos.y - 0.6) * offset,
        };
    };

    const parallax = isHovered ? getOffset(1) : {x: 0, y: 0};
    const imageZoom = isHovered ? 1.2 : 1;

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="w-full md:w-80 rounded-[12px] bg-white dark:bg-slate-900 p-5 relative shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)]"
        >
            <motion.div
                animate={{
                    x: parallax.x,
                    y: parallax.y,
                }}
                transition={{type: "spring", stiffness: 120, damping: 12}}
                className="relative z-10"
            >
                <motion.img
                    src="https://i.ibb.co/1z7dSw8/shoe1.png"
                    alt="Brogue"
                    className="w-48 absolute top-[5px] -right-4 -translate-x-1/2 z-10 pointer-events-none"
                    animate={{
                        scale: imageZoom,
                        x: parallax.x,
                        y: parallax.y,
                    }}
                    transition={{type: "spring", stiffness: 250, damping: 18}}
                />

                <div className="relative z-20 pt-32">

                    <h2 className="text-xl font-bold dark:text-[#d2e5f5] text-black mb-1">Brogue</h2>

                    <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400"/>
                        <FaStar className="text-yellow-400"/>
                        <FaRegStar className="text-gray-500"/>
                        <FaRegStar className="text-gray-500"/>
                        <FaRegStar className="text-gray-500"/>
                    </div>

                    <p className="text-xs font-semibold dark:text-[#d2e5f5] text-gray-500 mt-4 mb-1.5">SIZES</p>
                    <div className="flex items-center gap-2">
                        {[7, 8, 9, 10, 11].map((size) => (
                            <div
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm font-semibold ${
                                    selectedSize === size
                                        ? "bg-[#0FABCA] text-white"
                                        : "bg-gray-100 dark:bg-slate-700 dark:text-slate-400 text-gray-800"
                                }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>

                    <p className="text-xs font-semibold text-gray-500 dark:text-[#d2e5f5] mt-4 mb-1.5">COLORS</p>
                    <div className="flex items-center gap-2 mb-4">
                        {["bg-red-600", "bg-yellow-400", "bg-blue-500", "bg-cyan-400"].map(
                            (color, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-5 h-5 outline cursor-pointer outline-offset-1 rounded-full ${selectedColor === color ? "outline-[#0FABCA]" : "outline-transparent"} border-2 border-white dark:border-slate-900 ${color}`}
                                />
                            )
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <p className="text-[#0FABCA] font-bold text-lg">$127</p>
                            <p className="text-[1rem] dark:text-[#d2e5f5]/80 text-gray-500">USD</p>
                        </div>
                        <button
                            className="bg-[#0FABCA] text-white px-4 py-2 rounded-[8px] text-sm hover:bg-[#0FABCA]/90 transition">
                            More Details
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ParallaxCard;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/installation' backName='installation'
                                forwardUrl='/animations/reveal-card' forwardName='reveal card'/>
            </div>

            <ContentNavbar contents={MagicCardContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magic Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
