import React, {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader.jsx';
import OverviewFooter from '@shared/OverviewFooter.jsx';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {dragAndDropContents} from '@utils/ContentsConfig/SurfacesContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

// icons
import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import DragWithIndicator from "@components/Surfaces/DragAndDrop/DragWithIndicator.jsx";
import UploadMultipleFilesWithDragDrop from "@components/Surfaces/DragAndDrop/UploadMultipleFilesWithDragDrop.jsx";
import ImageUploadWithDragDrop from "@components/Surfaces/DragAndDrop/ImageUploadWithDragDrop.jsx";
import ListDragDrop from "@components/Surfaces/DragAndDrop/ListDragDrop.jsx";
import TodoAppDragDrop from "@components/Surfaces/DragAndDrop/TodoAppDragDrop.jsx";
import {
    DragWithIndicatorCode,
    ListDragDropCode,
    TodoAppDragDropCode,
    UploadImageWithDragDropCode,
    UploadMultipleFilesWithDragDropCode
} from "@components/Surfaces/DragAndDrop/PreviewCodes.js";

const Index = () => {
    const sectionIds = dragAndDropContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // actions
    const [dragDrop1Preview, setDragDrop1Preview] = useState(true);
    const [dragDrop1Code, setDragDrop1Code] = useState(false);

    const [dragDrop2Preview, setDragDrop2Preview] = useState(true);
    const [dragDrop2Code, setDragDrop2Code] = useState(false);

    const [dragDrop3Preview, setDragDrop3Preview] = useState(true);
    const [dragDrop3Code, setDragDrop3Code] = useState(false);

    const [dragDrop4Preview, setDragDrop4Preview] = useState(true);
    const [dragDrop4Code, setDragDrop4Code] = useState(false);

    const [dragDrop5Preview, setDragDrop5Preview] = useState(true);
    const [dragDrop5Code, setDragDrop5Code] = useState(false);

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader
                        id='drag-&-drop-with-indicator'
                        text={'drag & drop with indicator'}
                    />

                    <ComponentDescription text='Drag & drop with indicator shows where an item will be placed,
            enhancing user clarity and interaction.'/>

                    <ToggleTab setCode={setDragDrop1Code} code={dragDrop1Code} preview={dragDrop1Preview}
                               setPreview={setDragDrop1Preview}/>

                    <ComponentWrapper>
                        {dragDrop1Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <DragWithIndicator/>
                            </div>
                        )}

                        {dragDrop1Code && (
                            <Showcode
                                code={DragWithIndicatorCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='upload-multiple-files-with-drag-&-drop'
                            text={'upload multiple files with drag & drop'}
                            isPremium={true}
                        />
                    </div>

                    <ComponentDescription text='Drag & drop for multiple file uploads lets users easily upload
            several files at once.'/>

                    <ToggleTab
                        setCode={setDragDrop2Code} code={dragDrop2Code}
                        setPreview={setDragDrop2Preview} preview={dragDrop2Preview}/>

                    <ComponentWrapper>
                        {dragDrop2Preview && (
                            <UploadMultipleFilesWithDragDrop/>
                        )}

                        {dragDrop2Code && (
                            <Showcode
                                code={UploadMultipleFilesWithDragDropCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='upload-image-with-drag-&-drop'
                            text={'upload image with drag & drop'}
                        />
                    </div>

                    <ComponentDescription text='Drag & drop image upload lets users quickly upload images by
            dragging them into a designated area.'/>

                    <ToggleTab setCode={setDragDrop3Code} code={dragDrop3Code} setPreview={setDragDrop3Preview}
                               preview={dragDrop3Preview}/>

                    <ComponentWrapper>
                        {dragDrop3Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <ImageUploadWithDragDrop/>
                            </div>
                        )}

                        {dragDrop3Code && (
                            <Showcode
                                code={UploadImageWithDragDropCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='list-drag-&-drop' text={'list drag & drop'}/>
                    </div>

                    <ComponentDescription text='List drag & drop allows users to rearrange items by dragging and
            dropping them into a new order.'/>

                    <ToggleTab setCode={setDragDrop4Code} code={dragDrop4Code} preview={dragDrop4Preview}
                               setPreview={setDragDrop4Preview}/>

                    <ComponentWrapper>
                        {dragDrop4Preview && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 justify-center'>
                                <ListDragDrop/>
                            </div>
                        )}

                        {dragDrop4Code && (
                            <Showcode
                                code={ListDragDropCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            id='todo-app-with-drag-&-drop'
                            text={'todo app with drag & drop'}
                        />
                    </div>

                    <ComponentDescription text='A to-do app with drag & drop lets users easily organize tasks by
            dragging them into new positions.'/>

                    <ToggleTab setCode={setDragDrop5Code} setPreview={setDragDrop5Preview} code={dragDrop5Code}
                               preview={dragDrop5Preview}/>

                    <ComponentWrapper>
                        {dragDrop5Preview && (
                            <TodoAppDragDrop/>
                        )}

                        {dragDrop5Code && (
                            <Showcode
                                code={TodoAppDragDropCode}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/animated-button'
                        backName='animated button'
                        forwardName='Comparison Card'
                        forwardUrl='/components/comparison-card'
                    />
                </div>

                <ContentNavbar contents={dragAndDropContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Surfaces - Drag & Drop</title>
            </Helmet>
        </>
    );
};

export default Index;
