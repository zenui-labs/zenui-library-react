import {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.tsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.ts';

import ComponentDescription from "@shared/Component/ComponentDescription.tsx";
import ToggleTab from "@shared/Component/ToggleTab.tsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.tsx";
import ContentNavbar from "@shared/Component/ContentNavbar.tsx";
import TextRevealExample from "./TextRevealExample.tsx";
import WaveTextExample from "./WaveTextExample.tsx";
import ThreeDRotationExample from "./ThreeDRotationExample.tsx";
import TypewritterExample from "./TypewritterExample.tsx";
import MagneticTextExample from "./MagneticTextExample.tsx";
import FloatingTextExample from "./FloatingTextExample.tsx";
import ElasticTextExample from "./ElasticTextExample.tsx";
import ScrambleTextExample from "./ScrambleTextExample.tsx";
import ThreeDTransformTextExample from "./ThreeDTransformTextExample.tsx";
import {TextEffectContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.ts";
import {
    ElasticTextAnimationCodes,
    MagneticTextCodes,
    ScrambleTextCodes,
    TextFloatingAnimationCodes,
    TextRevealCodes,
    TextSpoilerCodes,
    TextTypeWriterCodes,
    ThreeDRotationCodes,
    ThreeDTransformCodes,
    WaveTextAnimationCodes
} from "@animations/Visuals/TextEffects/PreivewCodes.ts";
import SpoilerTextExample from "@animations/Visuals/TextEffects/SpoilerTextExample.tsx";

const Index = () => {
    const sectionIds = TextEffectContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [spoilerTextPreview, setSpoilerTextPreview] = useState(true);
    const [spoilerTextCode, setSpoilerTextCode] = useState(false);

    const [textRevealPreview, setTextRevealPreview] = useState(true);
    const [textRevealCode, setTextRevealCode] = useState(false);

    const [threeDTransformPreview, setThreeDTransformPreview] = useState(true);
    const [threeDTransformCode, setThreeDTransformCode] = useState(false);

    const [scrambleTextPreview, setScrambleTextPreview] = useState(true);
    const [scrambleTextCode, setScrambleTextCode] = useState(false);

    const [waveTextPreview, setWaveTextPreview] = useState(true);
    const [waveTextCode, setWaveTextCode] = useState(false);

    const [threeDRotationPreview, setThreeDRotationPreview] = useState(true);
    const [threeDRotationCode, setThreeDRotationCode] = useState(false);

    const [magneticTextPreview, setMagneticTextPreview] = useState(true);
    const [magneticTextCode, setMagneticTextCode] = useState(false);

    const [typewritterPreview, setTypewritterPreview] = useState(true);
    const [typewritterCode, setTypewritterCode] = useState(false);

    const [floatingTextPreview, setFloatingTextPreview] = useState(true);
    const [floatingTextCode, setFloatingTextCode] = useState(false);

    const [elasticTextPreview, setElasticTextPreview] = useState(true);
    const [elasticTextCode, setElasticTextCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Spoiler text animation"} id={"spoiler-text-animation"}/>

                <ComponentDescription
                    text='Spoiler text that hides words until the user reveals them, with a short animation on reveal.'/>

                <ToggleTab setCode={setSpoilerTextCode} code={spoilerTextCode}
                           setPreview={setSpoilerTextPreview} preview={spoilerTextPreview}/>

                <ComponentWrapper>
                    {spoilerTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <SpoilerTextExample/>
                        </div>
                    )}

                    {spoilerTextCode &&
                        <ShowCode code={TextSpoilerCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text reveal animation"} id={"text-reveal-animation"}/>
                </div>

                <ComponentDescription
                    text='Reveals text with smooth transitions such as a slide, adding motion when content appears.'/>

                <ToggleTab setCode={setTextRevealCode} code={textRevealCode}
                           setPreview={setTextRevealPreview} preview={textRevealPreview}/>

                <ComponentWrapper>
                    {textRevealPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TextRevealExample/>
                        </div>
                    )}

                    {textRevealCode &&
                        <ShowCode code={TextRevealCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d transform animation"} id={"3d-transform-animation"}/>
                </div>

                <ComponentDescription
                    text='Reveals text using 3D transforms such as rotateX and translateZ to add depth and movement.'/>

                <ToggleTab setCode={setThreeDTransformCode} code={threeDTransformCode}
                           setPreview={setThreeDTransformPreview} preview={threeDTransformPreview}/>

                <ComponentWrapper>
                    {threeDTransformPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreeDTransformTextExample/>
                        </div>
                    )}

                    {threeDTransformCode &&
                        <ShowCode code={ThreeDTransformCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text scramble animation"} id={"text-scramble-animation"}/>
                </div>

                <ComponentDescription
                    text='Cycles rapidly through random characters before settling on the final text, creating a glitch-style reveal.'/>

                <ToggleTab setCode={setScrambleTextCode} code={scrambleTextCode}
                           setPreview={setScrambleTextPreview} preview={scrambleTextPreview}/>

                <ComponentWrapper>
                    {scrambleTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ScrambleTextExample/>
                        </div>
                    )}

                    {scrambleTextCode &&
                        <ShowCode code={ScrambleTextCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text wave animation"} id={"text-wave-animation"}/>
                </div>

                <ComponentDescription
                    text='Moves each character up and down in sequence so the text flows like a wave.'/>

                <ToggleTab setCode={setWaveTextCode} code={waveTextCode}
                           setPreview={setWaveTextPreview} preview={waveTextPreview}/>

                <ComponentWrapper>
                    {waveTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <WaveTextExample/>
                        </div>
                    )}

                    {waveTextCode &&
                        <ShowCode code={WaveTextAnimationCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"3d rotation animation"} id={"3d-rotation-animation"}/>
                </div>

                <ComponentDescription
                    text='Spins elements around the X, Y, or Z axis to create three-dimensional movement and depth.'/>

                <ToggleTab setCode={setThreeDRotationCode} code={threeDRotationCode}
                           setPreview={setThreeDRotationPreview} preview={threeDRotationPreview}/>

                <ComponentWrapper>
                    {threeDRotationPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ThreeDRotationExample/>
                        </div>
                    )}

                    {threeDRotationCode &&
                        <ShowCode code={ThreeDRotationCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"magnetic text animation"} id={"magnetic-text-animation"}/>
                </div>

                <ComponentDescription
                    text="Text that moves toward the cursor as if pulled by a magnet, reacting as the pointer gets closer."/>

                <ToggleTab setCode={setMagneticTextCode} code={magneticTextCode}
                           setPreview={setMagneticTextPreview} preview={magneticTextPreview}/>

                <ComponentWrapper>
                    {magneticTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <MagneticTextExample/>
                        </div>
                    )}

                    {magneticTextCode &&
                        <ShowCode code={MagneticTextCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"typewriter animation"} id={"typewriter-animation"}/>
                </div>

                <ComponentDescription
                    text='Types text out letter by letter, imitating a classic typewriter.'/>

                <ToggleTab setCode={setTypewritterCode} code={typewritterCode}
                           setPreview={setTypewritterPreview} preview={typewritterPreview}/>

                <ComponentWrapper>
                    {typewritterPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TypewritterExample/>
                        </div>
                    )}

                    {typewritterCode &&
                        <ShowCode code={TextTypeWriterCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text floating animation"} id={"text-floating-animation"}/>
                </div>

                <ComponentDescription
                    text='Text that drifts gently up and down or side to side, giving it a light, floating motion.'/>

                <ToggleTab setCode={setFloatingTextCode} code={floatingTextCode}
                           setPreview={setFloatingTextPreview} preview={floatingTextPreview}/>

                <ComponentWrapper>
                    {floatingTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <FloatingTextExample/>
                        </div>
                    )}

                    {floatingTextCode &&
                        <ShowCode code={TextFloatingAnimationCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"text elastic animation"} id={"text-elastic-animation"}/>
                </div>

                <ComponentDescription
                    text='Letters stretch and spring back like elastic when they appear or when users interact with them.'/>

                <ToggleTab setCode={setElasticTextCode} code={elasticTextCode}
                           setPreview={setElasticTextPreview} preview={elasticTextPreview}/>

                <ComponentWrapper>
                    {elasticTextPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ElasticTextExample/>
                        </div>
                    )}

                    {elasticTextCode &&
                        <ShowCode code={ElasticTextAnimationCodes}
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/hover-effects' backName='hover effects'
                                forwardUrl='/animations/background-animations' forwardName='background animations'/>
            </div>

            <ContentNavbar contents={TextEffectContents} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Text Effects</title>
            </Helmet>
        </aside>
    );
};

export default Index;
