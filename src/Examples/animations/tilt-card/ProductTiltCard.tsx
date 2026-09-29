import {useId, useState} from "react";
import type {PointerEvent, ReactNode} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuShoppingBag, LuStar} from "react-icons/lu";

export interface Finish {
    name: string;
    /** Color of the ear cup shells in the default product art. */
    shell: string;
    /** Color of the headband in the default product art. */
    band: string;
    /** Color of the ear cushions in the default product art. */
    cushion: string;
    /** Tailwind gradient stops for the product backdrop, such as "from-zinc-200 to-zinc-50". */
    backdrop: string;
    /** Tailwind background class for the swatch button. */
    swatch: string;
}

const spring = {stiffness: 200, damping: 22, mass: 0.6};
const colorTransition = {duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]};

export interface HeadphonesProps {
    finish: Finish;
}

// The default product art. Its colors animate when the finish changes.
export const Headphones = ({finish}: HeadphonesProps) => (
    <svg viewBox="0 0 200 180" className="h-full w-full drop-shadow-xl" aria-hidden="true">
        <motion.path
            d="M40 110 C40 45 70 18 100 18 C130 18 160 45 160 110"
            fill="none"
            strokeWidth={12}
            strokeLinecap="round"
            initial={false}
            animate={{stroke: finish.band}}
            transition={colorTransition}
        />
        <path d="M52 100 C52 55 76 32 100 32 C124 32 148 55 148 100" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeLinecap="round"/>
        {[32, 136].map((x) => (
            <g key={x}>
                <motion.rect x={x} y={92} width={32} height={62} rx={15} initial={false} animate={{fill: finish.cushion}} transition={colorTransition}/>
                <motion.rect x={x + (x < 100 ? -8 : 8)} y={96} width={32} height={54} rx={14} initial={false} animate={{fill: finish.shell}} transition={colorTransition}/>
                <rect x={x + (x < 100 ? -2 : 14)} y={104} width={6} height={30} rx={3} fill="rgba(255,255,255,0.25)"/>
            </g>
        ))}
    </svg>
);

export interface ProductTiltCardProps {
    name: string;
    /** Price as it should read, including the currency. */
    price: string;
    finishes: Finish[];
    /** Average rating shown next to the star. Leave out to hide the rating line. */
    rating?: number;
    reviewCount?: number;
    /** Small pill in the top left corner of the product image. */
    badge?: string;
    /** Name of the selected finish, for a controlled card. */
    value?: string;
    /** Name of the finish selected at first, for an uncontrolled card. Defaults to the first finish. */
    defaultValue?: string;
    onChange?: (name: string) => void;
    /** Called with the selected finish when the add button is pressed. */
    onAddToBag?: (finish: Finish) => void;
    /** Draws the product for a finish. Defaults to the headphones art. */
    renderProduct?: (finish: Finish) => ReactNode;
    finishLabel?: string;
    addLabel?: string;
    className?: string;
}

