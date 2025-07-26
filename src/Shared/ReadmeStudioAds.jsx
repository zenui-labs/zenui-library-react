import React, {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {RxCross1} from "react-icons/rx";

const ReadmeStudioAds = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasClosed = localStorage.getItem('readmeStudioAdsClosed');
        if (!hasClosed) {
            setIsVisible(true);
        }
    }, []);

    const handleClose = (event) => {
        event.stopPropagation()
        localStorage.setItem('readmeStudioAdsClosed', 'true');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="w-full h-screen fixed inset-0 z-[2000000000] flex items-center justify-center bg-black/20 px-6 md:px-0"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >

                    <motion.div
                        className='relative'
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{type: 'spring', stiffness: 100, damping: 10}}
                    >

                        <button
                            onClick={handleClose}
                            className="absolute top-5 right-5 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-50"
                        >
                            <RxCross1 size={20}/>
                        </button>

                        <a
                            href="https://readmestudio.zenui.net"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <img
                                src="/poster%20for%20zenui%20website%20ads.png"
                                alt="ads"
                                className="w-[500px] rounded-xl shadow-xl cursor-pointer"
                            />
                        </a>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ReadmeStudioAds;
