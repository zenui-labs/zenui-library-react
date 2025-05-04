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
import ComponentsSlider from "./ComponentsSlider.jsx";
import FeaturesCard from "./FeaturesCard.jsx";

import {motion} from "framer-motion";
import {FaArrowRightLong} from "react-icons/fa6";

// components
import SwitchCard from "../HomePageComponents/Switch.jsx";
import TabCard from "../HomePageComponents/Tab.jsx";
import SelectCard from "../HomePageComponents/Select.jsx";
import RatingCard from "../HomePageComponents/Rating.jsx";
import RadioCard from "../HomePageComponents/Radio.jsx";
import TooltipCard from "../HomePageComponents/Tooltip.jsx";
import LoaderCard from "../HomePageComponents/Loader.jsx";
import BadgeCard from "../HomePageComponents/Badge.jsx";
import AnimatedButtonCard from "../HomePageComponents/AnimatedButton.jsx";
import ChipCard from "../HomePageComponents/Chip.jsx";
import StrongPasswordCard from "../HomePageComponents/StrongPasswordCard.jsx";
import AnimatedProductCard from "../HomePageComponents/AnimatedProductCard.jsx";
import {SiNpm} from "react-icons/si";
import {CountUp} from "use-count-up";
import {useGitHubStars} from "../../CustomHooks/useGithubStars.js";
import {GoChevronRight} from "react-icons/go";
import {IoChevronBackSharp, IoChevronForward} from "react-icons/io5";

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

    const electricityVariants = {
        hidden: {opacity: 0, scale: 0.8, x: -50}, visible: {
            opacity: 1, scale: 1, x: 0, transition: {
                duration: 0.5, type: "spring", stiffness: 300, damping: 15
            }
        }
    };

    const glowVariants = {
        initial: {boxShadow: "0 0 0px rgba(239, 68, 68, 0)"}, glow: {
            boxShadow: ["0 0 2px rgba(239, 68, 68, 0.3)", "0 0 8px rgba(239, 68, 68, 0.6)", "0 0 15px rgba(239, 68, 68, 0.8)", "0 0 8px rgba(239, 68, 68, 0.6)", "0 0 2px rgba(239, 68, 68, 0.3)"],
            transition: {
                duration: 1.5,
            }
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowChip(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (<main
        className="w-full min-h-[calc(100vh-50px)] flex items-center justify-center bg-[linear-gradient(to_right,#e3e3e32e_1px,transparent_1px),linear-gradient(to_bottom,#e3e3e32e_1px,transparent_1px)] bg-[size:30px_30px]">

        {/*<img src='https://react.keepdesign.io/images/home/community.svg'*/}
        {/*     className='absolute bottom-0 w-[900px] rotate-[40deg] -left-32'/>*/}

        <div
            className="px-8 640px:px-12 640px:pl-12 max-w-[1700px] mx-auto">

            <motion.div className="1024px:w-[65%] text-center mx-auto w-full relative" initial="hidden"
                        animate="show"
                        viewport={{once: true}}
                        variants={{
                            hidden: {}, show: {
                                transition: {
                                    staggerChildren: 0.15,
                                },
                            },
                        }}>

                <button
                    className='py-1.5 pl-5 cursor-text dark:border-slate-500 dark:text-darkTextColor backdrop-blur-md pr-6 text-[0.9rem] border mb-4 border-border rounded-full'>
                    ✨ Introducing ZenUI v2.3
                </button>

                <motion.h1
                    variants={FADE_DOWN_ANIMATION_VARIANTS}
                    className="text-[2.4rem] font-bold 425px:text-[3rem] 640px:text-[4rem] leading-[3rem] 425px:leading-[4.5rem] transition-all duration-700 640px:leading-[1.25] dark:text-darkTextColor">
                    <span className='mr-3'>Open-Source</span>
                    UI Components
                    & Templates
                    Library
                </motion.h1>

                <motion.p
                    variants={FADE_DOWN_ANIMATION_VARIANTS}
                    className="dark:text-darkSubTextColor text-gray-500 w-full mt-2 1024px:w-[85%] mx-auto font-[400] text-[1.1rem]">
                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &
                    blocks,
                    templates, Icons, Color Palette and more.
                </motion.p>

                <motion.div
                    variants={FADE_DOWN_ANIMATION_VARIANTS}
                    className="flex items-center gap-3 justify-center 425px:gap-6 mt-12">
                    <button
                        className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-high hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
                        onClick={() => navigate("/docs/overview")}
                    >
                        Browse Components
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                    <button
                        className='py-[11px] px-6 z-10 640px:px-8 border-2 border-[#0FABCA] text-[#0FABCA] rounded-high transition-all flex items-center justify-center gap-3 duration-300 group'
                        onClick={() => navigate('/components/all-components')}>
                        Browse Templates
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                </motion.div>

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

            </motion.div>
        </div>
    </main>);
};

export default Hero;
