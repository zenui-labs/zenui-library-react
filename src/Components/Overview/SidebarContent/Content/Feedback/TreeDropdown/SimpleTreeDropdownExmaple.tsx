import {useState} from 'react';

// react icons
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

const SimpleTreeDropdownExample = () => {

    // tree data
    const treeData = [
        {
            label: 'Corporate Office',
            children: [
                {
                    label: 'Finance Department',
                    children: [
                        {
                            label: 'Accounting Team',
                            children: [{ label: 'Payroll Management' }],
                        },
                        {
                            label: 'Audit and Compliance',
                        },
                    ],
                },
                {
                    label: 'Legal Department',
                },
            ],
        },
        {
            label: 'Regional Office - Europe',
            children: [
                {
                    label: 'Marketing Department',
                    children: [
                        {
                            label: 'Digital Marketing',
                        },
                        {
                            label: 'Market Research',
                        },
                    ],
                },
                {
                    label: 'Operations Team',
                },
            ],
        },
    ];

    // Helper function to get all labels recursively
    const getAllLabels = (nodes) => {
        let labels = [];
        nodes.forEach((node) => {
            labels.push(node.label);
            if (node.children) {
                labels = labels.concat(getAllLabels(node.children));
            }
        });
        return labels;
    };

    // State to track which nodes are open, initialized with all labels
    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));

    // Toggle node open/close state
    const toggleNode = (node) => {
        if (openNodes.includes(node.label)) {
            setOpenNodes(openNodes.filter((n) => n !== node.label));
        } else {
            setOpenNodes([...openNodes, node.label]);
        }
    };

    // Check if node is open
    const isOpen = (node) => openNodes.includes(node.label);
    // Recursive rendering of tree nodes
    const renderTree = (nodes) => {
        return (
            <ul className='space-y-2'>
                {nodes.map((node) => (
                    <li key={node.label} className='ml-2'>
                        {/* Node Label */}
                        <div className='cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[1rem] duration-200'>
                            {node.children && (
                                <span className='text-gray-500 dark:text-[#abc2d3]'>
                  {isOpen(node) ? (
                      <IoMdArrowDropdown
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 transition-all text-[1.2rem] duration-200'
                      />
                  ) : (
                      <IoMdArrowDropright
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 transition-all text-[1.2rem] duration-200'
                      />
                  )}
                </span>
                            )}
                            {node.label}
                        </div>

                        {/* children nodes */}
                        <div
                            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen(node)
                                    ? 'max-h-[500px] opacity-100'
                                    : 'max-h-0 opacity-0'
                            }`}
                            style={{
                                transition:
                                    'max-height 0.3s ease-in-out, opacity 0.2s ease-in-out',
                            }}
                        >
                            <ul>{node.children && renderTree(node.children)}</ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default SimpleTreeDropdownExample;
