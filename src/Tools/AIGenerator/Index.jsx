import {useEffect, useState} from 'react';

// component
import Generator from "./Generator.jsx";

const Index = () => {
    const [isContentLoaded, setIsContentLoaded] = useState(false);


    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsContentLoaded(true);
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full min-h-[90vh] flex 640px:mb-8 flex-col items-center relative px-6">

            {isContentLoaded}
            {/* blur */}
            <div
                className={`${isContentLoaded ? 'w-[150px] 1024px:w-[300px] h-[150px] 1024px:h-[300px]' : 'w-0 h-0'} bg-[#0FABCA] transition-all duration-[1000ms] blur-[150px] 1024px:blur-[300px] absolute left-0 top-0`}></div>

            <h4 className="text-[2rem] 1024px:text-[2.5rem] mt-8 1024px:mt-12 text-center 1024px:text-start leading-[40px] 425px:leading-[48px] font-[600] bg-clip-text mb-1 text-transparent bg-gradient-to-r from-[#0FABCA] to-[#CD00F1]">Config
                AI
                - <span>TailwindCSS Config Generator</span></h4>
            <p className='w-full 640px:w-[90%] 1024px:w-[55%] 1024px:mt-0 text-center text-[0.9rem] 1024px:text-[1rem] font-normal text-gray-600 dark:text-darkSubTextColor'>
                Config AI will provide you with a ready-to-use TailwindCSS v4 configuration with custom
                colors, fonts, and other settings tailored to your project needs.
            </p>

            <div
                className='w-full 640px:w-[90%] 1024px:w-[54%] overflow-hidden flex items-center justify-center flex-col mt-[40px] 1024px:mt-[70px]'>
                <Generator/>
            </div>
        </div>
    );
};

export default Index;
