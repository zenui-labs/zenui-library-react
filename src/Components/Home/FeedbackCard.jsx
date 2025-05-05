import React, {useState, useRef} from 'react';

const FeedbackCard = ({feedback}) => {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={cardRef}
            className="w-full h-max p-5 rounded-high border cursor-pointer dark:border-darkBorderColor/70 border-border relative overflow-hidden"
        >
            <div className='flex items-center justify-between w-full'>
                <div className='flex items-center gap-3'>
                    <img
                        src={feedback?.avatar}
                        alt='avatar/image'
                        className='w-[40px] h-[40px] outline dark:outline-slate-700 outline-gray-100 rounded-full object-cover'
                    />
                    <h1 className='text-[1.1rem] font-[600] dark:text-darkTextColor/90'>{feedback?.name}</h1>
                </div>

                {feedback?.source === 'product_hunt' && (
                    <img
                        src='https://cdn.worldvectorlogo.com/logos/product-hunt.svg'
                        alt='platform/logo'
                        className='w-[20px] h-[20px] rounded-full'
                    />
                )}
                {feedback?.source === 'linkedin' && (
                    <img
                        src='https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png'
                        alt='platform/logo'
                        className='w-[20px] h-[20px] rounded-full'
                    />
                )}
                {feedback?.source === 'daily_dev' && (
                    <img
                        src='https://i.ibb.co.com/hLZFKK2/unnamed.png'
                        alt='platform/logo'
                        className='w-[20px] h-[20px] rounded-full'
                    />
                )}
            </div>

            <p className='text-[1rem] text-black/70 dark:text-darkSubTextColor/90 mt-4'>{feedback?.review}</p>

            {isHovering && (
                <div
                    className="absolute inset-0 pointer-events-none dark:blur-[50px] blur-[80px]"
                    style={{
                        background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #DB06F9, transparent)`,
                    }}
                />
            )}
        </div>
    );
};

export default FeedbackCard;