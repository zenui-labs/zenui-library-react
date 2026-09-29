import {TypewriterPrompt} from "./TypewriterPrompt";

const prompts: string[] = [
    "summarize this contract in plain English",
    "draft a friendly reply to Maya",
    "find every invoice over $5,000 from June",
    "turn these notes into a project brief",
];

const TypewriterPromptExample = () => <TypewriterPrompt prompts={prompts}/>;

export default TypewriterPromptExample;
