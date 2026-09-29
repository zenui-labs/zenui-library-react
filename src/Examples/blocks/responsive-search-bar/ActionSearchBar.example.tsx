import {useState} from "react";
import {IoMdContact} from "react-icons/io";
import {IoAnalytics} from "react-icons/io5";
import {SlDirections} from "react-icons/sl";
import {RiComputerLine} from "react-icons/ri";
import {MdOutlineExplore, MdOutlineFindInPage} from "react-icons/md";
import {GrSchedule} from "react-icons/gr";
import {ActionSearchBar, type QuickAction, type RecentSearch} from "./ActionSearchBar";

const recents: RecentSearch[] = [
    {id: 1, title: "Marketing & Strategy Analytics", tag: "Article", icon: IoAnalytics, iconClassName: "bg-red-100 text-red-500"},
    {id: 2, title: "Direction to XYZ location", tag: "Location", icon: SlDirections, iconClassName: "bg-orange-100 text-orange-500"},
    {id: 3, title: "Upcoming meeting details", tag: "Meeting", icon: RiComputerLine, iconClassName: "bg-green-100 text-green-500"},
    {id: 4, title: "Contact John Doe", tag: "Contact", icon: IoMdContact, iconClassName: "bg-blue-100 text-blue-500"},
];

const actions: QuickAction[] = [
    {label: "Explore trending topics", icon: MdOutlineExplore},
    {label: "Schedule appointment", icon: GrSchedule},
    {label: "Find a contact", icon: MdOutlineFindInPage},
];

const ActionSearchBarExample = () => {
    const [filters, setFilters] = useState(["Articles", "Locations", "Contacts"]);

    return (
        <div className="flex justify-center p-8">
            <ActionSearchBar
                filters={filters}
                recents={recents}
                actions={actions}
                onRemoveFilter={(filter) => setFilters((current) => current.filter((item) => item !== filter))}
                defaultOpen
            />
        </div>
    );
};

export default ActionSearchBarExample;
