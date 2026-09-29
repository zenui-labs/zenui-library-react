import type {ComponentType, CSSProperties} from "react";

export interface TreeTimelineItem {
    date: string;
    title: string;
    description: string;
    /** Icon shown on the center line, for example a react-icons component. */
    icon: ComponentType<{className?: string}>;
}

export interface TreeTimelineProps {
    items: TreeTimelineItem[];
    /** Heading above the timeline. Pass an empty string to hide it. */
    heading?: string;
    /** Color of the dates. Any CSS color. */
    accentColor?: string;
    className?: string;
}

/** A timeline with cards that alternate on both sides of a center line, each with an icon on the line. */
export const TreeTimeline = ({
    items,
    heading = "Tree timeline",
    accentColor = "#3B9DF8",
    className = "",
}: TreeTimelineProps) => (
    <div
        className={`w-full mx-auto p-6 ${className}`}
        style={{"--timeline-accent": accentColor} as CSSProperties}
    >
        {heading && (
            <h2 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                {heading}
            </h2>
        )}

        <ol className="relative h-fit before:content-[''] before:absolute before:w-1 before:h-full before:bg-gray-200 dark:before:bg-slate-800 before:left-1/2 before:transform before:-translate-x-1/2 before:rounded-md before:z-10">
            {items.map((milestone, index) => {
                const Icon = milestone.icon;
                const onLeft = index % 2 === 0;

                return (
                    <li
                        key={`${milestone.date}-${milestone.title}`}
                        className={`relative w-1/2 mb-4 ${onLeft ? "text-right" : "left-1/2 text-left"}`}
                    >
                        <div
                            aria-hidden
                            className={`absolute top-1/2 -translate-y-1/2 ${
                                onLeft ? "translate-x-1/2 right-0" : "-translate-x-1/2"
                            } bg-gray-200 dark:bg-slate-800 rounded-full p-2 z-10`}
                        >
                            <Icon className="fill-gray-500 dark:fill-[#abc2d3] w-5 h-5"/>
                        </div>

                        <div
                            className={`relative border rounded-md dark:bg-slate-900 dark:border-slate-700 dark:shadow-slate-900 shadow-gray-50 border-gray-200/60 shadow-md ${
                                onLeft ? "-left-8" : "-right-8"
                            }`}
                        >
                            <div className="py-3 px-4">
                                <div>
                                    <h3 className="text-[#424242] dark:text-[#abc2d3] text-lg font-semibold">
                                        {milestone.title}
                                    </h3>
                                    <div className="text-[var(--timeline-accent)] text-sm">
                                        {milestone.date}
                                    </div>
                                </div>
                                <p className="mt-1 text-sm dark:text-slate-400 text-gray-600">{milestone.description}</p>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ol>
    </div>
);
