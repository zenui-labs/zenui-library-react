import {useId, useState} from "react";
import type {FormEvent} from "react";
import {AiOutlinePlus} from "react-icons/ai";

export interface OrderLineItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    /** Formatted line price, for example "$28.00". */
    price: string;
    /** Short attributes under the name, such as size and color. */
    details?: {label: string; value: string}[];
}

export interface OrderTotalLine {
    label: string;
    /** Formatted amount, for example "$8.00" or "-$13.00". */
    value: string;
}

export interface SavedPaymentMethod {
    id: string;
    /** Masked card or account number, for example "**** 8304". */
    label: string;
    /** Provider name shown under the number, for example "Visa". */
    brand: string;
    logo: string;
}

export interface DialCode {
    value: string;
    /** Text in the dropdown, for example "🇺🇸 +1". */
    label: string;
}

export interface SavedCardCheckoutValues {
    email: string;
    dialCode: string;
    phone: string;
    paymentMethodId: string;
    cardHolder: string;
    billingCountry: string;
    zipCode: string;
    city: string;
    billingSameAsShipping: boolean;
}

export interface SavedCardCheckoutPageProps {
    items: OrderLineItem[];
    /** Lines above the total, such as subtotal, shipping and discount. */
    totals: OrderTotalLine[];
    /** Formatted order total, for example "$51.00". */
    total: string;
    paymentMethods: SavedPaymentMethod[];
    dialCodes: DialCode[];
    /** Options for the billing address select. */
    countries: string[];
    /** Id of the payment method selected at first. Defaults to the first one. */
    defaultPaymentMethodId?: string;
    onSubmit?: (values: SavedCardCheckoutValues) => void;
    onApplyDiscount?: (code: string) => void;
    onAddPaymentMethod?: () => void;
    onEditPaymentMethod?: (method: SavedPaymentMethod) => void;
    orderTitle?: string;
    discountLabel?: string;
    discountPlaceholder?: string;
    /** Icon shown inside the discount field. */
    discountIcon?: string;
    /** Defaults to "Pay" followed by the total. */
    submitLabel?: string;
    className?: string;
}

const inputStyles =
    "w-full border dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500 rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5";
const selectStyles =
    "border rounded dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5";
const labelStyles = "text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800 mb-1";

const readText = (data: FormData, key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value : "";
};

/** One product row in the order list, with a quantity badge on the image. */
export const OrderLine = ({item, bordered = false}: {item: OrderLineItem; bordered?: boolean}) => (
    <div
        className={`flex flex-col md:flex-row md:items-center gap-4 p-4 ${
            bordered ? "border-t border-gray-200 dark:border-slate-700" : ""
        }`}
    >
        <div className="border relative border-gray-200 dark:border-slate-700 dark:bg-slate-800 w-max rounded-md bg-white">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded"/>
            <span
                className="px-[0.45rem] rounded-full dark:border-slate-500 dark:bg-slate-600 dark:text-[#abc2d3] absolute bg-white -top-2 -right-2 z-30 text-[0.9rem] text-gray-800 border border-gray-200 shadow-sm"
                aria-label={`Quantity ${item.quantity}`}
            >
                {item.quantity}
            </span>
        </div>
        <div className="flex-1">
            <h3 className="font-medium dark:text-[#abc2d3]">{item.name}</h3>
            {item.details && item.details.length > 0 && (
                <div className="flex items-center gap-[30px] mt-2">
                    {item.details.map((detail) => (
                        <p key={detail.label} className="text-sm text-gray-500 dark:text-[#abc2d3]">
                            {detail.label}: <b className="text-gray-800 dark:text-slate-400">{detail.value}</b>
                        </p>
                    ))}
                </div>
            )}
        </div>
        <span className="font-medium dark:text-[#abc2d3]">{item.price}</span>
    </div>
);

