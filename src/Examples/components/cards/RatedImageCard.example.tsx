import {RatedImageCard} from "./RatedImageCard";

const RatedImageCardExample = () => (
    <RatedImageCard
        title="Minimal Pattern"
        imageSrc="https://img.freepik.com/free-photo/glassclad-skyscrapers-central-mumbai-reflecting-sunset-hues-blue-hour_469504-15.jpg?t=st=1722609658~exp=1722613258~hmac=9c702195fba04c4449f371fd0f0f6bee3b7a911e1ee29e31032dd3683b9458f3&w=740"
        imageAlt="Glass skyscrapers reflecting the sunset"
        rating={5}
        badge="New"
    />
);

export default RatedImageCardExample;
