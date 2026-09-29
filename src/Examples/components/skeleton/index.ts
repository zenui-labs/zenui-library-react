import type {Example} from "../../types.ts";
import ProfileCardSkeleton from "./ProfileCardSkeleton.example.tsx";
import profileCardSkeletonSource from "./ProfileCardSkeleton.example.tsx?raw";
import profileCardSkeletonComponentSource from "./ProfileCardSkeleton.tsx?raw";
import ImageGallerySkeleton from "./ImageGallerySkeleton.example.tsx";
import imageGallerySkeletonSource from "./ImageGallerySkeleton.example.tsx?raw";
import imageGallerySkeletonComponentSource from "./ImageGallerySkeleton.tsx?raw";
import SocialPostSkeleton from "./SocialPostSkeleton.example.tsx";
import socialPostSkeletonSource from "./SocialPostSkeleton.example.tsx?raw";
import socialPostSkeletonComponentSource from "./SocialPostSkeleton.tsx?raw";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton.example.tsx";
import productDetailsSkeletonSource from "./ProductDetailsSkeleton.example.tsx?raw";
import productDetailsSkeletonComponentSource from "./ProductDetailsSkeleton.tsx?raw";
import PostListSkeleton from "./PostListSkeleton.example.tsx";
import postListSkeletonSource from "./PostListSkeleton.example.tsx?raw";
import postListSkeletonComponentSource from "./PostListSkeleton.tsx?raw";
import BlogPostSkeleton from "./BlogPostSkeleton.example.tsx";
import blogPostSkeletonSource from "./BlogPostSkeleton.example.tsx?raw";
import blogPostSkeletonComponentSource from "./BlogPostSkeleton.tsx?raw";
import ShineSkeleton from "./ShineSkeleton.example.tsx";
import shineSkeletonSource from "./ShineSkeleton.example.tsx?raw";
import shineSkeletonComponentSource from "./ShineSkeleton.tsx?raw";

const examples: Example[] = [
    {
        id: "card_skeleton",
        title: "Card skeleton",
        description: "A profile card placeholder with a cover, an avatar, a name and three stats. Show it while the card data loads.",
        component: ProfileCardSkeleton,
        source: profileCardSkeletonSource,
        files: [{name: "ProfileCardSkeleton.tsx", source: profileCardSkeletonComponentSource}],
    },
    {
        id: "image_gallery_skeleton",
        title: "Image gallery skeleton",
        description: "Gray tiles in the shape of an image grid, shown while the images load.",
        component: ImageGallerySkeleton,
        source: imageGallerySkeletonSource,
        files: [{name: "ImageGallerySkeleton.tsx", source: imageGallerySkeletonComponentSource}],
    },
    {
        id: "social_post_skeleton",
        title: "Social post skeleton",
        description: "A social post placeholder with an avatar, the author line and two lines of text.",
        component: SocialPostSkeleton,
        source: socialPostSkeletonSource,
        files: [{name: "SocialPostSkeleton.tsx", source: socialPostSkeletonComponentSource}],
    },
    {
        id: "product_details_skeleton",
        title: "Product details skeleton",
        description: "A placeholder for a product page with a gallery, title, description, price and actions. Each section is labeled with a comment in the code.",
        component: ProductDetailsSkeleton,
        source: productDetailsSkeletonSource,
        files: [{name: "ProductDetailsSkeleton.tsx", source: productDetailsSkeletonComponentSource}],
    },
    {
        id: "post_list_skeleton",
        title: "Post list skeleton",
        description: "Rows of placeholder thumbnails and text lines that match a post list while it loads. Set how many rows to show.",
        component: PostListSkeleton,
        source: postListSkeletonSource,
        files: [{name: "PostListSkeleton.tsx", source: postListSkeletonComponentSource}],
    },
    {
        id: "blog_post_skeleton",
        title: "Blog post skeleton",
        description: "A blog post card placeholder with title lines, an author row and a cover image.",
        component: BlogPostSkeleton,
        source: blogPostSkeletonSource,
        files: [{name: "BlogPostSkeleton.tsx", source: blogPostSkeletonComponentSource}],
    },
    {
        id: "shine_skeleton",
        title: "Shine skeleton",
        description: "Cards with a light band that sweeps across the placeholders while content loads. The keyframes are included in the component.",
        component: ShineSkeleton,
        source: shineSkeletonSource,
        files: [{name: "ShineSkeleton.tsx", source: shineSkeletonComponentSource}],
    },
];

export default examples;
