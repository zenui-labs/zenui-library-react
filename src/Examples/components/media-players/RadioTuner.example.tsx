import {RadioTuner, type RadioStation} from "./RadioTuner";

const stations: RadioStation[] = [
    {frequency: 88.7, name: "Low Tide Radio", dialLabel: "Low Tide", genre: "Ambient and drone, all night"},
    {frequency: 91.3, name: "Harbor Public", dialLabel: "Harbor", genre: "News and talk"},
    {frequency: 94.1, name: "Copperline 94", dialLabel: "Copperline", genre: "Americana and roots"},
    {frequency: 97.9, name: "Nightjar FM", dialLabel: "Nightjar", genre: "Late-night jazz"},
    {frequency: 100.5, name: "Parkside Classical", dialLabel: "Parkside", genre: "Classical, commercial free"},
    {frequency: 103.3, name: "The Foundry", dialLabel: "Foundry", genre: "Indie and alternative"},
    {frequency: 106.7, name: "Kestrel 106.7", dialLabel: "Kestrel", genre: "Electronic and dance"},
];

const RadioTunerExample = () => <RadioTuner stations={stations} defaultFrequency={96.8}/>;

export default RadioTunerExample;
