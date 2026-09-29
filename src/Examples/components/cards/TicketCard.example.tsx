import {BsSend} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";
import {TicketCard, type TicketDetail} from "./TicketCard";

const details: TicketDetail[] = [
    {icon: BsSend, label: "City Concert Hall", value: "15 Dec 2020"},
    {icon: IoLocationOutline, label: "New York, NY", value: "Doors open 8:30 AM"},
];

const TicketCardExample = () => (
    <TicketCard title="Jazz night" details={details} time="9:00 AM" price="$70"/>
);

export default TicketCardExample;
