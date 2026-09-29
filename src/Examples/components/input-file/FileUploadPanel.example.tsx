import {useState} from "react";
import {FileUploadPanel} from "./FileUploadPanel";

const FileUploadPanelExample = () => {
    const [file, setFile] = useState<File | null>(null);

    return <FileUploadPanel value={file} onChange={setFile}/>;
};

export default FileUploadPanelExample;
