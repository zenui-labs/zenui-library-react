import {PolaroidDevelop} from "./PolaroidDevelop";

const PolaroidDevelopExample = () => (
    <PolaroidDevelop
        src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80"
        alt="A wooden rowing boat on the green water of Lago di Braies, with the Dolomites behind"
        caption="Braies, boat no. 7 · 6:40 am"
        developSeconds={12}
    />
);

export default PolaroidDevelopExample;
