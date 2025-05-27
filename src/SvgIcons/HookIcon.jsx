import React from 'react';

const HookIcon = ({className}) => {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M16 18L22 12L16 6" stroke="currentColor" strokeWidth="2.20" strokeLinecap="round"
                  strokeLinejoin="round"/>
            <path d="M8 6L2 12L8 18" stroke="currentColor" strokeWidth="2.20" strokeLinecap="round"
                  strokeLinejoin="round"/>
        </svg>
    );
};

export default HookIcon;
