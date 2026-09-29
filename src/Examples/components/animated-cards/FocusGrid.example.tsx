import {FocusGrid, type FocusGridItem} from "./FocusGrid";

const petPortrait =
    "https://img.freepik.com/free-photo/adorable-portrait-pet-surrounded-by-flowers_23-2151850055.jpg?t=st=1728230076~exp=1728233676~hmac=0d7901eef3fdf37539e5917e58b01344816e629ab705497179741fbf82f0038e&w=360";

const items: FocusGridItem[] = [
    {src: petPortrait, alt: "A pet surrounded by flowers"},
    {src: petPortrait, alt: "A pet surrounded by flowers"},
    {src: petPortrait, alt: "A pet surrounded by flowers"},
    {src: petPortrait, alt: "A pet surrounded by flowers"},
];

const FocusGridExample = () => <FocusGrid items={items}/>;

export default FocusGridExample;
