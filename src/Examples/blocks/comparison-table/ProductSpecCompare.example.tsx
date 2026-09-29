import {useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuShoppingBag, LuStar} from "react-icons/lu";

type ProductId = "one" | "pro" | "studio";

interface Colorway {
    name: string;
    hex: string;
}

interface Product {
    id: ProductId;
    name: string;
    price: number;
    rating: number;
    reviews: number;
    colorways: Colorway[];
}

interface NumericSpec {
    kind: "number";
    label: string;
    unit: string;
    better: "higher" | "lower";
    values: Record<ProductId, number>;
}

interface TextSpec {
    kind: "text";
    label: string;
    values: Record<ProductId, string>;
}

type Spec = NumericSpec | TextSpec;

const products: Product[] = [
    {id: "one", name: "Aria One", price: 149, rating: 4.5, reviews: 1204, colorways: [{name: "Graphite", hex: "#334155"}, {name: "Sand", hex: "#d6c7ae"}, {name: "Sage", hex: "#84a98c"}]},
    {id: "pro", name: "Aria Pro", price: 279, rating: 4.8, reviews: 3410, colorways: [{name: "Midnight", hex: "#1e293b"}, {name: "Silver", hex: "#cbd5e1"}, {name: "Cobalt", hex: "#3b5bdb"}]},
    {id: "studio", name: "Aria Studio", price: 399, rating: 4.7, reviews: 612, colorways: [{name: "Walnut", hex: "#7c4a2d"}, {name: "Onyx", hex: "#0f172a"}]},
];

const specs: Spec[] = [
    {kind: "number", label: "Battery life", unit: "h", better: "higher", values: {one: 30, pro: 40, studio: 24}},
    {kind: "number", label: "Weight", unit: "g", better: "lower", values: {one: 220, pro: 254, studio: 310}},
    {kind: "text", label: "Noise cancelling", values: {one: "Standard", pro: "Adaptive, 6 mics", studio: "Adaptive, 8 mics"}},
    {kind: "text", label: "Drivers", values: {one: "32 mm dynamic", pro: "40 mm dynamic", studio: "50 mm planar"}},
    {kind: "text", label: "Codecs", values: {one: "AAC, SBC", pro: "AAC, LDAC", studio: "AAC, LDAC, aptX Lossless"}},
    {kind: "number", label: "Fast charge, 10 minutes", unit: "h", better: "higher", values: {one: 5, pro: 7, studio: 3}},
    {kind: "text", label: "Water resistance", values: {one: "None", pro: "IPX4", studio: "None"}},
    {kind: "text", label: "In the box", values: {one: "Cable", pro: "Case, cable", studio: "Hard case, cable, flight adapter"}},
];

const Headphones = ({color}: {color: string}) => (
    <svg viewBox="0 0 120 100" className="h-24 w-28" aria-hidden="true">
        <path d="M20 62 C20 20, 100 20, 100 62" fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"/>
        <path d="M24 60 C26 30, 94 30, 96 60" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2"/>
        <rect x="10" y="54" width="22" height="36" rx="10" fill={color}/>
        <rect x="88" y="54" width="22" height="36" rx="10" fill={color}/>
        <rect x="14" y="60" width="6" height="24" rx="3" fill="white" fillOpacity="0.2"/>
        <rect x="92" y="60" width="6" height="24" rx="3" fill="white" fillOpacity="0.2"/>
    </svg>
);

const winnerOf = (spec: NumericSpec): ProductId =>
    products.reduce((best, p) => {
        const a = spec.values[p.id];
        const b = spec.values[best.id];
        return (spec.better === "higher" ? a > b : a < b) ? p : best;
    }).id;

