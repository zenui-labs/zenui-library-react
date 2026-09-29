import {SearchableTree, type TreeNode} from "./SearchableTree";

const tree: TreeNode[] = [
    {
        name: "apps",
        children: [
            {
                name: "web",
                children: [
                    {name: "app", children: [{name: "layout.tsx"}, {name: "page.tsx"}, {name: "globals.css"}]},
                    {name: "components", children: [{name: "PricingTable.tsx"}, {name: "SignInForm.tsx"}, {name: "Navbar.tsx"}]},
                    {name: "next.config.js"},
                ],
            },
            {name: "docs", children: [{name: "getting-started.md"}, {name: "pricing.md"}, {name: "api-reference.md"}]},
        ],
    },
    {
        name: "packages",
        children: [
            {name: "ui", children: [{name: "Button.tsx"}, {name: "Dialog.tsx"}, {name: "Tooltip.tsx"}, {name: "tokens.json"}]},
            {name: "billing", children: [{name: "invoices.ts"}, {name: "pricing.ts"}, {name: "stripe.ts"}]},
        ],
    },
    {name: "assets", children: [{name: "logo.svg"}, {name: "pricing-hero.png"}]},
    {name: "package.json"},
    {name: "turbo.json"},
    {name: "README.md"},
];

const SearchableTreeExample = () => (
    <SearchableTree
        nodes={tree}
        defaultExpanded={["apps", "apps/web"]}
        defaultValue="apps/web/app/page.tsx"
        emptyHint="Try part of a file name, such as “pricing”."
    />
);

export default SearchableTreeExample;
