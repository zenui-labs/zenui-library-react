import {useState} from 'react';

// components
import Showcode from '@shared/Component/ShowCode.tsx';
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import {Helmet} from 'react-helmet';

// contents for scrollspy
import {drawerContents} from '@utils/ContentsConfig/NavigationContents.ts';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.tsx";
import DrawerBottom from "@components/Surfaces/Drawer/DrawerBottom.tsx";
import DrawerLeft from "@components/Surfaces/Drawer/DrawerLeft.tsx";
import DrawerRight from "@components/Surfaces/Drawer/DrawerRight.tsx";
import DrawerFullScreen from "@components/Surfaces/Drawer/DrawerFullScreen.tsx";
import DrawerTop from "@components/Surfaces/Drawer/DrawerTop.tsx";
import {
    DrawerBottomCode,
    DrawerFullScreenCode,
    DrawerLeftCode,
    DrawerRightCode,
    DrawerTopCode
} from "@components/Surfaces/Drawer/PreviewCodes.ts";

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
                        text='A drawer that slides down from the top of the screen to show content or actions.'/>

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
                        text='A drawer that slides up from the bottom of the screen to show content or actions.'/>

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
                        text='A drawer that slides in from the left side of the screen to show content or actions.'/>

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
                        text='A drawer that slides in from the right side of the screen to show content or actions.'/>

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
                        text='A full-screen drawer that covers the entire viewport to show content or actions.'/>

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
