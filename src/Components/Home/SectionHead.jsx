import React from 'react';

const SectionHead = ({isSubjet, title, description}) => {
    return (
        <div>
            <h1 className='text-[2.2rem] leading-[2.6rem] 640px:leading-[3.5rem] 640px:text-[2.6rem] 1024px:text-[3rem] dark:text-darkTextColor font-[700] text-center px-8'>
                {
                    isSubjet && (
                        <span className='heroText text-[#0FABCA] font-[500]'>{isSubjet}</span>
                    )
                } {" "}{title}
            </h1>
            <p className='mt-2 640px:mt-0 dark:text-darkSubTextColor text-[1rem] 1024px:text-[1.1rem] text-center font-[400] text-black/60 640px:px-8 w-full 1024px:w-[50%] mx-auto'>
                {description}
            </p>
        </div>
    );
};

export default SectionHead;
