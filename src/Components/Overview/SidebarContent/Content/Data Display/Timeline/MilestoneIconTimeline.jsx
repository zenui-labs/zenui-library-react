import {useState} from "react";

import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.jsx";
import {FaBriefcase, FaGraduationCap} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";

const MilestoneIconTimeline = () => {
    // milestone timeline
    const [milestoneTimelinePreview, setMilestoneTimelinePreview] =
        useState(true);
    const [milestoneTimelineCode, setMilestoneTimelineCode] = useState(false);

    const briefcaseIcon = <FaBriefcase className="fill-white w-5 h-5"/>;
    const graduationCapIcon = <FaGraduationCap className="fill-white w-5 h-5"/>;

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
                '        <div className="max-w-4xl mx-auto p-6">\n' +
                '            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">\n' +
                '                Milestone Icon Timeline\n' +
                '            </h1>\n' +
                '            <div className="relative border-l-[5px] dark:border-slate-700 border-gray-300">\n' +
                '                {TimelineData.map((milestone, index) => (\n' +
                '                    <div key={index} className="mb-8 relative ">\n' +
                '                        <div\n' +
                '                            id="icon"\n' +
                '                            className={`absolute border-2 border-white top-5 -left-[2.5px] transform -translate-x-1/2 -translate-y-1/2 bg-[#3B9DF8] dark:border-slate-600 rounded-full p-2 z-10`}\n' +
                '                        >\n' +
                '                            {milestone.icon}\n' +
                '                        </div>\n' +
                '                        <div className="pl-6 ">\n' +
                '                            <div className="flex sm:items-center sm:flex-row flex-col">\n' +
                '                                <div className="text-[#3B9DF8] font-semibold">\n' +
                '                                    {milestone.date}\n' +
                '                                </div>\n' +
                '                                <div className="sm:ml-4 dark:text-[#abc2d3] text-[#424242] text-lg font-semibold">\n' +
                '                                    {milestone.title}\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <p className="text-gray-500 dark:text-slate-400 text-[0.9rem] mt-1">\n' +
                '                                {milestone.description}\n' +
                '                            </p>\n' +
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
                text={"milestone icon timeline"}
                id={"milestone_icon_timeline"}
            />

            <ComponentDescription text=' A milestone timeline highlights key events or achievements in a project,
        visually tracking important deadlines and accomplishments along a
        chronological path.'/>

            <ToggleTab code={milestoneTimelineCode} setCode={setMilestoneTimelineCode}
                       preview={milestoneTimelinePreview} setPreview={setMilestoneTimelinePreview}/>

            <ComponentWrapper>
                {milestoneTimelinePreview && (
                    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                        <div className="max-w-4xl mx-auto p-6">
                            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                                Milestone Icon Timeline
                            </h1>
                            <div className="relative border-l-[5px] dark:border-slate-700 border-gray-300">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="mb-8 relative ">
                                        <div
                                            id="icon"
                                            className={`absolute border-2 border-white top-5 -left-[2.5px] transform -translate-x-1/2 -translate-y-1/2  bg-primary dark:border-slate-600 rounded-full p-2 z-10`}
                                        >
                                            {milestone.icon}
                                        </div>
                                        <div className="pl-6 ">
                                            <div className="flex 640px:items-center 640px:flex-row flex-col">
                                                <div className="text-primary  font-semibold">
                                                    {milestone.date}
                                                </div>
                                                <div
                                                    className="640px:ml-4 dark:text-[#abc2d3] text-text text-lg font-semibold">
                                                    {milestone.title}
                                                </div>
                                            </div>
                                            <p className="text-gray-500 dark:text-slate-400 text-[0.9rem] mt-1">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {milestoneTimelineCode && (
                    <ShowCode
                        code={codes}
                    />
                )}
            </ComponentWrapper>

        </div>
    );
};

export default MilestoneIconTimeline;
