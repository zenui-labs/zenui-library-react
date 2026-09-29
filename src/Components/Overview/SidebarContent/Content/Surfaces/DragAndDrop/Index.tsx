import {useState} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader.tsx';
import OverviewFooter from '@shared/OverviewFooter.tsx';
import Showcode from '@shared/Component/ShowCode.tsx';

// contents for scrollspy
import {dragAndDropContents} from '@utils/ContentsConfig/SurfacesContents.ts';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.ts';

// icons
import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";
import DragWithIndicator from "@components/Surfaces/DragAndDrop/DragWithIndicator.tsx";
import UploadMultipleFilesWithDragDrop from "@components/Surfaces/DragAndDrop/UploadMultipleFilesWithDragDrop.tsx";
import ImageUploadWithDragDrop from "@components/Surfaces/DragAndDrop/ImageUploadWithDragDrop.tsx";
import ListDragDrop from "@components/Surfaces/DragAndDrop/ListDragDrop.tsx";
import TodoAppDragDrop from "@components/Surfaces/DragAndDrop/TodoAppDragDrop.tsx";
import {
    DragWithIndicatorCode,
    ListDragDropCode,
    TodoAppDragDropCode,
    UploadImageWithDragDropCode,
    UploadMultipleFilesWithDragDropCode
} from "@components/Surfaces/DragAndDrop/PreviewCodes.ts";

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

                    <ComponentDescription text='A drag-and-drop list with an indicator that shows where the item will land.'/>

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
                        />
                    </div>

                    <ComponentDescription text='A drag-and-drop area for uploading several files at once.'/>

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

                    <ComponentDescription text='A drag-and-drop area for uploading images by dropping them into a marked zone.'/>

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

                    <ComponentDescription text='A list whose items can be dragged and dropped to rearrange them into a new order.'/>

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

                    <ComponentDescription text='A to-do app where tasks can be reorganized by dragging them into new positions.'/>

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
