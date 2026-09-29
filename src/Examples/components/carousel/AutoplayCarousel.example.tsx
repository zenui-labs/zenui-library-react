import {AutoplayCarousel, type CarouselSlide} from "./AutoplayCarousel";

const slides: CarouselSlide[] = [
    {src: "https://picsum.photos/id/57/600/400", alt: "Sample photo 1 of 3"},
    {src: "https://picsum.photos/id/58/600/400", alt: "Sample photo 2 of 3"},
    {src: "https://picsum.photos/id/49/600/400", alt: "Sample photo 3 of 3"},
];

const AutoplayCarouselExample = () => (
    <div className="h-[200px] w-full lg:h-[400px]">
        <AutoplayCarousel slides={slides}/>
    </div>
);

export default AutoplayCarouselExample;
