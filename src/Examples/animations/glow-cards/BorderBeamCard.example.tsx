import {BorderBeamCard} from "./BorderBeamCard";

const perks: string[] = [
    "Unlimited projects and guests",
    "Shared component libraries",
    "Priority support with a 4 hour reply",
    "SSO and audit log",
];

const BorderBeamCardExample = () => (
    <BorderBeamCard
        name="Team"
        price="$24"
        description="For product teams that design, review and ship together."
        perks={perks}
    />
);

export default BorderBeamCardExample;
