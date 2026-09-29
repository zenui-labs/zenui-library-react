import type {Example} from "../../types.ts";
import ViewSwitcher from "./ViewSwitcher.example.tsx";
import viewSwitcherSource from "./ViewSwitcher.example.tsx?raw";
import viewSwitcherComponentSource from "./ViewSwitcher.tsx?raw";
import BillingToggle from "./BillingToggle.example.tsx";
import billingToggleSource from "./BillingToggle.example.tsx?raw";
import billingToggleComponentSource from "./BillingToggle.tsx?raw";
import IconSegments from "./IconSegments.example.tsx";
import iconSegmentsSource from "./IconSegments.example.tsx?raw";
import iconSegmentsComponentSource from "./IconSegments.tsx?raw";
import FilterCounts from "./FilterCounts.example.tsx";
import filterCountsSource from "./FilterCounts.example.tsx?raw";
import filterCountsComponentSource from "./FilterCounts.tsx?raw";
import UnderlineTabs from "./UnderlineTabs.example.tsx";
import underlineTabsSource from "./UnderlineTabs.example.tsx?raw";
import underlineTabsComponentSource from "./UnderlineTabs.tsx?raw";
import VerticalOptions from "./VerticalOptions.example.tsx";
import verticalOptionsSource from "./VerticalOptions.example.tsx?raw";
import verticalOptionsComponentSource from "./VerticalOptions.tsx?raw";
import SizesAndStates from "./SizesAndStates.example.tsx";
import sizesAndStatesSource from "./SizesAndStates.example.tsx?raw";
import sizesAndStatesComponentSource from "./SizesAndStates.tsx?raw";
import ToggleGroup from "./ToggleGroup.example.tsx";
import toggleGroupSource from "./ToggleGroup.example.tsx?raw";
import toggleGroupComponentSource from "./ToggleGroup.tsx?raw";
import DraggableThumb from "./DraggableThumb.example.tsx";
import draggableThumbSource from "./DraggableThumb.example.tsx?raw";
import draggableThumbComponentSource from "./DraggableThumb.tsx?raw";

const examples: Example[] = [
    {
        id: "view-switcher",
        title: "View switcher",
        description: "A segmented control with a sliding indicator for switching layouts or filters. It works as a radio group, so arrow keys change the selection.",
        component: ViewSwitcher,
        source: viewSwitcherSource,
        files: [{name: "ViewSwitcher.tsx", source: viewSwitcherComponentSource}],
    },
    {
        id: "billing-toggle",
        title: "Billing toggle",
        description: "A monthly or yearly switch for pricing pages. Prices roll to the new value when the cycle changes.",
        component: BillingToggle,
        source: billingToggleSource,
        files: [{name: "BillingToggle.tsx", source: billingToggleComponentSource}],
        minHeight: 460,
    },
    {
        id: "icon-segments",
        title: "Icon segments",
        description: "Compact icon-only segments for settings and toolbars. Each option has an accessible name and a tooltip.",
        component: IconSegments,
        source: iconSegmentsSource,
        files: [{name: "IconSegments.tsx", source: iconSegmentsComponentSource}],
        minHeight: 420,
    },
    {
        id: "filter-counts",
        title: "Filter pills with counts",
        description: "A pill-shaped filter bar where each option shows how many items it holds. On narrow screens it scrolls sideways instead of wrapping.",
        component: FilterCounts,
        source: filterCountsSource,
        files: [{name: "FilterCounts.tsx", source: filterCountsComponentSource}],
        minHeight: 420,
    },
    {
        id: "underline-tabs",
        title: "Underline tabs",
        description: "A tab list with a sliding underline and panels that slide in from the direction you moved. Suits settings pages and dense headers.",
        component: UnderlineTabs,
        source: underlineTabsSource,
        files: [{name: "UnderlineTabs.tsx", source: underlineTabsComponentSource}],
        minHeight: 420,
    },
    {
        id: "vertical-options",
        title: "Vertical options",
        description: "A stacked control where each option has an icon and a description. Good for preferences that need a sentence of explanation.",
        component: VerticalOptions,
        source: verticalOptionsSource,
        files: [{name: "VerticalOptions.tsx", source: verticalOptionsComponentSource}],
        minHeight: 560,
    },
    {
        id: "sizes-and-states",
        title: "Sizes and disabled states",
        description: "Small, medium and large sizes, an option that is locked with a reason, and a control that is read only.",
        component: SizesAndStates,
        source: sizesAndStatesSource,
        files: [{name: "SizesAndStates.tsx", source: sizesAndStatesComponentSource}],
        minHeight: 560,
    },
    {
        id: "toggle-group",
        title: "Formatting toolbar",
        description: "A multiple choice toggle group for text styles next to a single choice group for alignment, both driving a live text field.",
        component: ToggleGroup,
        source: toggleGroupSource,
        files: [{name: "ToggleGroup.tsx", source: toggleGroupComponentSource}],
        minHeight: 380,
    },
    {
        id: "draggable-thumb",
        title: "Draggable thumb",
        description: "A touch-friendly control where you can drag the thumb between options or tap one. The thumb snaps to the nearest option on release.",
        component: DraggableThumb,
        source: draggableThumbSource,
        files: [{name: "DraggableThumb.tsx", source: draggableThumbComponentSource}],
        minHeight: 440,
    },
];

export default examples;
