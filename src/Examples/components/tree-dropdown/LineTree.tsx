import {useState} from "react";
import {HiOutlineMinusSm} from "react-icons/hi";
import {GoPlus} from "react-icons/go";

export interface LineTreeNode {
    label: string;
    /** Unique key for the node. Defaults to `label`, so set it when two nodes share a label. */
    id?: string;
    children?: LineTreeNode[];
}

export interface LineTreeProps {
    nodes: LineTreeNode[];
    /** Keys of the nodes that start expanded. Defaults to every node. */
    defaultExpanded?: string[];
    className?: string;
}

const keyOf = (node: LineTreeNode) => node.id ?? node.label;

// Collects the key of every node, depth first.
const collectKeys = (nodes: LineTreeNode[]): string[] =>
    nodes.flatMap((node) => [keyOf(node), ...(node.children ? collectKeys(node.children) : [])]);

const TRANSITION = "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out, visibility 0.3s";

/** A collapsible tree with plus and minus toggles and a guide line that links an open node to its next sibling. */
export const LineTree = ({nodes, defaultExpanded, className = ""}: LineTreeProps) => {
    const [expanded, setExpanded] = useState<string[]>(() => defaultExpanded ?? collectKeys(nodes));

    const toggleNode = (key: string) => {
        setExpanded((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
    };

    const renderTree = (items: LineTreeNode[]) => (
        <ul className="space-y-2">
            {items.map((node, index) => {
                const key = keyOf(node);
                const open = expanded.includes(key);

                return (
                    <li key={key} className="ml-2 relative">
                        {/* Node label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[10px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:text-[#abc2d3] dark:hover:bg-slate-800 transition-all duration-200">
                            {node.children && (
                                <button
                                    type="button"
                                    aria-label={node.label}
                                    aria-expanded={open}
                                    onClick={() => toggleNode(key)}
                                    className="text-gray-500 dark:text-[#abc2d3] z-10"
                                >
                                    {open ? (
                                        <HiOutlineMinusSm
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 text-[1.2rem] dark:bg-slate-900 dark:border-slate-700 bg-white transition-all duration-200 border border-gray-300"
                                        />
                                    ) : (
                                        <GoPlus
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 transition-all duration-200 bg-white dark:bg-slate-900 dark:border-slate-700 text-[1.2rem] border border-gray-300"
                                        />
                                    )}
                                </button>
                            )}
                            {node.label}
                        </div>

                        {/* Guide line from an open parent down to its next sibling */}
                        <div
                            aria-hidden="true"
                            style={{transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out"}}
                            className={`${
                                node.children && open && index !== items.length - 1 ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                            } transition-all duration-500 absolute dark:bg-slate-700 left-[21px] top-6 w-[1px] bg-gray-200 h-full`}
                        />

                        {/* Child nodes. Collapsed ones are hidden once the transition ends, so they leave the tab order. */}
                        {node.children && (
                            <div
                                className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                    open ? "visible max-h-[500px] opacity-100" : "invisible max-h-0 opacity-0"
                                }`}
                                style={{transition: TRANSITION}}
                            >
                                {renderTree(node.children)}
                            </div>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return <div className={className}>{renderTree(nodes)}</div>;
};
