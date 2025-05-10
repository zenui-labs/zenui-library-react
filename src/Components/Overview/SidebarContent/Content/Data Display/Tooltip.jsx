import React, {useEffect, useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {tooltipContents} from '@utils/ContentsConfig/DataDisplayContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from 'react-icons/fa';
import {FiMessageCircle} from 'react-icons/fi';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";

const Tooltip = () => {
    const sectionIds = tooltipContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // actions
    const [roundedTooltipPreview, setRoundedTooltipPreview] = useState(true);
    const [roundedTooltipCode, setRoundedTooltipCode] = useState(false);

    const [arrowTooltipPreview, setArrowTooltipPreview] = useState(true);
    const [arrowTooltipCode, setArrowTooltipCode] = useState(false);

    const [relativeAnimationPreview, setRelativeAnimationPreview] =
        useState(true);
    const [relativeAnimationCode, setRelativeAnimationCode] = useState(false);

    const [profileTooltipPreview, setProfileTooltipPreview] = useState(true);
    const [profileTooltipCode, setProfileTooltipCode] = useState(false);

    const [clickedTooltipPreview, setClickedTooltipPreview] = useState(true);
    const [clickedTooltipCode, setClickedTooltipCode] = useState(false);

    const [isProfileHovered, setIsProfileHovered] = useState(false);
    const [leftClicked, setLeftClicked] = useState(false);
    const [rightClicked, setRightClicked] = useState(false);
    const [topClicked, setTopClicked] = useState(false);
    const [bottomClicked, setBottomClicked] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.top_button')) {
                setTopClicked(false);
            }
            if (!event.target.closest('.left_button')) {
                setLeftClicked(false);
            }
            if (!event.target.closest('.right_button')) {
                setRightClicked(false);
            }
            if (!event.target.closest('.bottom_button')) {
                setBottomClicked(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>

                    <WarningMessageCard text="You can style it yourself if you want. And after copying the code
              you ' z-index ' check a little. And since the tooltip is only
              coming up on hovering over a button to show the demo, you'll need
              to set it up well in your project when you get this code."/>

                    <ContentHeader text={'rounded tooltip'} id={'rounded_tooltip'}/>

                    <ComponentDescription text='This is a tooltip component. Provide contextual information with a
            brief, hover-triggered tooltip.'/>

                    <ToggleTab code={roundedTooltipCode} preview={roundedTooltipPreview} setCode={setRoundedTooltipCode}
                               setPreview={setRoundedTooltipPreview}/>

                    <ComponentWrapper>
                        {roundedTooltipPreview && (
                            <div className='p-8 pb-12 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='relative group'>
                                    <button
                                        className='px-3 py-2 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-800 rounded text-gray-800'>
                                        Rounded Tooltip
                                    </button>

                                    <div
                                        className='absolute bottom-[-90%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300'>
                    <span
                        className='text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-secondary rounded px-3 py-2 '>
                      Rounded Tooltip
                    </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {roundedTooltipCode && (
                            <Showcode
                                code='
import React from "react";

const Tooltip = () => {
    return (
        <div className="relative group">

            {/* button */}
            <button
                className="px-3 py-2 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-800 rounded text-gray-800">
                Rounded Tooltip
            </button>

            {/* tooltip */}
            <div
                className="absolute bottom-[-90%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300">
                    <span
                        className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2 ">
                      Rounded Tooltip
                    </span>
            </div>
        </div>
    );
};

export default Tooltip;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'arrow tooltip'} id={'arrow_tooltip'}/>
                    </div>

                    <ComponentDescription text='This is a tooltip component with an arrow indicator for clear
            element association on hover.'/>

                    <ToggleTab code={arrowTooltipCode} setPreview={setArrowTooltipPreview} setCode={setArrowTooltipCode}
                               preview={arrowTooltipPreview}/>

                    <ComponentWrapper>
                        {arrowTooltipPreview && (
                            <div className='p-8 pb-12 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center gap-6'>
                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-800 rounded text-gray-800 '>
                                            Left
                                        </button>

                                        <div
                                            className=' absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] dark:before:bg-slate-800 scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:left-[1%] before:rotate-[40deg] before:rounded-b-3xl'>
                      <span
                          className='text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-secondary rounded px-3 py-2 '>
                        Left
                      </span>
                                        </div>
                                    </div>

                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Center
                                        </button>

                                        <div
                                            className=' absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] dark:before:bg-slate-800 before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:left-1/3 before:rotate-[45deg] before:rounded-b-3xl'>
                      <span
                          className='text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-secondary rounded px-3 py-2 '>
                        Center
                      </span>
                                        </div>
                                    </div>
                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Right
                                        </button>

                                        <div
                                            className=' absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] dark:before:bg-slate-800 scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:right-[1%] before:rotate-[45deg] before:rounded-r-3xl'>
                      <span
                          className='text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-secondary rounded px-3 py-2 '>
                        Right
                      </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {arrowTooltipCode && (
                            <Showcode
                                code='
import React from "react";

const Tooltip = () => {
    return (
        <div className="flex items-center gap-6">

            {/* left tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-800 rounded text-gray-800 ">
                    Left
                </button>

                <div
                    className=" absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] dark:before:bg-slate-800 scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:left-[1%] before:rotate-[40deg] before:rounded-b-3xl">
                      <span
                          className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2 ">
                        Left
                      </span>
                </div>
            </div>

            {/* center tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Center
                </button>

                <div
                    className=" absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] dark:before:bg-slate-800 before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:left-1/3 before:rotate-[45deg] before:rounded-b-3xl">
                      <span
                          className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2 ">
                        Center
                      </span>
                </div>
            </div>

            {/* right tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Right
                </button>

                <div
                    className=" absolute bottom-[-100%] right-[6%] opacity-0 invisible group-hover:visible group-hover:opacity-100 group-hover:scale-[1] dark:before:bg-slate-800 scale-[0.7] transition-all duration-300 before:w-[20px] before:h-[20px] before:bg-[#8d8d8d] before:z-[-1] before:absolute before:top-[-35%] before:right-[1%] before:rotate-[45deg] before:rounded-r-3xl">
                      <span
                          className="text-[0.9rem] bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2 ">
                        Right
                      </span>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'Relative Animation'}
                            id={'relative_animation'}
                        />
                    </div>

                    <ComponentDescription text='A tooltip system that can appear in any position..left, right, top,
            or bottom—relative to the element, offering flexible placement based
            on user interaction or design needs.'/>

                    <ToggleTab code={relativeAnimationCode} preview={relativeAnimationPreview}
                               setCode={setRelativeAnimationCode} setPreview={setRelativeAnimationPreview}/>

                    <ComponentWrapper>
                        {relativeAnimationPreview && (
                            <div className='p-8 pb-20 mb-4 pt-20 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center gap-6 flex-wrap'>
                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Left
                                        </button>

                                        <div
                                            className=' absolute top-0.5 left-[-100px] translate-x-[-20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500'>
                                            <p className='text-[0.9rem] w-max bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-secondary rounded px-3 py-2 '>
                                                Left Tooltip
                                            </p>
                                        </div>
                                    </div>

                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Top
                                        </button>

                                        <div
                                            className=' absolute top-[-45px] left-[-23px] translate-y-[-20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500'>
                                            <p className='text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-secondary rounded px-3 py-2 '>
                                                Top Tooltip
                                            </p>
                                        </div>
                                    </div>

                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Bottom
                                        </button>

                                        <div
                                            className=' absolute bottom-[-45px] left-[-20px] translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500'>
                                            <p className='text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-secondary rounded px-3 py-2 '>
                                                Bottom Tooltip
                                            </p>
                                        </div>
                                    </div>

                                    <div className='relative group'>
                                        <button
                                            className='px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 '>
                                            Right
                                        </button>

                                        <div
                                            className=' absolute top-0.5 right-[-110px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500'>
                                            <p className='text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-secondary rounded px-3 py-2 '>
                                                Right Tooltip
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {relativeAnimationCode && (
                            <Showcode
                                code='
import React from "react";

const Tooltip = () => {
    return (
        <div className="flex items-center gap-6 flex-wrap">

            {/* left tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Left
                </button>

                <div
                    className="absolute top-0.5 left-[-100px] translate-x-[-20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500">
                    <p className="text-[0.9rem] w-max bg-[#8d8d8d] dark:bg-slate-800 dark:text-[#abc2d3] text-white rounded px-3 py-2 ">
                        Left Tooltip
                    </p>
                </div>
            </div>

            {/* top tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Top
                </button>

                <div
                    className=" absolute top-[-45px] left-[-23px] translate-y-[-20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500">
                    <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-white rounded px-3 py-2 ">
                        Top Tooltip
                    </p>
                </div>
            </div>

            {/* bottom tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Bottom
                </button>

                <div
                    className=" absolute bottom-[-45px] left-[-20px] translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500">
                    <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-white rounded px-3 py-2 ">
                        Bottom Tooltip
                    </p>
                </div>
            </div>

            {/* right tooltip */}
            <div className="relative group">
                <button
                    className="px-3 py-2 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 rounded text-gray-800 ">
                    Right
                </button>

                <div
                    className=" absolute top-0.5 right-[-110px] translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1000] transition-all duration-500">
                    <p className="text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-[#8d8d8d] text-white rounded px-3 py-2 ">
                        Right Tooltip
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'profile tooltip'} id={'profile_tooltip'}/>
                    </div>

                    <ComponentDescription text=" A small pop-up displaying key details about a user's profile when
            hovered or clicked."/>

                    <ToggleTab code={profileTooltipCode} setPreview={setProfileTooltipPreview}
                               setCode={setProfileTooltipCode} preview={profileTooltipPreview}/>

                    <ComponentWrapper>
                        {profileTooltipPreview && (
                            <div className='p-8 pb-20 mb-4 pt-20 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='relative w-fit h-full flex items-center justify-center'
                                    onMouseEnter={() => setIsProfileHovered(true)}
                                    onMouseLeave={() => setIsProfileHovered(false)}
                                >
                                    {/*  initial profile picture  */}
                                    <img
                                        src='https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?t=st=1728581066~exp=1728584666~hmac=c785e2973d4e19d11d12cc36cebeb3b7b698e37c64f6b207db6d5823938dd597&w=900'
                                        alt='profile'
                                        className='w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-primary'
                                    />

                                    {/*  tooltip  */}
                                    <div
                                        className={` ${
                                            isProfileHovered
                                                ? 'opacity-100 z-20 translate-y-0'
                                                : 'opacity-0 z-[-1] translate-y-[20px]'
                                        } absolute top-[-270px] left-[50%] transform translate-x-[-50%] bg-white w-[250px] rounded-md p-[15px] shadow-md transition-all dark:bg-slate-800 duration-300`}
                                    >
                                        {/*  socials  */}
                                        <div
                                            className='flex items-center justify-between dark:border-slate-700 border-b border-gray-200 pb-[7px]'>
                                            <p className='text-[1rem] font-[600] dark:text-[#abc2d3] text-gray-700'>
                                                Socials
                                            </p>
                                            <div className='flex items-center gap-[8px]'>
                                                <a href='https://zenui.net'>
                                                    <FaLinkedin
                                                        className='text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-primary cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out'/>
                                                </a>
                                                <a href='https://zenui.net'>
                                                    <FaGithubSquare
                                                        className='text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-primary cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out'/>
                                                </a>
                                                <a href='https://zenui.net'>
                                                    <FaInstagramSquare
                                                        className='text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-primary cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out'/>
                                                </a>
                                            </div>
                                        </div>

                                        {/*  account details  */}
                                        <div className='flex items-center justify-center flex-col mt-5'>
                                            <div className='relative'>
                                                <img
                                                    src='https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?t=st=1728581066~exp=1728584666~hmac=c785e2973d4e19d11d12cc36cebeb3b7b698e37c64f6b207db6d5823938dd597&w=900'
                                                    alt='profile'
                                                    className='w-[80px] h-[80px] rounded-full object-cover'
                                                />
                                                <div
                                                    className='w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white'></div>
                                            </div>
                                            <h4 className='text-[1.1rem] dark:text-[#abc2d3] font-[600] text-gray-700 mt-2'>
                                                Evelyn Adson
                                            </h4>
                                            <p className='text-[0.8rem] dark:text-[#abc2d3] text-gray-600'>Programmer</p>
                                        </div>

                                        {/*  send message  */}
                                        <button
                                            className='flex mx-auto hover:underline items-center gap-[8px] font-[500] text-[0.9rem] text-primary mt-4'>
                                            <FiMessageCircle className='text-[1.1rem]'/>
                                            Send Message
                                        </button>

                                        {/*  bottom arrow  */}
                                        <div
                                            className='bg-white w-[15px] h-[15px] dark:bg-slate-800 rotate-[45deg] absolute bottom-[-7px] left-[50%] transform translate-x-[-50%]'></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {profileTooltipCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaGithubSquare, FaInstagramSquare, FaLinkedin} from "react-icons/fa";
import {FiMessageCircle} from "react-icons/fi";

const Tooltip = () => {
    const [isProfileHovered, setIsProfileHovered] = useState(false);

    return (
        <div
            className="relative w-fit h-full flex items-center justify-center"
            onMouseEnter={() => setIsProfileHovered(true)}
            onMouseLeave={() => setIsProfileHovered(false)}
        >
            {/*  initial profile picture  */}
            <img
                src="https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?t=st=1728581066~exp=1728584666~hmac=c785e2973d4e19d11d12cc36cebeb3b7b698e37c64f6b207db6d5823938dd597&w=900"
                alt="profile"
                className="w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-[#3B9DF8]"
            />

            {/*  tooltip  */}
            <div
                className={` ${
                    isProfileHovered
                        ? "opacity-100 z-20 translate-y-0"
                        : "opacity-0 z-[-1] translate-y-[20px]"
                } absolute top-[-270px] left-[50%] transform translate-x-[-50%] bg-white w-[250px] rounded-md p-[15px] shadow-md transition-all dark:bg-slate-800 duration-300`}
            >
                {/*  socials  */}
                <div
                    className="flex items-center justify-between dark:border-slate-700 border-b border-gray-200 pb-[7px]">
                    <p className="text-[1rem] font-[600] dark:text-[#abc2d3] text-gray-700">
                        Socials
                    </p>
                    <div className="flex items-center gap-[8px]">
                        <a href="https://zenui.net">
                            <FaLinkedin
                                className="text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-[#3B9DF8] cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out"/>
                        </a>
                        <a href="https://zenui.net">
                            <FaGithubSquare
                                className="text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-[#3B9DF8] cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out"/>
                        </a>
                        <a href="https://zenui.net">
                            <FaInstagramSquare
                                className="text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-[#3B9DF8] cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out"/>
                        </a>
                    </div>
                </div>

                {/*  account details  */}
                <div className="flex items-center justify-center flex-col mt-5">
                    <div className="relative">
                        <img
                            src="https://img.freepik.com/free-photo/smiling-businessman-face-portrait-wearing-suit_53876-148138.jpg?t=st=1728581066~exp=1728584666~hmac=c785e2973d4e19d11d12cc36cebeb3b7b698e37c64f6b207db6d5823938dd597&w=900"
                            alt="profile"
                            className="w-[80px] h-[80px] rounded-full object-cover"
                        />
                        <div
                            className="w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white"></div>
                    </div>
                    <h4 className="text-[1.1rem] dark:text-[#abc2d3] font-[600] text-gray-700 mt-2">
                        Evelyn Adson
                    </h4>
                    <p className="text-[0.8rem] dark:text-[#abc2d3] text-gray-600">Programmer</p>
                </div>

                {/*  send message  */}
                <button
                    className="flex mx-auto hover:underline items-center gap-[8px] font-[500] text-[0.9rem] text-[#3B9DF8] mt-4">
                    <FiMessageCircle className="text-[1.1rem]"/>
                    Send Message
                </button>

                {/*  bottom arrow  */}
                <div
                    className="bg-white w-[15px] h-[15px] dark:bg-slate-800 rotate-[45deg] absolute bottom-[-7px] left-[50%] transform translate-x-[-50%]"></div>
            </div>
        </div>
    );
};

export default Tooltip;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'clicked tooltip'} id={'clicked_tooltip'}/>
                    </div>

                    <ComponentDescription text='A brief pop-up providing additional information when clicked,
            typically used for clarifying or expanding on specific content.'/>

                    <ToggleTab code={clickedTooltipCode} preview={clickedTooltipPreview} setCode={setClickedTooltipCode}
                               setPreview={setClickedTooltipPreview}/>

                    <ComponentWrapper>
                        {clickedTooltipPreview && (
                            <div className='p-8 pb-20 mb-4 pt-20 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center gap-[10px] justify-center flex-wrap'>
                                    {/*  left  */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setLeftClicked(true)}
                                            className='left_button py-2 px-6 border dark:border-slate-700 dark:text-[#abc2d3] rounded-md border-gray-800 text-[1rem] font-[500] text-gray-800'
                                        >
                                            Left
                                        </button>

                                        {/* tooltip */}
                                        <p
                                            className={`${
                                                leftClicked
                                                    ? 'opacity-100 z-[100] translate-x-0'
                                                    : 'opacity-0 z-[-1] translate-x-[20px]'
                                            } absolute top-[50%] transform translate-y-[-50%] left-[-130px] w-fit py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                                        >
                                            Left Tooltip
                                            {/* arrow */}
                                            <span
                                                className='w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute top-[50%] transform translate-y-[-50%] right-[-3%]'></span>
                                        </p>
                                    </div>

                                    {/*  top  */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setTopClicked(true)}
                                            className='top_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800'
                                        >
                                            Top
                                        </button>

                                        {/* tooltip */}
                                        <p
                                            className={`${
                                                topClicked
                                                    ? 'opacity-100 z-[100] translate-y-0'
                                                    : 'opacity-0 z-[-1] translate-y-[20px]'
                                            } absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                                        >
                                            Top Tooltip
                                            {/* arrow */}
                                            <span
                                                className='w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]'></span>
                                        </p>
                                    </div>

                                    {/*  bottom  */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setBottomClicked(true)}
                                            className='bottom_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800'
                                        >
                                            Bottom
                                        </button>

                                        {/* tooltip */}
                                        <p
                                            className={`${
                                                bottomClicked
                                                    ? 'opacity-100 z-[100] translate-y-0'
                                                    : 'opacity-0 z-[-1] translate-y-[-20px]'
                                            } absolute left-[50%] transform translate-x-[-50%] bottom-[-50px] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                                        >
                                            Bottom Tooltip
                                            {/* arrow */}
                                            <span
                                                className='w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] top-[-13%]'></span>
                                        </p>
                                    </div>

                                    {/*  right  */}
                                    <div className='relative'>
                                        <button
                                            onClick={() => setRightClicked(true)}
                                            className='right_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800'
                                        >
                                            Right
                                        </button>

                                        {/* tooltip */}
                                        <p
                                            className={`${
                                                rightClicked
                                                    ? 'opacity-100 z-[100] translate-x-0'
                                                    : 'opacity-0 z-[-1] translate-x-[-20px]'
                                            } absolute top-[50%] transform translate-y-[-50%] right-[-140px] w-fit py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                                        >
                                            Right Tooltip
                                            {/* arrow */}
                                            <span
                                                className='w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute top-[50%] transform translate-y-[-50%] left-[-3%]'></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {clickedTooltipCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Tooltip = () => {
    const [visibleTooltip, setVisibleTooltip] = useState("");

    return (
        <div className="flex items-center gap-[10px] justify-center flex-wrap">
            {/*  left  */}
            <div className="relative">
                <button
                    onClick={() => setVisibleTooltip("left")}
                    className="left_button py-2 px-6 border dark:border-slate-700 dark:text-[#abc2d3] rounded-md border-gray-800 text-[1rem] font-[500] text-gray-800"
                >
                    Left
                </button>

                {/* tooltip */}
                <p
                    className={`${
                        visibleTooltip == "left"
                            ? "opacity-100 z-[100] translate-x-0"
                            : "opacity-0 z-[-1] translate-x-[20px]"
                    } absolute top-[50%] transform translate-y-[-50%] left-[-130px] w-fit py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                >
                    Left Tooltip
                    {/* arrow */}
                    <span
                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute top-[50%] transform translate-y-[-50%] right-[-3%]"></span>
                </p>
            </div>

            {/*  top  */}
            <div className="relative">
                <button
                    onClick={() => setVisibleTooltip("top")}
                    className="top_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800"
                >
                    Top
                </button>

                {/* tooltip */}
                <p
                    className={`${
                        visibleTooltip == "top"
                            ? "opacity-100 z-[100] translate-y-0"
                            : "opacity-0 z-[-1] translate-y-[20px]"
                    } absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                >
                    Top Tooltip
                    {/* arrow */}
                    <span
                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"></span>
                </p>
            </div>

            {/*  bottom  */}
            <div className="relative">
                <button
                    onClick={() => setVisibleTooltip("bottom")}
                    className="bottom_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800"
                >
                    Bottom
                </button>

                {/* tooltip */}
                <p
                    className={`${
                        visibleTooltip == "bottom"
                            ? "opacity-100 z-[100] translate-y-0"
                            : "opacity-0 z-[-1] translate-y-[-20px]"
                    } absolute left-[50%] transform translate-x-[-50%] bottom-[-50px] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                >
                    Bottom Tooltip
                    {/* arrow */}
                    <span
                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] top-[-13%]"></span>
                </p>
            </div>

            {/*  right  */}
            <div className="relative">
                <button
                    onClick={() => setVisibleTooltip("right")}
                    className="right_button py-2 px-6 border rounded-md dark:border-slate-700 dark:text-[#abc2d3] border-gray-800 text-[1rem] font-[500] text-gray-800"
                >
                    Right
                </button>

                {/* tooltip */}
                <p
                    className={`${
                        visibleTooltip == "right"
                            ? "opacity-100 z-[100] translate-x-0"
                            : "opacity-0 z-[-1] translate-x-[-20px]"
                    } absolute top-[50%] transform translate-y-[-50%] right-[-140px] w-fit py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] dark:text-[#abc2d3] text-white font-[400] transition-all duration-200`}
                >
                    Right Tooltip
                    {/* arrow */}
                    <span
                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute top-[50%] transform translate-y-[-50%] left-[-3%]"></span>
                </p>
            </div>
        </div>
    );
};

export default Tooltip;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/badge'
                        backName='badge'
                        forwardName='timeline'
                        forwardUrl='/components/timeline'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={tooltipContents}/>

            </aside>
            <Helmet>
                <title>Data Display - Tooltip</title>
            </Helmet>
        </>
    );
};

export default Tooltip;
