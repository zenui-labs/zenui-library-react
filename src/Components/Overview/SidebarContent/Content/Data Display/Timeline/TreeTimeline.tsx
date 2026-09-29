import {useState} from "react";

import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.tsx";
import {FaBriefcase, FaGraduationCap} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";

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
            language: 'tsx',
            displayText: 'Timeline.tsx',
            code: `import React from "react";

import {TimelineData} from "./Data"

const Timeline = () => {

    return (
        <div className="w-full mx-auto p-6 ">
            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                Tree Timeline
            </h1>

            <div>
                <ul className="relative h-fit before:content-[''] before:absolute before:w-1 before:h-full before:bg-gray-200 dark:before:bg-slate-800 before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-md before:z-10">
                    {TimelineData.map((milestone, index) => (
                        <li
                            key={index}
                            className={\`relative w-1/2  mb-4 \${
                                index % 2 === 0 ? "text-right" : " left-1/2 text-left"
                            }\`}
                        >
                            <div
                                id="icon"
                                className={\`absolute top-1/2 -translate-y-1/2  \${
                                    index % 2 === 0
                                        ? "translate-x-1/2 right-0"
                                        : "-translate-x-1/2"
                                }  bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10\`}
                            >
                                {milestone.icon}
                            </div>

                            <div
                                className={\`relative border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900 shadow-gray-50 border-gray-200/60 shadow-md \${
                                    index % 2 === 0 ? "-left-8" : "-right-8"
                                }\`}
                            >
                                <div
                                    className='py-3 px-4'
                                >
                                    <div>
                                        <div className="text-[#424242] dark:text-[#abc2d3] text-lg font-semibold">
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
    );
};

export default Timeline;
`
        },
        {
            id: 'data',
            language: 'tsx',
            displayText: 'Data.tsx',
            code: `import type {ReactNode} from "react";
import {FaBriefcase, FaGraduationCap} from "react-icons/fa";

export interface Milestone {
    date: string;
    title: string;
    description: string;
    icon: ReactNode;
}

const briefcaseIcon = <FaBriefcase className="fill-gray-500 dark:fill-[#abc2d3] w-5 h-5"/>;
const graduationCapIcon = <FaGraduationCap className="fill-gray-500 dark:fill-[#abc2d3] w-5 h-5"/>;

export const TimelineData: Milestone[] = [
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
    ];`
        }
    ]

    return (
        <div>
            <ContentHeader
                className={"mt-8"}
                text={"tree timeline"}
                id={"tree_timeline"}
            />

            <ComponentDescription text='A tree-style timeline with entries alternating on either side of a central line, tracking milestones in chronological order.'/>

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
