import {useState} from "react";
import {DropzoneFileUpload} from "./DropzoneFileUpload";

const DropzoneFileUploadExample = () => {
    const [file, setFile] = useState<File | null>(null);

    return <DropzoneFileUpload value={file} onChange={setFile}/>;
};

export default DropzoneFileUploadExample;
