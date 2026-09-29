import {useState} from "react";
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

export interface CheckboxTreeNode {
    label: string;
    /** Unique key for the node. Defaults to `label`, so set it when two nodes share a label. */
    id?: string;
    children?: CheckboxTreeNode[];
}

export interface CheckboxTreeProps {
    nodes: CheckboxTreeNode[];
    /** Keys of the checked nodes, for a controlled tree. */
    checked?: string[];
    /** Keys checked at first, for an uncontrolled tree. */
    defaultChecked?: string[];
    /** Called with every checked key after a checkbox changes. */
    onCheckedChange?: (checked: string[]) => void;
    /** Keys of the nodes that start expanded. Defaults to every node. */
    defaultExpanded?: string[];
    /** Fill color of a checked box. */
    accentColor?: string;
    className?: string;
}

const keyOf = (node: CheckboxTreeNode) => node.id ?? node.label;

// Collects the key of every node, depth first.
const collectKeys = (nodes: CheckboxTreeNode[]): string[] =>
    nodes.flatMap((node) => [keyOf(node), ...(node.children ? collectKeys(node.children) : [])]);

/**
 * A collapsible tree with a checkbox on every node. Checking or unchecking a node applies the same state to
 * all of its descendants. Pass `checked` and `onCheckedChange` to control the selection from outside.
 */
export const CheckboxTree = ({
    nodes,
    checked,
    defaultChecked = [],
    onCheckedChange,
    defaultExpanded,
    accentColor = "#3B9DF8",
    className = "",
}: CheckboxTreeProps) => {
    const [expanded, setExpanded] = useState<string[]>(() => defaultExpanded ?? collectKeys(nodes));
    const [internalChecked, setInternalChecked] = useState<string[]>(defaultChecked);
    const checkedKeys = checked ?? internalChecked;

    const toggleNode = (key: string) => {
        setExpanded((current) => (current.includes(key) ? current.filter((item) => item !== key) : [...current, key]));
    };

    const handleCheckboxChange = (node: CheckboxTreeNode, isChecked: boolean) => {
        const affected = collectKeys([node]);
        const next = isChecked
            ? [...checkedKeys, ...affected.filter((key) => !checkedKeys.includes(key))]
            : checkedKeys.filter((key) => !affected.includes(key));
        setInternalChecked(next);
        onCheckedChange?.(next);
    };

    const renderTree = (items: CheckboxTreeNode[]) => (
        <ul className="space-y-2">
            {items.map((node) => {
                const key = keyOf(node);
                const open = expanded.includes(key);
                const isChecked = checkedKeys.includes(key);

                return (
                    <li key={key} className="ml-2">
                        {/* Node label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[0.990rem] duration-200">
                            {node.children && (
                                <button
                                    type="button"
                                    aria-label={open ? `Collapse ${node.label}` : `Expand ${node.label}`}
                                    aria-expanded={open}
                                    onClick={() => toggleNode(key)}
                                    className="text-gray-500"
                                >
                                    {open ? (
                                        <IoMdArrowDropdown
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                                        />
                                    ) : (
                                        <IoMdArrowDropright
                                            aria-hidden="true"
                                            className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                                        />
                                    )}
                                </button>
                            )}
                            <label className="flex items-center gap-[10px] cursor-pointer">
                                {/* The real checkbox stays in the tab order; the SVG box below draws it. */}
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    aria-label={node.label}
                                    checked={isChecked}
                                    onChange={(event) => handleCheckboxChange(node, event.target.checked)}
                                />
                                <div
                                    className="relative rounded peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2"
                                    style={{outlineColor: accentColor}}
                                >
                                    <span
                                        className={`${
                                            isChecked ? "opacity-100 z-20 scale-[1]" : "opacity-0 scale-[0.4] z-[-1]"
                                        } transition-all duration-200 absolute top-0 left-0`}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <rect x="-0.00012207" y="6.10352e-05" width="20" height="20" rx="4" fill={accentColor} stroke={accentColor}/>
                                            <path
                                                d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </span>

                                    <span
                                        className={`${
                                            !isChecked ? "opacity-100 z-20 scale-[1]" : "opacity-0 scale-[0.4] z-[-1]"
                                        } transition-all duration-200`}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                            <rect
                                                x="-0.00012207"
                                                y="6.10352e-05"
                                                width="19"
                                                height="19"
                                                rx="4"
                                                className="fill-transparent dark:stroke-slate-500"
                                                stroke="#cccccc"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </label>
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
