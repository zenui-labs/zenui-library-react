import {motion} from 'framer-motion';
import {useState} from "react";
import {VscDebugRestart} from "react-icons/vsc";

const ElasticTextExample = () => {
    const [key, setKey] = useState(0);

    const text = 'Text Elastic Animation';

    const elasticChar = {
        hidden: {
            opacity: 0,
            x: -20,
            scaleX: 2,
            scaleY: 0.5
        },
        visible: {
            opacity: 1,
            x: 0,
            scaleX: 1,
            scaleY: 1,
            transition: {
                type: "spring",
                damping: 9,
                stiffness: 300
            }
        }
    };

    const handleRestart = () => {
        setKey(prev => prev + 1);
    };

    return (
        <div className='w-full flex items-center gap-12 justify-center flex-col'>
            <motion.div
                key={key}
                initial="hidden"
                animate="visible"
                className="text-3xl font-bold overflow-hidden"
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={elasticChar}
                        className="inline-block"
                        transition={{delay: i * 0.05}} // Manual stagger
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.div>

            <button
                onClick={handleRestart}
                className="py-1.5 px-3 bg-primary/30 text-[0.9rem] hover:bg-primary/40 active:scale-[0.95] transition-all duration-200 dark:text-darkSubTextColor rounded-lg flex items-center gap-2"
            >
                <VscDebugRestart/>
                Restart
            </button>
        </div>
    );
};

export default ElasticTextExample;
