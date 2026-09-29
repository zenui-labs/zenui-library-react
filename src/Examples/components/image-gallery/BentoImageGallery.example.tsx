import {BentoImageGallery, type GalleryImage} from "./BentoImageGallery";

const images: GalleryImage[] = [
    {
        src: "https://img.freepik.com/free-photo/shiraito-waterfall-autumn-japan_335224-193.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A wide waterfall surrounded by autumn trees",
    },
    {
        src: "https://img.freepik.com/free-photo/beautiful-view-mesmerizing-nature-traditional-styled-japanese-adelaide-himeji-gardens_181624-46195.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A pond and trees in a Japanese style garden",
    },
    {
        src: "https://img.freepik.com/free-photo/autumn-river-ordesa-national-park-pyrenees-huesca-aragon-spain_1301-6980.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A river running through an autumn forest",
    },
    {
        src: "https://img.freepik.com/free-photo/mustard-field-with-beautiful-snow-covered-mountains-landscape-kashmir-state-india_1232-4824.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A yellow mustard field below snow covered mountains",
    },
    {
        src: "https://img.freepik.com/free-photo/fictitious-floating-island_1048-2899.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "An imagined island floating above the clouds",
    },
    {
        src: "https://img.freepik.com/free-photo/scenic-view-mountains-lake_53876-138187.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Mountains reflected in a calm lake",
    },
    {
        src: "https://img.freepik.com/free-photo/sunset-with-silhoutte-birds-flying_335224-915.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Silhouettes of birds flying at sunset",
    },
    {
        src: "https://img.freepik.com/free-photo/landscape-rocks-surrounded-by-forests-covered-fog-cloudy-sky_181624-6475.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Rocky peaks and forests covered in fog",
    },
    {
        src: "https://img.freepik.com/free-photo/mist-chinese-water-peak-landscapes_1417-36.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Misty karst peaks above a river",
    },
];

const BentoImageGalleryExample = () => <BentoImageGallery images={images}/>;

export default BentoImageGalleryExample;
