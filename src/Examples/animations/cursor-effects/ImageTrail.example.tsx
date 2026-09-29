import {ImageTrail} from "./ImageTrail";

const photos: string[] = [
    "photo-1506905925346-21bda4d32df4",
    "photo-1470071459604-3b5ec3a7fe05",
    "photo-1501785888041-af3ef285b470",
    "photo-1441974231531-c6227db76b6e",
    "photo-1469474968028-56623f02e42e",
    "photo-1507525428034-b723cf961d3e",
].map((id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&h=400&q=70`);

const ImageTrailExample = () => (
    <ImageTrail images={photos}>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-slate-500">Field notes, 2019 to 2026</p>
        <h2 className="mt-3 font-serif text-5xl italic tracking-tight text-gray-900 sm:text-7xl dark:text-white">Maya Chen</h2>
        <p className="mt-3 text-sm text-gray-600 dark:text-slate-400">Landscape photography. Move your pointer here, or tap, to look through the archive.</p>
    </ImageTrail>
);

export default ImageTrailExample;
