import {MeteorShower} from "./MeteorShower";

const MeteorShowerExample = () => (
    <MeteorShower>
        <div className="relative max-w-lg text-center">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-300">Launch week, day 3</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                Edge functions now run in 34 regions
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                Deploy once and serve every request from the region closest to your users.
            </p>
            <div className="mt-8 flex justify-center gap-3">
                <button
                    type="button"
                    className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                >
                    Read the changelog
                </button>
            </div>
        </div>
    </MeteorShower>
);

export default MeteorShowerExample;
