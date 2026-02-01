import React, {useEffect, useRef, useState} from "react";

// framer motion
import {AnimatePresence, motion} from "framer-motion";

// react icons
import {BiRepost, BiShare} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment} from "react-icons/fa";
import {HiOutlineDotsVertical} from "react-icons/hi";

const MagazineReactTrailExample = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const hoverTimerRef = useRef(null);

    const reactions = [
        {
            emoji: 'https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png',
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
            className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="grid md:grid-cols-2 gap-0">
                {/* Left Side - Image */}
                <motion.div
                    className="relative h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden group"
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
                            <span
                                className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold mb-4">
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
                                        whileHover={{scale: 1.1}}
                                    />
                                    <motion.div
                                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        transition={{delay: 0.6, type: "spring"}}
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold dark:text-darkTextColor">
                                        Emma Thompson
                                    </h3>
                                    <p className="text-xs text-gray-500 dark:text-darkSubTextColor">
                                        Creative Director • 4h ago
                                    </p>
                                </div>
                            </div>
                            <motion.button
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                whileHover={{scale: 1.1}}
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
                        <p className="text-gray-700 dark:text-darkTextColor leading-relaxed">
                            Excited to share insights from our latest research on interactive design patterns.
                            We&#39;ve discovered fascinating ways users engage with micro-animations and
                            contextual feedback systems. 🎨✨
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {['#Design', '#UX', '#Animation', '#Research'].map((tag, idx) => (
                                <motion.span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-darkSubTextColor text-xs rounded-full font-medium"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.6 + idx * 0.1}}
                                    whileHover={{scale: 1.05, backgroundColor: "rgb(229 231 235)"}}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>

                        {/* Stats */}
                        <motion.div
                            className="pt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-darkSubTextColor"
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
                                className="w-full h-14 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-semibold shadow-lg flex items-center justify-center gap-2 relative overflow-hidden"
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
                                            alt='reaction'
                                            className='w-6 h-6'
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
                                        <div
                                            className="bg-white dark:bg-slate-700 rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-100 dark:border-slate-600">
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
                                                    <div
                                                        className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-600 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-slate-500 transition-colors">
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
                                                                <div
                                                                    className={`px-3 py-1.5 bg-gradient-to-r ${reaction.color} text-white text-xs font-bold rounded-lg shadow-lg`}>
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
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-darkTextColor flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <FaRegComment size={18}/>
                                <span className="hidden sm:inline">Comment</span>
                            </motion.button>
                            <motion.button
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-darkTextColor flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
                            >
                                <BiRepost size={22}/>
                                <span className="hidden sm:inline">Repost</span>
                            </motion.button>
                            <motion.button
                                className="flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-darkTextColor flex items-center justify-center gap-2 transition-colors"
                                whileHover={{scale: 1.02}}
                                whileTap={{scale: 0.98}}
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

export default MagazineReactTrailExample
