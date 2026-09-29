import {DownloadButton} from "./DownloadButton";

const DownloadButtonExample = () => (
    <div className="flex flex-wrap items-center justify-center gap-5">
        <DownloadButton/>
        <DownloadButton variant="outline"/>
        <DownloadButton variant="split"/>
        <DownloadButton variant="pill"/>
    </div>
);

export default DownloadButtonExample;
