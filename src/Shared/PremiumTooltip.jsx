import React from 'react';

const PremiumTooltip = ({isPremiumModalOpen, setIsPremiumModalOpen, url}) => {
    return (
        <div
            className={`${isPremiumModalOpen ? 'translate-y-0 opacity-100 z-50' : 'translate-y-[10px] opacity-0 z-[-1]'} py-2 transition-all duration-300 w-[300px] px-4 bg-white rounded-md absolute bottom-[55px] border dark:bg-slate-800 dark:border-slate-600 border-gray-200 left-[28%] transform translate-x-[-50%]`}>
            <span
                className='bg-white w-[10px] h-[10px] dark:bg-slate-800 dark:border-slate-600 rotate-[45deg] border-b border-r border-gray-200 absolute bottom-[-5px] left-[50%] transform translate-x-[-50%]'></span>
            <p className='text-[1rem] text-gray-800 dark:text-darkSubTextColor mt-1'>This is a premium example. Are you interested in purchasing
                it?</p>

            <div className='flex items-center gap-[10px] justify-end mt-3 mb-1'>
                <button onClick={() => setIsPremiumModalOpen(false)}
                        className='py-1.5 px-5 dark:border-slate-500 dark:text-darkSubTextColor border text-[0.9rem] active:scale-[0.9] transition-all duration-200 border-gray-300 text-gray-600 rounded-md'>No
                </button>
                <a href={url} target='_blank'
                   className='py-1.5 px-5 text-white active:scale-[0.9] transition-all duration-200 text-[0.9rem] bg-[#0FABCA] rounded-md' rel="noreferrer">Yes</a>
            </div>
        </div>
    );
};

export default PremiumTooltip;
