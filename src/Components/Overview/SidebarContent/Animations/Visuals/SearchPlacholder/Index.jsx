import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {SearchPlaceholderContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.js";
import {TextRevealCodes} from "@animations/Visuals/TextEffects/PreivewCodes.js";
import TypewritterPlaceholder from "@animations/Visuals/SearchPlacholder/TypewritterPlaceholder.jsx";
import FlipPlaceholder from "@animations/Visuals/SearchPlacholder/FlipPlaceholder.jsx";
import BounceLettersPlaceholder from "@animations/Visuals/SearchPlacholder/SlideInOutPlaceholder.jsx";
import FadeInPlaceholder from "@animations/Visuals/SearchPlacholder/FadeInPlaceholder.jsx";
import {
    FadeInPlaceholderCodes,
    FlipPlaceholderCodes,
    TypewriterPlaceholderCodes
} from "@animations/Visuals/SearchPlacholder/PreviewCodes.js";

const Index = () => {
    const sectionIds = SearchPlaceholderContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [fadeinPlaceholderPreview, setFadeinPlaceholderPreview] = useState(true);
    const [fadeinPlaceholderCode, setFadeinPlaceholderCode] = useState(false);

    const [textwriterPlaceholderPreview, setTextwriterPlaceholderPreview] = useState(true);
    const [textwriterPlaceholderCode, setTextwriterPlaceholderCode] = useState(false);

    const [flipPlaceholderPreview, setFlipPlaceholderPreview] = useState(true);
    const [flipPlaceholderCode, setFlipPlaceholderCode] = useState(false);

    const [slideInOutPlaceholderPreview, setSlideInOutPlaceholderPreview] = useState(true);
    const [slideInOutPlaceholderCode, setSlideInOutPlaceholderCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"fade in placeholder animation"} id={"fade-in-placeholder-animation"}/>

                <ComponentDescription
                    text="Smoothly animates the search input's placeholder text as it fades in on focus or page load.
                    "/>

                <ToggleTab setCode={setFadeinPlaceholderCode} code={fadeinPlaceholderCode}
                           setPreview={setFadeinPlaceholderPreview} preview={fadeinPlaceholderPreview}/>

                <ComponentWrapper>
                    {fadeinPlaceholderPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <FadeInPlaceholder/>
                        </div>
                    )}

                    {fadeinPlaceholderCode &&
                        <ShowCode code={FadeInPlaceholderCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"type writer placeholder animation"} id={"type-writer-placeholder-animation"}/>
                </div>

                <ComponentDescription
                    text='Simulates typing effect for placeholder text, revealing characters one by one like a typewriter.'/>

                <ToggleTab setCode={setTextwriterPlaceholderCode} code={textwriterPlaceholderCode}
                           setPreview={setTextwriterPlaceholderPreview} preview={textwriterPlaceholderPreview}/>

                <ComponentWrapper>
                    {textwriterPlaceholderPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <TypewritterPlaceholder/>
                        </div>
                    )}

                    {textwriterPlaceholderCode &&
                        <ShowCode code={TypewriterPlaceholderCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"flip placeholder animation"} id={"flip-placeholder-animation"}/>
                </div>

                <ComponentDescription
                    text='Creates a flipping text effect for the placeholder, rotating words like flipping cards.'/>

                <ToggleTab setCode={setFlipPlaceholderCode} code={flipPlaceholderCode}
                           setPreview={setFlipPlaceholderPreview} preview={flipPlaceholderPreview}/>

                <ComponentWrapper>
                    {flipPlaceholderPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <FlipPlaceholder/>
                        </div>
                    )}

                    {flipPlaceholderCode &&
                        <ShowCode code={FlipPlaceholderCodes}
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"slide in out placeholder animation"}
                                   id={"slide-in-out-placeholder-animation"}/>
                </div>

                <ComponentDescription
                    text='Animates placeholder text sliding in and out smoothly, creating a dynamic entry and exit effect.'/>

                <ToggleTab setCode={setSlideInOutPlaceholderCode} code={slideInOutPlaceholderCode}
                           setPreview={setSlideInOutPlaceholderPreview} preview={slideInOutPlaceholderPreview}/>

                <ComponentWrapper>
                    {slideInOutPlaceholderPreview && (
                        <div className="px-8 py-12 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BounceLettersPlaceholder/>
                        </div>
                    )}

                    {slideInOutPlaceholderCode &&
                        <ShowCode code={TextRevealCodes}
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/gallery-view' backName='gallery view'
                                forwardUrl='/blocks/all-blocks' forwardName='all blocks'/>
            </div>

            <ContentNavbar contents={SearchPlaceholderContents} activeSection={activeSection}/>

            <Helmet>
                <title>Visuals - Search Placeholder</title>
            </Helmet>
        </aside>
    );
};

export default Index;
