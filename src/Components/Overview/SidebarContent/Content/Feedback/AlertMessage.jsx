import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";

// contents for scrollspy
import {alertMessageContents} from '@utils/ContentsConfig/FeedbackContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from "react-helmet";

// icons
import {
    IoCheckmarkDoneCircleOutline,
    IoWarningOutline,
} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";
import {HiOutlineXMark} from "react-icons/hi2";

// showing the code
import Showcode from "@shared/Component/ShowCode.jsx";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const AlertMessage = () => {
    const sectionIds = alertMessageContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // backgroundPreview
    const [backgroundPreview, setBackgroundPreview] = useState(true);
    const [backgroundCode, setBackgroundCode] = useState(false);

    // alertWithTitlePreview
    const [alertWithTitlePreview, setAlertWithTitlePreview] = useState(true);
    const [alertWithTitleCode, setAlertWithTitleCode] = useState(false);

    // borderPreview
    const [borderPreview, setBorderPreview] = useState(true);
    const [borderCode, setBorderCode] = useState(false);

    // product details skeleton
    const [alertActionPreview, setAlertActionPreview] = useState(true);
    const [alertActionCode, setAlertActionCode] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader
                        text={'alert message with background'}
                        id={'alert_message_with_background'}
                    />

                    <ComponentDescription text='This is an alert message with background colors matched to different
            error types for clear visibility.'/>

                    <ToggleTab code={backgroundCode} setPreview={setBackgroundPreview} setCode={setBackgroundCode}
                               preview={backgroundPreview}/>

                    <ComponentWrapper>
                        {backgroundPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div className='w-full h-full flex flex-col gap-4'>
                                    <div
                                        className=' p-3 flex items-center gap-3 dark:bg-green-800/40 bg-[#edf7ed] rounded'>
                                        <IoCheckmarkDoneCircleOutline
                                            className='text-[#418944] dark:text-green-500 text-[1.5rem]'/>
                                        <p className='text-[#418944] text-[1rem] dark:text-green-500'>
                                            This is a success Alert.
                                        </p>
                                    </div>

                                    <div
                                        className='p-3 flex items-center gap-3 dark:bg-blue-800/40 bg-[#e5f6fd] rounded'>
                                        <MdOutlineInfo className='text-[#2d9dda] text-[1.5rem] dark:text-blue-500'/>
                                        <p className='text-[#2d9dda] text-[1rem] dark:text-blue-500'>
                                            This is a info Alert.
                                        </p>
                                    </div>

                                    <div
                                        className='p-3 flex items-center gap-3 dark:bg-red-800/40 bg-[#fdeded] rounded'>
                                        <MdErrorOutline className='text-[#d74242] text-[1.5rem] dark:text-red-500'/>
                                        <p className='text-[#d74242] text-[1rem] dark:text-red-500'>
                                            This is a error Alert.
                                        </p>
                                    </div>

                                    <div
                                        className='p-3  flex items-center gap-3 dark:bg-orange-800/40 bg-[#fff4e5] rounded'>
                                        <IoWarningOutline
                                            className='text-[#f18831] text-[1.5rem] dark:text-orange-500'/>
                                        <p className='text-[#f18831] text-[1rem] dark:text-orange-500'>
                                            This is a warning Alert.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {backgroundCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";

const AlertMessage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className=" p-3 flex items-center gap-3 dark:bg-green-800/40 bg-[#edf7ed] rounded">
                <IoCheckmarkDoneCircleOutline className="text-[#418944] dark:text-green-500 text-[1.5rem]"/>
                <p className="text-[#418944] text-[1rem] dark:text-green-500">
                    This is a success Alert.
                </p>
            </div>

            <div className="p-3 flex items-center gap-3 dark:bg-blue-800/40 bg-[#e5f6fd] rounded">
                <MdOutlineInfo className="text-[#2d9dda] text-[1.5rem] dark:text-blue-500"/>
                <p className="text-[#2d9dda] text-[1rem] dark:text-blue-500">
                    This is a info Alert.
                </p>
            </div>

            <div className="p-3 flex items-center gap-3 dark:bg-red-800/40 bg-[#fdeded] rounded">
                <MdErrorOutline className="text-[#d74242] text-[1.5rem] dark:text-red-500"/>
                <p className="text-[#d74242] text-[1rem] dark:text-red-500">
                    This is a error Alert.
                </p>
            </div>

            <div className="p-3 flex items-center gap-3 dark:bg-orange-800/40 bg-[#fff4e5] rounded">
                <IoWarningOutline className="text-[#f18831] text-[1.5rem] dark:text-orange-500"/>
                <p className="text-[#f18831] text-[1rem] dark:text-orange-500">
                    This is a warning Alert.
                </p>
            </div>
        </div>
    );
};

export default AlertMessage;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'alert message with title'}
                            id={'alert_message_with_title'}
                        />
                    </div>

                    <ComponentDescription text='This is an alert message with a title and background colors matched
            to different error types for clear identification.'/>

                    <ToggleTab code={alertWithTitleCode} preview={alertWithTitlePreview} setCode={setAlertWithTitleCode}
                               setPreview={setAlertWithTitlePreview}/>

                    <ComponentWrapper>
                        {alertWithTitlePreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full h-full flex flex-col gap-4'>
                                    <div className=' p-3 flex gap-3 dark:bg-green-800/40 bg-[#edf7ed] rounded'>
                                        <IoCheckmarkDoneCircleOutline
                                            className='text-[#418944] text-[1.5rem] dark:text-green-600'/>
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-[#418944] text-[1.2rem] font-[500] dark:text-green-600'>
                                                Message Title
                                            </h2>
                                            <p className='text-[#418944] text-[1rem] dark:text-green-600'>
                                                This is a success Alert.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='p-3 flex gap-3 dark:bg-blue-800/40 bg-[#e5f6fd] rounded'>
                                        <MdOutlineInfo className='text-[#2d9dda] text-[1.5rem] dark:text-blue-500'/>
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-[#2d9dda] text-[1.2rem] font-[500] dark:text-blue-500'>
                                                Message Title
                                            </h2>
                                            <p className='text-[#2d9dda] text-[1rem] dark:text-blue-500'>
                                                This is a info Alert.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='p-3 flex gap-3 dark:bg-red-800/40 bg-[#fdeded] rounded'>
                                        <MdErrorOutline className='text-[#d74242] text-[1.5rem] dark:text-red-500'/>
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-[#d74242] text-[1.2rem] font-[500] dark:text-red-500'>
                                                Message Title
                                            </h2>
                                            <p className='text-[#d74242] text-[1rem] dark:text-red-500'>
                                                This is a error Alert.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='p-3  flex gap-3 dark:bg-orange-800/40 bg-[#fff4e5] rounded'>
                                        <IoWarningOutline
                                            className='text-[#f18831] text-[1.5rem] dark:text-orange-500'/>
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-[#f18831] text-[1.2rem] font-[500] dark:text-orange-500'>
                                                Message Title
                                            </h2>
                                            <p className='text-[#f18831] text-[1rem] dark:text-orange-500'>
                                                This is a warning Alert.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {alertWithTitleCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";

const AlertMessage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className=" p-3 flex gap-3 dark:bg-green-800/40 bg-[#edf7ed] rounded">
                <IoCheckmarkDoneCircleOutline className="text-[#418944] text-[1.5rem] dark:text-green-600"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#418944] text-[1.2rem] font-[500] dark:text-green-600">
                        Message Title
                    </h2>
                    <p className="text-[#418944] text-[1rem] dark:text-green-600">
                        This is a success Alert.
                    </p>
                </div>
            </div>

            <div className="p-3 flex gap-3 dark:bg-blue-800/40 bg-[#e5f6fd] rounded">
                <MdOutlineInfo className="text-[#2d9dda] text-[1.5rem] dark:text-blue-500"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#2d9dda] text-[1.2rem] font-[500] dark:text-blue-500">
                        Message Title
                    </h2>
                    <p className="text-[#2d9dda] text-[1rem] dark:text-blue-500">
                        This is a info Alert.
                    </p>
                </div>
            </div>

            <div className="p-3 flex gap-3 dark:bg-red-800/40 bg-[#fdeded] rounded">
                <MdErrorOutline className="text-[#d74242] text-[1.5rem] dark:text-red-500"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#d74242] text-[1.2rem] font-[500] dark:text-red-500">
                        Message Title
                    </h2>
                    <p className="text-[#d74242] text-[1rem] dark:text-red-500">
                        This is a error Alert.
                    </p>
                </div>
            </div>

            <div className="p-3  flex gap-3 dark:bg-orange-800/40 bg-[#fff4e5] rounded">
                <IoWarningOutline className="text-[#f18831] text-[1.5rem] dark:text-orange-500"/>
                <div className="flex flex-col gap-1">
                    <h2 className="text-[#f18831] text-[1.2rem] font-[500] dark:text-orange-500">
                        Message Title
                    </h2>
                    <p className="text-[#f18831] text-[1rem] dark:text-orange-500">
                        This is a warning Alert.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlertMessage;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'alert message with border'}
                            id={'alert_message_with_border'}
                        />
                    </div>

                    <ComponentDescription text='This is an alert message with a title and border colors matched to
            different error types for clear identification.'/>

                    <ToggleTab code={borderCode} setPreview={setBorderPreview} setCode={setBorderCode}
                               preview={borderPreview}/>

                    <ComponentWrapper>
                        {borderPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full h-full flex flex-col gap-4'>
                                    <div className=' p-3 flex items-center gap-3 border-[2px] border-[#418944] rounded'>
                                        <IoCheckmarkDoneCircleOutline className='text-[#418944] text-[1.5rem]'/>
                                        <p className='text-[#418944] text-[1rem]'>
                                            This is a success Alert.
                                        </p>
                                    </div>

                                    <div className='p-3 flex items-center gap-3 border-[2px] border-[#2d9dda] rounded'>
                                        <MdOutlineInfo className='text-[#2d9dda] text-[1.5rem]'/>
                                        <p className='text-[#2d9dda] text-[1rem]'>
                                            This is a info Alert.
                                        </p>
                                    </div>

                                    <div className='p-3 flex items-center gap-3 border-[2px] border-[#d74242] rounded'>
                                        <MdErrorOutline className='text-[#d74242] text-[1.5rem]'/>
                                        <p className='text-[#d74242] text-[1rem]'>
                                            This is a error Alert.
                                        </p>
                                    </div>

                                    <div className='p-3  flex items-center gap-3 border-[2px] border-[#f18831] rounded'>
                                        <IoWarningOutline className='text-[#f18831] text-[1.5rem]'/>
                                        <p className='text-[#f18831] text-[1rem]'>
                                            This is a warning Alert.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {borderCode && (
                            <Showcode
                                code='
import React from "react";

// icons
import {
  IoCheckmarkDoneCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { MdErrorOutline, MdOutlineInfo } from "react-icons/md";

const AlertMessageWithBorder = () => {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      // Success Alert
      <div className=" p-3 flex items-center gap-3 border-[2px] border-[#418944] rounded">
        <IoCheckmarkDoneCircleOutline className="text-[#418944] text-[1.5rem]" />
        <p className="text-[#418944] text-[1rem]">This is a success Alert.</p>
      </div>

      // Info Alert
      <div className="p-3 flex items-center gap-3 border-[2px] border-[#2d9dda] rounded">
        <MdOutlineInfo className="text-[#2d9dda] text-[1.5rem]" />
        <p className="text-[#2d9dda] text-[1rem]">This is a info Alert.</p>
      </div>

      // Error Alert
      <div className="p-3 flex items-center gap-3 border-[2px] border-[#d74242] rounded">
        <MdErrorOutline className="text-[#d74242] text-[1.5rem]" />
        <p className="text-[#d74242] text-[1rem]">This is a error Alert.</p>
      </div>

      // Warning Alert
      <div className="p-3  flex items-center gap-3 border-[2px] border-[#f18831] rounded">
        <IoWarningOutline className="text-[#f18831] text-[1.5rem]" />
        <p className="text-[#f18831] text-[1rem]">This is a warning Alert.</p>
      </div>
    </div>
  );
};

export default AlertMessageWithBorder;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'message take action'}
                            id={'message_take_action'}
                        />
                    </div>

                    <ComponentDescription text='This is an alert message with a title, border colors for error
            types, and a cross icon for dismissal.'/>

                    <ToggleTab code={alertActionCode} preview={alertActionPreview} setPreview={setAlertActionPreview}
                               setCode={setAlertActionCode}/>

                    <ComponentWrapper>
                        {alertActionPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full h-full flex flex-col gap-4'>
                                    <div
                                        className=' p-3 flex items-center justify-between dark:bg-green-800/40 bg-[#edf7ed] rounded'>
                                        <div className='flex items-center gap-3'>
                                            <IoCheckmarkDoneCircleOutline
                                                className='text-[#418944] text-[1.5rem] dark:text-green-500'/>
                                            <p className='text-[#418944] text-[1rem] dark:text-green-500'>
                                                This is a success Alert.
                                            </p>
                                        </div>
                                        <HiOutlineXMark
                                            className='text-[#418944] dark:text-green-500 text-[1.8rem] p-1 rounded-full hover:bg-[#41894317] cursor-pointer active:scale-[0.9]'/>
                                    </div>

                                    <div
                                        className='p-3 flex items-center justify-between dark:bg-blue-800/40 bg-[#e5f6fd] rounded'>
                                        <div className='flex items-center gap-3'>
                                            <MdOutlineInfo className='text-[#2d9dda] text-[1.5rem] dark:text-blue-500'/>
                                            <p className='text-[#2d9dda] text-[1rem] dark:text-blue-500'>
                                                This is a info Alert.
                                            </p>
                                        </div>
                                        <HiOutlineXMark
                                            className='text-[#2d9dda] dark:text-blue-500 text-[1.8rem] p-1 rounded-full hover:bg-[#2d9dda15] cursor-pointer active:scale-[0.9]'/>
                                    </div>

                                    <div
                                        className='p-3 flex items-center justify-between dark:bg-red-800/40 bg-[#fdeded] rounded'>
                                        <div className='flex items-center gap-3'>
                                            <MdErrorOutline className='text-[#d74242] text-[1.5rem] dark:text-red-500'/>
                                            <p className='text-[#d74242] text-[1rem] dark:text-red-500'>
                                                This is a error Alert.
                                            </p>
                                        </div>
                                        <HiOutlineXMark
                                            className='text-[#d74242] dark:text-red-500 text-[1.8rem] p-1 rounded-full hover:bg-[#d7424215] cursor-pointer active:scale-[0.9]'/>
                                    </div>

                                    <div
                                        className='p-3  flex items-center justify-between dark:bg-orange-800/40 bg-[#fff4e5] rounded'>
                                        <div className='flex items-center gap-3'>
                                            <IoWarningOutline
                                                className='text-[#f18831] text-[1.5rem] dark:text-orange-500'/>
                                            <p className='text-[#f18831] text-[1rem] dark:text-orange-500'>
                                                This is a warning Alert.
                                            </p>
                                        </div>
                                        <HiOutlineXMark
                                            className='text-[#f18831] dark:text-orange-500 text-[1.8rem] p-1 rounded-full hover:bg-[#f1873118] cursor-pointer active:scale-[0.9]'/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {alertActionCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {IoCheckmarkDoneCircleOutline, IoWarningOutline} from "react-icons/io5";
import {MdErrorOutline, MdOutlineInfo} from "react-icons/md";
import {HiOutlineXMark} from "react-icons/hi2";

const AlertMessage = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className=" p-3 flex items-center justify-between dark:bg-green-800/40 bg-[#edf7ed] rounded">
                <div className="flex items-center gap-3">
                    <IoCheckmarkDoneCircleOutline className="text-[#418944] text-[1.5rem] dark:text-green-500"/>
                    <p className="text-[#418944] text-[1rem] dark:text-green-500">
                        This is a success Alert.
                    </p>
                </div>
                <HiOutlineXMark
                    className="text-[#418944] dark:text-green-500 text-[1.8rem] p-1 rounded-full hover:bg-[#41894317] cursor-pointer active:scale-[0.9]"/>
            </div>

            <div className="p-3 flex items-center justify-between dark:bg-blue-800/40 bg-[#e5f6fd] rounded">
                <div className="flex items-center gap-3">
                    <MdOutlineInfo className="text-[#2d9dda] text-[1.5rem] dark:text-blue-500"/>
                    <p className="text-[#2d9dda] text-[1rem] dark:text-blue-500">
                        This is a info Alert.
                    </p>
                </div>
                <HiOutlineXMark
                    className="text-[#2d9dda] dark:text-blue-500 text-[1.8rem] p-1 rounded-full hover:bg-[#2d9dda15] cursor-pointer active:scale-[0.9]"/>
            </div>

            <div className="p-3 flex items-center justify-between dark:bg-red-800/40 bg-[#fdeded] rounded">
                <div className="flex items-center gap-3">
                    <MdErrorOutline className="text-[#d74242] text-[1.5rem] dark:text-red-500"/>
                    <p className="text-[#d74242] text-[1rem] dark:text-red-500">
                        This is a error Alert.
                    </p>
                </div>
                <HiOutlineXMark
                    className="text-[#d74242] dark:text-red-500 text-[1.8rem] p-1 rounded-full hover:bg-[#d7424215] cursor-pointer active:scale-[0.9]"/>
            </div>

            <div className="p-3  flex items-center justify-between dark:bg-orange-800/40 bg-[#fff4e5] rounded">
                <div className="flex items-center gap-3">
                    <IoWarningOutline className="text-[#f18831] text-[1.5rem] dark:text-orange-500"/>
                    <p className="text-[#f18831] text-[1rem] dark:text-orange-500">
                        This is a warning Alert.
                    </p>
                </div>
                <HiOutlineXMark
                    className="text-[#f18831] dark:text-orange-500 text-[1.8rem] p-1 rounded-full hover:bg-[#f1873118] cursor-pointer active:scale-[0.9]"/>
            </div>
        </div>
    );
};

export default AlertMessage;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/tree-dropdown'
                        backName='tree dropdown'
                        forwardName='dialog'
                        forwardUrl='/components/dialog-message'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={alertMessageContents}/>

            </aside>
            <Helmet>
                <title>Feedback - Alert Message</title>
            </Helmet>
        </>
    );
};

export default AlertMessage;
