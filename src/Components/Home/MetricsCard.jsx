"use client"

import React from 'react';
import {MdOutlineFileDownload} from "react-icons/md";
import {LayoutGroup} from "framer-motion";
import {BsFileText} from "react-icons/bs";
import {FaStar} from "react-icons/fa";
import {BiLayout} from "react-icons/bi";

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
        <section className='relative mt-24 max-w-[1300px] mx-auto'>

            <div
                className='rounded-3xl bg-gradient-to-r overflow-hidden relative dark:from-blue-800 from-blue-100 dark:via-slate-800 via-white to-cyan-100 dark:to-cyan-600/90 pt-16 p-24'>

                <img src='https://react.keepdesign.io/images/home/community.svg'
                     className='absolute bottom-0 w-[900px] rotate-[30deg] -left-32'/>

                <h1 className='text-[1.5rem] 425px:text-[3rem] dark:text-darkTextColor font-[700] text-center px-8'>
                    Complete UI For Your Next Project
                </h1>
                <p className='text-[0.9rem] dark:text-darkSubTextColor 640px:text-[1.1rem] text-center font-[400] text-black/60 px-8 w-full 1024px:w-[70%] mx-auto'>
                    Massive number of components, templates, open-source version, free perks and more. All in one place.
                </p>

                {/* Metrics grid */}
                <div className='flex items-center justify-center mt-20 gap-24'>
                    {metrics.map((metric, index) => (
                        <div key={index} className='flex flex-col items-center'>
                            <div
                                className={`${metric.bgColor} rounded-high p-4 w-20 h-20 flex items-center justify-center mb-4`}>
                                {metric.icon}
                            </div>
                            <div
                                className='text-4xl dark:text-darkTextColor font-bold mt-2 text-gray-800'>{metric.value}</div>
                            <div className='text-gray-600 dark:text-darkTextColor mt-1'>{metric.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MetricsCard;
