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
import ProfessionalReactTrailExample from "./ProfessionalReactTrailExample.jsx";
import {ReactionTrailContents} from "@utils/ContentsConfig/AnimationContents/ButtonContent.js";

const Index = () => {
    const sectionIds = ReactionTrailContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [linkedinReactionTrailPreview, setLinkedinReactionTrailPreview] = useState(true);
    const [linkedinReactionTrailCode, setLinkedinReactionTrailCode] = useState(false);

    const [professionalReactionTrailPreview, setProfessionalReactionTrailPreview] = useState(true);
    const [professionalReactionTrailCode, setProfessionalReactionTrailCode] = useState(false);

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

                <div className='mt-8'>
                    <ContentHeader text={"professional reaction trail"} id={"professional-reaction-trail"}/>

                    <ComponentDescription
                        text='A modern, professional card design with smooth reaction animations and all engagement actions including the new repost button.'/>

                    <ToggleTab setCode={setProfessionalReactionTrailCode} code={professionalReactionTrailCode}
                               setPreview={setProfessionalReactionTrailPreview} preview={professionalReactionTrailPreview}/>

                    <ComponentWrapper>
                        {professionalReactionTrailPreview && (
                            <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                                <ProfessionalReactTrailExample/>
                            </div>
                        )}

                        {professionalReactionTrailCode &&
                            <ShowCode code='
import React, {useState, useEffect, useRef} from "react";

// framer motion
import {motion, AnimatePresence} from "framer-motion";

// react icons
import {BiShare, BiRepost} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";

const ProfessionalReactTrail = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const hoverTimerRef = useRef(null);

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
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    };

    const handleMouseLeave = () => {
        hoverTimerRef.current = setTimeout(() => {
            setShowEmojis(false);
            setHoveredEmoji(null);
        }, 200);
    };

    const handleReactionSelect = (reaction) => {
        setSelectedReaction(reaction);
        setShowEmojis(false);
    };

    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        };
    }, []);

    const containerVariants = {
        hidden: {opacity: 0, scale: 0.85},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                staggerChildren: 0.04
            }
        },
        exit: {
            opacity: 0,
            scale: 0.85,
            transition: {
                duration: 0.15
            }
        }
    };

    const emojiVariants = {
        hidden: {opacity: 0, scale: 0, y: 10},
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 20,
            }
        }
    };

    const tooltipVariants = {
        hidden: {opacity: 0, y: 3},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.15
            }
        }
    }

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-5 pb-3">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 dark:bg-slate-700 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold dark:text-[#d2e5f5] text-gray-900">Sarah Anderson</h3>
                            <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-[#abc2d3]">Product Designer • 2h ago</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-4">
                <p className="dark:text-[#d2e5f5] text-gray-700 leading-relaxed">
                    Excited to share our latest design system update! We have improved component accessibility and added new interactive patterns. Check it out! 🎨
                </p>
            </div>

            {/* Image */}
            <div className="px-5 pb-4">
                <div className="h-56 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 rounded-lg flex items-center justify-center border border-gray-100 dark:border-slate-700">
                    <span className="text-gray-400 dark:text-slate-500 text-sm font-medium">[Design Preview]</span>
                </div>
            </div>

            {/* Engagement Stats */}
            <div className="px-5 pb-3">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[#abc2d3]">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            <img src={reactions[0].emoji} alt="reaction" className="w-5 h-5" />
                            <img src={reactions[2].emoji} alt="reaction" className="w-5 h-5" />
                            <img src={reactions[1].emoji} alt="reaction" className="w-5 h-5" />
                        </div>
                        <span className="ml-1">42</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span>18 comments</span>
                        <span>5 reposts</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t dark:border-slate-700 border-gray-100 px-3 py-2">
                <div className="flex items-center justify-between gap-1">
                    {/* Reaction Button */}
                    <div className="relative flex-1"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <button
                            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${selectedReaction ? reactions.find(r => r.label === selectedReaction).color + " font-medium" : "text-gray-600 dark:text-[#abc2d3]"}`}
                            onClick={() => !selectedReaction && handleReactionSelect("Like")}
                        >
                            {selectedReaction ? (
                                <img src={reactions.find(r => r.label === selectedReaction).emoji} alt="reaction"
                                     className="w-5 h-5"/>
                            ) : (
                                <MdOutlineThumbUp size={20}/>
                            )}
                            <span className="text-sm font-medium">{selectedReaction || "Like"}</span>
                        </button>

                        <AnimatePresence>
                            {showEmojis && (
                                <motion.div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white dark:bg-slate-700 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-600 p-2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => {
                                        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div className="flex gap-1">
                                        {reactions.map((reaction) => (
                                            <motion.div
                                                key={reaction.label}
                                                className="relative"
                                                variants={emojiVariants}
                                            >
                                                <motion.button
                                                    className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                                                    whileHover={{
                                                        scale: 1.3,
                                                        y: -8,
                                                        transition: {type: "spring", stiffness: 400, damping: 15}
                                                    }}
                                                    whileTap={{scale: 0.95}}
                                                    onClick={() => handleReactionSelect(reaction.label)}
                                                    onMouseEnter={() => setHoveredEmoji(reaction.label)}
                                                    onMouseLeave={() => setHoveredEmoji(null)}
                                                >
                                                    <img
                                                        src={reaction.emoji}
                                                        alt={reaction.label}
                                                        className="w-8 h-8"
                                                    />
                                                </motion.button>

                                                {/* Tooltip */}
                                                <AnimatePresence>
                                                    {hoveredEmoji === reaction.label && (
                                                        <motion.div
                                                            className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-gray-900 dark:bg-slate-900 text-white text-xs rounded-md whitespace-nowrap"
                                                            variants={tooltipVariants}
                                                            initial="hidden"
                                                            animate="visible"
                                                            exit="hidden"
                                                        >
                                                            {reaction.label}
                                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-slate-900 rotate-45"></div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Comment Button */}
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-[#abc2d3] hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <FaRegComment size={18}/>
                        <span className="text-sm font-medium">Comment</span>
                    </button>

                    {/* Repost Button */}
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-[#abc2d3] hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <BiRepost size={22}/>
                        <span className="text-sm font-medium">Repost</span>
                    </button>

                    {/* Share Button */}
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-[#abc2d3] hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <BiShare size={20}/>
                        <span className="text-sm font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalReactTrail;
                        '
                            />}
                    </ComponentWrapper>
                </div>

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
