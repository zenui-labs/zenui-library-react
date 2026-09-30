import type {Example} from "../../types.ts";
import SubwayTimeline from "./SubwayTimeline.example.tsx";
import subwayTimelineSource from "./SubwayTimeline.example.tsx?raw";
import subwayTimelineComponentSource from "./SubwayTimeline.tsx?raw";
import GitGraphChangelog from "./GitGraphChangelog.example.tsx";
import gitGraphChangelogSource from "./GitGraphChangelog.example.tsx?raw";
import gitGraphChangelogComponentSource from "./GitGraphChangelog.tsx?raw";
import PeriodicFeatures from "./PeriodicFeatures.example.tsx";
import periodicFeaturesSource from "./PeriodicFeatures.example.tsx?raw";
import periodicFeaturesComponentSource from "./PeriodicFeatures.tsx?raw";
import ReceiptSummary from "./ReceiptSummary.example.tsx";
import receiptSummarySource from "./ReceiptSummary.example.tsx?raw";
import receiptSummaryComponentSource from "./ReceiptSummary.tsx?raw";
import CorkboardWall from "./CorkboardWall.example.tsx";
import corkboardWallSource from "./CorkboardWall.example.tsx?raw";
import corkboardWallComponentSource from "./CorkboardWall.tsx?raw";

const examples: Example[] = [
    {
        id: "subway-timeline",
        title: "Subway map timeline",
        description: "Company history drawn as a transit map, with an enterprise line that branches off and rejoins. A train rides the line as you scroll, and each station opens its milestone on hover or keyboard focus.",
        component: SubwayTimeline,
        source: subwayTimelineSource,
        files: [{name: "SubwayTimeline.tsx", source: subwayTimelineComponentSource}],
        layout: "full",
        minHeight: 720,
    },
    {
        id: "git-graph-changelog",
        title: "Git graph changelog",
        description: "A changelog drawn as a commit graph, with feature branches that fork and merge and release tags that open their notes. Filter chips fold unrelated commits down to a hairline while the graph keeps its shape.",
        component: GitGraphChangelog,
        source: gitGraphChangelogSource,
        files: [{name: "GitGraphChangelog.tsx", source: gitGraphChangelogComponentSource}],
        layout: "full",
        minHeight: 1100,
    },
    {
        id: "periodic-features",
        title: "Periodic table of features",
        description: "Features laid out as a periodic table with a category key. Hovering a group lights it up, and opening an element grows its detail card out of the tile. Escape closes the card and small screens get a simple grid.",
        component: PeriodicFeatures,
        source: periodicFeaturesSource,
        files: [{name: "PeriodicFeatures.tsx", source: periodicFeaturesComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "receipt-summary",
        title: "Year in review receipt",
        description: "A year in review printed as a thermal receipt that feeds out of a printer in short jerks, with dotted leaders, a torn edge and a barcode. Reprint tears it off and prints a new one, and reduced motion shows it straight away.",
        component: ReceiptSummary,
        source: receiptSummarySource,
        files: [{name: "ReceiptSummary.tsx", source: receiptSummaryComponentSource}],
        layout: "full",
        minHeight: 920,
    },
    {
        id: "corkboard-wall",
        title: "Corkboard testimonials",
        description: "Testimonials pinned to a corkboard on index cards, sticky notes, a polaroid and a notebook page. Notes can be dragged or moved with the arrow keys, swing on their pins, and red yarn between related notes follows them around.",
        component: CorkboardWall,
        source: corkboardWallSource,
        files: [{name: "CorkboardWall.tsx", source: corkboardWallComponentSource}],
        layout: "full",
        minHeight: 960,
    },
];

export default examples;
