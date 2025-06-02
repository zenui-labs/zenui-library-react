import React, {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader';
import OverviewFooter from '@shared/OverviewFooter';
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

// contents for scrollspy
import {skeletonContents} from '@utils/ContentsConfig/FeedbackContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

const Skeleton = () => {
    const sectionIds = skeletonContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // cardSkeletonPreview
    const [cardSkeletonPreview, setCardSkeletonPreview] = useState(true);
    const [cardSkeletonCode, setCardSkeletonCode] = useState(false);

    // imageGellaryPreview
    const [imageGellaryPreview, setImageGellaryPreview] = useState(true);
    const [imageGellaryCode, setImageGellaryCode] = useState(false);

    // socialPostPreview
    const [socialPostPreview, setSocialPostPreview] = useState(true);
    const [socialPostCode, setSocialPostCode] = useState(false);

    // product details skeleton
    const [productDetailsPreview, setProductDetailsPreview] = useState(true);
    const [productDetailsCode, setProductDetailsCode] = useState(false);

    // blog skeleton
    const [blogSkeletonPreview, setBlogSkeletonPreview] = useState(true);
    const [blogSkeletonCode, setBlogSkeletonCode] = useState(false);

    // shine skeleton
    const [shineSkeletonPreview, setShineSkeletonPreview] = useState(true);
    const [shineSkeletonCode, setShineSkeletonCode] = useState(false);

    const shimmerSkeletonCodes = [
        {
            id: 'skeleton_component',
            displayText: 'Skeleton Component',
            language: 'jsx',
            code: 'import React from "react";\n' +
                '\n' +
                'const Skeleton = () => {\n' +
                '\n' +
                '    return (\n' +
                '        <div className="grid w-full px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">\n' +
                '\n' +
                '            <div\n' +
                '                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">\n' +
                '                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>\n' +
                '                <div className="space-y-3">\n' +
                '                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>\n' +
                '                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div\n' +
                '                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">\n' +
                '                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>\n' +
                '                <div className="space-y-3">\n' +
                '                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>\n' +
                '                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div\n' +
                '                className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">\n' +
                '                <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>\n' +
                '                <div className="space-y-3">\n' +
                '                    <div className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>\n' +
                '                    <div className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                    <div className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default Skeleton;'
        },
        {
            id: 'css',
            displayText: 'CSS',
            language: 'css',
            code: '@keyframes shimmer {\n' +
                '  100% {\n' +
                '        transform: translateX(100%)\n' +
                '      }\n' +
                '}'
        }
    ]

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader text={'Card Skeleton'} id={'card_skeleton'}/>

                    <ComponentDescription text='This is a card skeleton component. Display placeholder content while
                        the actual content is loading.'/>

                    <ToggleTab code={cardSkeletonCode} setPreview={setCardSkeletonPreview} setCode={setCardSkeletonCode}
                               preview={cardSkeletonPreview}/>

                    <ComponentWrapper>
                        {cardSkeletonPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='w-full 425px:w-[400px] border dark:border-slate-700 border-[#00000017] animate-pulse rounded-md'>
                                    <div className='w-full bg-border dark:bg-slate-900 rounded-t-md h-[130px] relative'>
                                        <div
                                            className='w-[120px] h-[120px] rounded-full dark:bg-slate-800 bg-[#cecece] absolute bottom-[-40%] right-1/2 transform translate-x-1/2'></div>
                                    </div>

                                    <div className='flex flex-col gap-3 items-center justify-center w-full py-8 mt-12'>
                                        <h1 className='w-[70%] h-[35px] dark:bg-slate-800 bg-border'></h1>
                                        <p className='w-[50%] h-[20px] dark:bg-slate-800 bg-border'></p>
                                    </div>

                                    <div
                                        className=' border-t p-4 dark:border-slate-700 border-gray-200 w-full flex items-center justify-between'>
                                        <div className='w-[30%] flex flex-col gap-2'>
                                            <h1 className=' h-[35px] dark:bg-slate-800 bg-border'></h1>
                                            <p className='h-[20px] dark:bg-slate-800 bg-border'></p>
                                        </div>

                                        <div className='w-[30%] flex flex-col gap-2'>
                                            <h1 className='h-[35px] dark:bg-slate-800 bg-border'></h1>
                                            <p className='h-[20px] dark:bg-slate-800 bg-border'></p>
                                        </div>

                                        <div className=' w-[30%] flex flex-col gap-2'>
                                            <h1 className='h-[35px] dark:bg-slate-800 bg-border'></h1>
                                            <p className='h-[20px] dark:bg-slate-800 bg-border'></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {cardSkeletonCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div
            className="w-full sm:w-[400px] border dark:border-slate-700 border-[#00000017] animate-pulse rounded-md">
            <div className="w-full bg-[#e5eaf2] dark:bg-slate-900 rounded-t-md h-[130px] relative">
                <div
                    className="w-[120px] h-[120px] rounded-full dark:bg-slate-800 bg-[#cecece] absolute bottom-[-40%] right-1/2 transform translate-x-1/2"></div>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center w-full py-8 mt-12">
                <h1 className="w-[70%] h-[35px] dark:bg-slate-800 bg-[#e5eaf2]"></h1>
                <p className="w-[50%] h-[20px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
            </div>

            <div
                className=" border-t p-4 dark:border-slate-700 border-gray-200 w-full flex items-center justify-between">
                <div className="w-[30%] flex flex-col gap-2">
                    <h1 className=" h-[35px] dark:bg-slate-800 bg-[#e5eaf2]"></h1>
                    <p className="h-[20px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                </div>

                <div className="w-[30%] flex flex-col gap-2">
                    <h1 className="h-[35px] dark:bg-slate-800 bg-[#e5eaf2]"></h1>
                    <p className="h-[20px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                </div>

                <div className=" w-[30%] flex flex-col gap-2">
                    <h1 className="h-[35px] dark:bg-slate-800 bg-[#e5eaf2]"></h1>
                    <p className="h-[20px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
                                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'image gallery skeleton'}
                            id={'image_gallery_skeleton'}
                        />
                    </div>

                    <ComponentDescription text='This is a grid image gallery skeleton component. Display
                        placeholders for images while loading content.'/>

                    <ToggleTab code={imageGellaryCode} setCode={setImageGellaryCode} preview={imageGellaryPreview}
                               setPreview={setImageGellaryPreview}/>

                    <ComponentWrapper>
                        {imageGellaryPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='animate-pulse'>
                                    <div className='flex gap-5'>
                                        <div className='w-[200px] h-[300px] dark:bg-slate-800 bg-border'></div>

                                        <div className='flex flex-col gap-5'>
                                            <div className='w-[200px] h-[140px] dark:bg-slate-800 bg-border'></div>

                                            <div className='w-[200px] h-[140px] dark:bg-slate-800 bg-border'></div>
                                        </div>
                                    </div>

                                    <div className='w-full h-[150px] mt-5 dark:bg-slate-800 bg-border'></div>
                                </div>
                            </div>
                        )}

                        {imageGellaryCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div className="animate-pulse">
            <div className="flex gap-5">
                <div className="w-[200px] h-[300px] dark:bg-slate-800 bg-[#e5eaf2]"></div>

                <div className="flex flex-col gap-5">
                    <div className="w-[200px] h-[140px] dark:bg-slate-800 bg-[#e5eaf2]"></div>

                    <div className="w-[200px] h-[140px] dark:bg-slate-800 bg-[#e5eaf2]"></div>
                </div>
            </div>

            <div className="w-full h-[150px] mt-5 dark:bg-slate-800 bg-[#e5eaf2]"></div>
        </div>
    );
};

export default Skeleton;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'social post skeleton'}
                            id={'social_post_skeleton'}
                        />
                    </div>

                    <ComponentDescription text='This is a social card skeleton component. Show placeholders for
                        social media content while it loads.'/>

                    <ToggleTab code={socialPostCode} setCode={setSocialPostCode} setPreview={setSocialPostPreview}
                               preview={socialPostPreview}/>

                    <ComponentWrapper>
                        {socialPostPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='w-full 425px:w-[450px] dark:bg-slate-900 dark:border-slate-700 bg-secondary p-6 border border-border rounded animate-pulse'>
                                    <div className='flex items-center'>
                                        <div className='w-[40%] 425px:w-[20%]'>
                                            <div
                                                className='w-[60px] h-[60px] rounded-full dark:bg-slate-800 bg-border'></div>
                                        </div>

                                        <div className='flex flex-col gap-3 w-[80%]'>
                                            <h1 className='w-[60%] h-[25px] dark:bg-slate-800 bg-border'></h1>
                                            <p className='w-[80%] h-[15px] dark:bg-slate-800 bg-border'></p>
                                        </div>
                                    </div>

                                    <div className='mt-10 flex flex-col gap-3'>
                                        <p className='w-[90%] h-[15px] dark:bg-slate-800 bg-border'></p>
                                        <p className='w-[80%] h-[15px] dark:bg-slate-800 bg-border'></p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {socialPostCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div
            className="w-full sm:w-[450px] dark:bg-slate-900 dark:border-slate-700 bg-secondary p-6 border border-border rounded animate-pulse">
            <div className="flex items-center">
                <div className="w-[40%] sm:w-[20%]">
                    <div className="w-[60px] h-[60px] rounded-full dark:bg-slate-800 bg-[#e5eaf2]"></div>
                </div>

                <div className="flex flex-col gap-3 w-[80%]">
                    <h1 className="w-[60%] h-[25px] dark:bg-slate-800 bg-[#e5eaf2]"></h1>
                    <p className="w-[80%] h-[15px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                </div>
            </div>

            <div className="mt-10 flex flex-col gap-3">
                <p className="w-[90%] h-[15px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                <p className="w-[80%] h-[15px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
            </div>
        </div>
    );
};

export default Skeleton;
        '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'product details skeleton'}
                            id={'product_details_skeleton'}
                        />
                    </div>

                    <ComponentDescription text=' This is the skeleton of the product details page. You can use this
                        skeleton on the product details page of any of your e-commerce
                        websites. Each section is marked with comments within the code.'/>

                    <ToggleTab code={productDetailsCode} setCode={setProductDetailsCode} preview={productDetailsPreview}
                               setPreview={setProductDetailsPreview}/>

                    <ComponentWrapper>
                        {productDetailsPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex gap-6 w-full animate-pulse'>
                                    <div>
                                        <div className='flex-1 h-[300px] dark:bg-slate-800 bg-border'></div>
                                        <div className='flex gap-3 mt-3'>
                                            <div className='w-[130px] h-[100px] dark:bg-slate-800 bg-border'></div>
                                            <div className='w-[130px] h-[100px] dark:bg-slate-800 bg-border'></div>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-4 w-full'>
                                        <h2 className='w-[100%] h-[35px] dark:bg-slate-800 bg-border'></h2>
                                        <p className='w-[100%] h-[200px] dark:bg-slate-800 bg-border'></p>
                                        <span className='w-[30%] h-[30px] dark:bg-slate-800 bg-border'></span>
                                        <div className='flex items-center justify-between w-full'>
                                            <button className='w-[30%] h-[40px] dark:bg-slate-800 bg-border'></button>
                                            <i className='w-[40px] h-[40px] rounded-full dark:bg-slate-800 bg-border'></i>
                                        </div>

                                        <button className='w-[35%] h-[40px] dark:bg-slate-800 bg-border'></button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {productDetailsCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div className="flex gap-6 w-full animate-pulse">
            <div>
                <div className="flex-1 h-[300px] dark:bg-slate-800 bg-[#e5eaf2]"></div>
                <div className="flex gap-3 mt-3">
                    <div className="w-[130px] h-[100px] dark:bg-slate-800 bg-[#e5eaf2]"></div>
                    <div className="w-[130px] h-[100px] dark:bg-slate-800 bg-[#e5eaf2]"></div>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <h2 className="w-[100%] h-[35px] dark:bg-slate-800 bg-[#e5eaf2]"></h2>
                <p className="w-[100%] h-[200px] dark:bg-slate-800 bg-[#e5eaf2]"></p>
                <span className="w-[30%] h-[30px] dark:bg-slate-800 bg-[#e5eaf2]"></span>
                <div className="flex items-center justify-between w-full">
                    <button className="w-[30%] h-[40px] dark:bg-slate-800 bg-[#e5eaf2]"></button>
                    <i className="w-[40px] h-[40px] rounded-full dark:bg-slate-800 bg-[#e5eaf2]"></i>
                </div>

                <button className="w-[35%] h-[40px] dark:bg-slate-800 bg-[#e5eaf2]"></button>
            </div>
        </div>
    );
};

export default Skeleton;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'post list skeleton'}
                            id={'post_list_skeleton'}
                        />
                    </div>

                    <ComponentDescription text='A skeleton screen for a post list, displaying placeholder elements
                        such as rectangles and lines, mimicking the structure of the content
                        while it loads.'/>

                    <ToggleTab code={socialPostPreview} setPreview={setSocialPostPreview} preview={socialPostPreview}
                               setCode={setSocialPostCode}/>

                    <ComponentWrapper>
                        {socialPostPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex flex-col gap-[20px]'>
                                    <div
                                        className='w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-border boxShadow animate-pulse'>
                                        <div className='flex items-center gap-[20px]'>
                                            <div className='w-[40%] 425px:w-[20%]'>
                                                <div
                                                    className='w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-border'></div>
                                            </div>

                                            <div className='flex flex-col gap-[10px] w-[80%]'>
                                                <h1 className='w-[80%] h-[25px] dark:bg-slate-800 bg-border rounded-md'></h1>

                                                <div className='flex flex-col gap-2'>
                                                    <p className='w-[90%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[80%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[50%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-border boxShadow animate-pulse'>
                                        <div className='flex items-center gap-[20px]'>
                                            <div className='w-[40%] 425px:w-[20%]'>
                                                <div
                                                    className='w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-border'></div>
                                            </div>

                                            <div className='flex flex-col gap-[10px] w-[80%]'>
                                                <h1 className='w-[80%] h-[25px] dark:bg-slate-800 bg-border rounded-md'></h1>

                                                <div className='flex flex-col gap-2'>
                                                    <p className='w-[90%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[80%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[50%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className='w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-border boxShadow animate-pulse'>
                                        <div className='flex items-center gap-[20px]'>
                                            <div className='w-[40%] 425px:w-[20%]'>
                                                <div
                                                    className='w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-border'></div>
                                            </div>

                                            <div className='flex flex-col gap-[10px] w-[80%]'>
                                                <h1 className='w-[80%] h-[25px] dark:bg-slate-800 bg-border rounded-md'></h1>

                                                <div className='flex flex-col gap-2'>
                                                    <p className='w-[90%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[80%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                    <p className='w-[50%] h-[7px] dark:bg-slate-800 bg-border rounded-md'></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {socialPostCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div className="w-full flex flex-col gap-[20px]">
            <div
                className="w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <div className="flex items-center gap-[20px]">
                    <div className="w-[40%] sm:w-[20%]">
                        <div className="w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-[#e5eaf2]"></div>
                    </div>

                    <div className="flex flex-col gap-[10px] w-[80%]">
                        <h1 className="w-[80%] h-[25px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></h1>

                        <div className="flex flex-col gap-2">
                            <p className="w-[90%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[80%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[50%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <div className="flex items-center gap-[20px]">
                    <div className="w-[40%] sm:w-[20%]">
                        <div className="w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-[#e5eaf2]"></div>
                    </div>

                    <div className="flex flex-col gap-[10px] w-[80%]">
                        <h1 className="w-[80%] h-[25px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></h1>

                        <div className="flex flex-col gap-2">
                            <p className="w-[90%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[80%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[50%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-3 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <div className="flex items-center gap-[20px]">
                    <div className="w-[40%] sm:w-[20%]">
                        <div className="w-[80px] h-[80px] rounded-full dark:bg-slate-800 bg-[#e5eaf2]"></div>
                    </div>

                    <div className="flex flex-col gap-[10px] w-[80%]">
                        <h1 className="w-[80%] h-[25px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></h1>

                        <div className="flex flex-col gap-2">
                            <p className="w-[90%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[80%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                            <p className="w-[50%] h-[7px] dark:bg-slate-800 bg-[#e5eaf2] rounded-md"></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
        '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'blog post skeleton'}
                            id={'blog_post_skeleton'}
                        />
                    </div>

                    <ComponentDescription text='A skeleton screen for a blog post, showing placeholders for the
                        title, text blocks, and images, simulating the layout while the
                        content is loading.'/>

                    <ToggleTab code={blogSkeletonCode} setCode={setBlogSkeletonCode}
                               setPreview={setBlogSkeletonPreview} preview={blogSkeletonPreview}/>

                    <ComponentWrapper>
                        {blogSkeletonPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='w-full flex flex-col gap-[20px]'>
                                    <div
                                        className='w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-4 rounded-md border border-border boxShadow animate-pulse'>
                                        <div className='flex gap-[20px]'>
                                            <div className='flex flex-col justify-between w-full 640px:w-[80%]'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='w-[90%] h-[7px] dark:bg-slate-700 bg-border rounded-md'></p>
                                                    <p className='w-[90%] h-[7px] dark:bg-slate-700 bg-border rounded-md'></p>
                                                    <p className='w-[80%] h-[7px] dark:bg-slate-700 bg-border rounded-md'></p>
                                                </div>

                                                <div className='flex items-center gap-[10px] w-full'>
                                                    <div
                                                        className='w-[40px] h-[40px] rounded-full dark:bg-slate-700 bg-border'></div>

                                                    <div className='flex flex-col gap-2 w-[80%]'>
                                                        <p className='w-[60%] h-[7px] dark:bg-slate-700 bg-border rounded-md'></p>
                                                        <span
                                                            className='w-[50%] h-[7px] dark:bg-slate-700 bg-border rounded-md'></span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='w-[40%] 425px:w-[35%]'>
                                                <div
                                                    className='w-[120px] h-[120px] rounded-md dark:bg-slate-700 bg-border'></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {blogSkeletonCode && (
                            <Showcode
                                code='
import React from "react";

const Skeleton = () => {

    return (
        <div className="w-full flex flex-col gap-[20px]">
            <div
                className="w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-secondary p-4 rounded-md border border-[e5eaf2] boxShadow animate-pulse">
                <div className="flex gap-[20px]">
                    <div className="flex flex-col justify-between w-full 640px:w-[80%]">
                        <div className="flex flex-col gap-2">
                            <p className="w-[90%] h-[7px] dark:bg-slate-700 bg-[e5eaf2] rounded-md"></p>
                            <p className="w-[90%] h-[7px] dark:bg-slate-700 bg-[e5eaf2] rounded-md"></p>
                            <p className="w-[80%] h-[7px] dark:bg-slate-700 bg-[e5eaf2] rounded-md"></p>
                        </div>

                        <div className="flex items-center gap-[10px] w-full">
                            <div className="w-[40px] h-[40px] rounded-full dark:bg-slate-700 bg-[e5eaf2]"></div>

                            <div className="flex flex-col gap-2 w-[80%]">
                                <p className="w-[60%] h-[7px] dark:bg-slate-700 bg-[e5eaf2] rounded-md"></p>
                                <span className="w-[50%] h-[7px] dark:bg-slate-700 bg-[e5eaf2] rounded-md"></span>
                            </div>
                        </div>
                    </div>

                    <div className="w-[40%] sm:w-[35%]">
                        <div className="w-[120px] h-[120px] rounded-md dark:bg-slate-700 bg-[e5eaf2]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
        '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'Shine Skeleton'} id={'shine_skeleton'}/>
                    </div>

                    <ComponentDescription text='This is a card skeleton component. Display placeholder content while
                        the actual content is loading.'/>

                    <ToggleTab code={shineSkeletonCode} setCode={setShineSkeletonCode} preview={shineSkeletonPreview}
                               setPreview={setShineSkeletonPreview}/>

                    <ComponentWrapper>
                        {shineSkeletonPreview && (
                            <div className="flex py-8 items-center justify-center">
                                <div
                                    className="grid w-full px-4 grid-cols-1 640px:grid-cols-2 1024px:grid-cols-3 gap-6">

                                    <div
                                        className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                                        <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                                        <div className="space-y-3">
                                            <div
                                                className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                                            <div
                                                className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                            <div
                                                className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                        </div>
                                    </div>

                                    <div
                                        className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                                        <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                                        <div className="space-y-3">
                                            <div
                                                className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                                            <div
                                                className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                            <div
                                                className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                        </div>
                                    </div>

                                    <div
                                        className="relative space-y-5 border border-slate-100 dark:border-slate-700 overflow-hidden rounded-2xl bg-white/5 p-4 shadow-xl shadow-black/5 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:border-t before:border-slate-100/10 before:bg-gradient-to-r before:from-transparent before:via-slate-100/70 dark:before:via-slate-100/10 before:to-transparent">
                                        <div className="h-24 rounded-lg dark:bg-slate-700 bg-slate-100/80"></div>
                                        <div className="space-y-3">
                                            <div
                                                className="h-3 w-3/5 rounded-lg dark:bg-slate-700 bg-slate-100/50"></div>
                                            <div
                                                className="h-3 w-4/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                            <div
                                                className="h-3 w-2/5 rounded-lg dark:bg-slate-700 bg-slate-100/60"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}


                        {shineSkeletonCode && (
                            <Showcode
                                code={shimmerSkeletonCodes}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/tabs'
                        backName='tabs'
                        forwardName='alert message'
                        forwardUrl='/components/alert-message'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={skeletonContents}/>

            </aside>
            <Helmet>
                <title>Feedback - Skeleton</title>
            </Helmet>
        </>
    );
};

export default Skeleton;
