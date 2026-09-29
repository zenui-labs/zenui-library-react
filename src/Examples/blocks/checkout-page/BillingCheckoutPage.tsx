import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, FormEvent, KeyboardEvent} from "react";
import {IoChevronDown} from "react-icons/io5";

export type PaymentMethod = "cash" | "credit-card";

export interface CheckoutItem {
    id: string;
    name: string;
    image: string;
    quantity: number;
    /** Formatted unit price, for example "$570". */
    price: string;
}

export interface SummaryLine {
    label: string;
    /** Formatted amount, for example "$670" or "Free". */
    value: string;
    /** "positive" prints the value in green, for free shipping or savings. */
    tone?: "default" | "positive";
}

export interface BillingCheckoutValues {
    firstName: string;
    lastName: string;
    company: string;
    address: string;
    country: string;
    region: string;
    city: string;
    zipCode: string;
    email: string;
    phone: string;
    shipToDifferentAddress: boolean;
    paymentMethod: PaymentMethod;
    /** Present when the card payment method is selected. */
    card?: {
        name: string;
        number: string;
        expiry: string;
        cvc: string;
    };
    notes: string;
}

export interface BillingCheckoutPageProps {
    items: CheckoutItem[];
    /** Lines above the total, such as subtotal, shipping, discount and tax. */
    summary: SummaryLine[];
    /** Formatted order total, for example "$357.99 USD". */
    total: string;
    countries: string[];
    regions: string[];
    cities: string[];
    /** Controlled payment method. Leave it out to let the page manage it. */
    paymentMethod?: PaymentMethod;
    defaultPaymentMethod?: PaymentMethod;
    onPaymentMethodChange?: (method: PaymentMethod) => void;
    /** Runs when the order is placed, with the values of every field. */
    onSubmit?: (values: BillingCheckoutValues) => void;
    billingTitle?: string;
    paymentTitle?: string;
    notesTitle?: string;
    summaryTitle?: string;
    submitLabel?: string;
    className?: string;
}

const inputStyles =
    "border border-gray-200 dark:text-[#abc2d3] dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]";
const labelStyles = "text-[14px] font-[400] dark:text-[#abc2d3] text-gray-700";

export interface CheckoutSelectProps {
    /** Lets a label point at the select with htmlFor. */
    id?: string;
    /** Form field name. The chosen option is submitted under it. */
    name?: string;
    options: string[];
    placeholder?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    className?: string;
}

