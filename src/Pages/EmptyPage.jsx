import React, {useEffect} from 'react';

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";


import {Link} from "react-router-dom";

const MyComponent = () => {

    useEffect(() => {
        AOS.init({
            duration: 500,
        });
    }, []);

    return (
        <div className='bg-brandColor/20 flex flex-col items-center justify-center w-full h-screen'>
            <div className='' data-aos="zoom-in">
                <img
                    src='https://besnik-space.fra1.cdn.digitaloceanspaces.com/marketing-sites/Mo6JckUH7sgbkTfBSdXV1722624836.webp'
                    alt='404/image' className='w-[250px] 425px:w-[300px]'/>
            </div>

            <h1 data-aos="fade-up" className='text-[1.7rem] 425px:text-[2rem] font-semibold mt-5'>Page Not Found</h1>
            <p data-aos="fade-up" className='text-[0.9rem] 425px:text-[1rem] text-gray-600'>Sorry, the page you’re looking for can’t be found</p>

            <Link to='/' data-aos="fade-up" className='425px:py-3 mt-5 425px:px-12 px-8 py-2.5 rounded-xl bg-blue-500 text-white'>
                Go Home
            </Link>
        </div>
    );
};

export default MyComponent;
