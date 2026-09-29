import {motion} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/** Short fade and lift used when the selected tag changes. */
const AnimatedSection = ({children, delay = 0, className}) => (
    <motion.div
        className={className}
        initial={{opacity: 0, y: 6}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35, delay, ease: EASE}}
    >
        {children}
    </motion.div>
);

export default AnimatedSection;
