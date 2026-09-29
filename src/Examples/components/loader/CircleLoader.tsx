import type {ComponentType} from "react";
import {FiLoader} from "react-icons/fi";

export interface CircleLoaderProps {
    /** Color of the moving arc. */
    color?: string;
    /** Color of the faint ring behind the arc. */
    trackColor?: string;
    /** Width and height in pixels. */
    size?: number;
    /** Seconds per full turn. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** A ring with one colored arc that spins in place. */
export const CircleLoader = ({
    color = "#3B9DF8",
    trackColor = "#3b9df84b",
    size = 40,
    duration = 1,
    label = "Loading",
    className = "",
}: CircleLoaderProps) => (
    <div role="status" className={`inline-flex ${className}`}>
        <span
            aria-hidden
            className="block animate-spin rounded-full border-4"
            style={{
                width: size,
                height: size,
                borderColor: trackColor,
                borderRightColor: color,
                animationDuration: `${duration}s`,
            }}
        />
        <span className="sr-only">{label}</span>
    </div>
);

export interface IconLoaderProps {
    /** Any icon component that accepts a className, for example from react-icons or lucide-react. */
    icon?: ComponentType<{className?: string}>;
    color?: string;
    /** Icon size in pixels. */
    size?: number;
    /** Seconds per full turn. */
    duration?: number;
    /** Text read by screen readers while the loader is shown. */
    label?: string;
    className?: string;
}

/** Spins a loader icon. Pass your own icon to match the rest of your interface. */
export const IconLoader = ({
    icon: Icon = FiLoader,
    color = "#3B9DF8",
    size = 44.8,
    duration = 1,
    label = "Loading",
    className = "",
}: IconLoaderProps) => (
    <div role="status" className={`inline-flex ${className}`}>
        <span
            aria-hidden
            className="inline-flex animate-spin"
            style={{fontSize: size, color, animationDuration: `${duration}s`}}
        >
            <Icon className="size-[1em]"/>
        </span>
        <span className="sr-only">{label}</span>
    </div>
);
