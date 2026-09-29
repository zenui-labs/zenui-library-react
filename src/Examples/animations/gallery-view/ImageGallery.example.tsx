import {ImageGallery, type GalleryImage} from "./ImageGallery";

const images: GalleryImage[] = [
    {
        id: 1,
        title: "Lone tree in an open field",
        description: "A single tree stands in the middle of a golden field under a wide sky.",
        src: "https://img.freepik.com/free-photo/lone-tree_181624-46361.jpg?t=st=1747144481~exp=1747148081~hmac=b62717149dc4033e44b12015a3742441f5584f3b92f4d8c2fc2315708898a6b6&w=1380",
    },
    {
        id: 2,
        title: "Lake and snow-capped mountains",
        description: "A still lake lined with bare trees, with snow-covered peaks rising behind it under a cloudy sky.",
        src: "https://img.freepik.com/free-photo/view-old-tree-lake-with-snow-covered-mountains-cloudy-day_181624-28954.jpg?t=st=1747144811~exp=1747148411~hmac=c9e9c138fa35442c1e9cad40c478a9cd684ac10d2866b6cc2d21f9aebc35cb12&w=1380",
    },
    {
        id: 3,
        title: "Wild deer in a forest",
        description: "A close shot of a deer standing alert among green trees.",
        src: "https://img.freepik.com/free-photo/wild-deer-nature_23-2151474244.jpg?t=st=1747144861~exp=1747148461~hmac=d7ecbf2ff986150e1a7dd2289195289e128a2977aab60f821f8943b9de7b6f3a&w=1380",
    },
    {
        id: 4,
        title: "Dense forest landscape",
        description: "A misty forest of tall pines over soft undergrowth.",
        src: "https://img.freepik.com/free-photo/forest-landscape_71767-127.jpg?t=st=1747145983~exp=1747149583~hmac=7d6f2c8a9cd920a30abc2b1229da1ce099135eea08dc26d22ccfb61e4832105d&w=1380",
    },
];

const ImageGalleryExample = () => <ImageGallery images={images}/>;

export default ImageGalleryExample;
