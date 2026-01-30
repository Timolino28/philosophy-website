"use client";
import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have this from shadcn/ui
interface MagicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    gradientColors?: [string, string, string];
}
export function MagicButton({
    children,
    className,
    gradientColors = ["#E2E8F0", "oklch(82.8% 0.189 84.429)", "#E2E8F0"],
    ...props
}: MagicButtonProps) {
    return (
        <button
            className={cn(
                // Layout & Size
                "relative group cursor-pointer overflow-hidden rounded-full p-[2px]",
                // Core Button Styles (resetting defaults)
                "transition-transform duration-300 active:scale-95",
                // Focus states
                "focus:outline-none ",
                className
            )}
            {...props}
        >
            {/* 
        1. THE SPINNING GRADIENT LAYER 
        - inset-[-1000%] makes it huge so the rotation covers the whole button at all angles
        - conic-gradient creates the beam effect
      */}
            <span
                className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]"
                style={{
                    background: `conic-gradient(from 90deg at 50% 50%, ${gradientColors[0]} 0%, ${gradientColors[1]} 50%, ${gradientColors[2]} 100%)`,
                }}
            />
            {/* 
        2. THE INNER BACKGROUND LAYER
        - This covers the center of the gradient, leaving only the "border" visible
        - Must match your page/card background (neutral-800 in your case)
      */}
            <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-neutral-800 px-8 py-3 text-sm font-medium text-white backdrop-blur-3xl transition-colors hover:bg-neutral-800/90 gap-2">
                {children}
            </span>
        </button>
    );
}