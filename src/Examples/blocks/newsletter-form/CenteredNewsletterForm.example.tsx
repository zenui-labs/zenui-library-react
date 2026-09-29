import {CenteredNewsletterForm} from "./CenteredNewsletterForm";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const CenteredNewsletterFormExample = () => (
    <div className="p-8">
        <CenteredNewsletterForm onSubmit={subscribe}/>
    </div>
);

export default CenteredNewsletterFormExample;
