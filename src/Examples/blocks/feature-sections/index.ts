import type {Example} from "../../types.ts";
import BentoGrid from "./BentoGrid.example.tsx";
import bentoGridSource from "./BentoGrid.example.tsx?raw";
import bentoGridComponentSource from "./BentoGrid.tsx?raw";
import FeatureTabs from "./FeatureTabs.example.tsx";
import featureTabsSource from "./FeatureTabs.example.tsx?raw";
import featureTabsComponentSource from "./FeatureTabs.tsx?raw";
import AlternatingRows from "./AlternatingRows.example.tsx";
import alternatingRowsSource from "./AlternatingRows.example.tsx?raw";
import alternatingRowsComponentSource from "./AlternatingRows.tsx?raw";
import StickyScrollFeatures from "./StickyScrollFeatures.example.tsx";
import stickyScrollFeaturesSource from "./StickyScrollFeatures.example.tsx?raw";
import stickyScrollFeaturesComponentSource from "./StickyScrollFeatures.tsx?raw";
import SpotlightIconGrid from "./SpotlightIconGrid.example.tsx";
import spotlightIconGridSource from "./SpotlightIconGrid.example.tsx?raw";
import spotlightIconGridComponentSource from "./SpotlightIconGrid.tsx?raw";
import StatsFeatures from "./StatsFeatures.example.tsx";
import statsFeaturesSource from "./StatsFeatures.example.tsx?raw";
import statsFeaturesComponentSource from "./StatsFeatures.tsx?raw";
import CodeFeatures from "./CodeFeatures.example.tsx";
import codeFeaturesSource from "./CodeFeatures.example.tsx?raw";
import codeFeaturesComponentSource from "./CodeFeatures.tsx?raw";
import BeforeAfterSlider from "./BeforeAfterSlider.example.tsx";
import beforeAfterSliderSource from "./BeforeAfterSlider.example.tsx?raw";
import beforeAfterSliderComponentSource from "./BeforeAfterSlider.tsx?raw";
import IntegrationsGrid from "./IntegrationsGrid.example.tsx";
import integrationsGridSource from "./IntegrationsGrid.example.tsx?raw";
import integrationsGridComponentSource from "./IntegrationsGrid.tsx?raw";

const examples: Example[] = [
    {
        id: "bento-grid",
        title: "Bento grid",
        description: "A feature grid with tiles of different sizes, each holding a small product illustration. Use it to show several capabilities at once below a hero.",
        component: BentoGrid,
        source: bentoGridSource,
        files: [{name: "BentoGrid.tsx", source: bentoGridComponentSource}],
        layout: "full",
        minHeight: 720,
    },
    {
        id: "feature-tabs",
        title: "Feature tabs",
        description: "Vertical tabs next to an animated product preview. Use it when each feature needs its own screenshot or mockup.",
        component: FeatureTabs,
        source: featureTabsSource,
        files: [{name: "FeatureTabs.tsx", source: featureTabsComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "alternating-rows",
        title: "Alternating feature rows",
        description: "Text and product mockups that swap sides row by row, each with a checklist and a link. Use it for a longer features page where every capability gets room to explain itself.",
        component: AlternatingRows,
        source: alternatingRowsSource,
        files: [{name: "AlternatingRows.tsx", source: alternatingRowsComponentSource}],
        layout: "full",
        minHeight: 1400,
    },
    {
        id: "sticky-scroll-features",
        title: "Sticky scroll steps",
        description: "A numbered list of steps with a pinned preview that changes as each step scrolls into the middle of the screen. Use it to walk through a workflow from start to finish.",
        component: StickyScrollFeatures,
        source: stickyScrollFeaturesSource,
        files: [{name: "StickyScrollFeatures.tsx", source: stickyScrollFeaturesComponentSource}],
        layout: "full",
        minHeight: 1200,
    },
    {
        id: "spotlight-icon-grid",
        title: "Icon grid with spotlight",
        description: "Eight feature cards whose borders glow under the cursor and reveal a short spec list on hover or focus. Use it for security, compliance or platform capability overviews.",
        component: SpotlightIconGrid,
        source: spotlightIconGridSource,
        files: [{name: "SpotlightIconGrid.tsx", source: spotlightIconGridComponentSource}],
        layout: "full",
        minHeight: 720,
    },
    {
        id: "stats-features",
        title: "Big numbers with features",
        description: "Three headline results that count up when they scroll into view, each paired with a small trend chart and the feature behind it. Use it when outcomes sell the product better than feature names.",
        component: StatsFeatures,
        source: statsFeaturesSource,
        files: [{name: "StatsFeatures.tsx", source: statsFeaturesComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "code-features",
        title: "Features with code sample",
        description: "A feature list that drives a code window with language tabs, highlighted lines and a copy button. Use it on developer product and API landing pages.",
        component: CodeFeatures,
        source: codeFeaturesSource,
        files: [{name: "CodeFeatures.tsx", source: codeFeaturesComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "before-after-slider",
        title: "Before and after slider",
        description: "A draggable, keyboard accessible divider that compares the old way with the new one, followed by before and after metrics. Use it when the change is easier to see than to describe.",
        component: BeforeAfterSlider,
        source: beforeAfterSliderSource,
        files: [{name: "BeforeAfterSlider.tsx", source: beforeAfterSliderComponentSource}],
        layout: "full",
        minHeight: 820,
    },
    {
        id: "integrations-grid",
        title: "Integrations grid",
        description: "A searchable, filterable directory of integrations with connect buttons. Use it on an integrations or marketplace page.",
        component: IntegrationsGrid,
        source: integrationsGridSource,
        files: [{name: "IntegrationsGrid.tsx", source: integrationsGridComponentSource}],
        layout: "full",
        minHeight: 640,
    },
];

export default examples;
