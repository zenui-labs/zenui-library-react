import {useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {BiRepost, BiShare} from "react-icons/bi";
import {FaRegComment} from "react-icons/fa";
import {HiOutlineDotsVertical} from "react-icons/hi";
import {MdOutlineThumbUp} from "react-icons/md";

export interface Reaction {
    label: string;
    /** Image URL of the reaction icon. */
    image: string;
    /** Tailwind gradient stops for the hover glow and tooltip, for example "from-blue-500 to-blue-600". */
    color: string;
}

export interface PostAuthor {
    name: string;
    headline: string;
    /** Shown after the headline, for example "4h ago". */
    time: string;
    /** Leave empty to show a gradient circle. */
    avatarUrl?: string;
    /** Shows a green status dot on the avatar. */
    online?: boolean;
}

export interface MagazineCover {
    title: string;
    /** Small pill above the title, for example "Featured post". */
    badge?: string;
    /** Line under the title, for example the topic and reading time. */
    subtitle?: string;
    /** Background image. Leave empty to show the animated gradient on its own. */
    imageUrl?: string;
}

export interface MagazineStats {
    /** Pass a string for preformatted values such as "1.2K". */
    reactionCount: number | string;
    commentCount: number | string;
    repostCount: number | string;
    viewCount: number | string;
}

const containerVariants: Variants = {
    hidden: {opacity: 0, y: 30},
    visible: {opacity: 1, y: 0, transition: {type: "spring", stiffness: 100, damping: 15, staggerChildren: 0.15}},
};

const itemVariants: Variants = {
    hidden: {opacity: 0, x: -20},
    visible: {opacity: 1, x: 0, transition: {type: "spring", stiffness: 200, damping: 20}},
};

const imageVariants: Variants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1, transition: {type: "spring", stiffness: 150, damping: 20}},
};

const reactionContainerVariants: Variants = {
    hidden: {opacity: 0, scale: 0.8},
    visible: {opacity: 1, scale: 1, transition: {type: "spring", stiffness: 300, damping: 25, staggerChildren: 0.05}},
    exit: {opacity: 0, scale: 0.8, transition: {duration: 0.2}},
};

const reactionItemVariants: Variants = {
    hidden: {opacity: 0, scale: 0, rotate: -180},
    visible: {opacity: 1, scale: 1, rotate: 0, transition: {type: "spring", stiffness: 400, damping: 20}},
};

export interface MagazineReactionButtonProps {
    reactions: Reaction[];
    /** Label of the picked reaction. Pass it with `onChange` to control the button. */
    value?: string | null;
    defaultValue?: string | null;
    onChange?: (label: string) => void;
    /** Text on the button before a reaction is picked. */
    label?: string;
    /** Text on the button once a reaction is picked. */
    reactedLabel?: (reaction: string) => string;
    /** How long the picker stays open after the pointer leaves, in milliseconds. */
    closeDelay?: number;
    className?: string;
}

