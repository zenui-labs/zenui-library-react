import React, {useEffect, useState} from 'react';

// components
import Showcode from '@shared/Component/ShowCode.jsx';
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import {Helmet} from 'react-helmet';

// contents for scrollspy
import {modalContents} from '@utils/ContentsConfig/NavigationContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {RxCross1} from 'react-icons/rx';
import {IoCheckmarkDoneCircleOutline} from 'react-icons/io5';
import utils from '@utils/index.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";

const Modals = () => {
    // alertModal
    const [alertModalPreview, setAlertModalPreview] = useState(true);
    const [alertModalCode, setAlertModalCode] = useState(false);

    const sectionIds = modalContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // successModal
    const [successModalPreview, setSuccessModalPreview] = useState(true);
    const [successModalCode, setSuccessModalCode] = useState(false);

    // info modal
    const [infoModalPreview, setInfoModalPreview] = useState(true);
    const [infoModalCode, setInfoModalCode] = useState(false);

    // permission modal
    const [permissionModalPreview, setPermissionModalPreview] = useState(true);
    const [permissionModalCode, setPermissionModalCode] = useState(false);

    // form modal
    const [formModalPreview, setFormModalPreview] = useState(true);
    const [formModalCode, setFormModalCode] = useState(false);

    // cookie modal
    const [cookieModalPreview, setCookieModalPreview] = useState(true);
    const [cookieModalCode, setCookieModalCode] = useState(false);

    // fullScreen modal
    const [fullScreenModalPreview, setFullScreenModalPreview] = useState(true);
    const [fullScreenModalCode, setFullScreenModalCode] = useState(false);

    // customize modal
    const [customizeModalPreview, setCustomizeModalPreview] = useState(true);
    const [customizeModalCode, setCustomizeModalCode] = useState(false);

    // delete modal
    const [deleteModalPreview, setDeleteModalPreview] = useState(true);
    const [deleteModalCode, setDeleteModalCode] = useState(false);

    // handling all of modal actions
    const [modal1Open, setModal1Open] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    const [modal3Open, setModal3Open] = useState(false);
    const [modal4Open, setModal4Open] = useState(false);
    const [modal5Open, setModal5Open] = useState(false);
    const [modal6Open, setModal6Open] = useState(false);
    const [modal7Open, setModal7Open] = useState(false);
    const [modal8Open, setModal8Open] = useState(false);
    const [modal9Open, setModal9Open] = useState(false);
    const [modal10Open, setModal10Open] = useState(false);

    const handleLeftSideModal = () => {
        setModal9Open(true);
        setModal8Open(false);
    };
    const handleRightSideModal = () => {
        setModal9Open(false);
        setModal8Open(true);
    };

    // outside click modal close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest('.zenUIRightModal') &&
                !e.target.closest('.zenUIRightModalButton')
            ) {
                setModal8Open(false);
                setModal9Open(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const [disabledButton, setDisabledButton] = useState(true);

    const checkDeleteModalChange = (event) => {
        setDisabledButton(true);
        if (event.target.value === 'DELETE') {
            setDisabledButton(false);
        }
    };

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <WarningMessageCard text="Note, when you use the modal you will first connect it to the
              button in your project. And it's handled by the state here in
              'useState', so you'll get a good look at it. And here only the
              structure of the modal is given with animation you can design it
              as per your requirement."/>

                    <ContentHeader id='alert_modal' text={'alert modal'}/>

                    <ComponentDescription text='This is an animated alert modal component. Notify with style using
            engaging animations for impact.'/>

                    <ToggleTab code={alertModalCode} setCode={setAlertModalCode} setPreview={setAlertModalPreview}
                               preview={alertModalPreview}/>

                    <ComponentWrapper>
                        {alertModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal1Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal1Open
                                            ? ' scale-[1] opacity-100'
                                            : ' scale-[0] opacity-0'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
                                >
                                    <div
                                        className={`w-[90%] 1024px:w-[30%] dark:bg-slate-800 bg-secondary rounded-lg p-4`}
                                    >
                                        <div className='w-full flex justify-between'>
                                            <div>
                                                <h2 className='text-[1.7rem] dark:text-[#abc2d3] font-[500] text-[#202020]'>
                                                    Are you sure about it?
                                                </h2>
                                                <p className='text-[1rem] dark:text-[#abc2d3]/80 text-[#525252]'>
                                                    you can't undo this action
                                                </p>
                                            </div>

                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/80 dark:hover:bg-slate-900/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal1Open(false)}
                                            />
                                        </div>

                                        <div className='flex items-center gap-2 1024px:gap-3 w-full justify-end mt-6'>
                                            <button
                                                className='px-4 py-2 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:border-slate-700 dark:text-[#abc2d3] border-[#a8a8a8] rounded-lg text-[#585858]'
                                                onClick={() => setModal1Open(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className='px-4 py-2 bg-primary rounded-lg text-secondary'
                                                onClick={() => setModal1Open(false)}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {alertModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen
                    ? " scale-[1] opacity-100"
                    : " scale-[0] opacity-0"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`w-[90%] md:w-[30%] dark:bg-slate-800 bg-secondary rounded-lg p-4`}
            >
                <div className="w-full flex justify-between">
                    <div>
                        <h2 className="text-[1.7rem] dark:text-[#abc2d3] font-[500] text-[#202020]">
                            Are you sure about it?
                        </h2>
                        <p className="text-[1rem] dark:text-[#abc2d3]/80 text-[#525252]">
                            you can"t undo this action
                        </p>
                    </div>

                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/80 dark:hover:bg-slate-900/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-6">
                    <button
                        className="px-4 py-2 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:border-slate-700 dark:text-[#abc2d3] border-[#a8a8a8] rounded-lg text-[#585858]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-[#3B9DF8] rounded-lg text-[#fff]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='success_modal' text={'success modal'}/>
                    </div>

                    <ComponentDescription text=' This is a success modal with animation component. Celebrate
            achievements with stylish animated feedback.'/>

                    <ToggleTab code={successModalCode} setCode={setSuccessModalCode} preview={successModalPreview}
                               setPreview={setSuccessModalPreview}/>

                    <ComponentWrapper>
                        {successModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal2Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal2Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
                                >
                                    <div
                                        className={`${
                                            modal2Open
                                                ? ' scale-[1] opacity-100'
                                                : ' scale-[0] opacity-0'
                                        } w-[90%] 640px:w-[80%] 1024px:w-[30%] dark:bg-slate-800 bg-secondary rounded-lg p-4 transition-all duration-300`}
                                    >
                                        <div className='w-full flex items-end justify-end'>
                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal2Open(false)}
                                            />
                                        </div>

                                        <div className='w-full flex items-center justify-center flex-col'>
                                            <h2 className='text-[#2cac9f] text-[2rem] font-[500]'>
                                                Success!
                                            </h2>
                                            <IoCheckmarkDoneCircleOutline className='p-2 text-[6rem] text-[#2cac9f]'/>

                                            <p className='text-[1.5rem] text-gray-900 dark:text-[#abc2d3] text-center mt-4 mb-2'>
                                                Thank you for <br/>
                                                <span className='font-[600] '>Subscribing</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {successModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-lg p-4 transition-all duration-300`}
            >
                <div className="w-full flex items-end justify-end">
                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="w-full flex items-center justify-center flex-col">
                    <h2 className="text-[#2cac9f] text-[2rem] font-[500]">
                        Success!
                    </h2>
                    <IoCheckmarkDoneCircleOutline className="p-2 text-[6rem] text-[#2cac9f]"/>

                    <p className="text-[1.5rem] text-gray-900 dark:text-[#abc2d3] text-center mt-4 mb-2">
                        Thank you for <br/>
                        <span className="font-[600] ">Subscribing</span>
                    </p>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='Info_modal' text={'Info modal'}/>
                    </div>

                    <ComponentDescription text='This is an info modal with animation component. Present information
            dynamically with engaging animations for clarity.'/>

                    <ToggleTab code={infoModalCode} setPreview={setInfoModalPreview} preview={infoModalPreview}
                               setCode={setInfoModalCode}/>

                    <ComponentWrapper>
                        {infoModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal3Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal3Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300`}
                                >
                                    <div
                                        className={`${
                                            modal3Open
                                                ? ' translate-y-[0px] opacity-100'
                                                : ' translate-y-[-200px] opacity-0'
                                        } w-[80%] 640px:w-[90%] 1024px:w-[40%] bg-secondary dark:bg-slate-800 rounded-lg transition-all duration-300 mx-auto mt-8`}
                                    >
                                        <div
                                            className='w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]'>
                                            <h1 className='text-[1.5rem] dark:text-[#abc2d3] font-bold'>Modal
                                                Header</h1>
                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal3Open(false)}
                                            />
                                        </div>

                                        <div className='p-4 border-b dark:border-slate-700 border-[#d1d1d1]'>
                                            <p className='text-[1rem] dark:text-[#abc2d3] text-text'>
                                                Woohoo, you are reading this text in a modal!
                                            </p>
                                        </div>

                                        <div className='flex items-end justify-end gap-4 p-4 '>
                                            <button
                                                className='py-2 px-4 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:text-[#abc2d3] dark:border-slate-700 border-[#d1d1d1] rounded-md outline-none text-[#353535]'
                                                onClick={() => setModal3Open(false)}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className='py-2 px-4 border dark:border-slate-800 border-[#d1d1d1] rounded-md outline-none bg-primary text-[#fff]'
                                                onClick={() => setModal3Open(false)}
                                            >
                                                Confirm
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {infoModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " translate-y-[0px] opacity-100"
                        : " translate-y-[-200px] opacity-0"
                } w-[80%] sm:w-[90%] md:w-[40%] bg-[#fff] dark:bg-slate-800 rounded-lg transition-all duration-300 mx-auto mt-8`}
            >
                <div
                    className="w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]">
                    <h1 className="text-[1.5rem] dark:text-[#abc2d3] font-bold">Modal Header</h1>
                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="p-4 border-b dark:border-slate-700 border-[#d1d1d1]">
                    <p className="text-[1rem] dark:text-[#abc2d3] text-[#424242]">
                        Woohoo, you are reading this text in a modal!
                    </p>
                </div>

                <div className="flex items-end justify-end gap-4 p-4 ">
                    <button
                        className="py-2 px-4 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:text-[#abc2d3] dark:border-slate-700 border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="py-2 px-4 border dark:border-slate-800 border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='Permission_modal' text={'Permission modal'}/>
                    </div>

                    <ComponentDescription text='This is a permission modal with animation component. Manage
            permissions dynamically with engaging animations for clarity.'/>

                    <ToggleTab code={permissionModalCode} setCode={setPermissionModalCode}
                               preview={permissionModalPreview} setPreview={setPermissionModalPreview}/>

                    <ComponentWrapper>
                        {permissionModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal4Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal4Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
                                >
                                    <div
                                        className={`${
                                            modal4Open
                                                ? ' scale-[1] opacity-100'
                                                : ' scale-[0] opacity-0'
                                        } w-[90%] 640px:w-[80%] 1024px:w-[60%] dark:bg-slate-800 bg-secondary rounded-lg transition-all duration-300 mx-auto mt-8`}
                                    >
                                        <div
                                            className='w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]'>
                                            <h1 className='text-[1.5rem] font-bold dark:text-[#abc2d3]'>
                                                Terms of Service
                                            </h1>
                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal4Open(false)}
                                            />
                                        </div>

                                        <div className='p-4 border-b dark:border-slate-700 border-[#d1d1d1]'>
                                            <p className='text-[1.2rem] dark:text-[#abc2d3] text-text'>
                                                With less than a month to go before the European Union
                                                enacts new consumer privacy laws for its citizens,
                                                companies around the world are updating their terms of
                                                service agreements to comply.
                                            </p>

                                            <p className='text-[1.2rem] dark:text-[#abc2d3] text-text mt-8'>
                                                The European Union’s General Data Protection Regulation
                                                (G.D.P.R.) goes into effect on May 25 and is meant to
                                                ensure a common set of data rights in the European
                                                Union. It requires organizations to notify users as soon
                                                as possible of high-risk data breaches that could
                                                personally affect them.
                                            </p>
                                        </div>

                                        <div className='flex items-center gap-4 p-4 '>
                                            <button
                                                className='py-2 px-4 rounded-md outline-none bg-primary text-[#fff]'
                                                onClick={() => setModal4Open(false)}
                                            >
                                                I Accept
                                            </button>
                                            <button
                                                className='py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 border border-[#d1d1d1] rounded-md outline-none text-[#353535]'
                                                onClick={() => setModal4Open(false)}
                                            >
                                                Decline
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {permissionModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[60%] dark:bg-slate-800 bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
            >
                <div
                    className="w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]">
                    <h1 className="text-[1.5rem] font-bold dark:text-[#abc2d3]">
                        Terms of Service
                    </h1>
                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="p-4 border-b dark:border-slate-700 border-[#d1d1d1]">
                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242]">
                        With less than a month to go before the European Union
                        enacts new consumer privacy laws for its citizens,
                        companies around the world are updating their terms of
                        service agreements to comply.
                    </p>

                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242] mt-8">
                        The European Union’s General Data Protection Regulation
                        (G.D.P.R.) goes into effect on May 25 and is meant to
                        ensure a common set of data rights in the European
                        Union. It requires organizations to notify users as soon
                        as possible of high-risk data breaches that could
                        personally affect them.
                    </p>
                </div>

                <div className="flex items-center gap-4 p-4 ">
                    <button
                        className="py-2 px-4 rounded-md outline-none bg-[#3B9DF8] text-[#fff]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        I Accept
                    </button>
                    <button
                        className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='Form_modal' text={'Form modal'}/>
                    </div>

                    <ComponentDescription text='This is a form modal with animated input fields component. Complete
            forms dynamically with engaging animations for user interaction.'/>

                    <ToggleTab code={formModalCode} setPreview={setFormModalPreview} preview={formModalPreview}
                               setCode={setFormModalCode}/>

                    <ComponentWrapper>
                        {formModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal5Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal5Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
                                >
                                    <div
                                        className={`${
                                            modal5Open
                                                ? ' scale-[1] opacity-100'
                                                : ' scale-[0] opacity-0'
                                        } w-[90%] 640px:w-[80%] 1024px:w-[35%] dark:bg-slate-800 bg-secondary rounded-lg transition-all duration-300 mx-auto mt-8`}
                                    >
                                        <div
                                            className='w-full flex items-end p-4 justify-between border-b dark:border-slate-700 border-[#d1d1d1]'>
                                            <h1 className='text-[1.5rem] dark:text-[#abc2d3] font-bold'>
                                                Sign in to our platform
                                            </h1>
                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal5Open(false)}
                                            />
                                        </div>

                                        <form className='flex flex-col gap-5 p-4'>
                                            <div>
                                                <label
                                                    htmlFor='email'
                                                    className='text-[1rem] dark:text-[#abc2d3] font-[500] text-[#464646]'
                                                >
                                                    Email
                                                </label>
                                                <input
                                                    type='email'
                                                    name='email'
                                                    id='email'
                                                    placeholder='zenuilibrary@gmail.com'
                                                    className='py-2 px-3 border dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-primary'
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor='password'
                                                    className='text-[1rem] font-[500] dark:text-[#abc2d3] text-[#464646]'
                                                >
                                                    Password
                                                </label>
                                                <input
                                                    type='password'
                                                    name='password'
                                                    id='password'
                                                    placeholder='**********'
                                                    className='py-2 px-3 border border-[#d1d1d1] dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] rounded-md w-full focus:outline-none mt-1 focus:border-primary'
                                                />
                                            </div>

                                            <div className='flex items-center justify-between w-full'>
                                                <div className='flex items-center gap-2'>
                                                    <input
                                                        type='checkbox'
                                                        name='checkbox'
                                                        id='checkbox'
                                                        className='w-[17px] h-[17px]'
                                                    />
                                                    <label htmlFor='checkbox' className='dark:text-[#abc2d3]'>Remember
                                                        me</label>
                                                </div>

                                                <a
                                                    href='#'
                                                    className='text-primary font-[400] text-[1rem]'
                                                >
                                                    Forget Password
                                                </a>
                                            </div>

                                            <button
                                                type='submit'
                                                className='py-2 px-4 w-full bg-primary text-[#fff] rounded-md'
                                            >
                                                Sign In
                                            </button>
                                        </form>

                                        <div className='flex items-center justify-center w-full pb-4'>
                                            <p className='text-[1rem] font-[400] dark:text-[#abc2d3] text-[#464646c]'>
                                                Not have any account?{' '}
                                                <a href='#' className='text-primary underline'>
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {formModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[35%] dark:bg-slate-800 bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
            >
                <div
                    className="w-full flex items-end p-4 justify-between border-b dark:border-slate-700 border-[#d1d1d1]">
                    <h1 className="text-[1.5rem] dark:text-[#abc2d3] font-bold">
                        Sign in to our platform
                    </h1>
                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <form className="flex flex-col gap-5 p-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#464646]"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="zenuilibrary@gmail.com"
                            className="py-2 px-3 border dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#464646]"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="**********"
                            className="py-2 px-3 border border-[#d1d1d1] dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="checkbox"
                                id="checkbox"
                                className="w-[17px] h-[17px]"
                            />
                            <label htmlFor="checkbox" className="dark:text-[#abc2d3]">Remember me</label>
                        </div>

                        <a
                            href="#"
                            className="text-[#3B9DF8] font-[400] text-[1rem]"
                        >
                            Forget Password
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="py-2 px-4 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
                    >
                        Sign In
                    </button>
                </form>

                <div className="flex items-center justify-center w-full pb-4">
                    <p className="text-[1rem] font-[400] dark:text-[#abc2d3] text-[#464646c]">
                        Not have any account?{" "}
                        <a href="#" className="text-[#3B9DF8] underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='Cookie_modal' text={'Cookie modal'}/>
                    </div>

                    <ComponentDescription text='This is a cookie consent modal for accepting cookies upon initial
            browser visit.'/>

                    <ToggleTab code={cookieModalCode} setCode={setCookieModalCode} preview={cookieModalPreview}
                               setPreview={setCookieModalPreview}/>

                    <ComponentWrapper>
                        {cookieModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal6Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal6Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
                                >
                                    <div
                                        className={`${
                                            modal6Open
                                                ? ' translate-y-[0px] opacity-100'
                                                : ' translate-y-[200px] opacity-0'
                                        } w-full dark:bg-slate-800 bg-secondary transition-all shadow-primary duration-300 mx-auto mt-8`}
                                    >
                                        <div
                                            className='flex 640px::flex-row flex-col justify-between w-full gap-5 px-8 py-12'>
                                            <p className='text-[1.2rem] dark:text-[#abc2d3] text-text w-full 640px:w-[70%]'>
                                                This site uses cookies and related technologies, as
                                                described in our privacy policy, for purposes that may
                                                include site operation, analytics, enhanced user
                                                experience, or advertising. You may choose to consent to
                                                our use of these technologies, or manage your own
                                                preferences.
                                            </p>

                                            <div
                                                className='flex items-end justify-end gap-4 flex-col 1024px:flex-row w-full 640px:w-[20%]'>
                                                <button
                                                    className='py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none bg-primary text-[#fff]'
                                                    onClick={() => setModal6Open(false)}
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className='py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]'
                                                    onClick={() => setModal6Open(false)}
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {cookieModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " translate-y-[0px] opacity-100"
                        : " translate-y-[200px] opacity-0"
                } w-full dark:bg-slate-800 bg-[#fff] transition-all duration-300 mx-auto mt-8`}
            >
                <div className="flex sm:flex-row flex-col justify-between w-full gap-5 px-8 py-12">
                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-text w-full sm:w-[70%]">
                        This site uses cookies and related technologies, as
                        described in our privacy policy, for purposes that may
                        include site operation, analytics, enhanced user
                        experience, or advertising. You may choose to consent to
                        our use of these technologies, or manage your own
                        preferences.
                    </p>

                    <div className="flex items-end justify-end gap-4 flex-col md:flex-row w-full sm:w-[20%]">
                        <button
                            className="py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Accept
                        </button>
                        <button
                            className="py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='full_screen_modal' text={'full screen modal'}/>
                    </div>

                    <ComponentDescription text='This is a full-screen modal with animation for immersive user
            interaction.'/>

                    <ToggleTab code={fullScreenModalCode} setPreview={setFullScreenModalPreview}
                               preview={fullScreenModalPreview} setCode={setFullScreenModalCode}/>

                    <ComponentWrapper>
                        {fullScreenModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal7Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal7Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
                                >
                                    <div
                                        className={`${
                                            modal7Open
                                                ? ' translate-y-[0px] opacity-100'
                                                : ' translate-y-[200px] opacity-0'
                                        } overflow-y-scroll w-full h-full dark:bg-slate-800 bg-[#eceef6] transition-all shadow-primary duration-300 mx-auto mt-8`}
                                    >
                                        <div className='w-full flex items-end p-4 justify-end'>
                                            <RxCross1
                                                className='p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal7Open(false)}
                                            />
                                        </div>
                                        <div
                                            className='flex items-start 1024px:flex-row flex-col justify-between gap-8'>
                                            <div
                                                className='bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full 1024px:w-[70%]'>
                                                {/* steps */}
                                                <div
                                                    className='flex items-center 1024px:flex-row flex-col justify-between dark:border-slate-700 w-full border-b border-[#d1d1d1]'>
                                                    <div className='flex items-center gap-5'>
                            <span className='text-[1rem] font-[500] text-primary border-b border-primary pb-3'>
                              1.Cart
                            </span>
                                                        <span
                                                            className='text-[1rem] font-[500] dark:text-[#abc2d3] text-text pb-3'>
                              2. Shipping & Payment
                            </span>
                                                        <span
                                                            className='text-[1rem] font-[500] dark:text-[#abc2d3] text-text pb-3'>
                              3. Confimation
                            </span>
                                                    </div>

                                                    <a
                                                        href='#'
                                                        className='underline text-primary font-[500] pb-3'
                                                    >
                                                        Why is subscribing better?
                                                    </a>
                                                </div>

                                                {/* products */}
                                                <div
                                                    className='mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full'>
                                                    <div className='flex items-start gap-5'>
                                                        <img
                                                            src='https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740'
                                                            alt='Still life of skincare products'
                                                            className='w-[90px] h-[60px] object-cover rounded-md'
                                                        />

                                                        <div className=''>
                                                            <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                Still life of skincare products
                                                            </h2>
                                                            <p className='text-[1rem] font-[500] dark:text-[#abc2d3] text-text'>
                                                                25 items
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-12'>
                                                        <h3 className='text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]'>
                                                            $32 <span className='text-primary pl-1'>$12</span>
                                                        </h3>

                                                        <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                    </div>
                                                </div>
                                                <div
                                                    className='mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full'>
                                                    <div className='flex items-start gap-5'>
                                                        <img
                                                            src='https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740'
                                                            alt='Levitating music headphones display'
                                                            className='w-[90px] h-[60px] object-cover rounded-md'
                                                        />

                                                        <div className=''>
                                                            <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                Still life of skincare products
                                                            </h2>
                                                            <p className='text-[1rem] font-[500] dark:text-[#abc2d3] text-text'>
                                                                8 items
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-12'>
                                                        <h3 className='text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]'>
                                                            $32 <span className='text-primary pl-1'>$12</span>
                                                        </h3>

                                                        <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                    </div>
                                                </div>
                                                <div
                                                    className='mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full'>
                                                    <div className='flex items-start gap-5'>
                                                        <img
                                                            src='https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740'
                                                            alt='Set of aloe vera cosmetic products'
                                                            className='w-[90px] h-[60px] object-cover rounded-md'
                                                        />

                                                        <div className=''>
                                                            <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                Still life of skincare products
                                                            </h2>
                                                            <p className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text'>
                                                                2 items
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center gap-12'>
                                                        <h3 className='text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]'>
                                                            $32 <span className='text-primary pl-1'>$12</span>
                                                        </h3>

                                                        <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-full 1024px:w-[30%] mr-8'>
                                                <div className='bg-[#fff] dark:bg-slate-900 rounded-md p-6 '>
                                                    <h3 className='text-[1rem] text-primary font-[500] dark:border-slate-700 border-b border-[#d1d1d1] pb-4 text-center'>
                                                        Order Summary
                                                    </h3>

                                                    <div className='flex flex-col gap-5 mt-4'>
                                                        <div className='flex items-center justify-between w-full'>
                                                            <h4 className='text-[1rem] font-[500] text-primary'>
                                                                Item Total
                                                            </h4>
                                                            <span className='text-text dark:text-[#abc2d3] font-[500]'>
                                $180.00
                              </span>
                                                        </div>

                                                        <div className='flex items-center justify-between w-full'>
                                                            <h4 className='text-[1rem] font-[500] text-primary'>
                                                                Subcription savings (15% off)
                                                            </h4>
                                                            <span className='text-primary font-[500]'>
                                - $18.00
                              </span>
                                                        </div>

                                                        <div className='flex items-center justify-between w-full'>
                                                            <h4 className='text-[1rem] font-[500] text-primary'>
                                                                Shipping
                                                            </h4>
                                                            <span className='text-primary font-[500]'>
                                free
                              </span>
                                                        </div>

                                                        <div
                                                            className='flex items-center justify-between w-full dark:border-slate-700 border-t border-[#d1d1d1] pt-4'>
                                                            <h4 className='text-[1rem] font-[500] dark:text-[#abc2d3] text-text'>
                                                                Order Total
                                                            </h4>
                                                            <span className='text-text dark:text-[#abc2d3] font-[500]'>
                                $200.00
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    className='w-full py-2 px-6 mt-6 tracking-widest bg-primary rounded-md text-[#fff]'>
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {fullScreenModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " translate-y-[0px] opacity-100"
                        : " translate-y-[200px] opacity-0"
                } overflow-y-scroll w-full h-full dark:bg-slate-800 bg-[#eceef6] transition-all duration-300 mx-auto mt-8`}
            >
                <div className="w-full flex items-end p-4 justify-end">
                    <RxCross1
                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>
                <div className="flex items-start md:flex-row flex-col justify-between gap-8">
                    <div className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full md:w-[70%]">
                        {/* steps */}
                        <div
                            className="flex items-center md:flex-row flex-col justify-between dark:border-slate-700 w-full border-b border-[#d1d1d1]">
                            <div className="flex items-center gap-5">
                            <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">
                              1.Cart
                            </span>
                                <span className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242] pb-3">
                              2. Shipping & Payment
                            </span>
                                <span className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242] pb-3">
                              3. Confimation
                            </span>
                            </div>

                            <a
                                href="#"
                                className="underline text-[#3B9DF8] font-[500] pb-3"
                            >
                                Why is subscribing better?
                            </a>
                        </div>

                        {/* products */}
                        <div
                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">
                            <div className="flex items-start gap-5">
                                <img
                                    src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"
                                    alt="Still life of skincare products"
                                    className="w-[90px] h-[60px] object-cover rounded-md"
                                />

                                <div className="">
                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                        Still life of skincare products
                                    </h2>
                                    <p className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">
                                        25 items
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">
                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>
                                </h3>

                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>
                            </div>
                        </div>
                        <div
                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">
                            <div className="flex items-start gap-5">
                                <img
                                    src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"
                                    alt="Levitating music headphones display"
                                    className="w-[90px] h-[60px] object-cover rounded-md"
                                />

                                <div className="">
                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                        Still life of skincare products
                                    </h2>
                                    <p className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">
                                        8 items
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">
                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>
                                </h3>

                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>
                            </div>
                        </div>
                        <div
                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">
                            <div className="flex items-start gap-5">
                                <img
                                    src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"
                                    alt="Set of aloe vera cosmetic products"
                                    className="w-[90px] h-[60px] object-cover rounded-md"
                                />

                                <div className="">
                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                        Still life of skincare products
                                    </h2>
                                    <p className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">
                                        2 items
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-12">
                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">
                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>
                                </h3>

                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-[30%] mr-8">
                        <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">
                            <h3 className="text-[1rem] text-[#3B9DF8] font-[500] dark:border-slate-700 border-b border-[#d1d1d1] pb-4 text-center">
                                Order Summary
                            </h3>

                            <div className="flex flex-col gap-5 mt-4">
                                <div className="flex items-center justify-between w-full">
                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                        Item Total
                                    </h4>
                                    <span className="text-text dark:text-[#abc2d3] font-[500]">
                                $180.00
                              </span>
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                        Subcription savings (15% off)
                                    </h4>
                                    <span className="text-[#3B9DF8] font-[500]">
                                - $18.00
                              </span>
                                </div>

                                <div className="flex items-center justify-between w-full">
                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                        Shipping
                                    </h4>
                                    <span className="text-[#3B9DF8] font-[500]">
                                free
                              </span>
                                </div>

                                <div
                                    className="flex items-center justify-between w-full dark:border-slate-700 border-t border-[#d1d1d1] pt-4">
                                    <h4 className="text-[1rem] font-[500] dark:text-[#abc2d3] text-text">
                                        Order Total
                                    </h4>
                                    <span className="text-text dark:text-[#abc2d3] font-[500]">
                                $200.00
                              </span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='side_modal' text={'side Modal'}/>
                    </div>

                    <ComponentDescription text='A modal that slides in from the side of the screen, providing a
            compact and accessible way to display additional content.'/>

                    <ToggleTab code={customizeModalCode} setCode={setCustomizeModalCode} preview={customizeModalPreview}
                               setPreview={setCustomizeModalPreview}/>

                    <ComponentWrapper>
                        {customizeModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center gap-[20px]'>
                                    <button
                                        className='px-4 py-2 zenUIRightModalButton bg-primary text-secondary rounded '
                                        onClick={handleLeftSideModal}
                                    >
                                        Left Modal
                                    </button>
                                    <button
                                        className='px-4 py-2 zenUIRightModalButton bg-primary text-secondary rounded '
                                        onClick={handleRightSideModal}
                                    >
                                        Right Modal
                                    </button>

                                    {/*  left side  */}
                                    <div
                                        className={`${
                                            modal9Open ? ' visible' : ' invisible'
                                        } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
                                    >
                                        <div
                                            className={`${
                                                modal9Open
                                                    ? ' translate-x-[0px] opacity-100'
                                                    : ' translate-x-[-200px] opacity-0'
                                            } overflow-y-scroll zenUIRightModal w-[40%] dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300`}
                                        >
                                            <div className='w-full flex items-end p-4 justify-end'>
                                                <RxCross1
                                                    className='p-2 w-fit dark:text-slate-300 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                    onClick={() => setModal9Open(false)}
                                                />
                                            </div>

                                            <div className='flex items-start flex-col p-12 justify-between gap-8'>
                                                <div
                                                    className='bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full'>
                                                    {/* steps */}
                                                    <div
                                                        className='flex items-center 1024px:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6'>
                                                        <div className='flex items-center flex-wrap gap-5'>
                              <span className='text-[1rem] font-[500] text-primary border-b border-primary pb-3'>
                                1.Cart
                              </span>
                                                            <span
                                                                className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                2. Shipping & Payment
                              </span>
                                                            <span
                                                                className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                3. Confimation
                              </span>
                                                        </div>

                                                        <a
                                                            href='#'
                                                            className='underline text-primary font-[500] pb-3'
                                                        >
                                                            Why is subscribing better?
                                                        </a>
                                                    </div>

                                                    {/* products */}
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740'
                                                                alt='Still life of skincare products'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    25 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740'
                                                                alt='Levitating music headphones display'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    8 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740'
                                                                alt='Set of aloe vera cosmetic products'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    2 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-full mr-8'>
                                                    <div className='bg-[#fff] dark:bg-slate-900 rounded-md p-6 '>
                                                        <h3 className='text-[1rem] text-primary dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center'>
                                                            Order Summary
                                                        </h3>

                                                        <div className='flex flex-col gap-5 mt-4'>
                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Item Total
                                                                </h4>
                                                                <span
                                                                    className='text-text dark:text-[#abc2d3] font-[500]'>
                                  $180.00
                                </span>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Subcription savings (15% off)
                                                                </h4>
                                                                <span className='text-primary font-[500]'>
                                  - $18.00
                                </span>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Shipping
                                                                </h4>
                                                                <span className='text-primary font-[500]'>
                                  free
                                </span>
                                                            </div>

                                                            <div
                                                                className='flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4'>
                                                                <h4 className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text'>
                                                                    Order Total
                                                                </h4>
                                                                <span
                                                                    className='text-text font-[500] dark:text-[#abc2d3]'>
                                  $200.00
                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className='w-full py-2 px-6 mt-6 tracking-widest bg-primary rounded-md text-[#fff]'>
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  right side  */}
                                    <div
                                        className={`${
                                            modal8Open ? ' visible' : ' invisible'
                                        } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
                                    >
                                        <div
                                            className={`${
                                                modal8Open
                                                    ? ' translate-x-[0px] opacity-100'
                                                    : ' translate-x-[200px] opacity-0'
                                            } overflow-y-scroll zenUIRightModal w-[40%] dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300 float-right`}
                                        >
                                            <div className='w-full flex items-end p-4 justify-end'>
                                                <RxCross1
                                                    className='p-2 w-fit dark:text-slate-400 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                    onClick={() => setModal8Open(false)}
                                                />
                                            </div>

                                            <div className='flex items-start flex-col p-12 justify-between gap-8'>
                                                <div
                                                    className='bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full'>
                                                    {/* steps */}
                                                    <div
                                                        className='flex items-center 1024px:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6'>
                                                        <div className='flex items-center gap-5'>
                              <span className='text-[1rem] font-[500] text-primary border-b border-primary pb-3'>
                                1.Cart
                              </span>
                                                            <span
                                                                className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                2. Shipping & Payment
                              </span>
                                                            <span
                                                                className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                3. Confirmation
                              </span>
                                                        </div>

                                                        <a
                                                            href='#'
                                                            className='underline text-primary font-[500] pb-3'
                                                        >
                                                            Why is subscribing better?
                                                        </a>
                                                    </div>

                                                    {/* products */}
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740'
                                                                alt='Still life of skincare products'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    25 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740'
                                                                alt='Levitating music headphones display'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    8 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                                        <div className='flex items-start gap-5'>
                                                            <img
                                                                src='https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740'
                                                                alt='Set of aloe vera cosmetic products'
                                                                className='w-[90px] h-[60px] object-cover rounded-md'
                                                            />

                                                            <div className=''>
                                                                <h2 className='text-[1.2rem] font-[600] text-primary'>
                                                                    Still life of skincare products
                                                                </h2>
                                                                <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                                                    2 items
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className='flex items-center gap-12'>
                                                            <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                                                $32{' '}
                                                                <span className='text-primary pl-1'>$12</span>
                                                            </h3>

                                                            <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='w-full mr-8'>
                                                    <div className='bg-[#fff] dark:bg-slate-900 rounded-md p-6 '>
                                                        <h3 className='text-[1rem] text-primary dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center'>
                                                            Order Summary
                                                        </h3>

                                                        <div className='flex flex-col gap-5 mt-4'>
                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Item Total
                                                                </h4>
                                                                <span
                                                                    className='text-text dark:text-[#abc2d3] font-[500]'>
                                  $180.00
                                </span>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Subcription savings (15% off)
                                                                </h4>
                                                                <span className='text-primary font-[500]'>
                                  - $18.00
                                </span>
                                                            </div>

                                                            <div className='flex items-center justify-between w-full'>
                                                                <h4 className='text-[1rem] font-[500] text-primary'>
                                                                    Shipping
                                                                </h4>
                                                                <span className='text-primary font-[500]'>
                                  free
                                </span>
                                                            </div>

                                                            <div
                                                                className='flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4'>
                                                                <h4 className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text'>
                                                                    Order Total
                                                                </h4>
                                                                <span
                                                                    className='text-text dark:text-[#abc2d3] font-[500]'>
                                  $200.00
                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        className='w-full py-2 px-6 mt-6 tracking-widest bg-primary rounded-md text-[#fff]'>
                                                        Checkout
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {customizeModalCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // outside click modal close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest(".zenUIModal") &&
                !e.target.closest(".zenUIModalButton")
            ) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <>
            {/*  left side modal */}
            <div
                className={`${
                    isModalOpen ? " visible" : " invisible"
                } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
            >
                <div
                    className={`${
                        isModalOpen
                            ? " translate-x-[0px] opacity-100"
                            : " translate-x-[-200px] opacity-0"
                    } overflow-y-scroll zenUIModal w-[40%] dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300`}
                >
                    <div className="w-full flex items-end p-4 justify-end">
                        <RxCross1
                            className="p-2 w-fit dark:text-slate-300 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>

                    <div className="flex items-start flex-col p-12 justify-between gap-8">
                        <div className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full">
                            {/* steps */}
                            <div className="flex items-center md:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6">
                                <div className="flex items-center flex-wrap gap-5">
                              <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">
                                1.Cart
                              </span>
                                    <span className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">
                                2. Shipping & Payment
                              </span>
                                    <span className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">
                                3. Confimation
                              </span>
                                </div>

                                <a
                                    href="#"
                                    className="underline text-[#3B9DF8] font-[500] pb-3"
                                >
                                    Why is subscribing better?
                                </a>
                            </div>

                            {/* products */}
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"
                                        alt="Still life of skincare products"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            25 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"
                                        alt="Levitating music headphones display"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            8 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"
                                        alt="Set of aloe vera cosmetic products"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            2 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full mr-8">
                            <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">
                                <h3 className="text-[1rem] text-[#3B9DF8] dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center">
                                    Order Summary
                                </h3>

                                <div className="flex flex-col gap-5 mt-4">
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Item Total
                                        </h4>
                                        <span className="text-[#424242] dark:text-[#abc2d3] font-[500]">
                                  $180.00
                                </span>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Subcription savings (15% off)
                                        </h4>
                                        <span className="text-[#3B9DF8] font-[500]">
                                  - $18.00
                                </span>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Shipping
                                        </h4>
                                        <span className="text-[#3B9DF8] font-[500]">
                                  free
                                </span>
                                    </div>

                                    <div className="flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4">
                                        <h4 className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">
                                            Order Total
                                        </h4>
                                        <span className="text-[#424242] font-[500] dark:text-[#abc2d3]">
                                  $200.00
                                </span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*  right side modal */}
            <div
                className={`${
                    isModalOpen ? " visible" : " invisible"
                } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
            >
                <div
                    className={`${
                        isModalOpen
                            ? " translate-x-[0px] opacity-100"
                            : " translate-x-[200px] opacity-0"
                    } overflow-y-scroll zenUIModal w-[40%] dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300 float-right`}
                >
                    <div className="w-full flex items-end p-4 justify-end">
                        <RxCross1
                            className="p-2 w-fit dark:text-slate-400 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>

                    <div className="flex items-start flex-col p-12 justify-between gap-8">
                        <div className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full">
                            {/* steps */}
                            <div className="flex items-center md:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6">
                                <div className="flex items-center gap-5">
                              <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">
                                1.Cart
                              </span>
                                    <span className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">
                                2. Shipping & Payment
                              </span>
                                    <span className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">
                                3. Confirmation
                              </span>
                                </div>

                                <a
                                    href="#"
                                    className="underline text-[#3B9DF8] font-[500] pb-3"
                                >
                                    Why is subscribing better?
                                </a>
                            </div>

                            {/* products */}
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"
                                        alt="Still life of skincare products"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            25 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"
                                        alt="Levitating music headphones display"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            8 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                            <div className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">
                                <div className="flex items-start gap-5">
                                    <img
                                        src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"
                                        alt="Set of aloe vera cosmetic products"
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div className="">
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">
                                            Still life of skincare products
                                        </h2>
                                        <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">
                                            2 items
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">
                                        $32{" "}
                                        <span className="text-[#3B9DF8] pl-1">$12</span>
                                    </h3>

                                    <RxCross1 className="text-[#6d6d6d] dark:text-slate-400" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full mr-8">
                            <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">
                                <h3 className="text-[1rem] text-[#3B9DF8] dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center">
                                    Order Summary
                                </h3>

                                <div className="flex flex-col gap-5 mt-4">
                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Item Total
                                        </h4>
                                        <span className="text-[#424242] dark:text-[#abc2d3] font-[500]">
                                  $180.00
                                </span>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Subcription savings (15% off)
                                        </h4>
                                        <span className="text-[#3B9DF8] font-[500]">
                                  - $18.00
                                </span>
                                    </div>

                                    <div className="flex items-center justify-between w-full">
                                        <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">
                                            Shipping
                                        </h4>
                                        <span className="text-[#3B9DF8] font-[500]">
                                  free
                                </span>
                                    </div>

                                    <div className="flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4">
                                        <h4 className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">
                                            Order Total
                                        </h4>
                                        <span className="text-[#424242] dark:text-[#abc2d3] font-[500]">
                                  $200.00
                                </span>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
        ;
};

export default Modal;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='delete_modal' text={'delete modal'}/>
                    </div>

                    <ComponentDescription text='A delete confirmation modal that requires users to type the word
            "delete" to validate and confirm the action, ensuring intentional
            deletion.'/>

                    <ToggleTab code={deleteModalCode} setPreview={setDeleteModalPreview} setCode={setDeleteModalCode}
                               preview={deleteModalPreview}/>

                    <ComponentWrapper>
                        {deleteModalPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex items-center justify-center'>
                                    <button
                                        className='px-4 py-2 bg-primary text-secondary rounded '
                                        onClick={() => setModal10Open(true)}
                                    >
                                        Open Modal
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        modal10Open ? ' visible' : ' invisible'
                                    } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
                                >
                                    <div
                                        className={`${
                                            modal10Open
                                                ? ' scale-[1] opacity-100'
                                                : ' scale-[0] opacity-0'
                                        } w-[90%] 640px:w-[80%] 1024px:w-[30%] dark:bg-slate-800 bg-secondary rounded-lg p-5 transition-all duration-300 z-[999]`}
                                    >
                                        <div className='w-full flex items-center justify-between'>
                                            <h2 className='text-[#000] dark:text-[#abc2d3] text-[1.3rem] font-[500]'>
                                                Delete Modal
                                            </h2>
                                            <RxCross1
                                                className='p-2 text-[2rem] dark:text-slate-400 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                                                onClick={() => setModal10Open(false)}
                                            />
                                        </div>

                                        <div className='w-full'>
                                            <p className='text-text dark:text-slate-400 text-[1rem] font-[400]'>
                                                Are You sure want to delete it?
                                            </p>

                                            <div className='mt-5'>
                                                <label className='font-[400] dark:text-[#abc2d3] text-black'>
                                                    Type <b>"DELETE"</b> to confirm
                                                </label>{' '}
                                                <br/>
                                                <input
                                                    onChange={checkDeleteModalChange}
                                                    type='text'
                                                    className='py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-200 rounded-md mt-1 w-full outline-none focus:border-primary'
                                                />
                                            </div>

                                            <div className='mt-8 flex w-full items-end justify-end gap-[13px]'>
                                                <button
                                                    onClick={() => setModal10Open(false)}
                                                    className={`py-2 px-6 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-700/50 rounded font-[500] z-10 border border-[#cecece] text-gray-500`}
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => setModal10Open(false)}
                                                    className={`${utils.buttonPrimary} ${
                                                        disabledButton
                                                            ? '!bg-[#FDECEB] dark:!bg-red-800/30 dark:!border-red-900/30 dark:text-slate-500 !border-[#FDECEB] text-red-200 cursor-not-allowed'
                                                            : 'bg-red-600 text-white border-red-600'
                                                    }`}
                                                    disabled={disabledButton}
                                                >
                                                    Yes, Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {deleteModalCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";

const Modal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);

    const checkDeleteModalChange = (event) => {
        setDisabledButton(true);
        if (event.target.value === "DELETE") {
            setDisabledButton(false);
        }
    };

    return (
        <div
            className={`${
                isModalOpen ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
        >
            <div
                className={`${
                    isModalOpen
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-lg p-5 transition-all duration-300 z-[999]`}
            >
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-[#000] dark:text-[#abc2d3] text-[1.3rem] font-[500]">
                        Delete Modal
                    </h2>
                    <RxCross1
                        className="p-2 text-[2rem] dark:text-slate-400 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        onClick={() => setIsModalOpen(false)}
                    />
                </div>

                <div className="w-full">
                    <p className="text-[#424242] dark:text-slate-400 text-[1rem] font-[400]">
                        Are You sure want to delete it?
                    </p>

                    <div className="mt-5">
                        <label className="font-[400] dark:text-[#abc2d3] text-black">
                            Type <b>"DELETE"</b> to confirm
                        </label>{" "}
                        <br/>
                        <input
                            onChange={checkDeleteModalChange}
                            type="text"
                            className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-200 rounded-md mt-1 w-full outline-none focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={`py-2 px-6 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-700/50 rounded font-[500] z-10 border border-[#cecece] text-gray-500`}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className={`${
                                disabledButton
                                    ? "!bg-[#FDECEB] dark:!bg-red-800/30 dark:!border-red-900/30 dark:text-slate-500 !border-[#FDECEB] text-red-200 cursor-not-allowed"
                                    : "bg-red-600 text-white border-red-600 py-2 px-6 border rounded font-[500]"
                            }`}
                            disabled={disabledButton}
                        >
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
};

export default Modal;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/stepper'
                        backName='stepper'
                        forwardName='tabs'
                        forwardUrl='/components/tabs'
                    />
                </div>

                <ContentNavbar contents={modalContents} activeSection={activeSection} width='70%'/>

            </aside>

            <Helmet>
                <title>Navigation - Modal</title>
            </Helmet>
        </>
    );
};

export default Modals;
