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
import MagazineReactTrailExample from "./MagazineReactTrailExample.jsx";
import {ReactionTrailContents} from "@utils/ContentsConfig/AnimationContents/ButtonContent.js";

const Index = () => {
    const sectionIds = ReactionTrailContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [linkedinReactionTrailPreview, setLinkedinReactionTrailPreview] = useState(true);
    const [linkedinReactionTrailCode, setLinkedinReactionTrailCode] = useState(false);

    const [professionalReactionTrailPreview, setProfessionalReactionTrailPreview] = useState(true);
    const [professionalReactionTrailCode, setProfessionalReactionTrailCode] = useState(false);

    const [magazineReactionTrailPreview, setMagazineReactionTrailPreview] = useState(true);
    const [magazineReactionTrailCode, setMagazineReactionTrailCode] = useState(false);

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

                <div className='mt-8'>
                    <ContentHeader text={"magazine reaction trail"} id={"magazine-reaction-trail"}/>

                    <ComponentDescription
                        text='A unique horizontal magazine-style layout with floating image on the left, content on the right, and an elegant floating reaction button with smooth interactions.'/>

                    <ToggleTab setCode={setMagazineReactionTrailCode} code={magazineReactionTrailCode}
                               setPreview={setMagazineReactionTrailPreview} preview={magazineReactionTrailPreview}/>

                    <ComponentWrapper>
                        {magazineReactionTrailPreview && (
                            <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                                <MagazineReactTrailExample/>
                            </div>
                        )}

                        {magazineReactionTrailCode &&
                            <ShowCode code='
import React, {useState, useEffect, useRef} from "react";

// framer motion
import {motion, AnimatePresence} from "framer-motion";

// react icons
import {BiShare, BiRepost} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";
import {HiOutlineDotsVertical} from "react-icons/hi";

const MagazineReactTrail = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const hoverTimerRef = useRef(null);

    const reactions = [
        {
            emoji: "https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png",
            label: "Like",
            color: "from-blue-500 to-blue-600"
        },
        {
            emoji: "https://i.ibb.co.com/W4rJth1M/cm8d2ytayynyhw5ieaare0tl3-1.png",
            label: "Celebrate",
            color: "from-green-500 to-green-600"
        },
        {
            emoji: "https://i.ibb.co.com/gFRvR25P/f58e354mjsjpdd67eq51cuh49-1.png",
            label: "Love",
            color: "from-red-500 to-red-600"
        },
        {
            emoji: "https://i.ibb.co.com/8nVzgzXR/6gz02r6oxefigck4ye888wosd-1.png",
            label: "Insightful",
            color: "from-yellow-500 to-yellow-600"
        },
        {
            emoji: "https://i.ibb.co.com/LXCd7H7d/6namow3mrvcg3dyuevtpfwjm0-1.png",
            label: "Funny",
            color: "from-cyan-500 to-cyan-600"
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
        }, 300);
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
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: {opacity: 0, x: -20},
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    const imageVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 20
            }
        }
    };

    const reactionContainerVariants = {
        hidden: {opacity: 0, scale: 0.8},
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {duration: 0.2}
        }
    };

    const reactionItemVariants = {
        hidden: {opacity: 0, scale: 0, rotate: -180},
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20
            }
        }
    };

    return (
        <motion.div
            className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Image */}
                <motion.div
                    className="relative h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden group"
                    variants={imageVariants}
                >
                    {/* Animated overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"
                        animate={{
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    {/* Floating shapes */}
                    <motion.div
                        className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
                        animate={{
                            x: [0, 30, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
                        animate={{
                            x: [0, -20, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.3, 1]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />

                    {/* Content on image */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.5}}
                        >
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4">
                                FEATURED POST
                            </span>
                            <h2 className="text-3xl font-bold mb-2 leading-tight">
                                The Future of Interactive Design
                            </h2>
                            <p className="text-white/80 text-sm">
                                Exploring new patterns in UI/UX • 5 min read
                            </p>
                        </motion.div>
                    </div>

                    {/* Floating reaction counter */}
                    <motion.div
                        className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-full px-4 py-2 shadow-xl"
                        initial={{scale: 0, rotate: -180}}
                        animate={{scale: 1, rotate: 0}}
                        transition={{delay: 0.8, type: "spring", stiffness: 200}}
                        whileHover={{scale: 1.05}}
                    >
                        <div className="flex -space-x-2">
                            {reactions.slice(0, 3).map((reaction, idx) => (
                                <motion.img
                                    key={idx}
                                    src={reaction.emoji}
                                    alt="reaction"
                                    className="w-5 h-5"
                                    initial={{scale: 0}}
                                    animate={{scale: 1}}
                                    transition={{delay: 1 + idx * 0.1}}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            234
                        </span>
                    </motion.div>
                </motion.div>

                {/* Right Side - Content */}
                <div className="flex flex-col">
                    {/* Author info */}
                    <motion.div
                        className="p-6 border-b dark:border-slate-700"
                        variants={itemVariants}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <motion.div
                                        className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                                        whileHover={{scale: 1.1, rotate: 10}}
                                    />
                                    <motion.div
                                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        transition={{delay: 0.6, type: "spring"}}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold dark:text-[#d2e5f5]">
                                        Emma Thompson
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-[#abc2d3]">
                                        Creative Director • 4h ago
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                whileHover={{rotate: 90}}
                                whileTap={{scale: 0.9}}
                            >
                                <HiOutlineDotsVertical size={20}/>
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Post content */}
                    <motion.div
                        className="flex-1 p-6 space-y-4"
                        variants={itemVariants}
                    >
                        <p className="text-gray-700 dark:text-[#d2e5f5] leading-relaxed">
                            Excited to share insights from our latest research on interactive design patterns.
                            We have discovered fascinating ways users engage with micro-animations and
                            contextual feedback systems. 🎨✨
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {["#Design", "#UX", "#Animation", "#Research"].map((tag, idx) => (
                                <motion.span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-[#abc2d3] text-xs rounded-full font-medium"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.6 + idx * 0.1}}
                                    whileHover={{scale: 1.05}}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="pt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-[#abc2d3]"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 0.9}}
                        >
                            <span className="flex items-center gap-1">
                                <span className="font-semibold">52</span> comments
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="font-semibold">18</span> reposts
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="font-semibold">1.2K</span> views
                            </span>
                        </motion.div>
                    </motion.div>

                    {/* Floating Action Bar */}
                    <motion.div
                        className="relative p-6 pt-0"
                        variants={itemVariants}
                    >
                        {/* Main floating button */}
                        <div className="relative">
                            <motion.button
                                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 relative overflow-hidden"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => !selectedReaction && handleReactionSelect("Like")}
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                {/* Shine effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                    initial={{x: "-100%"}}
                                    animate={{x: "200%"}}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />

                                {selectedReaction ? (
                                    <>
                                        <motion.img
                                            src={reactions.find(r => r.label === selectedReaction).emoji}
                                            alt="reaction"
                                            className="w-6 h-6"
                                            initial={{scale: 0, rotate: -180}}
                                            animate={{scale: 1, rotate: 0}}
                                        />
                                        <span>Reacted with {selectedReaction}</span>
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineThumbUp size={22}/>
                                        <span>React to this post</span>
                                    </>
                                )}
                            </motion.button>

                            {/* Reactions popup - appears above button */}
                            <AnimatePresence>
                                {showEmojis && (
                                    <motion.div
                                        className="absolute bottom-full left-0 right-0 mb-3 flex justify-center"
                                        variants={reactionContainerVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        onMouseEnter={() => {
                                            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                                        }}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-100 dark:border-slate-600">
                                            {reactions.map((reaction) => (
                                                <motion.button
                                                    key={reaction.label}
                                                    className="relative group"
                                                    variants={reactionItemVariants}
                                                    whileHover={{scale: 1.3, y: -5}}
                                                    whileTap={{scale: 0.9}}
                                                    onClick={() => handleReactionSelect(reaction.label)}
                                                    onMouseEnter={() => setHoveredEmoji(reaction.label)}
                                                    onMouseLeave={() => setHoveredEmoji(null)}
                                                >
                                                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-600 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-slate-500 transition-colors">
                                                        {/* Gradient glow on hover */}
                                                        <motion.div
                                                            className={`absolute inset-0 bg-gradient-to-br ${reaction.color} opacity-0 group-hover:opacity-20 transition-opacity`}
                                                        />
                                                        <img
                                                            src={reaction.emoji}
                                                            alt={reaction.label}
                                                            className="w-7 h-7 relative z-10"
                                                        />
                                                    </div>

                                                    {/* Tooltip */}
                                                    <AnimatePresence>
                                                        {hoveredEmoji === reaction.label && (
                                                            <motion.div
                                                                className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap"
                                                                initial={{opacity: 0, y: 5}}
                                                                animate={{opacity: 1, y: 0}}
                                                                exit={{opacity: 0, y: 5}}
                                                            >
                                                                <div className={`px-3 py-1.5 bg-gradient-to-r ${reaction.color} text-white text-xs font-bold rounded-lg shadow-lg`}>
                                                                    {reaction.label}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Secondary actions */}
                        <motion.div
                            className="mt-3 flex gap-2"
                            initial={{opacity: 0, y: 10}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 1}}
                        >
                            <motion.button
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-[#d2e5f5] flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <FaRegComment size={18}/>
                                <span className="hidden sm:inline">Comment</span>
                            </motion.button>
                            <motion.button
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-[#d2e5f5] flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02, rotate: 180}}
                                whileTap={{scale: 0.98}}
                            >
                                <BiRepost size={22}/>
                                <span className="hidden sm:inline">Repost</span>
                            </motion.button>
                            <motion.button
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-[#d2e5f5] flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98, rotate: -5}}
                            >
                                <BiShare size={20}/>
                                <span className="hidden sm:inline">Share</span>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default MagazineReactTrail;
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