const ProductSpecCompare = () => {
    const [colors, setColors] = useState<Record<ProductId, number>>({one: 0, pro: 0, studio: 0});
    const [added, setAdded] = useState<ProductId[]>([]);

    const addToBag = (id: ProductId) => setAdded((current) => (current.includes(id) ? current : [...current, id]));

    return (
        <section className="w-full bg-stone-50 px-4 py-16 sm:px-8 dark:bg-stone-950">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-white">Which Aria is right for you</h2>
                    <p className="mx-auto mt-3 max-w-lg text-stone-600 dark:text-stone-400">
                        All three fold flat, pair with two devices at once and come with a two-year warranty.
                    </p>
                </div>

                <div className="mt-10 overflow-x-auto pb-2">
                    <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left">
                        <caption className="sr-only">Aria headphones specifications</caption>
                        <thead>
                            <tr>
                                <td className="sticky left-0 z-10 w-[22%] bg-stone-50 dark:bg-stone-950"/>
                                {products.map((product) => {
                                    const colorway = product.colorways[colors[product.id]];
                                    const inBag = added.includes(product.id);
                                    return (
                                        <th key={product.id} scope="col" className="px-3 pb-6 align-top font-normal">
                                            <div className="flex flex-col items-center rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
                                                <div className="flex h-28 w-full items-center justify-center rounded-xl bg-gradient-to-b from-stone-100 to-white text-stone-900 dark:from-stone-800 dark:to-stone-900 dark:text-white">
                                                    <AnimatePresence mode="wait" initial={false}>
                                                        <motion.span key={colorway.hex} initial={{opacity: 0, scale: 0.92}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.92}} transition={{duration: 0.2}}>
                                                            <Headphones color={colorway.hex}/>
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </div>
                                                <span className="mt-4 text-base font-semibold text-stone-900 dark:text-white">{product.name}</span>
                                                <span className="mt-1 flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                                                    <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                                                    {product.rating} ({product.reviews.toLocaleString("en-US")})
                                                </span>
                                                <span className="mt-3 text-2xl font-semibold text-stone-900 dark:text-white">${product.price}</span>

                                                <fieldset className="mt-3">
                                                    <legend className="sr-only">{product.name} color</legend>
                                                    <div className="flex justify-center gap-2">
                                                        {product.colorways.map((c, i) => (
                                                            <label key={c.name} title={c.name} className="relative cursor-pointer">
                                                                <input type="radio" name={`aria-color-${product.id}`} checked={colors[product.id] === i}
                                                                       onChange={() => setColors((current) => ({...current, [product.id]: i}))}
                                                                       className="peer sr-only"/>
                                                                <span className="block h-6 w-6 rounded-full ring-2 ring-transparent ring-offset-2 ring-offset-white transition peer-checked:ring-stone-900 peer-focus-visible:ring-sky-500 dark:ring-offset-stone-900 dark:peer-checked:ring-white"
                                                                      style={{backgroundColor: c.hex}}/>
                                                                <span className="sr-only">{c.name}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </fieldset>
                                                <span className="mt-1.5 text-xs text-stone-500 dark:text-stone-400">{colorway.name}</span>

                                                <button type="button" onClick={() => addToBag(product.id)} disabled={inBag}
                                                        className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-stone-900 ${inBag
                                                            ? "bg-emerald-600 text-white"
                                                            : "bg-stone-900 text-white hover:bg-stone-700 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200"}`}>
                                                    {inBag ? <LuCheck className="h-4 w-4"/> : <LuShoppingBag className="h-4 w-4"/>}
                                                    {inBag ? "In your bag" : "Add to bag"}
                                                </button>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {specs.map((spec) => {
                                const winner = spec.kind === "number" ? winnerOf(spec) : null;
                                const max = spec.kind === "number" ? Math.max(...products.map((p) => spec.values[p.id])) : 0;
                                return (
                                    <tr key={spec.label}>
                                        <th scope="row" className="sticky left-0 z-10 border-t border-stone-200 bg-stone-50 py-4 pr-3 text-sm font-medium text-stone-900 dark:border-stone-800 dark:bg-stone-950 dark:text-white">
                                            {spec.label}
                                            {spec.kind === "number" && (
                                                <span className="block text-xs font-normal text-stone-500 dark:text-stone-400">{spec.better === "higher" ? "Higher is better" : "Lower is better"}</span>
                                            )}
                                        </th>
                                        {products.map((product) => (
                                            <td key={product.id} className="border-t border-stone-200 px-6 py-4 align-top text-sm text-stone-700 dark:border-stone-800 dark:text-stone-300">
                                                {spec.kind === "number" ? (
                                                    <div>
                                                        <span className="flex items-center gap-2">
                                                            <span className="font-semibold tabular-nums text-stone-900 dark:text-white">{spec.values[product.id]} {spec.unit}</span>
                                                            {winner === product.id && (
                                                                <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">Best</span>
                                                            )}
                                                        </span>
                                                        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-stone-200 dark:bg-stone-800" aria-hidden="true">
                                                            <motion.span className={`block h-full origin-left rounded-full ${winner === product.id ? "bg-emerald-500" : "bg-stone-400 dark:bg-stone-600"}`}
                                                                         initial={{scaleX: 0}} whileInView={{scaleX: spec.values[product.id] / max}}
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

export default ProductSpecCompare;
