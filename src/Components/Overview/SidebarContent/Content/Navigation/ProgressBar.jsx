import React, {useState, useEffect} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {progressBarContents} from '@utils/ContentsConfig/NavigationContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';
import utils from '@utils/index.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const ProgressBar = () => {
    const sectionIds = progressBarContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // basic progress bar
    const [basicProgressBarPreview, setBasicProgressBarPreview] = useState(true);
    const [basicProgressBarCode, setBasicProgressBarCode] = useState(false);

    // progress with tooltip
    const [progressBarWithTooltipPreview, setProgressBarWithTooltipPreview] =
        useState(true);
    const [progressBarWithTooltipCode, setProgressBarWithTooltipCode] =
        useState(false);

    // counting progress bar
    const [countingPreview, setCountingPreview] = useState(true);
    const [countingCode, setCountingCode] = useState(false);

    // circle progress bar
    const [circlePreview, setCirclePreview] = useState(true);
    const [circleCode, setCircleCode] = useState(false);

    // striped animated progress bar
    const [stripedPreview, setStripedPreview] = useState(true);
    const [stripedCode, setStripedCode] = useState(false);

    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let interval;

        if (isLoading) {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    if (prevProgress >= 90) {
                        clearInterval(interval);
                        setIsLoading(false);
                        return 90;
                    }
                    return prevProgress + 1;
                });
            }, 30);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isLoading]);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader
                        text={'basic progress bar'}
                        id={'basic_progress_bar'}
                    />

                    <ComponentDescription text='A simple progress bar that visually represents the completion
            percentage of a task or process.'/>

                    <ToggleTab setPreview={setBasicProgressBarPreview} code={basicProgressBarCode}
                               setCode={setBasicProgressBarCode} preview={basicProgressBarPreview}/>

                    <ComponentWrapper>
                        {basicProgressBarPreview && (
                            <div className='p-8 mb-4 flex flex-col pt-12 flex-wrap items-center gap-5 justify-center'>
                                <div className='relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full'>
                                    <div
                                        className='absolute top-0 left-0 bg-primary h-full rounded-full'
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>

                                <button
                                    onClick={handleStartLoading}
                                    className={`${utils.buttonSecondary} text-[0.8rem] !px-2 !py-1`}
                                >
                                    Start Loading
                                </button>
                            </div>
                        )}

                        {basicProgressBarCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="relative bg-gray-200 w-[80%] h-[15px] rounded-full">
                <div className="absolute dark:bg-slate-700 top-0 left-0 bg-primary h-full rounded-full"
                     style={{width: `${progress}%`}}></div>
            </div>

            <button onClick={handleStartLoading}
                    className={`text-[0.8rem] px-2 py-1 bg-blue-500 rounded-md`}>Start Loading
            </button>
        </>
    );
};

export default ProgressBar;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'progress bar with tooltip'}
                            id={'progress_bar_with_tooltip'}
                        />
                    </div>

                    <ComponentDescription text='A progress bar that displays the completion percentage within a
            tooltip when hovered over, providing precise progress information.'/>

                    <ToggleTab setPreview={setProgressBarWithTooltipPreview} code={progressBarWithTooltipCode}
                               preview={progressBarWithTooltipPreview} setCode={setProgressBarWithTooltipCode}/>

                    <ComponentWrapper>
                        {progressBarWithTooltipPreview && (
                            <div
                                className='p-8 mb-4 mt-8 flex flex-col flex-wrap items-center gap-5 justify-center'>
                                <div className='relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full'>
                                    {progress !== 0 && (
                                        <div
                                            style={{left: `calc(${progress}% - 40px)`}}
                                            className={`left-[${progress}%] bg-primary rounded-[5px] absolute top-[-40px] text-white px-2 py-0.5 before:w-[8px] before:h-[8px] before:bg-primary before:absolute before:bottom-[-4px] before:left-[35%] before:transform before:translate-x-1/2 before:rotate-[45deg]`}
                                        >
                                            {progress}%
                                        </div>
                                    )}
                                    <div
                                        className='absolute top-0 left-0 bg-primary h-full rounded-full'
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>

                                <button
                                    onClick={handleStartLoading}
                                    className={`${utils.buttonSecondary} text-[0.8rem] !px-2 !py-1`}
                                >
                                    Start Loading
                                </button>
                            </div>
                        )}

                        {progressBarWithTooltipCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full">
                {
                    progress !== 0 && (
                        <div
                            style={{left: `calc(${progress}% - 40px)`}}
                            className={`left-[${progress}%] bg-primary rounded-[5px] absolute top-[-40px] text-white px-2 py-0.5 before:w-[8px] before:h-[8px] before:bg-primary before:absolute before:bottom-[-4px] before:left-[35%] before:transform before:translate-x-1/2 before:rotate-[45deg]`}>
                            {progress}%
                        </div>
                    )
                }
                <div className="absolute top-0 left-0 bg-primary h-full rounded-full"
                     style={{width: `${progress}%`}}></div>
            </div>

            <button onClick={handleStartLoading}
                    className={`bg-blue-500 rounded-md text-[0.8rem] px-2 py-1`}>Start Loading
            </button>
        </>
    );
};

