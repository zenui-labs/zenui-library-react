import React, {useEffect, useState} from 'react';

// component data
import {allComponents} from "../../Utils/AllComponents.js";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";

const ComponentsSlider = () => {

    const [components, setComponents] = useState(() => [...allComponents, ...allComponents])

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <div className='max-w-[1650px] mx-auto relative mt-24'>
            <div>
                <h1 className='text-[1.5rem] 425px:text-[3rem] dark:text-darkTextColor font-[700] text-center px-8'>
                    <span className='heroText text-[#0FABCA] font-[500]'>600+</span> Essential UI Components
                </h1>
                <p className='text-[0.9rem] dark:text-darkSubTextColor 640px:text-[1.1rem] text-center font-[400] text-black/60 px-8 w-full 1024px:w-[50%] mx-auto'>
                    Handcrafted, ready-to-use, and diverse collection of free UI components designed for rapid MVP
                    development. Just Browse, copy-paste, and you're done!
                </p>
            </div>

            <div
                className="h-[500px] mt-14 relative flex items-center justify-center w-full overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">

                <div className="allComponentSliderUp grid w-[80%] gap-8 grid-cols-4">
                    {components.map((item, index) => (
                        <a href={item.url} className="border border-gray-100 dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={item.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="font-[500] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {item.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

            </div>

            <button
                className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-normal absolute -bottom-12 z-20 left-[50%] translate-x-[-50%] hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
            >
                All Components
            </button>

        </div>
    );
};

export default ComponentsSlider;
