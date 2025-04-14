import React from 'react';

// data
import { allComponents } from "../../../../../../Utils/AllComponents.js";

const VerticalMarquee = () => {

    const doubledComponents = allComponents ? [...allComponents, ...allComponents] : [];

    return (
        <div className='flex gap-5'>
            <div className="slider-container h-80 w-full relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">

                <div className="allComponentSliderUp flex flex-col items-center gap-5">
                    {doubledComponents.map((item, index) => (
                        <a
                            href={item.url}
                            className="py-2 px-4 640px:px-6 w-32 640px:w-48 text-center dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium"
                            key={index}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>

            <div className="slider-container h-80 w-full relative overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">
                <div className="allComponentSliderDown flex flex-col items-center gap-5">
                    {doubledComponents.map((item, index) => (
                        <a
                            href={item.url}
                            className="py-2 px-4 640px:px-6 w-32 640px:w-48 text-center dark:bg-[#0FABCA]/90 bg-[#0FABCA] capitalize border dark:border-[#0FABCA]/90 border-[#0FABCA] text-white rounded font-medium"
                            key={index}
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VerticalMarquee;