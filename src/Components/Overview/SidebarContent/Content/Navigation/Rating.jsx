import React, {useState} from 'react';

// components
import Showcode from '@shared/Component/ShowCode.jsx';
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import {Helmet} from 'react-helmet';
import {FaHeart, FaStar} from 'react-icons/fa';
import {RxCross1} from 'react-icons/rx';
import utils from '@utils/index.jsx';
import {PiShareFatLight} from 'react-icons/pi';
import {GoHome} from 'react-icons/go';

// contents for scrollspy
import {ratingContents} from '@utils/ContentsConfig/NavigationContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Tabs = () => {
    const sectionIds = ratingContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // click navigation
    const [clickNavigationPreview, setClickNavigationPreview] = useState(true);
    const [clickNavigationCode, setClickNavigationCode] = useState(false);

    // hover navigation
    const [hoverNavigationPreview, setHoverNavigationPreview] = useState(true);
    const [hoverNavigationCode, setHoverNavigationCode] = useState(false);

    // rating modal
    const [ratingModalPreview, setRatingModalPreview] = useState(true);
    const [ratingModalCode, setRatingModalCode] = useState(false);

    // rating with feedback modal
    const [ratingFeedbackModalPreview, setRatingFeedbackModalPreview] =
        useState(true);
    const [ratingFeedbackModalCode, setRatingFeedbackModalCode] = useState(false);

    // rate via count
    const [rateCountPreview, setRateCountPreview] = useState(true);
    const [rateCountCode, setRateCountCode] = useState(false);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader id='click_navigation' text={'click navigation'}/>

                    <ComponentDescription text=' A rating system with clickable stars or icons, allowing users to
            select a rating by clicking and navigating through the options.'/>

                    <ToggleTab code={clickNavigationCode} setCode={setClickNavigationCode}
                               setPreview={setClickNavigationPreview} preview={clickNavigationPreview}/>

                    <ComponentWrapper>
                        {clickNavigationPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex items-center space-x-1'>
                                    {[...Array(5)].map((_, index) => {
                                        const starRating = index + 1;
                                        return (
                                            <FaStar
                                                key={starRating}
                                                className={`cursor-pointer ${
                                                    starRating <= rating
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300 dark:text-slate-700'
                                                }`}
                                                size={24}
                                                onClick={() => setRating(starRating)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {clickNavigationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";

const Rating = () => {

    const [rating, setRating] = useState(0);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <FaStar
                        key={starRating}
                        className={`cursor-pointer ${
                            starRating <= rating ? "text-yellow-400" : "text-gray-300 dark:text-slate-700"
                        }`}
                        size={24}
                        onClick={() => setRating(starRating)}
                    />
                );
            })}
        </div>
    );
};

export default Rating;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='hover_navigation' text={'hover navigation'}/>
                    </div>

                    <ComponentDescription text='A rating system with hover navigation, allowing users to preview and
            select a rating as they hover over stars or icons before clicking.'/>

                    <ToggleTab code={hoverNavigationCode} setCode={setHoverNavigationCode}
                               preview={hoverNavigationPreview} setPreview={setHoverNavigationPreview}/>

                    <ComponentWrapper>
                        {hoverNavigationPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex items-center space-x-1'>
                                    {[...Array(5)].map((_, index) => {
                                        const starRating = index + 1;
                                        return (
                                            <FaStar
                                                key={starRating}
                                                className={`cursor-pointer ${
                                                    starRating <= (hover || rating)
                                                        ? 'text-yellow-400'
                                                        : 'text-gray-300 dark:text-slate-700'
                                                }`}
                                                size={24}
                                                onClick={() => setRating(starRating)}
                                                onMouseEnter={() => setHover(starRating)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {hoverNavigationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";

const Rating = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <FaStar
                        key={starRating}
                        className={`cursor-pointer ${
                            starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300 dark:text-slate-700"
                        }`}
                        size={24}
                        onClick={() => setRating(starRating)}
                        onMouseEnter={() => setHover(starRating)}
                        onMouseLeave={() => setHover(null)}
                    />
                );
            })}
        </div>
    );
};

export default Rating;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='rating_modal' text={'rating modal'}/>
                    </div>

                    <ComponentDescription text='A modal window that allows users to submit a rating, often including
            stars or icons for rating and a form for additional feedback.'/>

                    <ToggleTab code={ratingModalCode} setCode={setRatingModalCode} setPreview={setRatingModalPreview}
                               preview={ratingModalPreview}/>

                    <ComponentWrapper>
                        {ratingModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='bg-white boxShadow dark:bg-slate-800 dark:border-slate-700 rounded-md border border-gray-200 w-full 1024px:w-[80%] p-4 text-center'>
                                    <RxCross1
                                        className='float-right py-1.5 dark:text-[#abc2d3] dark:hover:bg-slate-900 text-[1.6rem] text-[#333333] hover:bg-gray-200 rounded-full cursor-pointer'/>

                                    <h3 className='text-[24px] dark:text-[#abc2d3] font-semibold text-[#333333] mt-[40px]'>
                                        How many stars would you give to them?
                                    </h3>
                                    <p className='text-[16px] dark:text-[#abc2d3] font-[400] mt-[10px]'>
                                        Jonah Noah delivered your order from{' '}
                                        <b>Nanica Homemade Pies</b>, today at 19:47 (7 min ahead
                                        schedule).
                                    </p>

                                    <div className='flex items-center space-x-1 justify-center mt-[15px] mb-[10px]'>
                                        {[...Array(5)].map((_, index) => {
                                            const starRating = index + 1;
                                            return (
                                                <FaStar
                                                    key={starRating}
                                                    className={`cursor-pointer ${
                                                        starRating <= (hover || rating)
                                                            ? 'text-yellow-400'
                                                            : 'text-gray-300 dark:text-slate-600'
                                                    }`}
                                                    size={26}
                                                    onClick={() => setRating(starRating)}
                                                    onMouseEnter={() => setHover(starRating)}
                                                    onMouseLeave={() => setHover(null)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {ratingModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";
import {RxCross1} from "react-icons/rx";

const Rating = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <div
            className="bg-white boxShadow dark:bg-slate-800 dark:border-slate-700 rounded-md border border-gray-200 w-[80%] p-4 text-center">
            <RxCross1
                className="float-right py-1.5 text-[1.6rem] dark:text-[#abc2d3] dark:hover:bg-slate-900 text-[#333333] hover:bg-gray-200 rounded-full cursor-pointer"/>

            <h3 className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] mt-[40px]">How many stars
                would you give to them?</h3>
            <p className="text-[16px] font-[400] dark:text-[#abc2d3] mt-[10px]">
                Jonah Noah delivered your order from <b>Nanica Homemade Pies</b>, today at 19:47
                (7 min ahead schedule).
            </p>

            <div className="flex items-center space-x-1 justify-center mt-[15px] mb-[10px]">
                {[...Array(5)].map((_, index) => {
                    const starRating = index + 1;
                    return (
                        <FaStar
                            key={starRating}
                            className={`cursor-pointer ${
                                starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"
                            }`}
                            size={26}
                            onClick={() => setRating(starRating)}
                            onMouseEnter={() => setHover(starRating)}
                            onMouseLeave={() => setHover(null)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Rating;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='rating_with_feedback'
                            text={'rating with feedback'}
                        />
                    </div>

                    <ComponentDescription text='A rating system that includes a feedback section, allowing users to
            submit both a rating (e.g., stars) and written comments or
            suggestions.'/>

                    <ToggleTab code={ratingFeedbackModalCode} setCode={setRatingFeedbackModalCode}
                               preview={ratingFeedbackModalPreview} setPreview={setRatingFeedbackModalPreview}/>

                    <ComponentWrapper>
                        {ratingFeedbackModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='bg-white boxShadow rounded-md dark:bg-slate-800 dark:border-slate-700 border border-gray-200 w-full p-4 640px:p-8'>
                                    <h3 className='text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] text-center'>
                                        Session feedback
                                    </h3>
                                    <p className='text-[14px] font-[400] dark:text-[#abc2d3] text-gray-500 text-center'>
                                        Please rate your experience below
                                    </p>

                                    <div
                                        className='flex items-center 640px:flex-row flex-col 640px:space-x-12 w-full my-[20px] justify-center'>
                                        <div className='flex items-center space-x-6 justify-center mb-[10px]'>
                                            {[...Array(5)].map((_, index) => {
                                                const starRating = index + 1;
                                                return (
                                                    <FaStar
                                                        key={starRating}
                                                        className={`cursor-pointer ${
                                                            starRating <= (hover || rating)
                                                                ? 'text-yellow-400'
                                                                : 'text-gray-300 dark:text-slate-600'
                                                        }`}
                                                        size={26}
                                                        onClick={() => setRating(starRating)}
                                                        onMouseEnter={() => setHover(starRating)}
                                                        onMouseLeave={() => setHover(null)}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <span className='text-gray-500 dark:text-[#abc2d3]/80'>4/5 stars</span>
                                    </div>

                                    <label className='text-gray-500 dark:text-[#abc2d3]'>Additional feedback</label>
                                    <textarea
                                        placeholder='My feedback!!'
                                        className='w-full border-gray-400 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]'
                                    ></textarea>

                                    <button className={`${utils.buttonPrimary} w-full mt-[10px]`}>
                                        Submit feedback
                                    </button>

                                    <div className='flex items-center my-[10px]'>
                                        <div className='h-[1px] w-full bg-gray-200 dark:bg-slate-600'></div>
                                        <span className='text-gray-500 dark:text-slate-500'>or</span>
                                        <div className='h-[1px] w-full bg-gray-200 dark:bg-slate-600'></div>
                                    </div>

                                    <div
                                        className='flex 640px:flex-row flex-col items-center justify-between gap-[15px]'>
                                        <button
                                            className={`${utils.buttonSecondary} w-full flex items-center justify-center gap-[10px]`}
                                        >
                                            <GoHome className='text-[1.3rem]'/>
                                            Home
                                        </button>
                                        <button
                                            className={`${utils.buttonSecondary} w-full flex items-center justify-center gap-[10px]`}
                                        >
                                            <PiShareFatLight className='text-[1.3rem]'/>
                                            Rejoin session
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {ratingFeedbackModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaStar} from "react-icons/fa";
import {GoHome} from "react-icons/go";
import {PiShareFatLight} from "react-icons/pi";

const Rating = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    return (
        <div
            className="bg-white boxShadow dark:bg-slate-800 dark:border-slate-700 rounded-md border border-gray-200 w-full p-4 sm:p-8">

            <h3 className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] text-center">Session
                feedback</h3>
            <p className="text-[14px] font-[400] dark:text-[#abc2d3] text-gray-500 text-center">
                Please rate your experience below
            </p>

            <div
                className="flex items-center sm:flex-row flex-col sm:space-x-12 w-full my-[20px] justify-center">
                <div className="flex items-center space-x-6 justify-center mb-[10px]">
                    {[...Array(5)].map((_, index) => {
                        const starRating = index + 1;
                        return (
                            <FaStar
                                key={starRating}
                                className={`cursor-pointer ${
                                    starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"
                                }`}
                                size={26}
                                onClick={() => setRating(starRating)}
                                onMouseEnter={() => setHover(starRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        );
                    })}
                </div>
                <span className="text-gray-500 dark:text-[#abc2d3]/80">4/5 stars</span>
            </div>

            <label className="text-gray-500 dark:text-[#abc2d3]">Additional feedback</label>
            <textarea placeholder="My feedback!!"
                      className="w-full border-gray-400 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]"></textarea>

            <button className={`py-2 px-4 border border-r-blue-400 rounded-md w-full mt-[10px]`}>Submit feedback
            </button>

            <div className="flex items-center my-[10px]">
                <div className="h-[1px] w-full bg-gray-200 dark:bg-slate-600"></div>
                <span className="text-gray-500 dark:text-slate-500">or</span>
                <div className="h-[1px] w-full bg-gray-200 dark:bg-slate-600"></div>
            </div>

            <div
                className="flex sm:flex-row flex-col items-center justify-between gap-[15px]">
                <button
                    className={`py-1.5 px-4 border border-r-blue-400 rounded-md w-full flex items-center justify-center gap-[10px]`}>
                    <GoHome className="text-[1.3rem]"/>
                    Home
                </button>
                <button
                    className={`py-1.5 px-4 border border-r-blue-400 rounded-md w-full flex items-center justify-center gap-[10px]`}>
                    <PiShareFatLight className="text-[1.3rem]"/>
                    Rejoin session
                </button>
            </div>
        </div>
    );
};

export default Rating;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='rate_via_count' text={'rate via count'}/>
                    </div>

                    <ComponentDescription text='A rating system where users can select a rating based on a numerical
            count, typically using stars or icons to represent the total rating
            value.'/>

                    <ToggleTab code={rateCountCode} setPreview={setRateCountPreview} preview={rateCountPreview}
                               setCode={setRateCountCode}/>

                    <ComponentWrapper>
                        {rateCountPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='bg-white boxShadow dark:bg-slate-800 dark:border-slate-700 rounded-[30px] border border-gray-200 w-full 640px:w-[80%] p-8'>
                                    <div className='p-4 bg-blue-100 w-max dark:bg-blue-800/20 rounded-full'>
                                        <FaHeart className='text-[1.5rem] text-blue-800'/>
                                    </div>

                                    <h3 className='text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] mt-[20px]'>
                                        Hey Drop some Rating!
                                    </h3>
                                    <p className='text-[14px] font-[400] dark:text-[#abc2d3]/80 text-gray-500 mt-[10px]'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                    </p>

                                    <div
                                        className='flex 640px:flex-nowrap flex-wrap items-center 640px:gap-0 gap-[10px] 640px:justify-between mt-[25px]'>
                                        <div
                                            className='w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200'>
                                            1
                                        </div>
                                        <div
                                            className='w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200'>
                                            2
                                        </div>
                                        <div
                                            className='w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200'>
                                            3
                                        </div>
                                        <div
                                            className='w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200'>
                                            4
                                        </div>
                                        <div
                                            className='w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200'>
                                            5
                                        </div>
                                    </div>

                                    <button
                                        className={`${utils.buttonPrimary} w-full mt-[25px] rounded-full !py-3 text-[1.2rem]`}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}

                        {rateCountCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaHeart} from "react-icons/fa";

const Rating = () => {

    return (
        <div
            className="bg-white boxShadow dark:bg-slate-800 dark:border-slate-700 rounded-[30px] border border-gray-200 w-full 640px:w-[80%] p-8">

            <div className="p-4 bg-blue-100 dark:bg-blue-800/20 w-max rounded-full">
                <FaHeart className="text-[1.5rem] text-blue-800"/>
            </div>

            <h3 className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] mt-[20px]">Hey Drop some
                Rating!</h3>
            <p className="text-[14px] font-[400] dark:text-[#abc2d3] text-gray-500 mt-[10px]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>

            <div
                className="flex 640px:flex-nowrap flex-wrap items-center 640px:gap-0 gap-[10px] 640px:justify-between mt-[25px]">
                <div
                    className="w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200">
                    1
                </div>
                <div
                    className="w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200">
                    2
                </div>
                <div
                    className="w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200">
                    3
                </div>
                <div
                    className="w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200">
                    4
                </div>
                <div
                    className="w-[55px] h-[55px] dark:bg-blue-800/20 dark:text-[#abc2d3] text-[1.5rem] bg-blue-100 flex items-center justify-center rounded-full text-blue-800 hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200">
                    5
                </div>
            </div>

            <button
                className={`py-3 px-4 border border-r-blue-400 w-full mt-[25px] rounded-full text-[1.2rem]`}>Submit
            </button>

        </div>
    );
};

export default Rating;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/breadcrumb'
                        backName='breadcrumb'
                        forwardName='stepper'
                        forwardUrl='/components/stepper'
                    />
                </div>

                <ContentNavbar contents={ratingContents} activeSection={activeSection}/>

            </aside>

            <Helmet>
                <title>Navigation - Rating</title>
            </Helmet>
        </>
    );
};

export default Tabs;
