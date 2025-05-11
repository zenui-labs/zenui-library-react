import React, {useState, useEffect} from 'react';

// react icons
import {RxCross1} from "react-icons/rx";
import {IoCodeSlashOutline} from "react-icons/io5";
import {motion} from "framer-motion";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

const CodesSidebar = ({sidebarOpen, setSidebarOpen, codes, isGenerating}) => {
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.code_sidebar') && !e.target.closest('.code_generate_btn')) {
                setSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [setSidebarOpen]);

    const handleCopy = () => {
        navigator.clipboard.writeText(codes)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <aside
            className={`${sidebarOpen ? 'translate-x-0 1630px:translate-x-[-129px] 2000px:translate-x-[-200px]' : 'translate-x-[2000px]'} w-full dark:bg-slate-800 640px:w-[60%] 1024px:w-[38%] bg-white fixed top-0 right-0 boxShadow min-h-screen transition-all z-[20000000000] duration-500 code_sidebar px-6 640px:px-8`}>

            <div className='relative'>
                <RxCross1
                    onClick={() => setSidebarOpen(false)}
                    className='p-[8px] absolute top-[15px] dark:text-darkSubTextColor dark:hover:bg-slate-900/80 left-[-10px] 640px:left-[-15px] rounded-full transition-all duration-100 hover:bg-gray-100 text-[2rem] text-gray-800 cursor-pointer'/>
            </div>

            <div className='flex justify-end flex-col h-[85%] 1024px:h-[87%] mt-20'>
                <button onClick={handleCopy}
                        className='text-[1.rem] relative w-max ml-auto flex items-center gap-[8px] border border-gray-200 py-2 px-4 rounded-md hover:bg-gray-100 dark:border-darkBorderColor dark:text-darkSubTextColor dark:hover:bg-slate-600/20 transition-all duration-200'>
                    <IoCodeSlashOutline/>
                    Copy Code

                    {
                        isCopied && (
                            <motion.p
                                initial={{opacity: 0, scale: 0.7}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.7}}
                                className='absolute top-[-50px] left-[25%] dark:bg-slate-900 transform translate-x-[-50%] py-2 px-4 bg-gray-700 text-white text-[0.9rem] rounded-md'>
                                            <span
                                                className='w-[10px] h-[10px] dark:bg-slate-900 rotate-[45deg] bg-gray-700 absolute bottom-[-4px] left-[50%] transform translate-x-[-50%]'></span>
                                Copied
                            </motion.p>
                        )
                    }
                </button>

                {
                    isGenerating ? (
                        <div className='h-[380px] 1024px:h-[440px]'>
                            <div
                                className='relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent w-full h-[60px] rounded-md mt-3 bg-gray-100'></div>
                            <div
                                className='relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent  w-full h-[40px] rounded-md mt-3 bg-gray-100'></div>
                            <div
                                className=' relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent  w-[50%] h-[40px] rounded-md mt-3 bg-gray-100'></div>
                            <div
                                className='relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent  w-[40%] h-[30px] rounded-md mt-3 bg-gray-100'></div>
                            <div
                                className='relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent  w-[80%] h-[30px] rounded-md mt-3 bg-gray-100'></div>
                            <div
                                className='relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-200/40 before:bg-gradient-to-r before:from-transparent dark:before:via-slate-400 dark:bg-slate-700 before:via-slate-200/70 before:to-transparent  w-[65%] h-[40px] rounded-md mt-3 bg-gray-100'></div>
                        </div>
                    ) : (
                        <SyntaxHighlighter language="jsx" style={dracula}
                                           className='zenui_code_snippet overflow-x-scroll rounded-md dark:border dark:border-darkBorderColor h-full 425px:max-w-[380px] 640px:max-w-[780px] 1605px:max-w-[1177px] text-[0.9rem] w-full 1404px:max-w-[1107px] 1024px:max-w-[730px] 1260px:max-w-[880px] max-h-[380px] 1024px:max-h-[430px] max-w-[325px]'
                                           showLineNumbers>
                            {codes}
                        </SyntaxHighlighter>
                    )
                }

            </div>

            <p className='fixed bottom-8 left-[50%] transform translate-x-[-50%] text-center text-[0.9rem] bg-clip-text text-transparent bg-gradient-to-r from-[#0FABCA] from-30% to-[#CD00F1] opacity-80'>Powered
                by @ZenUI</p>
        </aside>
    );
};

export default CodesSidebar;
