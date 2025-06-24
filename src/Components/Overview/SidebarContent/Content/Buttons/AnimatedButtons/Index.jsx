import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter.jsx";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader.jsx";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {animatedButtonContents} from '@utils/ContentsConfig/ButtonsContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import CelebrationButton from "@components/Buttons/AnimatedButtons/CelebrationButton.jsx";
import {CelebrationButtonCodes} from "@components/Buttons/AnimatedButtons/PreviewCodes.js";

const Index = () => {
    const sectionIds = animatedButtonContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // click animated button
    const [clickAnimatedButtonPreview, setClickAnimatedButtonPreview] = useState(true);
    const [clickAnimatedButtonCode, setClickAnimatedButtonCode] = useState(false);

    // hover animated button
    const [hoverAnimatedButtonPreview, setHoverAnimatedButtonPreview] = useState(true);
    const [hoverAnimatedButtonCode, setHoverAnimatedButtonCode] = useState(false);

    // hover bg animated button
    const [hoverBgAnimatedButtonPreview, setHoverBgAnimatedButtonPreview] = useState(true);
    const [hoverBgAnimatedButtonCode, setHoverBgAnimatedButtonCode] = useState(false);

    // slide up animated button
    const [slideUpAnimationButtonPreview, setSlideUpAnimationButtonPreview] = useState(true);
    const [slideUpAnimationButtonCode, setSlideUpAnimationButtonCode] = useState(false);

    // slide animated button
    const [slideAnimationButtonPreview, setSlideAnimationButtonPreview] = useState(true);
    const [slideAnimationButtonCode, setSlideAnimationButtonCode] = useState(false);

    // bounce up animated button
    const [bounceUpAnimationButtonPreview, setBounceUpAnimationButtonPreview] = useState(true);
    const [bounceUpAnimationButtonCode, setBounceUpAnimationButtonCode] = useState(false);

    // bottom border animated button
    const [bottomBorderAnimationButtonPreview, setBottomBorderAnimationButtonPreview] = useState(true);
    const [bottomBorderAnimationButtonCode, setBottomBorderAnimationButtonCode] = useState(false);

    // bg fill animated button
    const [bgFillAnimationPreview, setBgFillAnimationPreview] = useState(true);
    const [bgFillAnimationCode, setBgFillAnimationCode] = useState(false);

    // 2 part marge animated button
    const [margeAnimationPreview, setMargeAnimationPreview] = useState(true);
    const [margeAnimationCode, setMargeAnimationCode] = useState(false);

    // day night toggle animated button
    const [dayNightTogglePreview, setDayNightTogglePreview] = useState(true);
    const [dayNightToggleCode, setDayNightToggleCode] = useState(false);

    // celebration button
    const [celebrationButtonPreview, setCelebrationButtonPreview] = useState(true);
    const [celebrationButtonCode, setCelebrationButtonCode] = useState(false);

    // Variables for Day Night Toggle
    const size = 60; // Default size in pixels
    const animationSpeed = .6; // Default animation speed in seconds

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"click animation"} id={"click_animation"}/>

                <ComponentDescription text='This is an animated button on click component. Enjoy dynamic responses with captivating animations upon
          clicking.'/>

                <ToggleTab setCode={setClickAnimatedButtonCode} code={clickAnimatedButtonCode}
                           preview={clickAnimatedButtonPreview} setPreview={setClickAnimatedButtonPreview}/>

                <ComponentWrapper>
                    {clickAnimatedButtonPreview && (
                        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">
                            <button
                                className="px-6 py-3 bg-primary border-none outline-none text-secondary text-[1rem] rounded active:scale-[0.9] transition-all duration-300">
                                Click Me
                            </button>

                            <button
                                className="px-6 py-3 bg-primary border-none outline-none text-secondary text-[1rem] rounded transition-all duration-500 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#ffffffb4] before:translate-x-[-150px] before:rounded overflow-hidden active:before:animate-ping active:before:translate-x-[0px]">
                                Click Me
                            </button>
                        </div>
                    )}

                    {clickAnimatedButtonCode && <ShowCode code='
<button className="px-6 py-3 bg-primary border-none outline-none text-secondary text-[1rem] rounded active:scale-[0.9] transition-all duration-300">
      Click Me
</button>

<button className="px-6 py-3 bg-primary border-none outline-none text-secondary text-[1rem] rounded transition-all duration-500 relative before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[#ffffffb4] before:translate-x-[-150px] before:rounded overflow-hidden active:before:animate-ping active:before:translate-x-[0px]">
    Click Me
</button>
          '/>}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"border hover animation"}
                        id={"border_animated"}
                    />
                </div>

                <ComponentDescription
                    text=' This is a hover animated button component. Experience dynamic interaction with engaging animations on hover.'/>

                <ToggleTab setCode={setHoverAnimatedButtonCode} code={hoverAnimatedButtonCode}
                           setPreview={setHoverAnimatedButtonPreview} preview={hoverAnimatedButtonPreview}/>

                <ComponentWrapper>
                    {hoverAnimatedButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 flex-wrap justify-center">
                            <button
                                className="px-8 py-3 relative shadow-lg before:absolute before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent dark:bg-slate-800 dark:text-slate-300 hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500">
                                Animate 1
                            </button>

                            <button
                                className="py-2 px-6 shadow-lg before:block before:-left-1 before:-top-1 before:border-t-[4px] before:invisible before:hover:visible before:border-l-[4px] before:border-primary before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%] dark:bg-slate-800 dark:text-slate-200 before:duration-500 before:-z-40 after:block dark:z-0 after:-right-1 after:-bottom-1 after:border-r-[4px] after:border-b-[4px] after:border-primary after:invisible after:hover:visible after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-secondary relative ">
                                Animate 2
                            </button>
                        </div>
                    )}

                    {hoverAnimatedButtonCode &&
                        <ShowCode code='
import React from "react";

const CelebrationButton = () => {

    return (
        <>
            <button
                className="px-8 py-3 relative shadow-lg before:absolute before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent dark:bg-slate-800 dark:text-slate-300 hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500">
                Animate 1
            </button>

            <button
                className="py-2 px-6 shadow-lg before:block before:-left-1 before:-top-1 before:border-t-[4px] before:invisible before:hover:visible before:border-l-[4px] before:border-primary before:absolute before:h-0 before:w-0 before:hover:w-[100%] before:hover:h-[100%] dark:bg-slate-800 dark:text-slate-200 before:duration-500 before:-z-40 after:block dark:z-0 after:-right-1 after:-bottom-1 after:border-r-[4px] after:border-b-[4px] after:border-primary after:invisible after:hover:visible after:absolute after:h-0 after:w-0 after:hover:w-[100%] after:hover:h-[100%] after:duration-500 after:-z-40 bg-secondary relative ">
                Animate 2
            </button>
        </>
    );
};

export default CelebrationButton;
                  '
                        />
                    }
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"Bg hover animation"}
                        id={"bg_hover_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with background hover animation, creating a dynamic effect when users hover over it.'/>

                <ToggleTab setCode={setHoverBgAnimatedButtonCode} code={hoverBgAnimatedButtonCode}
                           setPreview={setHoverBgAnimatedButtonPreview} preview={hoverBgAnimatedButtonPreview}/>

                <ComponentWrapper>
                    {hoverBgAnimatedButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center flex-wrap">
                            <button
                                className="px-6 rounded-md py-2 border border-primary relative before:absolute overflow-hidden before:translate-x-[-200px] hover:before:translate-x-0 before:z-[-1] before:translate-y-12 dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:transition hover:before:translate-y-0 before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Left Bottom
                            </button>

                            <button
                                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden before:translate-x-[200px] hover:before:translate-x-0 before:-translate-y-12 dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 hover:before:-translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Right Top
                            </button>

                            <button
                                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden before:translate-x-[-200px] hover:before:translate-x-0 before:z-[-1] before:transition dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Left
                            </button>

                            <button
                                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-x-[200px] hover:before:translate-x-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Right
                            </button>

                            <button
                                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-y-[-200px] hover:before:translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Top
                            </button>

                            <button
                                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-y-[200px] hover:before:translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                                Bottom
                            </button>
                        </div>
                    )}

                    {hoverBgAnimatedButtonCode &&
                        <ShowCode code='
import React from "react";

const CelebrationButton = () => {

    return (
        <>
            {/* left bottom animation */}
            <button
                className="px-6 rounded-md py-2 border border-primary relative before:absolute overflow-hidden before:translate-x-[-200px] hover:before:translate-x-0 before:z-[-1] before:translate-y-12 dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:transition hover:before:translate-y-0 before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Left Bottom
            </button>

            {/* right to animation */}
            <button
                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden before:translate-x-[200px] hover:before:translate-x-0 before:-translate-y-12 dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 hover:before:-translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Right Top
            </button>

            {/* left animation */}
            <button
                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden before:translate-x-[-200px] hover:before:translate-x-0 before:z-[-1] before:transition dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Left
            </button>

            {/* right animation */}
            <button
                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-x-[200px] hover:before:translate-x-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Right
            </button>

            {/* top animation */}
            <button
                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-y-[-200px] hover:before:translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Top
            </button>

            {/* bottom animation */}
            <button
                className="px-6 py-2 rounded-md border border-primary relative before:absolute overflow-hidden dark:text-slate-200 dark:border-slate-700 dark:z-0 dark:before:bg-slate-700 before:translate-y-[200px] hover:before:translate-y-0 before:z-[-1] before:transition before:duration-300 hover:text-secondary  before:w-full before:h-full before:bg-primary before:top-0 before:left-0">
                Bottom
            </button>
        </>
    );
};

export default CelebrationButton;
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"bg slide up animation"}
                        id={"bg_slide_up_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a background slide-up animation, where the background color smoothly slides up when hovered over.'/>

                <ToggleTab setCode={setSlideUpAnimationButtonCode} code={slideUpAnimationButtonCode}
                           preview={slideUpAnimationButtonPreview} setPreview={setSlideUpAnimationButtonPreview}/>

                <ComponentWrapper>
                    {slideUpAnimationButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button
                                className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-primary transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-slate-800 group">
                  <span
                      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
                                <span
                                    className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
<svg className="w-5 h-5 text-green-400" fill="none" stroke="#3B9DF8" viewBox="0 0 24 24"
     xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
                                <span
                                    className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
<svg className="w-5 h-5 text-green-400" fill="none" stroke="#fff" viewBox="0 0 24 24"
     xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
                                <span
                                    className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {slideUpAnimationButtonCode &&
                        <ShowCode code='
import React from "react";

const CelebrationButton = () => {

    return (
        <button
            className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-primary transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-slate-800 group">
                  <span
                      className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-primary group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg className="w-5 h-5 text-green-400" fill="none" stroke="#3B9DF8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>

                  <span
                      className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>

                  <span
                      className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">ZenUI Library</span>
        </button>
    );
};

export default CelebrationButton;
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"Bg slide animation"}
                        id={"bg_slide_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a background slide animation, where the background color slides in from a specified direction on hover.'/>

                <ToggleTab setCode={setSlideAnimationButtonCode} code={slideAnimationButtonCode}
                           setPreview={setSlideAnimationButtonPreview} preview={slideAnimationButtonPreview}/>

                <ComponentWrapper>
                    {slideAnimationButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button
                                className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group">
<span
    className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
                                <span
                                    className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">ZenUI Library</span>
                                <span className="relative invisible">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {slideAnimationButtonCode &&
                        <ShowCode code='
<button
  className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group">
    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span
        className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">ZenUI Library</span>
    <span className="relative invisible">ZenUI Library</span>
</button>
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"bg bounce up animation"}
                        id={"bg_bounce_up_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a background bounce-up animation, where the background color bounces upward with a dynamic effect when hovered over.'/>

                <ToggleTab setCode={setBounceUpAnimationButtonCode} code={bounceUpAnimationButtonCode}
                           preview={bounceUpAnimationButtonPreview} setPreview={setBounceUpAnimationButtonPreview}/>

                <ComponentWrapper>
                    {bounceUpAnimationButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button
                                className="relative inline-flex items-center px-8 py-2.5 overflow-hidden text-lg font-medium text-primary border-2 border-primary rounded-full hover:text-white group hover:bg-gray-50">
                  <span
                      className="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                                <span
                                    className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
    strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
</span>
                                <span
                                    className="relative text-[1rem] group-hover:pr-4 transition-all duration-400">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {bounceUpAnimationButtonCode &&
                        <ShowCode code='
<button
    className="relative inline-flex items-center px-8 py-2.5 overflow-hidden text-lg font-medium text-primary border-2 border-primary rounded-full hover:text-white group hover:bg-gray-50">
      <span
          className="absolute left-0 block w-full h-0 transition-all bg-primary opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
        <span
        className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
      </span>
    <span className="relative text-[1rem] group-hover:pr-4 transition-all duration-400">ZenUI Library</span>
</button>
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"Bottom border animation"}
                        id={"bottom_border_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a bottom border animation, featuring a dynamic effect where the bottom border slides in or changes style on hover.'/>

                <ToggleTab setCode={setBottomBorderAnimationButtonCode} code={bottomBorderAnimationButtonCode}
                           setPreview={setBottomBorderAnimationButtonPreview}
                           preview={bottomBorderAnimationButtonPreview}/>

                <ComponentWrapper>
                    {bottomBorderAnimationButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button
                                className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
                  <span
                      className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
                                <span
                                    className="absolute inset-0 w-full h-full dark:bg-slate-800 bg-white rounded-md "></span>
                                <span
                                    className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
                                <span
                                    className="relative text-primary transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {bottomBorderAnimationButtonCode &&
                        <ShowCode code='
import React from "react";

const CelebrationButton = () => {

    return (
        <button
            className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
                  <span
                      className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-primary rounded-md group-hover:mt-0 group-hover:ml-0"></span>
            <span className="absolute inset-0 w-full h-full dark:bg-slate-800 bg-white rounded-md "></span>
            <span
                className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-primary rounded-md opacity-0 group-hover:opacity-100 "></span>
            <span
                className="relative text-primary transition-colors duration-200 ease-in-out delay-100 group-hover:text-white">ZenUI Library</span>
        </button>
    );
};

export default CelebrationButton;
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"hover bg fill animation"}
                        id={"hover_bg_fill_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a hover background fill animation, where the background color smoothly fills the button from one side to the other when hovered over.'/>

                <ToggleTab setCode={setBgFillAnimationCode} code={bgFillAnimationCode} preview={bgFillAnimationPreview}
                           setPreview={setBgFillAnimationPreview}/>

                <ComponentWrapper>
                    {bgFillAnimationPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button
                                className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono dark:bg-slate-800 tracking-tighter text-white bg-gray-300 rounded-lg group">
                  <span
                      className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
                                <span
                                    className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"></span>
                                <span className="relative text-text dark:text-slate-200 group-hover:text-white">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {bgFillAnimationCode &&
                        <ShowCode code='
import React from "react";

const CelebrationButton = () => {

    return (
        <button
            className="relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-mono dark:bg-slate-800 tracking-tighter text-white bg-gray-300 rounded-lg group">
                  <span
                      className="absolute w-0 h-0 transition-all duration-500 ease-out bg-primary rounded-full group-hover:w-56 group-hover:h-56"></span>
            <span
                className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-300"></span>
            <span className="relative text-text dark:text-slate-200 group-hover:text-white">ZenUI Library</span>
        </button>
    );
};

export default CelebrationButton;
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader
                        text={"2 part marge animation"}
                        id={"2_part_marge_animation"}
                    />
                </div>

                <ComponentDescription
                    text='Button with a two-part merge animation, where two distinct sections of the button smoothly combine into a single cohesive design on hover.'/>

                <ToggleTab setCode={setMargeAnimationCode} code={margeAnimationCode}
                           setPreview={setMargeAnimationPreview} preview={margeAnimationPreview}/>

                <ComponentWrapper>
                    {margeAnimationPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <button className="relative px-6 py-3 font-bold text-white rounded-lg group">
                  <span
                      className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-primary ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                                <span
                                    className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-purple-600 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
                                <span className="relative">ZenUI Library</span>
                            </button>
                        </div>
                    )}

                    {margeAnimationCode &&
                        <ShowCode code='
<button className="relative px-6 py-3 font-bold text-white rounded-lg group">
  <span
     className="absolute inset-0 w-full h-full transition duration-300 transform -translate-x-1 -translate-y-1 bg-primary ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0"></span>
  <span
     className="absolute inset-0 w-full h-full transition duration-300 transform translate-x-1 translate-y-1 bg-purple-600 ease opacity-80 group-hover:translate-x-0 group-hover:translate-y-0 mix-blend-screen"></span>
  <span className="relative">ZenUI Library</span>
</button>
              '
                        />}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader text={"Theme toggle animation"} id={"theme_toggle_animation"}/>
                </div>

                <ComponentDescription
                    text='A reusable button with a day-night toggle animation that can be used to switch between dark and light mode.'/>

                <ToggleTab setCode={setDayNightToggleCode} code={dayNightToggleCode} preview={dayNightTogglePreview}
                           setPreview={setDayNightTogglePreview}/>

                <ComponentWrapper>
                    {dayNightTogglePreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <div>
                                <style>{`
            .sky {
              background-color: #357bb3;
              height: ${size}px;
              aspect-ratio: 2.542;
              width: auto;
              border-radius: 9999px;
              position: relative;
              overflow: hidden;
              transition: all ease-in-out ${animationSpeed}s;
              display: block;
              cursor: pointer;
            }

            .sky::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 9999px;
              box-shadow: 0px 2.226px 2.862px 0px rgba(0, 0, 0, 0.25) inset,
                          0px -0.318px 4.134px 0px rgba(0, 0, 0, 0.25) inset,
                          0px -0.954px 1.272px 0px rgba(0, 0, 0, 0.25);
              z-index: 9999;
            }

            #sun_wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100%;
              aspect-ratio: 1;
              position: relative;
              z-index: 10;
              margin-left: 0.45%;
              transition: all ease-in-out ${animationSpeed}s;
            }

            #sun {
              background-color: #ffd700;
              height: 83%;
              aspect-ratio: 1;
              border-radius: 9999px;
              box-shadow: 0 0 2px rgba(255, 215, 0, 0.5);
              position: absolute;
              z-index: 20;
              box-shadow: 0.6px 0.8px 0.8px 0px rgba(254, 255, 239, 0.61) inset,
                          0px -1px 0.8px 0px #ba9b2e inset;
              overflow: hidden;
            }

            #sun_wrapper .ray {
              background-color: #fff;
              height: 260%;
              aspect-ratio: 1;
              border-radius: 9999px;
              position: absolute;
              opacity: 0.1;
            }

            #sun_wrapper .ray:nth-child(1) {
              height: 198%;
            }

            #sun_wrapper .ray:nth-child(2) {
              height: 140%;
            }

            #moon {
              background-color: rgb(195, 201, 209);
              height: 100%;
              aspect-ratio: 1;
              border-radius: 9999px;
              z-index: -11;
              position: relative;
              box-shadow: 0.6px 0.8px 0.8px 0px rgba(255, 255, 255, 0.61) inset,
                          0px -1px 0.8px 0px #969696 inset;
              transform: translateX(100%);
              transition: all ease-in-out ${animationSpeed}s;
            }

            #moon .spot {
              background: rgb(148, 158, 178);
              height: 10%;
              aspect-ratio: 1;
              border-radius: 99999px;
              position: absolute;
              box-shadow: 0px 0.2px 0.8px 0px rgba(0, 0, 0, 0.25) inset;
            }

            #moon .spot:nth-child(1) {
              top: 40%;
              left: 17%;
              height: 37%;
            }

            #moon .spot:nth-child(2) {
              top: 20%;
              left: 45%;
              height: 13%;
            }

            #moon .spot:nth-child(3) {
              top: 50%;
              left: 64%;
              height: 22%;
            }

            .cloud_wrapper {
              background-color: transparent;
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
              width: 100%;
              display: flex;
              align-items: flex-end;
              z-index: 10;
              transition: all ease-in-out ${animationSpeed}s;
            }

            .cloud_wrapper:nth-of-type(2) {
              transform: translateY(-5%) translateX(-5.5%);
              opacity: 0.6;
            }

            .cloud {
              background-color: rgb(243, 253, 255);
              height: 55%;
              aspect-ratio: 1;
              border-radius: 9999px;
              position: absolute;
            }

            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(1) {
              margin-left: 77%;
              margin-bottom: 16%;
              height: 81%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(2) {
              margin-left: 81%;
              margin-bottom: 1%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(3) {
              margin-left: 66%;
              margin-bottom: -4%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(4) {
              margin-left: 57%;
              margin-bottom: -9%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(5) {
              margin-left: 46%;
              margin-bottom: -9.5%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(6) {
              margin-left: 33%;
              margin-bottom: -14.5%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(7) {
              margin-left: 23%;
              margin-bottom: -16%;
            }
            .cloud_wrapper:nth-of-type(2) .cloud:nth-child(8) {
              margin-left: 7%;
              margin-bottom: -14%;
            }

            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(1) {
              margin-left: 84%;
              margin-bottom: 15%;
              height: 81%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(2) {
              margin-left: 84%;
              margin-bottom: -2%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(3) {
              margin-left: 67%;
              margin-bottom: -9.5%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(4) {
              margin-left: 58%;
              margin-bottom: -15%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(5) {
              margin-left: 46%;
              margin-bottom: -11%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(6) {
              margin-left: 33%;
              margin-bottom: -14%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(7) {
              margin-left: 21%;
              margin-bottom: -16%;
            }
            .cloud_wrapper:nth-of-type(3) .cloud:nth-child(8) {
              margin-left: 5%;
              margin-bottom: -14%;
            }

            #stars {
              width: 100%;
              height: 100%;
              background-color: inherit;
              position: absolute;
              border-radius: 99999px;
              display: flex;
              justify-content: flex-start;
              gap: 1.2%;
              padding-left: 8%;
              align-items: center;
              top: 0;
              transform: translateY(-100%);
              transition: transform ease-in-out ${animationSpeed}s;
            }

            #stars .star {
              position: relative;
              height: 10%;
              aspect-ratio: 1;
              border-radius: 100%;
              overflow: hidden;
              background-color: inherit;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            #stars .star:nth-child(1) {
              transform: scale(0.6);
              margin-bottom: 10%;
            }
            #stars .star:nth-child(2) {
              transform: scale(0.5);
              margin-bottom: -15%;
            }
            #stars .star:nth-child(3) {
              transform: scale(0.3);
              margin-bottom: -1%;
            }
            #stars .star:nth-child(4) {
              transform: scale(1.2);
              margin-bottom: 20%;
            }
            #stars .star:nth-child(5) {
              transform: scale(0.6);
              margin-bottom: 8%;
              margin-left: 3%;
            }
            #stars .star:nth-child(6) {
              transform: scale(0.6);
              margin-bottom: -17%;
              margin-left: -3%;
            }
            #stars .star:nth-child(7) {
              transform: scale(0.3);
              margin-bottom: -2%;
            }
            #stars .star:nth-child(8) {
              transform: scale(1.4);
              margin-bottom: -19%;
              margin-left: 2%;
            }
            #stars .star:nth-child(9) {
              transform: scale(0.8);
              margin-bottom: 3%;
              margin-left: -2%;
            }

            #stars .star .ray {
              background-color: inherit;
              height: 100%;
              aspect-ratio: 1;
              border-radius: 100%;
              position: absolute;
            }

            #stars .star .base {
              background-color: white;
              height: 95%;
              aspect-ratio: 1;
              border-radius: 100%;
              position: absolute;
            }

            #stars .star .ray:nth-child(2) {
              transform: translateX(70%);
            }
            #stars .star .ray:nth-child(3) {
              transform: translateX(-70%);
            }
            #stars .star .ray:nth-child(4) {
              transform: translateY(70%);
            }
            #stars .star .ray:nth-child(5) {
              transform: translateY(-70%);
            }

            input[type="checkbox"] {
              display: none;
            }

            #checkbox:checked + .sky {
              background: #1c1f2c;
            }

            #checkbox:checked + .sky .cloud_wrapper {
              transform: translateY(130%);
            }

            #checkbox:checked + .sky .cloud_wrapper:nth-of-type(2) {
              transform: translate(20%, 130%);
            }

            #checkbox:checked + .sky #sun_wrapper {
              transform: translateX(152.1%);
            }

            #checkbox:checked + .sky #moon {
              transform: translateX(0%);
            }

            #checkbox:checked + .sky #stars {
              transform: unset;
            }
          `}</style>
                                <input id="checkbox" type="checkbox"/>
                                <label htmlFor="checkbox" className="sky">
                                    <div id="sun_wrapper">
                                        <div className="ray"></div>
                                        <div className="ray"></div>
                                        <div className="ray"></div>
                                        <div id="sun">
                                            <div id="moon">
                                                <div className="spot"></div>
                                                <div className="spot"></div>
                                                <div className="spot"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="cloud_wrapper">
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                    </div>
                                    <div className="cloud_wrapper">
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                        <div className="cloud"></div>
                                    </div>
                                    <div id="stars">
                                        {[...Array(9)].map((_, i) => (
                                            <div className="star" key={`star-${i}`}>
                                                <div className="base"></div>
                                                <div className="ray"></div>
                                                <div className="ray"></div>
                                                <div className="ray"></div>
                                                <div className="ray"></div>
                                            </div>
                                        ))}
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {dayNightToggleCode && (
                        <ShowCode code={`
import React from 'react';

const DayNightToggle = ({ size = 60, animationSpeed = .7 }) => {
  return (
    <div>
      <style>{\`
        .sky {
          background-color: #357bb3;
          height: \${size}px;
          aspect-ratio: 2.542;
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
          transition: all ease-in-out \${animationSpeed}s;
          display: block;
          cursor: pointer;
        }

        .sky::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 9999px;
          box-shadow: 0px 2.226px 2.862px 0px rgba(0, 0, 0, 0.25) inset,
                      0px -0.318px 4.134px 0px rgba(0, 0, 0, 0.25) inset,
                      0px -0.954px 1.272px 0px rgba(0, 0, 0, 0.25);
          z-index: 9999;
        }

        #sun_wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          aspect-ratio: 1;
          position: relative;
          z-index: 10;
          margin-left: 0.45%;
          transition: all ease-in-out \${animationSpeed}s;
        }

        #sun {
          background-color: #ffd700;
          height: 83%;
          aspect-ratio: 1;
          border-radius: 9999px;
          box-shadow: 0 0 2px rgba(255, 215, 0, 0.5);
          position: absolute;
          z-index: 20;
          box-shadow: 0.6px 0.8px 0.8px 0px rgba(254, 255, 239, 0.61) inset,
                      0px -1px 0.8px 0px #ba9b2e inset;
          overflow: hidden;
        }

        #sun_wrapper .ray {
          background-color: #fff;
          height: 260%;
          aspect-ratio: 1;
          border-radius: 9999px;
          position: absolute;
          opacity: 0.1;
        }

        #sun_wrapper .ray:nth-child(1) {
          height: 198%;
        }

        #sun_wrapper .ray:nth-child(2) {
          height: 140%;
        }

        #moon {
          background-color: rgb(195, 201, 209);
          height: 100%;
          aspect-ratio: 1;
          border-radius: 9999px;
          z-index: -11;
          position: relative;
          box-shadow: 0.6px 0.8px 0.8px 0px rgba(255, 255, 255, 0.61) inset,
                      0px -1px 0.8px 0px #969696 inset;
          transform: translateX(100%);
          transition: all ease-in-out \${animationSpeed}s;
        }

        #moon .spot {
          background: rgb(148, 158, 178);
          height: 10%;
          aspect-ratio: 1;
          border-radius: 99999px;
          position: absolute;
          box-shadow: 0px 0.2px 0.8px 0px rgba(0, 0, 0, 0.25) inset;
        }

        #moon .spot:nth-child(1) {
          top: 40%;
          left: 17%;
          height: 37%;
        }

        #moon .spot:nth-child(2) {
          top: 20%;
          left: 45%;
          height: 13%;
        }

        #moon .spot:nth-child(3) {
          top: 50%;
          left: 64%;
          height: 22%;
        }

        .cloud_wrapper {
          background-color: transparent;
          position: absolute;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: flex-end;
          z-index: 10;
          transition: all ease-in-out \${animationSpeed}s;
        }

        .cloud_wrapper:nth-of-type(2) {
          transform: translateY(-5%) translateX(-5.5%);
          opacity: 0.6;
        }

        .cloud {
          background-color: rgb(243, 253, 255);
          height: 55%;
          aspect-ratio: 1;
          border-radius: 9999px;
          position: absolute;
        }

        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(1) {
          margin-left: 77%;
          margin-bottom: 16%;
          height: 81%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(2) {
          margin-left: 81%;
          margin-bottom: 1%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(3) {
          margin-left: 66%;
          margin-bottom: -4%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(4) {
          margin-left: 57%;
          margin-bottom: -9%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(5) {
          margin-left: 46%;
          margin-bottom: -9.5%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(6) {
          margin-left: 33%;
          margin-bottom: -14.5%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(7) {
          margin-left: 23%;
          margin-bottom: -16%;
        }
        .cloud_wrapper:nth-of-type(2) .cloud:nth-child(8) {
          margin-left: 7%;
          margin-bottom: -14%;
        }

        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(1) {
          margin-left: 84%;
          margin-bottom: 15%;
          height: 81%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(2) {
          margin-left: 84%;
          margin-bottom: -2%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(3) {
          margin-left: 67%;
          margin-bottom: -9.5%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(4) {
          margin-left: 58%;
          margin-bottom: -15%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(5) {
          margin-left: 46%;
          margin-bottom: -11%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(6) {
          margin-left: 33%;
          margin-bottom: -14%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(7) {
          margin-left: 21%;
          margin-bottom: -16%;
        }
        .cloud_wrapper:nth-of-type(3) .cloud:nth-child(8) {
          margin-left: 5%;
          margin-bottom: -14%;
        }

        #stars {
          width: 100%;
          height: 100%;
          background-color: inherit;
          position: absolute;
          border-radius: 99999px;
          display: flex;
          justify-content: flex-start;
          gap: 1.2%;
          padding-left: 8%;
          align-items: center;
          top: 0;
          transform: translateY(-100%);
          transition: transform ease-in-out \${animationSpeed}s;
        }

        #stars .star {
          position: relative;
          height: 10%;
          aspect-ratio: 1;
          border-radius: 100%;
          overflow: hidden;
          background-color: inherit;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #stars .star:nth-child(1) {
          transform: scale(0.6);
          margin-bottom: 10%;
        }
        #stars .star:nth-child(2) {
          transform: scale(0.5);
          margin-bottom: -15%;
        }
        #stars .star:nth-child(3) {
          transform: scale(0.3);
          margin-bottom: -1%;
        }
        #stars .star:nth-child(4) {
          transform: scale(1.2);
          margin-bottom: 20%;
        }
        #stars .star:nth-child(5) {
          transform: scale(0.6);
          margin-bottom: 8%;
          margin-left: 3%;
        }
        #stars .star:nth-child(6) {
          transform: scale(0.6);
          margin-bottom: -17%;
          margin-left: -3%;
        }
        #stars .star:nth-child(7) {
          transform: scale(0.3);
          margin-bottom: -2%;
        }
        #stars .star:nth-child(8) {
          transform: scale(1.4);
          margin-bottom: -19%;
          margin-left: 2%;
        }
        #stars .star:nth-child(9) {
          transform: scale(0.8);
          margin-bottom: 3%;
          margin-left: -2%;
        }

        #stars .star .ray {
          background-color: inherit;
          height: 100%;
          aspect-ratio: 1;
          border-radius: 100%;
          position: absolute;
        }

        #stars .star .base {
          background-color: white;
          height: 95%;
          aspect-ratio: 1;
          border-radius: 100%;
          position: absolute;
        }

        #stars .star .ray:nth-child(2) {
          transform: translateX(70%);
        }
        #stars .star .ray:nth-child(3) {
          transform: translateX(-70%);
        }
        #stars .star .ray:nth-child(4) {
          transform: translateY(70%);
        }
        #stars .star .ray:nth-child(5) {
          transform: translateY(-70%);
        }

        input[type="checkbox"] {
          display: none;
        }

        #checkbox:checked + .sky {
          background: #1c1f2c;
        }

        #checkbox:checked + .sky .cloud_wrapper {
          transform: translateY(130%);
        }

        #checkbox:checked + .sky .cloud_wrapper:nth-of-type(2) {
          transform: translate(20%, 130%);
        }

        #checkbox:checked + .sky #sun_wrapper {
          transform: translateX(152.1%);
        }

        #checkbox:checked + .sky #moon {
          transform: translateX(0%);
        }

        #checkbox:checked + .sky #stars {
          transform: unset;
        }
      \`}
      </style>
      <input id="checkbox" type="checkbox" />
      <label htmlFor="checkbox" className="sky">
        <div id="sun_wrapper">
          <div className="ray"></div>
          <div className="ray"></div>
          <div className="ray"></div>
          <div id="sun">
            <div id="moon">
              <div className="spot"></div>
              <div className="spot"></div>
              <div className="spot"></div>
            </div>
          </div>
        </div>
        <div className="cloud_wrapper">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
        <div className="cloud_wrapper">
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
          <div className="cloud"></div>
        </div>
        <div id="stars">
          {[...Array(9)].map((_, i) => (
            <div className="star" key={\`star-\${i}\`}>
              <div className="base"></div>
              <div className="ray"></div>
              <div className="ray"></div>
              <div className="ray"></div>
              <div className="ray"></div>
            </div>
          ))}
        </div>
      </label>
    </div>
  );
};

export default DayNightToggle;
              `}/>
                    )}
                </ComponentWrapper>

                <div className="mt-8">
                    <ContentHeader text={"Celebration Button"} id={"celebration_button"}/>
                </div>
                <ComponentDescription
                    text='A button with a celebration/confetti animation on click, providing delightful feedback for success actions.'/>
                <ToggleTab setCode={setCelebrationButtonCode} code={celebrationButtonCode}
                           preview={celebrationButtonPreview} setPreview={setCelebrationButtonPreview}/>
                <ComponentWrapper>
                    {celebrationButtonPreview && (
                        <div className="p-8 mb-4 flex items-center gap-5 justify-center">
                            <CelebrationButton/>
                        </div>
                    )}
                    {celebrationButtonCode && (
                        <ShowCode code={CelebrationButtonCodes}/>
                    )}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/dropdown-button' backName='dropdown button' forwardName='cards'
                                forwardUrl='/components/cards'/>
            </div>

            <ContentNavbar activeSection={activeSection} contents={[
                ...animatedButtonContents
            ]}/>

            <Helmet>
                <title>Buttons - Animated Button</title>
            </Helmet>
        </aside>
    );
};

export default Index;