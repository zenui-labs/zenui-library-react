import {FilterSort, type FilterSortItem} from "./FilterSort";

const tasks: FilterSortItem[] = [
    {id: "1", title: "Complete report", category: "Work", priority: 3, color: "bg-blue-400"},
    {id: "2", title: "Buy groceries", category: "Personal", priority: 2, color: "bg-green-400"},
    {id: "3", title: "Call client", category: "Work", priority: 4, color: "bg-yellow-400"},
    {id: "4", title: "Fix bug in code", category: "Work", priority: 5, color: "bg-pink-400"},
    {id: "5", title: "Doctor appointment", category: "Personal", priority: 4, color: "bg-purple-400"},
    {id: "6", title: "Submit proposal", category: "Urgent", priority: 5, color: "bg-red-400"},
    {id: "7", title: "Gym workout", category: "Personal", priority: 1, color: "bg-indigo-400"},
    {id: "8", title: "Team meeting", category: "Work", priority: 3, color: "bg-teal-400"},
];

const FilterSortExample = () => <FilterSort items={tasks} categories={["Work", "Personal", "Urgent"]}/>;

export default FilterSortExample;
