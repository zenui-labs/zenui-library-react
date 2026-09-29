import {feedbackData} from "@utils/FeedbackData.ts";
import FeedbackCard from "./FeedbackCard.tsx";
import {Band, SectionIntro} from "@/Components/Home/LandingKit.tsx";
import {cn} from "@utils/Style.ts";

const columns = [feedbackData.slice(0, 6), feedbackData.slice(6, 12), feedbackData.slice(12)];

const Column = ({items, duration, reverse = false, className}: {items: typeof feedbackData; duration: number; reverse?: boolean; className?: string}) => (
    <div className={cn("group relative h-[640px] overflow-hidden", className)}>
        <div
            className="flex animate-marquee-y flex-col gap-4 pb-4 group-hover:[animation-play-state:paused]"
            style={{"--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal"}}
        >
            {[...items, ...items].map((feedback, index) => (
                <FeedbackCard key={`${feedback.name}-${index}`} feedback={feedback}/>
            ))}
        </div>
    </div>
);

const Feedback = () => {
    return (
        <Band innerClassName="px-5 py-16 640px:px-8 1024px:px-12 1024px:py-24">
            <SectionIntro
                label="Feedback"
                align="center"
                className="mx-auto"
                title="What developers say."
                description="Comments from Product Hunt, LinkedIn and daily.dev."
            />

            <div className="relative mt-10 grid grid-cols-1 gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] 640px:grid-cols-2 1024px:grid-cols-3">
                <Column items={columns[0]} duration={46}/>
                <Column items={columns[1]} duration={58} reverse className="hidden 640px:block"/>
                <Column items={columns[2]} duration={50} className="hidden 1024px:block"/>
            </div>
        </Band>
    );
};

export default Feedback;
