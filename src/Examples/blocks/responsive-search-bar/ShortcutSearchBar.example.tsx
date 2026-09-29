import {useState} from "react";
import {ShortcutSearchBar, type SearchPerson, type SearchPlace} from "./ShortcutSearchBar";

const people: SearchPerson[] = [
    {
        name: "Emily Johnson",
        email: "emily.johnson@example.com",
        avatar: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=996",
        emailCount: 12,
    },
    {
        name: "Michael Brown",
        email: "michael.brown@example.com",
        avatar: "https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=740",
        emailCount: 6,
        fileCount: 3,
    },
    {
        name: "Sophia Williams",
        email: "sophia.williams@example.com",
        avatar: "https://img.freepik.com/free-photo/front-view-smiley-business-man_23-2148479583.jpg?w=826",
        emailCount: 24,
        fileCount: 10,
    },
    {
        name: "James Smith",
        email: "james.smith@example.com",
        avatar: "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg?w=826",
        emailCount: 5,
    },
    {
        name: "Olivia Davis",
        email: "olivia.davis@example.com",
        avatar: "https://img.freepik.com/free-photo/indoor-studio-shot-attractive-beautiful-pretty-young-woman-wearing-eyeglasses-yellow-sweatshirt-having-long-fair-hair-posing-isolated-pink-wall-people-emotions-concept_176532-6755.jpg?w=996",
        emailCount: 1,
        fileCount: 12,
    },
];

const places: SearchPlace[] = [
    {street: "Maple Avenue", location: "San Francisco, CA"},
    {street: "Elm Street", location: "Chicago, IL"},
    {street: "Oakwood Drive", location: "Austin, TX"},
    {street: "Pine Street", location: "Seattle, WA"},
    {street: "Cedar Lane", location: "Denver, CO"},
    {street: "Birch Road", location: "Miami, FL"},
];

const ShortcutSearchBarExample = () => {
    const [recentSearches, setRecentSearches] = useState(["Programming", "ZenUI Library", "Templates", "Blocks"]);

    return (
        <div className="flex justify-center p-8">
            <ShortcutSearchBar
                recentSearches={recentSearches}
                people={people}
                places={places}
                onRemoveRecent={(search) => setRecentSearches((current) => current.filter((item) => item !== search))}
                defaultOpen
            />
        </div>
    );
};

export default ShortcutSearchBarExample;
