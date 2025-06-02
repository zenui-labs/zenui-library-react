import React from 'react';
import {RxCross1} from "react-icons/rx";

const ShortcutHintModal = ({setIsOpen}) => {
    return (
        <div
            className='fixed bottom-[5.5rem] right-0 bg-white dark:bg-slate-800 dark:text-darkSubTextColor shadow-[2px_1px_15px_rgba(0,0,0,0.1)] rounded-normal w-[200px] px-2 text-[0.8rem] flex items-center py-1 z-[999999]'>
            <RxCross1 onClick={() => setIsOpen(false)}
                      className='absolute top-2 right-2 text-gray-500 cursor-pointer dark:hover:text-white hover:text-black'/>
            <p className='leading-[20px]'>Use Keyboard Shortcut. <span
                className='font-medium text-brandColor'>Press:</span>
                <span
                    className='bg-gray-300/50 font-mono text-black/60 px-2 font-semibold py-0.5 rounded text-[0.8rem] dark:text-darkSubTextColor dark:bg-slate-700 mx-1.5'>Space</span>
                To show Cheatsheet Modal.
            </p>
        </div>
    );
};

export default ShortcutHintModal;
