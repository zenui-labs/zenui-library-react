import {FilterTokens, type FilterField, type FilterItem, type FilterToken} from "./FilterTokens";

const fields: FilterField[] = [
    {name: "status", hint: "Workflow state", values: ["backlog", "in-progress", "in-review", "done"]},
    {name: "assignee", hint: "Who owns it", values: ["maya", "diego", "priya", "tom"]},
    {name: "priority", hint: "Urgent to low", values: ["urgent", "high", "medium", "low"]},
    {name: "label", hint: "Issue label", values: ["bug", "feature", "docs", "infra"]},
];

const issues: FilterItem[] = [
    {key: "WEB-412", title: "Checkout button overlaps footer on iOS", fields: {status: "in-progress", assignee: "maya", priority: "urgent", label: "bug"}},
    {key: "WEB-409", title: "Add saved payment methods", fields: {status: "backlog", assignee: "diego", priority: "high", label: "feature"}},
    {key: "WEB-405", title: "Session expires during long uploads", fields: {status: "in-review", assignee: "priya", priority: "high", label: "bug"}},
    {key: "WEB-398", title: "Document webhook retries", fields: {status: "done", assignee: "tom", priority: "low", label: "docs"}},
    {key: "WEB-396", title: "Move image resizing to the edge", fields: {status: "in-progress", assignee: "priya", priority: "medium", label: "infra"}},
    {key: "WEB-391", title: "Search ignores accented characters", fields: {status: "backlog", assignee: "maya", priority: "medium", label: "bug"}},
    {key: "WEB-387", title: "Dark mode for email receipts", fields: {status: "backlog", assignee: "diego", priority: "low", label: "feature"}},
];

const initialFilters: FilterToken[] = [
    {field: "status", value: "done", negate: true},
    {field: "label", value: "bug", negate: false},
];

const FilterTokensExample = () => <FilterTokens fields={fields} items={issues} defaultValue={initialFilters} trailingField="status"/>;

export default FilterTokensExample;
