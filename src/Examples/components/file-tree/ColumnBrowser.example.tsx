import {ColumnBrowser, type BrowserItem} from "./ColumnBrowser";

const drive: BrowserItem[] = [
    {
        id: "brand",
        name: "Brand",
        children: [
            {
                id: "logos",
                name: "Logos",
                children: [
                    {id: "logo-primary", name: "Primary mark.svg", size: "18 KB", modified: "Aug 14", owner: "Nora Klein"},
                    {id: "logo-mono", name: "Monochrome.svg", size: "12 KB", modified: "Aug 14", owner: "Nora Klein"},
                    {id: "logo-app", name: "App icon.png", size: "284 KB", modified: "Jul 2", owner: "Sam Ortiz"},
                ],
            },
            {id: "guidelines", name: "Brand guidelines.pdf", size: "8.4 MB", modified: "Jun 30", owner: "Nora Klein"},
            {id: "palette", name: "Color palette.png", size: "96 KB", modified: "Jun 28", owner: "Sam Ortiz"},
        ],
    },
    {
        id: "marketing",
        name: "Marketing",
        children: [
            {
                id: "launch",
                name: "Fall launch",
                children: [
                    {id: "teaser", name: "Teaser 15s.mp4", size: "42 MB", modified: "Sep 22", owner: "Ivy Chen"},
                    {id: "copy", name: "Landing page copy.docx", size: "64 KB", modified: "Sep 24", owner: "Ivy Chen"},
                    {id: "budget", name: "Media budget.xlsx", size: "31 KB", modified: "Sep 19", owner: "Omar Haddad"},
                ],
            },
            {id: "personas", name: "Personas.pdf", size: "2.1 MB", modified: "May 11", owner: "Omar Haddad"},
        ],
    },
    {
        id: "finance",
        name: "Finance",
        children: [
            {id: "forecast", name: "2026 forecast.xlsx", size: "118 KB", modified: "Sep 3", owner: "Omar Haddad"},
            {id: "payroll", name: "Payroll summary.pdf", size: "740 KB", modified: "Aug 31", owner: "Lena Fox"},
        ],
    },
];

const ColumnBrowserExample = () => (
    <ColumnBrowser items={drive} rootLabel="Studio drive" defaultValue={["marketing", "launch", "copy"]}/>
);

export default ColumnBrowserExample;
