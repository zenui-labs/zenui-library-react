import React from 'react';

const SectionWrapper = ({children, className}) => {
    return (
        <section className={`max-w-[1300px] mx-auto mt-16 px-6 640px:px-8 1024px:px-10 1404px:px-0 ${className}`}>
            {children}
        </section>
    );
};

export default SectionWrapper;
