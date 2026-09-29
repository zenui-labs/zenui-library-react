import {EditableHeading, type HeadingContent} from "./EditableHeading";

const doc: HeadingContent = {
    title: "Q4 launch plan for the Atlas mobile app",
    summary: "Scope, owners and dates for the November release. Covers the new onboarding flow, offline sync and the updated billing screens.",
};

const EditableHeadingExample = () => (
    <EditableHeading defaultValue={doc} breadcrumbs={["Product", "Planning"]} lastEdited="Last edited by Maya Chen on Sep 24"/>
);

export default EditableHeadingExample;
