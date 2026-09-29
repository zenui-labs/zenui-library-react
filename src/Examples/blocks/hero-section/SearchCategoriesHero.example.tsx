import {SearchCategoriesHero, type HeroCategory} from "./SearchCategoriesHero";

const highlights: string[] = ["Fresh vegetables", "100% guarantee", "Cash on delivery", "Fast delivery"];

const categories: HeroCategory[] = [
    {name: "Honey", description: "Raw and filtered honey from local beekeepers.", iconSrc: "https://i.ibb.co/XCM2bhM/Baby-food.png"},
    {name: "Spices & seasonings", description: "Whole and ground spices, blends and dried herbs.", iconSrc: "https://i.ibb.co/J5Yd3cZ/Condiments.png"},
    {name: "Dairy products", description: "Milk, butter, yogurt and cheese kept cold to your door.", iconSrc: "https://i.ibb.co/h2R9kny/Dairy.png"},
    {name: "Flour", description: "Wheat, rice and gluten-free flours for baking and cooking.", iconSrc: "https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png"},
    {name: "Vegetables & fruits", description: "Seasonal produce picked the day before delivery.", iconSrc: "https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png"},
];

const SearchCategoriesHeroExample = () => (
    <div className="p-4 sm:p-8">
        <SearchCategoriesHero
            title="Let your groceries come to you"
            highlight="groceries"
            description="Order fresh groceries online without stepping out, and cook with the freshest ingredients."
            imageSrc="https://i.ibb.co/61R7zbv/delivery-concept-handsome-african-american-deliver-AZUZTZ3-1.png"
            highlights={highlights}
            categories={categories}
        />
    </div>
);

export default SearchCategoriesHeroExample;
