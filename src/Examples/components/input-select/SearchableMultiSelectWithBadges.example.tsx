import {SearchableMultiSelectWithBadges, type SearchOption} from "./SearchableMultiSelectWithBadges";

const options: SearchOption[] = [
    {id: 1, label: "Option 1"},
    {id: 2, label: "Option 2"},
    {id: 3, label: "Option 3"},
    {id: 4, label: "Option 4"},
    {id: 5, label: "Option 5"},
];

const SearchableMultiSelectWithBadgesExample = () => <SearchableMultiSelectWithBadges options={options}/>;

export default SearchableMultiSelectWithBadgesExample;
