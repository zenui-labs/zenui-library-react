import React, {useState} from "react";

// components
import OverviewFooter from "../../../../../../Shared/OverviewFooter";
import ShowCode from "../../../../../../Shared/Component/ShowCode.jsx";
import ContentHeader from "../../../../../../Shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '../../../../../../CustomHooks/useScrollSpy';

import ComponentDescription from "../../../../../../Shared/Component/ComponentDescription.jsx";
import ToggleTab from "../../../../../../Shared/Component/ToggleTab.jsx";
import ComponentWrapper from "../../../../../../Shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "../../../../../../Shared/Component/ContentNavbar.jsx";
import TextRevealExample from "./TextRevealExample.jsx";
import WaveTextExample from "./WaveTextExample.jsx";
import ThreeDRotationExample from "./ThreeDRotationExample.jsx";
import TypewritterExample from "./TypewritterExample.jsx";
import MagneticTextExample from "./MagneticTextExample.jsx";
import FloatingTextExample from "./FloatingTextExample.jsx";
import ElasticTextExample from "./ElasticTextExample.jsx";
import ScrambleTextExample from "./ScrambleTextExample.jsx";
import ThreeDTransformTextExample from "./ThreeDTransformTextExample.jsx";
import {TextEffectContents} from "../../../../../../Utils/ContentsConfig/AnimationContents/VisualsContents.js";

const Index = () => {
    const sectionIds = TextEffectContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);


    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"text reveal animation"} id={"text-reveal-animation"}/>

                <ComponentDescription
                    text='A simple magnetic effect card that reacts subtly on hover to enhance user interaction.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TextRevealExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d transform animation"} id={"3d-transform-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreeDTransformTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text scramble animation"} id={"text-scramble-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ScrambleTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text wave animation"} id={"text-wave-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <WaveTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d rotation animation"} id={"3d-rotation-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreeDRotationExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"magnetic text animation"} id={"magnetic-text-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <MagneticTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"typewriter animation"} id={"typewriter-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TypewritterExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text floating animation"} id={"text-floating-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <FloatingTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text elastic animation"} id={"text-elastic-animation"}/>
                </div>

                <ComponentDescription
                    text='A 3D interactive magnet card that tilts and reacts to cursor movement for a dynamic visual experience.'/>

                <ToggleTab setCode={setGoogleLoginButtonCode} code={googleLoginButtonCode}
                           setPreview={setGoogleLoginButtonPreview} preview={googleLoginButtonPreview}/>

                <ComponentWrapper>
                    {googleLoginButtonPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ElasticTextExample/>
                        </div>
                    )}

                    {googleLoginButtonCode &&
                        <ShowCode code=''
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/components/normal-button' backName='normal button'
                                forwardUrl='/components/dropdown-button' forwardName='dropdown button'/>
            </div>

            <ContentNavbar contents={TextEffectContents} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Text Effects</title>
            </Helmet>
        </aside>
    );
};

export default Index;
