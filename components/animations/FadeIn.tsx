'use client';

import { motion, useInView, UseInViewOptions, HTMLMotionProps } from 'framer-motion';
import { useRef, ElementType } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    fullWidth?: boolean;
    viewport?: UseInViewOptions;
    as?: ElementType;
}

export default function FadeIn({
    children,
    className = "",
    delay = 0,
    duration = 0.5,
    direction = 'up',
    fullWidth = false,
    viewport = { once: true, margin: "-100px" },
    as: Component = 'div'
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);
    const MotionComponent = motion(Component as any);

    const getInitialProps = () => {
        switch (direction) {
            case 'up': return { opacity: 0, y: 40 };
            case 'down': return { opacity: 0, y: -40 };
            case 'left': return { opacity: 0, x: 40 };
            case 'right': return { opacity: 0, x: -40 };
            case 'none': return { opacity: 0 };
            default: return { opacity: 0, y: 40 };
        }
    };

    return (
        <MotionComponent
            ref={ref}
            initial={getInitialProps()}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : getInitialProps()}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Custom ease-out curve
            }}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto' }}
        >
            {children}
        </MotionComponent>
    );
}

export function StaggerContainer({
    children,
    className = "",
    delay = 0,
    staggerDelay = 0.1,
    viewport = { once: true, margin: "-100px" },
    as: Component = 'div'
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    viewport?: UseInViewOptions;
    as?: ElementType;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, viewport);
    const MotionComponent = motion(Component as any);

    return (
        <MotionComponent
            ref={ref}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            variants={{
                hidden: {},
                show: {
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    }
                }
            }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}

export function FadeInItem({
    children,
    className = "",
    as: Component = 'div'
}: {
    children: React.ReactNode;
    className?: string;
    as?: ElementType;
}) {
    const MotionComponent = motion(Component as any);

    return (
        <MotionComponent
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
            }}
            className={className}
        >
            {children}
        </MotionComponent>
    );
}
