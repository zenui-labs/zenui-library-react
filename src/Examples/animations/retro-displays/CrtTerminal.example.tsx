import {CrtTerminal, type TerminalFile} from "./CrtTerminal";

const files: TerminalFile[] = [
    {name: "mail", directory: true},
    {name: "src", directory: true},
    {name: "thesis", directory: true},
    {name: "budget-89.wk1"},
    {name: "modem.cfg"},
    {name: "notes.txt"},
    {name: "orbit.bas"},
    {name: "rogue"},
];

const CrtTerminalExample = () => (
    <CrtTerminal machine="Kestrel 386" user="mara" host="kestrel" files={files} memoryKb={4096} phosphor="green"/>
);

export default CrtTerminalExample;
