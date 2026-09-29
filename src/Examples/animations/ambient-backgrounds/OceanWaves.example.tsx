import {NewsletterForm, OceanWaves} from "./OceanWaves";

const OceanWavesExample = () => (
    <OceanWaves>
        <div className="relative w-full max-w-md text-center">
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">Tide Notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                A weekly letter about the ocean
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-400">
                One new finding from marine science every Sunday, explained in five minutes. Read by 38,000 people.
            </p>
            <NewsletterForm className="mt-7"/>
        </div>
    </OceanWaves>
);

export default OceanWavesExample;
