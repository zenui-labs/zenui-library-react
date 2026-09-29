import {EditableTree, type EditableNode} from "./EditableTree";

const pages: EditableNode[] = [
    {
        id: "f-guides",
        name: "Guides",
        kind: "folder",
        children: [
            {id: "n-onboarding", name: "Onboarding checklist", kind: "file"},
            {id: "n-release", name: "Release process", kind: "file"},
        ],
    },
    {
        id: "f-meetings",
        name: "Meeting notes",
        kind: "folder",
        children: [
            {id: "n-planning", name: "Q3 planning", kind: "file"},
            {id: "n-retro", name: "Launch retro", kind: "file"},
        ],
    },
    {id: "n-roadmap", name: "Roadmap", kind: "file"},
];

const EditableTreeExample = () => (
    <EditableTree defaultNodes={pages} defaultExpanded={["f-guides", "f-meetings"]} defaultSelectedId="n-release"/>
);

export default EditableTreeExample;
