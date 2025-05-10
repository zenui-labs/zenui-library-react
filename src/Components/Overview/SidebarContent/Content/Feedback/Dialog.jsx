// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";

// contents for scrollspy
import {dialogContents} from "@utils/ContentsConfig/FeedbackContents";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy";

// icons
import {FaPlus} from "react-icons/fa6";
import {FaUser} from "react-icons/fa";
import {RxCross1} from "react-icons/rx";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Dialog = () => {
    const sectionIds = dialogContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // backgroundPreview
    const [basicDialogPreview, setBasicDialogPreview] = useState(true);
    const [basicDialogCode, setBasicDialogCode] = useState(false);

    // alert dialog
    const [alertDialogPreview, setAlertDialogPreview] = useState(true);
    const [alertDialogCode, setAlertDialogCode] = useState(false);

    // handle dialog message
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState("please select");
    // handel alert dialog message
    const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

    const handleDialogAction = (e) => {
        let element = e.target;
        setDialogValue(element.innerText);
        setIsDialogOpen(false);
    };

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"basic dialog"} id={"basic_dialog"}/>

                    <ComponentDescription text='This is a dialog component. Display important messages, prompts, or
            actions in a focused modal window.'/>

                    <ToggleTab code={basicDialogCode} setCode={setBasicDialogCode} setPreview={setBasicDialogPreview}
                               preview={basicDialogPreview}/>

                    <ComponentWrapper>
                        {basicDialogPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="flex items-center flex-col gap-5">
                                    <p>Selected: {dialogValue}</p>

                                    <button
                                        className="px-6 py-2 border border-primary outline-none rounded text-primary"
                                        onClick={() => setIsDialogOpen(true)}
                                    >
                                        Open Simple Dialog
                                    </button>

                                    {isDialogOpen && (
                                        <div
                                            className="bg-[#00000027] z-[200000000000] fixed flex items-center justify-center top-0 left-0 w-full h-screen">
                                            <div
                                                className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                                                onClick={() => setIsDialogOpen(false)}
                                            ></div>
                                            <div
                                                className="w-[300px] h-auto py-3 dark:bg-slate-800 bg-secondary rounded relative z-10"
                                                onClick={handleDialogAction}
                                            >
                                                <div className="w-full flex items-end justify-end px-3">
                                                    <RxCross1
                                                        className="text-[2rem] dark:text-slate-200 dark:bg-slate-900/40 p-2 bg-[#3d3d3d18] text-[#222222] rounded-full cursor-pointer"
                                                        onClick={() => setIsDialogOpen(false)}
                                                    />
                                                </div>
                                                <h1 className="text-[1.2rem] text-text dark:text-[#abc2d3] font-[500] px-6 py-3">
                                                    Set backup account
                                                </h1>
                                                <h2
                                                    className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                                                >
                          <span>
                            <FaUser
                                className="text-[2rem] text-[#1b703f] p-2 dark:bg-green-800/30 dark:text-green-500 rounded-full bg-[#15a7522d]"/>
                          </span>
                                                    user@gmail.com
                                                </h2>
                                                <h2
                                                    className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                                                >
                          <span>
                            <FaUser
                                className="text-[2rem] text-[#1b703f] p-2 dark:bg-green-800/30 dark:text-green-500 rounded-full bg-[#15a7522d]"/>
                          </span>
                                                    user02@gmail.com
                                                </h2>
                                                <h2
                                                    className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                                                >
                          <span>
                            <FaPlus
                                className="text-[2rem] text-[#303030] p-2 dark:text-gray-300 dark:bg-gray-700 rounded-full bg-[#3d3d3d2c]"/>
                          </span>
                                                    Add Account
                                                </h2>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {basicDialogCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {RxCross1} from "react-icons/rx";
import {FaUser} from "react-icons/fa";
import {FaPlus} from "react-icons/fa6";

const Dialog = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
            {isDialogOpen && (
                <div className="bg-[#00000027] z-[200000000000] fixed flex items-center justify-center top-0 left-0 w-full h-screen">
                    <div
                        className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                        onClick={() => setIsDialogOpen(false)}
                    ></div>
                    <div
                        className="w-[300px] h-auto py-3 dark:bg-slate-800 bg-white rounded relative z-10"
                    >
                        <div className="w-full flex items-end justify-end px-3">
                            <RxCross1
                                className="text-[2rem] dark:text-slate-200 dark:bg-slate-900/40 p-2 bg-[#3d3d3d18] text-[#222222] rounded-full cursor-pointer"
                                onClick={() => setIsDialogOpen(false)}
                            />
                        </div>
                        <h1 className="text-[1.2rem] text-[#424242] dark:text-[#abc2d3] font-[500] px-6 py-3">
                            Set backup account
                        </h1>
                        <h2
                            className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                        >
                          <span>
                            <FaUser className="text-[2rem] text-[#1b703f] p-2 dark:bg-green-800/30 dark:text-green-500 rounded-full bg-[#15a7522d]" />
                          </span>
                            user@gmail.com
                        </h2>
                        <h2
                            className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                        >
                          <span>
                            <FaUser className="text-[2rem] text-[#1b703f] p-2 dark:bg-green-800/30 dark:text-green-500 rounded-full bg-[#15a7522d]" />
                          </span>
                            user02@gmail.com
                        </h2>
                        <h2
                            className="flex items-center gap-3 text-[1rem] hover:bg-[#f1f1f1] py-3 px-6 cursor-pointer transition duration-300 dark:text-[#abc2d3] dark:hover:bg-slate-900/40"
                        >
                          <span>
                            <FaPlus className="text-[2rem] text-[#303030] p-2 dark:text-gray-300 dark:bg-gray-700 rounded-full bg-[#3d3d3d2c]" />
                          </span>
                            Add Account
                        </h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;
                  '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader text={"alert dialog"} id={"alert_dialog"}/>
                    </div>

                    <ComponentDescription text='An alert dialog component displays critical information or requests
            user confirmation.'/>

                    <ToggleTab code={alertDialogCode} setCode={setAlertDialogCode} preview={alertDialogPreview}
                               setPreview={setAlertDialogPreview}/>

                    <ComponentWrapper>
                        {alertDialogPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="flex items-center flex-col gap-5">
                                    <button
                                        className="px-6 py-2 border border-primary outline-none rounded text-primary"
                                        onClick={() => setIsAlertDialogOpen(true)}
                                    >
                                        Open Simple Dialog
                                    </button>

                                    {isAlertDialogOpen && (
                                        <div
                                            className="bg-[#00000027] z-[2000000000] fixed flex
                  items-center justify-center top-0 left-0 w-full h-screen"
                                        >
                                            <div
                                                className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                                                onClick={() => setIsAlertDialogOpen(false)}
                                            ></div>
                                            <div
                                                className="max-w-md w-[90vw] dark:bg-slate-800 h-auto bg-white rounded relative z-10 px-4 py-3">
                                                <h1 className="font-semibold dark:text-[#abc2d3] text-xl mb-2">
                                                    Delete Item
                                                </h1>
                                                <p className="text-gray-600 dark:text-slate-400 mb-2">
                                                    Are you sure you want to delete this? This action
                                                    cannot be undone.
                                                </p>
                                                <div className="w-full flex items-center justify-end gap-2">
                                                    <button
                                                        className="font-semibold px-1.5 dark:hover:bg-red-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-red-500"
                                                        onClick={() => setIsAlertDialogOpen(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        className="font-semibold px-1.5 dark:hover:bg-blue-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-blue-600"
                                                        onClick={() => setIsAlertDialogOpen(false)}
                                                    >
                                                        Confirm
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {alertDialogCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Dialog = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <>
            {dialogOpen && (
                <div
                    className="bg-[#00000027] z-[2000000000] fixed flex
                  items-center justify-center top-0 left-0 w-full h-screen"
                >
                    <div
                        className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                        onClick={() => setDialogOpen(false)}
                    ></div>
                    <div className="max-w-md w-[90vw] dark:bg-slate-800 h-auto bg-white rounded relative z-10 px-4 py-3">
                        <h1 className="font-semibold dark:text-[#abc2d3] text-xl mb-2">
                            Delete Item
                        </h1>
                        <p className="text-gray-600 dark:text-slate-400 mb-2">
                            Are you sure you want to delete this? This action
                            cannot be undone.
                        </p>
                        <div className="w-full flex items-center justify-end gap-2">
                            <button
                                className="font-semibold px-1.5 dark:hover:bg-red-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-red-500"
                                onClick={() => setDialogOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="font-semibold px-1.5 dark:hover:bg-blue-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-blue-600"
                                onClick={() => setDialogOpen(false)}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Dialog;
                  '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl="/components/alert-message"
                        backName="alert message"
                        forwardName="testimonial"
                        forwardUrl="/components/testimonials"
                    />
                </div>

                <ContentNavbar contents={dialogContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Feedback - Dialog Message</title>
            </Helmet>
        </>
    );
};

export default Dialog;
