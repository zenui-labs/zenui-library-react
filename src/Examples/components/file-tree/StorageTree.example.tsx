import {StorageTree, type StorageEntry} from "./StorageTree";

const disk: StorageEntry[] = [
    {
        name: "Movies",
        children: [
            {name: "Wedding edit 4K.mov", size: 86.4, kind: "video"},
            {name: "Drone reels", children: [{name: "Coastline.mp4", size: 18.2, kind: "video"}, {name: "Harbor at dusk.mp4", size: 11.7, kind: "video"}]},
            {name: "Screen recordings", children: [{name: "Onboarding demo.mov", size: 3.1, kind: "video"}, {name: "Bug repro.mov", size: 0.8, kind: "video"}]},
        ],
    },
    {
        name: "Pictures",
        children: [
            {name: "Photos Library.photoslibrary", size: 74.6, kind: "photos"},
            {name: "RAW imports", children: [{name: "Iceland 2025", size: 22.3, kind: "photos"}, {name: "Studio headshots", size: 6.9, kind: "photos"}]},
        ],
    },
    {
        name: "Applications",
        children: [
            {name: "Xcode.app", size: 34.8, kind: "apps"},
            {name: "Final Cut Pro.app", size: 6.2, kind: "apps"},
            {name: "Figma.app", size: 0.6, kind: "apps"},
        ],
    },
    {
        name: "Documents",
        children: [
            {name: "Client archive", children: [{name: "Acme 2024.zip", size: 9.4, kind: "documents"}, {name: "Lumen contracts", size: 1.2, kind: "documents"}]},
            {name: "Tax returns", size: 0.4, kind: "documents"},
        ],
    },
    {name: "Library caches", size: 17.9, kind: "other"},
    {name: "Downloads", children: [{name: "ubuntu-24.04.iso", size: 5.7, kind: "other"}, {name: "Installers", size: 3.3, kind: "apps"}]},
];

const StorageTreeExample = () => <StorageTree entries={disk} capacity={512} title="Macintosh HD" defaultExpanded={["Movies"]}/>;

export default StorageTreeExample;
