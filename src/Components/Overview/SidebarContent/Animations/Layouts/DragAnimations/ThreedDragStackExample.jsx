import {useState} from "react";
import {
    motion,
    useMotionValue,
    useTransform,
    AnimatePresence
} from "framer-motion";

function Card(props) {
    const [exitX, setExitX] = useState(0);

    const x = useMotionValue(0);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: {scale: 1, y: 0, opacity: 1},
        exit: (custom) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: {duration: 0.2}
        })
    };
    const variantsBackCard = {
        initial: {scale: 0, y: 105, opacity: 0},
        animate: {scale: 0.75, y: 35, opacity: 0.5}
    };

    function handleDragEnd(_, info) {
        if (info.offset.x < -100) {
            setExitX(-250);
            props.setIndex(props.index + 1);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            props.setIndex(props.index + 1);
        }
    }

    return (
        <motion.div
            style={{
                width: 200,
                height: 200,
                position: "absolute",
                top: 0,
                x,
                rotate,
                cursor: "grab"
            }}
            variants={props.frontCard ? variantsFrontCard : variantsBackCard}
            initial="initial"
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                props.frontCard
                    ? {type: "spring", stiffness: 300, damping: 20}
                    : {scale: {duration: 0.2}, opacity: {duration: 0.4}}
            }
        >
            <motion.img src='/logo.png' alt='zenui-logo'
                        className='w-full bg-white dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-high p-6'
                        scale
                        whileTap={{cursor: "grabbing"}}
                        drag={props.drag}
                        dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                        onDragEnd={handleDragEnd}
            />
        </motion.div>
    );
}

export function ThreedDragStackExample() {
    const [index, setIndex] = useState(0);

    return (
        <motion.div style={{width: 200, height: 200, position: "relative"}}>
            <AnimatePresence initial={false}>
                <Card key={index + 1} frontCard={false}/>
                <Card
                    key={index}
                    frontCard={true}
                    index={index}
                    setIndex={setIndex}
                    drag="x"
                />
            </AnimatePresence>
        </motion.div>
    );
}
