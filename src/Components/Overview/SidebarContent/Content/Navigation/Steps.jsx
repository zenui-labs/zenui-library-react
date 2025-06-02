import React, {useState} from "react";

// components
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {stepsContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Steps = () => {
    const sectionIds = stepsContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // Number Step
    const [numberStepPreview, setNumberStepPreview] = useState(true);
    const [numberStepCode, setNumberStepCode] = useState(false);

    // no text Step
    const [noTextStepPreview, setNoTextStepPreview] = useState(true);
    const [noTextStepCode, setNoTextStepCode] = useState(false);

    // vertical Step
    const [varticalStepPreview, setVarticalStepPreview] = useState(true);
    const [varticalStepCode, setVarticalStepCode] = useState(false);

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader id='number_stepper' text={'number stepper'}/>

                    <ComponentDescription text='A UI component that guides users through a multi-step process,
              visually indicating progress and allowing navigation between
              steps.'/>

                    <ToggleTab setCode={setNumberStepCode} code={numberStepCode} preview={numberStepPreview}
                               setPreview={setNumberStepPreview}/>

                    <ComponentWrapper>
                        {numberStepPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex flex-wrap items-center gap-[15px] justify-center w-full'>
                                    <p className='w-[35px] h-[35px] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]'>
                                        1
                                    </p>
                                    <div className='flex items-center gap-[3px]'>
                      <span className='text-[0.9rem] text-primary'>
                        Cart items
                      </span>
                                    </div>
                                    <p className='w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]'>
                                        2
                                    </p>
                                    <div className='flex items-center gap-[3px]'>
                                        <span className='text-[0.9rem] dark:text-[#abc2d3]'>Payment process</span>
                                    </div>
                                    <p className='w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]'>
                                        3
                                    </p>
                                    <div className='flex items-center gap-[3px]'>
                                        <span className='text-[0.9rem] dark:text-[#abc2d3]'>Success</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {numberStepCode && (
                            <Showcode
                                code='
import React from "react";

const Stepper = () => {

    return (
        <div className="flex flex-wrap items-center gap-[15px] justify-center w-full">
            <p className="w-[35px] h-[35px] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]">1</p>
            <div className="flex items-center gap-[3px]">
                <span className="text-[0.9rem] text-primary dark:text-[#abc2d3]">Cart items</span>
            </div>
            <p className="w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]">2</p>
            <div className="flex items-center gap-[3px]">
                <span className="text-[0.9rem] dark:text-[#abc2d3]">Payment process</span>
            </div>
            <p className="w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]">3</p>
            <div className="flex items-center gap-[3px]">
                <span className="text-[0.9rem] dark:text-[#abc2d3]">Success</span>
            </div>
        </div>
    );
};

export default Stepper;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='no_text_stepper' text={'no text stepper'}/>
                    </div>

                    <ComponentDescription text='A stepper that displays only numbers to indicate each step,
              without showing step names.'/>

                    <ToggleTab setCode={setNoTextStepCode} code={noTextStepCode} setPreview={setNoTextStepPreview}
                               preview={noTextStepPreview}/>

                    <ComponentWrapper>
                        {noTextStepPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex items-center gap-[15px] justify-center w-full'>
                                    <div className='flex items-center w-[35%]'>
                                        <p className='w-[35px] h-[35px] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]'>
                                            1
                                        </p>
                                        <hr className='w-[80%] border-primary'/>
                                    </div>
                                    <div className='flex items-center w-[35%]'>
                                        <p className='w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]'>
                                            2
                                        </p>
                                        <hr className='w-[80%] dark:border-slate-600'/>
                                    </div>
                                    <p className='w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]'>
                                        3
                                    </p>
                                </div>
                            </div>
                        )}

                        {noTextStepCode && (
                            <Showcode
                                code='
import React from "react";

const Stepper = () => {

    return (
        <div className="flex items-center gap-[15px] justify-center w-full">
            <div className="flex items-center w-[35%]">
                <p className="w-[35px] h-[35px] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]">1</p>
                <hr className="w-[80%] border-primary dark:border-slate-600"/>
            </div>
            <div className="flex items-center w-[35%]">
                <p className="w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]">2</p>
                <hr className="w-[80%] dark:border-slate-600"/>
            </div>
            <p className="w-[35px] h-[35px] flex items-center justify-center border border-primary rounded-full text-primary text-[1rem]">3</p>
        </div>
    );
};

export default Stepper;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='vertical_stepper' text={'vertical stepper'}/>
                    </div>

                    <ComponentDescription text='A vertical stepper that displays steps in a top-to-bottom
              progression, guiding users through a multi-step process
              vertically.'/>

                    <ToggleTab setCode={setVarticalStepCode} code={varticalStepCode} preview={varticalStepPreview}
                               setPreview={setVarticalStepPreview}/>

                    <ComponentWrapper>
                        {varticalStepPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex flex-col items-center gap-[10px] justify-center w-full'>
                                    <div className='flex items-start gap-[20px]'>
                                        <div className='flex flex-col items-center'>
                                            <p className='w-[35px] h-[35px] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]'>
                                                1
                                            </p>
                                            <div className='w-[2px] h-[50px] bg-primary mt-[10px]'></div>
                                        </div>

                                        <div>
                                            <h1 className='text-[1.1rem] dark:text-[#abc2d3] text-gray-700'>
                                                Step Title
                                            </h1>
                                            <p className='text-[0.9rem] dark:text-[#abc2d3]/70 text-gray-500'>
                                                Step Descriptions
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-[20px]'>
                                        <div className='flex flex-col items-center'>
                                            <p className='w-[35px] h-[35px] flex items-center justify-center bg-primary outline-2 outline outline-offset-[3px] outline-primary rounded-full text-white text-[1rem]'>
                                                2
                                            </p>
                                            <div className='w-[2px] h-[50px] bg-primary mt-[10px]'></div>
                                        </div>

                                        <div>
                                            <h1 className='text-[1.1rem] dark:text-[#abc2d3] text-gray-700'>
                                                Step Title
                                            </h1>
                                            <p className='text-[0.9rem] dark:text-[#abc2d3]/70 text-gray-500'>
                                                Step Descriptions
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-[20px]'>
                                        <div className='flex flex-col items-center'>
                                            <p className='w-[35px] h-[35px] dark:bg-slate-700 dark:text-[#abc2d3] flex items-center justify-center bg-gray-200 rounded-full text-gray-500 text-[1rem]'>
                                                3
                                            </p>
                                            <div
                                                className='w-[2px] h-[50px] dark:bg-slate-700 bg-gray-300 mt-[10px]'></div>
                                        </div>

                                        <div>
                                            <h1 className='text-[1.1rem] dark:text-[#abc2d3] text-gray-700'>
                                                Step Title
                                            </h1>
                                            <p className='text-[0.9rem] dark:text-[#abc2d3]/70 text-gray-500'>
                                                Step Descriptions
                                            </p>
                                        </div>
                                    </div>
                                    <div className='flex items-start gap-[20px]'>
                                        <div className='flex flex-col items-center'>
                                            <p className='w-[35px] h-[35px] dark:bg-slate-700 dark:text-[#abc2d3] flex items-center justify-center bg-gray-200 rounded-full text-gray-500 text-[1rem]'>
                                                4
                                            </p>
                                        </div>

                                        <div>
                                            <h1 className='text-[1.1rem] dark:text-[#abc2d3] text-gray-700'>
                                                Step Title
                                            </h1>
                                            <p className='text-[0.9rem] dark:text-[#abc2d3]/70 text-gray-500'>
                                                Step Descriptions
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {varticalStepCode && (
                            <Showcode
                                code='
import React from "react";

const Stepper = () => {

    return (
        <div className="flex flex-col items-center gap-[10px] justify-center w-full">
            <div className="flex items-start gap-[20px]">
                <div className="flex flex-col items-center">
                    <p className="w-[35px] h-[35px] dark:bg-slate-700 dark:text-[#abc2d3] flex items-center justify-center bg-primary rounded-full text-white text-[1rem]">1</p>
                    <div className="w-[2px] h-[50px] dark:bg-slate-700 bg-primary mt-[10px]"></div>
                </div>

                <div>
                    <h1 className="text-[1.1rem] text-gray-700 dark:text-[#abc2d3]">Step Title</h1>
                    <p className="text-[0.9rem] text-gray-500 dark:text-[#abc2d3]/70">Step Descriptions</p>
                </div>
            </div>
            <div className="flex items-start gap-[20px]">
                <div className="flex flex-col items-center">
                    <p className="w-[35px] h-[35px] dark:bg-slate-700 dark:text-[#abc2d3] flex items-center justify-center bg-primary outline-2 outline outline-offset-[3px] outline-primary rounded-full text-white text-[1rem]">2</p>
                    <div className="w-[2px] h-[50px] dark:bg-slate-700 bg-primary mt-[10px]"></div>
                </div>

                <div>
                    <h1 className="text-[1.1rem] text-gray-700 dark:text-[#abc2d3]">Step Title</h1>
                    <p className="text-[0.9rem] text-gray-500 dark:text-[#abc2d3]/70">Step Descriptions</p>
                </div>
            </div>
            <div className="flex items-start gap-[20px]">
                <div className="flex flex-col items-center">
                    <p className="w-[35px] h-[35px] flex dark:bg-slate-700 dark:text-[#abc2d3] items-center justify-center bg-gray-200 rounded-full text-gray-500 text-[1rem]">3</p>
                    <div className="w-[2px] h-[50px] dark:bg-slate-700 bg-gray-300 mt-[10px]"></div>
                </div>

                <div>
                    <h1 className="text-[1.1rem] text-gray-700 dark:text-[#abc2d3]">Step Title</h1>
                    <p className="text-[0.9rem] text-gray-500 dark:text-[#abc2d3]/70">Step Descriptions</p>
                </div>
            </div>
            <div className="flex items-start gap-[20px]">
                <div className="flex flex-col items-center">
                    <p className="w-[35px] h-[35px] dark:bg-slate-700 dark:text-[#abc2d3] flex items-center justify-center bg-gray-200 rounded-full text-gray-500 text-[1rem]">4</p>
                </div>

                <div>
                    <h1 className="text-[1.1rem] text-gray-700 dark:text-[#abc2d3]">Step Title</h1>
                    <p className="text-[0.9rem] text-gray-500 dark:text-[#abc2d3]/70">Step Descriptions</p>
                </div>
            </div>
        </div>
    );
};

export default Stepper;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/rating'
                        backName='rating'
                        forwardName='modal'
                        forwardUrl='/components/modal'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={stepsContents}/>

            </aside>

            <Helmet>
                <title>Navigation - Stepper</title>
            </Helmet>
        </>
    );
};

export default Steps;
