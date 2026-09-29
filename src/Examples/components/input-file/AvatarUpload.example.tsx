import {useState} from "react";
import {AvatarUpload} from "./AvatarUpload";

const AvatarUploadExample = () => {
    const [file, setFile] = useState<File | null>(null);

    return <AvatarUpload value={file} onChange={setFile}/>;
};

export default AvatarUploadExample;
