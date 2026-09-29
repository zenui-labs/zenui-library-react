import {PointerBorderCard, type Deployment} from "./PointerBorderCard";

const deployment: Deployment = {
    name: "checkout-redesign",
    branch: "feat/one-page-checkout",
    commit: "a3f91c2",
    commitMessage: "Collapse shipping and payment steps",
    url: "checkout-redesign.preview.acme.dev",
    checks: [
        {label: "Build", value: "42s"},
        {label: "Tests", value: "318 passed"},
        {label: "Lighthouse", value: "98"},
    ],
};

// Stands in for the deploy request.
const promote = () => new Promise<void>((resolve) => window.setTimeout(resolve, 1600));

const PointerBorderCardExample = () => (
    <PointerBorderCard deployment={deployment} onPromote={promote} labels={{live: "Live on acme.dev"}}/>
);

export default PointerBorderCardExample;