/** A dropdown select that closes on outside click or Escape and submits its value through a hidden input. */
export const CheckoutSelect = ({
    id,
    name,
    options,
    placeholder = "Select option",
    defaultValue = "",
    onChange,
    className = "",
}: CheckoutSelectProps) => {
    const listId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);
    const [value, setValue] = useState(defaultValue);

    // Close the dropdown when a click lands outside it.
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsActive(false);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const choose = (option: string) => {
        setValue(option);
        setIsActive(false);
        onChange?.(option);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") setIsActive(false);
    };

    return (
        <div ref={rootRef} className={`relative mt-1 w-full ${className}`} onKeyDown={handleKeyDown}>
            {name && <input type="hidden" name={name} value={value}/>}
            <button
                id={id}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isActive}
                aria-controls={listId}
                className="bg-[#fff] border dark:border-slate-700 dark:bg-slate-900 border-gray-200 rounded-md justify-between px-3 py-2 flex items-center gap-8 relative cursor-pointer w-full"
                onClick={() => setIsActive((open) => !open)}
            >
                <span className={value ? "dark:text-[#abc2d3]" : "text-gray-400 dark:text-slate-500"}>
                    {value || placeholder}
                </span>
                <IoChevronDown
                    className={`${
                        isActive ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-300 dark:text-slate-500 text-gray-600 text-[1.2rem]`}
                />
            </button>
            <div
                id={listId}
                role="listbox"
                className={`${
                    isActive ? "opacity-100 scale-[1]" : "opacity-0 scale-[0.8] z-[-1] invisible pointer-events-none"
                } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-200 ease-in-out py-1`}
                style={{boxShadow: "0 15px 40px -15px rgba(0, 0, 0, 0.2)"}}
            >
                {options.map((option) => (
                    <button
                        key={option}
                        type="button"
                        role="option"
                        aria-selected={option === value}
                        className="py-2 px-4 text-left text-gray-800 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-50 transition-all duration-200"
                        onClick={() => choose(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const CheckedBox = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect x="-0.00012207" y="6.10352e-05" width="20" height="20" rx="4" className="fill-[#0FABCA]" stroke="#0FABCA"/>
        <path
            d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
            fill="white"
        />
    </svg>
);

const EmptyBox = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect
            x="-0.00012207"
            y="6.10352e-05"
            width="20"
            height="20"
            rx="4"
            className="fill-transparent dark:stroke-slate-400"
            stroke="#ccc"
        />
    </svg>
);

export interface OrderSummaryProps {
    items: CheckoutItem[];
    summary: SummaryLine[];
    total: string;
    title?: string;
    submitLabel?: string;
    className?: string;
}

/** The order summary card with items, totals and the place order button. The button submits the enclosing form. */
export const OrderSummary = ({
    items,
    summary,
    total,
    title = "Order summary",
    submitLabel = "Place order",
    className = "",
}: OrderSummaryProps) => (
    <div className={`bg-white dark:bg-slate-900 dark:border-slate-700 rounded-md border border-gray-200 p-6 ${className}`}>
        <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-6">{title}</h2>
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-[50px] h-[50px] object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm dark:text-[#abc2d3] font-medium text-gray-900 line-clamp-1">{item.name}</p>
                        <div className="flex items-center gap-[5px] mt-0.5">
                            <p className="text-sm text-gray-500 dark:text-slate-400">{item.quantity} x </p>
                            <p className="text-sm text-[#0FABCA] font-[600]">{item.price}</p>
                        </div>
                    </div>
                </div>
            ))}

            <div className="pt-4 space-y-4">
                {summary.map((line) => (
                    <div key={line.label} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-[#abc2d3]">{line.label}</span>
                        <span
                            className={`font-medium ${
                                line.tone === "positive" ? "text-green-500" : "text-gray-800 dark:text-[#abc2d3]"
                            }`}
                        >
                            {line.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="border-t dark:border-slate-700 border-gray-200 pt-4">
                <div className="flex justify-between">
                    <span className="text-base font-medium dark:text-[#abc2d3] text-gray-800">Total</span>
                    <span className="text-base font-medium dark:text-[#abc2d3] text-gray-800">{total}</span>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-[#0FABCA] text-white py-3 px-4 rounded-lg hover:bg-[#0FABCA]/90 transition-colors uppercase"
            >
                {submitLabel}
            </button>
        </div>
    </div>
);

const readText = (data: FormData, key: string) => {
    const value = data.get(key);
    return typeof value === "string" ? value : "";
};

/** A checkout page with a billing form, a payment choice between cash and card, order notes and an order summary. */
export const BillingCheckoutPage = ({
    items,
    summary,
    total,
    countries,
    regions,
    cities,
    paymentMethod,
    defaultPaymentMethod = "credit-card",
    onPaymentMethodChange,
    onSubmit,
    billingTitle = "Billing information",
    paymentTitle = "Payment option",
    notesTitle = "Additional information",
    summaryTitle = "Order summary",
    submitLabel = "Place order",
    className = "",
}: BillingCheckoutPageProps) => {
    const uid = useId();
    const fieldId = (name: string) => `${uid}-${name}`;
    const [internalPayment, setInternalPayment] = useState<PaymentMethod>(defaultPaymentMethod);
    const selectedPayment = paymentMethod ?? internalPayment;
    const [isChecked, setIsChecked] = useState(false);

    const selectPayment = (method: PaymentMethod) => {
        setInternalPayment(method);
        onPaymentMethodChange?.(method);
    };

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            firstName: readText(data, "firstName"),
            lastName: readText(data, "lastName"),
            company: readText(data, "company"),
            address: readText(data, "address"),
            country: readText(data, "country"),
            region: readText(data, "region"),
            city: readText(data, "city"),
            zipCode: readText(data, "zipCode"),
            email: readText(data, "email"),
            phone: readText(data, "phone"),
            shipToDifferentAddress: isChecked,
            paymentMethod: selectedPayment,
            card:
                selectedPayment === "credit-card"
                    ? {
                          name: readText(data, "cardName"),
                          number: readText(data, "cardNumber"),
                          expiry: readText(data, "cardExpiry"),
                          cvc: readText(data, "cardCvc"),
                      }
                    : undefined,
            notes: readText(data, "notes"),
        });
    };

    const paymentOptions: {method: PaymentMethod; icon: string; label: string}[] = [
        {method: "cash", icon: "💵", label: "Cash on delivery"},
        {method: "credit-card", icon: "💳", label: "Debit or credit card"},
    ];

    return (
        <form onSubmit={handleSubmit} className={`grid gap-8 grid-cols-1 md:grid-cols-3 w-full ${className}`}>
            {/* Billing and payment form */}
            <div className="md:col-span-2 space-y-8 w-full">
                {/* Billing information */}
                <div className="w-full">
                    <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-6">{billingTitle}</h2>

                    <div className="grid grid-cols-1 gap-[16px]">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("firstName")} className={labelStyles}>
                                    First name
                                </label>
                                <input
                                    placeholder="First name"
                                    type="text"
                                    id={fieldId("firstName")}
                                    name="firstName"
                                    autoComplete="given-name"
                                    className={inputStyles}
                                />
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("lastName")} className={labelStyles}>
                                    Last name
                                </label>
                                <input
                                    placeholder="Last name"
                                    type="text"
                                    id={fieldId("lastName")}
                                    name="lastName"
                                    autoComplete="family-name"
                                    className={inputStyles}
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor={fieldId("company")} className={labelStyles}>
                                Company name (optional)
                            </label>
                            <input
                                placeholder="Company name"
                                type="text"
                                id={fieldId("company")}
                                name="company"
                                autoComplete="organization"
                                className={inputStyles}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor={fieldId("address")} className={labelStyles}>
                                Address
                            </label>
                            <input
                                placeholder="Address"
                                type="text"
                                id={fieldId("address")}
                                name="address"
                                autoComplete="street-address"
                                className={inputStyles}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("country")} className={labelStyles}>
                                    Country
                                </label>
                                <CheckoutSelect id={fieldId("country")} name="country" options={countries}/>
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("region")} className={labelStyles}>
                                    Region/state
                                </label>
                                <CheckoutSelect id={fieldId("region")} name="region" options={regions}/>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("city")} className={labelStyles}>
                                    City
                                </label>
                                <CheckoutSelect id={fieldId("city")} name="city" options={cities}/>
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("zipCode")} className={labelStyles}>
                                    Zip code
                                </label>
                                <input
                                    placeholder="Zip code"
                                    type="text"
                                    id={fieldId("zipCode")}
                                    name="zipCode"
                                    autoComplete="postal-code"
                                    className={inputStyles}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("email")} className={labelStyles}>
                                    Email
                                </label>
                                <input
                                    placeholder="Email address"
                                    type="email"
                                    id={fieldId("email")}
                                    name="email"
                                    autoComplete="email"
                                    className={inputStyles}
                                />
                            </div>
                            <div className="w-full md:w-[50%]">
                                <label htmlFor={fieldId("phone")} className={labelStyles}>
                                    Phone number
                                </label>
                                <input
                                    placeholder="Phone number"
                                    type="tel"
                                    id={fieldId("phone")}
                                    name="phone"
                                    autoComplete="tel"
                                    className={inputStyles}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="flex items-center gap-[10px] cursor-pointer">
                            <input type="checkbox" className="sr-only" checked={isChecked} onChange={handleCheckboxChange}/>
                            {isChecked ? <CheckedBox/> : <EmptyBox/>}
                            <span className="text-[0.9rem] dark:text-slate-400 text-gray-700">Ship to a different address</span>
                        </label>
                    </div>
                </div>

                {/* Payment options */}
                <div className="border border-gray-200 dark:border-slate-700 rounded-md">
                    <h2 className="text-[1.2rem] font-medium text-gray-700 dark:border-slate-700 border-b border-gray-200 px-5 py-3 dark:text-[#abc2d3]">
                        {paymentTitle}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-5">
                        {paymentOptions.map((option) => (
                            <button
                                key={option.method}
                                type="button"
                                aria-pressed={selectedPayment === option.method}
                                onClick={() => selectPayment(option.method)}
                                className={`flex flex-col items-center justify-center p-4 border rounded-lg ${
                                    selectedPayment === option.method
                                        ? "border-[#0FABCA]"
                                        : "border-gray-200 dark:border-slate-700"
                                }`}
                            >
                                <span className="text-2xl" aria-hidden>
                                    {option.icon}
                                </span>
                                <span className="text-[0.9rem] dark:text-[#abc2d3] text-gray-700 font-[500] mt-2">
                                    {option.label}
                                </span>
                            </button>
                        ))}
                    </div>

                    {selectedPayment === "credit-card" && (
                        <div className="px-5 pb-5 space-y-[16px]">
                            <div>
                                <label htmlFor={fieldId("cardName")} className={labelStyles}>
                                    Name on card
                                </label>
                                <input
                                    placeholder="Name on card"
                                    type="text"
                                    id={fieldId("cardName")}
                                    name="cardName"
                                    autoComplete="cc-name"
                                    className={inputStyles}
                                />
                            </div>
                            <div>
                                <label htmlFor={fieldId("cardNumber")} className={labelStyles}>
                                    Card number
                                </label>
                                <input
                                    placeholder="Card number"
                                    type="text"
                                    inputMode="numeric"
                                    id={fieldId("cardNumber")}
                                    name="cardNumber"
                                    autoComplete="cc-number"
                                    className={inputStyles}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor={fieldId("cardExpiry")} className={labelStyles}>
                                        Expiry date
                                    </label>
                                    <input
                                        type="text"
                                        id={fieldId("cardExpiry")}
                                        name="cardExpiry"
                                        placeholder="MM/YY"
                                        autoComplete="cc-exp"
                                        className={inputStyles}
                                    />
                                </div>
                                <div>
                                    <label htmlFor={fieldId("cardCvc")} className={labelStyles}>
                                        CVC
                                    </label>
                                    <input
                                        placeholder="CVC"
                                        type="text"
                                        inputMode="numeric"
                                        id={fieldId("cardCvc")}
                                        name="cardCvc"
                                        autoComplete="cc-csc"
                                        className={inputStyles}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Additional information */}
                <div>
                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-4">{notesTitle}</h2>
                    <div>
                        <label htmlFor={fieldId("notes")} className={labelStyles}>
                            Order notes (optional)
                        </label>
                        <textarea
                            id={fieldId("notes")}
                            name="notes"
                            rows={4}
                            placeholder="Notes about your order, for example special notes for delivery"
                            className={`${inputStyles} py-3`}
                        />
                    </div>
                </div>
            </div>

            {/* Order summary */}
            <div className="w-full">
                <OrderSummary items={items} summary={summary} total={total} title={summaryTitle} submitLabel={submitLabel}/>
            </div>
        </form>
    );
};
