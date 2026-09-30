import {TearTicket, type BoardingPass} from "./TearTicket";

const pass: BoardingPass = {
    airline: "Nordvik Air",
    flight: "NV 412",
    passenger: "Halvorsen / Ingrid",
    from: {code: "OSL", city: "Oslo"},
    to: {code: "LIS", city: "Lisbon"},
    date: "14 Oct",
    boarding: "07:35",
    departs: "08:05",
    duration: "3h 55m",
    gate: "D7",
    seat: "14A",
    zone: "2",
    cabin: "Economy",
    bookingRef: "K7Q2XM",
    ticketNumber: "0842 1937 5520 1",
};

const TearTicketExample = () => <TearTicket pass={pass}/>;

export default TearTicketExample;
