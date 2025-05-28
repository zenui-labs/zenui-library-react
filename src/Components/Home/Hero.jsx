import {FaReact} from "react-icons/fa";

// react router dom 
import {useNavigate} from "react-router-dom";

import {BiLogoTailwindCss} from "react-icons/bi";
import {TbBrandFramerMotion, TbBrandNextjs} from "react-icons/tb";
import {IoChevronForward} from "react-icons/io5";
import {useEffect, useState} from "react";
import useZenuiStore from "@store";

const Hero = () => {
    const [darkModeWithDelay, setDarkModeWithDelay] = useState(false)
    const navigate = useNavigate();

    const {theme} = useZenuiStore()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (theme === 'dark') {
                setDarkModeWithDelay(true);
            }
        }, 500);

        const notDarkMode = setTimeout(() => {
            if (theme !== 'dark') {
                setDarkModeWithDelay(false);
            }
        }, 200);

        return () => {
            clearTimeout(timer);
            clearTimeout(notDarkMode);
        };
    }, [theme])

    return (<main
        className={`${darkModeWithDelay ? 'bg-[linear-gradient(to_right,#212121_1px,transparent_1px),linear-gradient(to_bottom,#212121_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#e3e3e32e_1px,transparent_1px),linear-gradient(to_bottom,#e3e3e32e_1px,transparent_1px)]'} w-full min-h-screen 1024px:min-h-[calc(100vh-50px)] flex items-center justify-center bg-[size:30px_30px] relative`}>


        <div
            className={`absolute rotate-[-45deg] 640px:rotate-[-60deg] -top-16 640px:-top-[220px] left-0 blur-[43px] 640px:blur-[45px] w-[60px] h-[200px] 640px:h-[500px] rounded-full bg-gradient-to-b from-brandColor/60 to-brandColor/20 dark:from-white/90 dark:to-white/10`}
        ></div>
        <div
            className={`absolute rotate-[45deg] 640px:rotate-[60deg] -top-16 640px:-top-[220px] right-0 blur-[43px] 640px:blur-[45px] w-[60px] h-[200px] 640px:h-[500px] rounded-full bg-gradient-to-b from-brandColor/60 to-brandColor/20 dark:from-white/90 dark:to-white/10`}
        ></div>


        <div
            className="px-8 max-w-[1700px] mx-auto">

            <div className="1024px:w-[80%] 1360px:w-[65%] text-center mx-auto w-full">

                <button
                    className='py-1.5 pl-5 cursor-text dark:border-slate-500 dark:text-darkTextColor backdrop-blur-md pr-6 text-[0.8rem] 640px:text-[0.9rem] border mb-4 border-border rounded-full'>
                    ✨ Introducing ZenUI v3
                </button>

                <h1
                    className="text-[2.5rem] font-bold 640px:text-[3.2rem] 1024px:text-[4rem] leading-[3.2rem] 640px:leading-[4rem] 1024px:leading-[5rem] transition-all duration-700 dark:text-darkTextColor">
                    <span className='mr-3'>Open-Source</span>
                    UI Components
                    & Templates
                    Library
                </h1>

                <p
                    className="dark:text-darkSubTextColor text-gray-500 w-full 640px:w-[90%] mt-4 640px:mt-3 1024px:w-[85%] mx-auto font-[400] text-[1rem] 1024pxtext-[1.1rem]">
                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &
                    blocks,
                    templates, Icons, Color Palette and more.
                </p>

                <div
                    className="flex items-center flex-col 640px:flex-row gap-3 justify-center 425px:gap-6 mt-10 640px:mt-12">
                    <button
                        className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-high hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
                        onClick={() => navigate("/components/all-components")}
                    >
                        Browse Components
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                    <button
                        className='py-[11px] px-8 z-10 border-2 border-[#0FABCA] text-[#0FABCA] rounded-high transition-all flex items-center justify-center gap-3 duration-300 group'
                        onClick={() => navigate('/templates')}>
                        Browse Templates
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                </div>

                <div className='flex items-center gap-5 justify-center mt-6'>
                    <a href='https://react.dev/learn' target='_blank' rel="noreferrer">
                        <FaReact
                            className='text-[1.8rem] hover:scale-[1.2] transition-all duration-300 dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://v3.tailwindcss.com/docs/installation' target='_blank' rel="noreferrer">
                        <BiLogoTailwindCss
                            className='text-[2.2rem] hover:scale-[1.2] transition-all duration-300 dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://motion.dev/docs' target='_blank' rel="noreferrer">
                        <TbBrandFramerMotion
                            className='text-[1.8rem] hover:scale-[1.2] transition-all duration-300 dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://nextjs.org/docs' target='_blank' rel="noreferrer">
                        <TbBrandNextjs
                            className='text-[1.8rem] hover:scale-[1.2] transition-all duration-300 dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                </div>

            </div>
        </div>
    </main>);
};

export default Hero;