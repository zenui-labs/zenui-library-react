import {PhotoLightbox, type Photo} from "./PhotoLightbox";

const unsplash = (id: string, width: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;

const shots: Omit<Photo, "src" | "thumbnail">[] = [
    {id: "photo-1506905925346-21bda4d32df4", alt: "Snowy peaks rising above a sea of clouds at sunrise", title: "Above the clouds", by: "Field notes, day 3", settings: "35mm, f/8, 1/250s"},
    {id: "photo-1469474968028-56623f02e42e", alt: "A hiker standing on a rock above a misty valley", title: "First light", by: "Field notes, day 1", settings: "24mm, f/11, 1/125s"},
    {id: "photo-1501785888041-af3ef285b470", alt: "A wooden boat on a turquoise alpine lake below rocky peaks", title: "Still water", by: "Field notes, day 4", settings: "50mm, f/5.6, 1/60s"},
    {id: "photo-1470071459604-3b5ec3a7fe05", alt: "Low clouds rolling over green hills at sunset", title: "Evening clouds", by: "Field notes, day 2", settings: "85mm, f/4, 1/500s"},
    {id: "photo-1441974231531-c6227db76b6e", alt: "A dirt path through a tall pine forest", title: "Under the canopy", by: "Field notes, day 5", settings: "28mm, f/2.8, 1/200s"},
    {id: "photo-1500530855697-b586d89ba3ee", alt: "A road cutting through red rock formations", title: "The long way round", by: "Field notes, day 6", settings: "35mm, f/9, 1/320s"},
];

// The first photo fills a larger tile, so it gets a wider thumbnail.
const photos: Photo[] = shots.map((shot, index) => ({
    ...shot,
    src: unsplash(shot.id, 1400),
    thumbnail: unsplash(shot.id, index === 0 ? 900 : 500),
}));

const PhotoLightboxExample = () => <PhotoLightbox photos={photos}/>;

export default PhotoLightboxExample;
