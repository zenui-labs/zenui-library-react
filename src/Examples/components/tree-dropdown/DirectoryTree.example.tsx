import {DirectoryTree, type DirectoryNode} from "./DirectoryTree";

const files: DirectoryNode[] = [
    {
        label: "Root Folder",
        children: [
            {
                label: "Documents",
                children: [
                    {label: "Work", children: [{label: "Resume.docx"}, {label: "ProjectProposal.pdf"}]},
                    {label: "Personal", children: [{label: "VacationPlan.xlsx"}]},
                ],
            },
            {label: "Legal", children: [{label: "Contract.pdf"}, {label: "TermsAndConditions.docx"}]},
        ],
    },
    {
        label: "Downloads",
        children: [
            {label: "Software", children: [{label: "Installer.exe"}, {label: "ReadMe.txt"}]},
            {label: "Images", children: [{label: "HolidayPhoto.jpg"}, {label: "ProfilePicture.png"}]},
        ],
    },
];

const DirectoryTreeExample = () => <DirectoryTree nodes={files}/>;

export default DirectoryTreeExample;
