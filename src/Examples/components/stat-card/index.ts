import type {Example} from "../../types.ts";
import KpiCards from "./KpiCards.example.tsx";
import kpiCardsSource from "./KpiCards.example.tsx?raw";
import kpiCardsComponentSource from "./KpiCards.tsx?raw";
import RevenueCard from "./RevenueCard.example.tsx";
import revenueCardSource from "./RevenueCard.example.tsx?raw";
import revenueCardComponentSource from "./RevenueCard.tsx?raw";
import GoalRing from "./GoalRing.example.tsx";
import goalRingSource from "./GoalRing.example.tsx?raw";
import goalRingComponentSource from "./GoalRing.tsx?raw";
import ChannelComparison from "./ChannelComparison.example.tsx";
import channelComparisonSource from "./ChannelComparison.example.tsx?raw";
import channelComparisonComponentSource from "./ChannelComparison.tsx?raw";
import FunnelCard from "./FunnelCard.example.tsx";
import funnelCardSource from "./FunnelCard.example.tsx?raw";
import funnelCardComponentSource from "./FunnelCard.tsx?raw";
import LiveMetric from "./LiveMetric.example.tsx";
import liveMetricSource from "./LiveMetric.example.tsx?raw";
import liveMetricComponentSource from "./LiveMetric.tsx?raw";
import CompactKpis from "./CompactKpis.example.tsx";
import compactKpisSource from "./CompactKpis.example.tsx?raw";
import compactKpisComponentSource from "./CompactKpis.tsx?raw";
import UsageLimits from "./UsageLimits.example.tsx";
import usageLimitsSource from "./UsageLimits.example.tsx?raw";
import usageLimitsComponentSource from "./UsageLimits.tsx?raw";

const examples: Example[] = [
    {
        id: "kpi-cards",
        title: "KPI cards",
        description: "Metric cards with a trend badge and a small sparkline. Mark a metric as lower is better and the colors flip.",
        component: KpiCards,
        source: kpiCardsSource,
        files: [{name: "KpiCards.tsx", source: kpiCardsComponentSource}],
    },
    {
        id: "revenue-card",
        title: "Revenue card",
        description: "A metric card with a chart you can scrub with the pointer or the arrow keys to read daily values.",
        component: RevenueCard,
        source: revenueCardSource,
        files: [{name: "RevenueCard.tsx", source: revenueCardComponentSource}],
        minHeight: 420,
    },
    {
        id: "goal-ring",
        title: "Goal progress ring",
        description: "A ring that fills toward a sales target, with a marker for where steady pace would be today and a forecast badge. Switch regions to compare.",
        component: GoalRing,
        source: goalRingSource,
        files: [{name: "GoalRing.tsx", source: goalRingComponentSource}],
        minHeight: 440,
    },
    {
        id: "channel-comparison",
        title: "Period comparison bars",
        description: "Horizontal bars for this month with a marker for last month, so gains and drops per channel read at a glance.",
        component: ChannelComparison,
        source: channelComparisonSource,
        files: [{name: "ChannelComparison.tsx", source: channelComparisonComponentSource}],
        minHeight: 460,
    },
    {
        id: "funnel-card",
        title: "Conversion funnel",
        description: "A step-by-step funnel with column bars. Pick a step to see its conversion from the previous step, the overall rate and the median time.",
        component: FunnelCard,
        source: funnelCardSource,
        files: [{name: "FunnelCard.tsx", source: funnelCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "live-metric",
        title: "Live metric",
        description: "A requests per second counter with rolling digits and a scrolling chart. Updates pause while the card is off screen or the tab is hidden.",
        component: LiveMetric,
        source: liveMetricSource,
        files: [{name: "LiveMetric.tsx", source: liveMetricComponentSource}],
        minHeight: 420,
    },
    {
        id: "compact-kpis",
        title: "Compact KPI grid",
        description: "Eight small metrics in one bordered grid with a trend, a tiny bar history and a definition on hover or focus. Built for dense dashboards.",
        component: CompactKpis,
        source: compactKpisSource,
        files: [{name: "CompactKpis.tsx", source: compactKpisComponentSource}],
        minHeight: 360,
    },
    {
        id: "usage-limits",
        title: "Usage and limits",
        description: "A plan usage card with a stacked storage bar and meters that turn amber near the limit and red when it is exceeded.",
        component: UsageLimits,
        source: usageLimitsSource,
        files: [{name: "UsageLimits.tsx", source: usageLimitsComponentSource}],
        minHeight: 560,
    },
];

export default examples;
