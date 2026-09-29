import type {CSSProperties} from "react";
import {FaRegComment, FaRegFileAlt} from "react-icons/fa";

export interface WorkProgressEntry {
    /** Short date shown to the left of the line, for example "Jan 22". */
    date: string;
    title: string;
    description: string;
    /** Shows a comments button with this count. Leave it out to hide the button. */
    commentCount?: number;
    /** File name for an attachment button. Long names are truncated. Leave it out to hide the button. */
    attachment?: string;
}

export interface WorkProgressTimelineProps {
    items: WorkProgressEntry[];
    /** Heading above the timeline. Pass an empty string to hide it. */
    heading?: string;
    /** Color of the attachment button. Any CSS color. */
    accentColor?: string;
    onCommentsClick?: (entry: WorkProgressEntry) => void;
    onAttachmentClick?: (entry: WorkProgressEntry) => void;
    className?: string;
}

/** A work log with the date outside the line, a description and optional comment and attachment buttons. */
export const WorkProgressTimeline = ({
    items,
    heading = "Work progress",
    accentColor = "#3B9DF8",
    onCommentsClick,
    onAttachmentClick,
    className = "",
}: WorkProgressTimelineProps) => (
    <div
        className={`w-[55%] sm:w-[70%] mx-auto ${className}`}
        style={{"--timeline-accent": accentColor} as CSSProperties}
    >
        {heading && (
            <h2 className="text-3xl font-bold mb-16 dark:text-[#abc2d3] text-center">
                {heading}
            </h2>
        )}
        <ol className="relative border-l dark:border-slate-700 border-gray-300 w-full">
            {items.map((entry) => (
                <li key={`${entry.date}-${entry.title}`} className="mb-8">
                    <div className="pl-6 w-full">
                        <div className="flex items-center">
                            <div className="text-gray-600 text-[1rem] dark:text-[#abc2d3] absolute left-[-75px]">
                                {entry.date}
                            </div>
                            <h3 className="text-[#424242] dark:text-[#abc2d3] text-lg">
                                {entry.title}
                            </h3>
                        </div>
                        <p className="text-gray-500 dark:text-slate-400 mt-1 text-[0.9rem]">
                            {entry.description}
                        </p>

                        {(entry.commentCount !== undefined || entry.attachment) && (
                            <div className="flex flex-wrap items-center gap-[20px] mt-[10px]">
                                {entry.commentCount !== undefined && (
                                    <button
                                        type="button"
                                        onClick={() => onCommentsClick?.(entry)}
                                        className="flex items-center gap-[9px] text-gray-400 rounded-md px-4 py-1 text-[0.9rem]"
                                    >
                                        <FaRegComment aria-hidden/>
                                        {entry.commentCount} {entry.commentCount === 1 ? "comment" : "comments"}
                                    </button>
                                )}

                                {entry.attachment && (
                                    <button
                                        type="button"
                                        onClick={() => onAttachmentClick?.(entry)}
                                        title={entry.attachment}
                                        className="flex items-center gap-[9px] border-[var(--timeline-accent)] border text-[var(--timeline-accent)] rounded-md px-4 py-1 text-[0.9rem]"
                                    >
                                        <FaRegFileAlt aria-hidden className="shrink-0"/>
                                        <span className="max-w-[7rem] truncate">{entry.attachment}</span>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ol>
    </div>
);
