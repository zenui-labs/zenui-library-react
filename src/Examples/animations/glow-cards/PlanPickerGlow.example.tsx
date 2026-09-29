import {PlanPickerGlow, type Plan} from "./PlanPickerGlow";

const plans: Plan[] = [
    {id: "basic", name: "Basic", price: 9, seats: "1 editor", highlights: ["5 active boards", "Version history, 7 days"]},
    {id: "team", name: "Team", price: 24, seats: "Up to 10 editors", highlights: ["Unlimited boards", "Version history, 90 days", "Shared libraries"]},
    {id: "scale", name: "Scale", price: 49, seats: "Unlimited editors", highlights: ["Everything in Team", "SSO and audit log", "Dedicated success manager"]},
];

const PlanPickerGlowExample = () => <PlanPickerGlow plans={plans} defaultValue="team"/>;

export default PlanPickerGlowExample;
