import React, {useState, useEffect} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";

// contents for scrollspy
import {notificationContents} from '@utils/ContentsConfig/FeedbackContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {RxCross1} from "react-icons/rx";
import {BiError} from "react-icons/bi";
import {MdOutlineDone} from "react-icons/md";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";

const Notification = () => {
    const sectionIds = notificationContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // borderNotification
    const [borderNotificationPreview, setBorderNotificationPreview] =
        useState(true);
    const [borderNotificationCode, setBorderNotificationCode] = useState(false);

    // iconNotification
    const [iconNotificationPreview, setIconNotificationPreview] = useState(true);
    const [iconNotificationCode, setIconNotificationCode] = useState(false);

    // customPosition
    const [customPositionPreview, setCustomPositionPreview] = useState(true);
    const [customPositionCode, setCustomPositionCode] = useState(false);

    // Push notification
    const [pushNotificationPreview, setPushNotificationPreview] = useState(true);
    const [pushNotificationCode, setPushNotificationCode] = useState(false);

    // progressive notification
    const [progressNotificationPreview, setProgressNotificationPreview] = useState(true);
    const [progressNotificationCode, setProgressNotificationCode] = useState(false);

    // click for show notification
    const [isClicked, setIsClicked] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isWarning, setIsWarning] = useState(false);
    const [isInfo, setIsInfo] = useState(false);
    const [isError, setIsError] = useState(false);
    const [autoClose, setAutoClose] = useState(false)
    const [closeWithIcon, setCloseWithIcon] = useState(false)

    const handleAutoClose = () => {
        setAutoClose(true)
        setTimeout(() => {
            setAutoClose(false)
        }, 3000)
    }

    const handleCloseWithIcon = () => {
        setAutoClose(false)
        setCloseWithIcon(true)
    }

    // customize postioning
    const [top, setTop] = useState(false);
    const [left, setLeft] = useState(false);
    const [right, setRight] = useState(false);
    const [bottom, setBottom] = useState(false);

    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        let interval;

        if (visible) {
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress <= 0) {
                        setVisible(false);
                        clearInterval(interval);
                        setTimeout(() => {
                            setProgress(100)
                        }, 500)
                    }
                    return prevProgress - 1;
                });
            }, 20);
        }

        return () => {
            clearInterval(interval);
        };
    }, [visible]);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>

                    <WarningMessageCard text="When you use the notification message from here in your project,
              be sure to note a few things like 'z-index', 'position', 'onClick
                                handler' etc. Because we're giving you the structure here, your
              job is to associate the notification with where you want to use
              it."/>

                    <ContentHeader
                        text={'progressive notification'}
                        id={'progressive_notification'}
                    />

                    <ComponentDescription text='A notification with an integrated progress bar, displaying the
            ongoing status of a task or process directly within the
            notification.'/>

                    <ToggleTab code={progressNotificationCode} setCode={setProgressNotificationCode}
                               preview={progressNotificationPreview} setPreview={setProgressNotificationPreview}/>

                    <ComponentWrapper>
                        {progressNotificationPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center '>
                                <button
                                    className='px-4 py-2 bg-primary text-secondary rounded'
                                    onClick={() => setVisible(true)}
                                >
                                    Show Notification
                                </button>

                                <div
                                    className={` ${
                                        visible ? 'translate-y-0' : 'translate-y-[100px]'
                                    } transition-all duration-300 rounded-md bg-white fixed bottom-[20px] left-[20px] z-[20000000000000] text-text dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 notificationShadow flex items-start justify-between px-5 py-4 gap-[10px]`}
                                >
                                    <div className='flex items-start gap-[10px]'>
                                        <MdOutlineDone
                                            className='text-green-500 text-[1.3rem] mt-0.5 border border-green-500 rounded-full p-0.5'/>
                                        <div>
                                            <h3 className='text-[1rem] dark:text-[#abc2d3] font-[600]'>
                                                ZenUI Push Notification
                                            </h3>
                                            <p className='text-[0.8rem] dark:text-slate-400'>show your notification!</p>
                                        </div>
                                    </div>

                                    <div
                                        className='absolute bottom-0 left-0 h-[3px] bg-green-500 rounded'
                                        style={{width: `${progress}%`}}
                                    ></div>
                                </div>
                            </div>
                        )}

                        {progressNotificationCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {MdOutlineDone} from "react-icons/md";

const Notification = () => {

    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        let interval;

        if(visible) {
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress <= 0) {
                        setVisible(false);
                        clearInterval(interval);
                        setTimeout(()=> {
                            setProgress(100)
                        }, 500)
                    }
                    return prevProgress - 1;
                });
            }, 20);
        }

        return () => {
            clearInterval(interval);
        };
    }, [visible]);

    return (
        <>
            <button
                className="px-4 py-2 bg-[#3B9DF8] text-white rounded"
                onClick={() => setVisible(true)}
            >
                Show Notification
            </button>

            <div
                className={` ${visible ? "translate-y-0" : "translate-y-[100px]"} transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-50 text-text notificationShadow flex items-start justify-between px-5 py-4 dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 gap-[10px]`}>

                <div className="flex items-start gap-[10px]">
                    <MdOutlineDone
                        className="text-green-500 text-[1.3rem] mt-0.5 border border-green-500 rounded-full p-0.5"/>
                    <div>
                        <h3 className="text-[1rem] dark:text-[#abc2d3] font-[600]">
                            ZenUI Push Notification
                        </h3>
                        <p className="text-[0.8rem] dark:text-slate-400">show your notification!</p>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[3px] bg-green-500 rounded"
                     style={{width: `${progress}%`}}></div>
            </div>
        </>
    );
};

