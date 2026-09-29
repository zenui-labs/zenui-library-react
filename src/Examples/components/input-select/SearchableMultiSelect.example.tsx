import {SearchableMultiSelect, type SearchOption} from "./SearchableMultiSelect";

const options: SearchOption[] = [
    {id: 1, label: "Option 1"},
    {id: 2, label: "Option 2"},
    {id: 3, label: "Option 3"},
    {id: 4, label: "Option 4"},
    {id: 5, label: "Option 5"},
];

const SearchableMultiSelectExample = () => <SearchableMultiSelect options={options}/>;

export default SearchableMultiSelectExample;
