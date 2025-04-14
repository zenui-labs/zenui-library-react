import React, {useEffect} from 'react';

// component data
import {allComponents} from "../../Utils/AllComponents.js";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";

const ComponentsSlider = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className='max-w-[1650px] mx-auto'>
            <div data-aos="fade-zoom-in" className='w-full items-center justify-center mt-6 1024px:mt-12 text-center mb-8 640px:mb-[3rem] '>

                <div className='gradient-border !rounded-md hover:rotate-0 transition-all duration-300 rotate-[10deg]'>
                    <div className='dark:!bg-darkBgColor bg-white h-full !rounded-md'>
                        <p className='bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-[1.5rem]'>600+</p>
                    </div>
                </div>

                <h1 className='text-[1.5rem] 425px:text-[2.2rem] text-text font-[600] dark:text-darkTextColor px-8'>Try <span
                    className='heroText text-[#0FABCA] font-[500]'>ZenUI</span> Components</h1>
                <p className='text-[0.9rem] dark:text-darkSubTextColor 640px:text-[1.1rem] text-gray-500 px-8 w-full 1024px:w-[35%] mx-auto'>Streamline Your Development with Ready-to-Use
                    UI Components from ZenUI Library</p>
            </div>

            <div
                x-data="{}"
                x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
                className="slider-container w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_300px,_black_calc(100%-300px),transparent_100%)] mb-5 "
            >
                <ul x-ref="logos"
                    className="flex items-center gap-5 w-[50%] 1404px:w-[20%] mx-auto justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none allComponentSliderLeft">
                    {
                        allComponents?.map((item, index) => (
                            <a href={item.url}
                               className={`py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-[#fff] rounded font-[500] min-w-fit`}
                               key={index}>{item.title}</a>
                        ))
                    }

                </ul>
            </div>

            <div
                x-data="{}"
                x-init="$nextTick(() => {
                        let ul = $refs.logos;
                        ul.insertAdjacentHTML('afterend', ul.outerHTML);
                        ul.nextSibling.setAttribute('aria-hidden', 'true');
                    })"
                className="slider-container w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_300px,_black_calc(100%-300px),transparent_100%)] mb-10 640px:mb-20"
            >
                <ul x-ref="logos"
                    className="flex items-center gap-5 w-[50%] 1404px:w-[20%] mx-auto justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none allComponentSliderRight">
                    {
                        allComponents?.map((item, index) => (
                            <a href={item.url}
                               className={`py-2 px-6 dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-[#fff] rounded font-[500] min-w-fit`}
                               key={index}>{item.title}</a>
                        ))
                    }

                </ul>
            </div>
        </div>
    );
};

export default ComponentsSlider;
