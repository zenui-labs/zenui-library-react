import {ExpandableBlogCard} from "./ExpandableBlogCard";

const ExpandableBlogCardExample = () => (
    <ExpandableBlogCard
        authorName="Rachel Moore"
        date="September 14, 2016"
        imageSrc="https://img.freepik.com/premium-photo/tasty-tofu-stir-fry-with-veggies-crispy-tofu-fresh-cilantro-perfect-vegan-meal-healthy_763042-1514.jpg"
        imageAlt="Tofu stir fry with vegetables and fresh cilantro"
        excerpt="This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
    >
        <b>Method:</b>
        <p className="mt-3">
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.
        </p>
        <p className="mt-5">
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat. Add chicken,
            shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp
            to a large plate and set aside, leaving chicken and chorizo in the pan. Add pimentón, bay leaves, garlic,
            tomatoes, onion, salt and pepper, and cook, stirring often until thickened and fragrant, about 10 minutes.
            Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
        </p>
        <p className="mt-5">
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook without stirring,
            until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without stirring, until mussels have opened and
            rice is just tender, 5 to 7 minutes more. (Discard any mussels that don't open.) Set aside off of the heat
            to let rest for 10 minutes, and then serve.
        </p>
    </ExpandableBlogCard>
);

export default ExpandableBlogCardExample;
