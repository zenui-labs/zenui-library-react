import {DestinationSlider, type Destination} from "./DestinationSlider";

const photo = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=75`;

const destinations: Destination[] = [
    {
        id: "tokyo",
        name: "Tokyo, Japan",
        description: "Old temples and quiet gardens a short walk from neon streets and modern towers.",
        image: photo("1540959733332-eab4deabeeaf"),
        price: "$1,299",
        duration: "7 days",
        rating: 4.9,
        highlights: ["Cherry blossoms", "Sushi tours", "Temple visits", "Modern architecture"],
    },
    {
        id: "paris",
        name: "Paris, France",
        description: "Cafes, museums and evening walks along the Seine.",
        image: photo("1502602898657-3e91760cbb34"),
        price: "$1,599",
        duration: "5 days",
        rating: 4.8,
        highlights: ["Eiffel Tower", "Louvre Museum", "Seine River", "French cuisine"],
    },
    {
        id: "bali",
        name: "Bali, Indonesia",
        description: "Tropical beaches, rice terraces and a rich cultural heritage.",
        image: photo("1537996194471-e657df975ab4"),
        price: "$899",
        duration: "6 days",
        rating: 4.7,
        highlights: ["Beach resorts", "Temple tours", "Rice terraces", "Spa treatments"],
    },
    {
        id: "new-york",
        name: "New York, USA",
        description: "Broadway shows, big museums and long walks through Central Park.",
        image: photo("1496442226666-8d4d0e62e6e9"),
        price: "$1,199",
        duration: "4 days",
        rating: 4.6,
        highlights: ["Times Square", "Central Park", "Broadway shows", "Museums"],
    },
    {
        id: "santorini",
        name: "Santorini, Greece",
        description: "White-washed villages and long sunsets over the Aegean Sea.",
        image: photo("1570077188670-e3a8d69ac5ff"),
        price: "$1,399",
        duration: "5 days",
        rating: 4.9,
        highlights: ["Sunset views", "Wine tasting", "Blue domes", "Volcanic beaches"],
    },
];

const DestinationSliderExample = () => <DestinationSlider destinations={destinations}/>;

export default DestinationSliderExample;
