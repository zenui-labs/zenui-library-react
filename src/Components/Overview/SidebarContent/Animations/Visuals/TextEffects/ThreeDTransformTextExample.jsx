import {motion, useAnimationControls} from 'framer-motion';
import {VscDebugRestart} from "react-icons/vsc";
import {useEffect} from "react";

const ThreeDTransformTextExample = () => {

    const controls = useAnimationControls();

    const text = 'Text 3D Transform Animation';

    const transformText = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    };

    const transformChar = {
        hidden: {
            opacity: 0,
            scale: 2,
            rotateX: 180,
            filter: "blur(10px)"
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100
            }
        },
        exit: {
            opacity: 0,
            scale: 5,
            rotateX: -180,
            filter: "blur(10px)",
            transition: {
                duration: 0.3
            }
        }
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
                variants={transformText}
                initial="hidden"
                animate={controls}
                exit="exit"
                className="text-3xl text-center font-bold dark:text-darkTextColor perspective-1000"
                style={{perspective: "1000px", transformStyle: "preserve-3d"}}
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        variants={transformChar}
                        className="inline-block"
                        style={{transformStyle: "preserve-3d"}}
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

export default ThreeDTransformTextExample;