import React, {useState} from "react";

import {RxCross1} from "react-icons/rx";

import {motion} from "framer-motion";
import {IoCodeSlashOutline} from "react-icons/io5";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";

const HookCodeModal = ({setOpen, hook}) => {

    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(hook.codes)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div className="bg-white">
            <div
                className="w-full h-screen fixed top-0 left-0 bg-[#00000030] flex items-center justify-center z-[400000000]">
                <motion.div
                    initial={{opacity: 0, y: -500}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -500}}
                    className="w-[95%] 425px:w-[80%] 1024px:w-[50%] h-[90vh] dark:bg-slate-800 1630px:h-[600px] rounded-md p-4 relative shadow-sm bg-white">
                    <div className='h-full'>
                        <div className='w-full flex items-center justify-between'>
                            <h5 className='text-[1.3rem] font-[600] text-gray-700 dark:text-darkSubTextColor'>{hook?.name}</h5>
                            <RxCross1
                                size={35}
                                color="#333"
                                className="cursor-pointer dark:!text-darkSubTextColor dark:hover:bg-slate-900 p-2 hover:bg-gray-100 hover:text-gray-50 rounded-full"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        <div className='flex justify-end flex-col h-[85%] 1024px:h-[87%] mt-12'>
                            <button onClick={handleCopy}
                                    className='text-[1.rem] relative w-max ml-auto flex items-center gap-[8px] border border-gray-200 py-2 dark:border-darkBorderColor dark:text-darkSubTextColor dark:hover:bg-slate-900/30 px-4 rounded-md hover:bg-gray-100 transition-all duration-200'>
                                <IoCodeSlashOutline/>
                                Copy Code

                                {
                                    isCopied && (
                                        <motion.p
                                            initial={{opacity: 0, scale: 0.7}}
                                            animate={{opacity: 1, scale: 1}}
                                            exit={{opacity: 0, scale: 0.7}}
                                            className='absolute top-[-50px] left-[25%] transform translate-x-[-50%] py-2 px-4 bg-gray-700 text-white text-[0.9rem] dark:bg-slate-900 rounded-md'>
                                            <span
                                                className='w-[10px] h-[10px] dark:bg-slate-900 rotate-[45deg] bg-gray-700 absolute bottom-[-4px] left-[50%] transform translate-x-[-50%]'></span>
                                            Copied
                                        </motion.p>
                                    )
                                }
                            </button>
                            <SyntaxHighlighter language="jsx" style={dracula}
                                               className='overflow-x-scroll dark:border-darkBorderColor dark:border h-full max-w-[350px] 640px:max-w-[780px] 1605px:max-w-[1177px] text-[0.9rem] w-full 1404px:max-w-[1107px] 1024px:max-w-[730px] 1260px:max-w-[880px] max-h-[500px]'
                                               showLineNumbers>
                                {hook?.codes}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HookCodeModal;