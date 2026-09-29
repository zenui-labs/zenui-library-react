import {SelectableTree, type SyncNode} from "./SelectableTree";

const tree: SyncNode[] = [
    {
        id: "clients",
        name: "Clients",
        children: [
            {
                id: "acme",
                name: "Acme Outdoor",
                children: [
                    {id: "acme-brief", name: "Campaign brief.pdf", size: 4.2},
                    {id: "acme-cut", name: "Spring spot final cut.mov", size: 3_860},
                    {id: "acme-stills", name: "Product stills.zip", size: 1_240},
                ],
            },
            {
                id: "lumen",
                name: "Lumen Health",
                children: [
                    {id: "lumen-deck", name: "Pitch deck v4.key", size: 212},
                    {id: "lumen-research", name: "Interview notes.docx", size: 1.8},
                ],
            },
        ],
    },
    {
        id: "footage",
        name: "Raw footage",
        children: [
            {id: "a-cam", name: "A cam day 1.mov", size: 8_420},
            {id: "b-cam", name: "B cam day 1.mov", size: 7_910},
            {id: "drone", name: "Drone pass.mp4", size: 2_380},
        ],
    },
    {
        id: "admin",
        name: "Admin",
        children: [
            {id: "invoices", name: "Invoices 2025.xlsx", size: 0.9},
            {id: "contract", name: "Studio lease.pdf", size: 2.6},
        ],
    },
];

const SelectableTreeExample = () => (
    <SelectableTree
        nodes={tree}
        freeSpace={24_000}
        defaultValue={["acme-brief", "acme-stills", "lumen-deck", "lumen-research", "invoices", "contract"]}
        defaultExpanded={["clients", "acme"]}
        description="Unchecked items stay online only on this Mac."
    />
);

export default SelectableTreeExample;
