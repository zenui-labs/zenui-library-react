import React, {useEffect, useState} from 'react';

import {IconsData} from "@utils/IconsData.js";
import IconSidebar from "./IconSidebar.jsx";
import NoSearchFoundIcon from "@/SvgIcons/NoSearchFoundIcon.jsx";
import DeleteIcon from "@/SvgIcons/DeleteIcon.jsx";
import CursorIcon from "@/SvgIcons/CursorIcon.jsx";
import ShareIcon from "@/SvgIcons/ShareIcon.jsx";
import {CiSearch} from "react-icons/ci";

const Icons = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [selectedIcon, setSelectedIcon] = useState({})
    const [searchInputValue, setSearchInputValue] = useState("");
    const [filteredIcons, setFilteredIcons] = useState(IconsData);
    const [activeFilterOption, setActiveFilterOption] = useState({name: "All", slug: "all"},);

    const handleIconClick = (data) => {
        setSidebarOpen(true)
        setSelectedIcon(data)
    }

    const handleIconSearch = (e) => {
        const value = e.target.value;

        setSearchInputValue(value);

        if (value === '') {
            const filter = IconsData?.filter((icon) => icon?.groupName?.toLowerCase().includes(activeFilterOption?.slug?.toLowerCase()));

            setFilteredIcons(filter)
        } else {
            const filter = filteredIcons?.filter((icon) => icon.name.toLowerCase().includes(value.toLowerCase()));

            setFilteredIcons(filter);
        }
    }

    useEffect(() => {

        if (activeFilterOption.slug === 'all') {
            setFilteredIcons(IconsData)
        } else {
            const filter = IconsData?.filter((icon) => icon?.groupName?.toLowerCase().includes(activeFilterOption?.slug?.toLowerCase()));

            setFilteredIcons(filter)
        }

    }, [activeFilterOption])

    const iconFilterOptions = [
        {name: "All", slug: "all"},
        {name: "E-Commerce", slug: "e_commerce"},
        {name: "Social Media", slug: "social"},
        {name: "Technology", slug: "technology"},
        {name: "Healthcare", slug: "healthcare"},
        {name: "Education", slug: "education"},
        {name: "Component", slug: "component"},
        {name: "Finance", slug: "finance"},
        {name: "Date & Time", slug: "date_&_time"},
        {name: "Actions", slug: "actions"},
        {name: "Construction", slug: "construction"},
        {name: "Alignment", slug: "alignment"},
        {name: "Gaming", slug: "gaming"},
        {name: "File Icon", slug: "file_icon"},
        {name: "Fitness", slug: "fitness"},
        {name: "Music", slug: "music"},
        {name: "Brand", slug: "brand"},
        {name: "Weather", slug: "weather"},
        {name: "Medical", slug: "medical"},
        {name: "People", slug: "people"},
        {name: "Programming", slug: "programming"},
        {name: "Marketing", slug: "marketing"},
        {name: "Automation", slug: "automation"},
        {name: "AI & Machine Learning", slug: "ai_machine_learning"},
        {name: "Databases", slug: "databases"},
        {name: "Devices", slug: "devices"},
    ];


    return (
        <>
            <section
                className='min-h-screen max-w-[1700px] mx-auto w-full pt-[2rem] 1024px:pt-[3rem] !px-8 425px:!px-10 relative'>

                <div
                    className='absolute top-[110px] 640px:top-[60px] opacity-20 right-[50%] 640px:right-[30%] 1024px:right-[400px] animate-pulse dark:animate-none dark:opacity-10'>
                    <DeleteIcon/>
                </div>
                <div
                    className='absolute top-[180px] 640px:top-[140px] opacity-20 right-[14%] 1024px:right-[210px] animate-pulse dark:animate-none dark:opacity-10'>
                    <CursorIcon/>
                </div>
                <div
                    className='absolute top-[40px] 640px:top-[40px] opacity-20 right-[0] 640px:right-[60px] animate-pulse dark:animate-none dark:opacity-10'>
                    <ShareIcon/>
                </div>

                {/*<div className='w-[90px] h-[400px] bg-gradient-to-b from-purple-400 to-blue-400 absolute right-[180px] top-[0px] rotate-[60deg] blur-[90px]'></div>*/}
                <h2 className="font-[600] dark:text-darkTextColor text-[#0FABCA] uppercase text-[2rem] 425px:text-[2.5rem]">
                    ZenUI Icons
                </h2>
                <p className="text-text text-[0.9rem] dark:text-darkSubTextColor">
                    Explore and Enjoy ZenUI Library’s Collection of Icons Free to Use, Customize, and Download for Any
                    Project
                </p>

                <p className="text-text text-[0.9rem] dark:text-darkSubTextColor mt-6 w-full 640px:w-[70%]">
                    Discover a diverse collection of over 400 icons. You can easily find and customize your favorite
                    icon by adjusting its color, size, and other properties. Whether you need the icon in SVG or PNG
                    format, you can download it directly or copy the SVG code for quick integration into your projects.
                    Explore and personalize to fit your needs!
                </p>

                {/*  search area  */}
                <div className='mt-6 relative'>
                    <input
                        className='w-full dark:bg-slate-900 dark:border-darkBorderColor 1024px:w-[40%] rounded-md border border-border py-3 pr-4 pl-[40px] focus:border-primary dark:text-darkSubTextColor dark:outline-none dark:focus:outline-none focus:outline-2 focus:outline-primary'
                        placeholder='Search icon...' maxLength='50' onInput={handleIconSearch}/>
                    <CiSearch
                        className='absolute top-[50%] transform translate-y-[-50%] text-gray-400 text-[1.4rem] left-3'/>
                </div>

                <div className='overflow-x-auto scrollbar pb-2 w-full'>
                    <div className='flex items-center gap-[10px] mt-[20px] flex-nowrap 1024px:flex-wrap'>
                        {
                            iconFilterOptions?.map((option) => (
                                <button onClick={() => setActiveFilterOption(option)}
                                        className={`${activeFilterOption.slug === option.slug && 'bg-[#0fabca] !text-white'} py-2 px-4 border dark:border-darkBorderColor dark:text-darkSubTextColor border-gray-200 rounded-md min-w-max hover:bg-[#0fabca] hover:text-white transition-all duration-300 text-gray-700 text-[0.9rem]`}
                                        key={option.name}>
                                    {option.name}
                                </button>
                            ))
                        }
                    </div>
                </div>

                {
                    filteredIcons?.length <= 0 && (
                        <div className='flex items-center justify-center w-full flex-col mt-20'>
                            <NoSearchFoundIcon class='dark:text-darkTextColor'/>
                            <h3 className='text-[1.3rem] font-semibold mt-2 dark:text-darkTextColor'>No Icon Found!</h3>
                            <p className='text-[0.9rem]  text-text mt-2 text-center 640px:text-start dark:text-darkSubTextColor'>Please
                                check the
                                spelling or try alternative keyword</p>
                        </div>
                    )
                }

                {/*  icons area  */}
                <div className='grid grid-cols-2 400px:flex gap-[10px] mt-12 400px:flex-wrap mb-[7rem]'>
                    {
                        filteredIcons?.map((icon, index) => (
                            <div onClick={() => handleIconClick(icon)} key={index}
                                 className={`${selectedIcon.id === icon.id ? 'border-b-primary border-primary shadow-md' : ''} px-5 py-4 cursor-pointer bg-white border border-border dark:bg-slate-900 dark:border-darkBorderColor border-b-[5px] hover:border-b-primary hover:shadow-md transition-all duration-200 rounded-md hover:border-primary icon 400px:w-[150px] text-center flex items-center justify-center flex-col`}>
                                <div className='iconContainer' dangerouslySetInnerHTML={{__html: icon.iconCode}}></div>
                                <h4 className='text-[0.7rem] mt-5 text-[#2d2d2d] dark:text-darkSubTextColor'>{icon.name}</h4>
                            </div>
                        ))
                    }
                </div>
            </section>

            <IconSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} iconData={selectedIcon}
                         setSelectedIconData={setSelectedIcon}/>
        </>
    );
};

export default Icons;
