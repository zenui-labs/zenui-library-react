import React, {useState, useEffect, useRef} from "react";

// framer motion
import {motion, AnimatePresence} from "framer-motion";

// react icons
import {BiShare, BiRepost} from "react-icons/bi";
import {MdOutlineThumbUp} from "react-icons/md";
import {FaRegComment, FaHeart} from "react-icons/fa";
import {HiSparkles} from "react-icons/hi";

const AnimatedReactTrailExample = () => {
    const [showEmojis, setShowEmojis] = useState(false);
    const [selectedReaction, setSelectedReaction] = useState(null);
    const [hoveredEmoji, setHoveredEmoji] = useState(null);
    const [ripples, setRipples] = useState([]);
    const [particles, setParticles] = useState([]);
    const hoverTimerRef = useRef(null);

    const reactions = [
        {
            emoji: 'https://i.ibb.co.com/9mdvqksW/2uxqgankkcxm505qn812vqyss-1.png',
            label: "Like",
            color: "text-blue-500",
            bgColor: "bg-blue-500"
        },
        {
            emoji: "https://i.ibb.co.com/W4rJth1M/cm8d2ytayynyhw5ieaare0tl3-1.png",
            label: "Celebrate",
            color: "text-green-500",
            bgColor: "bg-green-500"
        },
        {
            emoji: "https://i.ibb.co.com/gFRvR25P/f58e354mjsjpdd67eq51cuh49-1.png",
            label: "Love",
            color: "text-red-500",
            bgColor: "bg-red-500"
        },
        {
            emoji: "https://i.ibb.co.com/8nVzgzXR/6gz02r6oxefigck4ye888wosd-1.png",
            label: "Insightful",
            color: "text-yellow-500",
            bgColor: "bg-yellow-500"
        },
        {
            emoji: "https://i.ibb.co.com/LXCd7H7d/6namow3mrvcg3dyuevtpfwjm0-1.png",
            label: "Funny",
            color: "text-cyan-500",
            bgColor: "bg-cyan-500"
        }
    ];

    const createRipple = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = {id: Date.now(), x, y};
        setRipples(prev => [...prev, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);
    };

    const createParticles = () => {
        const newParticles = Array.from({length: 8}, (_, i) => ({
            id: Date.now() + i,
            angle: (360 / 8) * i
        }));
        setParticles(newParticles);
        setTimeout(() => setParticles([]), 1000);
    };

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
        createParticles();
    };

    useEffect(() => {
        return () => {
            if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        };
    }, []);

    // Calculate position for radial layout
    const getRadialPosition = (index, total) => {
        const radius = 80;
        const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const childVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.2
            }
        }
    };

    const emojiVariants = (index, total) => {
        const pos = getRadialPosition(index, total);
        return {
            hidden: {
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0
            },
            visible: {
                opacity: 1,
                scale: 1,
                x: pos.x,
                y: pos.y,
                transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                    delay: index * 0.05
                }
            }
        };
    };

    const shimmerVariants = {
        initial: {x: "-100%"},
        animate: {
            x: "100%",
            transition: {
                repeat: Infinity,
                duration: 3,
                ease: "linear"
            }
        }
    };

    const floatingVariants = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div
            className="w-full max-w-2xl bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden relative"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Animated background effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-0 -left-full w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
                    variants={shimmerVariants}
                    initial="initial"
                    animate="animate"
                />
            </div>

            {/* Header */}
            <motion.div className="p-6 pb-4 relative" variants={childVariants}>
                <div className="flex items-start gap-4">
                    <motion.div
                        className="relative"
                        whileHover={{scale: 1.05}}
                        transition={{type: "spring", stiffness: 400, damping: 17}}
                    >
                        <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex-shrink-0 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                            />
                        </div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
                            initial={{scale: 0}}
                            animate={{scale: 1}}
                            transition={{delay: 0.5, type: "spring", stiffness: 500}}
                        />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <motion.h3
                                className="font-bold text-lg dark:text-darkTextColor text-gray-900"
                                variants={childVariants}
                            >
                                Alex Martinez
                            </motion.h3>
                            <motion.button
                                className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-400"
                                whileHover={{scale: 1.1, rotate: 90}}
                                whileTap={{scale: 0.9}}
                                transition={{type: "spring", stiffness: 400, damping: 17}}
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                </svg>
                            </motion.button>
                        </div>
                        <motion.p
                            className="text-sm text-gray-500 dark:text-darkSubTextColor flex items-center gap-1.5"
                            variants={childVariants}
                        >
                            Senior UI/UX Designer • 3h ago
                            <HiSparkles className="text-yellow-500" size={14}/>
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Content */}
            <motion.div className="px-6 pb-4" variants={childVariants}>
                <p className="dark:text-darkTextColor text-gray-700 leading-relaxed text-[15px]">
                    Just launched our new interactive component library! 🚀 Featuring advanced animations, micro-interactions, and smooth transitions. Would love to hear your thoughts! 💭✨
                </p>
            </motion.div>

            {/* Image with floating effect */}
            <motion.div className="px-6 pb-5" variants={childVariants}>
                <motion.div
                    className="relative h-64 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-orange-900/30 rounded-xl flex items-center justify-center border border-gray-200 dark:border-slate-700 overflow-hidden group"
                    whileHover={{scale: 1.02}}
                    transition={{type: "spring", stiffness: 300, damping: 20}}
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.span
                        className="text-gray-400 dark:text-slate-500 text-sm font-semibold z-10 flex items-center gap-2"
                        variants={floatingVariants}
                        animate="animate"
                    >
                        <HiSparkles size={20}/> Interactive Demo <HiSparkles size={20}/>
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Engagement Stats with animation */}
            <motion.div className="px-6 pb-4" variants={childVariants}>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                            {reactions.slice(0, 3).map((reaction, idx) => (
                                <motion.img
                                    key={idx}
                                    src={reaction.emoji}
                                    alt="reaction"
                                    className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800"
                                    initial={{scale: 0, rotate: -180}}
                                    animate={{scale: 1, rotate: 0}}
                                    transition={{
                                        delay: 0.5 + idx * 0.1,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15
                                    }}
                                    whileHover={{scale: 1.3, zIndex: 10}}
                                />
                            ))}
                        </div>
                        <motion.span
                            className="text-gray-600 dark:text-darkSubTextColor font-medium"
                            initial={{opacity: 0, x: -10}}
                            animate={{opacity: 1, x: 0}}
                            transition={{delay: 0.8}}
                        >
                            127 reactions
                        </motion.span>
                    </div>
                    <motion.div
                        className="flex items-center gap-4 text-gray-500 dark:text-darkSubTextColor"
                        initial={{opacity: 0, x: 10}}
                        animate={{opacity: 1, x: 0}}
                        transition={{delay: 0.8}}
                    >
                        <span>34 comments</span>
                        <span>•</span>
                        <span>12 reposts</span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
                className="border-t dark:border-slate-700 border-gray-200 px-4 py-3 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                variants={childVariants}
            >
                <div className="flex items-center gap-2">
                    {/* Reaction Button with radial animations */}
                    <div className="relative flex-1"
                         onMouseEnter={handleMouseEnter}
                         onMouseLeave={handleMouseLeave}>
                        <motion.button
                            className={`relative overflow-hidden w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 font-medium ${
                                selectedReaction
                                    ? `${reactions.find(r => r.label === selectedReaction).color} bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20`
                                    : 'text-gray-600 dark:text-darkSubTextColor hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-700 dark:hover:to-slate-600'
                            }`}
                            onClick={(e) => {
                                if (!selectedReaction) handleReactionSelect("Like");
                                createRipple(e);
                            }}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                        >
                            {selectedReaction ? (
                                <motion.img
                                    src={reactions.find(r => r.label === selectedReaction).emoji}
                                    alt='reaction'
                                    className='w-5 h-5'
                                    initial={{scale: 0, rotate: -180}}
                                    animate={{scale: 1, rotate: 0}}
                                    transition={{type: "spring", stiffness: 500, damping: 15}}
                                />
                            ) : (
                                <MdOutlineThumbUp size={20}/>
                            )}
                            <span className="text-sm">{selectedReaction || "Like"}</span>

                            {/* Ripple effect */}
                            {ripples.map(ripple => (
                                <motion.span
                                    key={ripple.id}
                                    className="absolute rounded-full bg-white/30"
                                    style={{
                                        left: ripple.x,
                                        top: ripple.y,
                                        width: 0,
                                        height: 0
                                    }}
                                    initial={{width: 0, height: 0, opacity: 1}}
                                    animate={{
                                        width: 300,
                                        height: 300,
                                        opacity: 0,
                                        x: -150,
                                        y: -150
                                    }}
                                    transition={{duration: 0.6}}
                                />
                            ))}
                        </motion.button>

                        {/* Radial reaction picker */}
                        <AnimatePresence>
                            {showEmojis && (
                                <motion.div
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-6 w-[200px] h-[200px]"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    onMouseEnter={() => {
                                        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Center glow */}
                                    <motion.div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 0.8, 0.5]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    {reactions.map((reaction, index) => {
                                        const total = reactions.length;
                                        return (
                                            <motion.div
                                                key={reaction.label}
                                                className="absolute top-1/2 left-1/2"
                                                style={{
                                                    x: "-50%",
                                                    y: "-50%"
                                                }}
                                                custom={index}
                                                variants={emojiVariants(index, total)}
                                            >
                                                <motion.button
                                                    className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-700 shadow-xl border-2 border-gray-100 dark:border-slate-600"
                                                    whileHover={{
                                                        scale: 1.4,
                                                        rotate: 360,
                                                        transition: {type: "spring", stiffness: 300, damping: 15}
                                                    }}
                                                    whileTap={{scale: 0.9}}
                                                    onClick={() => handleReactionSelect(reaction.label)}
                                                    onMouseEnter={() => setHoveredEmoji(reaction.label)}
                                                    onMouseLeave={() => setHoveredEmoji(null)}
                                                >
                                                    {/* Glow effect */}
                                                    <motion.div
                                                        className={`absolute inset-0 rounded-2xl ${reaction.bgColor} opacity-0`}
                                                        whileHover={{
                                                            opacity: 0.2,
                                                            scale: 1.5,
                                                            transition: {duration: 0.3}
                                                        }}
                                                    />

                                                    <img
                                                        src={reaction.emoji}
                                                        alt={reaction.label}
                                                        className="w-9 h-9 relative z-10"
                                                    />
                                                </motion.button>

                                                {/* Animated Tooltip */}
                                                <AnimatePresence>
                                                    {hoveredEmoji === reaction.label && (
                                                        <motion.div
                                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                                            initial={{opacity: 0, scale: 0.8}}
                                                            animate={{opacity: 1, scale: 1}}
                                                            exit={{opacity: 0, scale: 0.8}}
                                                            transition={{type: "spring", stiffness: 400, damping: 20}}
                                                        >
                                                            <div
                                                                className={`px-3 py-1.5 rounded-lg ${reaction.bgColor} text-white text-xs font-semibold whitespace-nowrap shadow-lg`}>
                                                                {reaction.label}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Particles effect */}
                        <AnimatePresence>
                            {particles.map(particle => (
                                <motion.div
                                    key={particle.id}
                                    className="absolute top-1/2 left-1/2 pointer-events-none"
                                    initial={{
                                        x: 0,
                                        y: 0,
                                        opacity: 1,
                                        scale: 1
                                    }}
                                    animate={{
                                        x: Math.cos(particle.angle * Math.PI / 180) * 50,
                                        y: Math.sin(particle.angle * Math.PI / 180) * 50,
                                        opacity: 0,
                                        scale: 0.5
                                    }}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.8, ease: "easeOut"}}
                                >
                                    <FaHeart className="text-red-500" size={12}/>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Comment Button */}
                    <motion.button
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-gray-600 dark:text-darkSubTextColor hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 font-medium"
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98}}
                        onClick={createRipple}
                    >
                        <FaRegComment size={18}/>
                        <span className="text-sm">Comment</span>
                    </motion.button>

                    {/* Repost Button */}
                    <motion.button
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-gray-600 dark:text-darkSubTextColor hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 font-medium"
                        whileHover={{scale: 1.02, rotate: [0, 180, 180]}}
                        whileTap={{scale: 0.98}}
                        onClick={createRipple}
                        transition={{type: "spring", stiffness: 200, damping: 15}}
                    >
                        <BiRepost size={22}/>
                        <span className="text-sm">Repost</span>
                    </motion.button>

                    {/* Share Button */}
                    <motion.button
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-gray-600 dark:text-darkSubTextColor hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 dark:hover:from-slate-700 dark:hover:to-slate-600 transition-all duration-300 font-medium"
                        whileHover={{scale: 1.02}}
                        whileTap={{scale: 0.98, rotate: -5}}
                        onClick={createRipple}
                    >
                        <BiShare size={20}/>
                        <span className="text-sm">Share</span>
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default AnimatedReactTrailExample
