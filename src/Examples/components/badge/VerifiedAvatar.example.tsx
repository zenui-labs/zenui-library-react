import {VerifiedAvatar, type VerifiedAvatarSize} from "./VerifiedAvatar";

const person = {
    name: "Marcus Hale",
    photo: "https://img.freepik.com/free-photo/portrait-young-man-with-green-hoodie_23-2148514952.jpg?w=996",
};

const sizes: VerifiedAvatarSize[] = ["lg", "md", "sm", "xs"];

const VerifiedAvatarExample = () => (
    <div className="flex items-center flex-wrap gap-5 justify-center">
        {sizes.map((size) => (
            <VerifiedAvatar key={size} src={person.photo} alt={person.name} size={size}/>
        ))}
    </div>
);

export default VerifiedAvatarExample;
