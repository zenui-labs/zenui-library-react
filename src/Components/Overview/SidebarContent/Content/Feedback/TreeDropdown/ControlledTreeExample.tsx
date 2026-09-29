import {useState} from 'react';

// react icons
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

const ControlledTreeExample = () => {

    // tree data
    const treeData = [
        {
            label: 'University Campus',
            children: [
                {
                    label: 'Faculty of Business and Economics',
                    children: [
                        {
                            label: 'Department of Finance',
                            children: [{ label: 'Corporate Finance Course' }],
                        },
                        {
                            label: 'Department of Accounting',
                            children: [{ label: 'Financial Accounting Course' }],
                        },
                    ],
                },
                {
                    label: 'Faculty of Law',
                    children: [
                        { label: 'International Law Course' },
                        { label: 'Business Law Course' },
                    ],
                },
            ],
        },
        {
            label: 'Regional Campus - Europe',
            children: [
                {
                    label: 'Faculty of Arts and Humanities',
                    children: [
                        {
                            label: 'Department of Literature',
                            children: [{ label: 'Modern Literature Course' }],
                        },
                        {
                            label: 'Department of Philosophy',
                            children: [{ label: 'Ethics and Morality Course' }],
                        },
                    ],
                },
                {
                    label: 'Faculty of Social Sciences',
                    children: [
                        { label: 'Sociology Course' },
                        { label: 'Political Science Course' },
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

    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));
    const [checkedNodes, setCheckedNodes] = useState<Record<string, boolean>>({});

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

    // Handle checkbox change for parent/child
    const handleCheckboxChange = (node, isChecked) => {
        const updatedCheckedNodes = { ...checkedNodes };

        const updateCheckedState = (node, isChecked) => {
            updatedCheckedNodes[node.label] = isChecked;

            if (node.children) {
                node.children.forEach((child) => {
                    updateCheckedState(child, isChecked);
                });
            }
        };

        updateCheckedState(node, isChecked);
        setCheckedNodes(updatedCheckedNodes);
    };

    // Recursive rendering of tree nodes
    const renderTree = (nodes, parent = null) => {
        return (
            <ul className='space-y-2'>
                {nodes.map((node) => (
                    <li key={node.label} className='ml-2'>
                        {/* Node Label */}
                        <div className='cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[0.990rem] duration-200'>
                            {node.children && (
                                <span className='text-gray-500'>
                  {isOpen(node) ? (
                      <IoMdArrowDropdown
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200'
                      />
                  ) : (
                      <IoMdArrowDropright
                          onClick={() => toggleNode(node)}
                          className='group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200'
                      />
                  )}
                </span>
                            )}
                            <label className='flex items-center gap-[10px] cursor-pointer'>
                                <input
                                    type='checkbox'
                                    className='hidden'
                                    checked={checkedNodes[node.label] === true}
                                    onChange={(e) => handleCheckboxChange(node, e.target.checked)}
                                />
                                <div className='relative'>
                  <span
                      className={`${
                          checkedNodes[node.label]
                              ? 'opacity-100 z-20 scale-[1]'
                              : 'opacity-0 scale-[0.4] z-[-1]'
                      } transition-all duration-200 absolute top-0 left-0`}
                  >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='Group 335'>
                        <rect
                            id='Rectangle 331'
                            x='-0.00012207'
                            y='6.10352e-05'
                            width='20'
                            height='20'
                            rx='4'
                            className='fill-[#3B9DF8]'
                            stroke='#3B9DF8'
                        ></rect>
                        <path
                            id='Vector'
                            d='M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z'
                            fill='white'
                        ></path>
                      </g>
                    </svg>
                  </span>

                                    <span
                                        className={`${
                                            !checkedNodes[node.label]
                                                ? 'opacity-100 z-20 scale-[1]'
                                                : 'opacity-0 scale-[0.4] z-[-1]'
                                        } transition-all duration-200`}
                                    >
                    <svg
                        width='18'
                        height='18'
                        viewBox='0 0 20 20'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                      <g id='Group 335'>
                        <rect
                            id='Rectangle 331'
                            x='-0.00012207'
                            y='6.10352e-05'
                            width='19'
                            height='19'
                            rx='4'
                            className='fill-transparent dark:stroke-slate-500'
                            stroke='#cccccc'
                        ></rect>
                      </g>
                    </svg>
                  </span>
                                </div>
                            </label>
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
                            <ul>{node.children && renderTree(node.children, node)}</ul>
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

export default ControlledTreeExample;
