import {LuDatabase, LuFigma, LuGithub, LuMail, LuSlack, LuWorkflow} from "react-icons/lu";
import {IntegrationHub, type HubCenter, type HubNode} from "./IntegrationHub";

const sources: HubNode[] = [
    {id: "github", label: "Commits", icon: LuGithub},
    {id: "figma", label: "Designs", icon: LuFigma},
    {id: "slack", label: "Messages", icon: LuSlack},
];

const destinations: HubNode[] = [
    {id: "warehouse", label: "Warehouse", icon: LuDatabase},
    {id: "digest", label: "Weekly digest", icon: LuMail},
];

const hub: HubCenter = {label: "Relay", icon: LuWorkflow};

const IntegrationHubExample = () => (
    <IntegrationHub
        sources={sources}
        destinations={destinations}
        hub={hub}
        caption="Relay collects events from your tools and routes them to your warehouse and inbox."
    />
);

export default IntegrationHubExample;
