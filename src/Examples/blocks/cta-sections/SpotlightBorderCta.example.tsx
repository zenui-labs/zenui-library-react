import {LuDatabase, LuGauge, LuShieldCheck} from "react-icons/lu";
import {SpotlightBorderCta, type Proof} from "./SpotlightBorderCta";

const proofs: Proof[] = [
    {icon: LuDatabase, title: "Imports in one step", detail: "Jira, Linear and Asana projects with history"},
    {icon: LuGauge, title: "2 day median move", detail: "Measured across 1,140 migrations this year"},
    {icon: LuShieldCheck, title: "SOC 2 Type II", detail: "Audited yearly, report available on request"},
];

const SpotlightBorderCtaExample = () => <SpotlightBorderCta proofs={proofs}/>;

export default SpotlightBorderCtaExample;
