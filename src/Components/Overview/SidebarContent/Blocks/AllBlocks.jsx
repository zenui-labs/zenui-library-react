import React, {useState, useEffect} from "react";

// card component
import {Helmet} from "react-helmet";
import {AllBlocksData} from "../../../../Utils/AllBlocks.js";
import BlocksFooter from "../../../../Shared/Block/BlocksFooter.jsx";

const AllBlocks = () => {
    const [sections, setSections] = useState([]);
    const [forms, setForms] = useState([]);
    const [emptyPages, setEmptyPages] = useState([]);
    const [randoms, setRandoms] = useState([]);

    useEffect(() => {
        const sectionsData = [];
        const formsData = [];
        const emptyPagesData = [];
        const randomsData = [];

        AllBlocksData?.forEach((componentObj) => {
            if (componentObj.groupName === "section") {
                sectionsData.push(componentObj);
            } else if (componentObj.groupName === "form") {
                formsData.push(componentObj);
            } else if (componentObj.groupName === "empty_page") {
                emptyPagesData.push(componentObj);
            } else if (componentObj.groupName === "random") {
                randomsData.push(componentObj);
            }
        });

        setSections(sectionsData);
        setForms(formsData);
        setEmptyPages(emptyPagesData);
        setRandoms(randomsData);
    }, [AllBlocksData]);

    return (
        <>
            <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <h2 className="font-[600] text-brandColor uppercase text-[2rem] 425px:text-[2.5rem]">
                    ZenUI Blocks
                </h2>
                <p className="text-text dark:text-darkSubTextColor text-[0.9rem]">
                    Free & Professional-Grade UI Components for Your Projects.
                </p>

                <p className="text-text dark:text-darkSubTextColor text-[0.9rem] mt-8">
                    ZenUI offers a wide range of beautifully designed, free UI components for developers and designers.
                    Whether you’re building websites or applications, our components are easy to integrate and use in
                    any project. Each block is carefully crafted with clean, professional-grade code, ensuring
                    reliability and flexibility. Get access to all these components for free and follow our detailed
                    guidelines to seamlessly incorporate them into your projects.
                </p>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Sections</h2>
                <div className="grid grid-cols-2 425px:grid-cols-3 mt-4 gap-8">
                    {sections?.map((button, index) => (
                        <a href={button.url} className="border border-border dark:border-slate-700 rounded" key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-slate-700 border-border p-4">
                                <h2 className="text-text dark:text-darkSubTextColor font-[600] text-[1rem] capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Forms</h2>
                <div className="grid grid-cols-2 425px:grid-cols-3 mt-4 gap-8">
                    {forms?.map((button, index) => (
                        <a href={button.url} className="border border-border dark:border-slate-700 rounded" key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-slate-700 border-border p-4">
                                <h2 className="text-text dark:text-darkSubTextColor font-[600] text-[1rem] capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] mb-3 text-brandColor">Empty Pages</h2>
                <div className="grid grid-cols-2 425px:grid-cols-3 gap-8">
                    {emptyPages?.map((button, index) => (
                        <a href={button.url} className="border border-border dark:border-slate-700 rounded" key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-slate-700 border-border p-4">
                                <h2 className="text-text dark:text-darkSubTextColor font-[600] text-[1rem] capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>

                <h2 className="mt-12 font-[600] text-[1.5rem] text-brandColor">Randoms</h2>
                <div className="grid grid-cols-2 425px:grid-cols-3 mt-4 gap-8">
                    {randoms?.map((button, index) => (
                        <a href={button.url} className="border border-border dark:border-slate-700 rounded" key={index}>
                            <img
                                src={button.image}
                                alt="component/image"
                                className="w-full h-[150px] rounded-t object-contain"
                            />
                            <div className="border-t dark:border-slate-700 border-border p-4">
                                <h2 className="text-text dark:text-darkSubTextColor font-[600] text-[1rem] capitalize">
                                    {button.title}
                                </h2>
                            </div>
                        </a>
                    ))}
                </div>
            </aside>

            <div className='px-5 425px:px-10'>
                <BlocksFooter backUrl='/components/snippet' backName='snippet' forwardName='responsive navbar'
                              forwardUrl='/blocks/responsive-navbar'/>
            </div>
            <Helmet>
                <title>ZenUI All Blocks</title>
            </Helmet>
        </>
    );
};

export default AllBlocks;
