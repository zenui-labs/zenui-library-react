import {useId, useState, type ComponentType, type FormEvent} from "react";
import {FaStar} from "react-icons/fa";

export interface FeedbackAction {
    label: string;
    icon?: ComponentType<{className?: string}>;
    onClick?: () => void;
}

export interface FeedbackSubmission {
    rating: number;
    feedback: string;
}

export interface FeedbackRatingCardProps {
    title?: string;
    subtitle?: string;
    /** The selected rating. Pass it with `onRatingChange` to control the stars. */
    rating?: number;
    /** The rating selected on first render when the stars are uncontrolled. */
    defaultRating?: number;
    onRatingChange?: (rating: number) => void;
    /** How many stars to show. */
    max?: number;
    onSubmit?: (submission: FeedbackSubmission) => void;
    feedbackLabel?: string;
    feedbackPlaceholder?: string;
    submitLabel?: string;
    /** Buttons shown under the "or" divider. The divider is hidden when there are none. */
    actions?: FeedbackAction[];
    dividerLabel?: string;
    className?: string;
}

/** A feedback card with a star rating, a comment field, a submit button and optional follow-up actions. */
export const FeedbackRatingCard = ({
    title = "Session feedback",
    subtitle = "Please rate your experience below",
    rating: ratingProp,
    defaultRating = 0,
    onRatingChange,
    max = 5,
    onSubmit,
    feedbackLabel = "Additional feedback",
    feedbackPlaceholder = "Tell us what went well or what could be better",
    submitLabel = "Submit feedback",
    actions = [],
    dividerLabel = "or",
    className = "",
}: FeedbackRatingCardProps) => {
    const feedbackId = useId();
    const [internalRating, setInternalRating] = useState(defaultRating);
    const [hover, setHover] = useState<number | null>(null);
    const [feedback, setFeedback] = useState("");
    const rating = ratingProp ?? internalRating;

    const select = (next: number) => {
        if (ratingProp === undefined) setInternalRating(next);
        onRatingChange?.(next);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit?.({rating, feedback});
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={`bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-800 dark:border-slate-700 rounded-md border border-gray-200 w-full p-4 sm:p-8 ${className}`}
        >
            <h3 className="text-[24px] font-semibold dark:text-[#abc2d3] text-[#333333] text-center">{title}</h3>
            <p className="text-[14px] font-[400] dark:text-[#abc2d3] text-gray-500 text-center">{subtitle}</p>

            <div className="flex items-center sm:flex-row flex-col sm:space-x-12 w-full my-[20px] justify-center">
                <div
                    role="group"
                    aria-label="Rating"
                    className="flex items-center space-x-6 justify-center mb-[10px]"
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
                <span className="text-gray-500 dark:text-[#abc2d3]/80" aria-live="polite">
                    {rating}/{max} stars
                </span>
            </div>

            <label htmlFor={feedbackId} className="text-gray-500 dark:text-[#abc2d3]">
                {feedbackLabel}
            </label>
            <textarea
                id={feedbackId}
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder={feedbackPlaceholder}
                className="w-full border-gray-400 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 resize-none outline-none focus:border-[#3B9DF8] border rounded-md p-2 min-h-[100px]"
            />

            <button
                type="submit"
                className="py-2 px-6 bg-[#3B9DF8] border border-[#3B9DF8] text-white rounded font-[500] w-full mt-[10px]"
            >
                {submitLabel}
            </button>

            {actions.length > 0 && (
                <>
                    <div className="flex items-center my-[10px]">
                        <div className="h-[1px] w-full bg-gray-200 dark:bg-slate-600"></div>
                        <span className="text-gray-500 dark:text-slate-500">{dividerLabel}</span>
                        <div className="h-[1px] w-full bg-gray-200 dark:bg-slate-600"></div>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center justify-between gap-[15px]">
                        {actions.map(({label, icon: Icon, onClick}) => (
                            <button
                                key={label}
                                type="button"
                                onClick={onClick}
                                // The fill slides in from the left on hover.
                                className="relative z-10 overflow-hidden py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] w-full flex items-center justify-center gap-[10px] hover:text-white after:absolute after:top-0 after:left-0 after:-z-10 after:h-full after:w-full after:bg-[#3B9DF8] after:-translate-x-[300px] after:transition-all after:duration-300 after:ease-in-out hover:after:translate-x-0"
                            >
                                {Icon && <Icon className="text-[1.3rem]"/>}
                                {label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </form>
    );
};
