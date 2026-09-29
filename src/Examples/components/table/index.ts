import type {Example} from "../../types.ts";
import SearchableTable from "./SearchableTable.example.tsx";
import searchableTableSource from "./SearchableTable.example.tsx?raw";
import searchableTableComponentSource from "./SearchableTable.tsx?raw";
import PaginatedTable from "./PaginatedTable.example.tsx";
import paginatedTableSource from "./PaginatedTable.example.tsx?raw";
import paginatedTableComponentSource from "./PaginatedTable.tsx?raw";
import SelectableTable from "./SelectableTable.example.tsx";
import selectableTableSource from "./SelectableTable.example.tsx?raw";
import selectableTableComponentSource from "./SelectableTable.tsx?raw";

const examples: Example[] = [
    {
        id: "searchable_table",
        title: "Searchable table",
        description: "A table with a search field that filters rows as you type. Click a column header to sort, and open the menu on a row for its actions.",
        component: SearchableTable,
        source: searchableTableSource,
        files: [{name: "SearchableTable.tsx", source: searchableTableComponentSource}],
        minHeight: 460,
    },
    {
        id: "pagination_table",
        title: "Pagination table",
        description: "A table that splits rows into pages, with a rows per page menu and buttons to move between pages.",
        component: PaginatedTable,
        source: paginatedTableSource,
        files: [{name: "PaginatedTable.tsx", source: paginatedTableComponentSource}],
        minHeight: 860,
    },
    {
        id: "checkbox_table",
        title: "Checkbox table",
        description: "A table with a checkbox on each row, so people can select several rows for a bulk action such as delete.",
        component: SelectableTable,
        source: selectableTableSource,
        files: [{name: "SelectableTable.tsx", source: selectableTableComponentSource}],
        minHeight: 860,
    },
];

export default examples;
