import type {Example} from "../../types.ts";
import RidgelinePlot from "./RidgelinePlot.example.tsx";
import ridgelinePlotSource from "./RidgelinePlot.example.tsx?raw";
import ridgelinePlotComponentSource from "./RidgelinePlot.tsx?raw";
import SpiralCalendar from "./SpiralCalendar.example.tsx";
import spiralCalendarSource from "./SpiralCalendar.example.tsx?raw";
import spiralCalendarComponentSource from "./SpiralCalendar.tsx?raw";
import BumpChart from "./BumpChart.example.tsx";
import bumpChartSource from "./BumpChart.example.tsx?raw";
import bumpChartComponentSource from "./BumpChart.tsx?raw";
import ConstellationRadar from "./ConstellationRadar.example.tsx";
import constellationRadarSource from "./ConstellationRadar.example.tsx?raw";
import constellationRadarComponentSource from "./ConstellationRadar.tsx?raw";
import HorizonChart from "./HorizonChart.example.tsx";
import horizonChartSource from "./HorizonChart.example.tsx?raw";
import horizonChartComponentSource from "./HorizonChart.tsx?raw";

const examples: Example[] = [
    {
        id: "ridgeline-plot",
        title: "Ridgeline plot",
        description: "Overlapping density ridges, one per category, where each ridge hides the ones behind it. Hovering or arrowing to a ridge lifts it out of the stack and marks its median.",
        component: RidgelinePlot,
        source: ridgelinePlotSource,
        files: [{name: "RidgelinePlot.tsx", source: ridgelinePlotComponentSource}],
        minHeight: 520,
    },
    {
        id: "spiral-calendar",
        title: "Spiral calendar",
        description: "A year of daily values along a spiral with one turn per month, so seasons read as rings. Hover a day to see it and every other day on the same weekday; arrow keys move by day and by month.",
        component: SpiralCalendar,
        source: spiralCalendarSource,
        files: [{name: "SpiralCalendar.tsx", source: spiralCalendarComponentSource}],
        minHeight: 680,
    },
    {
        id: "bump-chart",
        title: "Bump chart",
        description: "Rankings over time, worked out from the values you pass. Hover a line to bring it forward and click or press Enter to pin it; the pinned line shows how many places it moved at each swap.",
        component: BumpChart,
        source: bumpChartSource,
        files: [{name: "BumpChart.tsx", source: bumpChartComponentSource}],
        minHeight: 460,
    },
    {
        id: "constellation-radar",
        title: "Constellation radar",
        description: "A radar chart drawn as a star chart, with stars sized and named by value. It switches between a night sky and an ink-on-paper atlas with the theme, can compare two profiles, and stops twinkling with reduced motion.",
        component: ConstellationRadar,
        source: constellationRadarSource,
        files: [{name: "ConstellationRadar.tsx", source: constellationRadarComponentSource}],
        minHeight: 640,
    },
    {
        id: "horizon-chart",
        title: "Horizon chart",
        description: "Dense time series folded into three color bands per row, with one crosshair that reads every row at once. Click a row name to unfold it into the plain chart; arrow keys move the crosshair.",
        component: HorizonChart,
        source: horizonChartSource,
        files: [{name: "HorizonChart.tsx", source: horizonChartComponentSource}],
        minHeight: 480,
    },
];

export default examples;
