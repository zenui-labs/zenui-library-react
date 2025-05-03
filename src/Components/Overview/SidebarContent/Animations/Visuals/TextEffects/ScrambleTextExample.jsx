import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import {VscDebugRestart} from 'react-icons/vsc';

const ScrambleTextExample = () => {
    const [scrambledText, setScrambledText] = useState([]);
    const [restartTrigger, setRestartTrigger] = useState(0);

    const text = 'Text Scramble Animation';

    const finalText = text.split("");

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    // Text scramble effect
    const scrambleText = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03
            }
        }
    };

    const elasticChar = {
        hidden: {
            opacity: 0,
            x: -20,
            scaleX: 1.5,
            scaleY: 0.5
        },
        visible: {
            opacity: 1,
            x: 0,
            scaleX: 1,
            scaleY: 1,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 200,
            }
        }
    };

    useEffect(() => {
        const initialScrambled = finalText.map(() => " ");
        setScrambledText(initialScrambled);

        let iterations = 0;
        const maxIterations = 20;

        const interval = setInterval(() => {
            iterations++;

            setScrambledText(prev =>
                prev.map((char, i) => {
                    if (finalText[i] === " ") return " ";

                    if (iterations >= maxIterations) {
                        clearInterval(interval);
                        return finalText[i];
                    }

                    if (char === finalText[i]) return char;

                    return characters[Math.floor(Math.random() * characters.length)];
                })
            );

            if (iterations > 5) {
                const randomIndex = Math.floor(Math.random() * finalText.length);
                setScrambledText(prev => {
                    const updated = [...prev];
                    if (finalText[randomIndex] !== " ") {
                        updated[randomIndex] = finalText[randomIndex];
                    }
                    return updated;
                });
            }

            if (iterations >= maxIterations) {
                clearInterval(interval);
            }
        }, 60);

        return () => clearInterval(interval);
    }, [restartTrigger]);

    const handleRestart = () => {
        setRestartTrigger(prev => prev + 1);
    };

    return (
        <div className='w-full flex items-center gap-12 justify-center flex-col'>
            <motion.div
                variants={scrambleText}
                initial="hidden"
                animate="visible"
                className="font-mono text-3xl font-bold"
            >
                {scrambledText.map((char, index) => (
                    <motion.span
                        key={index}
                        variants={elasticChar}
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

export default ScrambleTextExample;
