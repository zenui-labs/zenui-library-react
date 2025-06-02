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
import LinkedinReactTrailExample from "./LinkedinReactTrailExample.jsx";
import {ReactionTrailContents} from "@utils/ContentsConfig/AnimationContents/ButtonContent.js";

const Index = () => {
    const sectionIds = ReactionTrailContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [linkedinReactionTrailPreview, setLinkedinReactionTrailPreview] = useState(true);
    const [linkedinReactionTrailCode, setLinkedinReactionTrailCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"linkedin reaction trail"} id={"linkedin-reaction-trail"}/>

                <ComponentDescription
                    text='LinkedIn Reaction Trail shows all reaction options on hover, letting users pick a reaction quickly with a single click.'/>

                <ToggleTab setCode={setLinkedinReactionTrailCode} code={linkedinReactionTrailCode}
                           setPreview={setLinkedinReactionTrailPreview} preview={linkedinReactionTrailPreview}/>

                <ComponentWrapper>
                    {linkedinReactionTrailPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <LinkedinReactTrailExample/>
                        </div>
                    )}

                    {linkedinReactionTrailCode &&
                        <ShowCode code='
import React, {useState, useEffect, useRef} from "react";

// framer motion
import {motion, AnimatePresence} from "framer-motion";

// react icons
import {BiShare} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";

const LinkedinReactTrail = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const hoverTimerRef = useRef(null);
    const trailIntervalRef = useRef(null);

    const reactions = [
        {
            emoji: "https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png",
            label: "Like",
            color: "text-blue-500"
        },
        {
            emoji: "https://i.ibb.co.com/W4rJth1M/cm8d2ytayynyhw5ieaare0tl3-1.png",
            label: "Celebrate",
            color: "text-green-500"
        },
        {
            emoji: "https://i.ibb.co.com/gFRvR25P/f58e354mjsjpdd67eq51cuh49-1.png",
            label: "Love",
            color: "text-red-500"
        },
        {
            emoji: "https://i.ibb.co.com/8nVzgzXR/6gz02r6oxefigck4ye888wosd-1.png",
            label: "Insightful",
            color: "text-yellow-500"
        },
        {
            emoji: "https://i.ibb.co.com/LXCd7H7d/6namow3mrvcg3dyuevtpfwjm0-1.png",
            label: "Funny",
            color: "text-cyan-500"
        }
    ];


    const handleMouseEnter = () => {
        setShowEmojis(true);

        if (trailIntervalRef.current) clearInterval(trailIntervalRef.current);
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };

    const handleMouseLeave = () => {
        hoverTimerRef.current = setTimeout(() => {
            setShowEmojis(false);
            setHoveredEmoji(null);
            if (trailIntervalRef.current) {
                clearInterval(trailIntervalRef.current);
                trailIntervalRef.current = null;
            }
        }, 300);
    };

    const handleReactionSelect = (reaction) => {
        setSelectedReaction(reaction);
        setShowEmojis(false);
        if (trailIntervalRef.current) {
            clearInterval(trailIntervalRef.current);
            trailIntervalRef.current = null;
        }
    };

    useEffect(() => {
        return () => {
            if (trailIntervalRef.current) clearInterval(trailIntervalRef.current);
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        };
    }, []);

    const containerVariants = {
        hidden: {opacity: 0, scale: 0.8, y: 10},
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 40,
                mass: 0.8,
                when: "beforeChildren",
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 10,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 1
            }
        }
    };

    const emojiVariants = {
        hidden: {opacity: 0, scale: 0.5, y: 10},
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
            }
        }
    };

    const tooltipVariants = {
        hidden: {opacity: 0, y: 5, scale: 0.9},
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.8
            }
        }
    }

    return (
        <div className="w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-[2px_1px_15px_rgba(0,0,0,0.05)]">
            <div className="flex items-center mb-4">
                <div className="w-10 h-10 dark:bg-slate-700 bg-gray-200 rounded-full"></div>
                <div className="ml-3">
                    <p className="font-semibold dark:text-[#d2e5f5]">Jane Smith</p>
                    <p className="text-xs text-gray-500 dark:text-[#abc2d3]">Marketing Director • 1d</p>
                </div>
            </div>

            <p className="mb-4 dark:text-[#d2e5f5]">Just published our Q1 results. Proud of what our team has
                accomplished in such a
                challenging market!</p>

            <div
                className="h-48 bg-gray-100 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                [Post image]
            </div>

            <div className="border-t border-b dark:border-slate-700 dark:text-[#d2e5f5] py-1 flex justify-between">
                <div className="relative"
                     onMouseEnter={handleMouseEnter}
                     onMouseLeave={handleMouseLeave}>
                    <button
                        className={`flex items-center p-2 gap-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100 ${selectedReaction ? reactions.find(r => r.label === selectedReaction).color : ""}`}
                        onClick={() => handleReactionSelect(selectedReaction || "Like")}
                    >
                        {selectedReaction ? (
                            <img src={reactions.find(r => r.label === selectedReaction).emoji} alt="imoji"
                                 className="w-[22px]"/>
                        ) : (
                            <MdOutlineThumbUp className="mr-2" size={18}/>
                        )}
                        <span>{selectedReaction || "Like"}</span>
                    </button>

                    <AnimatePresence>
                        {showEmojis && (
                            <motion.div
                                className="absolute bottom-full left-0 dark:bg-slate-700 flex gap-1 bg-white rounded-full shadow-lg px-3 py-1.5 mb-2"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                onMouseEnter={() => {
                                    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                                }}
                                onMouseLeave={handleMouseLeave}
                            >
                                {reactions.map((reaction, index) => (
                                    <motion.div layout key={reaction.label}
                                                className={`${hoveredEmoji === reaction.label ? "mx-3" : "mx-0"} relative w-[40px] h-[40px]`}>
                                        <motion.img
                                            src={reaction.emoji}
                                            className={`w-full h-full cursor-pointer`}
                                            variants={emojiVariants}
                                            whileHover={{
                                                scale: 1.8,
                                                y: -18,
                                                transition: {type: "keyframes"}
                                            }}
                                            onClick={() => handleReactionSelect(reaction.label)}
                                            onMouseEnter={() => setHoveredEmoji(reaction.label)}
                                            onMouseLeave={() => setHoveredEmoji(null)}
                                        />

                                        {/* tooltip */}
                                        <AnimatePresence>
                                            {hoveredEmoji === reaction.label && (
                                                <motion.div
                                                    className="absolute -top-16 left-[0%] mb-1 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap"
                                                    variants={tooltipVariants}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit="hidden"
                                                >
                                                    {reaction.label}
                                                </motion.div>
                                            )}

                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

                <button className="flex items-center p-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100">
                    <FaRegComment className="mr-2" size={18}/>
                    <span>Comment</span>
                </button>

                <button className="flex items-center p-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100">
                    <BiShare className="mr-2" size={18}/>
                    <span>Share</span>
                </button>
            </div>

            <div className="mt-4 flex">
                <div className="w-8 h-8 dark:bg-slate-700 bg-gray-200 rounded-full"></div>
                <div className="ml-2 flex-grow">
                    <div
                        className="border rounded-full dark:bg-slate-900 dark:border-slate-700 bg-gray-50 px-4 py-2 text-gray-500 text-sm">Add
                        a comment...
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LinkedinReactTrail;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/animated-accordion' backName='animated accordion'
                                forwardUrl='/animations/hover-effects' forwardName='hover effects'/>
            </div>

            <ContentNavbar contents={ReactionTrailContents} activeSection={activeSection}/>

            <Helmet>
                <title>Buttons - Reaction Trail</title>
            </Helmet>
        </aside>
    );
};

export default Index;
