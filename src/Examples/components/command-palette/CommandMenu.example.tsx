import {CommandMenu, type IssueFields} from "./CommandMenu";

const people = ["Maya Chen", "Diego Ramos", "Priya Nair", "Tom Becker"];

const initialFields: IssueFields = {assignee: "Priya Nair", status: "In progress", priority: "High"};

const CommandMenuExample = () => (
    <CommandMenu
        issueKey="ENG-482"
        title="Fix token refresh on Safari"
        people={people}
        defaultValue={initialFields}
        issueUrl="https://tracker.example.com/issue/ENG-482"
        branchName="priya/eng-482-token-refresh-safari"
    />
);

export default CommandMenuExample;
