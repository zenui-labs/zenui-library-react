import {useState} from "react";
import {RightCartDrawer, type CartItem, type OrderSummaryLine} from "./RightCartDrawer";

const initialItems: CartItem[] = [
    {
        id: "skincare",
        name: "Skincare essentials set",
        image: "https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740",
        imageAlt: "Still life of skincare products",
        quantityLabel: "25 items",
        originalPrice: "$32",
        price: "$12",
    },
    {
        id: "headphones",
        name: "Wireless headphones",
        image: "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740",
        imageAlt: "Levitating music headphones display",
        quantityLabel: "8 items",
        originalPrice: "$32",
        price: "$12",
    },
    {
        id: "aloe-vera",
        name: "Aloe vera care kit",
        image: "https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740",
        imageAlt: "Set of aloe vera cosmetic products",
        quantityLabel: "2 items",
        originalPrice: "$32",
        price: "$12",
    },
];

const summary: OrderSummaryLine[] = [
    {label: "Item total", value: "$180.00"},
    {label: "Subscription savings (15% off)", value: "- $18.00", accent: true},
    {label: "Shipping", value: "Free", accent: true},
];

const RightCartDrawerExample = () => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(initialItems);

    return (
        <>
            <button
                type="button"
                aria-haspopup="dialog"
                className="px-4 py-2 bg-[#3B9DF8] text-[#fff] rounded-md"
                onClick={() => setOpen(true)}
            >
                Open drawer
            </button>
            <RightCartDrawer
                open={open}
                onClose={() => setOpen(false)}
                items={items}
                summary={summary}
                total="$162.00"
                onRemoveItem={(id) => setItems((current) => current.filter((item) => item.id !== id))}
                helpLink={{label: "Why is subscribing better?", href: "#"}}
            />
        </>
    );
};

export default RightCartDrawerExample;
