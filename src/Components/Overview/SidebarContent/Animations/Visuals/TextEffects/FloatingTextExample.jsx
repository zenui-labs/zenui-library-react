import {motion, useAnimationControls} from 'framer-motion';
import {useEffect} from "react";
import {VscDebugRestart} from "react-icons/vsc";

const FloatingTextExample = () => {

    const controls = useAnimationControls();

    const text = 'Text Floating Animation';

    const floatingText = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        }
    };

    const floatingChar = {
        hidden: {
            opacity: 0,
            y: 20
        },
        visible: (i) => ({
            opacity: 1,
            y: [20, 0, -10, 0, -5, 0],
            transition: {
                times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                duration: 1.5,
                delay: i * 0.06,
                ease: "easeInOut"
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
                variants={floatingText}
                initial="hidden"
                animate={controls}
                className="text-3xl text-center dark:text-darkTextColor font-bold"
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={floatingChar}
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
        ;
}

export default FloatingTextExample