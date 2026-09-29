import type {ComponentType, CSSProperties} from "react";

export interface IconMilestone {
    /** Shown in the accent color before the title, for example "January 2024". */
    date: string;
    title: string;
    description: string;
    /** Icon shown in the circle on the line, for example a react-icons component. */
    icon: ComponentType<{className?: string}>;
}

export interface MilestoneIconTimelineProps {
    items: IconMilestone[];
    /** Heading above the timeline. Pass an empty string to hide it. */
    heading?: string;
    /** Color of the icon circles and dates. Any CSS color. */
    accentColor?: string;
    className?: string;
}

/** A vertical timeline that marks each milestone with an icon in a colored circle on a thick line. */
export const MilestoneIconTimeline = ({
    items,
    heading = "Milestone icon timeline",
    accentColor = "#3B9DF8",
    className = "",
}: MilestoneIconTimelineProps) => (
    <div
        className={`max-w-4xl mx-auto p-6 ${className}`}
        style={{"--timeline-accent": accentColor} as CSSProperties}
    >
        {heading && (
            <h2 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                {heading}
            </h2>
        )}
        <ol className="relative border-l-[5px] dark:border-slate-700 border-gray-300">
            {items.map((milestone) => {
                const Icon = milestone.icon;

                return (
                    <li key={`${milestone.date}-${milestone.title}`} className="mb-8 relative">
                        <div
                            aria-hidden
                            className="absolute border-2 border-white top-5 -left-[2.5px] transform -translate-x-1/2 -translate-y-1/2 bg-[var(--timeline-accent)] dark:border-slate-600 rounded-full p-2 z-10"
                        >
                            <Icon className="fill-white w-5 h-5"/>
                        </div>
                        <div className="pl-6">
                            <div className="flex sm:items-center sm:flex-row flex-col">
                                <div className="text-[var(--timeline-accent)] font-semibold">
                                    {milestone.date}
                                </div>
                                <h3 className="sm:ml-4 dark:text-[#abc2d3] text-[#424242] text-lg font-semibold">
                                    {milestone.title}
                                </h3>
                            </div>
                            <p className="text-gray-500 dark:text-slate-400 text-[0.9rem] mt-1">
                                {milestone.description}
                            </p>
                        </div>
                    </li>
                );
            })}
        </ol>
    </div>
);
