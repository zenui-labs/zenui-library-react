export interface FlipCardProps {
    /** Image on the front face. */
    imageSrc: string;
    imageAlt?: string;
    /** Shown on the front over the image and as the heading on the back. */
    title: string;
    /** Text on the back face. */
    description: string;
    /** Adds a link at the bottom of the back face. */
    href?: string;
    linkLabel?: string;
    className?: string;
}

/**
 * A card that turns over in 3D on hover. The front shows an image with a title, the back shows a description and
 * a link. Keyboard focus on the link turns the card as well.
 */
export const FlipCard = ({
    imageSrc,
    imageAlt = "",
    title,
    description,
    href,
    linkLabel = "Learn more",
    className = "",
}: FlipCardProps) => (
    <div className={`group [perspective:1000px] w-full sm:w-[80%] md:w-[60%] h-[350px] ${className}`}>
        <div className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
            {/* front side */}
            <div className="absolute w-full h-full [backface-visibility:hidden]">
                <img src={imageSrc} alt={imageAlt} className="w-full h-full cursor-pointer object-cover rounded-lg shadow-lg"/>
                <h3 className="text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-5">
                    {title}
                </h3>
            </div>

            {/* back side */}
            <div className="absolute w-full dark:bg-slate-800 h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-[25px]">
                <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-gray-800 mb-4">{title}</h3>
                <p className="text-gray-600 dark:text-[#abc2d3]/80">{description}</p>
                {href && (
                    <a href={href} className="inline-block mt-4 text-blue-500 hover:underline">
                        {linkLabel}
                    </a>
                )}
            </div>
        </div>
    </div>
);
