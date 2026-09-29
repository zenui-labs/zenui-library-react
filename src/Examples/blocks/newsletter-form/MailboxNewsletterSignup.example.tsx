import {MailboxNewsletterSignup} from "./MailboxNewsletterSignup";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const MailboxNewsletterSignupExample = () => (
    <div className="p-8">
        <MailboxNewsletterSignup imageSrc="https://i.ibb.co/WkhTsW1/undraw-Mailbox-re-dvds.png" onSubmit={subscribe}/>
    </div>
);

export default MailboxNewsletterSignupExample;
