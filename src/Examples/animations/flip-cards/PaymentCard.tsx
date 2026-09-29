import {useId, useState} from "react";
import type {ChangeEvent, FormEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuLock, LuWifi} from "react-icons/lu";

type Field = "number" | "name" | "expiry" | "cvc";
export type CardBrand = "visa" | "mastercard" | "amex" | "unknown";
type Brand = CardBrand;

export interface PaymentCardValues {
    /** Card number digits without spaces. */
    number: string;
    name: string;
    /** Expiry date as MM/YY. */
    expiry: string;
    cvc: string;
    brand: CardBrand;
}

export interface PaymentCardProps {
    /** Called with the card details when a complete form is submitted. */
    onSubmit?: (values: PaymentCardValues) => void;
    submitLabel?: string;
    /** Button label and screen reader message after a successful submit. */
    savedLabel?: string;
    /** Help text printed on the back of the card preview. */
    securityCodeNote?: string;
    /** Placeholder for the name field. */
    namePlaceholder?: string;
    className?: string;
}

const detectBrand = (digits: string): Brand => {
    if (/^4/.test(digits)) return "visa";
    if (/^(5[1-5]|2[2-7])/.test(digits)) return "mastercard";
    if (/^3[47]/.test(digits)) return "amex";
    return "unknown";
};

const brandStyles: Record<Brand, {label: string; gradient: string}> = {
    visa: {label: "VISA", gradient: "from-blue-600 via-indigo-600 to-violet-700"},
    mastercard: {label: "mastercard", gradient: "from-orange-500 via-rose-600 to-fuchsia-700"},
    amex: {label: "AMEX", gradient: "from-cyan-600 via-sky-600 to-blue-700"},
    unknown: {label: "CARD", gradient: "from-slate-700 via-slate-800 to-slate-950"},
};

// Amex groups digits 4-6-5, other cards 4-4-4-4.
const formatNumber = (digits: string, brand: Brand) => {
    const groups = brand === "amex" ? [4, 6, 5] : [4, 4, 4, 4];
    const parts: string[] = [];
    let start = 0;
    for (const size of groups) {
        if (start >= digits.length) break;
        parts.push(digits.slice(start, start + size));
        start += size;
    }
    return parts.join(" ");
};

const faceClass =
    "col-start-1 row-start-1 aspect-[1.586/1] w-full overflow-hidden rounded-2xl text-white shadow-2xl [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";

// Draws a moving outline around the part of the card that matches the focused field.
const Region = ({active, layoutId, className, children}: {active: boolean; layoutId: string; className: string; children: ReactNode}) => (
    <div className={`relative rounded-lg px-2 py-1 ${className}`}>
        {active && (
            <motion.div
                layoutId={layoutId}
                className="absolute inset-0 rounded-lg border border-white/60 bg-white/10"
                transition={{type: "spring", stiffness: 380, damping: 32}}
            />
        )}
        <div className="relative">{children}</div>
    </div>
);

