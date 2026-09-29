import {PlayStoreButton} from "./PlayStoreButton";

const appUrl = "https://play.google.com/store/apps";

const PlayStoreButtonExample = () => (
    <div className="flex flex-col flex-wrap items-center justify-center gap-5">
        <PlayStoreButton href={appUrl}/>
        <PlayStoreButton href={appUrl} variant="outline"/>
        <PlayStoreButton href={appUrl} logo="mono"/>
        <PlayStoreButton href={appUrl} variant="outline" logo="mono"/>
        <PlayStoreButton href={appUrl} variant="gradient" logo="mono"/>
    </div>
);

export default PlayStoreButtonExample;
