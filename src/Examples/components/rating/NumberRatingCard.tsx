import {useId, useState, type ComponentType, type FormEvent} from "react";
import {FaHeart} from "react-icons/fa";

export interface NumberRatingCardProps {
    title?: string;
    description?: string;
    /** The icon in the badge above the heading. Any component that accepts `className` works. */
    icon?: ComponentType<{className?: string}>;
    /** The selected score. Pass it with `onChange` to control the component. */
    value?: number;
    /** The score selected on first render when the component is uncontrolled. Use 0 for none. */
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** The highest score. The card shows one button for each score from 1 to `max`. */
    max?: number;
    onSubmit?: (value: number) => void;
    submitLabel?: string;
    className?: string;
}

/** A rating card where people pick a score from a row of numbered buttons, then submit it. */
export const NumberRatingCard = ({
    title = "Drop a rating",
    description = "Tell us how your experience was on a scale of 1 to 5.",
    icon: Icon = FaHeart,
    value,
    defaultValue = 0,
    onChange,
    max = 5,
    onSubmit,
    submitLabel = "Submit",
    className = "",
}: NumberRatingCardProps) => {
    const titleId = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const score = value ?? internalValue;

    const select = (next: number) => {
        if (value === undefined) setInternalValue(next);
        onChange?.(next);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.(score);
    };

    return (
        <form
            onSubmit={handleSubmit}
            aria-labelledby={titleId}
            className={`bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-800 dark:border-slate-700 rounded-[30px] border border-gray-200 w-full sm:w-[80%] p-8 ${className}`}
        >
            <div className="p-4 bg-blue-100 dark:bg-blue-800/20 w-max rounded-full">
                <Icon className="text-[1.5rem] text-blue-800"/>
            </div>

            <h3 id={titleId} className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] mt-[20px]">
                {title}
            </h3>
            <p className="text-[14px] font-[400] dark:text-[#abc2d3]/80 text-gray-500 mt-[10px]">{description}</p>

            <div
                role="group"
                aria-label="Score"
                className="flex sm:flex-nowrap flex-wrap items-center sm:gap-0 gap-[10px] sm:justify-between mt-[25px]"
            >
                {Array.from({length: max}, (_, index) => {
                    const number = index + 1;
                    const selected = number === score;
                    return (
                        <button
                            key={number}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => select(number)}
                            className={`w-[55px] h-[55px] text-[1.5rem] flex items-center justify-center rounded-full hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-200 ${
                                selected
                                    ? "bg-blue-800 text-white"
                                    : "dark:bg-blue-800/20 dark:text-[#abc2d3] bg-blue-100 text-blue-800"
                            }`}
                        >
                            {number}
                        </button>
                    );
                })}
            </div>

            <button
                type="submit"
                className="py-3 px-6 bg-[#3B9DF8] border border-[#3B9DF8] text-white rounded-full font-[500] w-full mt-[25px] text-[1.2rem]"
            >
                {submitLabel}
            </button>
        </form>
    );
};
