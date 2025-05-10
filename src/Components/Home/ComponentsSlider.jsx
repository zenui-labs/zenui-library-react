import React, {useState} from 'react';

// component data
import {allComponents} from "../../Utils/AllComponents.js";

import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
import {useNavigate} from "react-router-dom";

const ComponentsSlider = () => {

    const [components, setComponents] = useState(() => [...allComponents, ...allComponents])

    const navigate = useNavigate();

    return (
        <SectionWrapper className='relative'>
            <SectionHead
                description={'Handcrafted, ready-to-use, and diverse collection of free UI components designed for rapid MVP\n' +
                    '                    development. Just Browse, copy-paste, and you\'re done!'}
                title={'Essential UI Components'} isSubjet={'600+'}/>

            <div
                className="h-[500px] mt-14 relative flex items-center justify-center w-full overflow-hidden [mask-image:_linear-gradient(to_bottom,transparent_0,_black_60px,_black_calc(100%-60px),transparent_100%)]">

                <div
                    className="allComponentSliderUp grid w-full gap-8 grid-cols-2 640px:grid-cols-3 1024px:grid-cols-4">
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
                onClick={() => navigate("/components/all-components")}
                className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-normal absolute -bottom-12 z-20 left-[50%] translate-x-[-50%] hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
            >
                All Components
            </button>
        </SectionWrapper>
    );
};

export default ComponentsSlider;
