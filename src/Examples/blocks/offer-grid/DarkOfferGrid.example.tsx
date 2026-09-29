import {DarkOfferGrid, type DarkOffer} from "./DarkOfferGrid";

const playstation: DarkOffer = {
    title: "PlayStation 5",
    description: "Black and white version of the PS5 coming out on sale.",
    image: "https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png",
    imageAlt: "PlayStation 5 console",
    href: "#playstation-5",
};

const collection: DarkOffer = {
    title: "Women’s collections",
    description: "Featured women’s collections that give you another vibe.",
    image: "https://i.ibb.co.com/7ghML0N/attractive-woman-wearing-hat-posing-black-background-1.png",
    imageAlt: "Woman wearing a hat",
    href: "#womens-collections",
};

const offers: DarkOffer[] = [
    {
        title: "Speakers",
        description: "Amazon wireless speakers",
        image: "https://i.ibb.co.com/fd8DJYZ/69-694768-amazon-echo-png-clipart-transparent-amazon-echo-png-1.png",
        imageAlt: "Amazon Echo speaker",
        href: "#speakers",
    },
    {
        title: "Perfume",
        description: "GUCCI INTENSE OUD EDP",
        image: "https://i.ibb.co.com/WxYLjFy/652e82cd70aa6522dd785109a455904c.png",
        imageAlt: "Bottle of perfume",
        href: "#perfume",
        imageClassName: "w-[130px]",
    },
];

const DarkOfferGridExample = () => (
    <div className="flex justify-center p-8">
        <DarkOfferGrid featured={playstation} secondary={collection} offers={offers}/>
    </div>
);

export default DarkOfferGridExample;
