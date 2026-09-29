import {ZoomOnScroll} from "./ZoomOnScroll";

const ZoomOnScrollExample = () => (
    <ZoomOnScroll
        image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80"
        imageAlt="Morning light over a rocky mountain range above the clouds"
        headline={["Built for", "the outdoors"]}
        location="Seceda ridge, 2,519 m"
        ctaLabel="Shop the jacket"
        ctaHref="#shop"
        eyebrow="Field jacket, third edition"
        intro="Tested for 14 months on the Dolomites high routes. Keep scrolling."
        detailsTitle="Three layers, 780 grams"
        detailsBody="A recycled shell, a grid fleece that dries in under an hour and a hood that fits over a helmet. Every seam is taped by hand."
        ariaLabel="Field jacket story, scroll to continue"
    />
);

export default ZoomOnScrollExample;
