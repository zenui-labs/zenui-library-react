export interface ImageRevealCardProps {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    /** Short text that fades in under the title on hover. */
    description: string;
    actionLabel?: string;
    /** Renders the action as a link. Without it the action is a button. */
    href?: string;
    onAction?: () => void;
    className?: string;
}

const actionClassName =
    "bg-gray-400 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 px-3 py-2 mt-3 hover:bg-gray-500 transition-all duration-1000 text-white rounded-md text-[0.9rem]";

/**
 * An image card that zooms in on hover while the title slides to the center and a description and action fade in.
 * Keyboard focus on the action reveals the same content.
 */
export const ImageRevealCard = ({
    imageSrc,
    imageAlt = "",
    title,
    description,
    actionLabel = "View details",
    href,
    onAction,
    className = "",
}: ImageRevealCardProps) => (
    <div className={`w-full sm:w-[80%] lg:w-[60%] h-[350px] relative overflow-hidden group cursor-pointer rounded-md ${className}`}>
        {/* image */}
        <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-[1.1] group-focus-within:scale-[1.1] transition-all duration-700"
        />

        {/* text */}
        <div className="absolute top-[50%] transform group-hover:translate-y-[-50%] group-focus-within:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
            <h3 className="text-[1.5rem] font-bold text-white text-center capitalize">{title}</h3>
            <p className="text-center opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-700 text-white text-[0.9rem]">
                {description}
            </p>
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

        {/* bottom shadow */}
        <div className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 group-focus-within:opacity-100 group-focus-within:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0"/>
    </div>
);
