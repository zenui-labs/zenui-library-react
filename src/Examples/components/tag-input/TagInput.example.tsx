import {TagInput} from "./TagInput";

const suggestions: string[] = [
    "accessibility",
    "analytics",
    "authentication",
    "backend",
    "billing",
    "design system",
    "documentation",
    "frontend",
    "infrastructure",
    "mobile",
    "onboarding",
    "performance",
    "security",
];

const TagInputExample = () => <TagInput suggestions={suggestions} defaultValue={["frontend", "performance"]}/>;

export default TagInputExample;
