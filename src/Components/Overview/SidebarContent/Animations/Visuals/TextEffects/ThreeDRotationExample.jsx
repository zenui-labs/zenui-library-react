import {motion, useAnimationControls} from 'framer-motion';
import {useEffect} from 'react';
import {VscDebugRestart} from 'react-icons/vsc';

const ThreeDRotationExample = () => {
    const controls = useAnimationControls();

    const text = "Text 3D Rotation Animation";

    const rotateAnimation = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.06,
            },
        },
    };

    const rotateLetter = {
        hidden: {
            rotateX: 90,
            opacity: 0,
            transformOrigin: "center",
        },
        visible: (i) => ({
            rotateX: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.6,
                ease: "easeInOut",
            },
        }),
    };

    const handleRestart = async () => {
        await controls.start('hidden');
        controls.start('visible');
    };

    useEffect(() => {
        controls.start('visible');
    }, []);

    return (
        <div className="w-full flex items-center gap-12 justify-center flex-col">
            <motion.div
                className="text-3xl font-bold dark:text-darkTextColor"
                style={{perspective: "1000px", transformStyle: "preserve-3d"}}
                initial="hidden"
                animate={controls}
                variants={rotateAnimation}
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={rotateLetter}
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
    );
};

export default ThreeDRotationExample;
