import {motion} from "framer-motion";

export function DragPositionLockExample() {
    return (
        <motion.img src='/logo.png' alt='zenui-logo'
                    className='w-[200px] dark:bg-slate-800 shadow-[2px_1px_20px_rgba(0,0,0,0.07)] !cursor-grab rounded-high p-6'
                    drag
                    dragDirectionLock
                    dragConstraints={{top: 0, right: 0, bottom: 0, left: 0}}
                    dragTransition={{bounceStiffness: 600, bounceDamping: 20}}
                    dragElastic={0.5}
                    whileTap={{cursor: "grabbing"}}

        />
    );
}
