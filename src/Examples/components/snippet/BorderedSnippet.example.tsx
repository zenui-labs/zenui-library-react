import {BorderedSnippet} from "./BorderedSnippet";

const BorderedSnippetExample = () => (
    <div className="flex flex-col items-center gap-5">
        <BorderedSnippet command="npm i @zenui"/>
        <BorderedSnippet command="npm i @zenui" tone="neutral"/>
    </div>
);

export default BorderedSnippetExample;