/** A two column checkout: the order with a discount code and totals, next to contact, saved payment and billing fields. */
export const SavedCardCheckoutPage = ({
    items,
    totals,
    total,
    paymentMethods,
    dialCodes,
    countries,
    defaultPaymentMethodId,
    onSubmit,
    onApplyDiscount,
    onAddPaymentMethod,
    onEditPaymentMethod,
    orderTitle = "Your order",
    discountLabel = "Discount code",
    discountPlaceholder = "BUYRI",
    discountIcon = "https://i.ibb.co.com/r7rF8xK/ticket-discount.png",
    submitLabel,
    className = "",
}: SavedCardCheckoutPageProps) => {
    const uid = useId();
    const fieldId = (name: string) => `${uid}-${name}`;
    const [discountCode, setDiscountCode] = useState("");
    const [paymentMethodId, setPaymentMethodId] = useState(defaultPaymentMethodId ?? paymentMethods[0]?.id ?? "");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            email: readText(data, "email"),
            dialCode: readText(data, "dialCode"),
            phone: readText(data, "phone"),
            paymentMethodId,
            cardHolder: readText(data, "cardHolder"),
            billingCountry: readText(data, "billingCountry"),
            zipCode: readText(data, "zipCode"),
            city: readText(data, "city"),
            billingSameAsShipping: data.get("sameAsShipping") === "on",
        });
    };

    return (
        <div className={`w-full flex flex-col gap-8 md:gap-0 md:flex-row ${className}`}>
            {/* Left column: order summary */}
            <div className="bg-gray-50 dark:bg-slate-900 rounded-md p-4 md:p-8 flex-1">
                <h2 className="text-[1.2rem] dark:text-[#abc2d3] text-gray-700 font-semibold mb-6">{orderTitle}</h2>
                <div className="border dark:border-slate-700 border-gray-200 rounded-md">
                    {items.map((item, index) => (
                        <OrderLine key={item.id} item={item} bordered={index > 0}/>
                    ))}
                </div>

                <div className="mt-6">
                    <label htmlFor={fieldId("discount")} className="block font-medium mb-2 text-[1rem] dark:text-[#abc2d3] text-gray-800">
                        {discountLabel}
                    </label>
                    <div className="flex gap-2 relative">
                        <img
                            alt=""
                            src={discountIcon}
                            className="w-[25px] absolute transform top-[50%] translate-y-[-50%] left-2"
                        />
                        <input
                            type="text"
                            id={fieldId("discount")}
                            placeholder={discountPlaceholder}
                            value={discountCode}
                            onChange={(event) => setDiscountCode(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") onApplyDiscount?.(discountCode.trim());
                            }}
                            className="border w-full dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border-gray-200 bg-transparent outline-none focus:border-[#0FABCA] rounded pl-10 pr-3 py-2"
                        />
                        <button
                            type="button"
                            onClick={() => onApplyDiscount?.(discountCode.trim())}
                            className="absolute top-[50%] transform translate-y-[-50%] right-5 text-[0.9rem] text-[#0FABCA]"
                        >
                            Apply
                        </button>
                    </div>
                </div>

                <div className="mt-8 space-y-2 border-t dark:border-slate-700 border-gray-200 pt-6">
                    {totals.map((line, index) => (
                        <div key={line.label} className={`flex justify-between ${index === totals.length - 1 ? "pb-3" : ""}`}>
                            <span className="text-[1rem] dark:text-[#abc2d3] text-gray-500">{line.label}</span>
                            <span className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800">{line.value}</span>
                        </div>
                    ))}
                    <div className="flex justify-between border-t dark:text-[#abc2d3] dark:border-slate-700 border-gray-200 pt-5 font-medium">
                        <span>Total</span>
                        <span className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800">{total}</span>
                    </div>
                </div>
            </div>

            {/* Right column: checkout form */}
            <div className="flex-1 md:px-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor={fieldId("email")} className={labelStyles}>
                            Email
                        </label>
                        <input
                            type="email"
                            id={fieldId("email")}
                            name="email"
                            autoComplete="email"
                            placeholder="joylawson@gmail.com"
                            className={inputStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor={fieldId("phone")} className={labelStyles}>
                            Phone number
                        </label>
                        <div className="flex gap-2">
                            <select name="dialCode" aria-label="Country code" className={`${selectStyles} w-[100px]`}>
                                {dialCodes.map((code) => (
                                    <option key={code.value} value={code.value}>
                                        {code.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                id={fieldId("phone")}
                                name="phone"
                                autoComplete="tel-national"
                                placeholder="(201) 830-8210"
                                className={inputStyles}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p id={fieldId("payment")} className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800">
                                Payment method
                            </p>
                            <button
                                type="button"
                                onClick={onAddPaymentMethod}
                                className="text-blue-600 text-right flex text-[0.9rem] items-center gap-[5px]"
                            >
                                <AiOutlinePlus aria-hidden/>
                                Add new
                            </button>
                        </div>
                        <div role="radiogroup" aria-labelledby={fieldId("payment")} className="flex flex-col md:flex-row w-full gap-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className="flex-1 flex items-center dark:border-slate-700 justify-between gap-2 border-gray-200 border rounded-lg p-4"
                                >
                                    <div>
                                        <label className="dark:text-[#abc2d3] cursor-pointer">
                                            <input
                                                type="radio"
                                                name={fieldId("paymentMethod")}
                                                value={method.id}
                                                checked={paymentMethodId === method.id}
                                                onChange={() => setPaymentMethodId(method.id)}
                                                className="form-radio"
                                            />
                                            <span> {method.label}</span>
                                        </label>

                                        <div className="flex items-center gap-[5px] pl-5 mt-0.5">
                                            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">{method.brand} •</p>
                                            <button
                                                type="button"
                                                onClick={() => onEditPaymentMethod?.(method)}
                                                aria-label={`Edit ${method.brand} ${method.label}`}
                                                className="text-[0.9rem] dark:text-slate-400 text-gray-500 hover:text-[#0FABCA]"
                                            >
                                                Edit
                                            </button>
                                        </div>
                                    </div>
                                    <img src={method.logo} alt={method.brand} className="w-[50px]"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor={fieldId("cardHolder")} className={labelStyles}>
                            Cardholder name
                        </label>
                        <input
                            type="text"
                            id={fieldId("cardHolder")}
                            name="cardHolder"
                            autoComplete="cc-name"
                            placeholder="Ex. Jane Cooper"
                            className={inputStyles}
                        />
                    </div>
                    <div>
                        <label htmlFor={fieldId("billingCountry")} className={labelStyles}>
                            Billing address
                        </label>
                        <select id={fieldId("billingCountry")} name="billingCountry" className={`w-full ${selectStyles}`}>
                            {countries.map((country) => (
                                <option key={country}>{country}</option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={fieldId("zipCode")} className={labelStyles}>
                                Zip code
                            </label>
                            <input
                                type="text"
                                id={fieldId("zipCode")}
                                name="zipCode"
                                autoComplete="postal-code"
                                placeholder="Ex. 73923"
                                className={inputStyles}
                            />
                        </div>
                        <div>
                            <label htmlFor={fieldId("city")} className={labelStyles}>
                                City
                            </label>
                            <input
                                type="text"
                                id={fieldId("city")}
                                name="city"
                                autoComplete="address-level2"
                                placeholder="Ex. New York"
                                className={inputStyles}
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id={fieldId("sameAsShipping")} name="sameAsShipping" className="form-checkbox"/>
                        <label htmlFor={fieldId("sameAsShipping")} className="text-sm dark:text-[#abc2d3] text-gray-600">
                            Billing address is the same as shipping
                        </label>
                    </div>
                    <button type="submit" className="w-full bg-[#0FABCA] text-white py-3 rounded-lg hover:bg-[#0FABCA]/90">
                        {submitLabel ?? `Pay ${total}`}
                    </button>
                </form>
            </div>
        </div>
    );
};
