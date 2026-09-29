import {useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactNode} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {BiRepost, BiShare} from "react-icons/bi";
import {FaRegComment} from "react-icons/fa";
import {MdOutlineThumbUp} from "react-icons/md";

export interface Reaction {
    label: string;
    /** Image URL of the reaction icon. */
    image: string;
    /** Tailwind text color class for the button once this reaction is picked, for example "text-blue-500". */
    color: string;
}

export interface PostAuthor {
    name: string;
    headline: string;
    /** Shown after the headline, for example "2h ago". */
    time: string;
    /** Leave empty to show a gradient circle. */
    avatarUrl?: string;
}

export interface PostStats {
    reactionCount: number | string;
    commentCount: number | string;
    repostCount: number | string;
    /** Labels of the reaction icons shown next to the count. Defaults to the first three reactions. */
    topReactions?: string[];
}

const containerVariants: Variants = {
    hidden: {opacity: 0, scale: 0.85},
    visible: {opacity: 1, scale: 1, transition: {type: "spring", stiffness: 400, damping: 25, staggerChildren: 0.04}},
    exit: {opacity: 0, scale: 0.85, transition: {duration: 0.15}},
};

const emojiVariants: Variants = {
    hidden: {opacity: 0, scale: 0, y: 10},
    visible: {opacity: 1, scale: 1, y: 0, transition: {type: "spring", stiffness: 500, damping: 20}},
};

const tooltipVariants: Variants = {
    hidden: {opacity: 0, y: 3},
    visible: {opacity: 1, y: 0, transition: {duration: 0.15}},
};

export interface ProfessionalReactionButtonProps {
    reactions: Reaction[];
    /** Label of the picked reaction. Pass it with `onChange` to control the button. */
    value?: string | null;
    defaultValue?: string | null;
    onChange?: (label: string) => void;
    /** Text on the button before a reaction is picked. */
    label?: string;
    /** How long the picker stays open after the pointer leaves, in milliseconds. */
    closeDelay?: number;
    className?: string;
}

