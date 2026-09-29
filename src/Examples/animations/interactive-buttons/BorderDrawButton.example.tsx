import {BracketButton, SweepLink, TraceButton} from "./BorderDrawButton";

const BorderDrawButtonExample = () => (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-10">
        <TraceButton>Start free trial</TraceButton>
        <BracketButton>View pricing</BracketButton>
        {/* The preview keeps the page in place. Drop onClick in your app so the link navigates. */}
        <SweepLink href="#changelog" onClick={(event) => event.preventDefault()}>
            Read the changelog
        </SweepLink>
    </div>
);

export default BorderDrawButtonExample;
