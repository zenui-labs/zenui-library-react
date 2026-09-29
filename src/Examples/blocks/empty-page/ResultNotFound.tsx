import type {ReactNode} from "react";

export interface ResultNotFoundProps {
    title?: string;
    description?: string;
    /** Illustration shown above the title. */
    imageSrc?: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Optional button or link under the text that helps people move on. */
    action?: ReactNode;
    className?: string;
}

/** An empty state card with an illustration, a title and a short message. */
export const ResultNotFound = ({
    title = "Result not found",
    description = "This information is not available at the moment",
    imageSrc = "https://i.ibb.co/cgfgxGH/Illustrations.png",
    imageAlt = "",
    action,
    className = "",
}: ResultNotFoundProps) => (
    <div
        className={`shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl ${className}`}
    >
        <img src={imageSrc} alt={imageAlt} className="w-full sm:w-[200px]"/>

        <h2 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black">{title}</h2>

        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">{description}</p>

        {action && <div className="mt-5">{action}</div>}
    </div>
);
