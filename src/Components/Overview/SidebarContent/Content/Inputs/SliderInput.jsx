import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {sliderInputContents} from '@utils/ContentsConfig/InputContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

const SliderInput = () => {
    const sectionIds = sliderInputContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // slider input
    const [sliderPreview, setSliderPreview] = useState(true);
    const [sliderCode, setSliderCode] = useState(false);

    // slider input
    const [breakPointSliderPreview, setBreakPointSliderPreview] = useState(true);
    const [breakPointSliderCode, setBreakPointSliderCode] = useState(false);

    // actions
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const newValue = ((event.clientX - slider.left) / slider.width) * 100;
        setValue(Math.min(Math.max(newValue, 0), 100));
    };

    const breakpoints = [0, 25, 50, 75, 100];
    const [value1, setValue1] = useState(50); // Start at a specific breakpoint (e.g., 50%)

    // Function to find the nearest breakpoint
    const findNearestBreakpoint = (value) => {
        return breakpoints.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
    };

    // Handle changes in the slider thumb position
    const handleChange1 = (event) => {
        const newValue = Number(event.target.value);
        const nearestBreakpoint = findNearestBreakpoint(newValue);
        setValue1(nearestBreakpoint);
    };

    // Handle click on the slider track
    const handleClick1 = (event) => {
        const slider = event.target.getBoundingClientRect();
        const clickPosition = ((event.clientX - slider.left) / slider.width) * 100;
        const nearestBreakpoint = findNearestBreakpoint(clickPosition);
        setValue1(nearestBreakpoint);
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'slider'} id={'slider'}/>

                    <ComponentDescription text='Adjustable slider for selecting a value or range, offering smooth
            control with a draggable handle.'/>

                    <ToggleTab code={sliderCode} setCode={setSliderCode} preview={sliderPreview}
                               setPreview={setSliderPreview}/>

                    <ComponentWrapper>
                        {sliderPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex items-center justify-center'>
                                    <div
                                        className='relative w-64 h-3 bg-gray-300 dark:bg-slate-700 rounded-full cursor-pointer'
                                        onClick={handleClick}
                                    >
                                        <input
                                            type='range'
                                            min='0'
                                            max='100'
                                            value={value}
                                            onChange={handleChange}
                                            className='absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer'
                                        />
                                        <div
                                            className='absolute top-0 h-3 bg-[#108476] rounded-full'
                                            style={{
                                                width: `${value}%`,
                                            }}
                                        />
                                        <div
                                            className='absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white'
                                            style={{
                                                left: `${value}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {sliderCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const InputRange = () => {
    const [value, setValue] = useState(0);

    const sliderChange = (event) => {
        setValue(event.target.value);
    };

    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const newValue = ((event.clientX - slider.left) / slider.width) * 100;
        setValue(Math.min(Math.max(newValue, 0), 100));
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className="relative w-64 h-3 bg-gray-300 dark:bg-slate-700 rounded-full cursor-pointer"
                onClick={handleClick}
            >
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={sliderChange}
                    className="absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
                />
                <div
                    className="absolute top-0 h-3 bg-[#108476] rounded-full"
                    style={{
                        width: `${value}%`,
                    }}
                />
                <div
                    className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                    style={{
                        left: `${value}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default InputRange;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'breakpoint range slider'}
                            id={'breakpoint_range_slider'}
                        />
                    </div>

                    <ComponentDescription text='A range slider with breakpoints, allowing users to select values
            within defined intervals for more precise control.'/>

                    <ToggleTab code={breakPointSliderCode} setCode={setBreakPointSliderCode}
                               setPreview={setBreakPointSliderPreview} preview={breakPointSliderPreview}/>

                    <ComponentWrapper>
                        {breakPointSliderPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='flex flex-col items-center justify-center'>
                                    <div
                                        className='relative w-64 h-3 dark:bg-slate-700 bg-gray-300 rounded-full cursor-pointer'
                                        onClick={handleClick1}
                                    >
                                        <input
                                            type='range'
                                            min='0'
                                            max='100'
                                            value={value1}
                                            onChange={handleChange1}
                                            className='absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer'
                                        />
                                        <div
                                            className='absolute top-0 h-3 bg-[#108476] rounded-full'
                                            style={{
                                                width: `${value1}%`,
                                            }}
                                        />
                                        <div
                                            className='absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white'
                                            style={{
                                                left: `${value1}%`,
                                            }}
                                        />
                                        {/* Breakpoint markers */}
                                        {breakpoints.map((point, index) => (
                                            <div
                                                key={index}
                                                className='absolute top-[50%] w-[10px] h-[10px] transform -translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-300 rounded-full border border-gray-500'
                                                style={{
                                                    left: `${point}%`,
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* parentage showing */}
                                    <div className='flex justify-between w-64 mt-2'>
                                        {breakpoints.map((point, index) => (
                                            <span key={index} className='text-sm dark:text-[#abc2d3] text-gray-700'>
                        {point}%
                      </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {breakPointSliderCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const RadioInput = () => {
    const [value, setValue] = useState(50);
    const breakpoints = [0, 25, 50, 75, 100];

    // Function to find the nearest breakpoint
    const findNearestBreakpoint = (value) => {
        return breakpoints.reduce((prev, curr) =>
            Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
        );
    };

    // Handle changes in the slider thumb position
    const handleChange = (event) => {
        const newValue = Number(event.target.value);
        const nearestBreakpoint = findNearestBreakpoint(newValue);
        setValue(nearestBreakpoint);
    };

    // Handle click on the slider track
    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const clickPosition = ((event.clientX - slider.left) / slider.width) * 100;
        const nearestBreakpoint = findNearestBreakpoint(clickPosition);
        setValue(nearestBreakpoint);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div
                className="relative w-64 h-3 dark:bg-slate-700 bg-gray-300 rounded-full cursor-pointer"
                onClick={handleClick}
            >
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    className="absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
                />
                <div
                    className="absolute top-0 h-3 bg-[#108476] rounded-full"
                    style={{
                        width: `${value}%`,
                    }}
                />
                <div
                    className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#108476] rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                    style={{
                        left: `${value}%`,
                    }}
                />
                {/* Breakpoint markers */}
                {breakpoints.map((point, index) => (
                    <div
                        key={index}
                        className="absolute top-[50%] w-[10px] h-[10px] transform -translate-x-1/2 translate-y-[-50%] bg-white dark:bg-slate-300 rounded-full border border-gray-500"
                        style={{
                            left: `${point}%`,
                        }}
                    />
                ))}
            </div>

            {/* parentage showing */}
            <div className="flex justify-between w-64 mt-2">
                {breakpoints.map((point, index) => (
                    <span key={index} className="text-sm dark:text-[#abc2d3] text-gray-700">
                        {point}%
                      </span>
                ))}
            </div>
        </div>
    );
};

export default RadioInput;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/input-radio'
                        backName='radio'
                        forwardUrl='/components/input-file'
                        forwardName='file'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={sliderInputContents}/>

            </aside>
            <Helmet>
                <title>Form - Range</title>
            </Helmet>
        </>
    );
};

export default SliderInput;
