import React, {useEffect, useState} from "react";

// icons
import {IoIosArrowDown} from "react-icons/io";

// react router dom
import {Link, useNavigate} from "react-router-dom";
import Search from "./Search";
import {FiGithub} from "react-icons/fi";
import {RxDiscordLogo} from "react-icons/rx";

import {motion, AnimatePresence} from "framer-motion";
import {LuSun} from "react-icons/lu";
import {RiMoonClearLine} from "react-icons/ri";

import useZenuiStore from "../../Store/Index.js";
import CommandIcon from "../../SvgIcons/CommandIcon.jsx";
import {CiSearch} from "react-icons/ci";
import {FaRegKeyboard} from "react-icons/fa";
import {TbIcons} from "react-icons/tb";
import {LiaPaletteSolid} from "react-icons/lia";
import ConfigAiIcon from "../../SvgIcons/ConfigAiIcon.jsx";
import {ImHtmlFive2} from "react-icons/im";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const navigate = useNavigate();
    const [isToolsHover, setIsToolsHover] = useState(false);
    const [isActiveToolsMenu, setIsActiveToolsMenu] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);

    const [searchPlaceholderText, setSearchPlaceholderText] = useState("search component");

    const handleSearchClick = () => {
        setIsSearchOpen(true);
    };

    const getTheRouteName = () => {
        return window.location.pathname
    }

    useEffect(() => {
        const handleClickedOutside = (event) => {
            if (!event.target.closest('.zenuiSearchComponent') && !event.target.closest('.zenuiSearchInput')) {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener('click', handleClickedOutside)
        return () => {
            document.removeEventListener('click', handleClickedOutside)
        }
    }, [])

    // theme changing
    const {theme, toggleTheme} = useZenuiStore();

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        const handleShortCut = (event) => {
            event.stopPropagation();
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                setIsSearchOpen(true)
            } else if (event.key === 'Escape') {
                setIsSearchOpen(false)
            }
        }
        document.addEventListener('keydown', handleShortCut);
        return () => {
            document.removeEventListener('keydown', handleShortCut)
        }
    }, [])

    useEffect(() => {
        const placeholderTexts = ["Search components", "Search Blocks", "Explore templates", "Search E-commerce"];
        let index = 0;

        const interval = setInterval(() => {
            setSearchPlaceholderText(placeholderTexts[index]);
            index = (index + 1) % placeholderTexts.length;
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 10) {
            setHasShadow(true);
        } else {
            setHasShadow(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleActiveToolsMenu = () => {
        setIsActiveToolsMenu(!isActiveToolsMenu)
    }

    const handleToolsMouseHover = () => {
        setIsToolsHover(true)
    }

    return (<>
        <nav
            className={`${hasShadow ? 'border-gray-100' : 'border-transparent'} border-b dark:border-darkBorderColor 1024px:flex w-full px-10 backdrop-blur-2xl sticky top-0 left-0 z-[999] hidden transition-all duration-500`}>
            <div className='max-w-[1615px] mx-auto w-full flex items-center justify-between'>
                <div className="flex items-center gap-8">

                    <div className='relative mr-6 h-[52px]'>
                            <span
                                className='px-2.5 dark:bg-slate-800 transition-all duration-500 dark:text-slate-400 absolute right-[-40px] text-[#a4a4a8] top-0 py-0.5 bg-[#f0f0f1] rounded-full text-[12px]'>
                                v2.3
                            </span>
                        <img
                            src="/logo.png"
                            alt="logo"
                            className="w-[70px] cursor-pointer z-10"
                            onClick={() => navigate("/")}
                        />
                    </div>
                    <ul className={`text-gray-600 flex items-center gap-8 font-[500] capitalize text-[1rem]`}>
                        <Link to='/about-us'
                              className='dark:text-darkTextColor cursor-pointer hover:text-[#0FABCA] transition-all duration-200'>
                            About Us
                        </Link>

                        <Link to='/about-us'
                              className='dark:text-darkTextColor cursor-pointer hover:text-[#0FABCA] transition-all duration-200'>
                            Documentation
                        </Link>

                        <Link to='/about-us'
                              className='dark:text-darkTextColor cursor-pointer hover:text-[#0FABCA] transition-all duration-200'>
                            Components
                        </Link>

                        <li
                            onMouseEnter={handleToolsMouseHover}
                            onMouseLeave={() => setIsToolsHover(false)}
                            onClick={handleActiveToolsMenu}
                            className={`${isActiveToolsMenu && 'text-[#0FABCA]'} cursor-pointer relative py-[23px] hover:text-[#0FABCA] dark:text-darkTextColor transition-all duration-200 flex items-center gap-[8px]`}
                        >
                            Tools
                            <IoIosArrowDown
                                className={`${(isToolsHover || isActiveToolsMenu) ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-300`}/>

                            {(isToolsHover || isActiveToolsMenu) && (<motion.div
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8}}
                                className="absolute dark:bg-slate-900 dark:border-darkBorderColor top-[68px] left-[-250px] gap-x-[30px] w-[700px] grid grid-cols-2 gap-y-3 bg-white shadow-[0px_40px_80px_-8px_rgba(145,158,171,0.24)] rounded-high p-5 mt-2"
                                onMouseEnter={() => setIsToolsHover(true)}
                                onMouseLeave={() => setIsToolsHover(false)}
                            >
                                <div className='flex flex-col gap-3'>

                                    <Link to='/shortcut-generator'
                                          className='p-[8px] transition-all duration-200 hover:bg-brandColor/5 dark:hover:bg-slate-800 rounded-normal flex items-center gap-[10px]'>

                                        <div className='bg-brandColor/5 p-[14px] rounded-normal text-[1.6rem]'>
                                            <FaRegKeyboard/>
                                        </div>

                                        <div>
                                            <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-800 transition-all text-[1.1rem] duration-200'>
                                                ShotKey
                                            </p>
                                            <span
                                                className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>generate keyboard shortcuts easily.</span>
                                        </div>

                                    </Link>

                                    <Link to='/shortcut-generator'
                                          className='p-[8px] transition-all duration-200 hover:bg-brandColor/5 dark:hover:bg-slate-800 rounded-normal flex items-center gap-[10px]'>

                                        <div className='bg-brandColor/5 p-3 rounded-normal text-[1.8rem]'>
                                            <LiaPaletteSolid/>
                                        </div>

                                        <div>
                                            <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-800 transition-all text-[1.1rem] duration-200'>
                                                Color Palettes
                                            </p>
                                            <span
                                                className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Harmonized color sets.</span>
                                        </div>

                                    </Link>

                                </div>

                                <div className='flex flex-col gap-3'>

                                    <Link to='/shortcut-generator'
                                          className='p-[8px] transition-all duration-200 hover:bg-brandColor/5 dark:hover:bg-slate-800 rounded-normal flex items-center gap-[10px]'>

                                        <div className='bg-brandColor/5 p-3.5 rounded-normal text-[1.5rem]'>
                                            <TbIcons/>
                                        </div>

                                        <div>
                                            <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-800 transition-all text-[1.1rem] duration-200'>
                                                Icons
                                            </p>
                                            <span
                                                className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Scalable icons for clear visuals.</span>
                                        </div>

                                    </Link>

                                    <Link to='/shortcut-generator'
                                          className='p-[8px] transition-all duration-200 hover:bg-brandColor/5 dark:hover:bg-slate-800 rounded-normal flex items-center gap-[10px]'>

                                        <div className='bg-brandColor/5 p-[14px] rounded-normal'>
                                            <ConfigAiIcon/>
                                        </div>

                                        <div>
                                            <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-800 transition-all text-[1.1rem] duration-200'>
                                                Config AI
                                            </p>
                                            <span
                                                className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Generate tailwind config file by AI.</span>
                                        </div>

                                    </Link>

                                </div>

                                <div className='flex flex-col'>

                                    <Link to='/shortcut-generator'
                                          className='p-[8px] transition-all duration-200 hover:bg-brandColor/5 dark:hover:bg-slate-800 rounded-normal flex items-center gap-[10px]'>

                                        <div className='bg-brandColor/5 p-3.5 rounded-normal text-[1.5rem]'>
                                            <ImHtmlFive2/>
                                        </div>

                                        <div>
                                            <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-800 transition-all text-[1.1rem] duration-200'>
                                                Semantic TagMaster
                                            </p>
                                            <span
                                                className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>HTML semantic tags use cases</span>
                                        </div>

                                    </Link>

                                </div>
                            </motion.div>)}
                        </li>
                    </ul>
                </div>

                <div className="flex items-center gap-2 w-[30%]">
                    <div className="zenuiSearchInput relative w-full" onClick={handleSearchClick}>
                        <CiSearch
                            className={`text-gray-400 absolute dark:text-slate-400 left-3 top-[0.6rem] text-[1.5rem]`}/>
                        <AnimatePresence>
                            <motion.p
                                key={searchPlaceholderText}
                                initial={{opacity: 0, y: -10}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: 10}}
                                transition={{duration: 0.5}}
                                className='text-[0.9rem] dark:text-slate-400 text-gray-400 absolute top-[11px] left-[45px]'
                            >
                                {searchPlaceholderText}
                            </motion.p>
                        </AnimatePresence>
                        <input
                            type="search"
                            name=""
                            id=""
                            readOnly={true}
                            className={`py-[0.59rem] pl-10 dark:border-darkBorderColor border w-full bg-transparent border-gray-200 rounded-normal focus:ring-0 outline-none`}
                        />
                        <span
                            className={`text-gray-400 dark:text-slate-400 transition-all duration-500 px-2 py-1 text-[1rem] font-[400] rounded-md h-[75%] absolute right-1.5 top-[0.35rem] flex items-center justify-center gap-[1px]`}>
                            <CommandIcon/>
                            S
                            </span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <a href='https://discord.gg/qbwytm4WUG' target='_blank'>
                            <RxDiscordLogo
                                className={`text-[2.7rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor transition-all duration-500 dark:text-slate-400 text-gray-400 rounded-normal p-[9px] border border-gray-200 cursor-pointer`}/>
                        </a>

                        <a href='https://github.com/Asfak00/zenui-library' target='_blank'>
                            <FiGithub
                                className={`text-[2.7rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor transition-all duration-500 dark:text-slate-400 text-gray-400 rounded-normal p-[9px] border border-gray-200 cursor-pointer`}/>
                        </a>

                        <div onClick={toggleTheme}
                             className='text-[1.5rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor dark:text-slate-400 text-gray-400 overflow-hidden h-[43px] border border-border rounded-normal px-[9px] p-1 cursor-pointer'>
                            <LuSun
                                className={`${theme === 'dark' ? 'translate-y-[4px] rotate-0' : 'translate-y-[-80px] rotate-[160deg]'} transition-all duration-500`}/>
                            <RiMoonClearLine
                                className={`${theme === 'light' ? 'translate-y-[-19px] rotate-0' : 'translate-y-[80px] rotate-[-260deg]'} transition-all duration-500`}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <div className={`${isSearchOpen ? 'visible z-[100]' : 'invisible z-[-1]'} transition-all duration-500`}>
            <Search isSearchOpen={isSearchOpen}/>
        </div>
    </>);
};

export default Navbar;
