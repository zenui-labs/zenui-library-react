import {useCallback, useEffect, useRef, useState, type FocusEvent, type KeyboardEvent, type ReactNode} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {BiShare} from "react-icons/bi";
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
    /** Shown after the headline, for example "1d". */
    time: string;
    /** Leave empty to show a gray placeholder circle. */
    avatarUrl?: string;
}

const containerVariants: Variants = {
    hidden: {opacity: 0, scale: 0.8, y: 10},
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {type: "spring", stiffness: 500, damping: 40, mass: 0.8, when: "beforeChildren", staggerChildren: 0.05},
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 10,
        transition: {type: "spring", stiffness: 100, damping: 20, mass: 1},
    },
};

const emojiVariants: Variants = {
    hidden: {opacity: 0, scale: 0.5, y: 10},
    visible: {opacity: 1, scale: 1, y: 0, transition: {type: "spring", stiffness: 400, damping: 15}},
};

const tooltipVariants: Variants = {
    hidden: {opacity: 0, y: 5, scale: 0.9},
    visible: {opacity: 1, y: 0, scale: 1, transition: {type: "spring", stiffness: 500, damping: 30, mass: 0.8}},
};

export interface LinkedinReactionButtonProps {
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

/** A Like button that opens a row of reactions on hover or focus. A click on the button picks the first reaction. */
export const LinkedinReactionButton = ({
    reactions,
    value,
    defaultValue = null,
    onChange,
    label = "Like",
    closeDelay = 300,
    className = "",
}: LinkedinReactionButtonProps) => {
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
            className={`relative ${className}`}
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
                className={`flex items-center p-2 gap-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100 ${selectedReaction ? selectedReaction.color : ""}`}
                onClick={() => select(selectedReaction?.label ?? reactions[0].label)}
            >
                {selectedReaction ? (
                    <img src={selectedReaction.image} alt="" className="w-[22px]"/>
                ) : (
                    <MdOutlineThumbUp className="mr-2" size={18} aria-hidden="true"/>
                )}
                <span>{selectedReaction?.label ?? label}</span>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-full left-0 dark:bg-slate-700 flex gap-1 bg-white rounded-full shadow-lg px-3 py-1.5 mb-2"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                    >
                        {reactions.map((reaction) => (
                            <motion.div
                                layout
                                key={reaction.label}
                                className={`${hovered === reaction.label ? "mx-3" : "mx-0"} relative w-[40px] h-[40px]`}
                            >
                                <motion.button
                                    type="button"
                                    className="w-full h-full cursor-pointer"
                                    variants={emojiVariants}
                                    whileHover={{scale: 1.8, y: -18, transition: {type: "keyframes"}}}
                                    onClick={() => select(reaction.label)}
                                    onMouseEnter={() => setHovered(reaction.label)}
                                    onMouseLeave={() => setHovered(null)}
                                    onFocus={() => setHovered(reaction.label)}
                                    onBlur={() => setHovered(null)}
                                >
                                    <img src={reaction.image} alt={reaction.label} className="w-full h-full"/>
                                </motion.button>

                                <AnimatePresence>
                                    {hovered === reaction.label && (
                                        <motion.div
                                            aria-hidden="true"
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
    );
};

export interface LinkedinReactionTrailProps extends Omit<LinkedinReactionButtonProps, "className" | "label"> {
    author: PostAuthor;
    content: string;
    /** Image or other media for the post. Defaults to a placeholder box. */
    media?: ReactNode;
    likeLabel?: string;
    commentLabel?: string;
    shareLabel?: string;
    commentPlaceholder?: string;
    onComment?: () => void;
    onShare?: () => void;
    className?: string;
}

/** A LinkedIn style post card whose Like button opens an animated reaction picker. */
export const LinkedinReactionTrail = ({
    author,
    content,
    media = "[Post image]",
    likeLabel = "Like",
    commentLabel = "Comment",
    shareLabel = "Share",
    commentPlaceholder = "Add a comment...",
    onComment,
    onShare,
    className = "",
    ...reactionProps
}: LinkedinReactionTrailProps) => (
    <div className={`w-full p-6 bg-white dark:bg-slate-800 rounded-lg shadow-[2px_1px_15px_rgba(0,0,0,0.05)] ${className}`}>
        <div className="flex items-center mb-4">
            {author.avatarUrl ? (
                <img src={author.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover"/>
            ) : (
                <div className="w-10 h-10 dark:bg-slate-700 bg-gray-200 rounded-full"></div>
            )}
            <div className="ml-3">
                <p className="font-semibold dark:text-[#d2e5f5]">{author.name}</p>
                <p className="text-xs text-gray-500 dark:text-[#abc2d3]">
                    {author.headline} • {author.time}
                </p>
            </div>
        </div>

        <p className="mb-4 dark:text-[#d2e5f5]">{content}</p>

        <div className="h-48 bg-gray-100 dark:bg-slate-900 rounded-lg mb-4 flex items-center justify-center overflow-hidden text-gray-400">
            {media}
        </div>

        <div className="border-t border-b dark:border-slate-700 dark:text-[#d2e5f5] py-1 flex justify-between">
            <LinkedinReactionButton label={likeLabel} {...reactionProps}/>

            <button type="button" onClick={onComment} className="flex items-center p-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100">
                <FaRegComment className="mr-2" size={18} aria-hidden="true"/>
                <span>{commentLabel}</span>
            </button>

            <button type="button" onClick={onShare} className="flex items-center p-2 rounded-lg dark:hover:bg-slate-900 hover:bg-gray-100">
                <BiShare className="mr-2" size={18} aria-hidden="true"/>
                <span>{shareLabel}</span>
            </button>
        </div>

        <div className="mt-4 flex">
            <div className="w-8 h-8 dark:bg-slate-700 bg-gray-200 rounded-full"></div>
            <div className="ml-2 flex-grow">
                <div className="border rounded-full dark:bg-slate-900 dark:border-slate-700 bg-gray-50 px-4 py-2 text-gray-500 text-sm">
                    {commentPlaceholder}
                </div>
            </div>
        </div>
    </div>
);
