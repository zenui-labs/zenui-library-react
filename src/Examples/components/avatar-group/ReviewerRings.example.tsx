import {ReviewerRings, type Reviewer} from "./ReviewerRings";

const reviewers: Reviewer[] = [
    {name: "Maya Chen", review: "approved", when: "2h ago"},
    {name: "Ravi Kapoor", review: "changes", when: "40m ago"},
    {name: "Elena Petrova", review: "commented", when: "15m ago"},
    {name: "Owen Walsh", review: "pending", when: "Requested 3h ago"},
];

const ReviewerRingsExample = () => (
    <ReviewerRings
        defaultValue={reviewers}
        eyebrow="Pull request #2184"
        title="Add retry with backoff to webhook delivery"
        simulateApproval
    />
);

export default ReviewerRingsExample;
