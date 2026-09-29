import {AppStoreButton} from "./AppStoreButton";

const appUrl = "https://apps.apple.com/";

const AppStoreButtonExample = () => (
    <div className="flex flex-col flex-wrap items-center justify-center gap-5">
        <AppStoreButton href={appUrl}/>
        <AppStoreButton href={appUrl} variant="outline"/>
        <AppStoreButton href={appUrl} variant="gradient"/>
    </div>
);

export default AppStoreButtonExample;
