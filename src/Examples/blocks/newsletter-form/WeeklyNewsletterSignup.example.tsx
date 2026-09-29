import {WeeklyNewsletterSignup} from "./WeeklyNewsletterSignup";

// Replace with a request to your email provider.
const subscribe = () => new Promise<void>((resolve) => window.setTimeout(resolve, 900));

const WeeklyNewsletterSignupExample = () => (
    <div className="p-8">
        <WeeklyNewsletterSignup imageSrc="https://i.ibb.co/sKzp64h/undraw-Newsletter-re-wrob-1.png" onSubmit={subscribe}/>
    </div>
);

export default WeeklyNewsletterSignupExample;
