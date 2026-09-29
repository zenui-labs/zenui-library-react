import type {Example} from "../../types.ts";
import SimpleImageGallery from "./SimpleImageGallery.example.tsx";
import simpleImageGallerySource from "./SimpleImageGallery.example.tsx?raw";
import simpleImageGalleryComponentSource from "./SimpleImageGallery.tsx?raw";
import MosaicImageGallery from "./MosaicImageGallery.example.tsx";
import mosaicImageGallerySource from "./MosaicImageGallery.example.tsx?raw";
import mosaicImageGalleryComponentSource from "./MosaicImageGallery.tsx?raw";
import FeaturedImageGallery from "./FeaturedImageGallery.example.tsx";
import featuredImageGallerySource from "./FeaturedImageGallery.example.tsx?raw";
import featuredImageGalleryComponentSource from "./FeaturedImageGallery.tsx?raw";
import BentoImageGallery from "./BentoImageGallery.example.tsx";
import bentoImageGallerySource from "./BentoImageGallery.example.tsx?raw";
import bentoImageGalleryComponentSource from "./BentoImageGallery.tsx?raw";
import StaggeredImageGallery from "./StaggeredImageGallery.example.tsx";
import staggeredImageGallerySource from "./StaggeredImageGallery.example.tsx?raw";
import staggeredImageGalleryComponentSource from "./StaggeredImageGallery.tsx?raw";
import TitleBarImageGallery from "./TitleBarImageGallery.example.tsx";
import titleBarImageGallerySource from "./TitleBarImageGallery.example.tsx?raw";
import titleBarImageGalleryComponentSource from "./TitleBarImageGallery.tsx?raw";

const examples: Example[] = [
    {
        id: "image_gallery_1",
        title: "Simple image grid",
        description: "A three column grid that shows each image at its natural size. A good fit for browsing a small set of photos.",
        component: SimpleImageGallery,
        source: simpleImageGallerySource,
        files: [{name: "SimpleImageGallery.tsx", source: simpleImageGalleryComponentSource}],
    },
    {
        id: "image_gallery_2",
        title: "Mosaic image grid",
        description: "A four column mosaic that mixes wide tiles with a tall one. The layout repeats every five images.",
        component: MosaicImageGallery,
        source: mosaicImageGallerySource,
        files: [{name: "MosaicImageGallery.tsx", source: mosaicImageGalleryComponentSource}],
    },
    {
        id: "image_gallery_3",
        title: "Featured image grid",
        description: "A large featured image with two smaller tiles beside it and a full width banner below. The layout repeats every four images.",
        component: FeaturedImageGallery,
        source: featuredImageGallerySource,
        files: [{name: "FeaturedImageGallery.tsx", source: featuredImageGalleryComponentSource}],
    },
    {
        id: "image_gallery_4",
        title: "Bento image grid",
        description: "A four column bento grid of wide, tall and large tiles for presenting many images in order. The layout repeats every nine images.",
        component: BentoImageGallery,
        source: bentoImageGallerySource,
        files: [{name: "BentoImageGallery.tsx", source: bentoImageGalleryComponentSource}],
        minHeight: 420,
    },
    {
        id: "image_gallery_5",
        title: "Staggered image grid",
        description: "A four column grid where tall tiles alternate between columns. The layout repeats every eight images.",
        component: StaggeredImageGallery,
        source: staggeredImageGallerySource,
        files: [{name: "StaggeredImageGallery.tsx", source: staggeredImageGalleryComponentSource}],
        minHeight: 420,
    },
    {
        id: "image_gallery_6",
        title: "Image gallery with title bar",
        description: "Each image gets a blurred bar with a title, a subtitle and an info button. Pass `onInfo` to handle the button.",
        component: TitleBarImageGallery,
        source: titleBarImageGallerySource,
        files: [{name: "TitleBarImageGallery.tsx", source: titleBarImageGalleryComponentSource}],
        minHeight: 420,
    },
];

export default examples;
