import type {Example} from "../../types.ts";
import ImageGallery from "./ImageGallery.example.tsx";
import imageGallerySource from "./ImageGallery.example.tsx?raw";
import imageGalleryComponentSource from "./ImageGallery.tsx?raw";

const examples: Example[] = [
    {
        id: "hover-effect-&-image-scale",
        title: "Hover effect and image scale",
        description: "A gallery that blurs the other images while one is hovered or focused. Select an image to open it larger with its title and description.",
        component: ImageGallery,
        source: imageGallerySource,
        files: [{name: "ImageGallery.tsx", source: imageGalleryComponentSource}],
        minHeight: 620,
    },
];

export default examples;
