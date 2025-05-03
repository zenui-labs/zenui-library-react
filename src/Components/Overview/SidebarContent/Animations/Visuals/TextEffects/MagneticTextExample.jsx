import {motion, useAnimationControls} from 'framer-motion';
import {VscDebugRestart} from "react-icons/vsc";
import {useEffect} from "react";

const MagneticTextExample = () => {

    const controls = useAnimationControls();

    const text = 'Text Magnetic Animation';

    const magneticText = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
            }
        }
    };

    const magneticChar = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: (i) => ({
            opacity: 1,
            y: [100, -20, 0],
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
                delay: i * 0.04
            }
        })
    };

    const handleRestart = async () => {
        await controls.start('hidden');
        controls.start('visible');
    };

    useEffect(() => {
        controls.start('visible');
    }, []);

    return (
        <div className='w-full flex items-center gap-12 justify-center flex-col'>
            <motion.div
                variants={magneticText}
                initial="hidden"
                animate={controls}
                className="text-3xl font-bold overflow-hidden"
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={magneticChar}
                        className="inline-block"
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
    )

}

export default MagneticTextExample