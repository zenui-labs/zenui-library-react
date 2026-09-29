import {RequestTrace, type TraceSpan} from "./RequestTrace";

const spans: TraceSpan[] = [
    {id: "req", name: "GET /api/orders/1842", service: "gateway", depth: 0, parent: null, start: 0, duration: 184},
    {id: "edge", name: "Edge cache lookup", service: "cdn", depth: 1, parent: 0, start: 2, duration: 6},
    {id: "auth", name: "Verify session", service: "auth", depth: 1, parent: 0, start: 10, duration: 22},
    {id: "orders", name: "Load order", service: "orders-api", depth: 1, parent: 0, start: 34, duration: 128},
    {id: "db", name: "SELECT orders", service: "postgres", depth: 2, parent: 3, start: 40, duration: 86, slow: true},
    {id: "redis", name: "Read price cache", service: "redis", depth: 2, parent: 3, start: 130, duration: 4},
    {id: "render", name: "Serialize JSON", service: "gateway", depth: 1, parent: 0, start: 166, duration: 14},
];

const RequestTraceExample = () => (
    <RequestTrace
        spans={spans}
        traceId="7f3a9c21"
        note="SELECT orders took 47% of the request. An index on customer_id would help."
    />
);

export default RequestTraceExample;
