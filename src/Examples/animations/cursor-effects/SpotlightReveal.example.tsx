import {LuHeadphones, LuStar} from "react-icons/lu";
import {SpotlightReveal, WireframePlaceholder as Placeholder} from "./SpotlightReveal";

// Both layers share this grid, so the finished design lines up exactly with its wireframe.
const layout = "grid h-full grid-cols-1 gap-5 p-5 sm:grid-cols-[1fr_1.1fr] sm:p-8";

const Wireframe = () => (
    <div className={layout}>
        <Placeholder label="Product image" className="h-40 sm:h-full"/>
        <div className="flex flex-col gap-3">
            <Placeholder label="Eyebrow" className="h-4 w-24"/>
            <Placeholder label="Title" className="h-8 w-4/5"/>
            <Placeholder label="Rating" className="h-4 w-32"/>
            <Placeholder label="Description" className="h-16"/>
            <div className="mt-auto flex items-center gap-3">
                <Placeholder label="Price" className="h-10 w-24"/>
                <Placeholder label="Button" className="h-10 flex-1"/>
            </div>
        </div>
    </div>
);

const FinalDesign = () => (
    <div className={`${layout} bg-white dark:bg-slate-950`}>
        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-orange-300 via-rose-400 to-fuchsia-500 sm:h-full dark:from-orange-500 dark:via-rose-600 dark:to-fuchsia-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.5),transparent_50%)]"/>
            <LuHeadphones className="relative h-20 w-20 text-white drop-shadow-lg" aria-hidden="true"/>
        </div>
        <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">New, in coral</p>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Aria Pro headphones</h3>
            <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-slate-400">
                {Array.from({length: 5}, (_, index) => (
                    <LuStar key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true"/>
                ))}
                <span className="ml-1">4.9 from 2,318 reviews</span>
            </p>
            <p className="text-sm leading-6 text-gray-600 dark:text-slate-400">Adaptive noise canceling, 40 hour battery and a case that charges in 15 minutes.</p>
            <div className="mt-auto flex items-center gap-3">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">$349</span>
                <span className="flex h-10 flex-1 items-center justify-center rounded-lg bg-gray-900 text-sm font-medium text-white dark:bg-white dark:text-gray-900">Add to bag</span>
            </div>
        </div>
    </div>
);

const SpotlightRevealExample = () => <SpotlightReveal base={<Wireframe/>} reveal={<FinalDesign/>}/>;

export default SpotlightRevealExample;
