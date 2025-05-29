import React from 'react';
import {MdOutlineFileDownload} from "react-icons/md";
import {BsFileText} from "react-icons/bs";
import {FaStar} from "react-icons/fa";
import {BiLayout} from "react-icons/bi";
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const MetricsCard = () => {
    const metrics = [
        {
            icon: <MdOutlineFileDownload className="h-10 w-10 text-white"/>,
            value: "24.5k+",
            label: "Active Users",
            bgColor: "bg-gradient-to-br from-pink-500 to-pink-400"
        },
        {
            icon: <BiLayout className="h-10 w-10 text-white"/>,
            value: "500+",
            label: "UI Components",
            bgColor: "bg-gradient-to-br from-green-500 to-green-400"
        },
        {
            icon: <BsFileText className="h-9 w-9 text-white"/>,
            value: "20+",
            label: "Pre-built Templates",
            bgColor: "bg-gradient-to-br from-cyan-500 to-cyan-400"
        },
        {
            icon: <FaStar className="h-9 w-9 text-white"/>,
            value: "303+",
            label: "Github Stars",
            bgColor: "bg-gradient-to-br from-orange-500 to-orange-400"
        }
    ];

    return (
        <SectionWrapper className='!mt-24 relative'>
            <div
                className='rounded-3xl bg-gradient-to-r overflow-hidden relative dark:from-blue-900 from-blue-100 dark:via-[#A576E3]/60 via-white to-cyan-100 z-0 dark:to-cyan-600/80 640px:pt-16 p-8 640px:p-20 1024px:p-24'>

                <img src='https://react.keepdesign.io/images/home/community.svg'
                     alt='shape-image'
                     className='absolute bottom-24 z-[-1] 640px:bottom-0 w-full 640px:w-[900px] rotate-[50deg] 640px:rotate-[30deg] -left-32'/>

                <SectionHead title={'Complete UI For Your Next Project'}
                             description={'Massive number of components, templates, open-source version, free perks and more. All in one place.'}/>

                {/* Metrics grid */}
                <div
                    className='flex items-center justify-center mt-20 flex-wrap 1024px:flex-nowrap gap-8 640px:gap-16 1024px:gap-24'>
                    {metrics.map((metric, index) => (
                        <div key={index} className='flex flex-col items-center'>
                            <div
                                className={`${metric.bgColor} rounded-high p-4 w-16 640px:w-20 h-16 640px:h-20 flex items-center justify-center mb-4`}>
                                {metric.icon}
                            </div>
                            <div
                                className='text-[2rem] 640px:text-4xl dark:text-darkTextColor font-bold mt-2 text-gray-800 text-center'>{metric.value}</div>
                            <div className='text-gray-600 dark:text-darkTextColor mt-1'>{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};

export default MetricsCard;
