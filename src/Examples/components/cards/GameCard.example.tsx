import {GameCard, type GamePlayer} from "./GameCard";

const players: GamePlayer[] = [
    {name: "Liam Carter", avatarSrc: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg"},
    {name: "Noah Brooks", avatarSrc: "https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg"},
    {name: "Ethan Reed", avatarSrc: "https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg"},
    {name: "Owen Price", avatarSrc: "https://img.freepik.com/free-photo/handsome-guy-sweater_144627-13026.jpg?t=st=1722611516~exp=1722615116~hmac=b5845292ef81dc6d2006325e8e0114a4e3149947454a0e68b2d6b72537771705&w=360"},
    {name: "Lucas Gray", avatarSrc: "https://img.freepik.com/free-photo/portrait-hacker_23-2148165910.jpg"},
];

const GameCardExample = () => (
    <GameCard
        title="Silent Ninja Stalker"
        imageSrc="https://img.freepik.com/free-vector/linear-flat-ninja-logo-template_23-2149002586.jpg?t=st=1722611270~exp=1722614870~hmac=4b39b45933e0b6565a25aedef8699d55fa1efa00e29ea31ac6b0a16464783f4e&w=740"
        imageAlt="Ninja logo on a dark background"
        players={players}
        moreLabel="18+"
    />
);

export default GameCardExample;
