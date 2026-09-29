import {useState} from 'react';

// react icons
import {HiOutlineMinusSm} from "react-icons/hi";
import {GoPlus} from "react-icons/go";

const TreeWithLineExample = () => {

    // tree data
    const treeData = [
        {
            label: 'Company Headquarters',
            children: [
                {
                    label: 'HR Department',
                    children: [
                        {
                            label: 'Employee Relations',
                            children: [{ label: 'Benefits Team' }],
                        },
                        {
                            label: 'Recruitment',
                            children: [{ label: 'Talent Acquisition Team' }],
                        },
                    ],
                },
                {
                    label: 'IT Department',
                    children: [
                        {
                            label: 'Infrastructure Team',
                            children: [{ label: 'Network Support' }],
                        },
                        {
                            label: 'Software Development',
                            children: [{ label: 'Frontend Team' }, { label: 'Backend Team' }],
                        },
                    ],
                },
            ],
        },
        {
            label: 'Regional Office',
            children: [
                {
                    label: 'Sales Department',
                },
                {
                    label: 'Customer Support',
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

    // State to track which nodes are open
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
    const renderTree = (nodes, level = 0) => {
        return (
            <ul className='space-y-2'>
                {nodes.map((node, index) => (
                    <li key={node.label} className='ml-2 relative'>
                        {/* Node Label */}
                        <div
                            className={`cursor-pointer py-1 px-3 flex items-center rounded-md gap-[10px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:text-[#abc2d3] dark:hover:bg-slate-800 transition-all duration-200`}
                        >
                            {node.children && (
                                <span className='text-gray-500 dark:text-[#abc2d3] z-10'>
                  {isOpen(node) ? (
                      <HiOutlineMinusSm
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 text-[1.2rem] dark:bg-slate-900 dark:border-slate-700 bg-white transition-all duration-200 border border-gray-300'
                      />
                  ) : (
                      <GoPlus
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 transition-all duration-200 bg-white text-[1.2rem] border border-gray-300'
                      />
                  )}
                </span>
                            )}
                            {node.label}
                        </div>

                        {/* Border extension for parent node to connect to children */}

                        <div
                            style={{
                                transition:
                                    'max-height 0.3s ease-in-out, opacity 0.2s ease-in-out',
                            }}
                            className={`${
                                node.children && isOpen(node) && index !== nodes.length - 1
                                    ? 'max-h-full opacity-100'
                                    : 'max-h-0 opacity-0'
                            } transition-all duration-500 absolute dark:bg-slate-700 left-[21px] top-6 w-[1px] bg-gray-200 h-full`}
                        ></div>

                        {/* Render children nodes */}
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
                            <ul>{node.children && renderTree(node.children, level + 1)}</ul>
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

export default TreeWithLineExample;