/** A large gradient button with a moving shine that opens a reaction picker on hover or focus. */
export const MagazineReactionButton = ({
    reactions,
    value,
    defaultValue = null,
    onChange,
    label = "React to this post",
    reactedLabel = (reaction) => `Reacted with ${reaction}`,
    closeDelay = 300,
    className = "",
}: MagazineReactionButtonProps) => {
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<string | null>(null);
    const [internalValue, setInternalValue] = useState<string | null>(defaultValue);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const selected = value !== undefined ? value : internalValue;
    const selectedReaction = reactions.find((reaction) => reaction.label === selected);

    const cancelClose = useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    useEffect(() => cancelClose, [cancelClose]);

    const show = () => {
        cancelClose();
        setOpen(true);
    };

    const close = () => {
        cancelClose();
        setOpen(false);
        setHovered(null);
    };

    const scheduleClose = () => {
        cancelClose();
        closeTimer.current = setTimeout(close, closeDelay);
    };

    const select = (next: string) => {
        if (value === undefined) setInternalValue(next);
        onChange?.(next);
        close();
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) close();
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") close();
    };

    return (
        <div className={`relative ${className}`} onFocus={show} onBlur={handleBlur} onKeyDown={handleKeyDown}>
            <motion.button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-2xl font-semibold shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 relative overflow-hidden"
                onMouseEnter={show}
                onMouseLeave={scheduleClose}
                onClick={() => !selectedReaction && select(reactions[0].label)}
                whileHover={{scale: 1.02}}
                whileTap={{scale: 0.98}}
            >
                {/* Shine */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{x: "-100%"}}
                    animate={{x: "200%"}}
                    transition={{duration: 2, repeat: Infinity, repeatDelay: 1}}
                />

                {selectedReaction ? (
                    <>
                        <motion.img
                            key={selectedReaction.label}
                            src={selectedReaction.image}
                            alt=""
                            className="w-6 h-6"
                            initial={{scale: 0, rotate: -180}}
                            animate={{scale: 1, rotate: 0}}
                        />
                        <span>{reactedLabel(selectedReaction.label)}</span>
                    </>
                ) : (
                    <>
                        <MdOutlineThumbUp size={22} aria-hidden="true"/>
                        <span>{label}</span>
                    </>
                )}
            </motion.button>

            {/* Picker above the button */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-full left-0 right-0 mb-3 flex justify-center"
                        variants={reactionContainerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                    >
                        <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-2xl p-3 flex gap-2 border border-gray-100 dark:border-slate-600">
                            {reactions.map((reaction) => (
                                <motion.button
                                    type="button"
                                    key={reaction.label}
                                    className="relative group"
                                    variants={reactionItemVariants}
                                    whileHover={{scale: 1.3, y: -5}}
                                    whileTap={{scale: 0.9}}
                                    onClick={() => select(reaction.label)}
                                    onMouseEnter={() => setHovered(reaction.label)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(reaction.label)}
                                    onBlur={() => setHovered(null)}
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-600 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 dark:group-hover:bg-slate-500 transition-colors">
                                        {/* Gradient glow on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${reaction.color} opacity-0 group-hover:opacity-20 transition-opacity`}/>
                                        <img src={reaction.image} alt={reaction.label} className="w-7 h-7 relative z-10"/>
                                    </div>

                                    <AnimatePresence>
                                        {hovered === reaction.label && (
                                            <motion.div
                                                aria-hidden="true"
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
    );
};

export interface MagazineReactionTrailProps extends Omit<MagazineReactionButtonProps, "className"> {
    author: PostAuthor;
    cover: MagazineCover;
    content: string;
    tags?: string[];
    stats: MagazineStats;
    commentLabel?: string;
    repostLabel?: string;
    shareLabel?: string;
    commentsSuffix?: string;
    repostsSuffix?: string;
    viewsSuffix?: string;
    menuLabel?: string;
    onComment?: () => void;
    onRepost?: () => void;
    onShare?: () => void;
    onMenuClick?: () => void;
    className?: string;
}

const secondaryClass =
    "flex-1 h-12 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-xl font-medium text-gray-700 dark:text-[#d2e5f5] flex items-center justify-center gap-2 transition-colors";

/** A two-column magazine card with an animated cover on the left and the post, stats and a reaction button on the right. */
export const MagazineReactionTrail = ({
    author,
    cover,
    content,
    tags = [],
    stats,
    commentLabel = "Comment",
    repostLabel = "Repost",
    shareLabel = "Share",
    commentsSuffix = "comments",
    repostsSuffix = "reposts",
    viewsSuffix = "views",
    menuLabel = "More options",
    onComment,
    onRepost,
    onShare,
    onMenuClick,
    className = "",
    ...reactionProps
}: MagazineReactionTrailProps) => (
    <motion.div
        className={`w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl ${className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        <div className="grid md:grid-cols-2 gap-0">
            {/* Cover */}
            <motion.div
                className="relative h-[500px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden group"
                variants={imageVariants}
            >
                {cover.imageUrl && <img src={cover.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover"/>}

                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"
                    animate={{opacity: [0.2, 0.4, 0.2]}}
                    transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                />

                {/* Floating shapes */}
                <motion.div
                    className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
                    animate={{x: [0, 30, 0], y: [0, -40, 0], scale: [1, 1.2, 1]}}
                    transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
                    animate={{x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.3, 1]}}
                    transition={{duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1}}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                    <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.5}}>
                        {cover.badge && (
                            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase mb-4">
                                {cover.badge}
                            </span>
                        )}
                        <h2 className="text-3xl font-bold mb-2 leading-tight">{cover.title}</h2>
                        {cover.subtitle && <p className="text-white/80 text-sm">{cover.subtitle}</p>}
                    </motion.div>
                </div>

                {/* Reaction counter */}
                <motion.div
                    className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-full px-4 py-2 shadow-xl"
                    initial={{scale: 0, rotate: -180}}
                    animate={{scale: 1, rotate: 0}}
                    transition={{delay: 0.8, type: "spring", stiffness: 200}}
                    whileHover={{scale: 1.05}}
                >
                    <div className="flex -space-x-2">
                        {reactionProps.reactions.slice(0, 3).map((reaction, index) => (
                            <motion.img
                                key={reaction.label}
                                src={reaction.image}
                                alt=""
                                className="w-5 h-5"
                                initial={{scale: 0}}
                                animate={{scale: 1}}
                                transition={{delay: 1 + index * 0.1}}
                            />
                        ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{stats.reactionCount}</span>
                </motion.div>
            </motion.div>

            {/* Post */}
            <div className="flex flex-col">
                <motion.div className="p-6 border-b dark:border-slate-700" variants={itemVariants}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                {author.avatarUrl ? (
                                    <motion.img
                                        src={author.avatarUrl}
                                        alt=""
                                        className="w-12 h-12 rounded-full object-cover"
                                        whileHover={{scale: 1.1, rotate: 10}}
                                    />
                                ) : (
                                    <motion.div
                                        className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full"
                                        whileHover={{scale: 1.1, rotate: 10}}
                                    />
                                )}
                                {author.online && (
                                    <motion.div
                                        className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"
                                        initial={{scale: 0}}
                                        animate={{scale: 1}}
                                        transition={{delay: 0.6, type: "spring"}}
                                    />
                                )}
                            </div>
                            <div>
                                <h3 className="font-semibold dark:text-[#d2e5f5]">{author.name}</h3>
                                <p className="text-xs text-gray-500 dark:text-[#abc2d3]">
                                    {author.headline} • {author.time}
                                </p>
                            </div>
                        </div>
                        <motion.button
                            type="button"
                            aria-label={menuLabel}
                            onClick={onMenuClick}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            whileHover={{rotate: 90}}
                            whileTap={{scale: 0.9}}
                        >
                            <HiOutlineDotsVertical size={20} aria-hidden="true"/>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div className="flex-1 p-6 space-y-4" variants={itemVariants}>
                    <p className="text-gray-700 dark:text-[#d2e5f5] leading-relaxed">{content}</p>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <motion.span
                                    key={tag}
                                    className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-[#abc2d3] text-xs rounded-full font-medium"
                                    initial={{opacity: 0, scale: 0.8}}
                                    animate={{opacity: 1, scale: 1}}
                                    transition={{delay: 0.6 + index * 0.1}}
                                    whileHover={{scale: 1.05}}
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    )}

                    <motion.div
                        className="pt-4 flex items-center gap-6 text-sm text-gray-500 dark:text-[#abc2d3]"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.9}}
                    >
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">{stats.commentCount}</span> {commentsSuffix}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">{stats.repostCount}</span> {repostsSuffix}
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="font-semibold">{stats.viewCount}</span> {viewsSuffix}
                        </span>
                    </motion.div>
                </motion.div>

                <motion.div className="relative p-6 pt-0" variants={itemVariants}>
                    <MagazineReactionButton {...reactionProps}/>

                    <motion.div className="mt-3 flex gap-2" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 1}}>
                        <motion.button type="button" onClick={onComment} aria-label={commentLabel} className={secondaryClass} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                            <FaRegComment size={18} aria-hidden="true"/>
                            <span className="hidden sm:inline">{commentLabel}</span>
                        </motion.button>
                        <motion.button type="button" onClick={onRepost} aria-label={repostLabel} className={secondaryClass} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}}>
                            <BiRepost size={22} aria-hidden="true"/>
                            <span className="hidden sm:inline">{repostLabel}</span>
                        </motion.button>
                        <motion.button
                            type="button"
                            onClick={onShare}
                            aria-label={shareLabel}
                            className={secondaryClass}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98, rotate: -5}}
                        >
                            <BiShare size={20} aria-hidden="true"/>
                            <span className="hidden sm:inline">{shareLabel}</span>
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </motion.div>
);
