import type {Example} from "../../types.ts";
import Select from "./Select.example.tsx";
import selectSource from "./Select.example.tsx?raw";
import selectComponentSource from "./Select.tsx?raw";
import IconSelect from "./IconSelect.example.tsx";
import iconSelectSource from "./IconSelect.example.tsx?raw";
import iconSelectComponentSource from "./IconSelect.tsx?raw";
import SearchableMultiSelect from "./SearchableMultiSelect.example.tsx";
import searchableMultiSelectSource from "./SearchableMultiSelect.example.tsx?raw";
import searchableMultiSelectComponentSource from "./SearchableMultiSelect.tsx?raw";
import SearchableSelect from "./SearchableSelect.example.tsx";
import searchableSelectSource from "./SearchableSelect.example.tsx?raw";
import searchableSelectComponentSource from "./SearchableSelect.tsx?raw";
import SearchableSelectWithBadge from "./SearchableSelectWithBadge.example.tsx";
import searchableSelectWithBadgeSource from "./SearchableSelectWithBadge.example.tsx?raw";
import searchableSelectWithBadgeComponentSource from "./SearchableSelectWithBadge.tsx?raw";
import SearchableMultiSelectWithBadges from "./SearchableMultiSelectWithBadges.example.tsx";
import searchableMultiSelectWithBadgesSource from "./SearchableMultiSelectWithBadges.example.tsx?raw";
import searchableMultiSelectWithBadgesComponentSource from "./SearchableMultiSelectWithBadges.tsx?raw";

const examples: Example[] = [
    {
        id: "select",
        title: "Select",
        description: "A basic select that opens a menu of options. The picked option becomes the button text.",
        component: Select,
        source: selectSource,
        files: [{name: "Select.tsx", source: selectComponentSource}],
        minHeight: 360,
    },
    {
        id: "select_with_icon",
        title: "Select with icon",
        description: "A select whose menu shows an icon next to each option.",
        component: IconSelect,
        source: iconSelectSource,
        files: [{name: "IconSelect.tsx", source: iconSelectComponentSource}],
        minHeight: 360,
    },
    {
        id: "multiple_select_with_search",
        title: "Multiple select with search",
        description: "A multiple select with a search field, for finding and picking several options in a long list.",
        component: SearchableMultiSelect,
        source: searchableMultiSelectSource,
        files: [{name: "SearchableMultiSelect.tsx", source: searchableMultiSelectComponentSource}],
        minHeight: 420,
    },
    {
        id: "single_select_with_search",
        title: "Single select with search",
        description: "A single select with a search field for quickly finding and picking one option.",
        component: SearchableSelect,
        source: searchableSelectSource,
        files: [{name: "SearchableSelect.tsx", source: searchableSelectComponentSource}],
        minHeight: 420,
    },
    {
        id: "single_select_with_search_and_badge",
        title: "Single select with search and badge",
        description: "A single select with a search field that shows the picked option as a badge you can clear.",
        component: SearchableSelectWithBadge,
        source: searchableSelectWithBadgeSource,
        files: [{name: "SearchableSelectWithBadge.tsx", source: searchableSelectWithBadgeComponentSource}],
        minHeight: 420,
    },
    {
        id: "multiple_select_with_search_and_badge",
        title: "Multiple select with search and badge",
        description: "A multiple select with a search field that shows each picked option as a badge you can remove.",
        component: SearchableMultiSelectWithBadges,
        source: searchableMultiSelectWithBadgesSource,
        files: [{name: "SearchableMultiSelectWithBadges.tsx", source: searchableMultiSelectWithBadgesComponentSource}],
        minHeight: 420,
    },
];

export default examples;
