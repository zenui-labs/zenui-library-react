import {useId, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuShoppingBag, LuStar} from "react-icons/lu";

export interface Colorway {
    name: string;
    /** Swatch color, also passed to `renderImage`. */
    hex: string;
}

export interface SpecProduct {
    id: string;
    name: string;
    price: number;
    /** Average star rating out of 5. */
    rating: number;
    /** Number of reviews behind the rating. */
    reviews: number;
    /** The first colorway is selected at the start. */
    colorways: Colorway[];
}

export interface NumericSpec {
    kind: "number";
    label: string;
    unit: string;
    /** Which direction wins the Best badge. */
    better: "higher" | "lower";
    /** One value per product, keyed by product id. */
    values: Record<string, number>;
}

export interface TextSpec {
    kind: "text";
    label: string;
    /** One value per product, keyed by product id. */
    values: Record<string, string>;
}

export type Spec = NumericSpec | TextSpec;

const numberOf = (spec: NumericSpec, id: string) => spec.values[id] ?? 0;

const winnerOf = (spec: NumericSpec, products: SpecProduct[]): string | undefined =>
    products.length
        ? products.reduce((best, p) => {
            const a = numberOf(spec, p.id);
            const b = numberOf(spec, best.id);
            return (spec.better === "higher" ? a > b : a < b) ? p : best;
        }).id
        : undefined;

export interface ProductSpecCompareProps {
    products: SpecProduct[];
    specs: Spec[];
    title: string;
    description?: string;
    /** Draws the product picture for the selected colorway. */
    renderImage?: (product: SpecProduct, colorway: Colorway) => ReactNode;
    /** Called when a product is added, with the colorway selected at that moment. */
    onAddToBag?: (product: SpecProduct, colorway: Colorway) => void;
    formatPrice?: (price: number) => string;
    /** Screen reader caption for the table. */
    caption?: string;
    addLabel?: string;
    addedLabel?: string;
    bestLabel?: string;
    higherIsBetterLabel?: string;
    lowerIsBetterLabel?: string;
    className?: string;
}

