
import React from 'react';
import { cn } from "@/lib/utils";

interface TheatricalTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "metallic" | "golden" | "gradient";
  shadow?: boolean;
  glow?: boolean;
  as?: React.ElementType;
}

export const TheatricalText = React.forwardRef<
  HTMLDivElement,
  TheatricalTextProps
>(({ className, variant = "metallic", shadow = true, glow = false, as: Component = "div", children, ...props }, ref) => {
  return (
    <Component
      ref={ref}
      className={cn(
        variant === "metallic" && "metallic-text",
        variant === "golden" && "golden-text",
        variant === "gradient" && "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500",
        shadow && "drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]",
        glow && "filter drop-shadow(0 0 5px currentColor)",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
});

TheatricalText.displayName = "TheatricalText";
