import {ProductSearchBar, type Product} from "./ProductSearchBar";

const products: Product[] = [
    {id: 1, name: "Apple iPhone 14 Pro, LTPO Super Retina XDR OLED 6.1\"", image: "https://i.ibb.co/d4jgmFW/01.png", href: "#"},
    {id: 2, name: "Mobile Phone Nokia 8210, Dual SIM, 4G", image: "https://i.ibb.co/fCpcnhM/02.png", href: "#"},
    {id: 3, name: "SONY SRSXV900, Wireless Party Speaker, MEGA BASS", image: "https://i.ibb.co/2dYkwd3/03-1.png", href: "#"},
    {id: 4, name: "Headphones, Noise cancelling, Bluetooth 5.0", image: "https://i.ibb.co/f8xPk0G/04-1.png", href: "#"},
    {id: 5, name: "D-SLR Canon EOS R10, 4k, DIGIC X, RF-S 18-45mm", image: "https://i.ibb.co/dg7FmKY/05-1.png", href: "#"},
];

const ProductSearchBarExample = () => (
    <div className="flex justify-center p-8">
        <ProductSearchBar products={products} defaultOpen/>
    </div>
);

export default ProductSearchBarExample;
