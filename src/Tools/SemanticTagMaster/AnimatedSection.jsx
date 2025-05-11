import {motion} from "framer-motion";
import React from "react";

const AnimatedSection = ({ children, delay }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
    >
        {children}
    </motion.div>
);

export default AnimatedSection;