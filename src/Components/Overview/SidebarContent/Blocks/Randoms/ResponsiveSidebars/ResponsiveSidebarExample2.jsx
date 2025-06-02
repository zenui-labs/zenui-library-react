import React, {useState} from 'react';

// react icons
import {GoHome, GoProjectSymlink, GoSidebarCollapse} from "react-icons/go";
import {IoIosArrowDown, IoIosSearch} from "react-icons/io";
import {CiCalendar, CiLogout} from "react-icons/ci";
import {FiBarChart, FiPieChart} from "react-icons/fi";
import {IoNotificationsOutline, IoSettingsOutline} from "react-icons/io5";
import {BsThreeDots} from "react-icons/bs";
import {RiAccountCircleLine} from "react-icons/ri";

const ResponsiveSidebarExample2 = () => {
    const [isCollapse1, setIsCollapse1] = useState(true)
    const [isDropdownOpen, setIsDropdownOpen] = useState(true)

    return (
        <aside className={`bg-white boxShadow dark:bg-slate-900 rounded-md transition-all duration-300 ease`}>
            <div className={`mt-5 ${isCollapse1 ? 'px-[20px]' : 'px-[10px]'} transition-all duration-300 ease-in-out`}>
                {
                    isCollapse1 ? (
                        <div className='flex items-center justify-between'>
                            <img src='https://i.ibb.co/ZHYQ04D/footer-logo.png' alt='logo'
                                 className='w-[130px] cursor-pointer'/>
                            <div className='relative group'>
                                <GoSidebarCollapse
                                    className='text-[1.5rem] dark:text-[#abc2d3] text-gray-600 cursor-pointer'
                                    onClick={() => setIsCollapse1(false)}/>

                                {/* tooltip */}
                                <div
                                    className={`absolute -top-1 right-[-115px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                                    <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                        Collapse
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <img src='https://i.ibb.co/0BZfPq6/darklogo.png' alt='logo'
                             className='w-[50px] mx-auto cursor-pointer'
                             onClick={() => setIsCollapse1(!isCollapse1)}/>
                    )
                }

                {/* search bar */}
                {
                    isCollapse1 ? (
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
                                className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                                <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                    Search
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>

            {/* general section */}
            <div className={`mt-6 ${isCollapse1 ? 'px-[20px]' : 'px-[10px]'} transition-all duration-300 ease-in-out`}>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <GoHome className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Home</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-80px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Home
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <CiCalendar className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Calendar</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-99px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Calendar
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse1 && 'justify-center'} ${isDropdownOpen && 'bg-gray-50 dark:bg-slate-800'}  flex w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group flex-col`}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div
                            className={`${isCollapse1 ? ' justify-between' : 'justify-center'} flex items-center gap-[8px  w-full`}>
                            <div className='flex items-center gap-[8px]'>
                                <GoProjectSymlink className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                                <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Projects</p>
                            </div>

                            <IoIosArrowDown
                                className={`${isDropdownOpen ? 'rotate-[180deg]' : 'rotate-0'} ${isCollapse1 ? 'inline' : 'hidden'} transition-all duration-300 text-[1rem] text-gray-500`}/>
                        </div>

                        {
                            !isCollapse1 && (
                                <>
                                    {/* hover projects dropdown */}
                                    <ul className='translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900 dark:text-[#abc2d3] group-hover:z-30 absolute top-0 left-[70px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px] text-[1rem] text-gray-500'>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Google</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Facebook</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Twitter</li>
                                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md'>Linkedin</li>
                                    </ul>
                                </>
                            )
                        }
                    </div>

                    {/* active projects dropdown */}
                    <ul className={`${isDropdownOpen ? 'h-auto my-3 opacity-100 z-[1]' : 'opacity-0 z-[-1] h-0'} ${isCollapse1 ? 'inline' : 'hidden'} transition-all duration-300 list-disc marker:text-blue-400 ml-[35px] flex flex-col gap-[3px] text-[1rem] dark:text-[#abc2d3] text-gray-500`}>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[10px] py-[5px] rounded-md'>Google</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[10px] py-[5px] rounded-md'>Facebook</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[10px] py-[5px] rounded-md'>Twitter</li>
                        <li className='hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[10px] py-[5px] rounded-md'>Linkedin</li>
                    </ul>


                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <FiBarChart className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Progress</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Progress
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <FiPieChart className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Goals</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Goals
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* setting section */}
            <div
                className={`${isCollapse1 ? 'px-[20px]' : 'px-[10px]'} mt-6 dark:border-slate-700 border-t border-gray-200  transition-all duration-300 ease-in-out`}>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoNotificationsOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Notification</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-98px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Activity
                            </p>
                        </div>
                    </div>

                    <div
                        className={`${isCollapse1 ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoSettingsOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-500'/>
                            <p className={`${isCollapse1 ? 'inline' : 'hidden'} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>Setting</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse1 ? 'hidden' : 'inline'} absolute top-0 right-[-96px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Setting
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* profile section */}
            <div
                className={`${isCollapse1 ? 'justify-between' : 'justify-center'} bg-gray-100 py-3 px-[20px] flex items-center mt-10 dark:bg-slate-800 rounded-b-md`}>
                <div className='flex items-center gap-[10px]'>
                    <img
                        src='https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1724478146~exp=1724481746~hmac=7de91a5b9271ecb4309974122ae6f47d71c01f7fff840c69755f781a03d9e340&w=996'
                        alt='avatar' className='w-[30px] h-[30px] cursor-pointer rounded-full object-cover'/>
                    <h3 className={`${isCollapse1 ? 'inline' : 'hidden'} dark:text-[#abc2d3] text-[0.9rem] text-gray-800 font-[500]`}>Jhon
                        Deo</h3>
                </div>

                <div className={`${isCollapse1 ? 'inline' : 'hidden'} relative group`}>
                    <BsThreeDots className='text-[1.2rem] dark:text-[#abc2d3] text-gray-500 cursor-pointer'/>

                    <ul className='translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 dark:bg-slate-900 group-hover:z-30 absolute top-0 left-[30px] bg-white boxShadow transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]'>
                        <li className='flex items-center dark:text-[#abc2d3] dark:hover:bg-slate-800/50 gap-[7px] text-[0.9rem] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer'>
                            <RiAccountCircleLine/>
                            Profile
                        </li>
                        <li className='flex items-center dark:text-[#abc2d3] dark:hover:bg-slate-800/50 gap-[7px] text-[0.9rem] text-red-500 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer'>
                            <CiLogout/>
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};

export default ResponsiveSidebarExample2;
