import React, {useState, useEffect} from 'react';

// components
import Showcode from '@shared/Component/ShowCode.jsx';
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import {Helmet} from 'react-helmet';

// contents for scrollspy
import {timerContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Timer = () => {
    // toggle actions
    const [timerStyle1Preview, setTimerStyle1Preview] = useState(true);
    const [timerStyle1Code, setTimeStyle1Code] = useState(false);

    const [timerStyle2Preview, setTimerStyle2Preview] = useState(true);
    const [timerStyle2Code, setTimeStyle2Code] = useState(false);

    const [timerStyle3Preview, setTimerStyle3Preview] = useState(true);
    const [timerStyle3Code, setTimeStyle3Code] = useState(false);

    const [timerStyle4Preview, setTimerStyle4Preview] = useState(true);
    const [timerStyle4Code, setTimeStyle4Code] = useState(false);

    const [timerStyle5Preview, setTimerStyle5Preview] = useState(true);
    const [timerStyle5Code, setTimeStyle5Code] = useState(false);

    const [timerStyle6Preview, setTimerStyle6Preview] = useState(true);
    const [timerStyle6Code, setTimeStyle6Code] = useState(false);


    const sectionIds = timerContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = '2025-03-31T23:59:59'

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, '0');

    const [timeLeft2, setTimeLeft2] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        durations: {
            days: 365,
            hours: 24,
            minutes: 60,
            seconds: 60
        }
    });

    const size = 100

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft2({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    durations: {
                        days: 365,
                        hours: 24,
                        minutes: 60,
                        seconds: 60
                    }
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const CircleTimer = ({value, type}) => {
        const strokeWidth = 7;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const progress = (value / timeLeft2.durations[type]) * 100;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        return (
            <div className="relative" style={{width: size, height: size}}>
                {/* Background Circle */}
                <svg className="absolute top-0 left-0" width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke="#e5e5e5"
                        className='dark:stroke-[#1e293b]'
                        strokeWidth={strokeWidth}
                    />
                </svg>

                {/* Progress Circle */}
                <svg className="absolute top-0 left-0" width={size} height={size}>
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        fill="transparent"
                        stroke="#17b4d3"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 1s linear',
                            transform: 'rotate(-90deg)',
                            transformOrigin: '50% 50%'
                        }}
                    />
                </svg>

                {/* Time Display */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="text-[1.2rem] font-semibold text-[#17b4d3]">{value}</div>
                    <div className="text-[0.6rem] text-gray-500">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                </div>
            </div>
        );
    };

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader
                        id='timer-style-1'
                        text={'timer style 1'}
                    />

                    <ComponentDescription
                        text='A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle1Code} setCode={setTimeStyle1Code} setPreview={setTimerStyle1Preview}
                               preview={timerStyle1Preview}/>

                    <ComponentWrapper>
                        {timerStyle1Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='grid grid-cols-4 gap-[10px] mt-2'>
                                    <div className='flex items-center justify-center flex-col gap-[0.2rem]'>
                                        <h5 className='py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold'>{formatNumber(timeLeft.days)}</h5>
                                        <span className='text-[0.7rem]'>Days</span>
                                    </div>
                                    <div className='flex items-center justify-center flex-col gap-[0.2rem]'>
                                        <h5 className='py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold'>{formatNumber(timeLeft.hours)}</h5>
                                        <span className='text-[0.7rem]'>Hours</span>
                                    </div>
                                    <div className='flex items-center justify-center flex-col gap-[0.2rem]'>
                                        <h5 className='py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold'>{formatNumber(timeLeft.minutes)}</h5>
                                        <span className='text-[0.7rem]'>Minutes</span>
                                    </div>
                                    <div className='flex items-center justify-center flex-col gap-[0.2rem]'>
                                        <h5 className='py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold'>{formatNumber(timeLeft.seconds)}</h5>
                                        <span className='text-[0.7rem]'>Seconds</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {timerStyle1Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="grid grid-cols-4 gap-[10px] mt-2">

            <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold">{formatNumber(timeLeft.days)}</h5>
                <span className="text-[0.7rem]">Days</span>
            </div>

            <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold">{formatNumber(timeLeft.hours)}</h5>
                <span className="text-[0.7rem]">Hours</span>
            </div>

            <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold">{formatNumber(timeLeft.minutes)}</h5>
                <span className="text-[0.7rem]">Minutes</span>
            </div>

            <div className="flex items-center justify-center flex-col gap-[0.2rem]">
                <h5 className="py-2 px-3 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d2f1f7] text-[1.9rem] font-semibold">{formatNumber(timeLeft.seconds)}</h5>
                <span className="text-[0.7rem]">Seconds</span>
            </div>

        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='timer-style-2'
                            text={'timer style 2'}
                        />
                    </div>

                    <ComponentDescription
                        text='A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle2Code} setCode={setTimeStyle2Code} preview={timerStyle2Preview}
                               setPreview={setTimerStyle2Preview}/>

                    <ComponentWrapper>
                        {timerStyle2Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className="grid grid-cols-4 gap-8 p-4">
                                    <div className="text-center">
                                        <div
                                            className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.days)}</div>
                                        <div className="text-[0.7rem] text-gray-500">Days</div>
                                    </div>
                                    <div className="text-center">
                                        <div
                                            className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.hours)}</div>
                                        <div className="text-[0.7rem] text-gray-500">Hours</div>
                                    </div>
                                    <div className="text-center">
                                        <div
                                            className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.minutes)}</div>
                                        <div className="text-[0.7rem] text-gray-500">Minutes</div>
                                    </div>
                                    <div className="text-center">
                                        <div
                                            className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.seconds)}</div>
                                        <div className="text-[0.7rem] text-gray-500">Seconds</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {timerStyle2Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="grid grid-cols-4 gap-8 p-4">

            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.days)}</div>
                <div className="text-[0.7rem] text-gray-500">Days</div>
            </div>

            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.hours)}</div>
                <div className="text-[0.7rem] text-gray-500">Hours</div>
            </div>

            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.minutes)}</div>
                <div className="text-[0.7rem] text-gray-500">Minutes</div>
            </div>

            <div className="text-center">
                <div
                    className="text-[2.2rem] leading-[38px] font-bold text-[#17b4d3]">{formatNumber(timeLeft.seconds)}</div>
                <div className="text-[0.7rem] text-gray-500">Seconds</div>
            </div>

        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='timer-style-3'
                            text={'timer style 3'}
                        />
                    </div>

                    <ComponentDescription
                        text='A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle3Code} setCode={setTimeStyle3Code} setPreview={setTimerStyle3Preview}
                               preview={timerStyle3Preview}/>

                    <ComponentWrapper>
                        {timerStyle3Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='w-full bg-blue-50 dark:bg-slate-900 flex items-center justify-center py-12 rounded-md'>
                                    <div className='grid grid-cols-4 gap-[15px] mt-2'>
                                        <div
                                            className='py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] 640px:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col'>
                                            <h5 className='text-white text-[1.3rem] 640px:text-[1.9rem] pb-4 font-semibold'>{formatNumber(timeLeft.days)}</h5>
                                            <span
                                                className='absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md'>Days</span>
                                        </div>
                                        <div
                                            className='py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] 640px:px-[23px] shadow-xl bg-blue-500 relative  flex items-center justify-center flex-col'>
                                            <h5 className='text-white text-[1.3rem] 640px:text-[1.9rem] pb-4 font-semibold'>{formatNumber(timeLeft.hours)}</h5>
                                            <span
                                                className='absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md'>Hours</span>
                                        </div>
                                        <div
                                            className='py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] 640px:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col'>
                                            <h5 className='text-white text-[1.3rem] 640px:text-[1.9rem] pb-4 font-semibold'>{formatNumber(timeLeft.minutes)}</h5>
                                            <span
                                                className='absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md'>Minutes</span>
                                        </div>
                                        <div
                                            className='py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] 640px:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col'>
                                            <h5 className='text-white text-[1.3rem] 640px:text-[1.9rem] pb-4 font-semibold'>{formatNumber(timeLeft.seconds)}</h5>
                                            <span
                                                className='absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md'>Seconds</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {timerStyle3Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="w-full bg-blue-50 dark:bg-slate-900 flex items-center justify-center py-12 rounded-md">
            <div className="grid grid-cols-4 gap-[15px] mt-2">

                <div
                    className="py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] sm:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col">
                    <h5 className="text-white text-[1.3rem] sm:text-[1.9rem] pb-4 font-semibold">{formatNumber(timeLeft.days)}</h5>
                    <span
                        className="absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md">Days</span>
                </div>

                <div
                    className="py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] sm:px-[23px] shadow-xl bg-blue-500 relative  flex items-center justify-center flex-col">
                    <h5 className="text-white text-[1.3rem] sm:text-[1.9rem] pb-4 font-semibold">{formatNumber(timeLeft.hours)}</h5>
                    <span
                        className="absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md">Hours</span>
                </div>

                <div
                    className="py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] sm:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col">
                    <h5 className="text-white text-[1.3rem] sm:text-[1.9rem] pb-4 font-semibold">{formatNumber(timeLeft.minutes)}</h5>
                    <span
                        className="absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md">Minutes</span>
                </div>

                <div
                    className="py-3 pt-2.5 rounded-md rounded-b-xl px-[15px] sm:px-[23px] shadow-xl bg-blue-500 relative flex items-center justify-center flex-col">
                    <h5 className="text-white text-[1.3rem] sm:text-[1.9rem] pb-4 font-semibold">{formatNumber(timeLeft.seconds)}</h5>
                    <span
                        className="absolute bottom-0 z-20 text-[0.8rem] bg-white w-full text-center py-0.5 dark:bg-slate-600 dark:text-[#abc2d3] rounded-b-md">Seconds</span>
                </div>

            </div>
        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='timer-style-4'
                            text={'timer style 4'}
                        />
                    </div>

                    <ComponentDescription
                        text='A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle4Code} setCode={setTimeStyle4Code} preview={timerStyle4Preview}
                               setPreview={setTimerStyle4Preview}/>

                    <ComponentWrapper>
                        {timerStyle4Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='bg-gradient-to-b from-[#4c468f] to-[#c65f72] w-full py-12 rounded-md'>
                                    <div className='flex items-start gap-[5px] 640px:gap-[15px] justify-center'>
                                        <div className='flex items-center justify-center flex-col gap-[0.5rem]'>
                                            <div className='flex items-center gap-[8px]'>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.hours).slice(0, 1)}</p>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.hours).slice(1, timeLeft.hours.length)}</p>
                                            </div>
                                            <span
                                                className='text-white font-normal text-[0.8rem] 640px:text-[0.9rem]'>Hours</span>
                                        </div>

                                        <span className='text-[2.3rem] text-white 640px:mt-1'>:</span>

                                        <div className='flex items-center justify-center flex-col gap-[0.5rem]'>
                                            <div className='flex items-center gap-[8px]'>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.minutes).slice(0, 1)}</p>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.minutes).slice(1, timeLeft.minutes.length)}</p>
                                            </div>
                                            <span
                                                className='text-white font-normal text-[0.8rem] 640px:text-[0.9rem]'>Minutes</span>
                                        </div>

                                        <span className='text-[2.3rem] text-white 640px:mt-1'>:</span>

                                        <div className='flex items-center justify-center flex-col gap-[0.5rem]'>
                                            <div className='flex items-center gap-[8px]'>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.seconds).slice(0, 1)}</p>
                                                <p className='bg-white 640px:px-4 py-3 w-[35px] 640px:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] 640px:text-[2rem]'>{formatNumber(timeLeft.seconds).slice(1, timeLeft.seconds.length)}</p>
                                            </div>
                                            <span
                                                className='text-white font-normal text-[0.8rem] 640px:text-[0.9rem]'>Seconds</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {timerStyle4Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="bg-gradient-to-b from-[#4c468f] to-[#c65f72] w-full py-12 rounded-md">
            <div className="flex items-start gap-[5px] sm:gap-[15px] justify-center">

                <div className="flex items-center justify-center flex-col gap-[0.5rem]">
                    <div className="flex items-center gap-[8px]">
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.hours).slice(0, 1)}</p>
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.hours).slice(1, timeLeft.hours.length)}</p>
                    </div>
                    <span className="text-white font-normal text-[0.8rem] sm:text-[0.9rem]">Hours</span>
                </div>

                <span className="text-[2.3rem] text-white sm:mt-1">:</span>

                <div className="flex items-center justify-center flex-col gap-[0.5rem]">
                    <div className="flex items-center gap-[8px]">
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.minutes).slice(0, 1)}</p>
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.minutes).slice(1, timeLeft.minutes.length)}</p>
                    </div>
                    <span className="text-white font-normal text-[0.8rem] sm:text-[0.9rem]">Minutes</span>
                </div>

                <span className="text-[2.3rem] text-white sm:mt-1">:</span>

                <div className="flex items-center justify-center flex-col gap-[0.5rem]">
                    <div className="flex items-center gap-[8px]">
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.seconds).slice(0, 1)}</p>
                        <p className="bg-white sm:px-4 py-3 w-[35px] sm:w-[50px] text-center rounded-sm text-gray-900 font-normal text-[1rem] sm:text-[2rem]">{formatNumber(timeLeft.seconds).slice(1, timeLeft.seconds.length)}</p>
                    </div>
                    <span className="text-white font-normal text-[0.8rem] sm:text-[0.9rem]">Seconds</span>
                </div>

            </div>
        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='timer-style-5'
                            text={'timer style 5'}
                        />
                    </div>

                    <ComponentDescription
                        text=' A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle5Code} setPreview={setTimerStyle5Preview} preview={timerStyle5Preview}
                               setCode={setTimeStyle5Code}/>

                    <ComponentWrapper>
                        {timerStyle5Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className="flex items-end gap-[5px] p-4">
                                    <div className='flex items-end gap-[1px]'>
                                        <h4 className='text-[2.5rem] dark:text-[#abc2d3] 640px:text-[3rem] leading-[45px] 640px:leading-[50px] font-semibold text-gray-900'>{formatNumber(timeLeft.days)}</h4>
                                        <span className='text-[1.3rem] font-semibold text-orange-500'>d</span>
                                    </div>
                                    <div className='flex items-end gap-[1px]'>
                                        <h4 className='text-[2.5rem] dark:text-[#abc2d3] 640px:text-[3rem] leading-[45px] 640px:leading-[50px] font-semibold text-gray-900'>{formatNumber(timeLeft.hours)}</h4>
                                        <span className='text-[1.3rem] font-semibold text-orange-500'>h</span>
                                    </div>
                                    <div className='flex items-end gap-[1px]'>
                                        <h4 className='text-[2.5rem] dark:text-[#abc2d3] 640px:text-[3rem] leading-[45px] 640px:leading-[50px] font-semibold text-gray-900'>{formatNumber(timeLeft.minutes)}</h4>
                                        <span className='text-[1.3rem] font-semibold text-orange-500'>m</span>
                                    </div>
                                    <p className='text-[1.3rem] dark:text-[#abc2d3] font-semibold text-gray-900'>{formatNumber(timeLeft.seconds)}</p>
                                </div>
                            </div>
                        )}

                        {timerStyle5Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2025-03-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="flex items-end gap-[5px] p-4">

            <div className="flex items-end gap-[1px]">
                <h4 className="text-[2.5rem] dark:text-[#abc2d3] sm:text-[3rem] leading-[45px] sm:leading-[50px] font-semibold text-gray-900">{formatNumber(timeLeft.days)}</h4>
                <span className="text-[1.3rem] font-semibold text-orange-500">d</span>
            </div>

            <div className="flex items-end gap-[1px]">
                <h4 className="text-[2.5rem] dark:text-[#abc2d3] sm:text-[3rem] leading-[45px] sm:leading-[50px] font-semibold text-gray-900">{formatNumber(timeLeft.hours)}</h4>
                <span className="text-[1.3rem] font-semibold text-orange-500">h</span>
            </div>

            <div className="flex items-end gap-[1px]">
                <h4 className="text-[2.5rem] dark:text-[#abc2d3] sm:text-[3rem] leading-[45px] sm:leading-[50px] font-semibold text-gray-900">{formatNumber(timeLeft.minutes)}</h4>
                <span className="text-[1.3rem] font-semibold text-orange-500">m</span>
            </div>

            <p className="text-[1.3rem] dark:text-[#abc2d3] font-semibold text-gray-900">{formatNumber(timeLeft.seconds)}</p>

        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='timer-style-6'
                            text={'timer style 6'}
                        />
                    </div>

                    <ComponentDescription
                        text='A timer lets you set a specific duration, and it counts down based on that duration, notifying you when the time is up.'/>

                    <ToggleTab code={timerStyle6Code} setCode={setTimeStyle6Code} preview={timerStyle6Preview}
                               setPreview={setTimerStyle6Preview}/>

                    <ComponentWrapper>
                        {timerStyle6Preview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className="flex flex-wrap justify-center items-center space-x-6 p-4">
                                    <CircleTimer value={timeLeft2.hours} type="hours"/>
                                    <CircleTimer value={timeLeft2.minutes} type="minutes"/>
                                    <CircleTimer value={timeLeft2.seconds} type="seconds"/>
                                </div>
                            </div>
                        )}

                        {timerStyle6Code && (
                            <Showcode
                                code='
import React, {useState, useEffect} from "react";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        durations: {
            days: 365,
            hours: 24,
            minutes: 60,
            seconds: 60
        }
    });

    const targetDate = "2025-03-31T23:59:59"

    const size = 100

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                    durations: {
                        days: 365,
                        hours: 24,
                        minutes: 60,
                        seconds: 60
                    }
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const CircleTimer = ({ value, type }) => {
        const strokeWidth = 7;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const progress = (value / timeLeft.durations[type]) * 100;
        const strokeDashoffset = circumference - (progress / 100) * circumference;

        return (
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="absolute top-0 left-0" width={size} height={size}>
                    <circle
                        cx={size/2}
                        cy={size/2}
                        r={radius}
                        fill="transparent"
                        stroke="#e5e5e5"
                        className="dark:stroke-[#1e293b]"
                        strokeWidth={strokeWidth}
                    />
                </svg>

                {/* Progress Circle */}
                <svg className="absolute top-0 left-0" width={size} height={size}>
                    <circle
                        cx={size/2}
                        cy={size/2}
                        r={radius}
                        fill="transparent"
                        stroke="#17b4d3"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: "stroke-dashoffset 1s linear",
                            transform: "rotate(-90deg)",
                            transformOrigin: "50% 50%"
                        }}
                    />
                </svg>

                {/* Time Display */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="text-[1.2rem] font-semibold text-[#17b4d3]">{value}</div>
                    <div className="text-[0.6rem] text-gray-500">{type.charAt(0).toUpperCase() + type.slice(1)}</div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-wrap justify-center items-center space-x-6 p-4">
            <CircleTimer value={timeLeft.hours} type="hours"/>
            <CircleTimer value={timeLeft.minutes} type="minutes"/>
            <CircleTimer value={timeLeft.seconds} type="seconds"/>
        </div>
    );
};

export default Timer;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/marquee'
                        backName='marquee'
                        forwardName='breadcrumb'
                        forwardUrl='/components/breadcrumb'
                    />
                </div>

                <ContentNavbar contents={timerContents} activeSection={activeSection}/>

            </aside>

            <Helmet>
                <title>Navigation - Timer</title>
            </Helmet>
        </>
    );
};

export default Timer;
