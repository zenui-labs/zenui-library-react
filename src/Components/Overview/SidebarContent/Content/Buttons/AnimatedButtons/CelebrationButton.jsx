import React, {useEffect, useRef, useState} from 'react';

const PARTICLE_COUNT = 90;
const COLORS = [
    "#f87171", "#60a5fa", "#34d399", "#fbbf24",
    "#a78bfa", "#f472b6", "#f59e0b", "#10b981",
];
const GRAVITY = 0.35;
const DRAG = 0.92;
const SHAPES = ["rect", "line", "circle", "triangle", "star"];

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function CelebrationButton({label = "Claim", successText = "Success"}) {
    const [particles, setParticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [buttonText, setButtonText] = useState(label);
    const buttonRef = useRef(null);
    const animationRef = useRef(null);

    function createParticles() {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const newParticles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const angle = randomRange(40, 140) * (Math.PI / 180);
            const speed = randomRange(10, 20);
            newParticles.push({
                id: Math.random().toString(36).slice(2),
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * randomRange(0.5, 1),
                vy: -Math.sin(angle) * speed,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                size: randomRange(4, 10),
                life: 50 + Math.floor(Math.random() * 30),
                shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
                rotationZ: randomRange(0, 360),
                rotationZSpeed: randomRange(-20, 20),
                rotationY: randomRange(0, 360),
                rotationYSpeed: randomRange(-15, 15),
                scale: 1,
                scaleSpeed: randomRange(-0.015, -0.005),
                opacity: 1,
            });
        }
        setParticles(newParticles);
    }

    function handleClick() {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setButtonText(successText);
            createParticles();
            setTimeout(() => setButtonText(label), 2000);
        }, 1000);
    }

    useEffect(() => {
        if (particles.length === 0) return;

        function animate() {
            setParticles((oldParticles) =>
                oldParticles
                    .map((p) => {
                        let {x, y, vx, vy, life, rotationZ, rotationY, opacity, scale, scaleSpeed} = p;
                        vy += GRAVITY;
                        vx *= DRAG;
                        vy *= DRAG;
                        x += vx;
                        y += vy;
                        rotationZ += p.rotationZSpeed;
                        rotationY += p.rotationYSpeed;
                        life -= 1;
                        if (life < 30) {
                            opacity = Math.max(0, life / 30);
                        }
                        scale += scaleSpeed;
                        if (scale < 0) scale = 0;
                        return {...p, x, y, vx, vy, life, rotationZ, rotationY, opacity, scale};
                    })
                    .filter((p) => p.life > 0 && p.y < window.innerHeight + 100)
            );
            animationRef.current = requestAnimationFrame(animate);
        }

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [particles.length]);

    function renderParticle(p) {
        const {id, x, y, color, size, shape, rotationZ, rotationY, opacity, scale} = p;
        const baseStyle = {
            position: "absolute",
            left: x,
            top: y,
            opacity,
            pointerEvents: "none",
            transform: `translate(-50%, -50%) rotateZ(${rotationZ}deg) rotateY(${rotationY}deg) scale(${scale})`,
            filter: "drop-shadow(0 0 2px rgba(0,0,0,0.15))",
            willChange: "transform, opacity",
        };
        switch (shape) {
            case "line":
                return (
                    <div
                        key={id}
                        style={{
                            ...baseStyle,
                            width: size * 0.3,
                            height: size * 1.8,
                            backgroundColor: color,
                            borderRadius: size * 0.15,
                        }}
                    />
                );
            case "rect":
                return (
                    <div
                        key={id}
                        style={{
                            ...baseStyle,
                            width: size,
                            height: size * 0.6,
                            backgroundColor: color,
                            borderRadius: size * 0.2,
                        }}
                    />
                );
            case "circle":
                return (
                    <div
                        key={id}
                        style={{
                            ...baseStyle,
                            width: size,
                            height: size,
                            backgroundColor: color,
                            borderRadius: "50%",
                        }}
                    />
                );
            case "triangle":
                return (
                    <div
                        key={id}
                        style={{...baseStyle, width: size, height: size}}
                        aria-hidden="true"
                    >
                        <Triangle size={size} color={color}/>
                    </div>
                );
            case "star":
                return (
                    <div
                        key={id}
                        style={{...baseStyle, width: size * 2, height: size * 2}}
                        aria-hidden="true"
                    >
                        <Star size={size} color={color}/>
                    </div>
                );
            default:
                return null;
        }
    }

    function Triangle({size, color}) {
        const path = `
          M 0 ${size}
          L ${size / 2} 0
          L ${size} ${size}
          Z
        `;
        return (
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                fill={color}
                style={{display: "block"}}
            >
                <path d={path}/>
            </svg>
        );
    }

    function Star({size, color}) {
        const cx = size;
        const cy = size;
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2.5;
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;
        let path = "";

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            path += `L${x} ${y} `;
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            path += `L${x} ${y} `;
            rot += step;
        }
        path += "L" + cx + " " + (cy - outerRadius) + " Z";

        return (
            <svg
                width={size * 2}
                height={size * 2}
                viewBox={`0 0 ${size * 2} ${size * 2}`}
                fill={color}
                style={{display: "block"}}
            >
                <path d={path}/>
            </svg>
        );
    }

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                onClick={handleClick}
                disabled={isLoading}
                className={`w-32 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/50 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 active:scale-90 relative overflow-hidden ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                ) : (
                    buttonText
                )}
            </button>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 9999,
                    perspective: "800px",
                }}
            >
                {particles.map(renderParticle)}
            </div>
        </div>
    );
}

export default CelebrationButton;