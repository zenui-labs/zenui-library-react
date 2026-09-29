import {GlareCard, type TicketDetail} from "./GlareCard";

const details: TicketDetail[] = [
    {label: "Date", value: "Oct 14 and 15"},
    {label: "Seat", value: "Hall B, row 7"},
];

const GlareCardExample = () => (
    <GlareCard
        title="Frontend Summit 2026"
        details={details}
        location="Pier 27, San Francisco"
        code="FS-2026-0417"
    />
);

export default GlareCardExample;
