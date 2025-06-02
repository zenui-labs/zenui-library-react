import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {chipContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// icons
import {MdDone} from 'react-icons/md';
import {IoMdNotifications} from 'react-icons/io';
import {TbPointFilled} from 'react-icons/tb';
import {RxCross2} from 'react-icons/rx';
import {BiError} from 'react-icons/bi';
import {IoTime} from 'react-icons/io5';
import {FaFire} from 'react-icons/fa';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Chip = () => {
    const sectionIds = chipContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // primaryChip
    const [primaryChipPreview, setPrimaryChipPreview] = useState(true);
    const [primaryChipCode, setPrimaryChipCode] = useState(false);

    // chipVariant
    const [chipVariantPreview, setChipVariantPreview] = useState(true);
    const [chipVariantCode, setChipVariantCode] = useState(false);

    // icon chip
    const [iconChipPreview, setIconChipPreview] = useState(true);
    const [iconChipCode, setIconChipCode] = useState(false);

    // avatar chip
    const [avatarChipPreview, setAvatarChipPreview] = useState(true);
    const [avatarChipCode, setAvatarChipCode] = useState(false);

    // variant chip
    const [variantChipPreview, setVariantChipPreview] = useState(true);
    const [variantChipCode, setVariantChipCode] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'Primary Chip'} id={'primary_chip'}/>

                    <ComponentDescription text='This is a basic chip component. Use it to display concise
            information or tags in a compact form.'/>

                    <ToggleTab setCode={setPrimaryChipCode} code={primaryChipCode} preview={primaryChipPreview}
                               setPreview={setPrimaryChipPreview}/>

                    <ComponentWrapper>
                        {primaryChipPreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div
                                    className='px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[0.9rem] font-[500]'>
                                    ZenUI
                                </div>

                                <div
                                    className='px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[1.3rem] font-[500]'>
                                    ZenUI
                                </div>

                                <div
                                    className='px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[1.6rem] font-[500]'>
                                    ZenUI
                                </div>
                            </div>
                        )}

                        {primaryChipCode && (
                            <Showcode
                                code='
import React from "react";

const Chip = () => {

    return (
        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">

            {/* small */}
            <div
                className="px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[0.9rem] font-[500]">
                ZenUI
            </div>

            {/* medium */}
            <div
                className="px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[1.3rem] font-[500]">
                ZenUI
            </div>

            {/* large */}
            <div
                className="px-4 py-1 dark:bg-slate-700 dark:text-[#abc2d3] bg-[#d1d1d180] rounded-full text-[1.6rem] font-[500]">
                ZenUI
            </div>
        </div>
    );
};

export default Chip;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Chip variants'} id={'chip_variant'}/>
                    </div>

                    <ComponentDescription text='This is a chip component with multiple variants like bordered and
            background color options for versatile styling.'/>

                    <ToggleTab setCode={setChipVariantCode} code={chipVariantCode} setPreview={setChipVariantPreview}
                               preview={chipVariantPreview}/>

                    <ComponentWrapper>
                        {chipVariantPreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-start gap-5 justify-center'>
                                <div
                                    className='px-6 py-1 bg-[#3B9DF8] text-[#fff] rounded-full text-[0.9rem] font-[500]'>
                                    ZenUI
                                </div>
                                <div
                                    className='px-6 py-1 border border-[#3B9DF8] text-[#3B9DF8] rounded-full text-[0.9rem] font-[500]'>
                                    ZenUI
                                </div>
                                <div
                                    className='px-6 py-1 bg-[#e9e9e9] dark:bg-slate-700 dark:text-[#abc2d3] text-[#9c9c9c] rounded-full text-[0.9rem] font-[500]'>
                                    ZenUI
                                </div>
                            </div>
                        )}

                        {chipVariantCode && (
                            <Showcode
                                code='
import React from "react";

const Chip = () => {

    return (
        <div className="p-8 mb-4 flex flex-wrap items-start gap-5 justify-center">

            {/* bg color chip */}
            <div className="px-6 py-1 bg-[#3B9DF8] text-[#fff] rounded-full text-[0.9rem] font-[500]">
                ZenUI
            </div>

            {/* bordered chip */}
            <div className="px-6 py-1 border border-[#3B9DF8] text-[#3B9DF8] rounded-full text-[0.9rem] font-[500]">
                ZenUI
            </div>

            {/* gray bg chip */}
            <div
                className="px-6 py-1 bg-[#e9e9e9] dark:bg-slate-700 dark:text-[#abc2d3] text-[#9c9c9c] rounded-full text-[0.9rem] font-[500]">
                ZenUI
            </div>
        </div>
    );
};

export default Chip;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Icon Chip'} id={'icon_chip'}/>
                    </div>

                    <ComponentDescription text='This is a chip with icon component. Display concise information or
            tags enhanced with an icon for clarity.'/>

                    <ToggleTab setCode={setIconChipCode} code={iconChipCode} preview={iconChipPreview}
                               setPreview={setIconChipPreview}/>

                    <ComponentWrapper>
                        {iconChipPreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-start gap-5 justify-center'>
                                <div
                                    className='px-4 py-1.5 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <MdDone className='p-0.5 text-[1.1rem] rounded-full bg-[#18c964] text-[#fff]'/>
                                    ZenUI
                                </div>

                                <div
                                    className='px-4 py-1.5 bg-[#e4d4f4] dark:bg-purple-700/30 text-[#7828c8] rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <IoMdNotifications className='text-[1.3rem] text-[#7828c8]'/>
                                    ZenUI
                                </div>

                                <div
                                    className='px-4 py-1.5 border dark:border-slate-600 dark:text-[#abc2d3] border-border text-text rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <TbPointFilled className='text-[1.3rem] dark:text-[#abc2d3] text-text'/>
                                    ZenUI
                                </div>

                                <div
                                    className='px-4 py-1.5 border dark:border-slate-600 dark:text-[#abc2d3] border-border text-text rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    ZenUI
                                    <RxCross2
                                        className='text-[1.1rem] text-[#fff] rounded-full p-0.5 dark:bg-slate-700 bg-text '/>
                                </div>
                            </div>
                        )}

                        {iconChipCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdDone} from "react-icons/md";
import {IoMdNotifications} from "react-icons/io";
import {TbPointFilled} from "react-icons/tb";
import {RxCross2} from "react-icons/rx";

const Chip = () => {

    return (
        <div className="p-8 mb-4 flex flex-wrap items-start gap-5 justify-center">

            {/* done badge chip */}
            <div
                className="px-4 py-1.5 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <MdDone className="p-0.5 text-[1.1rem] rounded-full bg-[#18c964] text-[#fff]"/>
                ZenUI
            </div>

            {/* notification badge chip */}
            <div
                className="px-4 py-1.5 bg-[#e4d4f4] dark:bg-purple-700/30 text-[#7828c8] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <IoMdNotifications className="text-[1.3rem] text-[#7828c8]"/>
                ZenUI
            </div>

            {/* dot badge chip */}
            <div
                className="px-4 py-1.5 border dark:border-slate-600 dark:text-[#abc2d3] border-[#e5eaf2] text-[#424242] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <TbPointFilled className="text-[1.3rem] dark:text-[#abc2d3] text-[#424242]"/>
                ZenUI
            </div>

            {/* cross icon badge chip */}
            <div
                className="px-4 py-1.5 border dark:border-slate-600 dark:text-[#abc2d3] border-[#e5eaf2] text-[#424242] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                ZenUI
                <RxCross2 className="text-[1.1rem] text-[#fff] rounded-full p-0.5 dark:bg-slate-700 bg-[#424242] "/>
            </div>
        </div>
    );
};

export default Chip;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'avatar Chip'} id={'avatar_chip'}/>
                    </div>

                    <ComponentDescription text='This is an avatar chip component. Display user information with a
            compact avatar for a visual touch.'/>

                    <ToggleTab setCode={setAvatarChipCode} code={avatarChipCode} setPreview={setAvatarChipPreview}
                               preview={avatarChipPreview}/>

                    <ComponentWrapper>
                        {avatarChipPreview && (
                            <div className='p-8 mb-4 flex flex-wrap items-center gap-5 justify-center'>
                                <div
                                    className='pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740'
                                        className='w-[25px] h-[25px] rounded-full'
                                        alt=''
                                    />
                                    ZenUI
                                </div>

                                <div
                                    className='pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740'
                                        className='w-[35px] h-[35px] rounded-full'
                                        alt=''
                                    />
                                    ZenUI
                                </div>

                                <div
                                    className='pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2'>
                                    <img
                                        src='https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740'
                                        className='w-[45px] h-[45px] rounded-full'
                                        alt=''
                                    />
                                    ZenUI
                                </div>
                            </div>
                        )}

                        {avatarChipCode && (
                            <Showcode
                                code='
import React from "react";

const Chip = () => {

    return (
        <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">

            {/* small */}
            <div
                className="pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <img
                    src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740"
                    className="w-[25px] h-[25px] rounded-full"
                    alt=""
                />
                ZenUI
            </div>

            {/* medium */}
            <div
                className="pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <img
                    src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740"
                    className="w-[35px] h-[35px] rounded-full"
                    alt=""
                />
                ZenUI
            </div>

            {/* large */}
            <div
                className="pl-2 pr-4 py-1 dark:bg-slate-800 dark:border-slate-600 bg-[#ececec80] border border-[#d1d1d180] text-[#18c964] rounded-full text-[0.9rem] font-[500] flex items-center gap-2">
                <img
                    src="https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?t=st=1712077473~exp=1712081073~hmac=63310a81f493e9368aeb918070f9181f5f316124f4793e1499d65115fc45ef46&w=740"
                    className="w-[45px] h-[45px] rounded-full"
                    alt=""
                />
                ZenUI
            </div>
        </div>
    );
};

export default Chip;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'variant Chip'} id={'variant_chip'}/>
                    </div>

                    <ComponentDescription text='This is an avatar chip component. Display user information with a
            compact avatar for a visual touch.'/>

                    <ToggleTab setCode={setVariantChipCode} code={variantChipCode} preview={variantChipPreview}
                               setPreview={setVariantChipPreview}/>

                    <ComponentWrapper>
                        {variantChipPreview && (
                            <div className='p-8 mb-4 flex items-center flex-wrap gap-5 justify-center'>
                                <div
                                    className='px-4 py-1.5 dark:bg-orange-700/30 bg-orange-50 text-orange-400 rounded-full text-[0.9rem] font-[500] flex items-center gap-1'>
                                    <BiError className='text-[1.1rem] text-orange-400'/>
                                    Out of date
                                </div>

                                <div
                                    className='px-4 py-1.5 dark:bg-blue-600/20 bg-blue-50 text-blue-800 rounded-full text-[0.9rem] font-[500] flex items-center gap-1'>
                                    <IoTime className='text-[1.1rem] text-blue-800'/>
                                    Pending
                                </div>

                                <div
                                    className='px-4 py-1.5 dark:bg-red-700/30 bg-red-100 text-red-700 rounded-full text-[0.9rem] font-[500] flex items-center gap-1'>
                                    HOT
                                    <FaFire className='text-[1rem] text-red-700'/>
                                </div>

                                <div
                                    className='px-4 py-1.5 bg-blue-500 text-white rounded-full text-[0.9rem] font-[500]'>
                                    Trending
                                </div>
                            </div>
                        )}

                        {variantChipCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {BiError} from "react-icons/bi";
import {IoTime} from "react-icons/io5";
import {FaFire} from "react-icons/fa";

const Chip = () => {

    return (
        <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">

            {/* out of date chip */}
            <div
                className="px-4 py-1.5 dark:bg-orange-700/30 bg-orange-50 text-orange-400 rounded-full text-[0.9rem] font-[500] flex items-center gap-1">
                <BiError className="text-[1.1rem] text-orange-400"/>
                Out of date
            </div>

            {/* pending chip */}
            <div
                className="px-4 py-1.5 dark:bg-blue-600/20 bg-blue-50 text-blue-800 rounded-full text-[0.9rem] font-[500] flex items-center gap-1">
                <IoTime className="text-[1.1rem] text-blue-800"/>
                Pending
            </div>

            {/* hot chip*/}
            <div
                className="px-4 py-1.5 dark:bg-red-700/30 bg-red-100 text-red-700 rounded-full text-[0.9rem] font-[500] flex items-center gap-1">
                HOT
                <FaFire className="text-[1rem] text-red-700"/>
            </div>

            {/* trending chip */}
            <div className="px-4 py-1.5 bg-blue-500 text-white rounded-full text-[0.9rem] font-[500]">
                Trending
            </div>
        </div>
    );
};

export default Chip;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/progress-bar'
                        backName='progress bar'
                        forwardName='marquee'
                        forwardUrl='/components/marquee'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={chipContents}/>

            </aside>
            <Helmet>
                <title>Navigation - Chip</title>
            </Helmet>
        </>
    );
};

export default Chip;
