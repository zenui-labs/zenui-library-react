import {TitleBarImageGallery, type TitledImage} from "./TitleBarImageGallery";

const images: TitledImage[] = [
    {
        src: "https://img.freepik.com/free-photo/waterfall-nature-thailand_335224-989.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.2.71340048.1688965399&semt=sph",
        alt: "A waterfall in a green forest",
        title: "Natural",
        subtitle: "@prokas",
    },
    {
        src: "https://img.freepik.com/free-photo/morskie-oko-tatry_1204-510.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.2.71340048.1688965399&semt=sph",
        alt: "A mountain lake surrounded by rocky peaks",
        title: "Natural",
        subtitle: "@prokas",
    },
    {
        src: "https://img.freepik.com/free-photo/island-view-from-sea_1127-2244.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.2.71340048.1688965399&semt=sph",
        alt: "A green island seen from the sea",
        title: "Natural",
        subtitle: "@prokas",
    },
    {
        src: "https://img.freepik.com/free-photo/footpath-beautiful-arch-flowers-plants_181624-16890.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.2.71340048.1688965399&semt=sph",
        alt: "A footpath under an arch of flowers",
        title: "Natural",
        subtitle: "@prokas",
    },
    {
        src: "https://img.freepik.com/free-photo/green-park-view_1417-1487.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A green park with trees and a lawn",
        title: "Natural",
        subtitle: "@prokas",
    },
    {
        src: "https://img.freepik.com/free-photo/green-field-tree-blue-skygreat-as-backgroundweb-banner-generative-ai_1258-152184.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph",
        alt: "A tree in a green field under a blue sky",
        title: "Natural",
        subtitle: "@prokas",
    },
];

const TitleBarImageGalleryExample = () => <TitleBarImageGallery images={images}/>;

export default TitleBarImageGalleryExample;
