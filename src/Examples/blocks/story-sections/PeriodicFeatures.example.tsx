import {PeriodicFeatures, type ElementCategory, type FeatureElement} from "./PeriodicFeatures";

const categories: ElementCategory[] = [
    {id: "core", label: "Core", tone: "sky"},
    {id: "integrations", label: "Integrations", tone: "amber"},
    {id: "security", label: "Security", tone: "emerald"},
    {id: "ai", label: "AI, in preview", tone: "violet"},
];

const elements: FeatureElement[] = [
    {number: 1, symbol: "Co", name: "Co-editing", category: "core", position: [1, 1], mass: "38 ms", description: "Everyone's cursor, selection and edits on the same page, merged in about 38 ms. No locks and no 'someone else is editing' banners.", properties: [{label: "Plans", value: "All"}, {label: "Since", value: "2019"}], bondsWith: ["Hi", "Of"]},
    {number: 2, symbol: "Au", name: "Auth", category: "security", position: [9, 1], mass: "SAML", description: "Single sign-on through Okta, Entra ID, Google or any SAML 2.0 or OIDC provider, with enforced login for every member.", properties: [{label: "Plans", value: "Business"}, {label: "Providers", value: "Any SAML / OIDC"}], bondsWith: ["Sc", "Rl"]},
    {number: 3, symbol: "Of", name: "Offline", category: "core", position: [1, 2], mass: "7 d", description: "Keep writing on a plane. Changes sync when you land and conflicts resolve paragraph by paragraph.", properties: [{label: "Plans", value: "All"}, {label: "Works offline for", value: "7 days"}], bondsWith: ["Co"]},
    {number: 4, symbol: "Hi", name: "History", category: "core", position: [2, 2], mass: "∞", description: "Every change is versioned. Scrub back through a page like a video and restore a single paragraph.", properties: [{label: "Plans", value: "All"}, {label: "Kept for", value: "Forever"}], bondsWith: ["Al", "Ar"]},
    {number: 5, symbol: "Wh", name: "Webhooks", category: "integrations", position: [5, 2], mass: "40", description: "Signed payloads for 40 event types, retried with backoff for up to 72 hours.", properties: [{label: "Events", value: "40"}, {label: "Retries for", value: "72 h"}], bondsWith: ["Ap"]},
    {number: 6, symbol: "Ap", name: "API", category: "integrations", position: [6, 2], mass: "1.2k", description: "REST and GraphQL with exactly the permissions of the person who made the token.", properties: [{label: "Rate limit", value: "1,200 / min"}, {label: "SDKs", value: "TS, Python, Go"}], bondsWith: ["Wh", "Rl"]},
    {number: 7, symbol: "Rl", name: "Roles", category: "security", position: [7, 2], mass: "6", description: "Six built-in roles, plus custom ones scoped down to a single page or folder.", properties: [{label: "Plans", value: "Team and up"}, {label: "Built-in roles", value: "6"}], bondsWith: ["Au", "Sc"]},
    {number: 8, symbol: "Al", name: "Audit log", category: "security", position: [8, 2], mass: "400 d", description: "Who did what, when and from where. Kept for 400 days and streamed to your SIEM.", properties: [{label: "Retention", value: "400 days"}, {label: "Export", value: "Splunk, Datadog, S3"}], bondsWith: ["Hi", "Ag"]},
    {number: 9, symbol: "Kr", name: "Keyring", category: "security", position: [9, 2], mass: "BYOK", description: "Bring your own encryption keys from AWS KMS or Google Cloud KMS. Revoke them and the data goes dark.", properties: [{label: "Plans", value: "Enterprise"}, {label: "Key stores", value: "AWS, GCP"}], bondsWith: ["Eu"]},
    {number: 10, symbol: "Sr", name: "Search", category: "core", position: [1, 3], mass: "80 ms", description: "Every page, comment and attachment, including text inside PDFs and screenshots, in about 80 ms.", properties: [{label: "p95 latency", value: "80 ms"}, {label: "File types", value: "60+"}], bondsWith: ["Ak", "Fi"]},
    {number: 11, symbol: "Ar", name: "Archive", category: "core", position: [2, 3], mass: "inert", description: "Archived pages are read-only and out of search, but come back with one click. Stable and unreactive, like the gas.", properties: [{label: "Plans", value: "All"}, {label: "Restore", value: "One click"}], bondsWith: ["Hi"]},
    {number: 12, symbol: "Ca", name: "Calendar", category: "integrations", position: [3, 3], mass: "2-way", description: "Meeting notes appear on the invite, and agenda changes flow back to the calendar.", properties: [{label: "Works with", value: "Google, Outlook"}, {label: "Sync", value: "Two-way"}], bondsWith: ["Sm"]},
    {number: 13, symbol: "Gi", name: "Git", category: "integrations", position: [4, 3], mass: "PRs", description: "Link pull requests to specs. The page updates its status when the branch merges.", properties: [{label: "Hosts", value: "GitHub, GitLab"}, {label: "Status sync", value: "Live"}], bondsWith: ["Wh"]},
    {number: 14, symbol: "Fi", name: "Files", category: "integrations", position: [5, 3], mass: "5 GB", description: "Drop in files up to 5 GB with previews for 60 formats, from Figma frames to CAD drawings.", properties: [{label: "Max size", value: "5 GB"}, {label: "Previews", value: "60 formats"}], bondsWith: ["Sr"]},
    {number: 15, symbol: "Im", name: "Import", category: "integrations", position: [6, 3], mass: "12", description: "Bring pages, comments and history over from 12 other tools, with internal links rewritten.", properties: [{label: "Sources", value: "12 tools"}, {label: "Keeps", value: "History, links"}], bondsWith: ["Ar"]},
    {number: 16, symbol: "Sc", name: "SCIM", category: "security", position: [7, 3], mass: "60 s", description: "People are added and removed from your identity provider within a minute of the change.", properties: [{label: "Plans", value: "Business"}, {label: "Sync delay", value: "< 60 s"}], bondsWith: ["Au", "Rl"]},
    {number: 17, symbol: "Eu", name: "Residency", category: "security", position: [8, 3], mass: "3", description: "Pin your workspace to Frankfurt, Dublin or Virginia. Backups stay in the same region.", properties: [{label: "Regions", value: "FRA, DUB, IAD"}, {label: "Backups", value: "Same region"}], bondsWith: ["Kr"]},
    {number: 18, symbol: "Ip", name: "IP allowlist", category: "security", position: [9, 3], mass: "CIDR", description: "Limit access to office and VPN ranges. The mobile apps respect it too.", properties: [{label: "Plans", value: "Enterprise"}, {label: "Ranges", value: "Up to 200"}], bondsWith: ["Au"]},
    {number: 19, symbol: "Ag", name: "Agents", category: "ai", position: [3, 4], mass: "β", description: "Agents that file, tag and chase follow-ups. Every action they take shows up in the audit log.", properties: [{label: "Status", value: "Preview"}, {label: "Runs as", value: "A named member"}], bondsWith: ["Al", "Ak"]},
    {number: 20, symbol: "Sm", name: "Summaries", category: "ai", position: [4, 4], mass: "5 ln", description: "Long threads and meeting notes cut down to five lines, each linked to where it came from.", properties: [{label: "Status", value: "Preview"}, {label: "Length", value: "5 lines"}], bondsWith: ["Ca"]},
    {number: 21, symbol: "Ak", name: "Ask", category: "ai", position: [5, 4], mass: "cite", description: "Ask a question in plain words and get an answer that cites the pages it used.", properties: [{label: "Status", value: "Preview"}, {label: "Sources", value: "Pages you can see"}], bondsWith: ["Sr", "Ag"]},
    {number: 22, symbol: "Tr", name: "Translate", category: "ai", position: [6, 4], mass: "31", description: "Read any page in 31 languages. Edits made in either language stay in sync.", properties: [{label: "Status", value: "Preview"}, {label: "Languages", value: "31"}]},
];

const PeriodicFeaturesExample = () => (
    <PeriodicFeatures
        elements={elements}
        categories={categories}
        series={{row: 4, label: "Labs series", note: "Free while in preview"}}
    />
);

export default PeriodicFeaturesExample;
