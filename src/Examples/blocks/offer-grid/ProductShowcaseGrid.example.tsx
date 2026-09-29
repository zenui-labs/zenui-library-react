import {ProductShowcaseGrid, type FeaturedShowcaseProduct, type ShowcaseProduct, type ShowcaseTile} from "./ProductShowcaseGrid";

const playstation: ShowcaseProduct = {
    title: "PlayStation 5",
    description: "Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.",
    image: "https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png",
    imageAlt: "PlayStation 5 console",
};

const macbook: FeaturedShowcaseProduct = {
    title: <>Macbook <b className="text-gray-900 dark:text-[#abc2d3] font-semibold">Air</b></>,
    description: "The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.",
    image: "https://i.ibb.co.com/JKqHn1w/Mac-Book-Pro-14.png",
    imageAlt: "MacBook Air laptop",
    href: "#macbook-air",
};

const tiles: ShowcaseTile[] = [
    {
        title: <>Apple <br/>AirPods <b className="font-semibold">Max</b></>,
        description: "Computational audio. Listen, it's powerful",
        image: "https://i.ibb.co.com/BKfpK5b/hero-gnfk5g59t0qe-xlarge-2x-1.png",
        imageAlt: "AirPods Max headphones",
    },
    {
        title: <>Apple <br/>Vision <b className="font-semibold">Pro</b></>,
        description: "An immersive way to experience entertainment",
        image: "https://i.ibb.co.com/Bq7NGbQ/image-36-1.png",
        imageAlt: "Apple Vision Pro headset",
        tone: "dark",
    },
];

const ProductShowcaseGridExample = () => (
    <div className="flex justify-center p-8">
        <ProductShowcaseGrid primary={playstation} featured={macbook} tiles={tiles}/>
    </div>
);

export default ProductShowcaseGridExample;
