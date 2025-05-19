import {useRef, useEffect, useState} from "react";
import {IoChevronForward} from "react-icons/io5";

const StarfieldWarpExample = () => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [dimensions, setDimensions] = useState({width: 0, height: 0});
    const starsRef = useRef([]);
    const warpSpeedRef = useRef(0);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const handleResize = () => {
            if (!wrapperRef.current) return;

            const rect = wrapperRef.current.getBoundingClientRect();
            const {width, height} = rect;
            const devicePixelRatio = window.devicePixelRatio || 1;

            canvas.width = width * devicePixelRatio;
            canvas.height = height * devicePixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
            ctx.scale(devicePixelRatio, devicePixelRatio);

            setDimensions({width, height});

            initStars(width, height);
        };

        const initStars = (width, height) => {
            const starCount = width < 768 ? 300 : 500;
            const stars = [];

            for (let i = 0; i < starCount; i++) {
                stars.push({
                    x: Math.random() * width - width / 2,
                    y: Math.random() * height - height / 2,
                    z: Math.random() * 1000,
                    size: Math.random() * 2 + 1,
                    color: `hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 30 + 70}%)`,
                });
            }

            starsRef.current = stars;
            warpSpeedRef.current = 0;
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!wrapperRef.current) return;

            const rect = wrapperRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        if (!dimensions.width || !dimensions.height) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const animate = () => {
            ctx.fillStyle = "rgba(10, 10, 20, 0.2)";
            ctx.fillRect(0, 0, dimensions.width, dimensions.height);

            const stars = starsRef.current;
            const centerX = dimensions.width / 2;
            const centerY = dimensions.height / 2;

            const dx = mousePosition.x - centerX;
            const dy = mousePosition.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
            const targetWarpSpeed = Math.min(1, distance / maxDistance) * 15;

            warpSpeedRef.current += (targetWarpSpeed - warpSpeedRef.current) * 0.05;

            for (const star of stars) {
                star.z -= warpSpeedRef.current;

                if (star.z <= 0 || star.z > 1000) {
                    star.x = Math.random() * dimensions.width - centerX;
                    star.y = Math.random() * dimensions.height - centerY;
                    star.z = 1000;
                    star.size = Math.random() * 2 + 1;
                }

                const projectedX = (star.x / star.z) * 500 + centerX;
                const projectedY = (star.y / star.z) * 500 + centerY;
                const projectedSize = star.size * (1 - star.z / 1000);

                if (
                    projectedX < -10 ||
                    projectedX > dimensions.width + 10 ||
                    projectedY < -10 ||
                    projectedY > dimensions.height + 10
                )
                    continue;

                if (warpSpeedRef.current > 5 && star.z < 500) {
                    const prevX = (star.x / (star.z + warpSpeedRef.current * 2)) * 500 + centerX;
                    const prevY = (star.y / (star.z + warpSpeedRef.current * 2)) * 500 + centerY;

                    ctx.beginPath();
                    ctx.moveTo(projectedX, projectedY);
                    ctx.lineTo(prevX, prevY);
                    ctx.strokeStyle = star.color;
                    ctx.lineWidth = projectedSize;
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(projectedX, projectedY, projectedSize, 0, Math.PI * 2);
                    ctx.fillStyle = star.color;
                    ctx.fill();
                }
            }

            if (warpSpeedRef.current > 1) {
                const gradient = ctx.createRadialGradient(
                    centerX,
                    centerY,
                    0,
                    centerX,
                    centerY,
                    100 * warpSpeedRef.current
                );
                gradient.addColorStop(0, `rgba(100, 200, 255, ${warpSpeedRef.current * 0.05})`);
                gradient.addColorStop(1, "rgba(100, 200, 255, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(centerX, centerY, 100 * warpSpeedRef.current, 0, Math.PI * 2);
                ctx.fill();
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [dimensions, mousePosition]);

    return (
        <div
            ref={wrapperRef}
            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900"
        >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"/>

            <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center max-w-[700px] mx-auto text-white">
                <button
                    className='py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4'>
                    ✨ Introducing ZenUI v2.3
                </button>

                <h1
                    className="text-[3rem] font-bold leading-[50px]">
                    Open-Source UI Components & Templates Library
                </h1>

                <p
                    className="text-white/80 max-w-[700px] mt-3">
                    ZenUI Library is an Tailwind CSS components library for any needs. Comes with UI examples &
                    blocks,
                    templates, Icons, Color Palette and more.
                </p>

                <div
                    className="flex items-center flex-col 640px:flex-row gap-3 justify-center 425px:gap-6 mt-10 640px:mt-12">
                    <button
                        className='bg-brandColor pl-5 pr-4 border border-brandColor rounded-lg py-3 flex items-center gap-2 text-[1rem] group'
                    >
                        Browse Components
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                    <button
                        className='border-2 border-brandColor pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group'>
                        Browse Templates
                        <IoChevronForward className='group-hover:ml-1 transition-all duration-200'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StarfieldWarpExample;
