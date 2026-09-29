import {DraggableThumb, type RideOption} from "./DraggableThumb";

type Ride = "economy" | "comfort" | "xl";

const rides: RideOption<Ride>[] = [
    {value: "economy", label: "Economy", price: "$14.20", eta: "4 min", seats: 4, note: "Everyday rides at the lowest price"},
    {value: "comfort", label: "Comfort", price: "$19.80", eta: "6 min", seats: 4, note: "Newer cars with extra legroom"},
    {value: "xl", label: "XL", price: "$26.40", eta: "9 min", seats: 6, note: "Room for groups and luggage"},
];

const DraggableThumbExample = () => <DraggableThumb options={rides} defaultValue="comfort"/>;

export default DraggableThumbExample;
