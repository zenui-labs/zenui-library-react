import {useState} from "react";
import {IconFileUpload} from "./IconFileUpload";

const IconFileUploadExample = () => {
    const [file, setFile] = useState<File | null>(null);

    return <IconFileUpload value={file} onChange={setFile}/>;
};

export default IconFileUploadExample;
