import {useState} from 'react';

// react icons
import {IoIosSearch} from "react-icons/io";
import {AiOutlineMail} from "react-icons/ai";
import {MdOutlineAnalytics, MdOutlinePrivacyTip, MdSchedule} from "react-icons/md";
import {FaPlus} from "react-icons/fa6";
import {IoChatbubblesOutline, IoFolderOpenOutline, IoNewspaperOutline, IoSettingsOutline} from "react-icons/io5";
import {PiShoppingBagLight} from "react-icons/pi";
import {FiFlag} from "react-icons/fi";
import {RiTeamLine} from "react-icons/ri";
import {LuHelpCircle} from "react-icons/lu";

const ResponsiveSidebarExample1 = () => {
    const [isCollapse, setIsCollapse] = useState(true)

    return (
        <aside
            className={`${isCollapse ? 'py-[20px] px-[30px]' : 'py-[15px] px-[10px]'} bg-white boxShadow rounded-md transition-all duration-300 dark:bg-slate-900 ease`}>
            {
                isCollapse ? (
                    <img src='https://i.ibb.co/ZHYQ04D/footer-logo.png' alt='logo'
                         className='w-[130px] cursor-pointer'
                         onClick={() => setIsCollapse(!isCollapse)}/>
                ) : (
                    <img src='https://i.ibb.co/0BZfPq6/darklogo.png' alt='logo'
                         className='w-[50px] mx-auto cursor-pointer'
                         onClick={() => setIsCollapse(!isCollapse)}/>
                )
            }

            {/* search bar */}
            {
                isCollapse ? (
                    <div className='relative mt-5'>
                        <input
                            className='px-4 py-2 dark:border-slate-700 dark:bg-transparent dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-border rounded-md w-full pl-[40px] outline-none focus:border-primary'
                            placeholder='Search...'/>
                        <IoIosSearch
                            className='absolute dark:text-slate-500 top-[9px] left-2 text-[1.5rem] text-[#adadad]'/>
                    </div>
                ) : (
                    <div className='w-full relative group'>
                        <IoIosSearch
                            className='text-[2rem] dark:text-slate-500 dark:hover:bg-slate-800 mx-auto text-gray-500 mt-2 p-[5px] rounded-md hover:bg-gray-100 cursor-pointer w-full'/>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-85px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 bg-gray-600 dark:text-[#abc2d3] text-secondary rounded px-3 py-[5px]">
                                Search
                            </p>
                        </div>
                    </div>
                )
            }

            {/* general section */}
            <div className='mt-6'>
                <p className={`${isCollapse ? 'text-[1rem]' : 'text-[0.9rem] text-center'} dark:text-[#abc2d3] text-gray-500 font-[400]`}>General</p>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <AiOutlineMail className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Message</p>
                        </div>
                        <span
                            className={`${isCollapse ? 'inline' : 'hidden'} py-[1px] px-[9px] bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800/20`}>3</span>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Message
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <MdSchedule className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Schedule</p>
                        </div>
                        <div className='flex items-center gap-[5px]'>
                                                <span
                                                    className={`${isCollapse ? 'inline' : 'hidden'} py-[1px] px-[9px] bg-blue-100 text-blue-700 dark:bg-blue-800/20 rounded-full`}>3</span>
                            <FaPlus
                                className={`${isCollapse ? 'inline' : 'hidden'} p-[7px] dark:bg-blue-800/20 bg-blue-100 text-blue-700 rounded-full text-[1.6rem]`}/>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Schedule
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <MdOutlineAnalytics className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Analytics</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-100px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] dark:bg-slate-800 dark:text-[#abc2d3] w-max bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Analytics
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoNewspaperOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>News</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-76px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                News
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <PiShoppingBagLight className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Recruitment</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-118px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Recruitment
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoFolderOpenOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Projects</p>
                        </div>
                        <FaPlus
                            className={`${isCollapse ? 'inline' : 'hidden'} p-[7px] bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800/20 text-[1.6rem]`}/>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-93px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Projects
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* myspace section */}
            <div className='mt-6'>
                <p className={`${isCollapse ? 'text-[1rem]' : 'text-[0.9rem] text-center'} text-gray-500 font-[400] dark:text-[#abc2d3]`}>Myspace</p>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <FiFlag className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Activity</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-88px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Activity
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <RiTeamLine className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Shared</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-86px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Shared
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <MdOutlinePrivacyTip className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Privacy</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-87px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Privacy
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* support section */}
            <div className='mt-6'>
                <p className={`${isCollapse ? 'text-[1rem]' : 'text-[0.9rem] text-center'} text-gray-500 font-[400] dark:text-[#abc2d3]`}>Support</p>

                <div className='mt-3 flex flex-col gap-[5px]'>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoSettingsOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Setting</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-87px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Setting
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <LuHelpCircle className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Help!</p>
                        </div>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-74px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Help!
                            </p>
                        </div>
                    </div>
                    <div
                        className={`${isCollapse ? 'justify-between' : 'justify-center'} flex items-center w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}>
                        <div className='flex items-center gap-[8px]'>
                            <IoChatbubblesOutline className='text-[1.3rem] dark:text-[#abc2d3] text-gray-800'/>
                            <p className={`${isCollapse ? 'inline' : 'hidden'} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>Chat</p>
                        </div>
                        <span
                            className={`${isCollapse ? 'inline' : 'hidden'} py-[1px] px-[9px] bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800/20`}>3</span>

                        {/* tooltip */}
                        <div
                            className={`${isCollapse ? 'hidden' : 'inline'} absolute top-0 right-[-72px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500`}>
                            <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-secondary rounded px-3 py-[5px]">
                                Chat
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ResponsiveSidebarExample1;
