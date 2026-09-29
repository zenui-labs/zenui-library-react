import {useState} from "react";
import {FaHeart, FaRegBookmark, FaRegHeart} from "react-icons/fa";
import {AiOutlineDelete} from "react-icons/ai";
import {BiComment} from "react-icons/bi";
import {PostCard, type PostMenuItem, type PostStat} from "./PostCard";

const PostCardExample = () => {
    const [liked, setLiked] = useState(false);

    const stats: PostStat[] = [
        {icon: liked ? FaHeart : FaRegHeart, label: "Likes", count: liked ? 23 : 22, onClick: () => setLiked(!liked)},
        {icon: FaRegBookmark, label: "Saves", count: 234},
        {icon: BiComment, label: "Comments", count: 185},
    ];

    const menuItems: PostMenuItem[] = [
        {icon: FaRegBookmark, label: "Make favorite"},
        {icon: AiOutlineDelete, label: "Delete", destructive: true},
    ];

    return (
        <PostCard
            authorName="Jerome Bell"
            avatarSrc="https://img.freepik.com/free-photo/portrait-young-bearded-man-looking-camera_23-2148187159.jpg?t=st=1722619967~exp=1722623567~hmac=c60da5db6ff09019a7669117874a5a90fd04fb132355f1558d5067773698dfaa&w=740"
            avatarAlt="Portrait of Jerome Bell"
            time="2 weeks ago"
            body="Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet."
            stats={stats}
            menuItems={menuItems}
        />
    );
};

export default PostCardExample;
