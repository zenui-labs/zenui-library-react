import React, {useEffect, useState} from "react";

// card component
import {Helmet} from "react-helmet";
import {allComponents} from "@utils/AllComponents";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

const AllComponents = () => {
    const [buttonsData, setButtonsData] = useState([]);
    const [inputsData, setInputsData] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [navigationsData, setNavigationsData] = useState([]);
    const [surfaceData, setSurfaceData] = useState([]);
    const [feedbackData, setFeedbackData] = useState([]);

    useEffect(() => {
        const buttons = [];
        const inputs = [];
        const surfaces = [];
        const feedbacks = [];
        const displays = [];
        const navigations = [];

        allComponents?.forEach((componentObj) => {
            if (componentObj.groupName === "button") {
                buttons.push(componentObj);
            } else if (componentObj.groupName === "input") {
                inputs.push(componentObj);
            } else if (componentObj.groupName === "surface") {
                surfaces.push(componentObj);
            } else if (componentObj.groupName === "feedback") {
                feedbacks.push(componentObj);
            } else if (componentObj.groupName === "data_display") {
                displays.push(componentObj);
            } else if (componentObj.groupName === "navigation") {
                navigations.push(componentObj);
            }
        });

        setButtonsData(buttons);
        setInputsData(inputs);
        setSurfaceData(surfaces);
        setFeedbackData(feedbacks);
        setDisplayData(displays);
        setNavigationsData(navigations);
    }, [allComponents]);

    return (
        <>
            <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <h2 className="font-[600] text-brandColor uppercase text-[2rem] 425px:text-[2.5rem]">
                    ZenUI components
                </h2>
                <p className="text-text dark:text-darkSubTextColor text-[1rem]">
                    Every ZenUI Library component available for free.
                </p>

                <p className="text-text dark:text-darkSubTextColor text-[1rem] mt-8">
                    ZenUI is a website where you can get all the component designs you
                    want and they are completely free. You can copy and use them in your
                    own projects from here. All the guidelines are given very nicely on
                    the website so that you can understand everything well. Our components
                    are developed following professional coding so you can use them with
                    confidence.
                </p>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Input</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 mt-4 gap-8">
                    {inputsData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Navigation</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 mt-4 gap-8">
                    {navigationsData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] mb-3 text-brandColor">Buttons</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 gap-8">
                    {buttonsData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Feedback</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 mt-4 gap-8">
                    {feedbackData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] mb-3 text-brandColor">Surface</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 gap-8">
                    {surfaceData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] mb-3 text-brandColor">Data Display</h2>
                <div className="grid grid-cols-2 640px:grid-cols-3 1605px:grid-cols-4 gap-8">
                    {displayData?.map((button, index) => (
                        <a href={button.url}
                           className="border border-border transition-all duration-200 hover:shadow-[0px_40px_30px_-20px_rgba(107,110,148,.04)] dark:border-darkBorderColor rounded-high"
                           key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-darkBorderColor border-border p-4">
                                <h2 className="text-text font-[600] text-[1rem] dark:text-darkSubTextColor capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>
            </aside>

            <div className='px-8 425px:px-10'>
                <BlocksFooter backUrl='/getting-started/templates' backName='templates' forwardName='input'
                              forwardUrl='/components/input-text'/>
            </div>
            <Helmet>
                <title>ZenUI All Components</title>
            </Helmet>
        </>
    );
};

export default AllComponents;
