import {StorageDonut, type DonutSegment} from "./StorageDonut";

const segments: DonutSegment[] = [
    {id: "photos", label: "Photos", value: 82, stroke: "stroke-violet-500", dot: "bg-violet-500"},
    {id: "videos", label: "Videos", value: 61, stroke: "stroke-sky-500", dot: "bg-sky-500"},
    {id: "apps", label: "Apps", value: 38, stroke: "stroke-emerald-500", dot: "bg-emerald-500"},
    {id: "documents", label: "Documents", value: 17, stroke: "stroke-amber-500", dot: "bg-amber-500"},
    {id: "system", label: "System", value: 12, stroke: "stroke-rose-500", dot: "bg-rose-500"},
];

const StorageDonutExample = () => <StorageDonut title="Storage on MacBook Pro" segments={segments} capacity={256}/>;

export default StorageDonutExample;
