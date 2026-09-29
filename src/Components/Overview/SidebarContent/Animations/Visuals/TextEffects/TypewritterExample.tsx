import {useState, useEffect, useRef} from 'react';
import {motion} from 'framer-motion';

const TypewriterEffect = () => {
    const [displayText, setDisplayText] = useState('');

    const fullText = 'Text Typewriter Animation';
    const typingSpeed = 100;
    const pauseBeforeRestart = 2000;

    const typingTimerRef = useRef(null);
    const cursorTimerRef = useRef(null);

    const startTypingAnimation = () => {
        setDisplayText('');

        let currentIndex = 0;

        if (typingTimerRef.current) {
            clearInterval(typingTimerRef.current);
        }

        typingTimerRef.current = setInterval(() => {
            setDisplayText(fullText.substring(0, currentIndex + 1));

            currentIndex++;

            if (currentIndex >= fullText.length) {
                clearInterval(typingTimerRef.current);

                setTimeout(() => {
                    startTypingAnimation();
                }, pauseBeforeRestart);
            }
        }, typingSpeed);
    };

    useEffect(() => {
        startTypingAnimation();

        return () => {
            if (typingTimerRef.current) clearInterval(typingTimerRef.current);
            if (cursorTimerRef.current) clearInterval(cursorTimerRef.current);
        };
    }, []);

    return (<div className="flex flex-col items-center justify-center max-w-lg w-full">
        <div className="w-full font-mono text-2xl text-center">
            <div className="relative inline">
                <span className="text-3xl font-bold dark:text-darkTextColor">{displayText}</span>
                <motion.span
                    className="inline-block w-[3px] h-7 bg-black dark:bg-white ml-1 align-text-top"
                    animate={{opacity: [1, 0]}}
                    transition={{
                        duration: 0.8, repeat: Infinity, repeatType: 'reverse',
                    }}
                />
            </div>
        </div>
    </div>);
};

export default TypewriterEffect;
