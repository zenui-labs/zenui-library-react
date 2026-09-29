import {MosaicImageGallery, type GalleryImage} from "./MosaicImageGallery";

const images: GalleryImage[] = [
    {
        src: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg",
        alt: "A wooden boat on a river below a waterfall",
    },
    {
        src: "https://img.freepik.com/free-photo/beautiful-scenery-rock-formations-by-sea-queens-bath-kauai-hawaii-sunset_181624-36857.jpg",
        alt: "Rock formations by the sea at sunset",
    },
    {
        src: "https://img.freepik.com/free-photo/sea-beach_1203-3516.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Waves reaching a sandy beach",
    },
    {
        src: "https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
        alt: "A single tree in a grass field under a cloudy sunset sky",
    },
    {
        src: "https://img.freepik.com/free-photo/group-elephants-big-green-tree-wilderness_181624-16897.jpg",
        alt: "A group of elephants under a large green tree",
    },
];

const MosaicImageGalleryExample = () => <MosaicImageGallery images={images}/>;

export default MosaicImageGalleryExample;
