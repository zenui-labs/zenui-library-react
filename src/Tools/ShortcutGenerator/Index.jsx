import React, {useEffect, useState, useCallback} from 'react';

// component
import Generator from "./Generator.jsx";
import {FiEye} from "react-icons/fi";

const Index = () => {
    const[isContentLoaded, setIsContentLoaded] = useState(false);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsContentLoaded(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full min-h-[90vh] flex mb-8 flex-col items-center relative px-6">

            {isContentLoaded}
            {/* blur */}
            <div
                className={`${isContentLoaded ? 'w-[150px] 1024px:w-[300px] h-[150px] 1024px:h-[300px]' : 'w-0 h-0'} bg-[#0FABCA] transition-all duration-[1000ms] blur-[150px] 1024px:blur-[300px] absolute left-0 top-0`}></div>

            <h4 className="text-[2rem] 1024px:text-[2.5rem] mt-8 1024px:mt-12 text-center 1024px:text-start leading-[40px] 425px:leading-[48px] font-[600] bg-clip-text text-transparent bg-gradient-to-r from-[#0FABCA] to-[#CD00F1]">ShortKey
                - <span>The Shortcut Generator</span></h4>
            <p className='w-full dark:text-darkSubTextColor 640px:w-[75%] 1024px:w-[47%] mt-1 1024px:mt-0 text-center text-[0.9rem] 1024px:text-[1rem] font-normal text-gray-600'>Type
                your custom shortcut and effortlessly generate a function with conditions to execute specific logic when
                the shortcut keys are pressed on your keyboard.</p>

            <div
                className='w-full 640px:w-[75%] 1024px:w-[45%] overflow-hidden flex items-center justify-center flex-col mt-[40px] 1024px:mt-[70px]'>
                <Generator/>
            </div>
        </div>
    );
};

export default Index;
