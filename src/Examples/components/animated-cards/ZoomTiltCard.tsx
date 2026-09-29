export interface ZoomTiltCardProps {
    imageSrc: string;
    imageAlt?: string;
    /** Title lines stacked in the bottom left corner. */
    lines: string[];
    /** Index of the line drawn in the accent color. */
    highlightIndex?: number;
    /** Classes for the highlighted line. */
    highlightClassName?: string;
    className?: string;
}

/** An image card that zooms and tilts its image on hover, with a stacked title in the bottom left corner. */
export const ZoomTiltCard = ({
    imageSrc,
    imageAlt = "",
    lines,
    highlightIndex = 1,
    highlightClassName = "text-yellow-500",
    className = "",
}: ZoomTiltCardProps) => (
    <div className={`w-full sm:w-[80%] lg:w-[60%] h-[350px] overflow-hidden rounded-md relative cursor-pointer group ${className}`}>
        {/* image */}
        <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-[1.15] group-hover:rotate-[8deg] transition-all duration-300 ease-out"
        />

        {/* texts */}
        <h3 className="absolute bottom-0 left-0 py-[10px] px-[20px]">
            {lines.map((line, index) => (
                <span
                    key={`${index}-${line}`}
                    className={`block text-[2rem] font-bold ${index === highlightIndex ? highlightClassName : "text-white"}`}
                >
                    {line}
                </span>
            ))}
        </h3>
    </div>
);
