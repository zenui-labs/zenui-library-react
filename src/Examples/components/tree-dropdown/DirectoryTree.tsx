import {useState} from "react";
import {FaRegFile, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";

export interface DirectoryNode {
    /** File or folder name. */
    label: string;
    /** Unique key for the node. Defaults to `label`, so set it when two nodes share a name. */
    id?: string;
    /** Set for folders. Nodes without children are shown as files. */
    children?: DirectoryNode[];
}

export interface DirectoryTreeProps {
    nodes: DirectoryNode[];
    /** Keys of the folders that start open. Defaults to every folder. */
    defaultExpanded?: string[];
    className?: string;
}

const keyOf = (node: DirectoryNode) => node.id ?? node.label;

// Collects the key of every node, depth first.
const collectKeys = (nodes: DirectoryNode[]): string[] =>
    nodes.flatMap((node) => [keyOf(node), ...(node.children ? collectKeys(node.children) : [])]);

/** A folder and file tree. Folder icons open and close their folder. */
export const DirectoryTree = ({nodes, defaultExpanded, className = ""}: DirectoryTreeProps) => {
    const [expanded, setExpanded] = useState<string[]>(() => defaultExpanded ?? collectKeys(nodes));

    const toggleNode = (key: string) => {
        setExpanded((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
    };

    const renderTree = (items: DirectoryNode[]) => (
        <ul className="space-y-2">
            {items.map((node) => {
                const key = keyOf(node);
                const open = expanded.includes(key);

                return (
                    <li key={key} className="ml-2">
                        {/* Node label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:hover:text-[#abc2d3] dark:text-[#abc2d3] dark:hover:bg-slate-800 transition-all text-[1rem] duration-200">
                            {node.children ? (
                                <button
                                    type="button"
                                    aria-label={node.label}
                                    aria-expanded={open}
                                    onClick={() => toggleNode(key)}
                                    className="text-gray-500 dark:text-[#abc2d3]"
                                >
                                    {open ? (
                                        <FaRegFolderOpen
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                                        />
                                    ) : (
                                        <FaRegFolder
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                                        />
                                    )}
                                </button>
                            ) : (
                                <FaRegFile
                                    aria-hidden="true"
                                    className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] dark:text-[#abc2d3] text-gray-500 transition-all text-[1rem] duration-200"
                                />
                            )}
                            {node.label}
                        </div>

                        {/* Folder contents. Closed folders are hidden once the transition ends, so they leave the tab order. */}
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