export default ProgressBar;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'progress bar with showing percentage'}
                            id={'progress_bar_with_showing_percentage'}
                        />
                    </div>

                    <ComponentDescription text='A progress bar that visibly shows the completion percentage directly
            on the bar, giving a clear indication of progress.'/>

                    <ToggleTab setPreview={setCountingPreview} code={countingCode} setCode={setCountingCode}
                               preview={countingPreview}/>

                    <ComponentWrapper>
                        {countingPreview && (
                            <div className='p-8 mb-4 mt-8 flex flex-wrap items-start gap-5 justify-center'>
                                <div className='flex flex-col items-center justify-center w-full gap-[10px]'>
                                    <div
                                        className='relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full'>
                                        <div
                                            className='absolute top-0 left-0 bg-primary h-full rounded-full'
                                            style={{width: `${progress}%`}}
                                        ></div>
                                    </div>

                                    <p className='dark:text-gray-400'>
                                        Loading: <b>{progress}%</b>
                                    </p>
                                </div>

                                <button
                                    onClick={handleStartLoading}
                                    className={`${utils.buttonSecondary} text-[0.8rem] !px-2 !py-1`}
                                >
                                    Start Loading
                                </button>
                            </div>
                        )}

                        {countingCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-[10px]">
                <div className="relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full">
                    <div className="absolute top-0 left-0 bg-primary h-full rounded-full"
                         style={{width: `${progress}%`}}></div>
                </div>

                <p>Loading: <b>{progress}%</b></p>
            </div>

            <button onClick={handleStartLoading}
                    className={`bg-blue-500 rounded-md text-[0.8rem] px-2 py-1`}>Start Loading
            </button>
        </>
    );
};

export default ProgressBar;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'circle progress bar'}
                            id={'circle_progress_bar'}
                        />
                    </div>

                    <ComponentDescription text='A circular progress bar that displays the completion percentage in
            the center of the circle, offering a visually appealing way to track
            progress.'/>

                    <ToggleTab setPreview={setCirclePreview} code={circleCode} preview={circlePreview}
                               setCode={setCircleCode}/>

                    <ComponentWrapper>
                        {circlePreview && (
                            <div className='p-8 mb-4 mt-8 flex flex-col items-start gap-5 justify-center'>
                                <div className='relative w-[150px] h-[150px] mx-auto'>
                                    <svg className='w-full h-full' viewBox='0 0 100 100'>
                                        <circle
                                            cx='50'
                                            cy='50'
                                            r='45'
                                            className='text-gray-200'
                                            strokeWidth='10'
                                            fill='none'
                                        />

                                        <circle
                                            cx='50'
                                            cy='50'
                                            r='45'
                                            className='dark:stroke-[#334155]'
                                            stroke='#e2e2e2'
                                            strokeWidth='10'
                                            fill='none'
                                            strokeDasharray='282.6'
                                            strokeDashoffset={0}
                                            strokeLinecap='round'
                                            transform='rotate(-90 50 50)'
                                        />

                                        <circle
                                            cx='50'
                                            cy='50'
                                            r='45'
                                            className='text-gray-200'
                                            strokeWidth='10'
                                            fill='none'
                                        />

                                        <circle
                                            cx='50'
                                            cy='50'
                                            r='45'
                                            stroke='#3B9DF8'
                                            strokeWidth='10'
                                            fill='none'
                                            strokeDasharray='282.6'
                                            strokeDashoffset={(1 - progress / 100) * 282.6}
                                            strokeLinecap='round'
                                            transform='rotate(-90 50 50)'
                                        />
                                    </svg>

                                    <p className='absolute top-[35%] left-[30%] translate-x-1/2 transform translate-y-1/2 dark:text-gray-400'>
                                        {progress}%
                                    </p>
                                </div>

                                <button
                                    onClick={handleStartLoading}
                                    className={`${utils.buttonSecondary} text-[0.8rem] !px-2 !py-1 mx-auto`}
                                >
                                    Start Loading
                                </button>
                            </div>
                        )}

                        {circleCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="relative w-[150px] h-[150px] mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="text-gray-200"
                        strokeWidth="10"
                        fill="none"
                    />

                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="dark:stroke-[#334155]"
                        stroke="#e2e2e2"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="282.6"
                        strokeDashoffset={0}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />

                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        className="text-gray-200"
                        strokeWidth="10"
                        fill="none"
                    />

                    <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="#3B9DF8"
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray="282.6"
                        strokeDashoffset={(1 - progress / 100) * 282.6}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </svg>

                <p className="absolute top-[35%] left-[30%] translate-x-1/2 transform translate-y-1/2">{progress}%</p>
            </div>

            <button onClick={handleStartLoading}
                    className={`bg-blue-500 rounded-md text-[0.8rem] px-2 py-1 mx-auto`}>Start Loading
            </button>
        </>
    );
};

