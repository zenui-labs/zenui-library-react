import {DragSwapGrid, type DragSwapItem} from "./DragSwapGrid";

const logos: DragSwapItem[] = [
    {id: 1, image: "https://i.ibb.co.com/XxvZ2Kq/Logo.png", alt: "Partner logo 1"},
    {id: 2, image: "https://i.ibb.co.com/HgvwbMy/Logo-1.png", alt: "Partner logo 2"},
    {id: 3, image: "https://i.ibb.co.com/XS8kxJF/Logo-2.png", alt: "Partner logo 3"},
    {id: 4, image: "https://i.ibb.co.com/2gLx39W/Logo-3.png", alt: "Partner logo 4"},
    {id: 5, image: "https://i.ibb.co.com/DkDCXrk/Logo-4.png", alt: "Partner logo 5"},
    {id: 6, image: "https://i.ibb.co.com/W0qf3ZP/Amazon.png", alt: "Amazon logo"},
    {id: 7, image: "https://i.ibb.co.com/fp0pFV5/Logo-5.png", alt: "Partner logo 7"},
    {id: 8, image: "https://i.ibb.co.com/S3Z98YZ/Logo-6.png", alt: "Partner logo 8"},
    {id: 9, image: "https://i.ibb.co.com/0FwfDsz/Union.png", alt: "Partner logo 9"},
];

const DragSwapGridExample = () => <DragSwapGrid items={logos}/>;

export default DragSwapGridExample;
