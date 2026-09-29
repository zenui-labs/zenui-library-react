import {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.tsx";
import BlockDescription from "@shared/Block/BlockDescription.tsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.tsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.tsx";
import BlocksFooter from "@shared/Block/BlocksFooter.tsx";
import MagneticFieldExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/MagneticFieldExample.tsx";
import CircuitBoardExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/CircuitBoardExample.tsx";
import StringArtExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StringArtExample.tsx";
import GridDistortionExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/GridDistortionExample.tsx";
import StarfieldWarpExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StarfieldWarpExample.tsx";
import {
    CircuitBoardCodes,
    GridDistroyCodes,
    MagneticFieldCodes,
    StarFieldWrapCodes, StringArtCodes
} from "@animations/Visuals/BackgroundAnimations/PreviewCodes.ts";
import WarningMessageCard from "@shared/Component/WarningMessageCard.tsx";

const Index = () => {

    const [gridDistortionPreview, setGridDistortionPreview] = useState(true);
    const [gridDistortionCode, setGridDistortionCode] = useState(false);

    const [starFieldWrapPreview, setStarFieldWarpPreview] = useState(true);
    const [starFieldWarpCode, setStarFieldWarpCode] = useState(false);

    const [magneticFieldPreview, setMagneticFieldPreview] = useState(true);
    const [magneticFieldCode, setMagneticFieldCode] = useState(false);

    const [circuitBoardPreview, setCircuitBoardPreview] = useState(true);
    const [circuitBoardCode, setCircuitBoardCode] = useState(false);

    const [stringArtPreview, setStringArtPreview] = useState(true);
    const [stringArtCode, setStringArtCode] = useState(false);

    return (
        <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">

            <WarningMessageCard
                text="Reminder: Don’t forget to set a z-index on your child wrapper element. We recommend using a minimum value of 10 to ensure proper layering and avoid stacking issues."
                width={100}/>

            <div>
                <ContentHeader text={"Grid Distortion"} id={"grid-distortion"}/>

                <BlockDescription
                    text='A background animation that distorts a grid with moving waves, producing a digital mesh effect.'/>

                <BlockToggleTab preview={gridDistortionPreview} setPreview={setGridDistortionPreview}
                                code={gridDistortionCode}
                                setCode={setGridDistortionCode}/>

                <BlockWrapper>
                    {gridDistortionPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <GridDistortionExample/>
                        </div>
                    )}

                    {gridDistortionCode && <BlocksShowCode code={GridDistroyCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Starfield Warp"} id={"starfield-warp"}/>
                </div>

                <BlockDescription
                    text='A starfield background where stars streak past at high speed, as if traveling through space at light speed.'/>

                <BlockToggleTab preview={starFieldWrapPreview} setPreview={setStarFieldWarpPreview}
                                code={starFieldWarpCode}
                                setCode={setStarFieldWarpCode}/>

                <BlockWrapper>
                    {starFieldWrapPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StarfieldWarpExample/>
                        </div>
                    )}

                    {starFieldWarpCode && <BlocksShowCode code={StarFieldWrapCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Magnetic Field"} id={"magnetic-field"}/>
                </div>

                <BlockDescription
                    text='A background animation of flowing lines and pulses that mimic an electromagnetic field in motion.'/>

                <BlockToggleTab preview={magneticFieldPreview} setPreview={setMagneticFieldPreview}
                                code={magneticFieldCode}
                                setCode={setMagneticFieldCode}/>

                <BlockWrapper>
                    {magneticFieldPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <MagneticFieldExample/>
                        </div>
                    )}

                    {magneticFieldCode && <BlocksShowCode code={MagneticFieldCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Circuit Board"} id={"circuit-board"}/>
                </div>

                <BlockDescription
                    text='A circuit board background with glowing paths and pulses that simulate data moving through a circuit.'/>

                <BlockToggleTab preview={circuitBoardPreview} setPreview={setCircuitBoardPreview}
                                code={circuitBoardCode}
                                setCode={setCircuitBoardCode}/>

                <BlockWrapper>
                    {circuitBoardPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CircuitBoardExample/>
                        </div>
                    )}

                    {circuitBoardCode && <BlocksShowCode code={CircuitBoardCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"String Art"} id={"string-art"}/>
                </div>

                <BlockDescription
                    text='A string art background where moving threads form geometric patterns in a continuous loop.'/>

                <BlockToggleTab preview={stringArtPreview} setPreview={setStringArtPreview}
                                code={stringArtCode}
                                setCode={setStringArtCode}/>

                <BlockWrapper>
                    {stringArtPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StringArtExample/>
                        </div>
                    )}

                    {stringArtCode && <BlocksShowCode code={StringArtCodes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/animations/text-effects' backName='text effects'
                              forwardUrl='/animations/chat-screen' forwardName='chat screen'/>
            </div>

            <Helmet>
                <title>Visuals - Background Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
