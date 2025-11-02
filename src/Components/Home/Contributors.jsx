import SectionWrapper from "./SectionWrapper.jsx";
import MetricsCard from "./MetricsCard.jsx";
import SectionHead from "@/Components/Home/SectionHead.jsx";
import {TeamData} from "@utils/TeamData.js";
import {DevContributorsData} from "@utils/DevContributorsData.js";
import {MemberCard} from "@/Components/Home/MemberCard.jsx";

const Contributors = () => {

    return (<>
        <>
            <SectionWrapper className='max-w-[1500px]'>
                <SectionHead
                    description={
                        'The builders driving ZenUI’s functionality and performance.'
                    }
                    isSubjet={'Dev'}
                    title={'Contributors'}
                />

                <div className='mt-16 grid grid-cols-2 640px:flex flex-wrap gap-4 justify-center'>
                    {DevContributorsData?.map((member, index) => (
                        <MemberCard key={index} member={member} isMemberDev={true}/>
                    ))}
                </div>
            </SectionWrapper>

            <SectionWrapper className='max-w-[1500px] mt-24'>
                <SectionHead
                    description={
                        `The creatives shaping ZenUI’s look, feel, and user experience.`
                    }
                    isSubjet={'Design'}
                    title={'Contributors'}
                />

                <div className='mt-16 grid grid-cols-2 640px:flex flex-wrap gap-4 justify-center'>
                    {TeamData?.map((member, index) => (
                        <MemberCard key={index} member={member}/>
                    ))}
                </div>
            </SectionWrapper>
            <MetricsCard/>
        </>
    </>);
};

export default Contributors;
