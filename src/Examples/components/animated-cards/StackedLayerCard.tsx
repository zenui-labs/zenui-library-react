export interface StackedLayerCardProps {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    actionLabel?: string;
    /** Renders the action as a link. Without it the action is a button. */
    href?: string;
    onAction?: () => void;
    className?: string;
}

const actionClassName =
    "block text-center w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5";

/** A content card with two tinted layers behind it that fan out to the bottom left on hover. */
export const StackedLayerCard = ({
    imageSrc,
    imageAlt = "",
    title,
    description,
    actionLabel = "Explore",
    href,
    onAction,
    className = "",
}: StackedLayerCardProps) => (
    <div
        className={`w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] dark:before:bg-slate-900 before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] dark:after:bg-slate-900/60 after:z-[-2] after:transition-all after:duration-500 ${className}`}
    >
        {/* image */}
        <img src={imageSrc} alt={imageAlt} className="w-full h-[200px] rounded-t-md object-cover"/>

        {/* contents */}
        <div className="p-[18px] pt-2.5 dark:bg-slate-800 bg-white rounded-b-md">
            <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">{title}</h3>
            <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600">{description}</p>

            {href ? (
                <a href={href} onClick={onAction} className={actionClassName}>
                    {actionLabel}
                </a>
            ) : (
                <button type="button" onClick={onAction} className={actionClassName}>
                    {actionLabel}
                </button>
            )}
        </div>
    </div>
);
