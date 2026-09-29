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
import {SearchPlaceholderContents} from "@utils/ContentsConfig/AnimationContents/VisualsContents.ts";
import {TextRevealCodes} from "@animations/Visuals/TextEffects/PreivewCodes.ts";
import TypewritterPlaceholder from "@animations/Visuals/SearchPlacholder/TypewritterPlaceholder.tsx";
import FlipPlaceholder from "@animations/Visuals/SearchPlacholder/FlipPlaceholder.tsx";
import BounceLettersPlaceholder from "@animations/Visuals/SearchPlacholder/SlideInOutPlaceholder.tsx";
import FadeInPlaceholder from "@animations/Visuals/SearchPlacholder/FadeInPlaceholder.tsx";
import {
    FadeInPlaceholderCodes,
    FlipPlaceholderCodes,
    TypewriterPlaceholderCodes
} from "@animations/Visuals/SearchPlacholder/PreviewCodes.ts";

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
                    text="Fades in the placeholder text of a search input on focus or when the page loads."/>

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
                    text='Animates the placeholder text with a typewriter effect, revealing one character at a time.'/>

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
                    text='Rotates through placeholder words with a flip effect, like cards turning over.'/>

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
                    text='Slides placeholder text in and out, animating both the entry and the exit.'/>

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