export default ProgressBar;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'striped animated progress bar'}
                            id={'striped_animated_progress_bar'}
                        />
                    </div>

                    <ComponentDescription text='A progress bar with animated diagonal stripes that move across the bar,
            providing a dynamic visual indication of ongoing progress.'/>

                    <ToggleTab setPreview={setStripedPreview} code={stripedCode} preview={stripedPreview}
                               setCode={setStripedCode}/>

                    <ComponentWrapper>
                        {stripedPreview && (
                            <div className='p-8 mb-4 flex flex-col pt-12 flex-wrap items-center gap-5 justify-center'>
                                <div className='relative dark:bg-slate-700 bg-gray-200 w-[80%] h-[15px] rounded-full overflow-hidden'>
                                    <div
                                        className='absolute top-0 left-0 bg-primary h-full rounded-full transition-all duration-300'
                                        style={{
                                            width: `${progress}%`,
                                            backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)',
                                            backgroundSize: '30px 30px',
                                            animation: progress > 0 ? 'progress-stripes 1s linear infinite' : 'none'
                                        }}
                                    ></div>
                                </div>

                                <button
                                    onClick={handleStartLoading}
                                    className={`${utils.buttonSecondary} text-[0.8rem] !px-2 !py-1`}
                                >
                                    Start Loading
                                </button>

                                <style>{`
                                    @keyframes progress-stripes {
                                        0% {
                                            background-position: 0 0;
                                        }
                                        100% {
                                            background-position: 30px 0;
                                        }
                                    }
                                `}</style>
                            </div>
                        )}

                        {stripedCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleStartLoading = () => {
        if (isLoading) {
            setProgress(0);
            setIsLoading(false);
        }

        setProgress(0);
        setIsLoading(true);
    };

    return (
        <>
            <div className="relative bg-gray-200 dark:bg-slate-700 w-[80%] h-[15px] rounded-full overflow-hidden">
                <div 
                    className="absolute top-0 left-0 bg-primary h-full rounded-full transition-all duration-300"
                    style={{
                        width: `${progress}%`,
                        backgroundImage: "linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.2) 75%, transparent 75%, transparent)",
                        backgroundSize: "30px 30px",
                        animation: progress > 0 ? "progress-stripes 1s linear infinite" : "none"
                    }}
                ></div>
            </div>

            <button onClick={handleStartLoading}
                    className={`text-[0.8rem] px-2 py-1 bg-blue-500 rounded-md`}>Start Loading
            </button>

            <style>{`
                @keyframes progress-stripes {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 30px 0;
                    }
                }
            `}</style>
        </>
    );
};

export default ProgressBar;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/pagination'
                        backName='pagination'
                        forwardName='chip'
                        forwardUrl='/components/chip'
                    />
                </div>

                <ContentNavbar contents={progressBarContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Navigation - Progress Bar</title>
            </Helmet>
        </>
    );
};

export default ProgressBar;
