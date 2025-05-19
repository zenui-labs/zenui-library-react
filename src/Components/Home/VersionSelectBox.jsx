import React from 'react';
import {HiChevronDown} from "react-icons/hi";
import {motion, AnimatePresence} from 'framer-motion';

const VersionSelectBox = () => {
    const [selectedVersion, setSelectedVersion] = React.useState('v2.3');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleVersionChange = (version) => {
        setSelectedVersion(version);
        setIsOpen(false);
    };

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='pl-2 pr-1 cursor-pointer dark:bg-slate-800 transition-all duration-500 dark:text-slate-400 absolute right-[-48px] text-[#a4a4a8] top-0 py-0.5 bg-[#f0f0f1] rounded-full text-[12px] flex items-center'>
                {selectedVersion}
                <HiChevronDown
                    className={`${isOpen ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-200 text-[1.1rem]`}/>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.95, y: -5}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: -5}}
                        transition={{duration: 0.1}}
                        className='absolute top-[25px] left-[65px] bg-white dark:bg-slate-800 shadow-[2px_1px_15px_rgba(0,0,0,0.1)] p-1 rounded-normal w-full z-50'>
                        {['v2.3', 'v2.2'].map(version => (
                            <p
                                key={version}
                                onClick={() => handleVersionChange(version)}
                                className={`${selectedVersion === version ? 'bg-gray-50 dark:bg-slate-900' : ''} py-1 text-center hover:bg-gray-50 dark:text-white dark:hover:bg-slate-900 cursor-pointer rounded-normal text-black dark:text-white font-medium text-[0.8rem]`}>
                                {version}
                            </p>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VersionSelectBox;
