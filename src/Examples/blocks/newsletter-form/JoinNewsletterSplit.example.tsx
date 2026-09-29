import {JoinNewsletterSplit} from "./JoinNewsletterSplit";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const JoinNewsletterSplitExample = () => (
    <div className="p-8">
        <JoinNewsletterSplit imageSrc="https://i.ibb.co/vPgN7fq/dizzy-messages-1.png" onSubmit={subscribe}/>
    </div>
);

export default JoinNewsletterSplitExample;
