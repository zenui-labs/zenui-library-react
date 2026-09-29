import {ApiLimitsTable, type ApiEndpoint, type ApiLimit, type ApiTier, type RateLimitHeader} from "./ApiLimitsTable";

const tiers: ApiTier[] = [
    {id: "free", name: "Free", price: "$0"},
    {id: "pro", name: "Pro", price: "$49 a month"},
    {id: "scale", name: "Scale", price: "$399 a month"},
];

const endpoints: ApiEndpoint[] = [
    {method: "GET", path: "/v2/documents", perMinute: {free: 60, pro: 600, scale: 6000}, burst: {free: 10, pro: 100, scale: 1000}},
    {method: "GET", path: "/v2/search", perMinute: {free: 30, pro: 300, scale: 3000}, burst: {free: 5, pro: 50, scale: 500}},
    {method: "POST", path: "/v2/documents", perMinute: {free: 20, pro: 300, scale: 3000}, burst: {free: 5, pro: 50, scale: 400}},
    {method: "PATCH", path: "/v2/documents/:id", perMinute: {free: 20, pro: 300, scale: 3000}, burst: {free: 5, pro: 50, scale: 400}},
    {method: "DELETE", path: "/v2/documents/:id", perMinute: {free: 10, pro: 120, scale: 1200}, burst: {free: 2, pro: 20, scale: 200}},
    {method: "POST", path: "/v2/exports", perMinute: {free: null, pro: 6, scale: 60}, burst: {free: null, pro: 2, scale: 10}},
];

const limits: ApiLimit[] = [
    {label: "Max request body", values: {free: "1 MB", pro: "10 MB", scale: "50 MB"}},
    {label: "Webhook endpoints", values: {free: "1", pro: "10", scale: "100"}},
    {label: "API keys", values: {free: "2", pro: "20", scale: "Unlimited"}},
];

const headers: RateLimitHeader[] = [
    {name: "X-RateLimit-Limit", example: "600", meaning: "Requests allowed in the current window"},
    {name: "X-RateLimit-Remaining", example: "587", meaning: "Requests left before you are limited"},
    {name: "X-RateLimit-Reset", example: "1759152060", meaning: "Unix time when the window resets"},
];

const ApiLimitsTableExample = () => (
    <ApiLimitsTable tiers={tiers} endpoints={endpoints} limits={limits} headers={headers} defaultHighlightedTier="pro"/>
);

export default ApiLimitsTableExample;
