import {SubwayTimeline, type TransitStop} from "./SubwayTimeline";

const stops: TransitStop[] = [
    {id: "commit", year: "2016", name: "First commit", body: "Two founders and a kitchen table in Leith, Edinburgh. The first version was a shared text file with checkboxes.", stat: {value: "2", label: "people, one kettle"}},
    {id: "beta", year: "2017", name: "Public beta", body: "We posted a link on a Tuesday and spent the rest of the week adding servers.", stat: {value: "1,200", label: "teams in the first month"}},
    {id: "seed", year: "2018", name: "Seed round", body: "£2.1M from people who had used the beta at their own companies. Hired our first five engineers."},
    {id: "v1", year: "2019", name: "Kestrel 1.0", body: "Out of beta with projects, cycles and the keyboard-first editor. The Enterprise line branches off here."},
    {id: "sso", year: "2019", name: "SSO & audit log", line: "branch", body: "Our first bank asked for SAML and an audit trail. We built both in six weeks and kept them.", stat: {value: "14", label: "enterprise pilots"}},
    {id: "mobile", year: "2020", name: "Mobile apps", body: "iOS and Android, built so a triage session on the train takes four minutes, not twenty."},
    {id: "soc2", year: "2021", name: "SOC 2 Type II", line: "branch", body: "Twelve months of controls, one auditor, zero exceptions. Procurement reviews went from weeks to days."},
    {id: "series-b", year: "2022", name: "Series B", body: "$38M to grow the team in Edinburgh and open an office in Lisbon.", stat: {value: "140", label: "people across two cities"}},
    {id: "residency", year: "2022", name: "EU data residency", line: "branch", body: "Workspaces can live entirely in Frankfurt or Dublin. Requested by 60% of our European customers."},
    {id: "v3", year: "2023", name: "Kestrel 3.0", body: "The lines merge: SSO, audit logs and residency come to every plan, not just Enterprise."},
    {id: "triage", year: "2024", name: "Triage assistant", body: "Incoming issues are labelled, deduplicated and routed before anyone opens the inbox."},
    {id: "today", year: "2026", name: "38,000 teams", body: "From two-person studios to three of the ten largest airlines. Next stop is yours.", stat: {value: "38k", label: "teams, 71 countries"}},
];

const SubwayTimelineExample = () => (
    <SubwayTimeline
        stops={stops}
        mainLine={{name: "Product line", color: "#e3342f"}}
        branchLine={{name: "Enterprise line", color: "#1f5fbf"}}
        title="Ten years of Kestrel, one stop at a time"
    />
);

export default SubwayTimelineExample;
