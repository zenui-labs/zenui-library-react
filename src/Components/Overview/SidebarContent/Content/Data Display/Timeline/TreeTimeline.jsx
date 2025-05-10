import {useState} from "react";

import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.jsx";
import {FaBriefcase, FaGraduationCap} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";

const TreeTimeline = () => {
    // milestone timeline
    const [treeTimelinePreview, setTreeTimelinePreview] = useState(true);
    const [treeTimelineCode, setTreeTimelineCode] = useState(false);

    const briefcaseIcon = <FaBriefcase className="fill-gray-500 dark:fill-[#abc2d3] w-5 h-5"/>;
    const graduationCapIcon = <FaGraduationCap className="fill-gray-500 dark:fill-[#abc2d3] w-5 h-5"/>;

    const milestones = [
        {
            date: "January 2024",
            title: "B.Tech",
            description: "B.Tech graduate with specialization in CSE",
            icon: graduationCapIcon,
        },
        {
            date: "February 2024",
            title: "Design Phase",
            description: "Finalizing designs and mockups.",
            icon: briefcaseIcon,
        },
        {
            date: "March 2024",
            title: "Development Phase",
            description: "Starting the development of the project.",
            icon: briefcaseIcon,
        },
        {
            date: "April 2024",
            title: "Testing Phase",
            description: "Testing and quality assurance.",
            icon: briefcaseIcon,
        },
        {
            date: "May 2024",
            title: "Launch",
            description: "Official project launch.",
            icon: briefcaseIcon,
        },
    ];

    const codes = [
        {
            id: 'main_codes',
            language: 'jsx',
            displayText: 'Timeline.jsx',
            code: 'import React from "react";\n' +
                '\n' +
                'import {TimelineData} from "./Data.js"\n' +
                '\n' +
                'const Timeline = () => {\n' +
                '\n' +
                '    return (\n' +
                '        <div className="w-full mx-auto p-6 ">\n' +
                '            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">\n' +
                '                Tree Timeline\n' +
                '            </h1>\n' +
                '\n' +
                '            <div>\n' +
                '                <ul className="relative h-fit before:content-[\'\'] before:absolute before:w-1 before:h-full before:bg-gray-200 dark:before:bg-slate-800 before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-md before:z-10">\n' +
                '                    {TimelineData.map((milestone, index) => (\n' +
                '                        <li\n' +
                '                            key={index}\n' +
                '                            className={`relative w-1/2  mb-4 ${\n' +
                '                                index % 2 === 0 ? "text-right" : " left-1/2 text-left"\n' +
                '                            }`}\n' +
                '                        >\n' +
                '                            <div\n' +
                '                                id="icon"\n' +
                '                                className={`absolute top-1/2 -translate-y-1/2  ${\n' +
                '                                    index % 2 === 0\n' +
                '                                        ? "translate-x-1/2 right-0"\n' +
                '                                        : "-translate-x-1/2"\n' +
                '                                }  bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10`}\n' +
                '                            >\n' +
                '                                {milestone.icon}\n' +
                '                            </div>\n' +
                '\n' +
                '                            <div\n' +
                '                                className={`relative border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900 shadow-gray-50 border-gray-200/60 shadow-md ${\n' +
                '                                    index % 2 === 0 ? "-left-8" : "-right-8"\n' +
                '                                }`}\n' +
                '                            >\n' +
                '                                <div\n' +
                '                                    className=\'py-3 px-4\'\n' +
                '                                >\n' +
                '                                    <div>\n' +
                '                                        <div className="text-[#424242] dark:text-[#abc2d3] text-lg font-semibold">\n' +
                '                                            {milestone.title}\n' +
                '                                        </div>\n' +
                '                                        <div className="text-primary text-sm">\n' +
                '                                            {milestone.date}\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                    <p className="mt-1 text-sm dark:text-slate-400 text-gray-600">{milestone.description}</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </li>\n' +
                '                    ))}\n' +
                '                </ul>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default Timeline;\n'
        },
        {
            id: 'data',
            language: 'js',
            displayText: 'Data.js',
            code: 'export const TimelineData = [\n' +
                '        {\n' +
                '            date: "January 2024",\n' +
                '            title: "B.Tech",\n' +
                '            description: "B.Tech graduate with specialization in CSE",\n' +
                '            icon: graduationCapIcon,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "February 2024",\n' +
                '            title: "Design Phase",\n' +
                '            description: "Finalizing designs and mockups.",\n' +
                '            icon: briefcaseIcon,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "March 2024",\n' +
                '            title: "Development Phase",\n' +
                '            description: "Starting the development of the project.",\n' +
                '            icon: briefcaseIcon,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "April 2024",\n' +
                '            title: "Testing Phase",\n' +
                '            description: "Testing and quality assurance.",\n' +
                '            icon: briefcaseIcon,\n' +
                '        },\n' +
                '        {\n' +
                '            date: "May 2024",\n' +
                '            title: "Launch",\n' +
                '            description: "Official project launch.",\n' +
                '            icon: briefcaseIcon,\n' +
                '        },\n' +
                '    ];'
        }
    ]

    return (
        <div>
            <ContentHeader
                className={"mt-8"}
                text={"tree timeline"}
                id={"tree_timeline"}
            />

            <ComponentDescription text='A milestone timeline highlights key events or achievements in a project,
        visually tracking important deadlines and accomplishments along a
        chronological path.'/>

            <ToggleTab code={treeTimelineCode} setCode={setTreeTimelineCode} setPreview={setTreeTimelinePreview}
                       preview={treeTimelinePreview}/>

            <ComponentWrapper>
                {treeTimelinePreview && (
                    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                        <div className="w-full mx-auto p-6 ">
                            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                                Tree Timeline
                            </h1>

                            <div>
                                <ul className="relative h-fit before:content-[''] before:absolute before:w-1 before:h-full before:bg-gray-200 dark:before:bg-slate-800 before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-md before:z-10">
                                    {milestones.map((milestone, index) => (
                                        <li
                                            key={index}
                                            className={`relative w-1/2  mb-4 ${
                                                index % 2 === 0 ? "text-right" : " left-1/2 text-left"
                                            }`}
                                        >
                                            <div
                                                id="icon"
                                                className={`absolute top-1/2 -translate-y-1/2  ${
                                                    index % 2 === 0
                                                        ? "translate-x-1/2 right-0"
                                                        : "-translate-x-1/2"
                                                }  bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10`}
                                            >
                                                {milestone.icon}
                                            </div>

                                            <div
                                                className={`relative border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900 shadow-gray-50 border-gray-200/60 shadow-md ${
                                                    index % 2 === 0 ? "-left-8" : "-right-8"
                                                }`}
                                            >
                                                <div
                                                    className='py-3 px-4'
                                                >
                                                    <div>
                                                        <div
                                                            className="text-text dark:text-[#abc2d3] text-lg font-semibold">
                                                            {milestone.title}
                                                        </div>
                                                        <div className="text-primary text-sm">
                                                            {milestone.date}
                                                        </div>
                                                    </div>
                                                    <p className="mt-1 text-sm dark:text-slate-400 text-gray-600">{milestone.description}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {treeTimelineCode && (
                    <ShowCode
                        code={codes}
                    />
                )}
            </ComponentWrapper>

        </div>
    );
};

export default TreeTimeline;
