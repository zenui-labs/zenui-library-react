import {useState} from "react";
import {ImageCropper} from "./ImageCropper";

const ImageCropperExample = () => {
    const [croppedImage, setCroppedImage] = useState<string | null>(null);

    return <ImageCropper value={croppedImage} onChange={setCroppedImage}/>;
};

export default ImageCropperExample;
