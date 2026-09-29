import {LuArrowUpRight} from "react-icons/lu";
import {FollowerRing} from "./FollowerRing";

const links = ["Case studies", "Writing", "Contact"];

const FollowerRingExample = () => (
    <FollowerRing>
        <p className="text-sm font-medium text-gray-500 dark:text-slate-400">Lina Park, product designer in Seoul</p>
        <h2 className="mt-3 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
            I design banking and health apps that people open every day.
        </h2>
        <nav aria-label="Portfolio" className="mt-8 flex flex-wrap gap-2">
            {links.map((link) => (
                <a
                    key={link}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:focus-visible:ring-offset-slate-950"
                >
                    {link}
                    <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/>
                </a>
            ))}
        </nav>
    </FollowerRing>
);

export default FollowerRingExample;
