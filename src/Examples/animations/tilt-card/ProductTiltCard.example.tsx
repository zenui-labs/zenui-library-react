import {useState} from "react";
import type {PointerEvent} from "react";
import {AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuShoppingBag, LuStar} from "react-icons/lu";

interface Finish {
    name: string;
    shell: string;
    band: string;
    cushion: string;
    backdrop: string;
    swatch: string;
}

const finishes: Finish[] = [
    {name: "Graphite", shell: "#27272a", band: "#3f3f46", cushion: "#52525b", backdrop: "from-zinc-200 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900", swatch: "bg-zinc-800"},
    {name: "Sand", shell: "#d6c3a5", band: "#bca68a", cushion: "#f1e7d6", backdrop: "from-amber-100 to-orange-50 dark:from-amber-950/60 dark:to-zinc-900", swatch: "bg-[#d6c3a5]"},
    {name: "Harbor", shell: "#1e3a5f", band: "#2b4f7e", cushion: "#94a3b8", backdrop: "from-sky-200 to-sky-50 dark:from-sky-950 dark:to-zinc-900", swatch: "bg-[#1e3a5f]"},
    {name: "Sage", shell: "#7c8f7a", band: "#667a64", cushion: "#dfe7dc", backdrop: "from-emerald-100 to-lime-50 dark:from-emerald-950/70 dark:to-zinc-900", swatch: "bg-[#7c8f7a]"},
];

const spring = {stiffness: 200, damping: 22, mass: 0.6};
const colorTransition = {duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number]};

interface HeadphonesProps {
    finish: Finish;
}

const Headphones = ({finish}: HeadphonesProps) => (
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

// A product card that tilts in 3D. The product floats above the card on its own depth, and its shadow
// slides the other way, which sells the height.
const ProductTiltCard = () => {
    const reduceMotion = useReducedMotion();
    const [finish, setFinish] = useState<Finish>(finishes[0]);
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

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                pointerX.set(0.5);
                pointerY.set(0.5);
            }}
            className="w-full max-w-sm [perspective:1100px]"
        >
            <motion.div
                style={{rotateX, rotateY, transformStyle: "preserve-3d"}}
                className="relative rounded-[28px] border border-gray-200 bg-white p-3 shadow-2xl shadow-gray-900/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/50"
            >
                <div
                    style={{transformStyle: "preserve-3d"}}
                    className={`relative h-60 rounded-[20px] bg-gradient-to-b transition-colors duration-500 ${finish.backdrop}`}
                >
                    <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-gray-900 backdrop-blur dark:bg-black/40 dark:text-white">
                        New
                    </span>
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
                                <Headphones finish={finish}/>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>

                <motion.div style={{z: 30}} className="px-2 pb-2 pt-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Arc Studio headphones</h3>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
                                <LuStar className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                                4.8 from 2,113 reviews
                            </p>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white">$249</p>
                    </div>

                    <fieldset className="mt-4">
                        <legend className="text-xs text-gray-500 dark:text-slate-400">
                            Finish: <span className="font-medium text-gray-900 dark:text-white">{finish.name}</span>
                        </legend>
                        <div className="mt-2 flex gap-2.5">
                            {finishes.map((option) => (
                                <label key={option.name} className="relative cursor-pointer">
                                    <input
                                        type="radio"
                                        name="headphone-finish"
                                        value={option.name}
                                        checked={option.name === finish.name}
                                        onChange={() => setFinish(option)}
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
                        onClick={() => setInBag((count) => count + 1)}
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
                        Add to bag
                    </motion.button>
                    <p className="sr-only" role="status">{inBag > 0 ? `${inBag} in bag` : ""}</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ProductTiltCard;
