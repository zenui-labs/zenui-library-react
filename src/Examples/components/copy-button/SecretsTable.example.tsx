import {SecretsTable, type EnvVariable} from "./SecretsTable";

const variables: EnvVariable[] = [
    {name: "DATABASE_URL", value: "postgres://app:Vq8x2Lm@db.internal:5432/orders", secret: true, updated: "3 days ago"},
    {name: "STRIPE_SECRET_KEY", value: "sk_test_51Pq8ZgK2vXa9mRtY7cWd", secret: true, updated: "Aug 12", rotatable: true},
    {name: "NEXT_PUBLIC_APP_URL", value: "https://orders.harborline.co", secret: false, updated: "Jul 30"},
    {name: "SENTRY_DSN", value: "https://4b1f@o5521.ingest.sentry.io/77", secret: false, updated: "Jul 2"},
];

const SecretsTableExample = () => <SecretsTable variables={variables} subtitle="Production, orders-api"/>;

export default SecretsTableExample;
