import {BlobCursor} from "./BlobCursor";

const services = ["Product motion", "Brand systems", "Prototyping"];

// The blob grows over any element with data-blob-grow, here the headline.
const BlobCursorExample = () => (
    <BlobCursor>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Motion studio, Lisbon</p>
        <h2 data-blob-grow="" className="mt-4 max-w-xl text-5xl font-bold leading-[0.95] tracking-tighter text-gray-900 sm:text-7xl dark:text-white">
            We make interfaces feel alive
        </h2>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600 dark:text-slate-400">
            {services.map((service) => (
                <span key={service}>{service}</span>
            ))}
        </div>
    </BlobCursor>
);

export default BlobCursorExample;
