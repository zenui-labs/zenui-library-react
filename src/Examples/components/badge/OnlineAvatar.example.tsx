import {OnlineAvatar, type OnlineAvatarSize} from "./OnlineAvatar";

const person = {
    name: "Daniel Brooks",
    photo: "https://img.freepik.com/free-photo/cheerful-young-man-posing-isolated-grey_171337-10579.jpg?w=996",
};

const sizes: OnlineAvatarSize[] = ["lg", "md", "sm", "xs"];

const OnlineAvatarExample = () => (
    <div className="flex items-center flex-wrap gap-5 justify-center">
        {sizes.map((size) => (
            <OnlineAvatar key={size} src={person.photo} alt={person.name} size={size}/>
        ))}
    </div>
);

export default OnlineAvatarExample;
