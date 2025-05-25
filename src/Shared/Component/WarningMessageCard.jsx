import React from 'react';

// react icons
import {SlInfo} from "react-icons/sl";

const WarningMessageCard = ({children, text, width = 90}) => {
    return (
        <div
            className={`p-4 flex gap-3 w-full 1024px:w-[${width}%] bg-yellow-50/50 dark:border-yellow-700/50 border border-yellow-300 rounded-normal mb-8 dark:bg-yellow-700/30`}>
            <p>
                <SlInfo className='text-yellow-600 text-[1.2rem]'/>
            </p>
            <p className='text-yellow-600 text-[0.9rem]'>
                {children ? children : text}
            </p>
        </div>
    );
};

export default WarningMessageCard;
