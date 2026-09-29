import {useState} from "react";
import {motion, useMotionValue, useTransform, AnimatePresence, type PanInfo, type Variants} from "framer-motion";

export interface SwipeCard {
    src: string;
    alt: string;
}

export type SwipeDirection = "left" | "right";

interface StackCardProps {
    card: SwipeCard;
    frontCard: boolean;
    size: number;
    threshold: number;
    onSwipe?: (direction: SwipeDirection) => void;
}

const frontCardVariants: Variants = {
    animate: {scale: 1, y: 0, opacity: 1},
    exit: (exitX: number) => ({
        x: exitX,
        opacity: 0,
        scale: 0.5,
        transition: {duration: 0.2},
    }),
};

const backCardVariants: Variants = {
    initial: {scale: 0, y: 105, opacity: 0},
    animate: {scale: 0.75, y: 35, opacity: 0.5},
};

const StackCard = ({card, frontCard, size, threshold, onSwipe}: StackCardProps) => {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false,
    });

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (info.offset.x < -threshold) {
            setExitX(-250);
            onSwipe?.("left");
        }
        if (info.offset.x > threshold) {
            setExitX(250);
            onSwipe?.("right");
        }
    };

    return (
        <motion.div
            style={{
                width: size,
                height: size,
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab",
            }}
            // The drag lives on this element so `x` drives the tilt while the card moves.
            drag={frontCard ? "x" : false}
            dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
            onDragEnd={handleDragEnd}
            variants={frontCard ? frontCardVariants : backCardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                frontCard
                    ? {type: "spring", stiffness: 300, damping: 20}
                    : {scale: {duration: 0.2}, opacity: {duration: 0.4}}
            }
        >
            <motion.img
                src={card.src}
                alt={card.alt}
                draggable={false}
                className="w-full bg-white dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-xl p-6"
                whileTap={{cursor: "grabbing"}}
            />
        </motion.div>
    );
};

export interface SwipeCardStackProps {
    /** Cards shown in order. The stack starts over after the last one. */
    cards: SwipeCard[];
    /** Called when the front card is thrown off to one side. */
    onSwipe?: (card: SwipeCard, direction: SwipeDirection) => void;
    /** Width and height of a card in px. */
    size?: number;
    /** How far in px the card must be dragged before it is thrown off. */
    threshold?: number;
    className?: string;
}

/** A card stack where you drag the front card sideways to throw it off and bring up the one behind it. */
export const SwipeCardStack = ({cards, onSwipe, size = 200, threshold = 100, className = ""}: SwipeCardStackProps) => {
    const [index, setIndex] = useState(0);

    if (cards.length === 0) return null;

    const front = cards[index % cards.length];
    const back = cards[(index + 1) % cards.length];

    const handleSwipe = (direction: SwipeDirection) => {
        onSwipe?.(front, direction);
        setIndex((current) => current + 1);
    };

    return (
        <motion.div className={className} style={{width: size, height: size, position: "relative"}}>
            <AnimatePresence initial={false}>
                {/* Keys follow the position in the sequence, so the back card becomes the front card in place. */}
                <StackCard key={index + 1} card={back} frontCard={false} size={size} threshold={threshold}/>
                <StackCard
                    key={index}
                    card={front}
                    frontCard
                    size={size}
                    threshold={threshold}
                    onSwipe={handleSwipe}
                />
            </AnimatePresence>
        </motion.div>
    );
};
