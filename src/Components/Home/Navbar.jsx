import React, {useEffect, useState} from "react";

// icons
import {IoIosArrowDown, IoIosSearch} from "react-icons/io";

// react router dom
import {Link, useNavigate} from "react-router-dom";
import Search from "./Search";
import {FiGithub} from "react-icons/fi";
import {RxDiscordLogo} from "react-icons/rx";

import {motion, AnimatePresence} from "framer-motion";
import {LuSun} from "react-icons/lu";
import {RiMoonClearLine} from "react-icons/ri";

import useZenuiStore from "../../Store/Index.js";
import VersionSelectBox from "./VersionSelectBox.jsx";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [hasShadow, setHasShadow] = useState(false);
    const navigate = useNavigate();
    const [isDeveloperKitHover, setIsDeveloperKitHover] = useState(false);
    const [isToolsHover, setIsToolsHover] = useState(false);
    const [eCommerceHover, setECommerceHover] = useState(false)
    const [isActiveToolsMenu, setIsActiveToolsMenu] = useState(false);
    const [isActiveEcommcerMenu, setIsActiveEcommcerMenu] = useState(false);
    const [isActiveDeveloperKitMenu, setIsActiveDeveloperKitMenu] = useState(false);

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

    useEffect(() => {
        const placeholderTexts = ["Search components", "Search Blocks", "Explore templates", "Search E-commerce"];
        let index = 0;

        const interval = setInterval(() => {
            setSearchPlaceholderText(placeholderTexts[index]);
            index = (index + 1) % placeholderTexts.length;
        }, 3000);

        return () => clearInterval(interval);
    }, []);


    const handleActiveToolsMenu = () => {
        setIsActiveToolsMenu(!isActiveToolsMenu)
        setIsActiveEcommcerMenu(false)
        setIsActiveDeveloperKitMenu(false)
    }

    const handleActiveDeveloperKitMenu = () => {
        setIsActiveDeveloperKitMenu(!isActiveDeveloperKitMenu)
        setIsActiveToolsMenu(false)
        setIsActiveEcommcerMenu(false)
    }

    const handleActiveEcommerceMenu = () => {
        setIsActiveEcommcerMenu(!isActiveEcommcerMenu)
        setIsActiveToolsMenu(false)
        setIsActiveDeveloperKitMenu(false)
    }

    const handleToolsMouseHover = () => {
        setIsToolsHover(true)
        setIsDeveloperKitHover(false)
        setIsActiveEcommcerMenu(false)
        setIsActiveDeveloperKitMenu(false)
        setECommerceHover(false)
    }

    const handleDeveloperKitMouseHover = () => {
        setIsToolsHover(false)
        setIsDeveloperKitHover(true)
        setIsActiveToolsMenu(false)
        setIsActiveEcommcerMenu(false)
        setECommerceHover(false)
    }

    const handleEcommerceMouseHover = () => {
        setIsToolsHover(false)
        setIsDeveloperKitHover(false)
        setIsActiveToolsMenu(false)
        setIsActiveDeveloperKitMenu(false)
        setECommerceHover(true)
    }

    return (
        <>
            <nav
                className={`border-b dark:border-darkBorderColor border-gray-100 1024px:flex w-full px-10 backdrop-blur-lg sticky top-0 left-0 z-[999] hidden transition-all duration-500`}>
                <div className='max-w-[1615px] mx-auto w-full flex items-center justify-between'>
                    <div className="flex items-center gap-8">
                        {
                            getTheRouteName() === '/' && (
                                <div
                                    className='w-[100px] h-[300px] bg-[#9A04F5] absolute top-[-140px] opacity-30 left-0 blur-[70px] rotate-[-50deg]'></div>
                            )
                        }

                        <div className='relative mr-6 h-[52px]'>
                            <VersionSelectBox/>
                            <img
                                src="/logo.png"
                                alt="logo"
                                className="w-[70px] cursor-pointer z-10"
                                onClick={() => navigate("/")}
                            />
                        </div>
                        <ul className={`text-gray-600 flex items-center gap-8 font-[500] capitalize text-[1.2rem]`}>
                            <Link to='/about-us'
                                  className='dark:text-darkTextColor cursor-pointer hover:text-[#0FABCA] transition-all duration-200'>About
                                Us</Link>
                            <li
                                onMouseEnter={handleToolsMouseHover}
                                onMouseLeave={() => setIsToolsHover(false)}
                                onClick={handleActiveToolsMenu}
                                className={`${isActiveToolsMenu && 'text-[#0FABCA]'} cursor-pointer relative py-[23px] hover:text-[#0FABCA] dark:text-darkTextColor transition-all duration-200 flex items-center gap-[8px]`}
                            >
                                Tools
                                <IoIosArrowDown
                                    className={`${(isToolsHover || isActiveToolsMenu) ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-300`}/>

                                {(isToolsHover || isActiveToolsMenu) && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.8}}
                                        className="absolute dark:bg-slate-900 dark:border-darkBorderColor top-[68px] left-0 gap-x-[30px] w-[600px] grid grid-cols-2 bg-white border border-gray-200 shadow-sm rounded-md p-6 mt-2"
                                        onMouseEnter={() => setIsToolsHover(true)}
                                        onMouseLeave={() => setIsToolsHover(false)}
                                    >
                                        <div className='flex flex-col text-[1rem]'>

                                            <Link to='/shortcut-generator'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <div className='flex items-center gap-[10px]'>
                                                    <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                        ShotKey
                                                    </p>
                                                </div>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>generate keyboard shortcuts easily.</span>
                                            </Link>

                                            <Link to='/color-palette'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                    Color Palettes
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Harmonized color sets.</span>
                                            </Link>

                                        </div>

                                        <div className='flex flex-col text-[1rem]'>

                                            <Link to='/icons'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                    Icons
                                                </p>
                                                <span
                                                    className='text-[0.8rem] font-[300] dark:text-darkSubTextColor text-gray-500'>Scalable icons for clear visuals.</span>
                                            </Link>
                                            <Link to='/config-generator'
                                                  className='p-[10px] dark:hover:bg-slate-800 transition-all duration-200 hover:bg-gray-100 rounded-md'>
                                                <div className='flex items-center gap-[10px]'>
                                                    <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                        Config AI
                                                    </p>

                                                    <div
                                                        className='bg-red-50 rounded-full py-0.5 px-2 text-[0.7rem] font-normal text-red-600 border border-red-600'>
                                                        For Tailwind v3
                                                    </div>
                                                </div>
                                                <span
                                                    className='text-[0.8rem] font-[300] dark:text-darkSubTextColor text-gray-500'>Generate tailwind config file by AI.</span>
                                            </Link>
                                        </div>

                                        <div className='flex flex-col text-[1rem]'>

                                            <Link to='/semantic-tag-master'
                                                  className='p-[10px] dark:hover:bg-slate-800 transition-all duration-200 hover:bg-gray-100 rounded-md'>
                                                <div className='flex items-center gap-[10px]'>
                                                    <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                        Semantic TagMaster
                                                    </p>
                                                </div>
                                                <span
                                                    className='text-[0.8rem] font-[300] dark:text-darkSubTextColor text-gray-500'>A comprehensive guide about HTML semantic tags</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </li>

                            <li
                                onMouseEnter={handleDeveloperKitMouseHover}
                                onMouseLeave={() => setIsDeveloperKitHover(false)}
                                onClick={handleActiveDeveloperKitMenu}
                                className={`${isActiveDeveloperKitMenu && 'text-[#0FABCA]'} cursor-pointer relative py-[23px] hover:text-[#0FABCA] dark:text-darkTextColor transition-all duration-200 flex items-center gap-[8px]`}
                            >
                                Components
                                <IoIosArrowDown
                                    className={`${(isDeveloperKitHover || isActiveDeveloperKitMenu) ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-300`}/>

                                {(isDeveloperKitHover || isActiveDeveloperKitMenu) && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.8}}
                                        className="absolute dark:bg-slate-900 dark:border-darkBorderColor top-[68px] left-0 gap-[30px] w-[600px] grid grid-cols-2 bg-white border border-gray-200 shadow-sm rounded-md p-6 mt-2"
                                        onMouseEnter={() => setIsDeveloperKitHover(true)}
                                        onMouseLeave={() => setIsDeveloperKitHover(false)}
                                    >
                                        <div className='flex flex-col text-[1rem]'>
                                            <Link to='/templates'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                    Templates
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Ready-made layouts to start fast.</span>
                                            </Link>

                                            <Link to='/blocks/all-blocks'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                    Blocks
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Modular components for easy design.</span>
                                            </Link>

                                        </div>

                                        <div className='flex flex-col text-[1rem]'>
                                            <Link to='/custom-hooks'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200 flex items-center gap-[10px]'>
                                                    Custom Hooks
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Reusable React logic helpers.</span>
                                            </Link>

                                            <Link to='/docs/resources'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer dark:text-darkTextColor leading-[20px] text-gray-600 transition-all duration-200'>
                                                    Resources
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Tools and guides for developers.</span>
                                            </Link>

                                        </div>
                                    </motion.div>
                                )}
                            </li>

                            <li
                                onMouseEnter={handleEcommerceMouseHover}
                                onMouseLeave={() => setECommerceHover(false)}
                                onClick={handleActiveEcommerceMenu}
                                className={`${isActiveEcommcerMenu && 'text-[#0FABCA]'} cursor-pointer relative py-[23px] hover:text-[#0FABCA] dark:text-darkTextColor transition-all duration-200 flex items-center gap-[8px]`}
                            >
                                E-Commerce
                                <IoIosArrowDown
                                    className={`${(eCommerceHover || isActiveEcommcerMenu) ? 'rotate-[180deg]' : 'rotate-0'} transition-all duration-300`}/>

                                {(eCommerceHover || isActiveEcommcerMenu) && (
                                    <motion.div
                                        initial={{opacity: 0, scale: 0.8}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.8}}
                                        className="absolute dark:bg-slate-900 dark:border-darkBorderColor top-[68px] left-0 gap-[30px] w-[600px] grid grid-cols-2 bg-white border border-gray-200 shadow-sm rounded-md p-6 mt-2"
                                        onMouseEnter={() => setECommerceHover(true)}
                                        onMouseLeave={() => setECommerceHover(false)}
                                    >
                                        <div className='flex flex-col text-[1rem]'>
                                            <Link to='/components/product-card'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                    Product Card
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Animated modern product cards.</span>
                                            </Link>

                                            <Link to='/blocks/offer-grid'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                    Offer Grid
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Grid layout for showing product offers.</span>
                                            </Link>

                                            <Link to='/blocks/checkout-page'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                    Checkout Page
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Checkout page with order summery.</span>
                                            </Link>

                                        </div>

                                        <div className='flex flex-col text-[1rem]'>
                                            <Link to='/components/ads-card'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200 flex items-center gap-[10px]'>
                                                    Ads Card
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Modern ads cards.</span>
                                            </Link>

                                            <Link to='/blocks/product-details-page'
                                                  className='p-[10px] transition-all duration-200 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-md'>
                                                <p className='cursor-pointer leading-[20px] dark:text-darkTextColor text-gray-600 transition-all duration-200'>
                                                    Product Details Page
                                                </p>
                                                <span
                                                    className='text-[0.8rem] dark:text-darkSubTextColor font-[300] text-gray-500'>Product Details with full functionality.</span>
                                            </Link>

                                        </div>
                                    </motion.div>
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-center gap-2 w-[30%]">
                        <div className="zenuiSearchInput relative w-full" onClick={handleSearchClick}>
                            <IoIosSearch
                                className={`text-gray-400 absolute dark:text-slate-400 left-3 top-[0.6rem] text-[1.5rem]`}/>
                            <AnimatePresence>
                                <motion.p
                                    key={searchPlaceholderText}
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: 10}}
                                    transition={{duration: 0.5}}
                                    className='text-[1rem] dark:text-slate-400 text-gray-400 absolute top-[10px] left-[40px]'
                                >
                                    {searchPlaceholderText}
                                </motion.p>
                            </AnimatePresence>
                            <input
                                type="search"
                                name=""
                                id=""
                                readOnly={true}
                                className={`py-[0.59rem] pl-10 dark:border-darkBorderColor border w-full bg-transparent border-gray-200 rounded-md focus:ring-0 outline-none`}
                            />
                            <span
                                className={`text-gray-500 dark:bg-slate-800 dark:border-darkBorderColor dark:text-slate-400 bg-gray-50 transition-all duration-500 border-gray-200 px-2 py-1 text-[0.8rem] font-[500] rounded-md h-[75%] absolute right-1.5 border top-[0.35rem] flex items-center justify-center`}>
                                Ctrl + S
                            </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <a href='https://discord.gg/qbwytm4WUG' target='_blank'>
                                <RxDiscordLogo
                                    className={`text-[2.7rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor transition-all duration-500 dark:text-slate-400 text-gray-400 rounded-md p-[6px] border border-gray-200 cursor-pointer`}/>
                            </a>

                            <a href='https://github.com/Asfak00/zenui-library' target='_blank'>
                                <FiGithub
                                    className={`text-[2.7rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor transition-all duration-500 dark:text-slate-400 text-gray-400 rounded-md p-[6px] border border-gray-200 cursor-pointer`}/>
                            </a>

                            <div onClick={toggleTheme}
                                 className='text-[1.6rem] hover:bg-gray-50 dark:hover:bg-slate-900 dark:border-darkBorderColor dark:text-slate-400 text-gray-400 overflow-hidden h-[43px] border border-border rounded-md px-[9px] p-1 cursor-pointer'>
                                <LuSun
                                    className={`${theme === 'dark' ? 'translate-y-[4px] rotate-0' : 'translate-y-[-80px] rotate-[160deg]'} transition-all duration-500`}/>
                                <RiMoonClearLine
                                    className={`${theme === 'light' ? 'translate-y-[-21px] rotate-0' : 'translate-y-[80px] rotate-[-260deg]'} transition-all duration-500`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className={`${isSearchOpen ? 'visible z-[100]' : 'invisible z-[-1]'} transition-all duration-500`}>
                <Search isSearchOpen={isSearchOpen}/>
            </div>
        </>
    );
};

export default Navbar;
