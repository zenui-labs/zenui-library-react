import {useEffect, useRef} from "react";
import type {RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface CartItem {
    id: string;
    name: string;
    image: string;
    imageAlt?: string;
    /** Short text under the name, for example "25 items". */
    quantityLabel: string;
    /** The price the customer pays, already formatted. */
    price: string;
    /** The price before the discount, shown before `price`. */
    originalPrice?: string;
}

export interface OrderSummaryLine {
    label: string;
    value: string;
    /** Shows the value in the accent color, for example a discount or free shipping. */
    accent?: boolean;
}

export interface CartHelpLink {
    label: string;
    href: string;
}

export interface FullScreenCartDrawerProps {
    /** Whether the drawer is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, the Escape key and a click outside the drawer. */
    onClose: () => void;
    items: CartItem[];
    summary: OrderSummaryLine[];
    /** The order total, already formatted. */
    total: string;
    /** Called with the item id when its remove button is pressed. The remove buttons only show when this is set. */
    onRemoveItem?: (id: string) => void;
    onCheckout?: () => void;
    /** Checkout steps shown above the items. */
    steps?: string[];
    /** Index of the current step in `steps`. */
    activeStep?: number;
    /** An optional link shown next to the steps. */
    helpLink?: CartHelpLink;
    summaryTitle?: string;
    totalLabel?: string;
    checkoutLabel?: string;
    emptyText?: string;
    /** Accessible name of the drawer. */
    label?: string;
    /** Accessible name of the close button. */
    closeLabel?: string;
    className?: string;
}

// Moves focus into the drawer while it is open, closes it on Escape and gives focus back afterwards.
const useDrawerFocus = (open: boolean, onClose: () => void, focusRef: RefObject<HTMLElement>) => {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        focusRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            previous?.focus();
        };
    }, [open, focusRef]);
};

/** A full screen cart drawer that slides up over the page, with checkout steps, the items and an order summary. */
export const FullScreenCartDrawer = ({
    open,
    onClose,
    items,
    summary,
    total,
    onRemoveItem,
    onCheckout,
    steps = ["Cart", "Shipping and payment", "Confirmation"],
    activeStep = 0,
    helpLink,
    summaryTitle = "Order summary",
    totalLabel = "Order total",
    checkoutLabel = "Checkout",
    emptyText = "Your cart is empty.",
    label = "Shopping cart",
    closeLabel = "Close",
    className = "",
}: FullScreenCartDrawerProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    useDrawerFocus(open, onClose, panelRef);

    return (
        <div
            // A click on the backdrop, outside the panel, closes the drawer.
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                tabIndex={-1}
                className={`${
                    open ? " translate-y-[0px] opacity-100" : " translate-y-[200px] opacity-0"
                } overflow-y-scroll w-full h-full dark:bg-slate-800 bg-[#eceef6] transition-all duration-300 mx-auto mt-8 focus:outline-none`}
            >
                <div className="w-full flex items-end p-4 justify-end">
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="flex items-start lg:flex-row flex-col justify-between gap-8">
                    <div className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full lg:w-[70%]">
                        {/* steps */}
                        <div className="flex items-center lg:flex-row flex-col justify-between dark:border-slate-700 w-full border-b border-[#d1d1d1]">
                            <ol className="flex items-center gap-5">
                                {steps.map((step, index) => (
                                    <li
                                        key={step}
                                        aria-current={index === activeStep ? "step" : undefined}
                                        className={
                                            index === activeStep
                                                ? "text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3"
                                                : "text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3"
                                        }
                                    >
                                        {index + 1}. {step}
                                    </li>
                                ))}
                            </ol>

                            {helpLink && (
                                <a href={helpLink.href} className="underline text-[#3B9DF8] font-[500] pb-3">
                                    {helpLink.label}
                                </a>
                            )}
                        </div>

                        {/* products */}
                        {items.length === 0 && (
                            <p className="mt-12 text-[1rem] font-[500] text-[#424242] dark:text-slate-400">{emptyText}</p>
                        )}
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full"
                            >
                                <div className="flex items-start gap-5">
                                    <img
                                        src={item.image}
                                        alt={item.imageAlt ?? item.name}
                                        className="w-[90px] h-[60px] object-cover rounded-md"
                                    />

                                    <div>
                                        <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">{item.name}</h2>
                                        <p className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">
                                            {item.quantityLabel}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-12">
                                    <p className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">
                                        {item.originalPrice && <>{item.originalPrice} </>}
                                        <span className="text-[#3B9DF8] pl-1">{item.price}</span>
                                    </p>

                                    {onRemoveItem && (
                                        <button
                                            type="button"
                                            aria-label={`Remove ${item.name}`}
                                            onClick={() => onRemoveItem(item.id)}
                                            className="flex rounded-full"
                                        >
                                            <RxCross1 aria-hidden className="text-[#6d6d6d] dark:text-slate-400"/>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="w-full lg:w-[30%] mr-8">
                        <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6">
                            <h3 className="text-[1rem] text-[#3B9DF8] dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center">
                                {summaryTitle}
                            </h3>

                            <dl className="flex flex-col gap-5 mt-4">
                                {summary.map((line) => (
                                    <div key={line.label} className="flex items-center justify-between w-full">
                                        <dt className="text-[1rem] font-[500] text-[#3B9DF8]">{line.label}</dt>
                                        <dd
                                            className={
                                                line.accent
                                                    ? "text-[#3B9DF8] font-[500]"
                                                    : "text-[#424242] dark:text-[#abc2d3] font-[500]"
                                            }
                                        >
                                            {line.value}
                                        </dd>
                                    </div>
                                ))}

                                <div className="flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4">
                                    <dt className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">{totalLabel}</dt>
                                    <dd className="text-[#424242] font-[500] dark:text-[#abc2d3]">{total}</dd>
                                </div>
                            </dl>
                        </div>
                        <button
                            type="button"
                            onClick={onCheckout}
                            className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]"
                        >
                            {checkoutLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