// A product card that tilts in 3D. The product floats above the card on its own depth, and its shadow
// slides the other way, which sells the height.
export const ProductTiltCard = ({
    name,
    price,
    finishes,
    rating,
    reviewCount,
    badge,
    value,
    defaultValue,
    onChange,
    onAddToBag,
    renderProduct = (finish) => <Headphones finish={finish}/>,
    finishLabel = "Finish",
    addLabel = "Add to bag",
    className = "",
}: ProductTiltCardProps) => {
    const reduceMotion = useReducedMotion();
    const groupName = useId();
    const [innerValue, setInnerValue] = useState<string | undefined>(defaultValue);
    const selectedName = value ?? innerValue;
    const finish = finishes.find((option) => option.name === selectedName) ?? finishes[0];
    const [inBag, setInBag] = useState(0);
    const pointerX = useMotionValue(0.5);
    const pointerY = useMotionValue(0.5);
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const range = reduceMotion ? 0 : 1;

    const rotateX = useTransform(y, [0, 1], [10 * range, -10 * range]);
    const rotateY = useTransform(x, [0, 1], [-12 * range, 12 * range]);
    const productX = useTransform(x, [0, 1], [-10 * range, 10 * range]);
    const productY = useTransform(y, [0, 1], [-8 * range, 8 * range]);
    const shadowX = useTransform(x, [0, 1], [18 * range, -18 * range]);
    const shadowScale = useTransform(y, [0, 1], [0.85, 1.05]);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width);
        pointerY.set((event.clientY - rect.top) / rect.height);
    };

    const select = (option: Finish) => {
        if (value === undefined) setInnerValue(option.name);
        onChange?.(option.name);
    };

    const addToBag = () => {
        setInBag((count) => count + 1);
        if (finish) onAddToBag?.(finish);
    };

    if (!finish) return null;

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointerX.set(0.5);
                pointerY.set(0.5);
            }}
            className={`w-full max-w-sm [perspective:1100px] ${className}`}
        >
            <motion.div
                style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                className="relative rounded-[28px] border border-gray-200 bg-white p-3 shadow-2xl shadow-gray-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/50"
            >
                <div
                    style={{transformStyle: "preserve-3d"}}
                    className={`relative h-60 rounded-[20px] bg-gradient-to-b transition-colors duration-500 ${finish.backdrop}`}
                >
                    {badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-gray-900 backdrop-blur dark:bg-black/40 dark:text-white">
                            {badge}
                        </span>
                    )}
                    {/* Floor shadow stays on the card surface. */}
                    <motion.div
                        aria-hidden="true"
                        style={{x: shadowX, scale: shadowScale}}
                        className="absolute bottom-7 left-1/2 -ml-20 h-5 w-40 rounded-full bg-black/25 blur-md dark:bg-black/60"
                    />
                    <motion.div
                        style={{x: productX, y: productY, z: 70}}
                        className="absolute inset-x-10 bottom-8 top-4"
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={finish.name}
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, rotate: -6, scale: 0.94}}
                                animate={{opacity: 1, rotate: 0, scale: 1}}
                                exit={{opacity: 0, scale: 1.02}}
                                transition={{type: "spring", stiffness: 260, damping: 24}}
                                className="h-full w-full"
                            >
                                {renderProduct(finish)}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div style={{z: 30}} className="px-2 pb-2 pt-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{name}</h3>
                            {rating !== undefined && (
                                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                    <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                                    {reviewCount === undefined ? rating : `${rating} from ${reviewCount.toLocaleString("en-US")} reviews`}
                                </p>
                            )}
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">{price}</p>
                    </div>

                    <fieldset className="mt-4">
                        <legend className="text-xs text-gray-500 dark:text-slate-400">
                            {finishLabel}: <span className="font-medium text-gray-900 dark:text-white">{finish.name}</span>
                        </legend>
                        <div className="mt-2 flex gap-2.5">
                            {finishes.map((option) => (
                                <label key={option.name} className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name={groupName}
                                        value={option.name}
                                        checked={option.name === finish.name}
                                        onChange={() => select(option)}
                                        className="peer sr-only"
                                    />
                                    <span className="sr-only">{option.name}</span>
                                    <span
                                        aria-hidden="true"
                                        className={`block h-7 w-7 rounded-full ring-1 ring-black/10 ring-offset-2 ring-offset-white transition-shadow peer-checked:ring-2 peer-checked:ring-gray-900 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 dark:ring-white/15 dark:ring-offset-slate-950 dark:peer-checked:ring-white ${option.swatch}`}
                                    />
                                </label>
                            ))}
                        </div>
                    </fieldset>

                    <motion.button
                        type="button"
                        onClick={addToBag}
                        whileTap={{scale: 0.97}}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                    >
                        <span className="relative">
                            <LuShoppingBag className="h-4 w-4" aria-hidden="true"/>
                            <AnimatePresence>
                                {inBag > 0 && (
                                    <motion.span
                                        key={inBag}
                                        initial={{scale: 0.4, opacity: 0}}
                                        animate={{scale: 1, opacity: 1}}
                                        transition={{type: "spring", stiffness: 500, damping: 18}}
                                        className="absolute -right-2.5 -top-2.5 flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-semibold text-white"
                                    >
                                        {inBag}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                        {addLabel}
                    </motion.button>
                    <p className="sr-only" role="status">{inBag > 0 ? `${inBag} in bag` : ""}</p>
                </motion.div>
            </motion.div>
        </div>
    );
};
