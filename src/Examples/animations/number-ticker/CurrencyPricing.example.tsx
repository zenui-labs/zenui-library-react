import {CurrencyPricing, type CurrencyOption, type PricingPlan} from "./CurrencyPricing";

// Rates are fixed for the demo. Load real rates from your billing provider.
const currencies: CurrencyOption[] = [
    {code: "USD", rate: 1},
    {code: "EUR", rate: 0.92},
    {code: "GBP", rate: 0.79},
    {code: "JPY", rate: 149, step: 10},
];

const plans: PricingPlan[] = [
    {name: "Starter", price: 12, blurb: "For solo builders shipping side projects.", features: ["3 projects", "10 GB storage", "Community support"]},
    {name: "Pro", price: 29, blurb: "For small teams that ship every week.", features: ["Unlimited projects", "100 GB storage", "Preview deployments"], featured: true},
    {name: "Business", price: 79, blurb: "For companies with compliance needs.", features: ["SSO and SCIM", "1 TB storage", "99.99% uptime SLA"]},
];

const CurrencyPricingExample = () => <CurrencyPricing plans={plans} currencies={currencies}/>;

export default CurrencyPricingExample;
