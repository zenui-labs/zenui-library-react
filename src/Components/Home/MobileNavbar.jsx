import React, {useEffect, useState} from "react";

// icons
import {CiMenuFries} from "react-icons/ci";
import {IoIosArrowDown, IoIosSearch} from "react-icons/io";
import {RxCross2, RxDiscordLogo} from "react-icons/rx";
import {FiGithub} from "react-icons/fi";

// react router dom
import {Link, useNavigate} from "react-router-dom";
import Search from "./Search";
import {AnimatePresence, motion} from "framer-motion";
import {LuSun} from "react-icons/lu";
import {RiMoonClearLine} from "react-icons/ri";
import useZenuiStore from "../../Store/Index.js";

const MobileNavbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [developerKitDropdownOpen, setDeveloperKitDropdownOpen] = useState(false);
    const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
    const [eCommerceDropdownOpen, setECommerceDropdownOpen] = useState(false)

    const [searchPlaceholderText, setSearchPlaceholderText] = useState("search component");

    const navigate = useNavigate();

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
        const placeholderTexts = ["Search components", "Search Blocks", "Explore templates", "Search E-commerce"];
        let index = 0;

        const interval = setInterval(() => {
            setSearchPlaceholderText(placeholderTexts[index]);
            index = (index + 1) % placeholderTexts.length;
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <nav
                className="flex 1024px:hidden items-center justify-between w-full px-5 640px:px-10 backdrop-blur-md  py-3 shadow-sm sticky dark:border-b dark:border-slate-700 shadow-shadowColor top-0 left-0 z-50">
                <div className="flex items-center gap-8 relative">
                    <div
                        className='w-[100px] h-[300px] bg-[#9A04F5] absolute top-[-150px] opacity-30 left-0 blur-[70px] rotate-[-50deg]'></div>

                    <div className='relative'>
                        <span
                            className='px-2 absolute dark:bg-slate-800 dark:text-slate-400 right-[-33px] text-[#a4a4a8] top-1 py-[1px] bg-[#f0f0f1] rounded-full text-[10px]'>
                            v2.2
                        </span>
                        <img
                            src="/darklogo.png"
                            alt="logo"
                            className="w-[60px] 1024px:w-[70px] z-20 cursor-pointer"
                            onClick={() => navigate("/")}
                        />
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-2'>
                        <a href='https://discord.gg/qbwytm4WUG' target='_blank'>
                            <RxDiscordLogo
                                className={`text-[2.3rem] dark:border-darkBorderColor dark:text-slate-400 text-gray-400 rounded-md p-[6px] border border-gray-200 cursor-pointer`}/>
                        </a>

                        <a href='https://github.com/Asfak00/zenui-library' target='_blank'>
                            <FiGithub
                                className={`text-[2.3rem] dark:border-darkBorderColor dark:text-slate-400 text-gray-400 rounded-md p-[6px] border border-gray-200 cursor-pointer`}/>
                        </a>

                        <div onClick={toggleTheme}
                             className='text-[1.5rem] dark:border-darkBorderColor dark:text-slate-400 text-gray-500 overflow-hidden h-[38px] border border-border rounded-md px-[6px] p-1 cursor-pointer'>
                            <LuSun
                                className={`${theme === 'dark' ? 'translate-y-[2px] rotate-0' : 'translate-y-[-80px] rotate-[160deg]'} transition-all duration-500`}/>
                            <RiMoonClearLine
                                className={`${theme === 'light' ? 'translate-y-[-21px] rotate-0' : 'translate-y-[80px] rotate-[-260deg]'} transition-all duration-500 text-gray-400`}/>
                        </div>
                    </div>

                    <CiMenuFries onClick={() => setSidebarOpen(!sidebarOpen)}
                                 className="text-[2.3rem] dark:border-darkBorderColor dark:text-slate-300 mobileSidebarButton text-gray-500 rounded-md p-[6px] border border-gray-200 cursor-pointer"/>
                </div>
            </nav>

            {/*  sidebar  */}
            <aside
                className={`${sidebarOpen ? 'translate-x-0 opacity-100 z-[999]' : 'translate-x-[200px] opacity-0 z-[-1]'} fixed top-0 mobileSidebar dark:bg-slate-900 right-0 py-5 px-[1.3rem] w-[90%] block 1024px:hidden 640px:w-[50%] h-screen transition-all duration-500 bg-white toastshadow overflow-y-auto`}>

                <RxCross2 className='text-[1.3rem] dark:text-darkSubTextColor text-gray-700 mb-[20px] absolute left-[15px]' onClick={()=> setSidebarOpen(false)}/>

                <div className="zenuiSearchInput mt-[45px] relative w-full" onClick={handleSearchClick}>
                    <IoIosSearch
                        className={`text-gray-400 absolute dark:text-slate-500 left-3 top-[0.6rem] text-[1.5rem]`}/>

                    <AnimatePresence>
                        <motion.p
                            key={searchPlaceholderText}
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 10}}
                            transition={{duration: 0.5}}
                            className='text-[1rem] dark:text-slate-500 text-gray-400 absolute top-[10px] left-[40px]'
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
                        className={`text-gray-500 bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-darkSubTextColor border-gray-200 px-2 py-1 text-[0.8rem] font-[500] rounded-md h-[75%] absolute right-1.5 border top-[0.35rem] flex items-center justify-center`}>
              Ctrl + S
            </span>
                </div>
                <ul className='text-gray-600 flex flex-col mt-5 items-start gap-4 font-[500] capitalize text-[1rem]'>
                    <Link to='/about-us' className='!text-[1rem] dark:text-darkSubTextColor !pl-0 !font-[500]'>About Us</Link>
                    <li onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                        className='cursor-pointer relative dark:text-darkSubTextColor flex items-center gap-[8px]'>
                        Tools
                        <IoIosArrowDown className={`${toolsDropdownOpen ? 'rotate-[180deg]': 'rotate-0'} transition-all duration-300`}/>
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
                    <li onClick={() => setDeveloperKitDropdownOpen(!developerKitDropdownOpen)}
                        className='cursor-pointer dark:text-darkSubTextColor flex items-center gap-[8px] mt-1.5'>
                        Components
                        <IoIosArrowDown className={`${developerKitDropdownOpen ? 'rotate-[180deg]': 'rotate-0'} transition-all duration-300`}/>
                    </li>

                    {
                        developerKitDropdownOpen && (
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                className="grid grid-cols-1 gap-[20px] ml-4"
                            >
                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/templates'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Templates
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Ready-made layouts to start fast.</span>
                                    </Link>

                                    <Link to='/blocks/all-blocks'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Blocks
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Modular components for easy design.</span>
                                    </Link>
                                </div>

                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/custom-hooks'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200 flex items-center gap-[10px]'>
                                            Custom Hooks
                                        </p>
                                        <span
                                            className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Reusable React logic helpers.</span>
                                    </Link>

                                    <Link to='/docs/resources'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Resources
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Tools and guides for developers.</span>
                                    </Link>

                                </div>
                            </motion.div>
                        )
                    }


                    <li onClick={() => setECommerceDropdownOpen(!eCommerceDropdownOpen)}
                        className='cursor-pointer relative dark:text-darkSubTextColor flex items-center gap-[8px] mt-1.5'>
                        E-Commerce
                        <IoIosArrowDown className={`${eCommerceDropdownOpen ? 'rotate-[180deg]': 'rotate-0'} transition-all duration-300`}/>
                    </li>

                    {
                        eCommerceDropdownOpen && (
                            <motion.div
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: 1, y: 0}}
                                exit={{opacity: 0, y: -20}}
                                className="grid grid-cols-1 gap-[20px] ml-4"
                            >
                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/components/product-card'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Product Card
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Animated modern product cards.</span>
                                    </Link>

                                    <Link to='/blocks/offer-grid'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Offer Grid
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Grid layout for showing product offers.</span>
                                    </Link>

                                    <Link to='/blocks/checkout-page'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Checkout Page
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Checkout page with order summery.</span>
                                    </Link>
                                </div>

                                <div className='flex flex-col gap-[20px] text-[1rem]'>
                                    <Link to='/components/ads-card'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200 flex items-center gap-[10px]'>
                                            Ads Card
                                        </p>
                                        <span
                                            className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Modern ads cards.</span>
                                    </Link>

                                    <Link to='/blocks/product-details-page'
                                          className='!p-0'>
                                        <p className='cursor-pointer dark:text-darkSubTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                            Product Details Page
                                        </p>
                                        <span className='text-[0.8rem] dark:text-slate-400 font-[300] text-gray-500'>Product Details with full functionality.</span>
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

export default MobileNavbar;
