import {LuPlay} from "react-icons/lu";
import {LightBeams} from "./LightBeams";

const LightBeamsExample = () => (
    <LightBeams>
        <div className="relative max-w-xl text-center">
            <p className="text-sm font-medium tracking-wide text-amber-700 dark:text-amber-300">Lumen Studio</p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-stone-900 dark:text-stone-50 sm:text-6xl">
                Light every scene like a cinematographer
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-stone-600 dark:text-stone-400">
                140 lighting presets built with working gaffers, from golden hour to neon alley. Drop them onto any 3D scene.
            </p>
            <button
                type="button"
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-stone-900 py-2 pl-2 pr-5 text-sm font-medium text-stone-50 shadow-xl shadow-amber-900/10 transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 dark:bg-amber-100 dark:text-stone-900 dark:hover:bg-amber-50 dark:focus-visible:ring-offset-stone-950"
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-stone-900">
                    <LuPlay className="ml-0.5 h-3.5 w-3.5" aria-hidden="true"/>
                </span>
                Watch the 90-second reel
            </button>
        </div>
    </LightBeams>
);

export default LightBeamsExample;
