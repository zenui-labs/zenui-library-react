import React, {useEffect} from 'react';
import {HiChevronDown} from "react-icons/hi";
import {motion, AnimatePresence} from 'framer-motion';

const VersionSelectBox = () => {
    const [selectedVersion, setSelectedVersion] = React.useState('v3');
    const [isOpen, setIsOpen] = React.useState(false);

    const handleVersionChange = (version) => {
        setSelectedVersion(version);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.closest('.version_btn') && !event.target.closest('.version_select_box')) {
                setIsOpen(false);
            }
        }

        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick);

    }, [])

    const versions = [
        {
            label: 'v3',
            url: 'https://zenui.net'
        },
        {
            label: 'v2',
            url: 'https://v2.zenui.net'
        },
    ]

    return (
        <>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className='pl-2 pr-1 version_btn cursor-pointer dark:bg-slate-800 transition-all duration-500 dark:text-slate-400 absolute right-[-38px] text-[#a4a4a8] top-0 py-0.5 bg-[#f0f0f1] rounded-full text-[0.7rem] 1024px:text-[12px] flex items-center'>
                {selectedVersion}
                <HiChevronDown
                    className={`${isOpen ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-200 text-[1rem] 1024px:text-[1.1rem]`}/>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.95, y: -5}}
                        animate={{opacity: 1, scale: 1, y: 0}}
                        exit={{opacity: 0, scale: 0.95, y: -5}}
                        transition={{duration: 0.1}}
                        className='absolute top-[25px] version_select_box left-[65px] bg-white dark:bg-slate-800 shadow-[2px_1px_15px_rgba(0,0,0,0.1)] p-1 rounded-md w-[50px] z-50'>
                        {versions.map(version => (
                            <a href={version.url}
                               key={version.label}
                               onClick={() => handleVersionChange(version.label)}
                               className={`${selectedVersion === version.label ? 'bg-gray-50 dark:bg-slate-900' : ''} py-1 text-center block hover:bg-gray-50 dark:text-white dark:hover:bg-slate-900 cursor-pointer rounded-normal text-black font-medium text-[0.8rem]`}>
                                {version.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default VersionSelectBox;
