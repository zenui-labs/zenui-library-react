import type {Example} from "../../types.ts";
import ImageCropper from "./ImageCropper.example.tsx";
import imageCropperSource from "./ImageCropper.example.tsx?raw";
import imageCropperComponentSource from "./ImageCropper.tsx?raw";

const examples: Example[] = [
    {
        id: "crop-image-in-modal",
        title: "Crop image in modal",
        description: "Pick or drop an image, then move and resize the crop area in a modal before saving the result.",
        component: ImageCropper,
        source: imageCropperSource,
        files: [{name: "ImageCropper.tsx", source: imageCropperComponentSource}],
        minHeight: 360,
    },
];

export default examples;