/** A full-width Like button that opens a reaction picker on hover or focus. */
export const ProfessionalReactionButton = ({
    reactions,
    value,
    defaultValue = null,
    onChange,
    label = "Like",
    closeDelay = 200,
    className = "",
}: ProfessionalReactionButtonProps) => {
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
        <div
            className={`relative flex-1 ${className}`}
            onMouseEnter={show}
            onMouseLeave={scheduleClose}
            onFocus={show}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
        >
            <button
                type="button"
                aria-haspopup="true"
                aria-expanded={open}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 dark:hover:bg-slate-700 ${
                    selectedReaction ? `${selectedReaction.color} font-medium` : "text-gray-600 dark:text-[#abc2d3]"
                }`}
                onClick={() => !selectedReaction && select(reactions[0].label)}
            >
                {selectedReaction ? (
                    <img src={selectedReaction.image} alt="" className="w-5 h-5"/>
                ) : (
                    <MdOutlineThumbUp size={20} aria-hidden="true"/>
                )}
                <span className="text-sm font-medium">{selectedReaction?.label ?? label}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white dark:bg-slate-700 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-600 p-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                    >
                        <div className="flex gap-1">
                            {reactions.map((reaction) => (
                                <motion.div key={reaction.label} className="relative" variants={emojiVariants}>
                                    <motion.button
                                        type="button"
                                        className="w-12 h-12 flex items-center justify-center rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors"
                                        whileHover={{scale: 1.3, y: -8, transition: {type: "spring", stiffness: 400, damping: 15}}}
                                        whileTap={{scale: 0.95}}
                                        onClick={() => select(reaction.label)}
                                        onMouseEnter={() => setHovered(reaction.label)}
                                        onMouseLeave={() => setHovered(null)}
                                        onFocus={() => setHovered(reaction.label)}
                                        onBlur={() => setHovered(null)}
                                    >
                                        <img src={reaction.image} alt={reaction.label} className="w-8 h-8"/>
                                    </motion.button>

                                    <AnimatePresence>
                                        {hovered === reaction.label && (
                                            <motion.div
                                                aria-hidden="true"
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
    );
};

export interface ProfessionalReactionTrailProps extends Omit<ProfessionalReactionButtonProps, "className" | "label"> {
    author: PostAuthor;
    content: string;
    stats: PostStats;
    /** Image or other media for the post. Defaults to a placeholder box. */
    media?: ReactNode;
    likeLabel?: string;
    commentLabel?: string;
    repostLabel?: string;
    shareLabel?: string;
    /** Words after the counts, for example "18 comments". */
    commentsSuffix?: string;
    repostsSuffix?: string;
    menuLabel?: string;
    onComment?: () => void;
    onRepost?: () => void;
    onShare?: () => void;
    onMenuClick?: () => void;
    className?: string;
}

const actionClass =
    "flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-gray-600 dark:text-[#abc2d3] hover:bg-gray-50 dark:hover:bg-slate-700 transition-all duration-200";

/** A post card with engagement counts, a reaction picker and comment, repost and share actions. */
export const ProfessionalReactionTrail = ({
    author,
    content,
    stats,
    media = <span className="text-gray-400 dark:text-slate-500 text-sm font-medium">[Design preview]</span>,
    likeLabel = "Like",
    commentLabel = "Comment",
    repostLabel = "Repost",
    shareLabel = "Share",
    commentsSuffix = "comments",
    repostsSuffix = "reposts",
    menuLabel = "More options",
    onComment,
    onRepost,
    onShare,
    onMenuClick,
    className = "",
    ...reactionProps
}: ProfessionalReactionTrailProps) => {
    const summary = (stats.topReactions ?? reactionProps.reactions.slice(0, 3).map((reaction) => reaction.label))
        .map((label) => reactionProps.reactions.find((reaction) => reaction.label === label))
        .filter((reaction): reaction is Reaction => reaction !== undefined);

    return (
        <div className={`w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden ${className}`}>
            {/* Header */}
            <div className="p-5 pb-3">
                <div className="flex items-start gap-3">
                    {author.avatarUrl ? (
                        <img src={author.avatarUrl} alt="" className="w-12 h-12 rounded-full object-cover flex-shrink-0"/>
                    ) : (
                        <div className="w-12 h-12 dark:bg-slate-700 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex-shrink-0"></div>
                    )}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold dark:text-[#d2e5f5] text-gray-900">{author.name}</h3>
                            <button
                                type="button"
                                aria-label={menuLabel}
                                onClick={onMenuClick}
                                className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-400"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                </svg>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-[#abc2d3]">
                            {author.headline} • {author.time}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-5 pb-4">
                <p className="dark:text-[#d2e5f5] text-gray-700 leading-relaxed">{content}</p>
            </div>

            {/* Media */}
            <div className="px-5 pb-4">
                <div className="h-56 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800 rounded-lg flex items-center justify-center overflow-hidden border border-gray-100 dark:border-slate-700">
                    {media}
                </div>
            </div>

            {/* Engagement stats */}
            <div className="px-5 pb-3">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-[#abc2d3]">
                    <div className="flex items-center gap-1">
                        <div className="flex -space-x-1">
                            {summary.map((reaction) => (
                                <img key={reaction.label} src={reaction.image} alt="" className="w-5 h-5"/>
                            ))}
                        </div>
                        <span className="ml-1">{stats.reactionCount}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span>
                            {stats.commentCount} {commentsSuffix}
                        </span>
                        <span>
                            {stats.repostCount} {repostsSuffix}
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="border-t dark:border-slate-700 border-gray-100 px-3 py-2">
                <div className="flex items-center justify-between gap-1">
                    <ProfessionalReactionButton label={likeLabel} {...reactionProps}/>

                    <button type="button" onClick={onComment} className={actionClass}>
                        <FaRegComment size={18} aria-hidden="true"/>
                        <span className="text-sm font-medium">{commentLabel}</span>
                    </button>

                    <button type="button" onClick={onRepost} className={actionClass}>
                        <BiRepost size={22} aria-hidden="true"/>
                        <span className="text-sm font-medium">{repostLabel}</span>
                    </button>

                    <button type="button" onClick={onShare} className={actionClass}>
                        <BiShare size={20} aria-hidden="true"/>
                        <span className="text-sm font-medium">{shareLabel}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