// A payment form whose card preview updates while typing and flips over when the CVC field is focused.
export const PaymentCard = ({
    onSubmit,
    submitLabel = "Save card",
    savedLabel = "Card saved",
    securityCodeNote = "The three or four digit code next to the signature strip confirms that you have the card with you.",
    namePlaceholder = "Jordan Ellis",
    className = "",
}: PaymentCardProps) => {
    const reduceMotion = useReducedMotion();
    const id = useId();
    const focusLayoutId = `card-focus-${id}`;
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focused, setFocused] = useState<Field | null>(null);
    const [saved, setSaved] = useState(false);

    const brand = detectBrand(number);
    const numberLength = brand === "amex" ? 15 : 16;
    const cvcLength = brand === "amex" ? 4 : 3;
    const template = formatNumber("#".repeat(numberLength), brand);
    const typed = formatNumber(number, brand);
    const shown = typed + template.slice(typed.length);
    const flipped = focused === "cvc";
    const complete = number.length === numberLength && name.trim().length > 1 && expiry.length === 5 && cvc.length === cvcLength;

    const handleNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const digits = event.target.value.replace(/\D/g, "");
        setNumber(digits.slice(0, detectBrand(digits) === "amex" ? 15 : 16));
        setSaved(false);
    };

    const handleExpiry = (event: ChangeEvent<HTMLInputElement>) => {
        const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
        setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
        setSaved(false);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!complete) return;
        setSaved(true);
        onSubmit?.({number, name, expiry, cvc, brand});
    };

    const inputClass =
        "mt-1.5 w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400";
    const labelClass = "text-xs font-medium text-gray-700 dark:text-slate-300";

    return (
        <div className={`grid w-full max-w-3xl items-center gap-8 md:grid-cols-2 ${className}`}>
            {/* The preview repeats what is typed in the form, so it is hidden from screen readers. */}
            <div aria-hidden="true" className="mx-auto w-full max-w-sm [perspective:1600px]">
                <motion.div
                    className="grid [transform-style:preserve-3d]"
                    initial={false}
                    animate={{rotateY: flipped ? 180 : 0}}
                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 110, damping: 16}}
                >
                    <div className={`${faceClass} bg-gradient-to-br ${brandStyles[brand].gradient} shadow-indigo-900/30`}>
                        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10"/>
                        <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-white/5"/>
                        <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <div className="h-8 w-11 rounded-md bg-gradient-to-br from-amber-200 to-amber-400 shadow-inner"/>
                                    <LuWifi className="h-5 w-5 rotate-90 text-white/60"/>
                                </div>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={brand}
                                        initial={{opacity: 0, y: -8}}
                                        animate={{opacity: 1, y: 0}}
                                        exit={{opacity: 0, y: 8}}
                                        transition={{duration: 0.2}}
                                        className="text-lg font-bold italic tracking-wider"
                                    >
                                        {brandStyles[brand].label}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            <Region active={focused === "number"} layoutId={focusLayoutId} className="-mx-2">
                                <p className="flex font-mono text-lg tracking-wider sm:text-xl">
                                    {shown.split("").map((char, index) => (
                                        <span key={index} className="inline-block w-[0.62em] text-center">
                                            <motion.span
                                                key={char}
                                                className={`inline-block ${char === "#" ? "text-white/40" : ""}`}
                                                initial={reduceMotion ? false : {y: -10, opacity: 0}}
                                                animate={{y: 0, opacity: 1}}
                                                transition={{type: "spring", stiffness: 500, damping: 28}}
                                            >
                                                {char === "#" ? "•" : char}
                                            </motion.span>
                                        </span>
                                    ))}
                                </p>
                            </Region>
                            <div className="flex items-end justify-between gap-3">
                                <Region active={focused === "name"} layoutId={focusLayoutId} className="-mx-2 min-w-0 flex-1">
                                    <p className="text-[10px] uppercase tracking-widest text-white/60">Card holder</p>
                                    <p className="truncate text-sm font-medium uppercase tracking-wide">{name || "Your name"}</p>
                                </Region>
                                <Region active={focused === "expiry"} layoutId={focusLayoutId} className="-mr-2">
                                    <p className="text-[10px] uppercase tracking-widest text-white/60">Expires</p>
                                    <p className="font-mono text-sm">{expiry || "MM/YY"}</p>
                                </Region>
                            </div>
                        </div>
                    </div>

                    <div className={`${faceClass} bg-gradient-to-br ${brandStyles[brand].gradient} [transform:rotateY(180deg)]`}>
                        <div className="mt-6 h-11 w-full bg-black/70"/>
                        <div className="mx-5 mt-5 flex items-center gap-3">
                            <div className="h-9 flex-1 rounded bg-[repeating-linear-gradient(135deg,#f8fafc_0_6px,#e2e8f0_6px_12px)]"/>
                            <div className="flex h-9 w-16 items-center justify-center rounded bg-white font-mono text-sm italic text-slate-900 ring-2 ring-amber-300">
                                {cvc || "•".repeat(cvcLength)}
                            </div>
                        </div>
                        <p className="mx-5 mt-4 text-[10px] leading-relaxed text-white/60">
                            {securityCodeNote}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Clearing focus on the form, not per field, lets the outline glide between fields instead of blinking. */}
            <form
                onSubmit={handleSubmit}
                onBlur={(event) => {
                    if (!(event.relatedTarget instanceof HTMLInputElement) || !event.currentTarget.contains(event.relatedTarget)) setFocused(null);
                }}
                className="w-full space-y-4"
                noValidate
            >
                <div>
                    <label htmlFor={`${id}-number`} className={labelClass}>Card number</label>
                    <input
                        id={`${id}-number`}
                        inputMode="numeric"
                        autoComplete="cc-number"
                        placeholder="4242 4242 4242 4242"
                        value={typed}
                        onChange={handleNumber}
                        onFocus={() => setFocused("number")}
                        className={`${inputClass} font-mono`}
                    />
                </div>
                <div>
                    <label htmlFor={`${id}-name`} className={labelClass}>Name on card</label>
                    <input
                        id={`${id}-name`}
                        autoComplete="cc-name"
                        placeholder={namePlaceholder}
                        value={name}
                        maxLength={26}
                        onChange={(event) => {
                            setName(event.target.value);
                            setSaved(false);
                        }}
                        onFocus={() => setFocused("name")}
                        className={inputClass}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor={`${id}-expiry`} className={labelClass}>Expiry</label>
                        <input
                            id={`${id}-expiry`}
                            inputMode="numeric"
                            autoComplete="cc-exp"
                            placeholder="MM/YY"
                            value={expiry}
                            onChange={handleExpiry}
                            onFocus={() => setFocused("expiry")}
                            className={`${inputClass} font-mono`}
                        />
                    </div>
                    <div>
                        <label htmlFor={`${id}-cvc`} className={labelClass}>CVC</label>
                        <input
                            id={`${id}-cvc`}
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            placeholder={brand === "amex" ? "1234" : "123"}
                            value={cvc}
                            onChange={(event) => {
                                setCvc(event.target.value.replace(/\D/g, "").slice(0, cvcLength));
                                setSaved(false);
                            }}
                            onFocus={() => setFocused("cvc")}
                            className={`${inputClass} font-mono`}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!complete}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 dark:focus-visible:ring-offset-slate-950 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                >
                    {saved ? <LuCheck className="h-4 w-4" aria-hidden="true"/> : <LuLock className="h-4 w-4" aria-hidden="true"/>}
                    {saved ? savedLabel : submitLabel}
                </button>
                <p className="sr-only" aria-live="polite">{saved ? savedLabel : ""}</p>
            </form>
        </div>
    );
};

