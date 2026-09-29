import {useEffect, useRef} from "react";
import type {ReactNode} from "react";

interface CircuitNode {
    x: number;
    y: number;
    size: number;
    isActive: boolean;
    activationLevel: number;
}

interface CircuitPath {
    from: number;
    to: number;
    isActive: boolean;
    activationLevel: number;
}

export interface CircuitBoardProps {
    /** Content shown above the circuit, such as a hero message. */
    children?: ReactNode;
    /** Number of nodes. Defaults to 30 on sections narrower than 768px and 50 otherwise. */
    nodeCount?: number;
    /** Distance in px from the pointer within which nodes light up. */
    activeRadius?: number;
    /** Comma separated red, green and blue values for the glow around lit nodes and paths, for example "0, 200, 255". */
    glowColor?: string;
    /** Comma separated red, green and blue values for lit nodes and path cores. */
    highlightColor?: string;
    className?: string;
}

const findClosestNodes = (node: CircuitNode, nodes: CircuitNode[], count: number) =>
    nodes
        .map((other, index) => {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            return {index, distance: Math.sqrt(dx * dx + dy * dy)};
        })
        .filter((entry) => entry.distance > 0)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count)
        .map((entry) => entry.index);

// Nodes are spread over a loose grid and each one links to its 2 to 4 nearest neighbors.
const generateCircuit = (width: number, height: number, nodeCount: number) => {
    const nodes: CircuitNode[] = [];
    const gridSize = Math.sqrt(nodeCount);
    const cellWidth = width / gridSize;
    const cellHeight = height / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            nodes.push({
                x: i * cellWidth + Math.random() * (cellWidth * 0.6) + cellWidth * 0.2,
                y: j * cellHeight + Math.random() * (cellHeight * 0.6) + cellHeight * 0.2,
                size: Math.random() * 3 + 2,
                isActive: false,
                activationLevel: 0,
            });
        }
    }

    const paths: CircuitPath[] = [];
    nodes.forEach((node, i) => {
        for (const target of findClosestNodes(node, nodes, 2 + Math.floor(Math.random() * 3))) {
            const exists = paths.some((p) => (p.from === i && p.to === target) || (p.from === target && p.to === i));
            if (!exists && i !== target) {
                paths.push({from: i, to: target, isActive: false, activationLevel: 0});
            }
        }
    });

    return {nodes, paths};
};

// A circuit board where nodes and paths near the pointer light up and slowly fade after it leaves.
export const CircuitBoard = ({
    children,
    nodeCount,
    activeRadius = 150,
    glowColor = "0, 200, 255",
    highlightColor = "100, 220, 255",
    className = "",
}: CircuitBoardProps) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Kept in a ref so pointer moves do not re-render the component.
    const pointerRef = useRef({x: 0, y: 0});

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let frame = 0;
        let nodes: CircuitNode[] = [];
        let paths: CircuitPath[] = [];

        const resize = () => {
            const rect = wrapper.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            width = rect.width;
            height = rect.height;
            ({nodes, paths} = generateCircuit(width, height, nodeCount ?? (width < 768 ? 30 : 50)));
        };

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointerRef.current = {x: event.clientX - rect.left, y: event.clientY - rect.top};
        };

        const animate = () => {
            frame = requestAnimationFrame(animate);
            if (!width) return;

            const pointer = pointerRef.current;
            ctx.clearRect(0, 0, width, height);

            for (const node of nodes) {
                const dx = node.x - pointer.x;
                const dy = node.y - pointer.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < activeRadius) {
                    node.isActive = true;
                    node.activationLevel = Math.min(1, node.activationLevel + 0.05);
                } else {
                    node.activationLevel = Math.max(0, node.activationLevel - 0.02);
                    if (node.activationLevel <= 0) node.isActive = false;
                }
            }

            for (const path of paths) {
                if (nodes[path.from].isActive || nodes[path.to].isActive) {
                    path.isActive = true;
                    path.activationLevel = Math.min(1, path.activationLevel + 0.03);
                } else {
                    path.activationLevel = Math.max(0, path.activationLevel - 0.01);
                    if (path.activationLevel <= 0) path.isActive = false;
                }
            }

            ctx.strokeStyle = "rgba(50, 50, 70, 0.3)";
            ctx.lineWidth = 1;
            for (const path of paths) {
                if (path.isActive) continue;
                const fromNode = nodes[path.from];
                const toNode = nodes[path.to];
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            }

            for (const path of paths) {
                if (!path.isActive || path.activationLevel <= 0) continue;
                const fromNode = nodes[path.from];
                const toNode = nodes[path.to];

                ctx.strokeStyle = `rgba(${glowColor}, ${path.activationLevel * 0.2})`;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();

                ctx.strokeStyle = `rgba(${highlightColor}, ${path.activationLevel})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(fromNode.x, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
                ctx.stroke();
            }

            for (const node of nodes) {
                if (!node.isActive) {
                    ctx.fillStyle = "rgba(100, 100, 120, 0.5)";
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                    ctx.fill();
                    continue;
                }

                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 3);
                gradient.addColorStop(0, `rgba(${glowColor}, ${node.activationLevel})`);
                gradient.addColorStop(1, `rgba(${glowColor}, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = `rgba(${highlightColor}, ${node.activationLevel})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fill();
            }

            const gradient = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, activeRadius);
            gradient.addColorStop(0, `rgba(${glowColor}, 0.1)`);
            gradient.addColorStop(1, `rgba(${glowColor}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(pointer.x, pointer.y, activeRadius, 0, Math.PI * 2);
            ctx.fill();
        };

        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(wrapper);
        window.addEventListener("mousemove", handleMouseMove);
        animate();

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(frame);
        };
    }, [nodeCount, activeRadius, glowColor, highlightColor]);

    return (
        <div
            ref={wrapperRef}
            className={`relative isolate flex min-h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-xl bg-gray-900 ${className}`}
        >
            <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full"/>
            {children}
        </div>
    );
};
