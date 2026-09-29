import {useRef} from "react";
import {motion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";
import {ContextCursor} from "./ContextCursor";

interface Project {
    name: string;
    year: string;
    /** Gradient classes for the cover. */
    className: string;
}

const projects: Project[] = [
    {name: "Moss banking", year: "2025", className: "from-emerald-300 to-teal-600 dark:from-emerald-600 dark:to-teal-900"},
    {name: "Lumen health", year: "2024", className: "from-amber-200 to-rose-500 dark:from-amber-600 dark:to-rose-900"},
];

const clients = ["Tidewater", "Oakline", "Parcel & Co", "Groundwork", "Northstar", "Fieldnote", "Harbor"];

// Each element picks its cursor with data-cursor: view, drag, link or text.
const ContextCursorExample = () => {
    const stripRef = useRef<HTMLDivElement>(null);

    return (
        <ContextCursor>
            <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                    <a
                        key={project.name}
                        href="#project"
                        data-cursor="view"
                        className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:focus-visible:ring-white dark:focus-visible:ring-offset-slate-950"
                    >
                        <div className={`h-36 overflow-hidden rounded-2xl bg-gradient-to-br sm:h-44 ${project.className}`}>
                            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.45),transparent_55%)] transition-transform duration-700 ease-out group-hover:scale-110"/>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-sm">
                            <span className="font-semibold text-gray-900 dark:text-white">{project.name}</span>
                            <span className="text-gray-500 dark:text-slate-400">{project.year}</span>
                        </div>
                    </a>
                ))}
            </div>

            <p data-cursor="text" className="mt-6 max-w-xl text-sm leading-6 text-gray-600 dark:text-slate-400">
                Brand, product and motion work for companies in finance and health. Hover the projects, drag the client list, or read this line to see the cursor change.
            </p>

            <div ref={stripRef} data-cursor="drag" className="mt-5 overflow-hidden rounded-xl border border-gray-200 py-3 dark:border-slate-800">
                <motion.ul drag="x" dragConstraints={stripRef} dragElastic={0.15} aria-label="Clients" className="flex w-max gap-6 px-4">
                    {clients.map((client) => (
                        <li key={client} className="select-none whitespace-nowrap text-lg font-semibold tracking-tight text-gray-400 dark:text-slate-500">
                            {client}
                        </li>
                    ))}
                </motion.ul>
            </div>

            <a
                href="mailto:hello@studio-orbit.com"
                data-cursor="link"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 transition hover:decoration-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 dark:text-white dark:decoration-slate-600 dark:hover:decoration-white dark:focus-visible:ring-white"
            >
                hello@studio-orbit.com
                <LuArrowUpRight className="h-3.5 w-3.5" aria-hidden="true"/>
            </a>
        </ContextCursor>
    );
};

export default ContextCursorExample;
