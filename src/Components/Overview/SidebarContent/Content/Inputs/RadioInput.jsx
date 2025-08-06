import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {radioInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

const RadioInput = () => {
    const sectionIds = radioInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // circle radio
    const [circlePreview, setCirclePreview] = useState(true);
    const [circleCode, setCircleCode] = useState(false);

    // square radio
    const [squarePreview, setSquarePreview] = useState(true);
    const [squareCode, setSquareCode] = useState(false);

    // actions
    const [toggle, setToggle] = useState(false);
    const [squareToggle, setSquareToggle] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'circle radio'} id={'circle_radio'}/>

                    <ComponentDescription text='This is a circle radio button component. Select options with a click
            on the elegant circular design.'/>

                    <ToggleTab code={circleCode} setCode={setCircleCode} setPreview={setCirclePreview}
                               preview={circlePreview}/>

                    <ComponentWrapper>
                        {circlePreview && (
                            <div className='p-8 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center gap-[10px]'>
                                    <div
                                        className={` w-[35px] h-[35px] border border-primary  rounded-full flex items-center justify-center cursor-pointer `}
                                        onClick={() => setSquareToggle(!squareToggle)}
                                    >
                                        <div
                                            className={`${
                                                squareToggle
                                                    ? 'bg-primary scale-[1]'
                                                    : 'bg-transparent scale-[0.7]'
                                            } w-[25px] h-[25px] transition-all duration-200 rounded-full`}
                                        ></div>
                                    </div>
                                    <p
                                        className='text-[1.2rem] font-bold dark:text-[#abc2d3] text-text cursor-pointer'
                                        onClick={() => setSquareToggle(!squareToggle)}
                                    >
                                        Toggle
                                    </p>
                                </div>
                            </div>
                        )}

                        {circleCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const RadioInput = () => {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div className="flex items-center gap-[10px]">
            <div
                className={` w-[35px] h-[35px] border border-[#3B9DF8]  rounded-full flex items-center justify-center cursor-pointer `}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? "bg-[#3B9DF8] scale-[1]"
                            : "bg-transparent scale-[0.7]"
                    } w-[25px] h-[25px] transition-all duration-200 rounded-full`}
                ></div>
            </div>
            <p
                className="text-[1.2rem] font-bold dark:text-[#abc2d3] text-[#424242] cursor-pointer"
                onClick={() => setIsToggle(!isToggle)}
            >
                Toggle
            </p>
        </div>
    );
};

export default RadioInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Square Radio'} id={'square_radio'}/>
                    </div>

                    <ComponentDescription text='This is a square radio button component. Choose options by clicking
            on the modern, square design.'/>

                    <ToggleTab code={squareCode} setCode={setSquareCode} setPreview={setSquarePreview}
                               preview={squarePreview}/>

                    <ComponentWrapper>
                        {squarePreview && (
                            <div className='p-8 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center gap-[10px]'>
                                    <div
                                        className={` w-[32px] h-[32px] border border-primary  rounded-md flex items-center justify-center cursor-pointer `}
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <div
                                            className={`${
                                                toggle
                                                    ? 'bg-primary scale-[1]'
                                                    : 'bg-transparent scale-[0.7]'
                                            } w-[25px] h-[25px] transition-all duration-200 rounded-md`}
                                        ></div>
                                    </div>

                                    <p
                                        className='text-[1.2rem] font-bold dark:text-[#abc2d3] text-text cursor-pointer'
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        Toggle
                                    </p>
                                </div>
                            </div>
                        )}

                        {squareCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const RadioInput = () => {
    const [isToggle, setIsToggle] = useState(false);

    return (
        <div className="flex items-center gap-[10px]">
            <div
                className={` w-[32px] h-[32px] border border-[#3B9DF8]  rounded-md flex items-center justify-center cursor-pointer `}
                onClick={() => setIsToggle(!isToggle)}
            >
                <div
                    className={`${
                        isToggle
                            ? "bg-[#3B9DF8] scale-[1]"
                            : "bg-transparent scale-[0.7]"
                    } w-[25px] h-[25px] transition-all duration-200 rounded-md`}
                ></div>
            </div>

            <p
                className="text-[1.2rem] font-bold dark:text-[#abc2d3] text-[#424242] cursor-pointer"
                onClick={() => setIsToggle(!isToggle)}
            >
                Toggle
            </p>
        </div>
    );
};

export default RadioInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/input-select'
                        backName='select'
                        forwardName='range'
                        forwardUrl='/components/input-range'
                    />
                </div>

                <ContentNavbar contents={radioInputContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Form - Radio</title>
            </Helmet>
        </>
    );
};

export default RadioInput;
