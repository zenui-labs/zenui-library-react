import {useId, useState, type ReactNode} from "react";
import {FaStar} from "react-icons/fa";
import {RxCross1} from "react-icons/rx";

export interface RatingCardProps {
    /** Context under the heading, for example who delivered the order and when. */
    description: ReactNode;
    title?: string;
    /** The selected rating. Pass it with `onChange` to control the component. */
    value?: number;
    /** The rating selected on first render when the component is uncontrolled. */
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** How many stars to show. */
    max?: number;
    /** Called by the close button. The button is hidden when this is not set. */
    onClose?: () => void;
    closeLabel?: string;
    /** Accessible name of the star group. */
    starsLabel?: string;
    className?: string;
}

/** A card that asks for a star rating, with a heading, a short context line and a close button. */
export const RatingCard = ({
    description,
    title = "How many stars would you give to them?",
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    onClose,
    closeLabel = "Close",
    starsLabel = "Rating",
    className = "",
}: RatingCardProps) => {
    const titleId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hover, setHover] = useState<number | null>(null);
    const rating = value ?? internalValue;

    const select = (next: number) => {
        if (value === undefined) setInternalValue(next);
        onChange?.(next);
    };

    return (
        <div
            role="group"
            aria-labelledby={titleId}
            className={`bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-800 dark:border-slate-700 rounded-md border border-gray-200 w-full lg:w-[80%] p-4 text-center ${className}`}
        >
            {onClose && (
                <button type="button" aria-label={closeLabel} onClick={onClose} className="float-right flex rounded-full">
                    <RxCross1
                        aria-hidden="true"
                        className="py-1.5 text-[1.6rem] dark:text-[#abc2d3] dark:hover:bg-slate-900 text-[#333333] hover:bg-gray-200 rounded-full cursor-pointer"
                    />
                </button>
            )}

            <h3 id={titleId} className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] mt-[40px]">
                {title}
            </h3>
            <p className="text-[16px] font-[400] dark:text-[#abc2d3] mt-[10px]">{description}</p>

            <div
                role="group"
                aria-label={starsLabel}
                className="flex items-center space-x-1 justify-center mt-[15px] mb-[10px]"
                onMouseLeave={() => setHover(null)}
            >
                {Array.from({length: max}, (_, index) => {
                    const starRating = index + 1;
                    return (
                        <button
                            key={starRating}
                            type="button"
                            aria-label={`Rate ${starRating} out of ${max}`}
                            aria-pressed={starRating === rating}
                            onClick={() => select(starRating)}
                            onMouseEnter={() => setHover(starRating)}
                            className="flex cursor-pointer"
                        >
                            <FaStar
                                aria-hidden="true"
                                className={`size-[26px] ${
                                    starRating <= (hover ?? rating) ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"
                                }`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
