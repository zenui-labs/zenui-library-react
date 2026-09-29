import {useState} from "react";
import {GoHome} from "react-icons/go";
import {PiShareFatLight} from "react-icons/pi";
import {FeedbackRatingCard, type FeedbackAction, type FeedbackSubmission} from "./FeedbackRatingCard";

const actions: FeedbackAction[] = [
    {label: "Home", icon: GoHome},
    {label: "Rejoin session", icon: PiShareFatLight},
];

const FeedbackRatingCardExample = () => {
    const [submitted, setSubmitted] = useState<FeedbackSubmission | null>(null);

    return (
        <div className="w-full">
            <FeedbackRatingCard defaultRating={4} actions={actions} onSubmit={setSubmitted}/>
            {submitted && (
                <p className="mt-3 text-center text-sm text-gray-500 dark:text-[#abc2d3]" role="status">
                    Sent {submitted.rating} of 5 stars{submitted.feedback ? " with a comment" : ""}.
                </p>
            )}
        </div>
    );
};

export default FeedbackRatingCardExample;
