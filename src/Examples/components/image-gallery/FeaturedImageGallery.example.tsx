import {FeaturedImageGallery, type GalleryImage} from "./FeaturedImageGallery";

const images: GalleryImage[] = [
    {
        src: "https://img.freepik.com/free-vector/beach-seascape-scenery_603843-2331.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "An illustrated beach with palm trees and the sea",
    },
    {
        src: "https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A tree in a green field under a blue sky",
    },
    {
        src: "https://img.freepik.com/free-photo/landscape-hills-covered-greenery-with-rocky-mountains-cloudy-sky_181624-9192.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Green hills below rocky mountains and a cloudy sky",
    },
    {
        src: "https://img.freepik.com/free-vector/summer-natural-landscape-with-meadow-mountains_107791-24623.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "An illustrated summer meadow in front of mountains",
    },
];

const FeaturedImageGalleryExample = () => <FeaturedImageGallery images={images}/>;

export default FeaturedImageGalleryExample;
