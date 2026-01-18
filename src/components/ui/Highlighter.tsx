"use client";

import React, { useEffect, useRef } from "react";
import { annotate } from "rough-notation";
import { cn } from "../../lib/utils";

interface HighlighterProps {
    children: React.ReactNode;
    action?: "highlight" | "underline" | "box" | "circle" | "strike-through" | "crossed-off" | "bracket";
    color?: string;
    strokeWidth?: number;
    animationDuration?: number;
    iterations?: number;
    padding?: number;
    multiline?: boolean;
    className?: string;
    delay?: number;
    active?: boolean;
}

export const Highlighter = ({
    children,
    action = "highlight",
    color = "#FFD1DC",
    strokeWidth = 1.5,
    animationDuration = 800,
    iterations = 2,
    padding = 2,
    multiline = true,
    className,
    delay = 0,
    active = false,
}: HighlighterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const annotationRef = useRef<any>(null);

    useEffect(() => {
        if (ref.current) {
            annotationRef.current = annotate(ref.current, {
                type: action,
                color,
                strokeWidth,
                animationDuration,
                iterations,
                padding,
                multiline,
            });
        }
        return () => {
            if (annotationRef.current) {
                annotationRef.current.hide();
            }
        };
    }, [action, color, strokeWidth, animationDuration, iterations, padding, multiline]);

    useEffect(() => {
        if (active && annotationRef.current) {
            const timer = setTimeout(() => {
                annotationRef.current.show();
            }, delay);
            return () => clearTimeout(timer);
        } else if (!active && annotationRef.current) {
            annotationRef.current.hide();
        }
    }, [active, delay]);

    return (
        <span ref={ref} className={cn("relative inline-block", className)}>
            {children}
        </span>
    );
};
