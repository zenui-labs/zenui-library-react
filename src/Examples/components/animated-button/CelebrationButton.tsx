import {useEffect, useRef, useState, type CSSProperties} from "react";

export type ParticleShape = "rect" | "line" | "circle" | "triangle" | "star";

export interface CelebrationButtonProps {
    label?: string;
    /** Text shown for a moment after the action finishes. */
    successText?: string;
    /** Screen reader text while the spinner shows. */
    loadingText?: string;
    /**
     * Work to run while the spinner shows, such as a request. Confetti fires when it resolves.
     * Without it the spinner shows for `loadingDuration` milliseconds.
     */
    action?: () => Promise<void>;
    /** Spinner time in milliseconds when no `action` is given. */
    loadingDuration?: number;
    /** How long the success text stays, in milliseconds. */
    successDuration?: number;
    /** Number of confetti pieces per burst. */
    particleCount?: number;
    /** Confetti colors, picked at random for each piece. */
    colors?: string[];
    className?: string;
}

interface Particle {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    life: number;
    shape: ParticleShape;
    rotationZ: number;
    rotationZSpeed: number;
    rotationY: number;
    rotationYSpeed: number;
    scale: number;
    scaleSpeed: number;
    opacity: number;
}

interface ShapeProps {
    size: number;
    color: string;
}

type Phase = "idle" | "loading" | "success";

const DEFAULT_COLORS = ["#f87171", "#60a5fa", "#34d399", "#fbbf24", "#a78bfa", "#f472b6", "#f59e0b", "#10b981"];
const SHAPES: ParticleShape[] = ["rect", "line", "circle", "triangle", "star"];
const GRAVITY = 0.35;
const DRAG = 0.92;

const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const Triangle = ({size, color}: ShapeProps) => (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill={color} style={{display: "block"}}>
        <path d={`M 0 ${size} L ${size / 2} 0 L ${size} ${size} Z`}/>
    </svg>
);

const Star = ({size, color}: ShapeProps) => {
    const cx = size;
    const cy = size;
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size / 2.5;
    const step = Math.PI / spikes;
    let rotation = (Math.PI / 2) * 3;
    let path = "";

    for (let i = 0; i < spikes; i++) {
        path += `L${cx + Math.cos(rotation) * outerRadius} ${cy + Math.sin(rotation) * outerRadius} `;
        rotation += step;
        path += `L${cx + Math.cos(rotation) * innerRadius} ${cy + Math.sin(rotation) * innerRadius} `;
        rotation += step;
    }
    path += `L${cx} ${cy - outerRadius} Z`;

    return (
        <svg width={size * 2} height={size * 2} viewBox={`0 0 ${size * 2} ${size * 2}`} fill={color} style={{display: "block"}}>
            <path d={path}/>
        </svg>
    );
};

const renderParticle = (particle: Particle) => {
    const {id, x, y, color, size, shape, rotationZ, rotationY, opacity, scale} = particle;
    const baseStyle: CSSProperties = {
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
                    style={{...baseStyle, width: size * 0.3, height: size * 1.8, backgroundColor: color, borderRadius: size * 0.15}}
                />
            );
        case "rect":
            return (
                <div
                    key={id}
                    style={{...baseStyle, width: size, height: size * 0.6, backgroundColor: color, borderRadius: size * 0.2}}
                />
            );
        case "circle":
            return <div key={id} style={{...baseStyle, width: size, height: size, backgroundColor: color, borderRadius: "50%"}}/>;
        case "triangle":
            return (
                <div key={id} style={{...baseStyle, width: size, height: size}}>
                    <Triangle size={size} color={color}/>
                </div>
            );
        case "star":
            return (
                <div key={id} style={{...baseStyle, width: size * 2, height: size * 2}}>
                    <Star size={size} color={color}/>
                </div>
            );
    }
};

/** A button that shows a spinner, then a success label with a burst of confetti from its center. */
export const CelebrationButton = ({
    label = "Claim",
    successText = "Success",
    loadingText = "Loading",
    action,
    loadingDuration = 1000,
    successDuration = 2000,
    particleCount = 90,
    colors = DEFAULT_COLORS,
    className = "",
}: CelebrationButtonProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [phase, setPhase] = useState<Phase>("idle");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const resetTimer = useRef<number>();
    const mounted = useRef(true);
    const hasParticles = particles.length > 0;

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
            window.clearTimeout(resetTimer.current);
        };
    }, []);

    const createParticles = () => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 2;
        const next: Particle[] = [];
        for (let i = 0; i < particleCount; i++) {
            const angle = randomRange(40, 140) * (Math.PI / 180);
            const speed = randomRange(10, 20);
            next.push({
                id: Math.random().toString(36).slice(2),
                x: originX,
                y: originY,
                vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1) * randomRange(0.5, 1),
                vy: -Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
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
        setParticles(next);
    };

    const handleClick = async () => {
        window.clearTimeout(resetTimer.current);
        setPhase("loading");
        try {
            await (action ? action() : wait(loadingDuration));
        } catch {
            if (mounted.current) setPhase("idle");
            return;
        }
        if (!mounted.current) return;
        setPhase("success");
        createParticles();
        resetTimer.current = window.setTimeout(() => setPhase("idle"), successDuration);
    };

    // Runs one animation loop while confetti is on screen and stops once the last piece is gone.
    useEffect(() => {
        if (!hasParticles) return;
        let frame = 0;

        const animate = () => {
            setParticles((current) =>
                current
                    .map((particle) => {
                        let {x, y, vx, vy, life, rotationZ, rotationY, opacity, scale} = particle;
                        vy += GRAVITY;
                        vx *= DRAG;
                        vy *= DRAG;
                        x += vx;
                        y += vy;
                        rotationZ += particle.rotationZSpeed;
                        rotationY += particle.rotationYSpeed;
                        life -= 1;
                        if (life < 30) opacity = Math.max(0, life / 30);
                        scale = Math.max(0, scale + particle.scaleSpeed);
                        return {...particle, x, y, vx, vy, life, rotationZ, rotationY, opacity, scale};
                    })
                    .filter((particle) => particle.life > 0 && particle.y < window.innerHeight + 100),
            );
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [hasParticles]);

    const isLoading = phase === "loading";

    return (
        <div className={`relative ${className}`}>
            <button
                ref={buttonRef}
                type="button"
                onClick={handleClick}
                disabled={isLoading}
                aria-busy={isLoading}
                aria-live="polite"
                className={`w-32 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg shadow-pink-500/50 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-all duration-300 active:scale-90 relative overflow-hidden ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        <span className="sr-only">{loadingText}</span>
                    </span>
                ) : phase === "success" ? (
                    successText
                ) : (
                    label
                )}
            </button>
            <div
                aria-hidden="true"
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
};
