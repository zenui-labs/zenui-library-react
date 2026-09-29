import {useState} from 'react';

// react icons
import {FaRegFile, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";

const DirectoryTreeExample = () => {

    // tree data
    const treeData = [
        {
            label: 'Root Folder',
            children: [
                {
                    label: 'Documents',
                    children: [
                        {
                            label: 'Work',
                            children: [
                                { label: 'Resume.docx' },
                                { label: 'ProjectProposal.pdf' },
                            ],
                        },
                        {
                            label: 'Personal',
                            children: [{ label: 'VacationPlan.xlsx' }],
                        },
                    ],
                },
                {
                    label: 'Legal',
                    children: [
                        { label: 'Contract.pdf' },
                        { label: 'TermsAndConditions.docx' },
                    ],
                },
            ],
        },
        {
            label: 'Downloads',
            children: [
                {
                    label: 'Software',
                    children: [{ label: 'Installer.exe' }, { label: 'ReadMe.txt' }],
                },
                {
                    label: 'Images',
                    children: [
                        { label: 'HolidayPhoto.jpg' },
                        { label: 'ProfilePicture.png' },
                    ],
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
    const renderTree = (nodes) => {
        return (
            <ul className='space-y-2'>
                {nodes.map((node) => (
                    <li key={node.label} className='ml-2'>
                        {/* Node Label */}
                        <div className='cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:hover:text-[#abc2d3] dark:text-[#abc2d3] dark:hover:bg-slate-800 transition-all text-[1rem] duration-200'>
                            {node.children && (
                                <span className='text-gray-500 dark:text-[#abc2d3]'>
                  {isOpen(node) ? (
                      <FaRegFolderOpen
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200'
                      />
                  ) : (
                      <FaRegFolder
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200'
                      />
                  )}
                </span>
                            )}

                            {!node.children && (
                                <FaRegFile className='group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] dark:text-[#abc2d3] text-gray-500 transition-all text-[1rem] duration-200' />
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
    }

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default DirectoryTreeExample;
