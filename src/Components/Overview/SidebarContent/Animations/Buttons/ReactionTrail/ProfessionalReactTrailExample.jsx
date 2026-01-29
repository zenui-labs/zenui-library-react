import React, {useState, useEffect, useRef} from "react";

// framer motion
import {motion, AnimatePresence} from "framer-motion";

// react icons
import {BiShare, BiRepost} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";

const ProfessionalReactTrailExample = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const hoverTimerRef = useRef(null);

    const reactions = [
        {
            emoji: 'https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png',
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
                            <h3 className="font-semibold dark:text-darkTextColor text-gray-900">Sarah Anderson</h3>
                            <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-400">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-darkSubTextColor">Product Designer • 2h ago</p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-4">
                <p className="dark:text-darkTextColor text-gray-700 leading-relaxed">
                    Excited to share our latest design system update! We've improved component accessibility and added new interactive patterns. Check it out! 🎨
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
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-darkSubTextColor">
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
                            className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${selectedReaction ? reactions.find(r => r.label === selectedReaction).color + ' font-medium' : 'text-gray-600 dark:text-darkSubTextColor'}`}
                            onClick={() => !selectedReaction && handleReactionSelect("Like")}
                        >
                            {selectedReaction ? (
                                <img src={reactions.find(r => r.label === selectedReaction).emoji} alt='reaction'
                                     className='w-5 h-5'/>
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
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-darkSubTextColor hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <FaRegComment size={18}/>
                        <span className="text-sm font-medium">Comment</span>
                    </button>

                    {/* Repost Button */}
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-darkSubTextColor hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <BiRepost size={22}/>
                        <span className="text-sm font-medium">Repost</span>
                    </button>

                    {/* Share Button */}
                    <button className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-darkSubTextColor hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200">
                        <BiShare size={20}/>
                        <span className="text-sm font-medium">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfessionalReactTrailExample
