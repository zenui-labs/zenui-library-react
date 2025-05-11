import {motion} from "framer-motion";
import React from "react";

const AnimatedText = ({ text, delay = 0 }) => {
    const characters = Array.from(text);

    return (
        <span className="inline">
      {characters.map((char, index) => (
          <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.05, delay: delay + index * 0.02 }}
          >
              {char}
          </motion.span>
      ))}
    </span>
    );
};

export default AnimatedText;