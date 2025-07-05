import React, {useState} from 'react';

// components
import Showcode from '@shared/Component/ShowCode.jsx';
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import {Helmet} from 'react-helmet';

// contents for scrollspy
import {drawerContents} from '@utils/ContentsConfig/NavigationContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";
import DrawerBottom from "@components/Surfaces/Drawer/DrawerBottom.jsx";
import DrawerLeft from "@components/Surfaces/Drawer/DrawerLeft.jsx";
import DrawerRight from "@components/Surfaces/Drawer/DrawerRight.jsx";
import DrawerFullScreen from "@components/Surfaces/Drawer/DrawerFullScreen.jsx";
import DrawerTop from "@components/Surfaces/Drawer/DrawerTop.jsx";
import {
    DrawerBottomCode,
    DrawerFullScreenCode,
    DrawerLeftCode,
    DrawerRightCode,
    DrawerTopCode
} from "@components/Surfaces/Drawer/PreviewCodes.js";

const Index = () => {
    const sectionIds = drawerContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [topDrawerPreview, setTopDrawerPreview] = useState(true);
    const [topDrawerCode, setTopDrawerCode] = useState(false);

    const [bottomDrawerPreview, setBottomDrawerPreview] = useState(true);
    const [bottomDrawerCode, setBottomDrawerCode] = useState(false);

    const [leftDrawerPreview, setLeftDrawerPreview] = useState(true);
    const [leftDrawerCode, setLeftDrawerCode] = useState(false);

    const [rightDrawerPreview, setRightDrawerPreview] = useState(true);
    const [rightDrawerCode, setRightDrawerCode] = useState(false);

    const [fullScreenDrawerPreview, setFullScreenDrawerPreview] = useState(true);
    const [fullScreenDrawerCode, setFullScreenDrawerCode] = useState(false);

    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <WarningMessageCard text="Note, when you use the drawer you will first connect it to the
              button in your project. And it's handled by the state here in
              'useState', so you'll get a good look at it. And here only the
              structure of the drawer is given with animation you can design it
              as per your requirement."/>

                    <ContentHeader id='drawer_top' text={'Drawer Top'}/>

                    <ComponentDescription
                        text='This is a top drawer modal that slides down from the top to reveal content or actions.'/>

                    <ToggleTab code={topDrawerCode} setCode={setTopDrawerCode} preview={topDrawerPreview}
                               setPreview={setTopDrawerPreview}/>

                    <ComponentWrapper>
                        {topDrawerPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <DrawerTop/>
                            </div>
                        )}

                        {topDrawerCode && (
                            <Showcode
                                code={DrawerTopCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='drawer_bottom' text={'Drawer Bottom'}/>
                    </div>

                    <ComponentDescription
                        text='This is a bottom drawer modal that slides up from the bottom to reveal content or actions.'/>

                    <ToggleTab code={bottomDrawerCode} setCode={setBottomDrawerCode} preview={bottomDrawerPreview}
                               setPreview={setBottomDrawerPreview}/>

                    <ComponentWrapper>
                        {bottomDrawerPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <DrawerBottom/>
                            </div>
                        )}

                        {bottomDrawerCode && (
                            <Showcode
                                code={DrawerBottomCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='drawer_left' text={'Drawer Left'}/>
                    </div>

                    <ComponentDescription
                        text='This is a left drawer modal that slides in from the left side to reveal content or actions.'/>

                    <ToggleTab code={leftDrawerCode} setCode={setLeftDrawerCode} preview={leftDrawerPreview}
                               setPreview={setLeftDrawerPreview}/>

                    <ComponentWrapper>
                        {leftDrawerPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <DrawerLeft/>
                            </div>
                        )}

                        {leftDrawerCode && (
                            <Showcode
                                code={DrawerLeftCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='drawer_right' text={'Drawer Right'}/>
                    </div>

                    <ComponentDescription
                        text='This is a right drawer modal that slides in from the right side to reveal content or actions.'/>

                    <ToggleTab code={rightDrawerCode} setCode={setRightDrawerCode} preview={rightDrawerPreview}
                               setPreview={setRightDrawerPreview}/>

                    <ComponentWrapper>
                        {rightDrawerPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <DrawerRight/>
                            </div>
                        )}

                        {rightDrawerCode && (
                            <Showcode
                                code={DrawerRightCode}
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader id='full_screen_drawer' text={'Full Screen Drawer'}/>
                    </div>

                    <ComponentDescription
                        text='This is a full screen drawer modal that covers the entire viewport to display content or actions.'/>

                    <ToggleTab code={fullScreenDrawerCode} setPreview={setFullScreenDrawerPreview}
                               preview={fullScreenDrawerPreview} setCode={setFullScreenDrawerCode}/>

                    <ComponentWrapper>
                        {fullScreenDrawerPreview && (
                            <div className='p-8 mb-4 flex items-center gap-5 justify-center'>
                                <DrawerFullScreen/>
                            </div>
                        )}

                        {fullScreenDrawerCode && (
                            <Showcode
                                code={DrawerFullScreenCode}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/stepper'
                        backName='stepper'
                        forwardName='tabs'
                        forwardUrl='/components/tabs'
                    />
                </div>

                <ContentNavbar contents={drawerContents} activeSection={activeSection} width='70%'/>

            </aside>

            <Helmet>
                <title>Surfaces - Drawer</title>
            </Helmet>
        </>
    );
};

export default Index;
