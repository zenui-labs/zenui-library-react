import React, {useEffect, useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import {MdDone, MdKeyboardArrowDown} from "react-icons/md";
import {BiCopy, BiEdit} from "react-icons/bi";
import {AiOutlineDelete, AiOutlineSchedule} from "react-icons/ai";
import {LuSaveAll} from "react-icons/lu";

// contents for scrollspy
import {dropdownButtonContents} from '@utils/ContentsConfig/ButtonsContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const DropdownButton = () => {
    const sectionIds = dropdownButtonContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // publish buttons
    const [publishPreview, setPublishPreview] = useState(true);
    const [publishCode, setPublishCode] = useState(false);

    // action button
    const [actionButtonPreview, setActionButtonPreview] = useState(true);
    const [actionButtonCode, setActionButtonCode] = useState(false);

    // action button
    const [arrowSendButtonPreview, setArrowSendButtonPreview] = useState(true);
    const [arrowSendButtonCode, setArrowSendButtonCode] = useState(false);

    // publish button actions
    const [publishButtonActive, setPublishButtonActive] = useState(false);
    const [actionButtonActive, setActionButtonActive] = useState(false);
    const [actionButtonActive2, setActionButtonActive2] = useState(false);
    const [publishButtonText, setPublishButtonText] = useState('Publish');
    const [actionButtonText, setActionButtonText] = useState('Mark as read');
    const [sendButtonText, setSendButtonText] = useState('Send');

    const publishButtonContent = [
        'Publish', 'Set as draft'
    ]
    const actionContents = [
        {
            label: 'Mark as read',
            icon: <MdDone/>
        }, {
            label: 'Copy',
            icon: <BiCopy/>
        }, {
            label: 'Edit',
            icon: <BiEdit/>
        },
    ]

    const sendButtonContent = [
        {
            label: 'Schedule for later',
            icon: <AiOutlineSchedule/>
        }, {
            label: 'Save draft',
            icon: <LuSaveAll/>
        }, {
            label: 'Delete',
            icon: <AiOutlineDelete/>
        },
    ]

    const handlePublishButtonClick = (item) => {
        setPublishButtonText(item)
        setPublishButtonActive(false)
    }

    const handleActionButtonClick = (item) => {
        setActionButtonText(item)
        setActionButtonActive(false)
    }

    const handleSendButtonClick = (item) => {
        setSendButtonText(item)
        setActionButtonActive2(false)
    }

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.closest('.publishButtonOptions') && !event.target.closest('.publishButton')) {
                setPublishButtonActive(false)
                setActionButtonActive(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Publish Button"} id={"publish_button"}/>

                <ComponentDescription
                    text='Dropdown menu with a publish button, offering various publishing options for content management.'/>

                <ToggleTab setCode={setPublishCode} code={publishCode} preview={publishPreview}
                           setPreview={setPublishPreview}/>

                <ComponentWrapper>
                    {publishPreview && (
                        <div
                            className={`p-8 ${publishButtonActive ? 'mb-20' : 'mb-4'} flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}>
                            <div
                                className='flex items-center rounded bg-primary border-none outline-none text-secondary justify-between relative'>
                                <button
                                    className=" text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                                    {publishButtonText}
                                </button>

                                <div onClick={() => setPublishButtonActive(!publishButtonActive)}
                                     className='bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton'>
                                    <MdKeyboardArrowDown className='text-[2rem]'/>
                                </div>

                                <ul className={`${publishButtonActive ? 'opacity-100 z-20 translate-y-0' : ' opacity-0 z-[-1] translate-y-[-5px]'} dark:bg-slate-800 dark:text-[#abc2d3] publishButtonOptions transition-all duration-500 flex flex-col boxShadow bg-white absolute top-[46px] rounded right-0 text-text text-[0.9rem]`}>
                                    {
                                        publishButtonContent?.map((item, index) => (
                                            <li className='py-2 px-6 hover:bg-gray-50 dark:hover:bg-slate-900/40 rounded cursor-pointer'
                                                key={index} onClick={() => handlePublishButtonClick(item)}>{item}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )}

                    {publishCode &&
                        <ShowCode code='
import React, {useEffect, useState} from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";

const DropdownButton = () => {
    const [publishButtonActive, setPublishButtonActive] = useState(false);
    const [publishButtonText, setPublishButtonText] = useState("Publish");

    const publishButtonContent = [
        "Publish", "Set as draft"
    ]

    const handlePublishButtonClick = (item) => {
        setPublishButtonText(item)
        setPublishButtonActive(false)
    }

    useEffect(() => {
        const handleClick = (event) => {
            if(!event.target.closest(".publishButtonOptions") && !event.target.closest(".publishButton")){
                setPublishButtonActive(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div
            className="flex items-center rounded bg-[#3B9DF8] border-none outline-none text-[#fff] justify-between relative">
            <button
                className="text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                {publishButtonText}
            </button>

            <div onClick={() => setPublishButtonActive(!publishButtonActive)}
                 className="bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton">
                <MdKeyboardArrowDown className="text-[2rem]"/>
            </div>

            <ul className={`${publishButtonActive ? "opacity-100 z-20 translate-y-0" : " opacity-0 z-[-1] translate-y-[-5px]"} dark:bg-slate-800 dark:text-[#abc2d3] publishButtonOptions transition-all duration-500 flex flex-col bg-white absolute top-[46px] rounded right-0 text-text text-[0.9rem]`}>
                {
                    publishButtonContent?.map((item, index) => (
                        <li className="py-2 px-6 hover:bg-gray-50 dark:hover:bg-slate-900/40 rounded cursor-pointer"
                            key={index} onClick={() => handlePublishButtonClick(item)}>{item}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default DropdownButton;
                    '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"action Button"} id={"action_button"}/>
                </div>

                <ComponentDescription
                    text='Dropdown menu with an action button, providing a range of selectable actions for quick task execution.'/>

                <ToggleTab setCode={setActionButtonCode} code={actionButtonCode} setPreview={setActionButtonPreview}
                           preview={actionButtonPreview}/>

                <ComponentWrapper>
                    {actionButtonPreview && (
                        <div
                            className={`p-8 ${actionButtonActive ? 'mb-28' : 'mb-4'} flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}>
                            <div
                                className='flex items-center rounded bg-primary border-none outline-none text-secondary justify-between relative'>
                                <button
                                    className=" text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                                    {actionButtonText}
                                </button>

                                <div onClick={() => setActionButtonActive(!actionButtonActive)}
                                     className='bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton'>
                                    <MdKeyboardArrowDown className='text-[2rem]'/>
                                </div>

                                <ul className={`${actionButtonActive ? 'opacity-100 z-20 translate-y-0' : ' opacity-0 z-[-1] translate-y-[-5px]'} dark:bg-slate-800 dark:text-[#abc2d3] publishButtonOptions transition-all duration-500 flex flex-col boxShadow bg-white py-1 w-full absolute top-[46px] rounded right-0 text-text text-[0.9rem]`}>
                                    {
                                        actionContents?.map((item, index) => (
                                            <li className='py-2 px-3 flex items-center dark:hover:bg-slate-900/40 gap-[5px] hover:bg-gray-50 rounded cursor-pointer'
                                                key={index} onClick={() => handleActionButtonClick(item.label)}>
                                                {item.icon}
                                                {item.label}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )}

                    {actionButtonCode &&
                        <ShowCode code='
import React, {useEffect, useState} from "react";

// react icons
import {MdDone, MdKeyboardArrowDown} from "react-icons/md";
import {BiCopy, BiEdit} from "react-icons/bi";

const DropdownButton = () => {
    const [actionButtonActive, setActionButtonActive] = useState(false);
    const [actionButtonText, setActionButtonText] = useState("Mark as read");

    const actionContents = [
        {
            label: "Mark as read",
            icon: <MdDone/>
        },{
            label: "Copy",
            icon: <BiCopy/>
        },{
            label: "Edit",
            icon: <BiEdit/>
        },
    ]

    const handleActionButtonClick = (item) => {
        setActionButtonText(item)
        setActionButtonActive(false)
    }

    useEffect(() => {
        const handleClick = (event) => {
            if(!event.target.closest(".publishButtonOptions") && !event.target.closest(".publishButton")){
                setActionButtonActive(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div
            className="flex items-center rounded bg-[#3B9DF8] border-none outline-none text-[#fff] justify-between relative">
            <button
                className=" text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                {actionButtonText}
            </button>

            <div onClick={() => setActionButtonActive(!actionButtonActive)}
                 className="bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton">
                <MdKeyboardArrowDown className="text-[2rem]"/>
            </div>

            <ul className={`${actionButtonActive ? "opacity-100 z-20 translate-y-0" : " opacity-0 z-[-1] translate-y-[-5px]"} dark:bg-slate-800 dark:text-[#abc2d3] publishButtonOptions transition-all duration-500 flex flex-col bg-white py-1 w-full absolute top-[46px] rounded right-0 text-text text-[0.9rem]`}>
                {
                    actionContents?.map((item, index) => (
                        <li className="py-2 px-3 flex items-center dark:hover:bg-slate-900/40 gap-[5px] hover:bg-gray-50 rounded cursor-pointer"
                            key={index} onClick={() => handleActionButtonClick(item.label)}>
                            {item.icon}
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default DropdownButton;
                    '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"send Button with arrow"} id={"send_button_with_arrow"}/>
                </div>

                <ComponentDescription
                    text='Dropdown menu with a send button and arrow, allowing users to choose from multiple sending options.'/>

                <ToggleTab setCode={setArrowSendButtonCode} code={arrowSendButtonCode}
                           setPreview={setArrowSendButtonPreview} preview={arrowSendButtonPreview}/>

                <ComponentWrapper>
                    {arrowSendButtonPreview && (
                        <div
                            className={`p-8 ${actionButtonActive2 ? 'mb-32' : 'mb-4'} flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}>
                            <div
                                className='flex items-center rounded bg-primary border-none outline-none text-secondary justify-between relative'>
                                <button
                                    className=" text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                                    {sendButtonText}
                                </button>

                                <div onClick={() => setActionButtonActive2(!actionButtonActive2)}
                                     className='bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton'>
                                    <MdKeyboardArrowDown className='text-[2rem]'/>
                                </div>

                                <ul className={`${actionButtonActive2 ? 'opacity-100 z-20 translate-y-4' : ' opacity-0 z-[-1] translate-y-[-20px]'} publishButtonOptions transition-all duration-500 flex flex-col boxShadow bg-white py-1 w-max dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] absolute top-[46px] rounded border border-[#e6e6e6] right-0 text-text text-[0.9rem]`}>
                                    <div
                                        className='absolute -top-[8px] dark:bg-slate-800 dark:border-slate-700 right-3 border-l border-b border-[#e6e6e6] bg-white w-[15px] h-[15px] rotate-[135deg]'></div>
                                    {
                                        sendButtonContent?.map((item, index) => (
                                            <li className='z-20 py-2 px-3 dark:hover:bg-slate-900/40 flex items-center gap-[8px] hover:bg-gray-50 rounded cursor-pointer'
                                                key={index} onClick={() => handleSendButtonClick(item.label)}>
                                                <span className='text-primary'>{item.icon}</span>
                                                {item.label}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    )}

                    {arrowSendButtonCode &&
                        <ShowCode code='
import React, {useEffect, useState} from "react";

// react icons
import {MdKeyboardArrowDown} from "react-icons/md";
import {AiOutlineDelete, AiOutlineSchedule} from "react-icons/ai";
import {LuSaveAll} from "react-icons/lu";

const DropdownButton = () => {
    const [actionButtonActive, setActionButtonActive] = useState(false);
    const [sendButtonText, setSendButtonText] = useState("Send");

    const sendButtonContent = [
        {
            label: "Schedule for later",
            icon: <AiOutlineSchedule/>
        },{
            label: "Save draft",
            icon: <LuSaveAll/>
        },{
            label: "Delete",
            icon: <AiOutlineDelete/>
        },
    ]

    const handleSendButtonClick = (item) => {
        setSendButtonText(item)
        setActionButtonActive(false)
    }

    useEffect(() => {
        const handleClick = (event) => {
            if(!event.target.closest(".publishButtonOptions") && !event.target.closest(".publishButton")){
                setActionButtonActive(false)
            }
        };
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    return (
        <div
            className="flex items-center rounded bg-[#3B9DF8] border-none outline-none text-[#fff] justify-between relative">
            <button
                className=" text-[1rem] px-6 py-1.5 transition-all duration-500 cursor-auto">
                {sendButtonText}
            </button>

            <div onClick={() => setActionButtonActive(!actionButtonActive)}
                 className="bg-[#005fb2] w-[50px] py-1.5 flex items-center justify-center cursor-pointer rounded-r publishButton">
                <MdKeyboardArrowDown className="text-[2rem]"/>
            </div>

            <ul className={`${actionButtonActive ? "opacity-100 z-20 translate-y-4" : " opacity-0 z-[-1] translate-y-[-20px]"} publishButtonOptions transition-all duration-500 flex flex-col boxShadow bg-white py-1 w-max dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] absolute top-[46px] rounded border border-[#e6e6e6] right-0 text-text text-[0.9rem]`}>
                <div
                    className="absolute -top-[8px] dark:bg-slate-800 dark:border-slate-700 right-3 border-l border-b border-[#e6e6e6] bg-white w-[15px] h-[15px] rotate-[135deg]"></div>
                {
                    sendButtonContent?.map((item, index) => (
                        <li className="z-20 py-2 px-3 dark:hover:bg-slate-900/40 flex items-center gap-[8px] hover:bg-gray-50 rounded cursor-pointer"
                            key={index} onClick={() => handleSendButtonClick(item.label)}>
                            <span className="text-primary">{item.icon}</span>
                            {item.label}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default DropdownButton;
                    '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/login-buttons' backName='login button'
                                forwardUrl='/components/animated-button' forwardName='animated button'/>
            </div>

            <ContentNavbar contents={dropdownButtonContents} activeSection={activeSection}/>

            <Helmet>
                <title>Buttons - Dropdown Button</title>
            </Helmet>
        </aside>
    );
};

export default DropdownButton;
