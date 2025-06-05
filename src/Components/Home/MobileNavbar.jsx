import React, {useEffect, useRef, useState} from "react";

// icons
import {CiMenuFries, CiSearch} from "react-icons/ci";
import {IoIosArrowDown} from "react-icons/io";
import {RxCross2, RxDiscordLogo} from "react-icons/rx";
import {FiGithub} from "react-icons/fi";

// react router dom
import {Link, useLocation, useNavigate} from "react-router-dom";
import Search from "./Search";
import {AnimatePresence, motion} from "framer-motion";
import {LuSun} from "react-icons/lu";
import {RiMoonClearLine} from "react-icons/ri";
import useZenuiStore from "@/Store/Index.js";
import CommandIcon from "@/SvgIcons/CommandIcon.jsx";
import VersionSelectBox from "@/Components/Home/VersionSelectBox.jsx";
import {CountUp} from "use-count-up";
import {useGitHubStars} from "@/CustomHooks/useGithubStars.js";

const NewMobileNavbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

    const [showStars, setShowStars] = useState(false);
    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef(null);
    const {stars, loading} = useGitHubStars("Asfak00", "zenui-library");

    const [searchPlaceholderText, setSearchPlaceholderText] = useState("search component");

    const navigate = useNavigate();
    const location = useLocation()

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const {theme, toggleTheme} = useZenuiStore();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.zenuiSearchComponent') && !event.target.closest('.zenuiSearchInput')) {
                setIsSearchOpen(false)
            }

            if (!event.target.closest('.mobileSidebar') && !event.target.closest('.mobileSidebarButton')) {
                setSidebarOpen(false)
            }
        }
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        const placeholderTexts = ["Components", "Blocks", "Templates", "E-commerce Kits", "Animated Components"];
        let index = 0;

        const interval = setInterval(() => {
            setSearchPlaceholderText(placeholderTexts[index]);
            index = (index + 1) % placeholderTexts.length;
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setShowStars(true);
        const timer = setTimeout(() => {
            setShowStars(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (showStars && textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [showStars, stars]);

    return (
        <>
            <nav
                className={`${location.pathname === '/' ? 'border-transparent' : 'border-gray-100 dark:border-darkBorderColor'} border-b flex 1024px:hidden items-center justify-between w-full px-5 640px:px-10 backdrop-blur-md  py-3 sticky top-0 left-0 z-50`}>
                <div className="flex items-center gap-8 relative">
                    <div className='relative'>
                        <VersionSelectBox/>
                        <img
                            src="/darklogo.png"
                            alt="logo"
                            className="w-[65px] 1024px:w-[70px] z-20 cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <a href='https://discord.gg/qbwytm4WUG' target='_blank' rel="noreferrer">
                            <RxDiscordLogo
                                className={`text-[2.5rem] dark:border-darkBorderColor dark:text-slate-400 text-gray-400 rounded-normal p-[8px] border border-gray-200 cursor-pointer`}/>
                        </a>

                        <motion.a
                            href="https://github.com/Asfak00/zenui-library"
                            target="_blank"
                            rel="noreferrer"
                            className="hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor transition-all duration-300 dark:text-slate-400 flex items-center text-gray-400 rounded-normal border border-gray-200 cursor-pointer overflow-hidden"
                            initial={{opacity: 0, x: 30}}
                            animate={{opacity: 1, x: 0}}
                            transition={{duration: 0.5}}
                        >
                            <FiGithub className="text-[2.45rem] px-[9px] py-[7px]"/>

                            <motion.div
                                animate={{width: showStars ? textWidth + 16 : 0}}
                                transition={{duration: 0.3}}
                                style={{overflow: "hidden"}}
                            >
                                <p ref={textRef}
                                   className="text-black text-[0.9rem] font-medium pr-6 whitespace-nowrap">
                                    <CountUp isCounting end={stars}
                                             duration={3.2}/>+
                                </p>
                            </motion.div>
                        </motion.a>

                        <div onClick={toggleTheme}
                             className='text-[1.5rem] dark:border-darkBorderColor dark:text-slate-400 text-gray-500 overflow-hidden h-[40px] border border-border rounded-normal px-[8px] p-1 cursor-pointer'>
                            <LuSun
                                className={`${theme === 'dark' ? 'translate-y-[3px] rotate-0' : 'translate-y-[-80px] rotate-[160deg]'} transition-all duration-500`}/>
                            <RiMoonClearLine
                                className={`${theme === 'light' ? 'translate-y-[-21px] rotate-0' : 'translate-y-[80px] rotate-[-260deg]'} transition-all duration-500 text-gray-400`}/>
                        </div>
                    </div>

                    <CiMenuFries onClick={() => setSidebarOpen(!sidebarOpen)}
                                 className="text-[2.5rem] dark:border-darkBorderColor dark:text-slate-300 mobileSidebarButton text-gray-500 rounded-md p-[8px] border border-gray-200 cursor-pointer"/>
                </div>
            </nav>

            {/*  sidebar  */}
            <aside
                className={`${sidebarOpen ? 'translate-x-0 opacity-100 z-[999]' : 'translate-x-[200px] opacity-0 z-[-1]'} fixed top-0 mobileSidebar dark:bg-slate-900 right-0 py-5 px-[1.3rem] w-[90%] block 1024px:hidden 640px:w-[50%] h-screen transition-all duration-500 bg-white toastshadow overflow-y-auto`}>

                <RxCross2
                    className='text-[1.3rem] dark:text-darkSubTextColor text-gray-700 mb-[20px] absolute left-[15px]'
                    onClick={() => setSidebarOpen(false)}/>

                <div className="zenuiSearchInput mt-[45px] relative w-full" onClick={handleSearchClick}>
                    <CiSearch
                        className={`text-gray-400 absolute dark:text-slate-500 left-3 top-[0.7rem] text-[1.5rem]`}/>

                    <AnimatePresence>
                        <motion.p
                            key={searchPlaceholderText}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 10}}
                            transition={{duration: 0.5}}
                            className='text-[1rem] dark:text-slate-500 text-gray-400 absolute top-[10px] left-[45px]'
                        >
                            {searchPlaceholderText}
                        </motion.p>
                    </AnimatePresence>

                    <input
                        type="search"
                        name=""
                        id=""
                        readOnly={true}
                        className={`py-[0.59rem] pl-10 dark:border-slate-700 dark:text-darkSubTextColor dark:placeholder:text-slate-500 border w-full bg-transparent border-gray-200 rounded-md focus:ring-0 outline-none`}
                    />
                    <span
                        className={`text-gray-400 dark:text-slate-400 transition-all duration-500 px-2 py-1 text-[1rem] font-[400] rounded-md h-[75%] absolute right-1.5 top-[0.35rem] flex items-center justify-center gap-[1px]`}>
                            <CommandIcon/>
                            S
                            </span>
                </div>
                <ul className='text-gray-600 flex flex-col mt-5 items-start gap-4 font-[500] capitalize text-[1rem]'>
                    <Link to='/about-us' className='!text-[1rem] dark:text-darkSubTextColor !pl-0 !font-[500]'>About
                        Us</Link>
                    <Link to='/docs/overview'
                          className='!text-[1rem] dark:text-darkSubTextColor !pl-0 !font-[500]'>Documentation</Link>
                    <Link to='/components/all-components'
                          className='!text-[1rem] dark:text-darkSubTextColor !pl-0 !font-[500]'>Components</Link>
                    <li onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                        className='cursor-pointer relative dark:text-darkSubTextColor flex items-center gap-[8px]'>
                        Tools
                        <IoIosArrowDown
                            className={`${toolsDropdownOpen ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-300`}/>
                    </li>

                    {
                        toolsDropdownOpen && (
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                className="grid grid-cols-1 gap-[20px] ml-4"
                            >
                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/shortcut-generator' className='!p-0'>
                                        <div className='flex items-center gap-[10px]'>
                                            <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                ShotKey
                                            </p>
                                        </div>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>generate keyboard shortcuts easily.</span>
                                    </Link>
                                    <Link to='/icons'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Icons
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Scalable icons for clear visuals.</span>
                                    </Link>
                                </div>

                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/color-palette'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Color Palettes
                                        </p>
                                        <span
                                            className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Harmonized color sets.</span>
                                    </Link>

                                    <Link to='/config-generator'
                                          className='!p-0'>
                                        <div className='flex items-center gap-[10px]'>
                                            <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                Config AI
                                            </p>

                                            <div
                                                className='bg-red-50 rounded-full py-0.5 px-2 text-[0.5rem] font-normal text-red-600 border border-red-600'>
                                                For Tailwind v3
                                            </div>
                                        </div>
                                        <span
                                            className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Generate tailwind config file by AI.</span>
                                    </Link>

                                    <Link to='/semantic-tag-master'
                                          className='!p-0'>
                                        <div className='flex items-center gap-[10px]'>
                                            <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                Semantic TagMaster
                                            </p>
                                        </div>
                                        <span
                                            className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>A comprehensive guide about HTML semantic tags</span>
                                    </Link>
                                </div>
                            </motion.div>
                        )
                    }
                </ul>
            </aside>

            <div className={`${isSearchOpen ? 'visible z-[100]' : 'invisible z-[-1]'} transition-all duration-500`}>
                <Search isSearchOpen={isSearchOpen}/>
            </div>
        </>
    );
};

export default NewMobileNavbar;
