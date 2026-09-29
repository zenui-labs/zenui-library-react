import {LogoCloudStats, type CloudLogo, type CloudStat} from "./LogoCloudStats";

// Simple geometric marks drawn with SVG so the block has no image dependencies.
const logos: CloudLogo[] = [
    {
        name: "Halcyon",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.25"/><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>,
    },
    {
        name: "Northbeam",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M12 2 22 20H2Z" fill="currentColor"/></svg>,
    },
    {
        name: "Quillo",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor"/><rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor"/><rect x="13" y="2" width="9" height="9" rx="4.5" fill="currentColor" opacity="0.35"/></svg>,
    },
    {
        name: "Ferrox",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M4 4h16v4H8v4h10v4H8v4H4Z" fill="currentColor"/></svg>,
    },
    {
        name: "Arcadia",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M2 20a10 10 0 0 1 20 0h-5a5 5 0 0 0-10 0Z" fill="currentColor"/></svg>,
    },
    {
        name: "Brightline",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M3 12h18M12 3v18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
    },
    {
        name: "Parcelly",
        mark: <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true"><path d="M12 2 21 7v10l-9 5-9-5V7Z" fill="currentColor" opacity="0.3"/><path d="M12 12 21 7M12 12 3 7M12 12v10" stroke="currentColor" strokeWidth="2"/></svg>,
    },
];

const stats: CloudStat[] = [
    {value: "38M", label: "API calls a day", detail: "Across 14 regions"},
    {value: "99.99%", label: "Uptime", detail: "Trailing 12 months"},
    {value: "4,200", label: "Teams", detail: "From 3 to 3,000 seats"},
    {value: "140 ms", label: "Median response", detail: "Measured at the edge"},
];

const LogoCloudStatsExample = () => <LogoCloudStats logos={logos} stats={stats}/>;

export default LogoCloudStatsExample;
