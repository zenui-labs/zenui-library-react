import {SeatPlanPicker, type SeatNeed, type SeatPlan} from "./SeatPlanPicker";

const plans: SeatPlan[] = [
    {id: "basic", name: "Basic", perSeat: 8, maxSeats: 10, includes: [], summary: "Shared inbox and help center for small teams"},
    {id: "pro", name: "Pro", perSeat: 19, maxSeats: 150, includes: ["audit"], summary: "Automations, reporting and multiple brands"},
    {id: "enterprise", name: "Enterprise", perSeat: 34, minSeats: 25, maxSeats: 1000, includes: ["sso", "audit", "priority"], summary: "Security reviews, sandboxes and a named manager", cta: "Talk to sales"},
];

const needs: SeatNeed[] = [
    {id: "sso", label: "SAML single sign-on"},
    {id: "audit", label: "Audit log"},
    {id: "priority", label: "Priority support"},
];

const SeatPlanPickerExample = () => (
    <SeatPlanPicker
        plans={plans}
        needs={needs}
        title="Find the right Helpline plan"
        defaultSeats={18}
        defaultRequired={["audit"]}
    />
);

export default SeatPlanPickerExample;
