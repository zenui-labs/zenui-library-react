import {LuBanknote, LuHotel, LuMap, LuPlane, LuTicket, LuUtensils} from "react-icons/lu";
import {SheetPalette, type SheetEntry} from "./SheetPalette";

const entries: SheetEntry[] = [
    {id: "boarding", label: "Boarding pass", detail: "TP 1352 to Lisbon, gate B14", icon: LuTicket},
    {id: "flight", label: "Flight status", detail: "On time, departs 7:40 AM", icon: LuPlane},
    {id: "hotel", label: "Hotel check-in", detail: "Casa do Largo, from 3 PM", icon: LuHotel},
    {id: "maps", label: "Offline maps", detail: "Lisbon and Sintra, 214 MB", icon: LuMap},
    {id: "currency", label: "Currency converter", detail: "USD to EUR", icon: LuBanknote},
    {id: "dinner", label: "Dinner reservation", detail: "Taberna da Rua, Fri 8:30 PM", icon: LuUtensils},
];

const SheetPaletteExample = () => (
    <SheetPalette
        entries={entries}
        defaultPinned={["boarding", "maps"]}
        defaultRecent={["currency", "hotel", "flight"]}
        eyebrow="Trip to Lisbon"
        heading="Oct 12 to 18"
        triggerLabel="Search your trip"
        placeholder="Tickets, bookings, tools"
        noResultsText="Nothing in this trip matches"
    />
);

export default SheetPaletteExample;
