import {FilterCounts, type PullRequest} from "./FilterCounts";

const pullRequests: PullRequest[] = [
    {id: 2184, title: "Add retry with backoff to webhook delivery", author: "Tom Becker", state: "open", updated: "12m ago"},
    {id: 2181, title: "Move invoice PDFs to the new renderer", author: "Hana Sato", state: "open", updated: "1h ago"},
    {id: 2179, title: "Dark mode for the billing page", author: "Maya Chen", state: "draft", updated: "3h ago"},
    {id: 2176, title: "Cache team members on the settings page", author: "Diego Ramos", state: "merged", updated: "5h ago"},
    {id: 2172, title: "Fix timezone offset in weekly digest", author: "Priya Nair", state: "merged", updated: "yesterday"},
    {id: 2170, title: "Try a virtualized table for audit logs", author: "Owen Walsh", state: "closed", updated: "yesterday"},
    {id: 2168, title: "Upgrade the payments SDK to v9", author: "Kofi Mensah", state: "open", updated: "2d ago"},
    {id: 2165, title: "Onboarding checklist copy updates", author: "Sofia Rossi", state: "merged", updated: "3d ago"},
];

const FilterCountsExample = () => <FilterCounts items={pullRequests}/>;

export default FilterCountsExample;
