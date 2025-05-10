import {useState} from "react";
import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.jsx";

// import react icons
import {FaRegComment, FaRegFileAlt} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";

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
            displayText: 'Timeline.jsx',
            language: 'jsx',
            code: 'import React from "react";\n' +
                '\n' +
                '// data\n' +
                'import {TimelineData} from "./Data.js"\n' +
                '\n' +
                '// react icons\n' +
                'import {FaRegComment, FaRegFileAlt} from "react-icons/fa";\n' +
                '\n' +
                'const Timeline = () => {\n' +
                '    \n' +
                '    return (\n' +
                '        <div className="w-[55%] sm:w-[70%] mx-auto">\n' +
                '            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">\n' +
                '                Work Progress\n' +
                '            </h1>\n' +
                '            <div className="relative border-l dark:border-slate-700 border-gray-300 w-full">\n' +
                '                {TimelineData?.map((milestone, index) => (\n' +
                '                    <div key={index} className="mb-8">\n' +
                '                        <div className="pl-6 w-full">\n' +
                '                            <div className="flex items-center">\n' +
                '                                <div className="text-gray-600 text-[1rem] dark:text-[#abc2d3] absolute left-[-75px]">\n' +
                '                                    {milestone.date}\n' +
                '                                </div>\n' +
                '                                <div className="text-[#424242] dark:text-[#abc2d3] text-lg">\n' +
                '                                    {milestone.title}\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <p className="text-gray-500 dark:text-slate-400 mt-1 text-[0.9rem]">\n' +
                '                                {milestone.description}\n' +
                '                            </p>\n' +
                '\n' +
                '                            <div className="flex flex-wrap items-center gap-[20px] mt-[10px]">\n' +
                '                                {milestone.commentBtn && (\n' +
                '                                    <button\n' +
                '                                        className="flex items-center gap-[9px] text-gray-400 rounded-md px-4 py-1 text-[0.9rem]">\n' +
                '                                        <FaRegComment/> 5 comments\n' +
                '                                    </button>\n' +
                '                                )}\n' +
                '\n' +
                '                                {milestone.fileBtn && (\n' +
                '                                    <button\n' +
                '                                        className="flex items-center gap-[9px] border-[#3B9DF8] border text-[#3B9DF8] rounded-md px-4 py-1 text-[0.9rem]">\n' +
                '                                        <FaRegFileAlt/> FantechProp..\n' +
                '                                    </button>\n' +
                '                                )}\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                ))}\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default Timeline;\n'
        },
        {
            id: 'data',
            displayText: 'Data.jsx',
            language: 'js',
            code: 'export const TimelineData = [\n' +
                '        {\n' +
                '            date: "Jan 22",\n' +
                '            title: "Posted assignments of work",\n' +
                '            description:\n' +
                '                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",\n' +
                '            commentBtn: true,\n' +
                '            fileBtn: true,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "Dec 12",\n' +
                '            title: "Uploaded Assignments File",\n' +
                '            description:\n' +
                '                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",\n' +
                '            commentBtn: false,\n' +
                '            fileBtn: false,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "Nov 18",\n' +
                '            title: "Asked to bring good stuff college",\n' +
                '            description:\n' +
                '                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",\n' +
                '            commentBtn: true,\n' +
                '            fileBtn: true,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "Nov 04",\n' +
                '            title: "Presentation Requirement",\n' +
                '            description:\n' +
                '                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",\n' +
                '            commentBtn: true,\n' +
                '            fileBtn: false,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "Oct 15",\n' +
                '            title: "File handouts",\n' +
                '            description:\n' +
                '                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit arcu aliquet ut dui egestas.",\n' +
                '            commentBtn: false,\n' +
                '            fileBtn: false,\n' +
                '        },\n' +
                '    ];'
        },
    ]

    return (
        <div>
            <ContentHeader
                className={"mt-8"}
                text={"work progress timeline"}
                id={"work_progress_timeline"}
            />

            <ComponentDescription text='A work progress timeline visually represents the stages of a project or
        task over time, showing milestones, completed steps, and upcoming phases
        in a sequential order.'/>

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
