import {LuEye, LuGitBranch, LuRocket, LuShieldCheck} from "react-icons/lu";
import {BuildLog, ChecksList, PreviewComment, RolloutProgress, StickyScrollFeatures} from "./StickyScrollFeatures";
import type {CheckResult, RolloutMetric, ScrollStep} from "./StickyScrollFeatures";

const buildLog: string[] = [
    "Cloning github.com/acme/storefront (main)",
    "Detected Next.js 15, Node 22",
    "Restored build cache (412 MB)",
    "Installed 1,284 packages in 6.2s",
    "Compiled 318 routes in 28.4s",
    "Uploaded 2,041 static files",
];

const checks: CheckResult[] = [
    {name: "Lighthouse performance", result: "98", pass: true},
    {name: "Bundle size /checkout", result: "184 kB of 200 kB", pass: true},
    {name: "Playwright, 212 tests", result: "212 passed", pass: true},
    {name: "Accessibility audit", result: "2 issues", pass: false},
];

const rollout: RolloutMetric[] = [
    {label: "Error rate", next: "0.02%", current: "0.03%"},
    {label: "p95 latency", next: "142 ms", current: "168 ms"},
];

const steps: ScrollStep[] = [
    {
        id: "push",
        icon: LuGitBranch,
        label: "Push",
        title: "Every push starts a build",
        body: "Connect a repository and Stratus detects the framework, installs dependencies with a warm cache and builds on machines sized for your project.",
        stat: "Median build time of 41 seconds",
        visual: <BuildLog title="build · 7f3a9c2" lines={buildLog} result="Ready in 41s"/>,
    },
    {
        id: "preview",
        icon: LuEye,
        label: "Preview",
        title: "A live URL for every pull request",
        body: "Reviewers open the preview, pin comments to any element and see them synced back to the pull request thread.",
        stat: "Comments land in GitHub and Slack",
        visual: <PreviewComment url="storefront-git-new-checkout.stratus.app" authorName="Jordan Mills" authorInitials="JM"
                                comment="Can the button match the new brand teal?"/>,
    },
    {
        id: "checks",
        icon: LuShieldCheck,
        label: "Check",
        title: "Checks run before anyone merges",
        body: "Lighthouse scores, bundle size budgets and end to end tests run against the preview. A failing check blocks the merge with a clear reason.",
        stat: "Budgets set per route",
        visual: <ChecksList checks={checks}/>,
    },
    {
        id: "ship",
        icon: LuRocket,
        label: "Ship",
        title: "Promote in one click, roll back in one more",
        body: "Shift traffic gradually from the current release to the new one and watch error rates side by side. Instant rollback keeps the last 50 builds ready.",
        stat: "Zero downtime across 35 regions",
        visual: <RolloutProgress title="Rolling out build 7f3a9c2" percent={75} metrics={rollout}/>,
    },
];

const StickyScrollFeaturesExample = () => <StickyScrollFeatures steps={steps}/>;

export default StickyScrollFeaturesExample;
