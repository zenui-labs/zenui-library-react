import {useState} from "react";
import {MdDeleteOutline, MdOutlineEdit} from "react-icons/md";
import {IoEyeOutline} from "react-icons/io5";
import {PaginatedTable, type TableAction, type TableColumn} from "./PaginatedTable";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
}

const users: User[] = Array.from({length: 35}, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
    status: index % 2 === 0 ? "Active" : "Inactive",
}));

const columns: TableColumn<User>[] = [
    {key: "name", header: "Name"},
    {key: "email", header: "Email"},
    {key: "role", header: "Role"},
    {key: "status", header: "Status"},
];

const actions: TableAction[] = [
    {id: "edit", label: "Edit", icon: MdOutlineEdit},
    {id: "delete", label: "Delete", icon: MdDeleteOutline},
    {id: "view", label: "View details", icon: IoEyeOutline},
];

const PaginatedTableExample = () => {
    const [rows, setRows] = useState(users);

    // Delete removes the row; wire edit and view to your own screens.
    const handleAction = (actionId: string, user: User) => {
        if (actionId === "delete") setRows((current) => current.filter((row) => row.id !== user.id));
    };

    return <PaginatedTable rows={rows} columns={columns} actions={actions} onAction={handleAction}/>;
};

export default PaginatedTableExample;