/** Products side by side with color pickers, add to bag buttons and spec rows where numbers get bars and a Best badge. */
export const ProductSpecCompare = ({
    products,
    specs,
    title,
    description,
    renderImage,
    onAddToBag,
    formatPrice = (price) => `$${price}`,
    caption = "Product specifications",
    addLabel = "Add to bag",
    addedLabel = "In your bag",
    bestLabel = "Best",
    higherIsBetterLabel = "Higher is better",
    lowerIsBetterLabel = "Lower is better",
    className = "",
}: ProductSpecCompareProps) => {
    const groupName = `product-color-${useId().replace(/:/g, "")}`;
    const [colors, setColors] = useState<Record<string, number>>({});
    const [added, setAdded] = useState<string[]>([]);

    const colorwayOf = (product: SpecProduct) => product.colorways[colors[product.id] ?? 0] ?? product.colorways[0];

    const addToBag = (product: SpecProduct) => {
        if (added.includes(product.id)) return;
        setAdded((current) => (current.includes(product.id) ? current : [...current, product.id]));
        const colorway = colorwayOf(product);
        if (colorway) onAddToBag?.(product, colorway);
    };

    return (
        <section className={`w-full bg-stone-50 px-4 py-16 sm:px-8 dark:bg-stone-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-white">{title}</h2>
                    {description && (
                        <p className="mx-auto mt-3 max-w-lg text-stone-600 dark:text-stone-400">
                            {description}
                        </p>
                    )}
                </div>

                <div className="mt-10 overflow-x-auto pb-2">
                    <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left">
                        <caption className="sr-only">{caption}</caption>
                        <thead>
                            <tr>
                                <td className="sticky left-0 z-10 w-[22%] bg-stone-50 dark:bg-stone-950"/>
                                {products.map((product) => {
                                    const colorway = colorwayOf(product);
                                    const inBag = added.includes(product.id);
                                    return (
                                        <th key={product.id} scope="col" className="px-3 pb-6 align-top font-normal">
                                            <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
                                                {renderImage && colorway && (
                                                    <div className="flex h-28 w-full items-center justify-center rounded-xl bg-gradient-to-b from-stone-100 to-white text-stone-900 dark:from-stone-800 dark:to-stone-900 dark:text-white">
                                                        <AnimatePresence mode="wait" initial={false}>
                                                            <motion.span key={colorway.hex} initial={{opacity: 0, scale: 0.92}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.92}} transition={{duration: 0.2}}>
                                                                {renderImage(product, colorway)}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                )}
                                                <span className="mt-4 text-base font-semibold text-stone-900 dark:text-white">{product.name}</span>
                                                <span className="mt-1 flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                                                    <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                                                    {product.rating} ({product.reviews.toLocaleString("en-US")})
                                                </span>
                                                <span className="mt-3 text-2xl font-semibold text-stone-900 dark:text-white">{formatPrice(product.price)}</span>

                                                <fieldset className="mt-3">
                                                    <legend className="sr-only">{product.name} color</legend>
                                                    <div className="flex justify-center gap-2">
                                                        {product.colorways.map((c, i) => (
                                                            <label key={c.name} title={c.name} className="relative cursor-pointer">
                                                                <input type="radio" name={`${groupName}-${product.id}`} checked={(colors[product.id] ?? 0) === i}
                                                                       onChange={() => setColors((current) => ({...current, [product.id]: i}))}
                                                                       className="peer sr-only"/>
                                                                <span className="block h-6 w-6 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-white transition peer-checked:ring-stone-900 peer-focus-visible:ring-sky-500 dark:ring-offset-stone-900 dark:peer-checked:ring-white"
                                                                      style={{backgroundColor: c.hex}}/>
                                                                <span className="sr-only">{c.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                                <span className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">{colorway?.name}</span>

                                                <button type="button" onClick={() => addToBag(product)} disabled={inBag}
                                                        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900 ${inBag
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-stone-900 text-white hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"}`}>
                                                    {inBag ? <LuCheck className="h-4 w-4"/> : <LuShoppingBag className="h-4 w-4"/>}
                                                    {inBag ? addedLabel : addLabel}
                                                </button>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {specs.map((spec) => {
                                const winner = spec.kind === "number" ? winnerOf(spec, products) : null;
                                const max = spec.kind === "number" ? Math.max(...products.map((p) => numberOf(spec, p.id))) : 0;
                                return (
                                    <tr key={spec.label}>
                                        <th scope="row" className="sticky left-0 z-10 border-t border-stone-200 bg-stone-50 py-4 pr-3 text-sm font-medium text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-white">
                                            {spec.label}
                                            {spec.kind === "number" && (
                                                <span className="block text-xs font-normal text-stone-500 dark:text-stone-400">{spec.better === "higher" ? higherIsBetterLabel : lowerIsBetterLabel}</span>
                                            )}
                                        </th>
                                        {products.map((product) => (
                                            <td key={product.id} className="border-t border-stone-200 px-6 py-4 align-top text-sm text-stone-700 dark:border-stone-800 dark:text-stone-300">
                                                {spec.kind === "number" ? (
                                                    <div>
                                                        <span className="flex items-center gap-2">
                                                            <span className="font-semibold tabular-nums text-stone-900 dark:text-white">{numberOf(spec, product.id)} {spec.unit}</span>
                                                            {winner === product.id && (
                                                                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">{bestLabel}</span>
                                                            )}
                                                        </span>
                                                        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800" aria-hidden="true">
                                                            <motion.span className={`block h-full origin-left rounded-full ${winner === product.id ? "bg-emerald-500" : "bg-stone-400 dark:bg-stone-600"}`}
                                                                         initial={{scaleX: 0}} whileInView={{scaleX: max ? numberOf(spec, product.id) / max : 0}}
                                                                         viewport={{once: true}} transition={{duration: 0.6, ease: "easeOut"}}/>
                                                        </span>
                                                    </div>
                                                ) : (
                                                    spec.values[product.id]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

