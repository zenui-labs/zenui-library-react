import {useState, type ComponentType} from "react";
import {FaStar} from "react-icons/fa";

export interface StarRatingProps {
    /** The selected rating. Pass it with `onChange` to control the component. */
    value?: number;
    /** The rating selected on first render when the component is uncontrolled. */
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** How many stars to show. */
    max?: number;
    /** The icon for each star. Any component that accepts `className` works. */
    icon?: ComponentType<{className?: string}>;
    /** Color classes for the selected stars. */
    activeClassName?: string;
    /** Accessible name of the star group. */
    ariaLabel?: string;
    className?: string;
}

/** A star rating where a click on a star selects that rating. */
export const StarRating = ({
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    icon: Icon = FaStar,
    activeClassName = "text-yellow-400",
    ariaLabel = "Rating",
    className = "",
}: StarRatingProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const rating = value ?? internalValue;

    const select = (next: number) => {
        if (value === undefined) setInternalValue(next);
        onChange?.(next);
    };

    return (
        <div role="group" aria-label={ariaLabel} className={`flex items-center space-x-1 ${className}`}>
            {Array.from({length: max}, (_, index) => {
                const starRating = index + 1;
                return (
                    <button
                        key={starRating}
                        type="button"
                        aria-label={`Rate ${starRating} out of ${max}`}
                        aria-pressed={starRating === rating}
                        onClick={() => select(starRating)}
                        className="flex cursor-pointer"
                    >
                        <Icon
                            className={`size-6 ${
                                starRating <= rating ? activeClassName : "text-gray-300 dark:text-slate-700"
                            }`}
                        />
                    </button>
                );
            })}
        </div>
    );
};
