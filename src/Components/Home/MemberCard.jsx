import { motion } from 'framer-motion';
import {PiCertificate} from "react-icons/pi";
import {FaBehance, FaGithub} from "react-icons/fa";
import {FiFigma, FiLinkedin} from "react-icons/fi";
import {FaXTwitter} from "react-icons/fa6";
import {AiOutlineGlobal} from "react-icons/ai";

export const MemberCard = ({member, isMemberDev = false}) => {

    const socialIconsContainer = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.1,
            }
        }
    };

    const socialIconItem = {
        hidden: {x: 60, opacity: 0},
        show: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 20
            }
        }
    };

    const handleDownloadCertificate = async (certificate) => {
        if (!certificate) return;

        try {
            const imagePath = `/certificates/certificate-${certificate}.png`;

            const response = await fetch(imagePath);

            if (!response.ok) {
                throw new Error('Image not found');
            }

            const blob = await response.blob();

            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.setAttribute("download", `zenui-contributor-certificate.png`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);

        } catch (error) {
            console.error('Error downloading certificate:', error);
            alert('Certificate not found or could not be downloaded');
        }
    };


    return (
        <motion.div
            initial="hidden"
            whileHover="show"
            variants={socialIconsContainer}
            className='flex flex-col justify-center cursor-pointer overflow-hidden group items-center relative'
        >
            <img
                src={member?.image}
                alt='profile/image'
                className='w-[250px] h-[300px] object-cover rounded-normal'
            />

            {member.zenuiHero && (
                <img
                    alt='zenui hero badge'
                    src='https://i.ibb.co.com/8dfDxXz/best-contributor-badge.png'
                    className='absolute top-2 left-1 cursor-pointer w-[40px]'
                />
            )}

            <div
                className='w-full h-[70px] rounded-b-normal bg-gradient-to-b from-gray-50/10 to-black absolute bottom-0 left-0 right-0'></div>

            <div
                className='absolute bottom-[0.7rem] text-center rounded-normal py-3 w-[90%] left-[50%] translate-x-[-50%] backdrop-blur-md'>
                <h3 className='text-[1.15rem] font-[500] text-white dark:text-darkTextColor'>{member?.name}</h3>
                <p className='text-[1rem] text-white/80 font-[300] dark:text-darkSubTextColor/80 flex justify-center items-center gap-2'>{member?.title}
                    <PiCertificate
                        onClick={() => handleDownloadCertificate(member?.certificate)}
                        className='text-[1.2rem] text-brandColor hover:scale-[1.2] transition-all duration-200'/>
                </p>
            </div>

            {/* Social icons container with motion */}
            <motion.div
                className='flex items-center flex-col absolute top-0 right-4 gap-[10px] mt-4'
                variants={socialIconsContainer}
            >
                {member?.behanceLink && (
                    <motion.a href={member?.behanceLink} variants={socialIconItem}>
                        <FaBehance
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}

                {member?.linkedinLink && (
                    <motion.a href={member?.linkedinLink} variants={socialIconItem}>
                        <FiLinkedin
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}

                {member?.twitterLink && (
                    <motion.a href={member?.twitterLink} variants={socialIconItem}>
                        <FaXTwitter
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}

                {member?.figmaLink && (
                    <motion.a href={member?.figmaLink} variants={socialIconItem}>
                        <FiFigma
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}

                {member?.githubLink && (
                    <motion.a href={member?.githubLink} variants={socialIconItem}>
                        <FaGithub
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}

                {member?.website && (
                    <motion.a href={member?.website} variants={socialIconItem}>
                        <AiOutlineGlobal
                            className='text-[2rem] bg-brandColor text-white rounded-normal p-1.5 cursor-pointer hover:scale-[1.1] transition-all duration-200'/>
                    </motion.a>
                )}
            </motion.div>
        </motion.div>
    );
};