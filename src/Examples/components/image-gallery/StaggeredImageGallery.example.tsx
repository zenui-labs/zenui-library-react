import {StaggeredImageGallery, type GalleryImage} from "./StaggeredImageGallery";

const lilyField: GalleryImage = {
    src: "https://img.freepik.com/free-photo/vertical-orange-lily-field-cloudy-dark-sky_181624-37905.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=ais",
    alt: "A field of orange lilies under a dark cloudy sky",
};

const images: GalleryImage[] = [
    {
        src: "https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Hot air balloons over foggy mountains at sunrise",
    },
    {
        src: "https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A tree in a green field under a blue sky",
    },
    {
        src: "https://img.freepik.com/free-photo/landscape-hills-covered-greenery-with-rocky-mountains-cloudy-sky_181624-9192.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Green hills below rocky mountains and a cloudy sky",
    },
    lilyField,
    {
        src: "https://img.freepik.com/free-photo/bamboo-forest-kyoto-japan_335224-28.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A path through a tall bamboo forest",
    },
    lilyField,
    {
        src: "https://img.freepik.com/free-photo/fog-dark-clouds-mountains_1204-503.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "Fog and dark clouds over mountains",
    },
    {
        src: "https://img.freepik.com/free-photo/old-rusty-fishing-boat-slope-along-shore-lake_181624-44902.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=ais",
        alt: "An old rusty fishing boat on a lake shore",
    },
];

const StaggeredImageGalleryExample = () => <StaggeredImageGallery images={images}/>;

export default StaggeredImageGalleryExample;
