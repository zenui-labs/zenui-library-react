import React from 'react';

import ComparisonCard from "./ComparisonCard.jsx";
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const DarkModeSupport = () => {

    return (
        <SectionWrapper className='!mt-36'>
            <SectionHead
                description={'All components and templates effortlessly support dark mode. Click on the dark mode button, explore\n' +
                    '                    components, and copy the code hassle-free.'} isSubjet={'Dark Mode'}
                title={'Support'}/>

            <div
                className='w-full 1024px:w-[70%] mx-auto mt-14 rounded-high dark:shadow-[2px_1px_35px_rgba(255,255,255,0.2)] dark:bg-slate-800 dark:border-slate-700 overflow-hidden bg-white border border-gray-50 p-5 shadow-[2px_1px_20px_rgba(0,0,0,0.04)]'>
                <ComparisonCard/>
            </div>
        </SectionWrapper>
    );
};

export default DarkModeSupport;
