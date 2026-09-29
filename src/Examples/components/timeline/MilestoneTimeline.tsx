import type {CSSProperties} from "react";

export interface Milestone {
    /** Shown in the accent color before the title, for example "January 2024". */
    date: string;
    title: string;
    description: string;
}

export interface MilestoneTimelineProps {
    items: Milestone[];
    /** Heading above the timeline. Pass an empty string to hide it. */
    heading?: string;
    /** Color of the dots and dates. Any CSS color. */
    accentColor?: string;
    className?: string;
}

/** A vertical timeline with a dot per milestone, the date next to the title and a short description below. */
export const MilestoneTimeline = ({
    items,
    heading = "Milestone timeline",
    accentColor = "#3B9DF8",
    className = "",
}: MilestoneTimelineProps) => (
    <div
        className={`max-w-4xl mx-auto p-6 ${className}`}
        style={{"--timeline-accent": accentColor} as CSSProperties}
    >
        {heading && (
            <h2 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                {heading}
            </h2>
        )}
        <ol className="relative border-l dark:border-slate-700 border-gray-300">
            {items.map((milestone) => (
                <li key={`${milestone.date}-${milestone.title}`} className="mb-8">
                    <span
                        aria-hidden
                        className="absolute w-5 h-5 bg-[var(--timeline-accent)] dark:border-slate-700 z-10 border-4 border-white rounded-full left-[0px] transform -translate-x-1/2 -translate-y-1/2"
                    />
                    <div className="pl-6">
                        <div className="flex sm:items-center sm:flex-row flex-col">
                            <div className="text-[var(--timeline-accent)] font-semibold">
                                {milestone.date}
                            </div>
                            <h3 className="sm:ml-4 dark:text-[#abc2d3] text-[#424242] text-lg font-semibold">
                                {milestone.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 dark:text-slate-400 mt-1">
                            {milestone.description}
                        </p>
                    </div>
                </li>
            ))}
        </ol>
    </div>
);
