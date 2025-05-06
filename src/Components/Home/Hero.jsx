import React, {useEffect, useState} from "react";

// react icons
import {FaFire, FaGithub, FaReact, FaStar} from "react-icons/fa";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";

// react router dom
import {useNavigate} from "react-router-dom";

import {BiLogoTailwindCss} from "react-icons/bi";
import {TbBrandFramerMotion, TbBrandNextjs} from "react-icons/tb";

// components
import {useGitHubStars} from "../../CustomHooks/useGithubStars.js";
import {IoChevronForward} from "react-icons/io5";

const Hero = () => {

    const {stars, loading} = useGitHubStars("Asfak00", "zenui-library");

    const FADE_DOWN_ANIMATION_VARIANTS = {
        hidden: {opacity: 0, y: -10}, show: {opacity: 1, y: 0, transition: {type: "spring"}},
    };

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    const navigate = useNavigate();

    const [isAnimating, setIsAnimating] = useState(true);
    const [showChip, setShowChip] = useState(false);

    useEffect(() => {
        const animationCycle = () => {
            setIsAnimating(true);

            const stopTimeout = setTimeout(() => {
                setIsAnimating(false);
            }, 1200);

            const restartTimeout = setTimeout(() => {
                setIsAnimating(true);
            }, 2000);

            return () => {
                clearTimeout(stopTimeout);
                clearTimeout(restartTimeout);
            };
        };

        const cleanupAnimation = animationCycle();

        const interval = setInterval(animationCycle, 4000);

        return () => {
            clearInterval(interval);
            if (typeof cleanupAnimation === 'function') {
                cleanupAnimation();
            }
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChip(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (<main
        className="w-full min-h-screen 1024px:min-h-[calc(100vh-50px)] flex items-center justify-center bg-[linear-gradient(to_right,#e3e3e32e_1px,transparent_1px),linear-gradient(to_bottom,#e3e3e32e_1px,transparent_1px)] bg-[size:30px_30px]">

        <div
            className="px-8 max-w-[1700px] mx-auto">

            <div className="1024px:w-[80%] 1360px:w-[65%] text-center mx-auto w-full relative">

                <button
                    className='py-1.5 pl-5 cursor-text dark:border-slate-500 dark:text-darkTextColor backdrop-blur-md pr-6 text-[0.8rem] 640px:text-[0.9rem] border mb-4 border-border rounded-full'>
                    ✨ Introducing ZenUI v2.3
                </button>

                <h1
                    className="text-[2.5rem] font-bold 640px:text-[3.2rem] 1024px:text-[4rem] leading-[3.1rem] 640px:leading-[5rem] transition-all duration-700 dark:text-darkTextColor">
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
                        onClick={() => navigate("/docs/overview")}
                    >
                        Browse Components
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                    <button
                        className='py-[11px] px-8 z-10 border-2 border-[#0FABCA] text-[#0FABCA] rounded-high transition-all flex items-center justify-center gap-3 duration-300 group'
                        onClick={() => navigate('/components/all-components')}>
                        Browse Templates
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                </div>

                <div className='flex items-center gap-5 justify-center mt-6'>
                    <a href='https://react.dev/learn' target='_blank'>
                        <FaReact className='text-[1.8rem] dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://v3.tailwindcss.com/docs/installation' target='_blank'>
                        <BiLogoTailwindCss className='text-[2.2rem] dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://motion.dev/docs' target='_blank'>
                        <TbBrandFramerMotion className='text-[1.8rem] dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                    <a href='https://nextjs.org/docs' target='_blank'>
                        <TbBrandNextjs className='text-[1.8rem] dark:text-darkSubTextColor text-gray-500'/>
                    </a>
                </div>

            </div>
        </div>
    </main>);
};

export default Hero;
