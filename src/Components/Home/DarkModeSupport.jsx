import React, {useEffect, useState} from 'react';

// component data
import {allComponents} from "../../Utils/AllComponents.js";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";
import ComparisonCard from "./ComparisonCard.jsx";

const DarkModeSupport = () => {

    return (
        <div className='max-w-[1650px] mx-auto relative mt-36'>
            <div>
                <h1 className='text-[1.5rem] 425px:text-[3rem] dark:text-darkTextColor font-[700] text-center px-8'>
                    <span className='text-[#0FABCA]'>Dark Mode</span> Support
                </h1>
                <p className='text-[0.9rem] dark:text-darkSubTextColor 640px:text-[1.1rem] text-center font-[400] text-black/60 px-8 w-full 1024px:w-[50%] mx-auto'>
                    All components and templates effortlessly support dark mode. Click on the dark mode button, explore
                    components, and copy the code hassle-free.
                </p>
            </div>

            <div
                className='w-[70%] mx-auto mt-14 rounded-high dark:shadow-[2px_1px_35px_rgba(255,255,255,0.2)] dark:bg-slate-800 dark:border-slate-700 overflow-hidden bg-white border border-gray-50 p-5 shadow-[2px_1px_20px_rgba(0,0,0,0.04)]'>
                <ComparisonCard/>
            </div>

        </div>
    );
};

export default DarkModeSupport;
