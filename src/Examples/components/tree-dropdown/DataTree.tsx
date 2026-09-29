import {useState} from "react";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

export interface DataTreeNode {
    label: string;
    /** Unique key for the node. Defaults to `label`, so set it when two nodes share a label. */
    id?: string;
    children?: DataTreeNode[];
}

export interface DataTreeProps {
    nodes: DataTreeNode[];
    /** Keys of the nodes that start expanded. Defaults to every node. */
    defaultExpanded?: string[];
    className?: string;
}

const keyOf = (node: DataTreeNode) => node.id ?? node.label;

// Collects the key of every node, depth first.
const collectKeys = (nodes: DataTreeNode[]): string[] =>
    nodes.flatMap((node) => [keyOf(node), ...(node.children ? collectKeys(node.children) : [])]);

/** A collapsible tree of labels. Nodes with children get an arrow button that expands or collapses them. */
export const DataTree = ({nodes, defaultExpanded, className = ""}: DataTreeProps) => {
    const [expanded, setExpanded] = useState<string[]>(() => defaultExpanded ?? collectKeys(nodes));

    const toggleNode = (key: string) => {
        setExpanded((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
    };

    const renderTree = (items: DataTreeNode[]) => (
        <ul className="space-y-2">
            {items.map((node) => {
                const key = keyOf(node);
                const open = expanded.includes(key);

                return (
                    <li key={key} className="ml-2">
                        {/* Node label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[1rem] duration-200">
                            {node.children && (
                                <button
                                    type="button"
                                    aria-label={node.label}
                                    aria-expanded={open}
                                    onClick={() => toggleNode(key)}
                                    className="text-gray-500 dark:text-[#abc2d3]"
                                >
                                    {open ? (
                                        <IoMdArrowDropdown
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 transition-all text-[1.2rem] duration-200"
                                        />
                                    ) : (
                                        <IoMdArrowDropright
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 transition-all text-[1.2rem] duration-200"
                                        />
                                    )}
                                </button>
                            )}
                            {node.label}
                        </div>

                        {/* Child nodes. Collapsed ones are hidden once the transition ends, so they leave the tab order. */}
                        {node.children && (
                            <div
                                className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                    open ? "visible max-h-[500px] opacity-100" : "invisible max-h-0 opacity-0"
                                }`}
                                style={{transition: "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out, visibility 0.3s"}}
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
