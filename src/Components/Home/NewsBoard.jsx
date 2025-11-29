import {FiArrowUpRight} from "react-icons/fi";

const NewsBoard = () => {
    return (
        <section className="bg-brandColor flex items-center justify-center gap-1 w-full px-5 py-3 md:h-[50px]">
            <p className="text-base text-white text-center font-medium">🔥 We just launched <a
                href="https://vueui.zenui.net"
                target="_blank"
                rel="noreferrer"
                className="hover:underline">ZenUI
                Library Vue!</a> Don’t miss it.
                <FiArrowUpRight className='text-white text-[1.4rem] inline ml-1'/>
            </p>
        </section>
    );
};

export default NewsBoard;
