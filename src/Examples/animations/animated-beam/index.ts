import type {Example} from "../../types.ts";
import IntegrationHub from "./IntegrationHub.example.tsx";
import integrationHubSource from "./IntegrationHub.example.tsx?raw";
import DataPipeline from "./DataPipeline.example.tsx";
import dataPipelineSource from "./DataPipeline.example.tsx?raw";
import FanInInbox from "./FanInInbox.example.tsx";
import fanInInboxSource from "./FanInInbox.example.tsx?raw";
import OrbitNetwork from "./OrbitNetwork.example.tsx";
import orbitNetworkSource from "./OrbitNetwork.example.tsx?raw";
import RequestTrace from "./RequestTrace.example.tsx";
import requestTraceSource from "./RequestTrace.example.tsx?raw";
import CircuitBoard from "./CircuitBoard.example.tsx";
import circuitBoardSource from "./CircuitBoard.example.tsx?raw";

const examples: Example[] = [
    {
        id: "integration-hub",
        title: "Integration hub",
        description: "Pulses of light travel along curved lines from connected tools into a hub and out to destinations. Use it to explain how data moves through a product.",
        component: IntegrationHub,
        source: integrationHubSource,
        minHeight: 420,
    },
    {
        id: "data-pipeline",
        title: "Data pipeline",
        description: "An ETL run that works through four stages in order. Each stage spins while it works and a packet travels down the connector to the next one. It lays out vertically on small screens.",
        component: DataPipeline,
        source: dataPipelineSource,
        minHeight: 420,
    },
    {
        id: "fan-in-inbox",
        title: "Many channels, one inbox",
        description: "Conversations from five channels travel down curved beams into a shared inbox, which counts each arrival and shows the newest message.",
        component: FanInInbox,
        source: fanInInboxSource,
        minHeight: 460,
    },
    {
        id: "orbit-network",
        title: "Orbit network",
        description: "Connected apps circle a hub on two rings that turn in opposite directions, with pulses flowing in and out along the spokes. The rings stop while off screen.",
        component: OrbitNetwork,
        source: orbitNetworkSource,
        minHeight: 520,
    },
    {
        id: "request-trace",
        title: "Request trace",
        description: "A distributed trace where a beam runs down the call tree as each span starts and waterfall bars grow for as long as the span takes. The slow query stands out in amber.",
        component: RequestTrace,
        source: requestTraceSource,
        minHeight: 480,
    },
    {
        id: "circuit-board",
        title: "Circuit board",
        description: "Signals pulse along right-angled traces into a controller chip and commands pulse back out. A power button starts and stops the board.",
        component: CircuitBoard,
        source: circuitBoardSource,
        minHeight: 480,
    },
];

export default examples;
