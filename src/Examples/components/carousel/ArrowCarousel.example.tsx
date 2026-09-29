import {ArrowCarousel, type CarouselSlide} from "./ArrowCarousel";

const slides: CarouselSlide[] = [
    {src: "https://picsum.photos/id/11/600/400", alt: "Landscape photo 1 of 3"},
    {src: "https://picsum.photos/id/13/600/400", alt: "Landscape photo 2 of 3"},
    {src: "https://picsum.photos/id/29/600/400", alt: "Landscape photo 3 of 3"},
];

const ArrowCarouselExample = () => (
    <div className="h-[200px] w-full lg:h-[400px]">
        <ArrowCarousel slides={slides}/>
    </div>
);

export default ArrowCarouselExample;
