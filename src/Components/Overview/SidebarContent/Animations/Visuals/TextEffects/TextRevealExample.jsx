import {useAnimationControls, motion} from 'framer-motion';
import {useEffect} from 'react';
import {VscDebugRestart} from "react-icons/vsc";

const TextRevealStatic = () => {
    const controls = useAnimationControls();

    const text = 'Text Reveal Animation';

    const textReveal = {
        hidden: {
            clipPath: 'inset(0 100% 0 0)', opacity: 0,
        }, visible: {
            clipPath: 'inset(0 0% 0 0)', opacity: 1, transition: {
                duration: 2, ease: 'easeInOut',
            },
        },
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
                className="text-3xl font-bold dark:text-darkTextColor"
                initial="hidden"
                animate={controls}
                variants={textReveal}
                style={{display: 'inline-block'}}
            >
                {text}
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

export default TextRevealStatic
