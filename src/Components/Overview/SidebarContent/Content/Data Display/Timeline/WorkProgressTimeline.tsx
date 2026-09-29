import {useState} from "react";
import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.tsx";

// import react icons
import {FaRegComment, FaRegFileAlt} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";

const WorkProgressTimeline = () => {
    // workHistoryPreview
    const [workHistoryPreview, setWorkHistoryPreview] = useState(true);
    const [workHistoryCode, setWorkHistoryCode] = useState(false);

    const workHistorys = [
        {
            date: "Jan 22",
            title: "Posted assignments of work",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: true,
        },
        {
            date: "Dec 12",
            title: "Uploaded Assignments File",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: false,
            fileBtn: false,
        },
        {
            date: "Nov 18",
            title: "Asked to bring good stuff college",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: true,
        },
        {
            date: "Nov 04",
            title: "Presentation Requirement",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: false,
        },
        {
            date: "Oct 15",
            title: "File handouts",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: false,
            fileBtn: false,
        },
    ];

    const codes = [
        {
            id: 'main_codes',
            displayText: 'Timeline.tsx',
            language: 'tsx',
            code: `import React from "react";

// data
import {TimelineData} from "./Data"

// react icons
import {FaRegComment, FaRegFileAlt} from "react-icons/fa";

const Timeline = () => {
    
    return (
        <div className="w-[55%] sm:w-[70%] mx-auto">
            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                Work Progress
            </h1>
            <div className="relative border-l dark:border-slate-700 border-gray-300 w-full">
                {TimelineData?.map((milestone, index) => (
                    <div key={index} className="mb-8">
                        <div className="pl-6 w-full">
                            <div className="flex items-center">
                                <div className="text-gray-600 text-[1rem] dark:text-[#abc2d3] absolute left-[-75px]">
                                    {milestone.date}
                                </div>
                                <div className="text-[#424242] dark:text-[#abc2d3] text-lg">
                                    {milestone.title}
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-slate-400 mt-1 text-[0.9rem]">
                                {milestone.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-[20px] mt-[10px]">
                                {milestone.commentBtn && (
                                    <button
                                        className="flex items-center gap-[9px] text-gray-400 rounded-md px-4 py-1 text-[0.9rem]">
                                        <FaRegComment/> 5 comments
                                    </button>
                                )}

                                {milestone.fileBtn && (
                                    <button
                                        className="flex items-center gap-[9px] border-[#3B9DF8] border text-[#3B9DF8] rounded-md px-4 py-1 text-[0.9rem]">
                                        <FaRegFileAlt/> FantechProp..
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
`
        },
        {
            id: 'data',
            displayText: 'Data.ts',
            language: 'ts',
            code: `export const TimelineData = [
        {
            date: "Jan 22",
            title: "Posted assignments of work",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: true,
        },
        {
            date: "Dec 12",
            title: "Uploaded Assignments File",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: false,
            fileBtn: false,
        },
        {
            date: "Nov 18",
            title: "Asked to bring good stuff college",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: true,
        },
        {
            date: "Nov 04",
            title: "Presentation Requirement",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: true,
            fileBtn: false,
        },
        {
            date: "Oct 15",
            title: "File handouts",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",
            commentBtn: false,
            fileBtn: false,
        },
    ];`
        },
    ]

    return (
        <div>
            <ContentHeader
                className={"mt-8"}
                text={"work progress timeline"}
                id={"work_progress_timeline"}
            />

            <ComponentDescription text='A work progress timeline that shows the stages of a project in order, including milestones, completed steps, and upcoming phases.'/>

            <ToggleTab code={workHistoryCode} setCode={setWorkHistoryCode} preview={workHistoryPreview}
                       setPreview={setWorkHistoryPreview}/>

            <ComponentWrapper>
                {workHistoryPreview && (
                    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                        <div className="w-[55%] 640px:w-[70%] mx-auto">
                            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                                Work Progress
                            </h1>
                            <div className="relative border-l dark:border-slate-700 border-gray-300 w-full">
                                {workHistorys?.map((milestone, index) => (
                                    <div key={index} className="mb-8">
                                        <div className="pl-6 w-full">
                                            <div className="flex items-center">
                                                <div
                                                    className="text-gray-600 text-[1rem] dark:text-[#abc2d3] absolute left-[-75px]">
                                                    {milestone.date}
                                                </div>
                                                <div className="text-text dark:text-[#abc2d3] text-lg">
                                                    {milestone.title}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 dark:text-slate-400 mt-1 text-[0.9rem]">
                                                {milestone.description}
                                            </p>

                                            <div className="flex flex-wrap items-center gap-[20px] mt-[10px]">
                                                {milestone.commentBtn && (
                                                    <button
                                                        className="flex items-center gap-[9px] text-gray-400 rounded-md px-4 py-1 text-[0.9rem]">
                                                        <FaRegComment/> 5 comments
                                                    </button>
                                                )}

                                                {milestone.fileBtn && (
                                                    <button
                                                        className="flex items-center gap-[9px] border-primary border  text-primary rounded-md px-4 py-1 text-[0.9rem]">
                                                        <FaRegFileAlt/> FantechProp..
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {workHistoryCode && (
                    <ShowCode
                        code={codes}
                    />
                )}
            </ComponentWrapper>

        </div>
    );
};

export default WorkProgressTimeline;
