import {CompareTwoPlans, type TwoPlanFeature, type TwoPlanOption} from "./CompareTwoPlans";

const plans: TwoPlanOption[] = [
    {id: "hobby", name: "Hobby", price: "Free"},
    {id: "pro", name: "Pro", price: "$20 a month"},
    {id: "team", name: "Team", price: "$20 a seat"},
    {id: "enterprise", name: "Enterprise", price: "From $2,500 a month"},
];

const features: TwoPlanFeature[] = [
    {name: "Projects", values: {hobby: "3", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited"}},
    {name: "Bandwidth", values: {hobby: "100 GB", pro: "1 TB", team: "1 TB per seat", enterprise: "Custom"}},
    {name: "Build minutes", values: {hobby: "6,000", pro: "24,000", team: "24,000 per seat", enterprise: "Custom"}},
    {name: "Concurrent builds", values: {hobby: "1", pro: "3", team: "12", enterprise: "Custom"}},
    {name: "Preview deployments", values: {hobby: true, pro: true, team: true, enterprise: true}},
    {name: "Custom domains", values: {hobby: "1", pro: "50", team: "Unlimited", enterprise: "Unlimited"}},
    {name: "Edge functions", values: {hobby: "100K calls", pro: "1M calls", team: "1M calls per seat", enterprise: "Custom"}},
    {name: "Password protection", values: {hobby: false, pro: true, team: true, enterprise: true}},
    {name: "Team roles", values: {hobby: false, pro: false, team: true, enterprise: true}},
    {name: "SAML single sign-on", values: {hobby: false, pro: false, team: false, enterprise: true}},
    {name: "Uptime commitment", values: {hobby: false, pro: false, team: "99.95%", enterprise: "99.99%"}},
    {name: "Support", values: {hobby: "Community", pro: "Email", team: "Email, 1 day", enterprise: "Dedicated engineer"}},
];

const CompareTwoPlansExample = () => (
    <CompareTwoPlans
        plans={plans}
        features={features}
        defaultValue={["pro", "team"]}
        description="Pick any two Cinder plans to see exactly what changes when you move between them."
    />
);

export default CompareTwoPlansExample;
