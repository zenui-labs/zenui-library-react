import {motion, useAnimationControls} from 'framer-motion';
import {useEffect} from 'react';
import {VscDebugRestart} from 'react-icons/vsc';

const WaveTextExample = () => {
    const controls = useAnimationControls();

    const text = "Text Wave Animation";

    const waveAnimation = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.05, // stagger each letter
            },
        },
    };

    const waveLetter = {
        hidden: {y: 0},
        visible: (i) => ({
            y: [0, -12, 0],
            transition: {
                delay: i * 0.05,
                duration: 0.5,
                ease: 'easeInOut',
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
        <div className='w-full flex items-center gap-12 justify-center flex-col'>
            <motion.div
                className="text-3xl font-bold text-center dark:text-darkTextColor"
                initial="hidden"
                animate={controls}
                variants={waveAnimation}
            >
                {text.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        custom={i}
                        variants={waveLetter}
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
    );
};

export default WaveTextExample;
