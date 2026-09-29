import {useState} from "react";
import ContentHeader from "@shared/ContentHeader";
import ShowCode from "@shared/Component/ShowCode.tsx";

import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";

const MilestoneTimeline = () => {
    // milestone timeline
    const [milestoneTimelinePreview, setMilestoneTimelinePreview] =
        useState(true);
    const [milestoneTimelineCode, setMilestoneTimelineCode] = useState(false);

    const milestones = [
        {
            date: "January 2024",
            title: "Project Kickoff",
            description: "Initial planning and kickoff meeting.",
        },
        {
            date: "February 2024",
            title: "Design Phase",
            description: "Finalizing designs and mockups.",
        },
        {
            date: "March 2024",
            title: "Development Phase",
            description: "Starting the development of the project.",
        },
        {
            date: "April 2024",
            title: "Testing Phase",
            description: "Testing and quality assurance.",
        },
        {
            date: "May 2024",
            title: "Launch",
            description: "Official project launch.",
        },
    ];

    const codes = [
        {
            id: 'main_code',
            language: 'tsx',
            displayText: 'Timeline.tsx',
            code: `import React from "react";
import {TimelineData} from "./Data"

const Timeline = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                Milestone Timeline
            </h1>
            <div className="relative border-l dark:border-slate-700 border-gray-300">
                {TimelineData.map((milestone, index) => (
                    <div key={index} className="mb-8">
                        <div
                            className="absolute w-5 h-5 bg-[#3B9DF8] dark:border-slate-700 z-10 border-4 border-white rounded-full left-[0px] transform -translate-x-1/2 -translate-y-1/2"/>
                        <div className="pl-6">
                            <div className="flex sm:items-center sm:flex-row flex-col">
                                <div className="text-[#3B9DF8] font-semibold">
                                    {milestone.date}
                                </div>
                                <div className="sm:ml-4 dark:text-[#abc2d3] text-[#424242] text-lg font-semibold">
                                    {milestone.title}
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-slate-400 mt-1">
                                {milestone.description}
                            </p>
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
            language: 'ts',
            displayText: 'Data.ts',
            code: `export const TimelineData = [
        {
            date: "January 2024",
            title: "Project Kickoff",
            description: "Initial planning and kickoff meeting.",
        },
        {
            date: "February 2024",
            title: "Design Phase",
            description: "Finalizing designs and mockups.",
        },
        {
            date: "March 2024",
            title: "Development Phase",
            description: "Starting the development of the project.",
        },
        {
            date: "April 2024",
            title: "Testing Phase",
            description: "Testing and quality assurance.",
        },
        {
            date: "May 2024",
            title: "Launch",
            description: "Official project launch.",
        },
    ];`
        },
    ]

    return (
        <div>
            <ContentHeader text={"milestone timeline"} id={"milestone_timeline"}/>

            <ComponentDescription text='A milestone timeline that highlights key events, deadlines, and achievements along a chronological path.'/>

            <ToggleTab code={milestoneTimelineCode} setPreview={setMilestoneTimelinePreview}
                       setCode={setMilestoneTimelineCode} preview={milestoneTimelinePreview}/>

            <ComponentWrapper>
                {milestoneTimelinePreview && (
                    <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                        <div className="max-w-4xl mx-auto p-6">
                            <h1 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                                Milestone Timeline
                            </h1>
                            <div className="relative border-l dark:border-slate-700 border-gray-300">
                                {milestones.map((milestone, index) => (
                                    <div key={index} className="mb-8">
                                        <div
                                            className="absolute w-5 h-5 bg-primary dark:border-slate-700 z-10 border-4 border-white rounded-full left-[0px] transform -translate-x-1/2 -translate-y-1/2"/>
                                        <div className="pl-6">
                                            <div className="flex 640px:items-center 640px:flex-row flex-col">
                                                <div className="text-primary  font-semibold">
                                                    {milestone.date}
                                                </div>
                                                <div
                                                    className="640px:ml-4 dark:text-[#abc2d3] text-text text-lg font-semibold">
                                                    {milestone.title}
                                                </div>
                                            </div>
                                            <p className="text-gray-600 dark:text-slate-400 mt-1">
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

export default MilestoneTimeline;
