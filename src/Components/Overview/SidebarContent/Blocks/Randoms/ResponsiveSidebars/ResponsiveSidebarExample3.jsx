import React, {useState} from 'react';

// react icons
import {BsThreeDotsVertical} from "react-icons/bs";
import {IoIosArrowDown, IoIosCode, IoIosSearch} from "react-icons/io";
import {RxDashboard} from "react-icons/rx";
import {GoPerson} from "react-icons/go";
import {
    IoMoonOutline,
    IoNewspaperOutline,
    IoNotificationsOutline,
    IoSettingsOutline,
    IoSunnyOutline
} from "react-icons/io5";
import {TbBrandGoogleAnalytics} from "react-icons/tb";

const ResponsiveSidebarExample3 = () => {
    const [isCollapse2, setIsCollapse2] = useState(true)
    const [isDark, setIsDark] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(true)

    return (
        <aside className={`bg-white boxShadow dark:bg-slate-900 rounded-md transition-all duration-300 ease relative`}>
            <div className={`mt-5 ${isCollapse2 ? 'px-[20px]' : 'px-[10px]'} transition-all duration-300 ease-in-out `}>
                {
                    isCollapse2 ? (
                        <div className='flex items-center justify-between'>
                            <img src='https://i.ibb.co/ZHYQ04D/footer-logo.png' alt='logo'
                                 className='w-[130px] cursor-pointer'/>
                            <div className='relative group'>
                                <BsThreeDotsVertical
                                    className='text-[1.9rem] dark:text-[#abc2d3] dark:hover:bg-slate-800/50 text-gray-500 cursor-pointer p-[5px] rounded-md hover:bg-gray-50'/>
                            </div>
                        </div>
                    ) : (
                        <img src='https://i.ibb.co/0BZfPq6/darklogo.png' alt='logo'
                             className='w-[50px] mx-auto cursor-pointer'/>
                    )
                }

                {/* search bar */}
                {
                    isCollapse2 ? (
                        <div className='relative mt-5'>
                            <input
                                className='px-4 py-2 dark:border-slate-700 dark:bg-transparent dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-border rounded-md w-full pl-[40px] outline-none focus:border-primary'
                                placeholder='Search...'/>
                            <IoIosSearch
                                className='absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]'/>
                        </div>
                    ) : (
                        <div className='w-full relative group'>
                            <IoIosSearch
                                className='text-[2rem] dark:hover:bg-slate-800/50 dark:text-[#abc2d3] mx-auto text-gray-500 mt-2 p-[5px] rounded-md hover:bg-gray-100 cursor-pointer w-full'/>

                            {/* tooltip */}
                            <div
                                className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                                <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                    Search
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* collapse button */}
            <div
                className='bg-gray-200 dark:bg-slate-800 dark:shadow-slate-800 p-[5px] rounded-md w-max absolute top-[50px] right-[-20px] cursor-pointer'
                onClick={() => setIsCollapse2(!isCollapse2)}>
                <IoIosCode className='text-[1.5rem] dark:text-[#abc2d3] text-gray-500'/>
            </div>

            {/* general section */}
            <div className={`mt-6 ${isCollapse2 ? 'px-[20px]' : 'px-[10px]'} transition-all duration-300 ease-in-out`}>

                <p className={`${isCollapse2 ? 'text-start' : 'text-center'} dark:text-[#abc2d3] text-[0.9rem] text-gray-500`}>Main</p>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse2 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <RxDashboard className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Dashboard</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-108px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Dashboard
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse2 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <GoPerson className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Audience</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-99px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Audience
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse2 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoNewspaperOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Posts</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Posts
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse2 && 'justify-center'} ${isDropdownOpen && 'bg-gray-50 dark:bg-slate-800'}  dark:hover:bg-slate-800/50 flex w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group flex-col`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div
                            className={`${isCollapse2 ? ' justify-between' : 'justify-center'} flex items-center gap-[8px  w-full`}>
                            <div className='flex items-center gap-[8px]'>
                                <TbBrandGoogleAnalytics className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                                <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Income</p>
                            </div>

                            <IoIosArrowDown
                                className={`${isDropdownOpen ? 'rotate-[180deg]' : 'rotate-0'} ${isCollapse2 ? 'inline' : 'hidden'} transition-all duration-300 text-[1rem] text-gray-500`}/>
                        </div>

                        {
                            !isCollapse2 && (
                                <>
                                    {/* hover projects dropdown */}
                                    <ul className='translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 absolute top-0 left-[70px] bg-white boxShadow transition-all duration-300 dark:bg-slate-900 dark:text-[#abc2d3] p-[8px] rounded-md flex flex-col gap-[3px] text-[1rem] text-gray-500'>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Earnings</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Refunds</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Declines</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Payouts</li>
                                    </ul>
                                </>
                            )
                        }
                    </div>

                    {/* active projects dropdown */}
                    <ul className={`${isDropdownOpen ? 'h-auto my-3 opacity-100 z-[1]' : 'opacity-0 z-[-1] h-0'} ${isCollapse2 ? 'inline' : 'hidden'} dark:text-[#abc2d3] transition-all duration-300 list-none ml-[20px] pl-[10px] border-l dark:border-slate-700 border-gray-300 flex flex-col gap-[3px] text-[1rem] text-gray-500`}>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer px-[10px] py-[5px] rounded-md'>Earnings</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer px-[10px] py-[5px] rounded-md'>Refunds</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer px-[10px] py-[5px] rounded-md'>Declines</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer px-[10px] py-[5px] rounded-md'>Payouts</li>
                    </ul>

                </div>
            </div>

            {/* setting section */}
            <div
                className={`${isCollapse2 ? 'px-[20px]' : 'px-[10px]'} mt-4 transition-all duration-300 ease-in-out`}>

                <p className={`${isCollapse2 ? 'text-start' : 'text-center'} dark:text-[#abc2d3] text-[0.9rem] text-gray-500`}>Settings</p>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse2 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoNotificationsOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Notification</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Activity
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${isCollapse2 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoSettingsOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse2 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Setting</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse2 ? 'hidden' : 'inline'} absolute top-0 right-[-84px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Setting
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* light & dark mode section */}
            <div
                className={`${isCollapse2 ? 'justify-between px-[20px]' : 'justify-center px-[10px]'} bg-gray-50 py-3 flex items-center mt-10 dark:bg-slate-800 rounded-b-md`}>
                <div
                    className={`${isCollapse2 ? 'inline' : 'hidden'} flex items-center dark:bg-slate-900 bg-gray-200 640px:p-[10px] rounded-md w-full justify-between relative`}>
                    <div
                        className={`${isDark ? 'w-[50%] translate-x-[94%]' : 'w-[50%] translate-x-0'} transition-all duration-300 absolute top-[50%] dark:bg-slate-800/70 transform translate-y-[-50%] left-[4px] bg-white rounded-md h-[85%] w-[100px] z-10`}></div>
                    <button
                        className={`px-[22px] py-[14px] 640px:py-[3px] dark:text-[#abc2d3] rounded-md flex items-center gap-[10px] text-[1rem] text-gray-500 z-20`}
                        onClick={() => setIsDark(false)}>
                        <IoSunnyOutline className='text-[1.2rem]'/>
                        Light
                    </button>
                    <button
                        className={`px-[25px] py-[14px] 640px:py-[3px] dark:text-[#abc2d3] rounded-md flex items-center gap-[10px] text-[1rem] text-gray-500 z-20`}
                        onClick={() => setIsDark(true)}>
                        <IoMoonOutline className='text-[1.2rem]'/>
                        Dark
                    </button>
                </div>

                {/* light & dark mode switch */}
                <div
                    className={`${isCollapse2 ? 'hidden' : 'inline'} bg-gray-200 dark:bg-slate-900 w-full rounded-full flex items-center p-[3px] cursor-pointer`}
                    onClick={() => setIsDark(!isDark)}>
                    <div className={`${isDark ? 'translate-x-[21px]' : 'translate-x-0'} transition-all duration-300`}>
                        {
                            isDark ? (
                                <IoMoonOutline
                                    className='text-[1.6rem] cursor-pointer dark:bg-slate-800/70 dark:text-[#abc2d3] bg-white rounded-full p-[5px]'/>
                            ) : (
                                <IoSunnyOutline
                                    className='text-[1.6rem] cursor-pointer dark:bg-slate-800/70 dark:text-[#abc2d3] bg-white rounded-full p-[5px]'/>
                            )
                        }
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ResponsiveSidebarExample3;
