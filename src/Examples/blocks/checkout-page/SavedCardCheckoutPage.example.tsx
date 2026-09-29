import {useState} from "react";
import {
    SavedCardCheckoutPage,
    type DialCode,
    type OrderLineItem,
    type OrderTotalLine,
    type SavedPaymentMethod,
} from "./SavedCardCheckoutPage";

const items: OrderLineItem[] = [
    {
        id: "pegasus-39",
        name: "Nike Air Zoom Pegasus 39",
        image: "https://i.ibb.co.com/x6fq6nC/Rectangle-516.png",
        quantity: 1,
        price: "$28.00",
        details: [{label: "Size", value: "XL"}, {label: "Color", value: "Blue"}],
    },
    {
        id: "pegasus-trail-4",
        name: "Nike React Pegasus Trail 4",
        image: "https://i.ibb.co.com/VJKrBt5/Rectangle-519.png",
        quantity: 3,
        price: "$28.00",
        details: [{label: "Size", value: "XL"}, {label: "Color", value: "Blue"}],
    },
];

const totals: OrderTotalLine[] = [
    {label: "Subtotal", value: "$56.00"},
    {label: "Shipping cost", value: "$8.00"},
    {label: "Discount (10%)", value: "-$13.00"},
];

const paymentMethods: SavedPaymentMethod[] = [
    {id: "visa", label: "**** 8304", brand: "Visa", logo: "https://i.ibb.co.com/NFwm4jb/Visa.png"},
    {id: "paypal", label: "**** 8304", brand: "PayPal", logo: "https://i.ibb.co.com/W3ykxd5/paypal.png"},
];

const dialCodes: DialCode[] = [
    {value: "us", label: "🇺🇸 +1"},
    {value: "uk", label: "🇬🇧 +44"},
    {value: "in", label: "🇮🇳 +91"},
    {value: "bd", label: "🇧🇩 +880"},
    {value: "au", label: "🇦🇺 +61"},
    {value: "ca", label: "🇨🇦 +1"},
    {value: "de", label: "🇩🇪 +49"},
    {value: "fr", label: "🇫🇷 +33"},
    {value: "jp", label: "🇯🇵 +81"},
    {value: "za", label: "🇿🇦 +27"},
];

const countries = [
    "United States",
    "United Kingdom",
    "India",
    "Bangladesh",
    "Australia",
    "Canada",
    "Germany",
    "France",
    "Japan",
    "South Africa",
];

const SavedCardCheckoutPageExample = () => {
    const [message, setMessage] = useState("");

    return (
        <div className="w-full">
            <SavedCardCheckoutPage
                items={items}
                totals={totals}
                total="$51.00"
                paymentMethods={paymentMethods}
                dialCodes={dialCodes}
                countries={countries}
                onApplyDiscount={(code) => setMessage(code ? `Discount code ${code} applied.` : "Enter a discount code first.")}
                onSubmit={() => setMessage("Payment sent. Replace onSubmit with your payment request.")}
            />
            {message && (
                <p role="status" className="mt-4 text-sm text-gray-600 dark:text-slate-400">
                    {message}
                </p>
            )}
        </div>
    );
};

export default SavedCardCheckoutPageExample;
