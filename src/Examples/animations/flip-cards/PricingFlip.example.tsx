import {PricingFlip, type Plan} from "./PricingFlip";

const plans: Plan[] = [
    {name: "Starter", blurb: "For side projects", monthly: 12, yearly: 120, features: ["3 projects", "10 GB storage", "Email support"]},
    {name: "Team", blurb: "For growing teams", monthly: 29, yearly: 290, features: ["Unlimited projects", "100 GB storage", "Priority support"], featured: true},
    {name: "Scale", blurb: "For larger companies", monthly: 79, yearly: 790, features: ["SSO and audit logs", "1 TB storage", "Dedicated manager"]},
];

const PricingFlipExample = () => <PricingFlip plans={plans}/>;

export default PricingFlipExample;
