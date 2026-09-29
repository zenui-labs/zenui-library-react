import {CategoryOfferGrid, type CategoryOffer} from "./CategoryOfferGrid";

const livingRoom: CategoryOffer = {
    title: "Living room",
    image: "https://i.ibb.co.com/F7MBZqh/Paste-image-removebg-preview.png",
    imageAlt: "Living room furniture",
    href: "#living-room",
};

const rooms: CategoryOffer[] = [
    {
        title: "Bedroom",
        image: "https://i.ibb.co.com/PCw23Vs/Paste-image-1-removebg-preview.png",
        imageAlt: "Bedroom furniture",
        href: "#bedroom",
        imageClassName: "w-[200px] h-[200px]",
    },
    {
        title: "Kitchen",
        image: "https://i.ibb.co.com/4FjR02m/Paste-image-2-removebg-preview.png",
        imageAlt: "Kitchen products",
        href: "#kitchen",
    },
];

const CategoryOfferGridExample = () => (
    <div className="flex justify-center p-8">
        <CategoryOfferGrid featured={livingRoom} offers={rooms}/>
    </div>
);

export default CategoryOfferGridExample;
