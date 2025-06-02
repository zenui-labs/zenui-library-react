import React from 'react';

const BlockWrapper = ({children}) => {
    return (
        <div
            className={`w-full dark:bg-darkBg transition-all duration-500 1024px:w-[100%] dark:border-darkBorderColor border border-border rounded-normal`}>
            {children}
        </div>
    );
};

export default BlockWrapper;