export default Notification;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'border notification'}
                            id={'border_notification'}
                        />
                    </div>

                    <ComponentDescription text='This is a border notification component. Highlight important
            messages with distinct border styling for visibility.'/>

                    <ToggleTab code={borderNotificationCode} setPreview={setBorderNotificationPreview}
                               preview={borderNotificationPreview} setCode={setBorderNotificationCode}/>

                    <ComponentWrapper>
                        {borderNotificationPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center '>
                                <div className='w-full overflow-hidden relative text-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded mt-24'
                                        onClick={() => setIsClicked(true)}
                                    >
                                        Click me
                                    </button>
                                    <div
                                        className={`${
                                            isClicked ? 'translate-x-[0px]' : ' translate-x-[600px]'
                                        } transition-all duration-300 py-2 px-6 dark:text-[#abc2d3] border border-primary rounded text-center cursor-pointer absolute top-5 right-5`}
                                        onClick={() => setIsClicked(false)}
                                    >
                                        Click me again for closing
                                    </div>
                                </div>
                            </div>
                        )}

                        {borderNotificationCode && (
                            <Showcode
                                code='
import React from "react";

const Notification = () => {
  return (
    <>
      <div
        className={`${
          isClicked ? "translate-x-[0px]":"translate-x-[600px]"
        }  transition-all duration-300 py-2 px-6 border border-[#3B9DF8] dark:text-[#abc2d3] rounded text-center cursor-pointer absolute top-5 right-5`}
        onClick={() => setIsClicked(false)}>
        Click me again for closing
      </div>
    </>
  );
};

export default Notification;
            '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'cross icon notification'}
                            id={'cross_icon_notification'}
                        />
                    </div>

                    <ComponentDescription text='This is a notification with a close icon for easy dismissal on user
            interaction.'/>

                    <ToggleTab code={iconNotificationCode} setCode={setIconNotificationCode}
                               preview={iconNotificationPreview} setPreview={setIconNotificationPreview}/>

                    <ComponentWrapper>
                        {iconNotificationPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center '>
                                <div className='overflow-hidden relative w-full text-center'>
                                    <div
                                        className='flex items-center flex-wrap gap-3 w-full justify-center mt-24 1024px:mt-0'>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded 1024px:mt-24'
                                            onClick={() => setIsError(true)}
                                        >
                                            Error
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded 1024px:mt-24'
                                            onClick={() => setIsInfo(true)}
                                        >
                                            Info
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded 1024px:mt-24'
                                            onClick={() => setIsWarning(true)}
                                        >
                                            Warning
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded 1024px:mt-24'
                                            onClick={() => setIsSuccess(true)}
                                        >
                                            Success
                                        </button>
                                    </div>
                                    <div
                                        className={`${
                                            isInfo ? 'translate-x-[0px]' : ' translate-x-[600px]'
                                        } transition-all duration-300 py-2 px-6 border-[#418944] text-[#418944] border rounded text-center absolute top-5 right-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#418944] text-[1rem] cursor-pointer'
                                            onClick={() => setIsInfo(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            isSuccess ? 'translate-x-[0px]' : ' translate-x-[600px]'
                                        } transition-all duration-300 py-2 px-6  rounded text-center border border-[#2d9dda] text-[#2d9dda] absolute top-5 right-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#2d9dda] text-[1rem] cursor-pointer'
                                            onClick={() => setIsSuccess(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            isError ? 'translate-x-[0px]' : 'translate-x-[600px]'
                                        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#d74242] text-[#d74242] absolute top-5 right-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#ca3434] text-[1rem] cursor-pointer'
                                            onClick={() => setIsError(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            isWarning ? 'translate-x-[0px]' : 'translate-x-[600px]'
                                        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#f18831] text-[#f18831] absolute top-5 right-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#f18831] text-[1rem] cursor-pointer'
                                            onClick={() => setIsWarning(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {iconNotificationCode && (
                            <Showcode
                                code='
import React from "react";

const Notification = () => {
  return (
    <>
      {/* info notification */}
      <div
        className={`${
          isInfo ? "translate-x-[0px]":"translate-x-[600px]"
        }  transition-all duration-300 py-2 px-6 border-[#418944] text-[#418944] border rounded text-center absolute top-5 right-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#418944] text-[1rem] cursor-pointer"
          onClick={() => setIsInfo(false)}
        />
      </div>

      {/* success notification */}
      <div
        className={`${
          isSuccess ? "translate-x-[0px]":"translate-x-[600px]"
        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#2d9dda] text-[#2d9dda] absolute top-5 right-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#2d9dda] text-[1rem] cursor-pointer"
          onClick={() => setIsSuccess(false)}
        />
      </div>

      {/* error notification */}
      <div
        className={`${
          isError && "translate-x-[0px]":"translate-x-[600px] "
        } transition-all duration-300 py-2 px-6  rounded text-center border border-[#d74242] text-[#d74242] absolute top-5 right-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#ca3434] text-[1rem] cursor-pointer"
          onClick={() => setIsError(false)}
        />
      </div>

      {/* warning notification */}
      <div
        className={`${
          isWarning ? "translate-x-[0px]":" translate-x-[600px
        } transition-all duration-300 py-2 px-6  rounded text-center border border-[#f18831] text-[#f18831] absolute top-5 right-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#f18831] text-[1rem] cursor-pointer"
          onClick={() => setIsWarning(false)}
        />
      </div>
    </>
  );
};

export default Notification;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'customize postioning notification'}
                            id={'customize_positioning_notification'}
                        />
                    </div>

                    <ComponentDescription text='This is a notification with a close icon. Customize its position for
            optimal visibility and user interaction.'/>

                    <ToggleTab code={customPositionCode} setCode={setCustomPositionCode}
                               setPreview={setCustomPositionPreview} preview={customPositionPreview}/>

                    <ComponentWrapper>
                        {customPositionPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center '>
                                <div className=' overflow-hidden relative w-full text-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded mt-24'
                                        onClick={() => setTop(true)}
                                    >
                                        Top
                                    </button>
                                    <div className='flex items-center gap-8 w-[70%] mx-auto justify-between'>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded mt-24'
                                            onClick={() => setLeft(true)}
                                        >
                                            Left
                                        </button>
                                        <button
                                            className='px-4 py-2 bg-primary text-secondary rounded mt-24'
                                            onClick={() => setRight(true)}
                                        >
                                            Right
                                        </button>
                                    </div>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded my-24'
                                        onClick={() => setBottom(true)}
                                    >
                                        Bottom
                                    </button>
                                    <div
                                        className={`${
                                            top ? 'translate-y-[0px]' : 'translate-y-[-150px] '
                                        } transition-all duration-300 py-2 px-6 border-[#418944] text-[#418944] border rounded text-center absolute top-5 left-[30%] flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#418944] text-[1rem] cursor-pointer'
                                            onClick={() => setTop(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            left ? 'translate-x-[0px]' : 'translate-x-[-500px]'
                                        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#2d9dda] text-[#2d9dda] absolute top-5 left-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#2d9dda] text-[1rem] cursor-pointer'
                                            onClick={() => setLeft(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            right ? 'translate-x-[0px]' : 'translate-x-[500px]'
                                        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#d74242] text-[#d74242] absolute top-5 right-5 flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#ca3434] text-[1rem] cursor-pointer'
                                            onClick={() => setRight(false)}
                                        />
                                    </div>
                                    <div
                                        className={`${
                                            bottom ? 'translate-y-[0px]' : 'translate-y-[150px]'
                                        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#f18831] text-[#f18831] absolute bottom-0 left-[30%] flex items-center justify-between gap-6`}
                                    >
                                        <p>Click me again for closing</p>{' '}
                                        <RxCross1
                                            className='text-[#f18831] text-[1rem] cursor-pointer'
                                            onClick={() => setBottom(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {customPositionCode && (
                            <Showcode
                                code='
import React from "react";

const Notification = () => {
  return (
    <>
      {/* top notification */}
      <div
        className={`${
          top ? "translate-y-[0px]" : "translate-y-[-150px] "
        } transition-all duration-300 py-2 px-6 border-[#418944] text-[#418944] border rounded text-center absolute top-5 left-[30%] flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#418944] text-[1rem] cursor-pointer"
          onClick={() => setTop(false)}
        />
      </div>

      {/* left notification */}
      <div
        className={`${
          left ? "translate-x-[0px]" : "translate-x-[-500px]"
        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#2d9dda] text-[#2d9dda] absolute top-5 left-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#2d9dda] text-[1rem] cursor-pointer"
          onClick={() => setLeft(false)}
        />
      </div>

      {/* right notification */}
      <div
        className={`${
          right ? "translate-x-[0px]" : "translate-x-[500px]"
        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#d74242] text-[#d74242] absolute top-5 right-5 flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#ca3434] text-[1rem] cursor-pointer"
          onClick={() => setRight(false)}
        />
      </div>

      {/* bottom notification */}
      <div
        className={`${
          bottom ? "translate-y-[0px]" : "translate-y-[150px]"
        }  transition-all duration-300 py-2 px-6  rounded text-center border border-[#f18831] text-[#f18831] absolute bottom-0 left-[30%] flex items-center justify-between gap-6`}>
        <p>Click me again for closing</p>{" "}
        <RxCross1
          className="text-[#f18831] text-[1rem] cursor-pointer"
          onClick={() => setBottom(false)}
        />
      </div>
    </>
  );
};

export default Notification;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'push notification'}
                            id={'push_notification'}
                        />
                    </div>

                    <ComponentDescription text="A real-time notification sent to users' devices or browsers,
            alerting them of updates, messages, or important information."/>

                    <ToggleTab code={pushNotificationCode} setCode={setPushNotificationCode}
                               preview={pushNotificationPreview} setPreview={setPushNotificationPreview}/>

                    <ComponentWrapper>
                        {pushNotificationPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center '>
                                <div className=' w-full text-center flex justify-center gap-[20px]'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded'
                                        onClick={handleAutoClose}
                                    >
                                        Auto Close
                                    </button>

                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded'
                                        onClick={handleCloseWithIcon}
                                    >
                                        Close With Click
                                    </button>
                                </div>

                                <div
                                    className={` ${
                                        autoClose ? 'translate-y-0' : 'translate-y-[100px]'
                                    } transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-[20000000000000] text-text dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 notificationShadow border border-gray-200 flex items-start justify-between px-5 py-4 gap-[10px]`}
                                >
                                    <div className='flex items-start gap-[10px]'>
                                        <MdOutlineDone
                                            className='text-green-500 text-[1.3rem] mt-0.5 border border-green-500 rounded-full p-0.5'/>
                                        <div>
                                            <h3 className='text-[1rem] dark:text-[#abc2d3] font-[600]'>
                                                ZenUI Push Notification
                                            </h3>
                                            <p className='text-[0.8rem] dark:text-slate-400'>show your notification!</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={` ${
                                        closeWithIcon ? 'translate-y-0' : 'translate-y-[100px]'
                                    } transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-[20000000000] text-text dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 notificationShadow border border-gray-200 flex items-start justify-between px-5 py-4 gap-[10px] group`}
                                >
                                    <div className='flex items-start gap-[10px] pr-[20px]'>
                                        <BiError className='text-red-500 text-[1.2rem] mt-0.5'/>
                                        <div>
                                            <h3 className='text-[1rem] dark:text-[#abc2d3] font-[600]'>
                                                ZenUI Push Notification
                                            </h3>
                                            <p className='text-[0.8rem] dark:text-slate-400'>show your notification!</p>
                                        </div>
                                    </div>

                                    <RxCross1
                                        className='text-[1.4rem] dark:text-slate-200 dark:hover:bg-slate-900/50 cursor-pointer absolute top-1 right-1 hidden group-hover:block rounded-full text-gray-900 hover:bg-gray-50 p-[5px]'
                                        onClick={() => setCloseWithIcon(false)}
                                    />
                                </div>
                            </div>
                        )}

                        {pushNotificationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {MdOutlineDone} from "react-icons/md";
import {BiError} from "react-icons/bi";
import {RxCross1} from "react-icons/rx";

const Notification = () => {

    const [autoClose, setAutoClose] = useState(false)
    const [closeViaCrossIconClick, setCloseViaCrossIconClick] = useState(false)

    const handleAutoClose = () => {
        setAutoClose(true)
        setTimeout(()=> {
            setAutoClose(false)
        }, 3000)
    }

    const handleCloseViaCrossIconClick = () => {
        setAutoClose(false)
        setCloseViaCrossIconClick(true)
    }

    return (
        <>
            <div className=" w-full text-center flex justify-center gap-[20px]">
                <button
                    className="px-4 py-2 bg-[#3B9DF8] text-white rounded"
                    onClick={handleAutoClose}
                >
                    Auto Close
                </button>

                <button
                    className="px-4 py-2 bg-[#3B9DF8] text-white rounded"
                    onClick={handleCloseViaCrossIconClick}
                >
                    Close With Click
                </button>
            </div>

            {/* auto close notification */}
            <div
                className={` ${autoClose ? "translate-y-0" : "translate-y-[100px]"} transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-50 text-text notificationShadow border border-gray-200 flex dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 items-start justify-between px-5 py-4 gap-[10px]`}>

                <div className="flex items-start gap-[10px]">
                    <MdOutlineDone
                        className="text-green-500 text-[1.3rem] mt-0.5 border border-green-500 rounded-full p-0.5"/>
                    <div>
                        <h3 className="text-[1rem] dark:text-[#abc2d3] font-[600]">
                            ZenUI Push Notification
                        </h3>
                        <p className="text-[0.8rem] dark:text-slate-400">show your notification!</p>
                    </div>
                </div>
            </div>

            {/* close via cross icon click */}
            <div
                className={` ${closeViaCrossIconClick ? "translate-y-0" : "translate-y-[100px]"} transition-all duration-300  rounded-md bg-white fixed bottom-[20px] left-[20px] z-50 text-text notificationShadow border border-gray-200 flex items-start dark:bg-slate-800 dark:shadow-none dark:border dark:border-slate-700 justify-between px-5 py-4 gap-[10px] group`}>

                <div className="flex items-start gap-[10px] pr-[20px]">
                    <BiError className="text-red-500 text-[1.2rem] mt-0.5"/>
                    <div>
                        <h3 className="text-[1rem] dark:text-[#abc2d3] font-[600]">
                            ZenUI Push Notification
                        </h3>
                        <p className="text-[0.8rem] dark:text-slate-400">show your notification!</p>
                    </div>
                </div>

                <RxCross1
                    className="text-[1.4rem] dark:text-slate-200 dark:hover:bg-slate-900/50 cursor-pointer absolute top-1 right-1 hidden group-hover:block rounded-full text-gray-900 hover:bg-gray-50 p-[5px]"
                    onClick={() => setCloseViaCrossIconClick(false)}/>
            </div>
        </>
    );
};

export default Notification;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/loader'
                        backName='loader'
                        forwardName='badge'
                        forwardUrl='/components/badge'
                    />
                </div>

                <ContentNavbar contents={notificationContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Feedback - Notification</title>
            </Helmet>
        </>
    );
};

export default Notification;
