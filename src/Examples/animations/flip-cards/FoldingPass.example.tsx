import {FoldingPass, type BoardingPass} from "./FoldingPass";

const pass: BoardingPass = {
    airline: "Northwind Air",
    flightNumber: "NW 482",
    date: "Oct 14",
    from: {code: "SFO", city: "San Francisco"},
    to: {code: "JFK", city: "New York"},
    details: [
        {label: "Passenger", value: "Maya Okafor", wide: true},
        {label: "Seat", value: "14A"},
        {label: "Gate", value: "B22"},
        {label: "Boarding", value: "7:25 AM"},
        {label: "Class", value: "Economy"},
    ],
};

const FoldingPassExample = () => <FoldingPass pass={pass}/>;

export default FoldingPassExample;
