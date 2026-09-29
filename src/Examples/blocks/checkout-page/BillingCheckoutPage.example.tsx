import {useState} from "react";
import {BillingCheckoutPage, type CheckoutItem, type SummaryLine} from "./BillingCheckoutPage";

const items: CheckoutItem[] = [
    {id: "camera", name: "Canon EOS 1500D DSLR Camera Body+ 18", image: "https://i.ibb.co.com/VNM4dX6/Image-24.png", quantity: 2, price: "$570"},
    {id: "headphones", name: "Wired Over-Ear Gaming Headphones with U", image: "https://i.ibb.co.com/F0bn52F/Image-25.png", quantity: 1, price: "$100"},
];

const summary: SummaryLine[] = [
    {label: "Sub-total", value: "$670"},
    {label: "Shipping", value: "Free", tone: "positive"},
    {label: "Discount", value: "$20"},
    {label: "Tax", value: "$650"},
];

const countries = ["United States", "Canada", "India", "Australia", "United Kingdom"];
const regions = ["California", "Ontario", "Maharashtra", "New South Wales", "England"];
const cities = ["Los Angeles", "Toronto", "Mumbai", "Sydney", "London"];

const BillingCheckoutPageExample = () => {
    const [placed, setPlaced] = useState(false);

    return (
        <div className="w-full">
            <BillingCheckoutPage
                items={items}
                summary={summary}
                total="$357.99 USD"
                countries={countries}
                regions={regions}
                cities={cities}
                onSubmit={() => setPlaced(true)}
            />
            {placed && (
                <p role="status" className="mt-4 text-sm text-gray-600 dark:text-slate-400">
                    Order placed. Replace onSubmit with your checkout request.
                </p>
            )}
        </div>
    );
};

export default BillingCheckoutPageExample;
